import { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar.jsx';
import Resume from './components/Resume.jsx';
import PDFPreviewModal from './components/PDFPreviewModal.jsx';
import ThemePanel from './components/panels/ThemePanel.jsx';
import FormatPanel from './components/panels/FormatPanel.jsx';
import { applyConfigOnStartup } from './utils/applyConfig.js';
import './App.css';

// Minimum window width to pin sidebars (canvas ~794 + 240 left + 240 right + margins)
const PIN_THRESHOLD = 1320;

export default function App() {
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [pinned, setPinned] = useState(() => window.innerWidth >= PIN_THRESHOLD);

  useEffect(() => {
    applyConfigOnStartup();
  }, []);

  useEffect(() => {
    function onResize() { setPinned(window.innerWidth >= PIN_THRESHOLD); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="app-shell">
      <Toolbar onDownload={() => setShowPDFPreview(true)} pinnedPanels={pinned} />
      <div className="app-body">
        {pinned && <ThemePanel pinned />}
        <Resume />
        {pinned && <FormatPanel pinned />}
      </div>
      {showPDFPreview && <PDFPreviewModal onClose={() => setShowPDFPreview(false)} />}
    </div>
  );
}
