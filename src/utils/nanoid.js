/** Tiny ID generator — no external dep needed */
export function nanoid(len = 8) {
  return Math.random().toString(36).slice(2, 2 + len);
}
