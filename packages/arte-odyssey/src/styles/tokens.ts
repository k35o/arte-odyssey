/**
 * Public design-token API for `@k8o/arte-odyssey`.
 *
 * `index.css` is the single source of truth. `tailwind-token-extractor` reads it
 * and writes the fully-resolved tokens to `tokens.generated.ts`. Run
 * `pnpm generate:tokens` after editing `index.css`.
 *
 * Exposes `tokens` ({ theme, vars }), `meta`, and the derived key-union types.
 */
export * from './tokens.generated';
