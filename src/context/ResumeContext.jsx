import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialResume } from '../data/initialData.js';
import { THEMES, DEFAULT_THEME, applyTheme } from '../themes/themes.js';
import { SECTION_REGISTRY } from '../sections/sectionRegistry.js';
import { nanoid } from '../utils/nanoid.js';
import { loadConfig } from '../config.js';

function darkenHex(hex, factor) {
  const c = hex.replace('#', '');
  const r = Math.round(parseInt(c.substring(0, 2), 16) * factor);
  const g = Math.round(parseInt(c.substring(2, 4), 16) * factor);
  const b = Math.round(parseInt(c.substring(4, 6), 16) * factor);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function hexToRgba(hex, opacityPct) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const a = (opacityPct ?? 100) / 100;
  return a >= 1 ? hex : `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

function contrastColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#111111' : '#ffffff';
}

// ─── Initial state ────────────────────────────────────────────────────────────
const buildInitialState = () => ({
  resume: initialResume,
  theme: DEFAULT_THEME,
  customAccent: null,           // null = use theme default; '#xxxxxx' = override
  customAccentOpacity: 100,
  canvasBackground: '#ffffff',
  canvasBackgroundOpacity: 100,
  chipTextColor: 'auto',        // 'auto' | '#xxxxxx' — auto = contrast-computed
  layout: {
    mode: 'two-column',       // 'two-column' | 'one-column'
    preset: 'standard',       // 'classic' | 'standard' | 'modern' | 'custom'
    showTitle: true,
    showSummary: true,
    showPhoto: true,
    leftRatioPct: 58,         // draggable divider position (10–90)
  },
  format: {
    spacing: 5,               // 1-10
    documentSize: 'a4',       // 'a4' | 'letter'
    showListLabels: false,
    font: 'Inter',
    pdfKeywords: '',          // embedded in PDF metadata, not visible in output
  },
  history: [],
  historyIndex: -1,
});

// ─── Preset column assignments ────────────────────────────────────────────────
const PRESETS = {
  classic: {
    left: ['skills', 'techSkills', 'education'],
    right: ['projects', 'work'],
    leftRatio: '30%',
    rightRatio: '70%',
  },
  standard: {
    left: ['projects', 'work'],
    right: ['skills', 'techSkills', 'education'],
    leftRatio: '58%',
    rightRatio: '42%',
  },
  modern: {
    left: ['work', 'projects'],
    right: ['skills', 'techSkills', 'education'],
    leftRatio: '60%',
    rightRatio: '40%',
  },
};

function applyPresetToSections(sections, presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return sections;
  return sections.map((s) => {
    if (preset.left.includes(s.type)) return { ...s, column: 'left' };
    if (preset.right.includes(s.type)) return { ...s, column: 'right' };
    return s; // unchanged if not in preset lists
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function snapshot(state) {
  // Deep-clone the mutable parts of state
  return JSON.parse(JSON.stringify({ resume: state.resume }));
}

function pushHistory(state, label, section = '') {
  const entry = {
    id: nanoid(),
    timestamp: Date.now(),
    label,
    section,
    snapshot: snapshot(state),
  };
  // Non-destructive: append after current index
  const newHistory = [...state.history, entry];
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    // Header
    case 'UPDATE_HEADER': {
      const hist = pushHistory(state, `Edited ${action.field} in Header`, 'Header');
      return {
        ...state,
        resume: { ...state.resume, header: { ...state.resume.header, ...action.payload } },
        ...hist,
      };
    }

    case 'UPDATE_CONTACT': {
      const contacts = state.resume.header.contacts.map((c) =>
        c.id === action.id ? { ...c, ...action.payload } : c
      );
      const hist = pushHistory(state, 'Edited contact in Header', 'Header');
      return {
        ...state,
        resume: { ...state.resume, header: { ...state.resume.header, contacts } },
        ...hist,
      };
    }

    // Section items
    case 'UPDATE_SECTION_ITEM': {
      const { sectionId, itemId, payload, historyLabel } = action;
      const sections = state.resume.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, items: s.items.map((it) => (it.id === itemId ? { ...it, ...payload } : it)) };
      });
      const sec = state.resume.sections.find((s) => s.id === sectionId);
      const hist = pushHistory(state, historyLabel || `Edited item in ${sec?.title}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'UPDATE_SECTION_TITLE': {
      const sections = state.resume.sections.map((s) =>
        s.id === action.sectionId ? { ...s, title: action.title } : s
      );
      const hist = pushHistory(state, `Renamed section to "${action.title}"`, action.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'ADD_SECTION_ITEM': {
      const { sectionId, item } = action;
      const sec = state.resume.sections.find((s) => s.id === sectionId);
      const sections = state.resume.sections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, item] } : s
      );
      const hist = pushHistory(state, `Added item in ${sec?.title}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'REMOVE_SECTION_ITEM': {
      const { sectionId, itemId } = action;
      const sec = state.resume.sections.find((s) => s.id === sectionId);
      const sections = state.resume.sections.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((it) => it.id !== itemId) } : s
      );
      const hist = pushHistory(state, `Removed item from ${sec?.title}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'ADD_SECTION': {
      const { sectionDef } = action;
      const newSection = {
        id: nanoid(),
        type: sectionDef.type,
        title: sectionDef.defaultTitle,
        visible: true,
        column: 'right',
        items: [],
      };
      const hist = pushHistory(state, `Added section ${sectionDef.label}`, sectionDef.label);
      return {
        ...state,
        resume: { ...state.resume, sections: [...state.resume.sections, newSection] },
        ...hist,
      };
    }

    case 'REMOVE_SECTION': {
      const sec = state.resume.sections.find((s) => s.id === action.sectionId);
      const sections = state.resume.sections.filter((s) => s.id !== action.sectionId);
      const hist = pushHistory(state, `Deleted section ${sec?.title}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'SWAP_COLUMNS': {
      const sections = state.resume.sections.map((s) => ({
        ...s,
        column: s.column === 'left' ? 'right' : s.column === 'right' ? 'left' : s.column,
      }));
      const hist = pushHistory(state, 'Swapped left and right columns');
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'SET_LEFT_RATIO': {
      return {
        ...state,
        layout: { ...state.layout, leftRatioPct: action.pct, preset: 'custom' },
      };
    }

    case 'MOVE_SECTION': {
      // action.sectionId, action.column ('left'|'right'|null for available)
      const sec = state.resume.sections.find((s) => s.id === action.sectionId);
      const sections = state.resume.sections.map((s) =>
        s.id === action.sectionId ? { ...s, column: action.column } : s
      );
      const colLabel = action.column === 'left' ? 'left column' : action.column === 'right' ? 'right column' : 'available pool';
      const hist = pushHistory(state, `Moved ${sec?.title} to ${colLabel}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'REPLACE_SECTION_ITEMS': {
      const { sectionId, items, historyLabel } = action;
      const sec = state.resume.sections.find((s) => s.id === sectionId);
      const sections = state.resume.sections.map((s) =>
        s.id === sectionId ? { ...s, items } : s
      );
      const hist = pushHistory(state, historyLabel || `Edited ${sec?.title}`, sec?.title);
      return { ...state, resume: { ...state.resume, sections }, ...hist };
    }

    case 'REORDER_SECTIONS': {
      // action.sections: full new array
      const hist = pushHistory(state, 'Reordered sections');
      return { ...state, resume: { ...state.resume, sections: action.sections }, ...hist };
    }

    case 'SET_CUSTOM_ACCENT':
      return { ...state, customAccent: action.color };

    case 'SET_CUSTOM_ACCENT_OPACITY':
      return { ...state, customAccentOpacity: action.value };

    case 'SET_CANVAS_BG':
      return { ...state, canvasBackground: action.color };

    case 'SET_CANVAS_BG_OPACITY':
      return { ...state, canvasBackgroundOpacity: action.value };

    case 'SET_CHIP_TEXT_COLOR':
      return { ...state, chipTextColor: action.color };

    // Theme
    case 'SET_THEME': {
      const themeName = THEMES[action.themeKey]?.name || action.themeKey;
      const hist = pushHistory(state, `Changed theme to ${themeName}`);
      return { ...state, theme: action.themeKey, ...hist };
    }

    // Layout
    case 'SET_LAYOUT': {
      let newLayout = { ...state.layout, ...action.payload };
      let newSections = state.resume.sections;

      if (action.payload.preset && action.payload.preset !== 'custom') {
        newSections = applyPresetToSections(state.resume.sections, action.payload.preset);
      }

      const hist = pushHistory(
        { ...state, resume: { ...state.resume, sections: newSections } },
        action.historyLabel || 'Changed layout'
      );
      return {
        ...state,
        layout: newLayout,
        resume: { ...state.resume, sections: newSections },
        ...hist,
      };
    }

    // Format
    case 'SET_FORMAT': {
      const hist = pushHistory(state, action.historyLabel || 'Changed format');
      return { ...state, format: { ...state.format, ...action.payload }, ...hist };
    }

    // Undo / Redo
    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const prevIndex = state.historyIndex - 1;
      const entry = state.history[prevIndex];
      return {
        ...state,
        resume: JSON.parse(JSON.stringify(entry.snapshot.resume)),
        historyIndex: prevIndex,
      };
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const nextIndex = state.historyIndex + 1;
      const entry = state.history[nextIndex];
      return {
        ...state,
        resume: JSON.parse(JSON.stringify(entry.snapshot.resume)),
        historyIndex: nextIndex,
      };
    }

    case 'HISTORY_JUMP': {
      const entry = state.history[action.index];
      if (!entry) return state;
      return {
        ...state,
        resume: JSON.parse(JSON.stringify(entry.snapshot.resume)),
        historyIndex: action.index,
      };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ResumeContext = createContext(null);

const STORAGE_KEY = 'resume-editor-state';
const STATE_VERSION = 4; // bump to invalidate old saved state

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed._version === STATE_VERSION) return parsed;
      }
    } catch {}
    const initial = buildInitialState();
    return { ...initial, _version: STATE_VERSION };
  });

  // Apply theme CSS vars, then overlay custom accent + opacity if set
  useEffect(() => {
    applyTheme(state.theme);
    if (state.customAccent) {
      const op = state.customAccentOpacity ?? 100;
      document.documentElement.style.setProperty('--primary', hexToRgba(state.customAccent, op));
      document.documentElement.style.setProperty('--primary-dark', hexToRgba(darkenHex(state.customAccent, 0.75), op));
      document.documentElement.style.setProperty('--accent', hexToRgba(state.customAccent, op));
    }
  }, [state.theme, state.customAccent, state.customAccentOpacity]);

  // Apply column ratio CSS vars
  useEffect(() => {
    const pct = state.layout.leftRatioPct ?? 58;
    document.documentElement.style.setProperty('--left-col', `${pct}%`);
    document.documentElement.style.setProperty('--right-col', `${100 - pct}%`);
  }, [state.layout.leftRatioPct]);

  // Apply spacing CSS vars whenever format changes (reads base/step from config so ConfigPanel tweaks take effect)
  useEffect(() => {
    const cfg = loadConfig();
    const sp = cfg.spacing || {};
    const s = state.format.spacing; // 1-10
    const sectionGap = `${(sp.sectionGapBase ?? 0.4) + (s - 1) * (sp.sectionGapStep ?? 0.18)}rem`;
    const itemGap    = `${(sp.itemGapBase ?? 0.3) + (s - 1) * (sp.itemGapStep ?? 0.1)}rem`;
    const lineHeight = `${(sp.lineHeightBase ?? 1.3) + (s - 1) * (sp.lineHeightStep ?? 0.05)}`;
    document.documentElement.style.setProperty('--section-gap', sectionGap);
    document.documentElement.style.setProperty('--item-gap', itemGap);
    document.documentElement.style.setProperty('--line-height', lineHeight);
  }, [state.format.spacing]);

  // Apply font
  useEffect(() => {
    document.documentElement.style.setProperty('--font-resume', state.format.font + ', system-ui, sans-serif');
  }, [state.format.font]);

  // Apply canvas background via CSS var (avoids React inline-style override)
  useEffect(() => {
    const bg = hexToRgba(state.canvasBackground || '#ffffff', state.canvasBackgroundOpacity ?? 100);
    document.documentElement.style.setProperty('--canvas-bg', bg);
  }, [state.canvasBackground, state.canvasBackgroundOpacity]);

  // Apply chip text color CSS var
  useEffect(() => {
    const primary = state.customAccent
      || getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
      || '#5a7a4a';
    const color = state.chipTextColor === 'auto' || !state.chipTextColor
      ? contrastColor(primary)
      : state.chipTextColor;
    document.documentElement.style.setProperty('--chip-text', color);
  }, [state.chipTextColor, state.theme, state.customAccent]);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, _version: STATE_VERSION }));
    } catch {}
  }, [state]);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return (
    <ResumeContext.Provider value={{ state, dispatch, canUndo, canRedo }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
