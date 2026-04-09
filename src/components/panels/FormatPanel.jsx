import { useResume } from '../../context/ResumeContext.jsx';
import './Panel.css';

const FONTS = ['Inter', 'Georgia', 'Merriweather', 'Roboto Mono'];

export default function FormatPanel({ onClose }) {
  const { state, dispatch } = useResume();
  const { format } = state;

  function setFormat(payload, label) {
    dispatch({ type: 'SET_FORMAT', payload, historyLabel: label });
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <span>Format</span>
        <button className="panel-close" onClick={onClose}>×</button>
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

        <p className="panel-label">Content Spacing</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: '0.7rem', color: '#888' }}>Min</span>
          <input
            type="range"
            min={1}
            max={10}
            value={format.spacing}
            onChange={(e) => setFormat({ spacing: Number(e.target.value) }, 'Changed spacing')}
            className="format-slider"
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: '0.7rem', color: '#888' }}>Max</span>
        </div>

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
