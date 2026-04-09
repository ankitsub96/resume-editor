/**
 * RESUME EDITOR — CENTRAL CONFIG
 * ─────────────────────────────────────────────────────────────
 * All tweakable values live here. Edit this file and the app
 * hot-reloads instantly. You can also paste a JSON blob into
 * the Config panel in the toolbar to override at runtime.
 */

const CONFIG = {

  // ── Document ────────────────────────────────────────────────
  document: {
    a4Width: '794px',
    letterWidth: '816px',
    minHeight: '1100px',
  },

  // ── Toolbar ─────────────────────────────────────────────────
  toolbar: {
    height: '52px',
    background: '#1e2329',
    brandLabel: 'Resume Editor',
  },

  // ── Layout presets ──────────────────────────────────────────
  presets: {
    classic:  { leftRatio: '30%', rightRatio: '70%' },
    standard: { leftRatio: '58%', rightRatio: '42%' },
    modern:   { leftRatio: '60%', rightRatio: '40%' },
  },

  // ── Spacing (format.spacing 1-10 mapped to CSS values) ──────
  spacing: {
    // sectionGap = base + (spacing-1) * step
    sectionGapBase: 0.4,   // rem
    sectionGapStep: 0.18,  // rem per spacing unit
    itemGapBase: 0.3,      // rem
    itemGapStep: 0.1,      // rem
    lineHeightBase: 1.3,
    lineHeightStep: 0.05,
  },

  // ── Typography ──────────────────────────────────────────────
  typography: {
    resumeBaseFontSize: '13px',
    sectionTitleSize: '1rem',
    sectionTitleWeight: '800',
    sectionTitleLetterSpacing: '0.08em',
    itemTitleSize: '0.82rem',
    itemTitleWeight: '700',
    bulletSize: '0.76rem',
    contactSize: '0.72rem',
    headerNameSize: '1.9rem',
    headerNameWeight: '800',
    headerTitleSize: '0.88rem',
    headerSummarySize: '0.76rem',
    headerSummaryLineHeight: '1.58',
    tagFontSize: '0.7rem',
    techCategorySize: '0.76rem',
  },

  // ── Section title block ─────────────────────────────────────
  sectionTitle: {
    accentBlockWidth: '6px',    // left colored bar width
    borderBottomWidth: '1.5px',
    marginBottom: '10px',
    accentMarginRight: '8px',
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    accentStripWidth: '5px',    // green strip on far left
    paddingV: '20px',
    paddingH: '16px',
    photoSize: '76px',
    photoBorderWidth: '2.5px',
    borderBottomWidth: '2px',
    contactsMinWidth: '190px',
    contactIconSize: '13px',
  },

  // ── PDF export ──────────────────────────────────────────────
  pdf: {
    filename: 'Ankit_Dahiya_Resume.pdf',
    imageType: 'jpeg',
    imageQuality: 0.98,
    scale: 2,
  },

  // ── Resume canvas background ────────────────────────────────
  canvas: {
    wrapperBackground: '#d8d8d8',
    wrapperPadding: '0',
    pageShadow: '0 0 24px rgba(0,0,0,0.18)',
    leftColumnBackground: '',
    leftColumnBorderRight: '1px solid #ebebeb',
  },

  // ── Fonts available in Format panel ─────────────────────────
  fonts: ['Inter', 'Georgia', 'Merriweather', 'Roboto Mono'],

  // ── Default format values ────────────────────────────────────
  defaults: {
    spacing: 5,
    documentSize: 'a4',
    font: 'Inter',
    theme: 'oliveGreen',
    layoutPreset: 'standard',
    showPhoto: true,
    showTitle: true,
    showSummary: true,
  },

};

export default CONFIG;

// ── localStorage key ─────────────────────────────────────────
const CONFIG_STORAGE_KEY = 'resume-editor-config';

/** Load runtime overrides from localStorage and merge over defaults */
export function loadConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      const merged = deepMerge(CONFIG, JSON.parse(saved));
      // Ensure leftColumnBackground is never forced to #fff (controlled by theme now)
      if (merged.canvas?.leftColumnBackground === '#fff') {
        merged.canvas.leftColumnBackground = '';
      }
      return merged;
    }
  } catch {}
  return CONFIG;
}

/** Persist a partial config override to localStorage */
export function saveConfigOverride(partial) {
  try {
    const existing = JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) || '{}');
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(deepMerge(existing, partial)));
  } catch {}
}

/** Reset all config overrides */
export function resetConfig() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
}

function deepMerge(base, override) {
  const out = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])
        && base[key] && typeof base[key] === 'object') {
      out[key] = deepMerge(base[key], override[key]);
    } else {
      out[key] = override[key];
    }
  }
  return out;
}
