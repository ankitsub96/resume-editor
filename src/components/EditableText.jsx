import { useRef, useEffect } from 'react';

/**
 * Inline contentEditable text — saves on blur.
 *
 * Props:
 *   value       string   – current text
 *   onChange    fn(str)  – called on blur with new value
 *   tag         string   – HTML element to render (default 'span')
 *   className   string
 *   placeholder string
 *   onEnter     fn()     – optional, called when Enter pressed (for multi-line bullet handling)
 *   onBackspaceEmpty fn() – called when Backspace on empty content
 *   multiLine   bool     – if true, Enter inserts newline; if false (default), calls onEnter
 */
export default function EditableText({
  value,
  onChange,
  tag: Tag = 'span',
  className = '',
  placeholder = '',
  onEnter,
  onBackspaceEmpty,
  multiLine = false,
  style,
}) {
  const ref = useRef(null);
  const lastValue = useRef(value);

  // Sync prop → DOM only when value changes externally (avoid caret jump)
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.textContent !== value) {
      ref.current.textContent = value;
      lastValue.current = value;
    }
  }, [value]);

  function save() {
    const text = ref.current?.textContent ?? '';
    if (text !== lastValue.current) {
      lastValue.current = text;
      onChange?.(text);
    }
  }

  const handleBlur = save;
  const handleInput = save;

  function handlePaste(e) {
    e.preventDefault();
    const KEEP_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U']);

    function clean(node) {
      if (node.nodeType === Node.TEXT_NODE) return node.cloneNode();
      if (node.nodeType !== Node.ELEMENT_NODE) return null;
      if (KEEP_TAGS.has(node.tagName)) {
        const el = document.createElement(node.tagName);
        node.childNodes.forEach(c => { const r = clean(c); if (r) el.appendChild(r); });
        return el;
      }
      const frag = document.createDocumentFragment();
      node.childNodes.forEach(c => { const r = clean(c); if (r) frag.appendChild(r); });
      return frag;
    }

    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();

    const html = e.clipboardData.getData('text/html');
    if (html) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const frag = document.createDocumentFragment();
      tmp.childNodes.forEach(c => { const r = clean(c); if (r) frag.appendChild(r); });
      range.insertNode(frag);
    } else {
      range.insertNode(document.createTextNode(e.clipboardData.getData('text/plain')));
    }

    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (!multiLine) {
        e.preventDefault();
        onEnter?.();
        ref.current?.blur();
      }
      // multiLine: let default behaviour insert newline
    }
    if (e.key === 'Backspace' && ref.current?.textContent === '') {
      e.preventDefault();
      onBackspaceEmpty?.();
    }
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`editable${className ? ' ' + className : ''}`}
      data-placeholder={placeholder}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      style={style}
    />
  );
}
