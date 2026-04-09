import { useRef } from 'react';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import './HeaderSection.css';

const ICONS = {
  email: <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>,
  phone: <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>,
  location: <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
};

/** Derive a proper href from the user-typed contact label. Returns null if undetermined. */
function deriveHref(icon, label) {
  const t = (label || '').trim();
  if (!t) return null;
  switch (icon) {
    case 'email':
      return t.includes('@') ? `mailto:${t}` : null;
    case 'phone':
      return `tel:${t.replace(/\s+/g, '')}`;
    case 'github':
    case 'linkedin': {
      if (t.startsWith('http://') || t.startsWith('https://')) return t;
      if (t.startsWith('github.com/') || t.startsWith('linkedin.com/')) return `https://${t}`;
      return null; // username only — keep existing href
    }
    default:
      return null;
  }
}

export default function HeaderSection() {
  const { state, dispatch } = useResume();
  const { header } = state.resume;
  const { showTitle, showSummary, showPhoto } = state.layout;
  const photoRef = useRef(null);

  function updateHeader(field, value) {
    dispatch({ type: 'UPDATE_HEADER', field, payload: { [field]: value } });
  }

  function updateContact(id, field, value) {
    const contact = header.contacts.find(c => c.id === id);
    const payload = { [field]: value };
    if (field === 'label' && contact) {
      const derived = deriveHref(contact.icon, value);
      if (derived !== null) payload.href = derived;
    }
    dispatch({ type: 'UPDATE_CONTACT', id, payload });
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateHeader('photo', ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <header className="resume-header">

      {/* Left: contacts */}
      <div className="header-left">
        <div className="header-contacts">
          {header.contacts.map((c) => {
            const inner = (
              <>
                <span className="contact-icon">{ICONS[c.icon]}</span>
                <EditableText tag="span" className="contact-label" value={c.label}
                  onChange={(v) => updateContact(c.id, 'label', v)} placeholder="Contact" />
              </>
            );
            return c.href ? (
              <a key={c.id} href={c.href} className="contact-item contact-item--link"
                target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <span key={c.id} className="contact-item">{inner}</span>
            );
          })}
        </div>
      </div>

      {/* Center: name, title, summary */}
      <div className="header-center-text">
        <EditableText tag="h1" className="header-name" value={header.name}
          onChange={(v) => updateHeader('name', v)} placeholder="Your Name" />
        {showTitle && (
          <EditableText tag="p" className="header-title" value={header.title}
            onChange={(v) => updateHeader('title', v)} placeholder="Job Title" />
        )}
        {showSummary && (
          <EditableText tag="p" className="header-summary" value={header.summary}
            onChange={(v) => updateHeader('summary', v)} placeholder="Professional summary…" multiLine />
        )}
      </div>

      {/* Right: photo */}
      {showPhoto && (
        <div className="header-right">
          <div className="header-photo-wrap">
            <div className="header-photo" onClick={() => photoRef.current?.click()}>
              {header.photo
                ? <img src={header.photo} alt="Profile" />
                : <span className="photo-placeholder">+<br/>Photo</span>}
              <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            </div>
            {header.photo && (
              <button className="photo-remove-btn" onClick={() => updateHeader('photo', null)} title="Remove photo">×</button>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
