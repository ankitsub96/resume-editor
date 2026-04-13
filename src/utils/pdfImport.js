import * as pdfjsLib from 'pdfjs-dist';
import { nanoid } from './nanoid.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href;

const MARKER = 'RE:';

// ── Regex constants ───────────────────────────────────────────────────────────

const EMAIL_RE    = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
const PHONE_RE    = /(\+?\d[\d\s\-().]{6,}\d)/;
const LINKEDIN_RE = /linkedin\.com\/in\/[\w-]+/i;
const GITHUB_RE   = /github\.com\/[\w-]+/i;
const URL_RE      = /https?:\/\/\S+|www\.\S+/i;

// Matches: "Jan 2020", "01/2020", "2020", "January 2020"
const DATE_TOKEN  = /(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)[.,]?\s*\d{4}|\d{1,2}\/\d{4}|\d{4}/i;

// Matches a range: "<date> – <date|present>"
const PERIOD_RE   = new RegExp(
  `(${DATE_TOKEN.source})\\s*[-–—~to]+\\s*(${DATE_TOKEN.source}|present|current|now|till\\s+date|ongoing)`,
  'i'
);

// Inline separator patterns: "Title | Company | City | 2020–2022"
const PIPE_SEP_RE = /^(.+?)\s*[|·•]\s*(.+?)(?:\s*[|·•]\s*(.+?))?(?:\s*[|·•]\s*(.+?))?$/;

const BULLET_RE   = /^[\s]*[•\-–*▪◦➤→►]|\d+\.\s/;
const SECTION_MAP = [
  { re: /^(work\s+exp|experience|employment|professional\s+exp|work\s+history)/i, type: 'work' },
  { re: /^education|^academic|^qualification/i,                                   type: 'education' },
  { re: /^(core\s+)?skills?$|^key\s+skills?$|^competenc/i,                       type: 'skills' },
  { re: /^(technical|tech)[\s\-]?skills?|^technologies$|^tech\s+stack/i,         type: 'techSkills' },
  { re: /^projects?$|^key\s+proj|^personal\s+proj|^notable\s+proj/i,             type: 'projects' },
  { re: /^(professional\s+)?summary$|^objective$|^profile$|^about\s*me/i,        type: 'summary' },
  { re: /^certific/i,                                                              type: 'certificates' },
  { re: /^achievements?|^accomplishments?|^awards?/i,                             type: 'achievements' },
];

// ── Line classifier ───────────────────────────────────────────────────────────
// Returns one of: 'section'|'period'|'bullet'|'contact'|'separator'|'short'|'long'

function classifyLine(line) {
  const t = line.trim();
  if (!t) return 'empty';
  for (const { re } of SECTION_MAP) if (re.test(t)) return 'section';
  if (PERIOD_RE.test(t)) return 'period';
  if (BULLET_RE.test(t)) return 'bullet';
  if (EMAIL_RE.test(t) || PHONE_RE.test(t) || LINKEDIN_RE.test(t) ||
      GITHUB_RE.test(t) || URL_RE.test(t) ||
      /^(\+?\d[\d\s\-().]{5,}\d)$/.test(t) ||
      (/[,•|]\s*[a-z]/i.test(t) && t.length < 60 &&
       !PERIOD_RE.test(t) && !/[a-z]{10}/i.test(t.replace(/[,•|]/g,'')))) return 'contact';
  if (t.length <= 80 && PIPE_SEP_RE.test(t)) return 'separator';
  if (t.length <= 80) return 'short';
  return 'long';
}

function isSectionHeader(line) { return classifyLine(line) === 'section'; }
function isBullet(line)        { return BULLET_RE.test(line.trim()); }
function cleanBullet(line)     { return line.replace(/^[\s]*[•\-–*▪◦➤→►]\s*|\d+\.\s*/, '').trim(); }

function detectSectionType(line) {
  const t = line.trim();
  for (const { re, type } of SECTION_MAP) if (re.test(t)) return type;
  return null;
}

function extractPeriod(line) {
  const m = line.match(PERIOD_RE);
  return m ? m[0].trim() : null;
}

// ── Contact parsing ───────────────────────────────────────────────────────────

