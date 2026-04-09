import { useState } from 'react';
import { useResume } from '../../context/ResumeContext.jsx';
import { SECTION_REGISTRY, getAddableTypes } from '../../sections/sectionRegistry.js';
import './Panel.css';

const PRESETS = [
  {
    key: 'classic',
    name: 'Classic',
    desc: 'Narrow sidebar + wide main',
    leftW: '30%',
    rightW: '70%',
  },
  {
    key: 'standard',
    name: 'Standard',
    desc: 'Two equal columns',
    leftW: '50%',
    rightW: '50%',
  },
  {
    key: 'modern',
    name: 'Modern',
    desc: 'Wide main + narrow sidebar',
    leftW: '60%',
    rightW: '40%',
  },
];

export default function LayoutPanel({ onClose }) {
  const { state, dispatch } = useResume();
  const [tab, setTab] = useState('presets');

  const { layout, resume } = state;
  const sections = resume.sections;

  const existingTypes = sections.map((s) => s.type);
  const addableTypes = getAddableTypes(existingTypes);

  function setPreset(key) {
    dispatch({
      type: 'SET_LAYOUT',
      payload: { preset: key },
      historyLabel: `Applied ${key} layout`,
    });
  }

  function setMode(mode) {
    dispatch({
      type: 'SET_LAYOUT',
      payload: { mode },
      historyLabel: `Switched to ${mode} layout`,
    });
  }

  function toggleOption(key, label) {
    dispatch({
      type: 'SET_LAYOUT',
      payload: { [key]: !layout[key] },
      historyLabel: `${layout[key] ? 'Hidden' : 'Shown'} ${label}`,
    });
  }

  function moveSection(sectionId, column) {
    dispatch({ type: 'MOVE_SECTION', sectionId, column });
  }

  function removeSection(sectionId) {
    dispatch({ type: 'REMOVE_SECTION', sectionId });
  }

  function addSection(reg) {
    dispatch({ type: 'ADD_SECTION', sectionDef: reg });
  }

  const leftSecs = sections.filter((s) => s.column === 'left');
  const rightSecs = sections.filter((s) => s.column === 'right');

  return (
    <div className="panel" style={{ minWidth: 300, maxWidth: 360 }}>
      <div className="panel-header">
        <span>Layout</span>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>

      {/* Tab bar */}
      <div className="layout-tabs">
        <button className={`layout-tab ${tab === 'presets' ? 'active' : ''}`} onClick={() => setTab('presets')}>Presets</button>
        <button className={`layout-tab ${tab === 'custom' ? 'active' : ''}`} onClick={() => setTab('custom')}>Custom</button>
      </div>

      <div className="panel-body">
        {tab === 'presets' && (
          <>
            <div className="preset-cards">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  className={`preset-card ${layout.preset === p.key ? 'active' : ''}`}
                  onClick={() => setPreset(p.key)}
                >
                  <div className="preset-name">{p.name} <span style={{ fontWeight: 400, fontSize: '0.72rem', color: '#888' }}>— {p.desc}</span></div>
                  <div className="preset-diagram">
                    <div className="preset-col left-col" style={{ width: p.leftW }} />
                    <div className="preset-col right-col" style={{ flex: 1 }} />
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <p className="panel-label">Toggles</p>
              <label className="toggle-row">
                <input type="checkbox" checked={layout.mode === 'one-column'} onChange={() => setMode(layout.mode === 'one-column' ? 'two-column' : 'one-column')} />
                One Column Document
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={layout.showTitle} onChange={() => toggleOption('showTitle', 'title')} />
                Show Job Title
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={layout.showSummary} onChange={() => toggleOption('showSummary', 'summary')} />
                Show Summary
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={layout.showPhoto} onChange={() => toggleOption('showPhoto', 'photo')} />
                Show Photo
              </label>
            </div>
          </>
        )}

        {tab === 'custom' && (
          <>
            <label className="toggle-row" style={{ marginBottom: 10 }}>
              <input type="checkbox" checked={layout.mode === 'one-column'} onChange={() => setMode(layout.mode === 'one-column' ? 'two-column' : 'one-column')} />
              One Column Document
            </label>

            <div className="custom-columns">
              {/* Left column */}
              <div className="custom-col-box">
                <div className="custom-col-label">Left Column</div>
                {leftSecs.map((s) => {
                  const reg = SECTION_REGISTRY[s.type];
                  return (
                    <div key={s.id} className="section-chip">
                      <span className="section-chip-icon">{reg?.icon ?? '§'}</span>
                      <span className="section-chip-label">{s.title}</span>
                      <button className="chip-remove" title="Move right" onClick={() => moveSection(s.id, 'right')}>→</button>
                      <button className="chip-remove" title="Remove" onClick={() => removeSection(s.id)}>×</button>
                    </div>
                  );
                })}
              </div>

              {/* Right column */}
              <div className="custom-col-box">
                <div className="custom-col-label">Right Column</div>
                {rightSecs.map((s) => {
                  const reg = SECTION_REGISTRY[s.type];
                  return (
                    <div key={s.id} className="section-chip">
                      <span className="section-chip-icon">{reg?.icon ?? '§'}</span>
                      <span className="section-chip-label">{s.title}</span>
                      <button className="chip-remove" title="Move left" onClick={() => moveSection(s.id, 'left')}>←</button>
                      <button className="chip-remove" title="Remove" onClick={() => removeSection(s.id)}>×</button>
                    </div>
                  );
                })}
              </div>
            </div>

            {addableTypes.length > 0 && (
              <>
                <p className="pool-label">Add Section</p>
                <div className="pool-chips">
                  {addableTypes.map((reg) => (
                    <button key={reg.type} className="pool-chip" onClick={() => addSection(reg)}>
                      {reg.icon} {reg.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
