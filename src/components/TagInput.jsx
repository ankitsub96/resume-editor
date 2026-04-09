import { useState, useRef } from 'react';
import './TagInput.css';

/**
 * Badge-style tag editor.
 *
 * Props:
 *   tags       [{id, label}]
 *   onChange   fn(newTags)
 *   placeholder string
 */
export default function TagInput({ tags = [], onChange, placeholder = 'Add skill…' }) {
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  function addTag(label) {
    const trimmed = label.trim();
    if (!trimmed) return;
    const newTag = { id: Date.now().toString(36), label: trimmed };
    onChange([...tags, newTag]);
    setInputVal('');
  }

  function removeTag(id) {
    onChange(tags.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputVal);
    }
    if (e.key === 'Backspace' && inputVal === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1].id);
    }
  }

  return (
    <div className="tag-input" onClick={() => inputRef.current?.focus()}>
      {tags.map((t) => (
        <span key={t.id} className="tag-badge">
          {t.label}
          <button
            className="tag-remove"
            onClick={(e) => { e.stopPropagation(); removeTag(t.id); }}
            title="Remove"
          >×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="tag-input-field"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (inputVal) addTag(inputVal); }}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </div>
  );
}
