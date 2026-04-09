import { useState, useRef, useEffect } from 'react';
import { RgbaColorPicker, RgbaStringColorPicker } from 'react-colorful';
import { useResume } from '../../context/ResumeContext.jsx';
import { THEMES } from '../../themes/themes.js';
import './Panel.css';
import './ThemePanel.css';

const BG_PRESETS = [
  { label: 'White',     color: '#ffffff' },
  { label: 'Off-white', color: '#fafaf8' },
  { label: 'Warm',      color: '#fdf8f0' },
  { label: 'Cool gray', color: '#f5f6f8' },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function hexToRgba(hex, a = 1) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
    a,
  };
}

function rgbaToHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

function rgbaToString({ r, g, b, a }) {
  return a >= 1 ? rgbaToHex({ r, g, b }) : `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a.toFixed(2)})`;
}

function parseRaw(str) {
  str = str.trim();
  const hex6 = str.match(/^#?([0-9a-f]{6})$/i);
  if (hex6) return hexToRgba('#' + hex6[1]);
  const hex3 = str.match(/^#?([0-9a-f]{3})$/i);
  if (hex3) {
    const [r, g, b] = hex3[1].split('').map(x => parseInt(x + x, 16));
    return { r, g, b, a: 1 };
  }
  const rgba = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (rgba) return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] != null ? +rgba[4] : 1 };
  return null;
}

// ── ColorPicker popup ─────────────────────────────────────────────────────────

function ColorPicker({ rgba, onChange }) {
  const [raw, setRaw] = useState('');
  const [rawEditing, setRawEditing] = useState(false);

  function commitRaw(val) {
    const parsed = parseRaw(val);
    if (parsed) onChange(parsed);
    setRawEditing(false);
    setRaw('');
  }

  const displayStr = rgbaToString(rgba);

  return (
    <>
      <RgbaColorPicker color={rgba} onChange={onChange} />
      <input
        className="cp-raw-input"
        value={rawEditing ? raw : displayStr}
        onChange={e => { setRawEditing(true); setRaw(e.target.value); }}
        onBlur={e => rawEditing && commitRaw(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') commitRaw(e.target.value);
          if (e.key === 'Escape') { setRawEditing(false); setRaw(''); }
        }}
        spellCheck={false}
        placeholder="hex / rgba(…)"
      />
    </>
  );
}

// ── ColorSwatch — swatch that opens picker on click ───────────────────────────

function ColorSwatch({ hex, opacity = 100, onHex, onOpacity, size = 28 }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const popupRef = useRef(null);

  const rgba = hexToRgba(hex || '#ffffff', (opacity ?? 100) / 100);

  function handleChange({ r, g, b, a }) {
    onHex(rgbaToHex({ r, g, b }));
    onOpacity(Math.round(a * 100));
  }

  function handleOpen() {
    if (open) { setOpen(false); return; }
    const rect = btnRef.current.getBoundingClientRect();
    const popupW = 232;
    const popupH = 260;
    let left = rect.left;
    let top = rect.bottom + 6;
    if (left + popupW > window.innerWidth - 8) left = window.innerWidth - popupW - 8;
    if (top + popupH > window.innerHeight - 8) top = rect.top - popupH - 6;
    setPos({ top, left });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        popupRef.current && !popupRef.current.contains(e.target)
      ) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const previewBg = rgbaToString(rgba);

  return (
    <>
      <button
        ref={btnRef}
        className="cp-swatch-btn"
        style={{ width: size, height: size, background: previewBg }}
        onClick={handleOpen}
        title="Pick color"
      />
      {open && (
        <div ref={popupRef} className="cp-popup" style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}>
          <ColorPicker rgba={rgba} onChange={handleChange} />
        </div>
      )}
    </>
  );
}

// ── Accent palette — rows of colors, horizontally scrollable ─────────────────
// Each group of 3 = [bright, medium, dark] for one hue.
// Grid flows column-by-column (3 rows), so each column is one hue family.
const ACCENT_PALETTE = [
  '#a855f7','#7c3aed','#5b21b6', // Violet
  '#818cf8','#4f46e5','#3730a3', // Indigo
  '#60a5fa','#2563eb','#1e40af', // Blue
  '#38bdf8','#0284c7','#075985', // Sky
  '#22d3ee','#0891b2','#155e75', // Cyan
  '#2dd4bf','#0d9488','#115e59', // Teal
  '#4ade80','#16a34a','#166534', // Green
  '#86efac','#5a7a4a','#276749', // Olive green
  '#a3e635','#65a30d','#3f6212', // Lime
  '#fbbf24','#d97706','#b45309', // Amber
  '#fb923c','#ea580c','#9a3412', // Orange
  '#f87171','#dc2626','#991b1b', // Red
  '#fb7185','#e11d48','#881337', // Rose
  '#f472b6','#db2777','#9d174d', // Pink
  '#94a3b8','#64748b','#334155', // Slate
  '#9ca3af','#4b5563','#1f2937', // Charcoal
];

