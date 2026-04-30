> **AI Agents:** Start by reading [`repomix-output.xml`](repomix-output.xml) — it contains the full codebase snapshot in a single AI-readable file. Read that before exploring individual files.

# Resume Editor — Novoresume Clone (Local)

## Context
Local Novoresume-style resume editor, Vite + React, pre-populated with Ankit Dahiya's resume data.
Inline editing, theme/layout switching, drag-drop reordering, PDF export.

---

## Stack
- Vite + React
- React Context API + useReducer (no Zustand)
- html2canvas + jsPDF for PDF export
- @dnd-kit/core + @dnd-kit/sortable for drag-and-drop
- Plain CSS + CSS variables (no Tailwind)
- react-colorful for color pickers (RgbaColorPicker)

---

## File Structure
```
src/
├── main.jsx                          # Entry — wraps App in ResumeProvider
├── App.jsx / App.css                 # Shell: Toolbar + (TemplatesPage | sidebars + Resume) + PDFPreviewModal
├── index.css                         # CSS variables (:root), global reset
├── config.js                         # Central config object + loadConfig/saveConfigOverride/resetConfig
├── context/
│   └── ResumeContext.jsx             # Reducer, localStorage persistence, CSS var side-effects
├── data/
│   └── initialData.js               # Ankit Dahiya's resume pre-populated
├── themes/
│   └── themes.js                    # 16 theme objects → CSS variable maps + applyTheme()
├── templates/
│   └── templateRegistry.js          # TEMPLATE_REGISTRY — template keys, names, layoutPayload
├── sections/
│   ├── sectionRegistry.js           # SECTION_REGISTRY + getAddableTypes()
│   ├── renderers.js                 # renderer-key → React component map
│   ├── SectionBase.css              # Shared styles (section-title, item-header, bullet-list…)
│   ├── HeaderSection.jsx / .css     # Name, title, summary, photo upload, contacts
│   ├── ProjectsSection.jsx          # Also exports SectionTitle used by all sections
│   ├── SkillsSection.jsx / .css     # Chip tags, drag reorder (rectSortingStrategy)
│   ├── TechSkillsSection.jsx / .css # Category + skills rows
│   ├── EducationSection.jsx         # Degree, institution, period, location, gpa
│   ├── WorkSection.jsx              # Job cards + bullet drag reorder
│   └── GenericSection.jsx           # Fallback: Certificates, Languages, Achievements, etc.
├── components/
│   ├── Toolbar.jsx / Toolbar.css    # Top bar — panel toggles, Files panel, undo/redo, download
│   ├── Resume.jsx / Resume.css      # Canvas — two/one-column, column divider drag, section DnD
│   ├── TemplatesPage.jsx / .css     # Full-page template browser with visual preview cards
│   ├── ImportPDFModal.jsx / .css    # Modal: drop PDF → parse → preview → load resume
│   ├── TagInput.jsx / .css          # Badge-style tag editor [{id, label}] with Enter/comma/backspace
│   ├── EditableText.jsx             # contentEditable wrapper, onBlur saves, Enter/Backspace hooks
│   ├── SortableItem.jsx             # @dnd-kit render-prop wrapper for drag handles
│   ├── PDFPreviewModal.jsx / .css   # Modal: html2canvas preview iframe + SEO keywords + print download
│   └── panels/
│       ├── Panel.css                # Shared panel + sidebar styles
│       ├── ThemePanel.jsx / .css    # Accent swatches, custom color pickers, bg, chip text color
│       ├── LayoutPanel.jsx          # Presets tab + Custom tab (section management)
│       ├── FormatPanel.jsx          # Font, font size, spacing, side padding, doc size, list labels
│       ├── HistoryPanel.jsx         # Side drawer — history list, click to jump
│       └── ConfigPanel.jsx / .css   # Full config editor — sliders, color pickers, JSON paste
└── utils/
    ├── nanoid.js                    # Tiny ID generator
    ├── applyConfig.js               # applyConfigToDOM() + applyConfigOnStartup() — DOM CSS var application
    ├── pdfExport.js                 # html2canvas + jsPDF preview; window.print() download; link annotations
    └── pdfImport.js                 # pdfjs-dist text extraction + anchor-cluster heuristic parser
```

---

## Section Registry

