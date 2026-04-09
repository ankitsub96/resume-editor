import { useState } from 'react';
import Toolbar from './components/Toolbar.jsx';
import Resume from './components/Resume.jsx';
import PDFPreviewModal from './components/PDFPreviewModal.jsx';
import './App.css';

export default function App() {
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  return (
    <div className="app-shell">
      <Toolbar onDownload={() => setShowPDFPreview(true)} />
      <Resume />
      {showPDFPreview && <PDFPreviewModal onClose={() => setShowPDFPreview(false)} />}
    </div>
  );
}
