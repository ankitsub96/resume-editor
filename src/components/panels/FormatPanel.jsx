import { useResume } from '../../context/ResumeContext.jsx';
import './Panel.css';

const FONTS = ['Inter', 'Georgia', 'Merriweather', 'Roboto Mono'];
const SPACING_MAX = 15;
const FONT_MIN = 10;
const FONT_MAX = 18;

function StepSlider({ label, value, min, max, onChange, formatLabel }) {
  const steps = max - min + 1;
  return (
    <>
      <div className="spacing-label-row">
        <p className="panel-label" style={{ margin: 0 }}>{label}</p>
        <span className="spacing-badge">{formatLabel ? formatLabel(value) : value}</span>
      </div>
      <div className="spacing-control">
        <button className="spacing-arrow" onClick={() => onChange(Math.max(min, value - 1))}>‹</button>
        <div className="spacing-track-wrap">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="format-slider spacing-slider"
          />
          <div className="spacing-dots">
            {Array.from({ length: steps }, (_, i) => (
              <span key={i} className={`spacing-dot${min + i <= value ? ' active' : ''}`} />
            ))}
          </div>
          <div className="spacing-minmax">
            <span>Min</span><span>Max</span>
          </div>
        </div>
        <button className="spacing-arrow" onClick={() => onChange(Math.min(max, value + 1))}>›</button>
      </div>
    </>
  );
}

export default function FormatPanel({ onClose, pinned = false }) {
  const { state, dispatch } = useResume();
  const { format } = state;

  function setFormat(payload, label) {
    dispatch({ type: 'SET_FORMAT', payload, historyLabel: label });
  }

  return (
    <div className={pinned ? 'panel-sidebar panel-sidebar--right' : 'panel'}>
      <div className="panel-header">
        <span>Format</span>
        {!pinned && <button className="panel-close" onClick={onClose}>×</button>}
      </div>
      <div className="panel-body">

        <p className="panel-label">Font</p>
        <select
          value={format.font}
          onChange={(e) => setFormat({ font: e.target.value }, `Changed font to ${e.target.value}`)}
          style={{ width: '100%', padding: '5px 8px', borderRadius: 4, border: '1px solid #ddd', marginBottom: 14, fontSize: '0.8rem' }}
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <StepSlider
          label="Font Size"
          value={format.fontSize ?? 13}
          min={FONT_MIN}
          max={FONT_MAX}
          onChange={(v) => setFormat({ fontSize: v }, 'Changed font size')}
          formatLabel={(v) => `${v}px`}
        />

        <StepSlider
          label="Content Spacing"
          value={format.spacing}
          min={1}
          max={SPACING_MAX}
          onChange={(v) => setFormat({ spacing: v }, 'Changed spacing')}
        />

        <p className="panel-label">Document Size</p>
        <div className="format-radio-group" style={{ marginBottom: 14 }}>
          {['a4', 'letter'].map((size) => (
            <label key={size} className="format-radio">
              <input
                type="radio"
                name="docSize"
                value={size}
                checked={format.documentSize === size}
                onChange={() => setFormat({ documentSize: size }, `Changed document size to ${size.toUpperCase()}`)}
              />
              {size === 'a4' ? 'A4' : 'US Letter'}
            </label>
          ))}
        </div>

        <label className="toggle-row">
          <input
            type="checkbox"
            checked={format.showListLabels}
            onChange={(e) => setFormat({ showListLabels: e.target.checked }, 'Toggled list labels')}
          />
          Show List Labels
        </label>

      </div>
    </div>
  );
}