`src/sections/sectionRegistry.js` — single source of truth. To add a section: add one entry + optionally a renderer.

| Type | Icon | Renderer | Item fields |
|---|---|---|---|
| `projects` | ◈ | projects | title, subtitle, period, bullets[] |
| `work` | 💼 | work | jobTitle, company, period, location, bullets[] |
| `skills` | ⚡ | skills | label |
| `techSkills` | 🔧 | techSkills | category, skills (comma string) |
| `education` | 🎓 | education | degree, institution, period, location, gpa |
| `certificates` | 📜 | generic | title, subtitle, period, bullets[] |
| `languages` | 🌐 | generic | title, subtitle, period, bullets[] |
| `achievements` | 🏆 | generic | title, subtitle, period, bullets[] |
| `volunteer` | 🤝 | generic | title, subtitle, period, bullets[] |
| `interests` | ★ | generic | title, subtitle, period, bullets[] |
| `publications` | 📖 | generic | title, subtitle, period, bullets[] |
| `references` | 👤 | generic | title, subtitle, period, bullets[] |

All 12 types have `addable: true` — they appear in the "Add Section" pool if not already in the resume.

`getAddableTypes(existingTypeIds)` — filters registry to types not yet added.

`Resume.jsx` lookup: `RENDERERS[SECTION_REGISTRY[section.type].renderer] ?? GenericSection`

---

## Features

### Toolbar
Toolbar `background` = current accent color (CSS var `--primary` or `customAccent`).

Left: **Resume Editor** brand · **⊞ Templates** / **← Editor** toggle (switches to TemplatesPage)
Center: **⟲ Undo** · **Redo ⟳** · separator · **▤ Layout** · **◑ Colors** (hidden when sidebars pinned) · **☰ Format** (hidden when sidebars pinned)
Right: **◧ Hide Panels / ◨ Show Panels** (only when window ≥ 1320px) · **◷ History** · **⚙ Settings** · **⇅ Files** · **⬇ Download PDF** (primary)

- Clicking a panel button toggles its dropdown; clicking another closes the current one
- Outside click closes all panels except History (History stays open until explicitly closed)
- History and Config/Settings open as overlays separate from the dropdown anchor system
- Colors and Format buttons hidden from toolbar when pinned as sidebars (wide screen ≥ 1320px)

**Files panel** (dropdown from **⇅ Files**):
- **Export Data** — copies full state JSON to clipboard
- **Import Data** — opens inline JSON paste modal → dispatches `LOAD_STATE`
- **Import File** — opens `ImportPDFModal` (lazy-loaded) to load resume from PDF

---

### Theme Panel
Mounts as a **dropdown** from the **◑ Colors** toolbar button, or as a **pinned left sidebar** when window ≥ 1320px (prop `pinned`).

**Accent Color**
- 16 preset swatches: Olive Green (default), Ocean Blue, Ruby Red, Royal Purple, Sunset Orange, Teal, Charcoal Dark, Minimal Gray, Rose Gold, Indigo Dusk, Forest, Burgundy, Midnight, Copper, Emerald, Slate Blue
- Custom color swatch (RgbaColorPicker) — opens popup with hex/rgba text input + opacity
- Gradient support: custom accent can be a `linear-gradient(…)` — sets `--primary-gradient` CSS var and `data-gradient-accent` attribute on `<html>`
- "Reset to theme" button appears when a custom accent is active
- Applies instantly via `--primary`, `--primary-dark`, `--accent` CSS vars

**Background**
- 4 presets: White `#ffffff`, Off-white `#fafaf8`, Warm `#fdf8f0`, Cool gray `#f5f6f8`
- Custom color swatch with opacity — supports gradients — sets `--canvas-bg` CSS var
- Auto-derives `--resume-text`, `--resume-text-muted`, `--resume-border` from bg luminance

**Skill Chip Text**
- Three quick buttons: Auto (contrast-computed from accent) / White / Dark
- Custom color swatch for arbitrary hex

---

### Layout Panel — two tabs

**Presets tab**
- 3 cards with visual column diagram + label + description:
  - Classic — "Narrow sidebar + wide main" (30% / 70%)
  - Standard — "Two equal columns" (58% / 42% actual; diagram shows 50/50)
  - Modern — "Wide main + narrow sidebar" (60% / 40%)
