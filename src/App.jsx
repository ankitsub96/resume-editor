import { useState, useEffect, lazy, Suspense } from 'react';
import Toolbar from './components/Toolbar.jsx';
import Resume from './components/Resume.jsx';
const PDFPreviewModal = lazy(() => import('./components/PDFPreviewModal.jsx'));
import ThemePanel from './components/panels/ThemePanel.jsx';
import FormatPanel from './components/panels/FormatPanel.jsx';
import { applyConfigOnStartup } from './utils/applyConfig.js';
import './App.css';

// Minimum window width to pin sidebars (canvas ~794 + 240 left + 240 right + margins)
const PIN_THRESHOLD = 1320;

export default function App() {
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [pinned, setPinned] = useState(() => window.innerWidth >= PIN_THRESHOLD);
  const [showSidebars, setShowSidebars] = useState(true);

  useEffect(() => { applyConfigOnStartup(); }, []);

  useEffect(() => {
    function onResize() { setPinned(window.innerWidth >= PIN_THRESHOLD); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sidebarsVisible = pinned && showSidebars;

  return (
    <div className="app-shell">
      <Toolbar
        onDownload={() => setShowPDFPreview(true)}
        pinnedPanels={sidebarsVisible}
        showSidebars={showSidebars}
        onToggleSidebars={() => setShowSidebars(s => !s)}
      />
      <div className="app-body">
        {sidebarsVisible && <ThemePanel pinned />}
        <Resume />
        {sidebarsVisible && <FormatPanel pinned />}
      </div>
      {showPDFPreview && (
        <Suspense fallback={null}>
          <PDFPreviewModal onClose={() => setShowPDFPreview(false)} />
        </Suspense>
      )}
    </div>
  );
}