function parseContacts(lines) {
  const contacts = [];
  const used = new Set();
  for (const line of lines) {
    if (!used.has('email')) {
      const m = line.match(EMAIL_RE);
      if (m) { contacts.push({ id: 'email', icon: 'email', label: m[0], href: `mailto:${m[0]}` }); used.add('email'); }
    }
    if (!used.has('phone')) {
      const m = line.match(PHONE_RE);
      if (m) { contacts.push({ id: 'phone', icon: 'phone', label: m[0].trim(), href: `tel:${m[0].replace(/\D/g,'')}` }); used.add('phone'); }
    }
    if (!used.has('linkedin')) {
      const m = line.match(LINKEDIN_RE);
      if (m) { contacts.push({ id: 'linkedin', icon: 'linkedin', label: m[0], href: `https://${m[0]}` }); used.add('linkedin'); }
    }
    if (!used.has('github')) {
      const m = line.match(GITHUB_RE);
      if (m) { contacts.push({ id: 'github', icon: 'github', label: m[0], href: `https://${m[0]}` }); used.add('github'); }
    }
    if (!used.has('location')) {
      const t = line.replace(/^[•\-–*|in]\s*/i, '').trim();
      if (/,\s*[a-z]/i.test(t) && t.length < 60 && !EMAIL_RE.test(t) && !PHONE_RE.test(t)) {
        contacts.push({ id: 'location', icon: 'location', label: t, href: null });
        used.add('location');
      }
    }
  }
  return contacts;
}

// ── Text extraction ───────────────────────────────────────────────────────────

async function extractLines(arrayBuffer) {
  const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  try {
    const meta = await doc.getMetadata();
    const subject = meta?.info?.Subject || '';
    if (subject.startsWith(MARKER)) {
      const resume = JSON.parse(decodeURIComponent(escape(atob(subject.slice(MARKER.length)))));
      return { resume, exact: true };
    }
  } catch {}

  const lines = [];
  let totalItems = 0;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const byY = new Map();
    totalItems += content.items.length;
    for (const item of content.items) {
      if (!item.str?.trim()) continue;
      const y = Math.round(item.transform[5]);
      if (!byY.has(y)) byY.set(y, []);
      byY.get(y).push(item);
    }
    [...byY.keys()].sort((a, b) => b - a).forEach(y => {
      const text = byY.get(y)
        .sort((a, b) => a.transform[4] - b.transform[4])
        .map(i => i.str).join(' ').trim();
      if (text) lines.push(text);
    });
  }
  const noTextLayer = totalItems === 0 || lines.length === 0;
  return { lines, exact: false, noTextLayer };
}

// ── Entry-line splitter (Approach 1: inline separator regex) ──────────────────
// Tries to parse "Title | Company | City | Jan 2020 – Present" from one line.
// Returns { title, company, location, period } or null.

function splitSeparatorLine(line) {
  const period = extractPeriod(line);
  const stripped = period ? line.replace(period, '').trim() : line;
  const m = stripped.match(PIPE_SEP_RE);
  if (!m) return null;
  const parts = [m[1], m[2], m[3], m[4]].filter(Boolean).map(s => s.replace(/[-–|,]+$/, '').trim());
  return { title: parts[0] || '', company: parts[1] || '', location: parts[2] || '', period: period || '' };
}

// ── Anchor-cluster builder (Approach 2: date-range sweep) ────────────────────
// Sweeps lines, finds PERIOD anchors, clusters surrounding context into entries.
// Each cluster: { titleLines[], period, bullets[] }

