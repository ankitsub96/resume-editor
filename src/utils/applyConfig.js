import { loadConfig } from '../config.js';

export function applyConfigToDOM(cfg, formatSpacing) {
  const r = document.documentElement;
  const s = (v, k) => r.style.setProperty(v, k);

  // Spacing CSS vars
  if (formatSpacing !== undefined) {
    const sp = cfg.spacing || {};
    const sv = formatSpacing;
    const sectionGap = `${(sp.sectionGapBase ?? 0.4) + (sv - 1) * (sp.sectionGapStep ?? 0.18)}rem`;
    const itemGap    = `${(sp.itemGapBase ?? 0.3) + (sv - 1) * (sp.itemGapStep ?? 0.1)}rem`;
    const lineHeight = `${(sp.lineHeightBase ?? 1.3) + (sv - 1) * (sp.lineHeightStep ?? 0.05)}`;
    s('--section-gap', sectionGap);
    s('--item-gap', itemGap);
    s('--line-height', lineHeight);
  }

  const t = cfg.typography || {};
  document.querySelectorAll('.section-title').forEach(el => {
    el.style.fontSize = t.sectionTitleSize || '';
    el.style.fontWeight = t.sectionTitleWeight || '';
    el.style.letterSpacing = t.sectionTitleLetterSpacing || '';
  });
  document.querySelectorAll('.item-title').forEach(el => {
    el.style.fontSize = t.itemTitleSize || '';
    el.style.fontWeight = t.itemTitleWeight || '';
  });
  document.querySelectorAll('.bullet-item').forEach(el => {
    el.style.fontSize = t.bulletSize || '';
  });
  document.querySelectorAll('.header-name').forEach(el => {
    el.style.fontSize = t.headerNameSize || '';
    el.style.fontWeight = t.headerNameWeight || '';
  });
  document.querySelectorAll('.header-title').forEach(el => {
    el.style.fontSize = t.headerTitleSize || '';
  });
  document.querySelectorAll('.header-summary').forEach(el => {
    el.style.fontSize = t.headerSummarySize || '';
    el.style.lineHeight = t.headerSummaryLineHeight || '';
  });
  document.querySelectorAll('.skill-chip').forEach(el => {
    el.style.fontSize = t.tagFontSize || '';
  });

  const st = cfg.sectionTitle || {};
  document.querySelectorAll('.section-title-row').forEach(el => {
    el.style.marginBottom = st.marginBottom || '';
    el.style.borderBottomWidth = st.borderBottomWidth || '';
  });
  if (st.accentBlockWidth) s('--section-accent-width', st.accentBlockWidth);
  if (st.accentMarginRight) s('--section-accent-margin', st.accentMarginRight);

  const h = cfg.header || {};
  document.querySelectorAll('.header-photo').forEach(el => {
    el.style.width = h.photoSize || '';
    el.style.height = h.photoSize || '';
    el.style.borderWidth = h.photoBorderWidth || '';
  });

  const c = cfg.canvas || {};
  document.querySelectorAll('.resume-wrapper').forEach(el => {
    el.style.background = c.wrapperBackground || '';
  });
  document.querySelectorAll('.column-left').forEach(el => {
    el.style.background = c.leftColumnBackground || '';
    el.style.borderRight = c.leftColumnBorderRight || '';
  });

  const tb = cfg.toolbar || {};
  document.querySelectorAll('.toolbar').forEach(el => {
    el.style.background = tb.background || '';
    el.style.height = tb.height || '';
  });

  const doc = cfg.document || {};
  if (doc.a4Width || doc.letterWidth) {
    const canvas = document.getElementById('resume-canvas');
    if (canvas) {
      const isLetter = canvas.style.minWidth === '816px';
      canvas.style.width = isLetter ? (doc.letterWidth || '816px') : (doc.a4Width || '794px');
      canvas.style.minWidth = canvas.style.width;
    }
  }
}

/** Call once on app startup to re-apply any saved config overrides */
export function applyConfigOnStartup() {
  applyConfigToDOM(loadConfig());
}