// ── ThemePanel ────────────────────────────────────────────────────────────────

export default function ThemePanel({ onClose, pinned = false }) {
  const { state, dispatch } = useResume();

  const chipTextColor = state.chipTextColor || 'auto';
  const accentHex = state.customAccent || THEMES[state.theme]?.vars['--primary'] || '#5a7a4a';
  const bgHex = state.canvasBackground || '#ffffff';

  function pickAccent(hex) {
    dispatch({ type: 'SET_CUSTOM_ACCENT', color: hex });
  }

  return (
    <div className={pinned ? 'panel-sidebar' : 'panel'} style={!pinned ? { minWidth: 280 } : {}}>
      <div className="panel-header">
        <span>Color Theme</span>
        {!pinned && <button className="panel-close" onClick={onClose}>×</button>}
      </div>
      <div className="panel-body">

        {/* Accent Color */}
        <p className="panel-label">Accent Color</p>
        <div className="accent-scroll">
          {ACCENT_PALETTE.map(hex => (
            <button key={hex}
              className={`accent-dot${accentHex === hex ? ' active' : ''}`}
              style={{ background: hex }}
              title={hex}
              onClick={() => pickAccent(hex)}
            >
              {accentHex === hex && <span className="swatch-check">✓</span>}
            </button>
          ))}
        </div>
        <div className="accent-custom-row">
          <span className="accent-custom-label">Custom color</span>
          <ColorSwatch
            hex={accentHex}
            opacity={state.customAccentOpacity ?? 100}
            onHex={color => dispatch({ type: 'SET_CUSTOM_ACCENT', color })}
            onOpacity={value => dispatch({ type: 'SET_CUSTOM_ACCENT_OPACITY', value })}
          />
        </div>

        {/* Background */}
        <p className="panel-label" style={{ marginTop: 16 }}>Background</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {BG_PRESETS.map(({ label, color }) => (
            <button key={color}
              style={{
                width: 36, height: 26, borderRadius: 4, cursor: 'pointer',
                border: bgHex === color && (state.canvasBackgroundOpacity ?? 100) === 100
                  ? '2px solid var(--primary)' : '1.5px solid #ddd',
                background: color,
              }}
              title={label}
              onClick={() => {
                dispatch({ type: 'SET_CANVAS_BG', color });
                dispatch({ type: 'SET_CANVAS_BG_OPACITY', value: 100 });
              }}
            />
          ))}
          <div className="custom-swatch-wrap">
            <span className="custom-swatch-label">Custom</span>
            <ColorSwatch
              hex={bgHex}
              opacity={state.canvasBackgroundOpacity ?? 100}
              onHex={color => dispatch({ type: 'SET_CANVAS_BG', color })}
              onOpacity={value => dispatch({ type: 'SET_CANVAS_BG_OPACITY', value })}
            />
          </div>
        </div>

        {/* Chip text */}
        <p className="panel-label" style={{ marginTop: 16 }}>Skill Chip Text</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {[['auto', 'Auto'], ['#ffffff', 'White'], ['#111111', 'Dark']].map(([val, lbl]) => (
            <button key={val}
              onClick={() => dispatch({ type: 'SET_CHIP_TEXT_COLOR', color: val })}
              style={{
                padding: '4px 9px', borderRadius: 4, fontSize: '0.73rem', cursor: 'pointer',
                border: chipTextColor === val ? '2px solid var(--primary)' : '1.5px solid #ddd',
                background: val === '#ffffff' ? '#333' : val === '#111111' ? '#fff' : 'rgba(90,122,74,0.08)',
                color: val === '#ffffff' ? '#fff' : '#333',
              }}
            >{lbl}</button>
          ))}
          <div className="custom-swatch-wrap">
            <span className="custom-swatch-label">Custom</span>
            <ColorSwatch
              hex={chipTextColor === 'auto' ? '#ffffff' : chipTextColor}
              opacity={100}
              onHex={color => dispatch({ type: 'SET_CHIP_TEXT_COLOR', color })}
              onOpacity={() => {}}
              size={24}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