- Clicking a card dispatches SET_LAYOUT with the preset key; sections rearranged to preset column assignments
- Toggles (checkboxes): One Column Document · Show Job Title · Show Summary · Show Photo

**Custom tab**
- One Column Document toggle
- Left Column box: section chips with → (move right) and × (delete section) buttons
- Right Column box: section chips with ← (move left) and × (delete section) buttons
- "Add Section" pool: lists only types not already in resume; click to add to right column

---

### Format Panel
Mounts as a **dropdown** from the **☰ Format** toolbar button, or as a **pinned right sidebar** when window ≥ 1320px (prop `pinned`).

- **Font** — `<select>`: Inter · Georgia · Merriweather · Roboto Mono
- **Font Size** — step slider 10–18px → sets `--font-size-base` CSS var
- **Content Spacing** — step slider 1–15 (Min → Max), maps to `--section-gap`, `--item-gap`, `--line-height`
- **Side Padding** — step slider 0–60px → sets `--content-padding-h` CSS var
- **Document Size** — radio: A4 / US Letter (changes canvas width + PDF format)
- **Show List Labels** — checkbox (shows/hides label prefix before bullet lists)

All sliders use a `StepSlider` component with ‹ / › arrow buttons, a dot-track, and a live value badge.

---

### History Panel (side drawer)
- Lists all history entries newest-first
- Each entry: section icon (from registry) · label text · HH:MM timestamp
- Current entry highlighted + "NOW" badge
- Future entries (after undo) shown dimmed — still clickable
- Click any entry → `HISTORY_JUMP` restores that snapshot
- Empty state: "No edits yet. Start typing to record history."

---

### Config Panel (modal overlay)
- Left nav: 9 sections — Typography · Spacing · Header · Section Titles · Canvas · Presets · Document · PDF · Toolbar
- Right panel: auto-rendered fields from `config.js` — type-detected:
  - CSS string with unit (px/rem/%/em) → slider with live value display
  - Plain number → slider (ranges from `NUM_RANGES` lookup)
  - Hex/rgb string → color swatch + text input
  - Boolean → checkbox
  - Array → comma-separated text input
- JSON paste area: paste full or partial config JSON → "Apply JSON" bulk-applies, deep-merges
- "Copy JSON" button → copies full current config to clipboard
- "Reset" button → clears `resume-editor-config` from localStorage, reverts to defaults
- Changes applied instantly to DOM via CSS vars + inline styles (no page reload)

**Config sections and key fields:**

| Section | Key fields |
|---|---|
| Typography | headerNameSize/Weight, headerTitleSize, headerSummarySize/LineHeight, sectionTitleSize/Weight/LetterSpacing, itemTitleSize/Weight, bulletSize, contactSize, tagFontSize, techCategorySize |
| Spacing | sectionGapBase/Step, itemGapBase/Step, lineHeightBase/Step |
| Header | accentStripWidth, paddingV/H, photoSize, photoBorderWidth, borderBottomWidth, contactsMinWidth, contactIconSize |
| Section Titles | accentBlockWidth, borderBottomWidth, marginBottom, accentMarginRight |
| Canvas | wrapperBackground, wrapperPadding, pageShadow, leftColumnBackground, leftColumnBorderRight |
| Presets | classic/standard/modern leftRatio + rightRatio |
| Document | a4Width, letterWidth, minHeight |
| PDF | filename, imageType, imageQuality, scale |
| Toolbar | height, background, brandLabel |

---

### Resume Canvas

**Two-column mode** (default)
- Left column: `width: var(--left-col)`, `flex-shrink: 0`
- Right column: `flex: 1`
- Column divider (10px): drag to resize — range clamped 15–85% — dispatches `SET_LEFT_RATIO`
- ⇄ swap button on divider hover → `SWAP_COLUMNS`
- Sections within each column are sortable via drag (vertical strategy); cross-column moves detected in `onDragOver`
- DragOverlay shows section ghost (name + icon) during drag

**One-column mode**
- All visible sections stacked vertically, no divider

**Section drag handles**
- `· · · · · ·` strip above each section, opacity 0.35 at rest → 1 on hover/active

---

