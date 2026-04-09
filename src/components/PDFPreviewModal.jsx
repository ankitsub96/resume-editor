import { useState, useEffect, useRef } from 'react';
import { useResume } from '../context/ResumeContext.jsx';
import { generatePDFPreviewUrl, exportPDF, resolveBackground } from '../utils/pdfExport.js';
import './PDFPreviewModal.css';

export default function PDFPreviewModal({ onClose }) {
  const { state, dispatch } = useResume();
  const { format } = state;
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const urlRef = useRef(null);

  const bg = resolveBackground(state.canvasBackground, state.canvasBackgroundOpacity);

  useEffect(() => {
    let cancelled = false;
    generatePDFPreviewUrl(format.documentSize, bg).then(url => {
      if (cancelled) { if (url) URL.revokeObjectURL(url); return; }
      urlRef.current = url;
      setBlobUrl(url);
      setLoading(false);
    });
    return () => {
      cancelled = true;
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  async function handleDownload() {
    setDownloading(true);
    try {
      await exportPDF(format.documentSize, format.pdfKeywords || '', bg);
    } finally {
      setDownloading(false);
    }
  }

  function setKeywords(val) {
    dispatch({ type: 'SET_FORMAT', payload: { pdfKeywords: val } });
  }

  return (
    <div className="pdf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pdf-modal">
        <div className="pdf-modal-header">
          <span className="pdf-modal-title">PDF Preview</span>
          <button className="pdf-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="pdf-modal-body">
          <div className="pdf-modal-sidebar">
            <p className="pdf-sidebar-label">SEO Keywords</p>
            <p className="pdf-sidebar-hint">
              Embedded in PDF metadata — invisible in the output but readable by ATS systems and search engines.
            </p>
            <textarea
              className="pdf-keywords-input"
              value={format.pdfKeywords || ''}
              onChange={e => setKeywords(e.target.value)}
              placeholder="React, Node.js, TypeScript, Full-Stack, Senior Developer…"
              rows={6}
            />
          </div>

          <div className="pdf-preview-area">
            {loading ? (
              <div className="pdf-loading">
                <div className="pdf-spinner" />
                <span>Generating preview…</span>
              </div>
            ) : (
              <iframe
                src={blobUrl}
                className="pdf-iframe"
                title="PDF Preview"
              />
            )}
          </div>
        </div>

        <div className="pdf-modal-footer">
          <button className="pdf-footer-btn" onClick={onClose}>Cancel</button>
          <button
            className="pdf-footer-btn pdf-footer-btn--primary"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? 'Generating…' : '↓ Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
