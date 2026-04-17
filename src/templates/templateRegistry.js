/**
 * TEMPLATE_REGISTRY — single source of truth for resume templates.
 *
 * To add a new template:
 *   1. Add an entry here with key, name, desc, tags, and layoutPayload.
 *   2. Add a preview component to the PREVIEWS map in TemplatesPage.jsx.
 *
 * layoutPayload is merged into layout state via SET_LAYOUT.
 * `mode: 'one-column'` → vertical single-column canvas.
 * `mode: 'two-column'` → left/right split canvas with draggable divider.
 */
export const TEMPLATE_REGISTRY = [
  {
    key: 'novoresume',
    name: 'Novoresume',
    desc: 'Two-column layout with a customizable sidebar. Ideal for technical and creative roles.',
    tags: ['Two-column', 'Sidebar', 'Modern'],
    layoutPayload: { template: 'novoresume', mode: 'two-column' },
  },
  {
    key: 'hbs',
    name: 'HBS Classic',
    desc: 'Traditional single-column layout. Clean and professional for business and consulting roles.',
    tags: ['Single-column', 'Traditional', 'Business'],
    layoutPayload: { template: 'hbs', mode: 'one-column' },
  },
  // ↓ Add more templates below
];