### Inline Editing (`EditableText`)
- Renders any HTML tag (`h1`, `p`, `span`, `strong`, etc.) as `contentEditable`
- Syncs prop → DOM only when external value changes (avoids caret jump)
- `onBlur` → calls `onChange(newText)` only if text changed
- `Enter` (non-multiLine) → calls `onEnter()` + blurs; (multiLine) → inserts newline
- `Backspace` on empty → calls `onBackspaceEmpty()`
- Placeholder via `data-placeholder` CSS attribute

---

### Header Section
- **Name** (h1) — always editable
- **Job Title** (p) — shown/hidden by `layout.showTitle`
- **Summary** (p, multiLine) — shown/hidden by `layout.showSummary`
- **Photo** — click circle to open file picker (`accept="image/*"`); stored as base64 dataURL; × remove button appears on hover; shown/hidden by `layout.showPhoto`
- **Contacts** — 5 contacts (email, phone, location, linkedin, github); label text editable; SVG icons; href contacts render as `<a>` (click prevented in edit mode)

---

### Section Renderers

**Projects** (`ProjectsSection`)
- Items: title, subtitle (role/tech), period — all inline editable; drag to reorder cards
- Bullets: drag to reorder within each card; Enter adds bullet; Backspace-on-empty removes; `+ add bullet` click
- × removes item; `+ Add Project` adds from registry template

**Work** (`WorkSection`)
- Items: jobTitle, company, period, location — editable; drag to reorder cards
- Bullets: same as Projects (nested DndContext, IDs `wbullet-{itemId}-{idx}`)
- `+ Add Job`

**Skills** (`SkillsSection`)
- Chips: drag to reorder (rectSortingStrategy — wrapping grid layout)
- Add: type in inline input + Enter or comma; blur with text also adds
- × removes chip; chip text color via `--chip-text` CSS var

**Technical Skills** (`TechSkillsSection`)
- Rows: category (bold, editable) + skills string (comma list, editable)
- × removes row; `+ Add Category`

**Education** (`EducationSection`)
- Items: degree, institution, period, location — editable; gpa shown only if non-empty
- No drag reorder; × removes; `+ Add Education`

**Generic** (`GenericSection`) — Certificates, Languages, Achievements, Volunteer, Interests, Publications, References
- Items: title, subtitle, period — editable
- Bullets rendered only if `item.bullets.length > 0`; Enter adds; Backspace-on-empty removes
- No drag reorder; × removes; `+ Add Entry`

---

### Pinned Sidebars (App.jsx)
- When `window.innerWidth >= 1320` (`PIN_THRESHOLD`), `pinned=true`
- `ThemePanel pinned` mounts left of `Resume`; `FormatPanel pinned` mounts right
- **◧ Hide Panels / ◨ Show Panels** toolbar button toggles visibility when pinned
- When pinned, **◑ Colors** and **☰ Format** toolbar buttons are hidden (sidebars are always visible)

---

### Templates (`templateRegistry.js` + `TemplatesPage`)
**`TEMPLATE_REGISTRY`** — array of template descriptors:
```js
{ key, name, desc, tags[], layoutPayload }
```
`layoutPayload` is merged into `layout` state via `SET_LAYOUT`. Currently two templates:

| Key | Name | Layout | Description |
|---|---|---|---|
| `novoresume` | Novoresume | two-column | Sidebar layout, modern/technical |
| `hbs` | HBS Classic | one-column | Traditional single-column, business |

**`TemplatesPage`** — full-page view (replaces Resume canvas):
- Grid of cards with CSS-drawn preview thumbnails (`NovoresumePreview`, `HBSPreview`)
- Active template highlighted with `✓ Active` badge
- Click card → `SET_LAYOUT` with `entry.layoutPayload` → closes page back to editor
- Add new template: add entry to `TEMPLATE_REGISTRY` + preview component to `PREVIEWS` map in `TemplatesPage.jsx`

---

### PDF Import (`ImportPDFModal` + `pdfImport.js`)
**`ImportPDFModal`** — stages: `upload → parsing → preview → (paste fallback)`
1. **Upload** — drag-drop zone or file picker (`application/pdf`)
2. **Parsing** — calls `importPDF(file)` from `pdfImport.js`; spinner shown
3. **No text layer** → falls back to **Paste** stage (manual text entry → `parseTextToResume`)
4. **Preview** — shows parsed name, title, summary, contacts, section counts; confidence badge (exact match vs heuristic)
5. **Load** — dispatches `IMPORT_RESUME` (replaces `resume` in state)

