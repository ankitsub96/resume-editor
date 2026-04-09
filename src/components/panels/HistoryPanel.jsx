import { useResume } from '../../context/ResumeContext.jsx';
import { SECTION_REGISTRY } from '../../sections/sectionRegistry.js';
import './Panel.css';

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getSectionIcon(section) {
  if (!section) return '📝';
  const reg = Object.values(SECTION_REGISTRY).find((r) => r.label === section || r.defaultTitle === section);
  return reg?.icon ?? '📝';
}

export default function HistoryPanel({ onClose }) {
  const { state, dispatch } = useResume();
  const { history, historyIndex } = state;

  function jump(index) {
    dispatch({ type: 'HISTORY_JUMP', index });
  }

  return (
    <div className="history-panel side-panel">
      <div className="panel-header" style={{ padding: '10px 14px' }}>
        <span>Edit History</span>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <p className="history-empty">No edits yet. Start typing to record history.</p>
        ) : (
          [...history].reverse().map((entry, reversedIdx) => {
            const idx = history.length - 1 - reversedIdx;
            const isCurrent = idx === historyIndex;
            const isFuture = idx > historyIndex;
            return (
              <div
                key={entry.id}
                className={`history-entry ${isCurrent ? 'current' : ''} ${isFuture ? 'future' : ''}`}
                onClick={() => jump(idx)}
              >
                <span className="history-entry-icon">{getSectionIcon(entry.section)}</span>
                <div className="history-entry-info">
                  <div className="history-entry-label">{entry.label}</div>
                  <div className="history-entry-time">{formatTime(entry.timestamp)}</div>
                </div>
                {isCurrent && <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700 }}>NOW</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