function clusterByAnchors(lines) {
  // Tag every line
  const tagged = lines.map(l => ({ line: l, cls: classifyLine(l) }));

  const clusters = [];
  let i = 0;

  while (i < tagged.length) {
    const { line, cls } = tagged[i];

    // A separator line encodes a whole entry on one line
    if (cls === 'separator') {
      const split = splitSeparatorLine(line);
      if (split) {
        const cluster = { ...split, bullets: [] };
        i++;
        while (i < tagged.length && tagged[i].cls === 'bullet') {
          cluster.bullets.push(cleanBullet(tagged[i].line));
          i++;
        }
        clusters.push(cluster);
        continue;
      }
    }

    // Short line(s) followed by optional period, then bullets
    if (cls === 'short' || cls === 'period') {
      const titleLines = [];
      let period = '';

      // Collect up to 3 short/period lines as the entry header
      while (i < tagged.length && titleLines.length < 3 &&
             (tagged[i].cls === 'short' || tagged[i].cls === 'period')) {
        if (tagged[i].cls === 'period') {
          period = extractPeriod(tagged[i].line) || tagged[i].line.trim();
        } else {
          // Short line might embed a period inline
          const inlinePeriod = extractPeriod(tagged[i].line);
          if (inlinePeriod) {
            period = inlinePeriod;
            const rest = tagged[i].line.replace(inlinePeriod, '').replace(/[-–|,]+/, '').trim();
            if (rest) titleLines.push(rest);
          } else {
            titleLines.push(tagged[i].line.trim());
          }
        }
        i++;
      }

      // Collect trailing bullets
      const bullets = [];
      while (i < tagged.length && tagged[i].cls === 'bullet') {
        bullets.push(cleanBullet(tagged[i].line));
        i++;
      }
      // Also absorb long lines immediately after short-header as bullets
      while (i < tagged.length && tagged[i].cls === 'long') {
        bullets.push(tagged[i].line.trim());
        i++;
      }

      if (titleLines.length || period || bullets.length) {
        clusters.push({ title: titleLines[0] || '', company: titleLines[1] || '',
                        location: titleLines[2] || '', period, bullets });
      }
      continue;
    }

    // Standalone bullet with no preceding header — append to last cluster or new
    if (cls === 'bullet') {
      if (!clusters.length) clusters.push({ title: '', company: '', location: '', period: '', bullets: [] });
      clusters[clusters.length - 1].bullets.push(cleanBullet(line));
      i++;
      continue;
    }

    // Long paragraph (summary line, or continuation) — treat as bullet text
    if (cls === 'long') {
      if (!clusters.length) clusters.push({ title: '', company: '', location: '', period: '', bullets: [] });
      clusters[clusters.length - 1].bullets.push(line.trim());
      i++;
      continue;
    }

    i++;
  }

  return clusters;
}

// ── Section parsers ───────────────────────────────────────────────────────────

function parseWork(lines) {
  return clusterByAnchors(lines)
    .filter(c => c.title || c.company || c.bullets.length)
    .map(c => ({
      id: nanoid(),
      jobTitle: c.title,
      company: c.company,
      period: c.period,
      location: c.location,
      bullets: c.bullets,
    }));
}

function parseProjects(lines) {
  return clusterByAnchors(lines)
    .filter(c => c.title || c.bullets.length)
    .map(c => ({
      id: nanoid(),
      title: c.title,
      subtitle: c.company,
      period: c.period,
      bullets: c.bullets,
    }));
}

function parseEducation(lines) {
  return clusterByAnchors(lines)
    .filter(c => c.title || c.company)
    .map(c => ({
      id: nanoid(),
      degree: c.title,
      institution: c.company,
      period: c.period,
      location: c.location,
      gpa: c.bullets.find(b => /gpa|cgpa|grade|%/i.test(b)) || '',
    }));
}

function parseSkills(lines) {
  const chips = [];
  for (const line of lines) {
    for (const part of line.split(/[,;|•·]/)) {
      const label = part.trim();
      if (label && label.length < 50 && !isSectionHeader(label)) {
        chips.push({ id: nanoid(), label });
      }
    }
  }
  return chips;
}

function parseTechSkills(lines) {
  const items = [];
  for (const line of lines) {
    const ci = line.indexOf(':');
    if (ci > 0 && ci < 35) {
      items.push({ id: nanoid(), category: line.slice(0, ci).trim(), skills: line.slice(ci + 1).trim() });
    } else if (line.length > 15) {
      // Try splitting by known delimiter
      const m = line.match(/^([^|:]+)[:|]\s*(.+)$/);
      if (m) items.push({ id: nanoid(), category: m[1].trim(), skills: m[2].trim() });
      else    items.push({ id: nanoid(), category: 'Skills', skills: line.trim() });
    }
  }
  return items;
}