**`pdfImport.js`** (uses `pdfjs-dist`):
- `importPDF(file)` — extracts text from PDF; detects `RE:` marker in `subject` for exact editor exports
- `parseTextToResume(lines)` — anchor-cluster heuristic parser:
  - Classifies each line: `section | period | bullet | contact | separator | short | long`
  - Maps section headers via `SECTION_MAP` regexes to section types
  - Extracts contacts with `EMAIL_RE`, `PHONE_RE`, `LINKEDIN_RE`, `GITHUB_RE`
  - Groups lines into items within each section

---

### PDF Export (`pdfExport.js` + `PDFPreviewModal`)

**Preview flow:** Download PDF button → `PDFPreviewModal` opens → `generatePDFPreviewUrl()` on mount → iframe

**Download flow:** **⬇ Download PDF** in modal footer → `window.print()` (real text-layer PDF via browser print dialog)

**`generatePDFPreviewUrl(documentSize, background)`**
1. `prepareCanvas()` adds `.pdf-exporting` class; hides `.pdf-overlay`, `.panel-drawer`, `.panel-sidebar`, `.toolbar` from capture; hides empty photo placeholder
2. `html2canvas(el, { scale:2 })` captures `#resume-canvas`
3. `jsPDF` created at A4 or Letter; fills background rect; `pdf.addImage()` per page (>2mm threshold avoids blank tail page)
4. `addLinkAnnotations()` — walks all `<a href>` elements in canvas DOM and registers jsPDF link annotations (clickable links in the preview PDF)
5. `embedResumeData()` — encodes full `resume` state as base64 JSON in PDF `subject` field with `RE:` marker (enables exact round-trip import)
6. Returns blob URL for iframe

**`exportPDF()`** — same pipeline; calls `pdf.save()` with filename derived from `resume.header.name`

**`handleDownload()` in `PDFPreviewModal`**
- Injects `@page { size: A4/Letter portrait; margin: 0 }` style tag
- Sets `document.title` to `"${name}'s Resume"` for the print dialog filename
- Calls `window.print()` → browser generates real-text PDF
- Restores title + removes style on `afterprint` event

**PDFPreviewModal layout**
- Left sidebar: SEO Keywords textarea (`SET_PDF_KEYWORDS` action — no history entry)
- Right: iframe preview (html2canvas-based blob)
- Footer: Cancel · ⬇ Download PDF
- ATS keywords also embedded as an invisible `1px` absolutely-positioned div in the resume canvas DOM

**`applyConfig.js`**
- `applyConfigToDOM(cfg, formatSpacing)` — directly sets inline styles on DOM nodes (typography, spacing, header, canvas, toolbar CSS vars). Called by `ConfigPanel` on every change.
- `applyConfigOnStartup()` — called once in `App.jsx` `useEffect` to re-apply saved config overrides after refresh.

---

## Pre-populated Resume Data (Ankit Dahiya)
- **Header**: name, "Senior Full-Stack Developer", summary, 5 contacts (email, phone, location, LinkedIn, GitHub)
- **Projects** (4): Workly App, Workforce Management System, BI Tool, Pegasus/Imarticus — each 3–4 bullets
- **Core Skills** (10 chips): System Design, Auth & RBAC, Data Modeling, Serverless, Caching Strategies, Event Driven Arch., Latency Optimization, Debugging, DevOps, Containerization
- **Technical Skills** (3 categories): Web Dev, Databases, Cloud & DevOps
- **Education** (2): BTech CSE GGSIPU 2013–2017; 12th CBSE K.V. Sec-8 RK Puram 2012–2013

---

