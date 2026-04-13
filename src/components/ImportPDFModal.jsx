import { useState, useRef } from 'react';
import { importPDF, parseTextToResume } from '../utils/pdfImport.js';
import { useResume } from '../context/ResumeContext.jsx';
import './ImportPDFModal.css';

export default function ImportPDFModal({ onClose }) {
  const { dispatch } = useResume();
  const [stage, setStage] = useState('upload'); // upload | parsing | paste | preview | error
  const [result, setResult] = useState(null);
  const [pasteText, setPasteText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file || file.type !== 'application/pdf') { setError('Please select a PDF file.'); setStage('error'); return; }
    setStage('parsing');
    try {
      const res = await importPDF(file);
      if (res.noTextLayer) { setStage('paste'); return; }
      setResult(res);
      setStage('preview');
    } catch (e) {
      setError('Could not read PDF. ' + e.message);
      setStage('error');
    }
  }

  function handlePasteParse() {
    if (!pasteText.trim()) return;
    const lines = pasteText.split('\n').map(l => l.trim()).filter(Boolean);
    const resume = parseTextToResume(lines);
    setResult({ resume, confidence: 'heuristic' });
    setStage('preview');
  }

  function handleDrop(e) { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }

  function handleLoad() {
    dispatch({ type: 'IMPORT_RESUME', resume: result.resume });
    onClose();
  }

  const hasContent = result?.resume && (
    result.resume.header?.name ||
    result.resume.sections?.length > 0
  );

  return (
    <div className="import-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="import-modal">
        <div className="import-header">
          <span>Import from PDF</span>
          <button className="import-close" onClick={onClose}>×</button>
        </div>

        {stage === 'upload' && (
          <div className="import-body">
            <div className="import-dropzone"
              onClick={() => inputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}>
              <div className="import-drop-icon">⬆</div>
              <p className="import-drop-title">Drop your PDF here</p>
              <p className="import-drop-hint">or click to browse</p>
              <p className="import-drop-note">
                PDFs exported from this editor load perfectly.<br />
                Other PDFs are parsed with best-effort heuristics.
              </p>
              <input ref={inputRef} type="file" accept="application/pdf"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])} />
            </div>
          </div>
        )}

        {stage === 'parsing' && (
          <div className="import-body import-body--center">
            <div className="import-spinner" />
            <p>Parsing PDF…</p>
          </div>
        )}

        {stage === 'paste' && (
          <div className="import-body">
            <div className="import-badge import-badge--warn">
              ⚠ This PDF has no text layer (exported as image). Paste your resume text below.
            </div>
            <p className="import-paste-hint">
              Open the PDF, select all text (Ctrl+A), copy (Ctrl+C) and paste here.
              If it's an image PDF, manually type the content.
            </p>
            <textarea
              className="import-paste-area"
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              placeholder="Paste resume text here…"
              rows={12}
              autoFocus
            />
            <div className="import-footer">
              <button className="import-btn import-btn--ghost" onClick={() => setStage('upload')}>← Back</button>
              <button className="import-btn import-btn--primary"
                onClick={handlePasteParse} disabled={!pasteText.trim()}>
                Parse Text
              </button>
            </div>
          </div>
        )}

        {stage === 'error' && (
          <div className="import-body import-body--center">
            <p className="import-error">{error}</p>
            <button className="import-btn" onClick={() => setStage('upload')}>Try again</button>
          </div>
        )}

        {stage === 'preview' && result && (
          <div className="import-body">
            <div className={`import-badge import-badge--${result.confidence === 'exact' ? 'exact' : 'heuristic'}`}>
              {result.confidence === 'exact'
                ? '✓ Exact match — exported from this editor'
                : '~ Best-effort parse — review before loading'}
            </div>
            {!hasContent && (
              <div className="import-badge import-badge--warn" style={{ marginTop: 8 }}>
                ⚠ Nothing could be detected. Try pasting the text manually.
              </div>
            )}
            <div className="import-preview">
              <PreviewRow label="Name"     value={result.resume.header?.name} />
              <PreviewRow label="Title"    value={result.resume.header?.title} />
              <PreviewRow label="Summary"  value={result.resume.header?.summary} truncate />
              <PreviewRow label="Contacts" value={result.resume.header?.contacts?.map(c => c.label).join(' · ')} />
              {result.resume.sections?.map(s => (
                <PreviewRow key={s.id} label={s.title}
                  value={`${s.items.length} item${s.items.length !== 1 ? 's' : ''}`} />
              ))}
            </div>
            <p className="import-warning">This will replace your current resume.</p>
            <div className="import-footer">
              <button className="import-btn import-btn--ghost"
                onClick={() => setStage(pasteText ? 'paste' : 'upload')}>← Back</button>
              <button className="import-btn import-btn--primary"
                onClick={handleLoad} disabled={!hasContent}>
                Load Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewRow({ label, value, truncate }) {
  if (!value) return null;
  const display = truncate && value.length > 80 ? value.slice(0, 80) + '…' : value;
  return (
    <div className="import-preview-row">
      <span className="import-preview-label">{label}</span>
      <span className="import-preview-value">{display}</span>
    </div>
  );
}