// ── Segment splitter ──────────────────────────────────────────────────────────
// Splits lines into named segments using section headers.
// If < 2 headers found, falls back to heuristic guessing.

function splitSegments(lines) {
  const segments = [];
  let curType = 'header';
  let curLines = [];

  for (const line of lines) {
    const type = detectSectionType(line);
    if (type) {
      segments.push({ type: curType, lines: curLines });
      curType = type;
      curLines = [];
    } else {
      curLines.push(line);
    }
  }
  segments.push({ type: curType, lines: curLines });
  return segments;
}

// ── Header parsing ────────────────────────────────────────────────────────────

function isContactLine(line) {
  const t = line.replace(/^[•\-–*|in]\s*/i, '').trim();
  return EMAIL_RE.test(t) || PHONE_RE.test(t) || LINKEDIN_RE.test(t) ||
         GITHUB_RE.test(t) || URL_RE.test(t) ||
         /^(\+?\d[\d\s\-().]{5,}\d)$/.test(t) ||
         (/[,•]\s*[a-z]/i.test(t) && t.length < 60 && !/[a-z]{15}/i.test(t.replace(/[,•|]/g,'')));
}

function parseHeader(lines) {
  const nameIdx = lines.findIndex(l => !isContactLine(l) && !isSectionHeader(l) && l.trim().length > 1);
  const name = nameIdx >= 0 ? lines[nameIdx].trim() : '';
  const nextLine = nameIdx >= 0 ? lines[nameIdx + 1] : '';
  const title = nextLine && !isContactLine(nextLine) && !isSectionHeader(nextLine) ? nextLine.trim() : '';
  const contacts = parseContacts(lines);
  return { name, title, contacts };
}

// ── Main parse function ───────────────────────────────────────────────────────

function parseTextToResume(lines) {
  const segments = splitSegments(lines);

  const headerSeg  = segments.find(s => s.type === 'header')?.lines  || [];
  const summarySeg = segments.find(s => s.type === 'summary')?.lines || [];
  const workSeg    = segments.find(s => s.type === 'work')?.lines;
  const projSeg    = segments.find(s => s.type === 'projects')?.lines;
  const skillSeg   = segments.find(s => s.type === 'skills')?.lines;
  const techSeg    = segments.find(s => s.type === 'techSkills')?.lines;
  const eduSeg     = segments.find(s => s.type === 'education')?.lines;
  const certSeg    = segments.find(s => s.type === 'certificates')?.lines;

  const { name, title, contacts } = parseHeader(headerSeg);
  const summary = summarySeg.join(' ').trim()
    || headerSeg.filter(l => !isContactLine(l) && classifyLine(l) === 'long').join(' ').trim();

  const sections = [];
  if (workSeg) sections.push({ id: nanoid(), type: 'work',       title: 'Work Experience',   visible: true, column: 'left',  items: parseWork(workSeg) });
  if (projSeg) sections.push({ id: nanoid(), type: 'projects',   title: 'Projects',           visible: true, column: 'left',  items: parseProjects(projSeg) });
  if (skillSeg) sections.push({ id: nanoid(), type: 'skills',    title: 'Core Skills',        visible: true, column: 'right', items: parseSkills(skillSeg) });
  if (techSeg)  sections.push({ id: nanoid(), type: 'techSkills',title: 'Technical Skills',   visible: true, column: 'right', items: parseTechSkills(techSeg) });
  if (eduSeg)   sections.push({ id: nanoid(), type: 'education', title: 'Education',          visible: true, column: 'right', items: parseEducation(eduSeg) });
  if (certSeg)  sections.push({ id: nanoid(), type: 'certificates', title: 'Certificates',   visible: true, column: 'right', items: parseProjects(certSeg) });

  return { header: { name, title, summary, photo: null, contacts }, sections };
}

// ── Public API ────────────────────────────────────────────────────────────────

export { parseTextToResume };

export async function importPDF(file) {
  const buffer = await file.arrayBuffer();
  const result = await extractLines(buffer);
  if (result.exact)        return { resume: result.resume, confidence: 'exact' };
  if (result.noTextLayer)  return { resume: null, confidence: 'none', noTextLayer: true };
  const resume = parseTextToResume(result.lines);
  return { resume, confidence: 'heuristic' };
}