## Context Shape
```js
{
  resume: {
    header: { name, title, summary, photo, contacts[] },
    sections: [{ id, type, title, visible, column, items[] }]
  },
  theme: 'oliveGreen',          // key into THEMES map (16 options)
  customAccent: null,           // null | '#xxxxxx' | 'linear-gradient(…)'
  customAccentOpacity: 100,     // 0–100
  canvasBackground: '#ffffff',  // hex | 'linear-gradient(…)'
  canvasBackgroundOpacity: 100,
  chipTextColor: 'auto',        // 'auto' | '#xxxxxx'
  layout: {
    template: 'novoresume',     // 'novoresume' | 'hbs' — from templateRegistry
    mode: 'two-column' | 'one-column',
    preset: 'classic' | 'standard' | 'modern' | 'custom',
    showTitle: true,
    showSummary: true,
    showPhoto: true,
    leftRatioPct: 58,           // draggable divider position (10–90)
  },
  format: {
    spacing: 5,                 // 1–15 slider
    fontSize: 13,               // px, 10–18 slider → --font-size-base
    contentPaddingH: 14,        // px, 0–60 slider → --content-padding-h
    documentSize: 'a4',         // 'a4' | 'letter'
    showListLabels: false,
    font: 'Inter',
    pdfKeywords: '',            // embedded in PDF metadata (not in undo history)
  },
  history: [{ id, timestamp, label, section, snapshot }],
  historyIndex: number,
  _version: 4                   // bump STATE_VERSION in ResumeContext.jsx to invalidate
}
```

### Reducer Actions

| Action | Payload fields | Notes |
|---|---|---|
| `UPDATE_HEADER` | `field`, `payload` | Merges into `resume.header` |
| `UPDATE_CONTACT` | `id`, `payload` | Updates single contact by id |
| `UPDATE_SECTION_ITEM` | `sectionId`, `itemId`, `payload`, `historyLabel?` | Merges into matching item |
| `UPDATE_SECTION_TITLE` | `sectionId`, `title` | Renames section |
| `ADD_SECTION_ITEM` | `sectionId`, `item` | Appends item to section |
| `REMOVE_SECTION_ITEM` | `sectionId`, `itemId` | Removes item from section |
| `REPLACE_SECTION_ITEMS` | `sectionId`, `items`, `historyLabel?` | Bulk-replaces items array |
| `ADD_SECTION` | `sectionDef` | Adds new section from registry def |
| `REMOVE_SECTION` | `sectionId` | Removes section entirely |
| `MOVE_SECTION` | `sectionId`, `column` | Moves section to `'left'`\|`'right'`\|`null` |
| `REORDER_SECTIONS` | `sections` | Full replacement of sections array after drag |
| `SWAP_COLUMNS` | — | Flips left↔right column assignment for all sections |
| `SET_LEFT_RATIO` | `pct` | Sets `layout.leftRatioPct`; marks preset as `'custom'` |
| `SET_THEME` | `themeKey` | Switches theme key; CSS vars applied via `applyTheme()` |
| `SET_CUSTOM_ACCENT` | `color` | `null` = use theme default; `'#xxxxxx'` = override |
| `SET_CUSTOM_ACCENT_OPACITY` | `value` | 0–100 |
| `SET_CANVAS_BG` | `color` | Canvas background hex |
| `SET_CANVAS_BG_OPACITY` | `value` | 0–100 |
| `SET_CHIP_TEXT_COLOR` | `color` | `'auto'` \| hex |
| `SET_LAYOUT` | `payload`, `historyLabel?` | Merges into `layout`; applies preset column assignments if `payload.preset` |
| `SET_FORMAT` | `payload`, `historyLabel?` | Merges into `format` |
| `UNDO` | — | Steps back in history |
| `REDO` | — | Steps forward in history |
| `HISTORY_JUMP` | `index` | Restores snapshot at arbitrary history index |
| `IMPORT_RESUME` | `resume` | Replaces `resume` (header + sections) from PDF import; pushes history |
| `SET_PDF_KEYWORDS` | `value` | Sets `format.pdfKeywords`; no history entry |
| `LOAD_STATE` | `state` | Full state replacement (JSON import); pushes "Loaded from JSON" history |

### Layout Presets

| Preset | Left sections | Right sections | leftRatioPct | Default? |
|---|---|---|---|---|
| classic | skills, techSkills, education | projects, work | 30% | |
| standard | projects, work | skills, techSkills, education | 58% | ✓ |
| modern | work, projects | skills, techSkills, education | 60% | |

`--left-col` and `--right-col` CSS vars updated on every `leftRatioPct` change (also via divider drag).

---

## History & Undo/Redo

- Every state-changing action appends `{ id, timestamp, label, section, snapshot }` to `history[]`
- `historyIndex` tracks position; Undo = index--, Redo = index++
- **Non-destructive**: new actions append at end; undoing then acting does NOT wipe future entries
- History survives page refresh (persisted in localStorage with full state)
- Ctrl+Z / Ctrl+Y not bound in code — Undo/Redo are toolbar buttons only

