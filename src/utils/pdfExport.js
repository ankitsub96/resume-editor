import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/** Convert hex + opacity% to a CSS color string */
export function resolveBackground(hex = '#ffffff', opacityPct = 100) {
  const c = (hex || '#ffffff').replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) || 255;
  const g = parseInt(c.substring(2, 4), 16) || 255;
  const b = parseInt(c.substring(4, 6), 16) || 255;
  const a = (opacityPct ?? 100) / 100;
  return a >= 1 ? `#${c}` : `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

function prepareCanvas(canvas) {
  const editEls = canvas.querySelectorAll(
    '.add-item-btn, .item-remove-btn, .bullet-add, .tag-input-field, .tag-remove, ' +
    '.section-drag-handle, .photo-remove-btn, .drag-dot, .item-drag-handle, .bullet-drag, ' +
    '.skill-remove, .skill-add-input, .column-divider'
  );
  const prevDisplay = [];
  editEls.forEach(el => { prevDisplay.push(el.style.display); el.style.display = 'none'; });

  const photoEl = canvas.querySelector('.header-photo');
  const hasRealPhoto = !!photoEl?.querySelector('img');
  let prevPhotoDisplay = null;
  if (photoEl && !hasRealPhoto) {
    prevPhotoDisplay = photoEl.style.display;
    photoEl.style.display = 'none';
  }

  return () => {
    editEls.forEach((el, i) => { el.style.display = prevDisplay[i]; });
    if (photoEl && prevPhotoDisplay !== null) photoEl.style.display = prevPhotoDisplay;
  };
}

/**
 * Walk all <a href> elements in the canvas DOM, convert their bounding boxes
 * to PDF mm coordinates, and register jsPDF link annotations.
 */
function addLinkAnnotations(pdf, canvasEl, pageW, pageH) {
  const links = canvasEl.querySelectorAll('a[href]');
  if (!links.length) return;

  const canvasRect = canvasEl.getBoundingClientRect();
  const mmPerPx = pageW / canvasRect.width;

  links.forEach(link => {
    const href = link.href;
    if (!href || href.startsWith('javascript:')) return;

    const rect = link.getBoundingClientRect();
    const xMm = (rect.left - canvasRect.left) * mmPerPx;
    const yMm = (rect.top  - canvasRect.top)  * mmPerPx;
    const wMm = rect.width  * mmPerPx;
    const hMm = rect.height * mmPerPx;

    // Handle multi-page: determine which page this link falls on
    const pageIndex = Math.floor(yMm / pageH);
    const yOnPage   = yMm - pageIndex * pageH;

    if (pageIndex >= 0 && pageIndex < pdf.getNumberOfPages()) {
      pdf.setPage(pageIndex + 1);
      pdf.link(xMm, yOnPage, wMm, hMm, { url: href });
    }
  });
}

async function buildPDF(documentSize, keywords = '', background = '#ffffff') {
  const el = document.getElementById('resume-canvas');
  if (!el) return null;

  const restore = prepareCanvas(el);

  try {
    // Give the browser two frames to reflow after hiding UI elements
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const isLetter = documentSize === 'letter';
    const bg = background || '#ffffff';

    const captured = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: bg,
    });

    const imgData = captured.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({ unit: 'mm', format: isLetter ? 'letter' : 'a4', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgW = pageW;
    const imgH = (captured.height / captured.width) * pageW;

    // Parse bg color for jsPDF fill (handles hex only; rgba falls back to white)
    const hexMatch = bg.match(/^#?([0-9a-f]{6})$/i);
    const [fr, fg, fb] = hexMatch
      ? [parseInt(hexMatch[1].slice(0,2),16), parseInt(hexMatch[1].slice(2,4),16), parseInt(hexMatch[1].slice(4,6),16)]
      : [255, 255, 255];

    let remaining = imgH;
    let offset = 0;
    while (remaining > 0) {
      // Fill page background so the area below the image isn't white
      pdf.setFillColor(fr, fg, fb);
      pdf.rect(0, 0, pageW, pageH, 'F');
      pdf.addImage(imgData, 'JPEG', 0, -offset, imgW, imgH);
      remaining -= pageH;
      offset += pageH;
      if (remaining > 2) pdf.addPage(); // >2mm threshold avoids blank pages from rounding
    }

    // Add clickable link annotations over the image
    addLinkAnnotations(pdf, el, pageW, pageH);

    if (keywords && keywords.trim()) {
      pdf.setProperties({ keywords: keywords.trim() });
    }

    return pdf;
  } finally {
    restore();
  }
}

export async function generatePDFPreviewUrl(documentSize = 'a4', background = '#ffffff') {
  const pdf = await buildPDF(documentSize, '', background);
  if (!pdf) return null;
  const blob = new Blob([pdf.output('arraybuffer')], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

export async function exportPDF(documentSize = 'a4', keywords = '', background = '#ffffff') {
  const pdf = await buildPDF(documentSize, keywords, background);
  if (!pdf) return;
  pdf.save('Ankit_Dahiya_Resume.pdf');
}
