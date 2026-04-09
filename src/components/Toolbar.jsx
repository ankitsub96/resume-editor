import { useState, useRef, useEffect } from 'react';
import { useResume } from '../context/ResumeContext.jsx';
import ThemePanel from './panels/ThemePanel.jsx';
import LayoutPanel from './panels/LayoutPanel.jsx';
import FormatPanel from './panels/FormatPanel.jsx';
import HistoryPanel from './panels/HistoryPanel.jsx';
import ConfigPanel from './panels/ConfigPanel.jsx';
import './Toolbar.css';

const PANEL_KEYS = ['themes', 'layout', 'format', 'history'];

export default function Toolbar({ onDownload }) {
  const { state, dispatch, canUndo, canRedo } = useResume();
  const [activePanel, setActivePanel] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const toolbarRef = useRef(null);

  function togglePanel(key) {
    setActivePanel((cur) => (cur === key ? null : key));
  }

  function closePanel() {
    setActivePanel(null);
  }

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e) {
      if (activePanel && toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        // Only close non-history panels on outside click
        if (activePanel !== 'history') setActivePanel(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activePanel]);

  function handleDownload() {
    setActivePanel(null);
    onDownload();
  }

  return (
    <div className="toolbar" ref={toolbarRef}>
      <div className="toolbar-left">
        <span className="toolbar-brand">Resume Editor</span>
      </div>

      <div className="toolbar-center">
        {/* Undo / Redo */}
        <button
          className="toolbar-btn"
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          ↩ Undo
        </button>
        <button
          className="toolbar-btn"
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          Redo ↪
        </button>

        <span className="toolbar-sep" />

        {/* Layout */}
        <div className="toolbar-panel-anchor">
          <button
            className={`toolbar-btn ${activePanel === 'layout' ? 'active' : ''}`}
            onClick={() => togglePanel('layout')}
          >
            ⊞ Layout
          </button>
          {activePanel === 'layout' && <LayoutPanel onClose={closePanel} />}
        </div>

        {/* Themes */}
        <div className="toolbar-panel-anchor">
          <button
            className={`toolbar-btn ${activePanel === 'themes' ? 'active' : ''}`}
            onClick={() => togglePanel('themes')}
          >
            ◑ Themes
          </button>
          {activePanel === 'themes' && <ThemePanel onClose={closePanel} />}
        </div>

        {/* Format */}
        <div className="toolbar-panel-anchor">
          <button
            className={`toolbar-btn ${activePanel === 'format' ? 'active' : ''}`}
            onClick={() => togglePanel('format')}
          >
            ≡ Format
          </button>
          {activePanel === 'format' && <FormatPanel onClose={closePanel} />}
        </div>
      </div>

      <div className="toolbar-right">
        {/* History */}
        <button
          className={`toolbar-btn ${activePanel === 'history' ? 'active' : ''}`}
          onClick={() => togglePanel('history')}
          title="Edit History"
        >
          🕐 History
        </button>

        {/* Config */}
        <button className="toolbar-btn" onClick={() => setShowConfig(true)} title="Edit config">
          ⚙
        </button>

        {/* Print to PDF — vector PDF with clickable links */}
        <button className="toolbar-btn" onClick={() => window.print()} title="Print / Save as PDF (links are clickable)">
          ⎙ Print PDF
        </button>

        {/* Download */}
        <button className="toolbar-btn toolbar-btn--primary" onClick={handleDownload}>
          ↓ Download PDF
        </button>
      </div>

      {/* History panel */}
      {activePanel === 'history' && <HistoryPanel onClose={closePanel} />}

      {/* Config popup */}
      {showConfig && <ConfigPanel onClose={() => setShowConfig(false)} />}
    </div>
  );
}
