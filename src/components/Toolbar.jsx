import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { useResume } from '../context/ResumeContext.jsx';
const ImportPDFModal = lazy(() => import('./ImportPDFModal.jsx'));
import ThemePanel from './panels/ThemePanel.jsx';
import LayoutPanel from './panels/LayoutPanel.jsx';
import FormatPanel from './panels/FormatPanel.jsx';
import HistoryPanel from './panels/HistoryPanel.jsx';
import ConfigPanel from './panels/ConfigPanel.jsx';
import './Toolbar.css';

const PANEL_KEYS = ['themes', 'layout', 'format', 'history'];

export default function Toolbar({ onDownload, pinnedPanels = false, showSidebars = true, onToggleSidebars, showTemplates = false, onTemplates }) {
  const { state, dispatch, canUndo, canRedo } = useResume();
  const accent = state.customAccent || 'var(--primary)';
  const [activePanel, setActivePanel] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);
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

  const handleCopyJson = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 1500);
  }, [state]);

  function handleJsonImport() {
    try {
      const parsed = JSON.parse(jsonText);
      dispatch({ type: 'LOAD_STATE', state: parsed });
      setShowJsonImport(false);
      setJsonText('');
      setJsonError('');
    } catch {
      setJsonError('Invalid JSON');
    }
  }

  function handleDownload() {
    setActivePanel(null);
    onDownload();
  }

  return (
    <div className="toolbar" ref={toolbarRef} style={{ background: accent }}>
      <div className="toolbar-left">
        <span className="toolbar-brand">Resume Editor</span>
        {onTemplates && (
          <button
            className={`toolbar-btn${showTemplates ? ' active' : ''}`}
            onClick={onTemplates}
            title="Browse templates"
          >
            {showTemplates ? '← Editor' : '⊞ Templates'}
          </button>
        )}
      </div>

      <div className="toolbar-center">
        {/* Undo / Redo */}
        <button
          className="toolbar-btn"
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          ⟲ Undo
        </button>
        <button
          className="toolbar-btn"
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          Redo ⟳
        </button>

        <span className="toolbar-sep" />

        {/* Layout */}
        <div className="toolbar-panel-anchor">
          <button
            className={`toolbar-btn ${activePanel === 'layout' ? 'active' : ''}`}
            onClick={() => togglePanel('layout')}
          >
            ▤ Layout
          </button>
          {activePanel === 'layout' && <LayoutPanel onClose={closePanel} />}
        </div>

        {/* Themes — hidden when pinned as sidebar */}
        {!pinnedPanels && (
          <div className="toolbar-panel-anchor">
            <button
              className={`toolbar-btn ${activePanel === 'themes' ? 'active' : ''}`}
              onClick={() => togglePanel('themes')}
            >
              ◑ Colors
            </button>
            {activePanel === 'themes' && <ThemePanel onClose={closePanel} />}
          </div>
        )}

        {/* Format — hidden when pinned as sidebar */}
        {!pinnedPanels && (
          <div className="toolbar-panel-anchor">
            <button
              className={`toolbar-btn ${activePanel === 'format' ? 'active' : ''}`}
              onClick={() => togglePanel('format')}
            >
              ☰ Format
            </button>
            {activePanel === 'format' && <FormatPanel onClose={closePanel} />}
          </div>
        )}
      </div>

      <div className="toolbar-right">
        {/* Toggle sidebars (only shown when window is wide enough to pin them) */}
        {onToggleSidebars && (
          <button
            className="toolbar-btn"
            onClick={onToggleSidebars}
            title={showSidebars ? 'Hide panels' : 'Show panels'}
          >
            {showSidebars ? '◧ Hide Panels' : '◨ Show Panels'}
          </button>
        )}

        {/* History */}
        <button
          className={`toolbar-btn ${activePanel === 'history' ? 'active' : ''}`}
          onClick={() => togglePanel('history')}
          title="Edit History"
        >
          ◷ History
        </button>

        {/* Config */}
        <button className="toolbar-btn" onClick={() => setShowConfig(true)} title="Settings">
          ⚙ Settings
        </button>

        {/* Files panel */}
        <div className="toolbar-panel-anchor">
          <button
            className={`toolbar-btn ${activePanel === 'files' ? 'active' : ''}`}
            onClick={() => togglePanel('files')}
          >
            ⇅ Files
          </button>
          {activePanel === 'files' && (
            <div className="files-panel">
              <button className="files-action" onClick={() => { handleCopyJson(); }}>
                <span className="files-action__icon">⎘</span>
                <span className="files-action__text">
                  <strong>Export Data</strong>
                  <small>Copy all resume data to clipboard</small>
                </span>
                {copiedJson && <span className="files-action__badge">✓ Copied!</span>}
              </button>
              <button className="files-action" onClick={() => { closePanel(); setShowJsonImport(true); setJsonText(''); setJsonError(''); }}>
                <span className="files-action__icon">⎗</span>
                <span className="files-action__text">
                  <strong>Import Data</strong>
                  <small>Paste previously exported data</small>
                </span>
              </button>
              <div className="files-divider" />
              <button className="files-action" onClick={() => { closePanel(); setShowImport(true); }}>
                <span className="files-action__icon">⬆</span>
                <span className="files-action__text">
                  <strong>Import File</strong>
                  <small>Load resume from a PDF</small>
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Download */}
        <button className="toolbar-btn toolbar-btn--primary" onClick={handleDownload}>
          ⬇ Download PDF
        </button>
      </div>

      {/* History panel */}
      {activePanel === 'history' && <HistoryPanel onClose={closePanel} />}

      {/* Config popup */}
      {showConfig && <ConfigPanel onClose={() => setShowConfig(false)} />}

      {/* Import PDF modal */}
      {showImport && (
        <Suspense fallback={null}>
          <ImportPDFModal onClose={() => setShowImport(false)} />
        </Suspense>
      )}

      {/* Paste JSON modal */}
      {showJsonImport && (
        <div className="modal-backdrop" onClick={() => setShowJsonImport(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Import Data</h3>
            <textarea
              className="json-paste-area"
              placeholder="Paste exported JSON here…"
              value={jsonText}
              onChange={e => { setJsonText(e.target.value); setJsonError(''); }}
              autoFocus
            />
            {jsonError && <p className="json-error">{jsonError}</p>}
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setShowJsonImport(false)}>Cancel</button>
              <button className="modal-btn modal-btn--primary" onClick={handleJsonImport} disabled={!jsonText.trim()}>Load</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
