import { useResume } from '../context/ResumeContext.jsx';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry.js';
import './TemplatesPage.css';

// ─── Preview components ───────────────────────────────────────────────────────
// When adding a new template to TEMPLATE_REGISTRY, add its preview here.

function NovoresumePreview() {
  return (
    <div className="tpl-preview">
      {/* Header bar */}
      <div className="tpl-header-bar">
        <div className="tpl-name-line" />
        <div className="tpl-subtitle-line" />
        <div className="tpl-contact-row">
          <div className="tpl-contact-dot" />
          <div className="tpl-contact-dot" />
          <div className="tpl-contact-dot" />
        </div>
      </div>
      {/* Two-column body */}
      <div className="tpl-body tpl-body--two-col">
        <div className="tpl-left-col">
          <div className="tpl-section-block" />
          <div className="tpl-section-block" />
          <div className="tpl-section-block tpl-section-block--tall" />
        </div>
        <div className="tpl-right-col">
          <div className="tpl-section-block tpl-section-block--tall" />
          <div className="tpl-section-block tpl-section-block--tall" />
        </div>
      </div>
    </div>
  );
}

function HBSPreview() {
  return (
    <div className="tpl-preview">
      {/* Centered header */}
      <div className="tpl-header-bar tpl-header-bar--centered">
        <div className="tpl-name-line tpl-name-line--centered" />
        <div className="tpl-subtitle-line tpl-subtitle-line--centered" />
        <div className="tpl-divider-line" />
      </div>
      {/* Single-column body with label + content rows */}
      <div className="tpl-body tpl-body--one-col">
        {[0, 1, 2].map((i) => (
          <div key={i} className="tpl-hbs-row">
            <div className="tpl-hbs-label" />
            <div className="tpl-hbs-content">
              <div className="tpl-line" />
              <div className="tpl-line tpl-line--short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Map template key → preview component.
// When adding a template to TEMPLATE_REGISTRY, add its preview here.
const PREVIEWS = {
  novoresume: NovoresumePreview,
  hbs: HBSPreview,
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TemplatesPage({ onClose }) {
  const { state, dispatch } = useResume();
  const activeKey = state.layout.template ?? 'novoresume';

  function applyTemplate(entry) {
    dispatch({
      type: 'SET_LAYOUT',
      payload: entry.layoutPayload,
      historyLabel: `Switched to ${entry.name} template`,
    });
    onClose();
  }

  return (
    <div className="templates-page">
      <div className="templates-page__header">
        <h1 className="templates-title">Choose a Template</h1>
        <p className="templates-subtitle">
          Select a layout — your content stays exactly the same.
        </p>
      </div>

      <div className="templates-grid">
        {TEMPLATE_REGISTRY.map((entry) => {
          const isActive = activeKey === entry.key;
          const Preview = PREVIEWS[entry.key];
          return (
            <div
              key={entry.key}
              className={`template-card${isActive ? ' template-card--active' : ''}`}
              onClick={() => applyTemplate(entry)}
            >
              {Preview ? <Preview /> : <div className="tpl-preview tpl-preview--empty" />}

              <div className="template-card__info">
                <div className="template-card__name-row">
                  <span className="template-card__name">{entry.name}</span>
                  {isActive && <span className="template-card__badge">✓ Active</span>}
                </div>
                <p className="template-card__desc">{entry.desc}</p>
                <div className="template-card__tags">
                  {entry.tags.map((t) => (
                    <span key={t} className="template-tag">{t}</span>
                  ))}
                </div>
                <button
                  className={`template-card__btn${isActive ? ' template-card__btn--active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); applyTemplate(entry); }}
                >
                  {isActive ? '✓ Currently Active' : 'Use This Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