---

## CSS Variables
Set on `:root` by JS — never hard-coded in components:

| Variable | Set by | Value |
|---|---|---|
| `--primary`, `--primary-dark`, `--accent` | theme / customAccent | theme color |
| `--primary-gradient` | customAccent (gradient) | gradient string; `data-gradient-accent` attr set on `<html>` |
| `--sidebar-bg`, `--sidebar-text`, `--text-light` | theme | defined but not applied in CSS (available for custom use) |
| `--canvas-bg` | canvasBackground + opacity | canvas background (hex or gradient) |
| `--resume-text` | canvasBackground luminance | `#111` or `#fff` for text contrast |
| `--resume-text-muted` | canvasBackground | `rgba(0,0,0,0.45)` or `rgba(255,255,255,0.55)` |
| `--resume-border` | canvasBackground | `rgba(0,0,0,0.1)` or `rgba(255,255,255,0.15)` |
| `--chip-text` | chipTextColor (auto = contrast of --primary) | skill chip text color |
| `--left-col`, `--right-col` | leftRatioPct | e.g. `58%` / `42%` |
| `--section-gap` | format.spacing (1–15) | `0.4 + (s-1)*0.18 rem` |
| `--item-gap` | format.spacing | `0.3 + (s-1)*0.1 rem` |
| `--line-height` | format.spacing | `1.3 + (s-1)*0.05` |
| `--font-resume` | format.font | e.g. `Inter, system-ui, sans-serif` |
| `--font-size-base` | format.fontSize | e.g. `13px` |
| `--content-padding-h` | format.contentPaddingH | e.g. `14px` |
| `--section-accent-width` | ConfigPanel sectionTitle | left bar width on section titles |
| `--section-accent-margin` | ConfigPanel sectionTitle | margin after accent bar |
| `--toolbar-height` | static | `52px` |

Canvas width set as inline style on `#resume-canvas`: `794px` (A4) or `816px` (Letter).

## localStorage
| Key | Contents |
|---|---|
| `resume-editor-state` | Full context state incl. `_version: 4`. Bump `STATE_VERSION` in `ResumeContext.jsx` to invalidate. |
| `resume-editor-config` | Config overrides (deep-merged over `config.js` defaults on load). Reset via Config panel. |

## Verification
1. `npm run dev` → localhost:5180 (or next port)
2. Click any text → inline edit, blur saves
3. Toolbar **◑ Colors** → accent swatch (16 presets) → CSS vars change live
4. Colors → custom accent → gradient picker → `--primary-gradient` set; toolbar bg updates
5. Colors → Background → preset + custom + gradient
6. Colors → Skill Chip Text → auto/white/dark/custom
7. Toolbar **▤ Layout → Presets** → Classic/Standard/Modern → columns rearrange
8. Layout → Toggles → One Column / Show Title / Summary / Photo
9. Layout → Custom → move chips between columns, add/remove sections
10. Drag column divider → resizes columns; ⇄ swaps columns
11. Drag section handles → reorders within column + cross-column
12. Toolbar **☰ Format** → font dropdown, font size slider, spacing slider, side padding, doc size, list labels
13. Toolbar **⚙ Settings** → sliders/colors apply instantly; JSON paste; Reset
14. Drag project/job cards → reorder; drag bullets → reorder; Enter adds; Backspace-empty removes
15. Drag skill chips → reorder (grid wrapping); type + Enter/comma to add; × to remove
16. TechSkills: edit category + skills text; + Add Category
17. Education/Generic: add/remove entries
18. Header photo: click → file picker; × removes; persisted as base64
19. Undo/Redo toolbar buttons; History panel → click any entry to jump
20. Refresh → state restored from localStorage
21. Resize window ≥ 1320px → ThemePanel + FormatPanel pin as sidebars; toolbar buttons hide
22. **⊞ Templates** → TemplatesPage opens; select HBS Classic → one-column layout applied; ← Editor returns
23. **⇅ Files → Export Data** → JSON copied to clipboard
24. **⇅ Files → Import Data** → paste JSON → loads state
25. **⇅ Files → Import File** → drop a PDF → parsed → preview → Load Resume
26. Download PDF → PDFPreviewModal → SEO keywords → iframe preview (html2canvas) → ⬇ Download PDF → browser print dialog
