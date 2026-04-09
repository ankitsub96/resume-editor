// Each theme maps to CSS variable values applied to :root
export const THEMES = {
  oliveGreen: {
    name: 'Olive Green',
    vars: {
      '--primary': '#5a7a4a',
      '--primary-dark': '#3d5533',
      '--accent': '#7a9a6a',
      '--sidebar-bg': '#2d3d24',
      '--sidebar-text': '#e8f0e0',
      '--text-light': '#f0f4ec',
    },
  },
  oceanBlue: {
    name: 'Ocean Blue',
    vars: {
      '--primary': '#2b6cb0',
      '--primary-dark': '#1a4a80',
      '--accent': '#4a90d9',
      '--sidebar-bg': '#1a365d',
      '--sidebar-text': '#ebf4ff',
      '--text-light': '#f0f7ff',
    },
  },
  rubyRed: {
    name: 'Ruby Red',
    vars: {
      '--primary': '#c53030',
      '--primary-dark': '#9b2c2c',
      '--accent': '#e05252',
      '--sidebar-bg': '#742a2a',
      '--sidebar-text': '#fff5f5',
      '--text-light': '#fff5f5',
    },
  },
  royalPurple: {
    name: 'Royal Purple',
    vars: {
      '--primary': '#6b46c1',
      '--primary-dark': '#4c3190',
      '--accent': '#9f7aea',
      '--sidebar-bg': '#322659',
      '--sidebar-text': '#f3f0ff',
      '--text-light': '#f3f0ff',
    },
  },
  sunsetOrange: {
    name: 'Sunset Orange',
    vars: {
      '--primary': '#c05621',
      '--primary-dark': '#9c4221',
      '--accent': '#ed8936',
      '--sidebar-bg': '#7b341e',
      '--sidebar-text': '#fffaf0',
      '--text-light': '#fffaf0',
    },
  },
  teal: {
    name: 'Teal',
    vars: {
      '--primary': '#2c7a7b',
      '--primary-dark': '#1d5c5c',
      '--accent': '#38b2ac',
      '--sidebar-bg': '#1d4f50',
      '--sidebar-text': '#e6fffa',
      '--text-light': '#e6fffa',
    },
  },
  charcoalDark: {
    name: 'Charcoal Dark',
    vars: {
      '--primary': '#2d3748',
      '--primary-dark': '#1a202c',
      '--accent': '#718096',
      '--sidebar-bg': '#1a202c',
      '--sidebar-text': '#f7fafc',
      '--text-light': '#f7fafc',
    },
  },
  minimalGray: {
    name: 'Minimal Gray',
    vars: {
      '--primary': '#4a5568',
      '--primary-dark': '#2d3748',
      '--accent': '#718096',
      '--sidebar-bg': '#e2e8f0',
      '--sidebar-text': '#2d3748',
      '--text-light': '#2d3748',
    },
  },
};

export const DEFAULT_THEME = 'oliveGreen';

export function applyTheme(themeKey) {
  const theme = THEMES[themeKey];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}
