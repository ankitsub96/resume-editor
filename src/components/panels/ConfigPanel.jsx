import { useState, useEffect } from 'react';
import CONFIG, { loadConfig, saveConfigOverride, resetConfig } from '../../config.js';
import './ConfigPanel.css';

/**
 * Config panel — lets you tweak any value in config.js at runtime.
 * Changes persist to localStorage and apply instantly via CSS vars + inline styles.
 * You can also paste a full/partial JSON blob to bulk-apply values.
 */
export default function ConfigPanel({ onClose }) {
  const [cfg, setCfg] = useState(() => loadConfig());
  const [pasteText, setPasteText] = useState('');
  const [pasteError, setPasteError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('typography');

  // Apply config to CSS vars instantly on every change
  useEffect(() => {
    applyConfigToDOM(cfg);
  }, [cfg]);

  function handleChange(path, value) {
    const next = setNestedValue(cfg, path, value);
    setCfg(next);
    saveConfigOverride(setNestedValue({}, path, value));
    applyConfigToDOM(next);
  }

  function handlePaste() {
    setPasteError('');
    try {
      const parsed = JSON.parse(pasteText);
      const next = deepMerge(cfg, parsed);
      setCfg(next);
      saveConfigOverride(parsed);
      applyConfigToDOM(next);
      setPasteText('');
    } catch (e) {
      setPasteError('Invalid JSON: ' + e.message);
    }
  }

  function handleReset() {
    resetConfig();
    setCfg(CONFIG);
    applyConfigToDOM(CONFIG);
  }

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const SECTIONS = {
    typography: 'Typography',
    spacing: 'Spacing',
    header: 'Header',
    sectionTitle: 'Section Titles',
    canvas: 'Canvas',
    presets: 'Presets',
    document: 'Document',
    pdf: 'PDF Export',
    toolbar: 'Toolbar',
  };

  return (
    <div className="config-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="config-panel">
        <div className="config-header">
          <span className="config-title">⚙ Config</span>
          <div className="config-header-actions">
            <button className="cfg-btn" onClick={handleCopy}>{copied ? '✓ Copied' : 'Copy JSON'}</button>
            <button className="cfg-btn cfg-btn--danger" onClick={handleReset}>Reset</button>
            <button className="config-close" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="config-body">
          {/* Left nav */}
          <div className="config-nav">
            {Object.entries(SECTIONS).map(([key, label]) => (
              <button key={key}
                className={`config-nav-item ${activeSection === key ? 'active' : ''}`}
                onClick={() => setActiveSection(key)}>
                {label}
              </button>
            ))}
            <div className="config-nav-divider" />
            <div className="config-paste-area">
              <p className="config-paste-label">Paste full/partial config JSON</p>
              <textarea
                className="config-paste-input"
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={'Paste full or partial config JSON.\nUse "Copy JSON" to get the current full config, edit it externally, then paste back.'}
                rows={6}
              />
              {pasteError && <p className="config-paste-error">{pasteError}</p>}
              <button className="cfg-btn cfg-btn--primary" onClick={handlePaste} disabled={!pasteText.trim()}>
                Apply JSON
              </button>
            </div>
          </div>

          {/* Right fields */}
          <div className="config-fields">
            <ConfigSection title={SECTIONS[activeSection]}>
              {Object.entries(cfg[activeSection] || {}).map(([key, value]) => (
                <ConfigField
                  key={key}
                  label={key}
                  value={value}
                  onChange={(v) => handleChange([activeSection, key], v)}
                />
              ))}
            </ConfigSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigSection({ title, children }) {
  return (
    <div className="config-section-block">
      <h3 className="config-section-heading">{title}</h3>
      <div className="config-field-list">{children}</div>
    </div>
  );
}

// Ranges for bare JS number fields: [min, max, step]
const NUM_RANGES = {
  sectionGapBase:    [0, 3,    0.05],
  sectionGapStep:    [0, 1,    0.01],
  itemGapBase:       [0, 2,    0.05],
  itemGapStep:       [0, 0.5,  0.01],
  lineHeightBase:    [1, 2.5,  0.05],
  lineHeightStep:    [0, 0.2,  0.01],
  scale:             [1, 4,    0.5],
  imageQuality:      [0, 1,    0.01],
};

// Parse a CSS string value into { num, unit } or null
function parseCSSValue(str) {
  if (typeof str !== 'string') return null;
  const m = str.match(/^(-?[\d.]+)(rem|px|em|%|vh|vw)?$/);
  if (!m) return null;
  return { num: parseFloat(m[1]), unit: m[2] || '' };
}

// Determine slider range based on unit and value
function cssRange(unit, num) {
  if (unit === 'rem') return [0.4, 4,   0.01];
  if (unit === 'px')  return [1,   120, 1];
  if (unit === 'em')  return [0,   1,   0.005];
  if (unit === '%')   return [0,   100, 1];
  // unitless
  if (num >= 100)     return [100, 900, 100]; // font-weight
  if (num > 1)        return [1,   5,   0.05]; // line-height, font-size multiplier
  return              [0,    2,   0.01];
}

function ConfigField({ label, value, onChange }) {
  if (Array.isArray(value)) {
    return (
      <div className="config-field">
        <label className="config-field-label">{label}</label>
        <input className="config-field-input" value={value.join(', ')}
          onChange={(e) => onChange(e.target.value.split(',').map(s => s.trim()))} />
      </div>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <div className="config-field config-field--bool">
        <label className="config-field-label">{label}</label>
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      </div>
    );
  }
  if (typeof value === 'number') {
    const trimmedLabel = label.trim();
    const range = NUM_RANGES[trimmedLabel] || [0, 10, 0.1];
    const [min, max, step] = range;
    return (
      <div className="config-field config-field--slider">
        <label className="config-field-label">{label}</label>
        <div className="config-slider-row">
          <input type="range" className="config-slider"
            min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(Number(e.target.value))} />
          <span className="config-slider-val">{value}</span>
        </div>
      </div>
    );
  }
  if (typeof value === 'object') {
    // nested object — render sub-fields
    return (
      <div className="config-field-group">
        <p className="config-field-group-label">{label}</p>
        {Object.entries(value).map(([k, v]) => (
          <ConfigField key={k} label={`  ${k}`} value={v} onChange={(nv) => {
            onChange({ ...value, [k]: nv });
          }} />
        ))}
      </div>
    );
  }
  // string — check for CSS numeric value first
  const cssVal = parseCSSValue(value);
  if (cssVal) {
    const [min, max, step] = cssRange(cssVal.unit, cssVal.num);
    return (
      <div className="config-field config-field--slider">
        <label className="config-field-label">{label}</label>
        <div className="config-slider-row">
          <input type="range" className="config-slider"
            min={min} max={max} step={step} value={cssVal.num}
            onChange={(e) => onChange(e.target.value + cssVal.unit)} />
          <span className="config-slider-val">{value}</span>
        </div>
      </div>
    );
  }

  // string / css value — detect color
  const isColor = /^#([0-9a-fA-F]{3,8})$/.test(value) || /^rgb/.test(value);
  return (
    <div className="config-field">
      <label className="config-field-label">{label}</label>
      <div className="config-field-row">
        {isColor && (
          <input type="color" className="config-color-swatch"
            value={value.startsWith('#') ? value : '#000000'}
            onChange={(e) => onChange(e.target.value)} />
        )}
        <input className="config-field-input" value={value}
          onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

// ── DOM application ──────────────────────────────────────────────────────────

function applyConfigToDOM(cfg) {
  const r = document.documentElement;
  const s = (v, k) => r.style.setProperty(v, k);

  // Typography
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

  // Section title block
  const st = cfg.sectionTitle || {};
  document.querySelectorAll('.section-title-row').forEach(el => {
    el.style.marginBottom = st.marginBottom || '';
    el.style.borderBottomWidth = st.borderBottomWidth || '';
  });
  // Inject dynamic ::before width via CSS var
  if (st.accentBlockWidth) s('--section-accent-width', st.accentBlockWidth);
  if (st.accentMarginRight) s('--section-accent-margin', st.accentMarginRight);

  // Header
  const h = cfg.header || {};
  document.querySelectorAll('.header-photo').forEach(el => {
    el.style.width = h.photoSize || '';
    el.style.height = h.photoSize || '';
    el.style.borderWidth = h.photoBorderWidth || '';
  });

  // Canvas
  const c = cfg.canvas || {};
  document.querySelectorAll('.resume-wrapper').forEach(el => {
    el.style.background = c.wrapperBackground || '';
  });
  document.querySelectorAll('.column-left').forEach(el => {
    el.style.background = c.leftColumnBackground || '';
    el.style.borderRight = c.leftColumnBorderRight || '';
  });

  // Toolbar
  const tb = cfg.toolbar || {};
  document.querySelectorAll('.toolbar').forEach(el => {
    el.style.background = tb.background || '';
    el.style.height = tb.height || '';
  });

  // Document widths (update canvas)
  const doc = cfg.document || {};
  if (doc.a4Width || doc.letterWidth) {
    // The canvas reads from format.documentSize — just set both as data attributes
    const canvas = document.getElementById('resume-canvas');
    if (canvas) {
      // width is set inline by Resume.jsx based on documentSize; re-apply here
      const isLetter = canvas.style.minWidth === '816px';
      canvas.style.width = isLetter ? (doc.letterWidth || '816px') : (doc.a4Width || '794px');
      canvas.style.minWidth = canvas.style.width;
    }
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function setNestedValue(obj, path, value) {
  if (path.length === 1) return { ...obj, [path[0]]: value };
  return { ...obj, [path[0]]: setNestedValue(obj[path[0]] || {}, path.slice(1), value) };
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
