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

  function handleBlur() {
    const text = ref.current?.textContent ?? '';
    if (text !== lastValue.current) {
      lastValue.current = text;
      onChange?.(text);
    }
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
      onKeyDown={handleKeyDown}
      style={style}
    />
  );
}
