---
"@k8o/arte-odyssey": major
---

Design tokens are now derived from `src/styles/index.css` — the single source of truth — via [`tailwind-token-extractor`](https://www.npmjs.com/package/tailwind-token-extractor), instead of being hand-maintained in `tokens.ts` and generating the CSS from it.

**BREAKING**: `@k8o/arte-odyssey/tokens` now exposes the fully-resolved extractor output — `tokens` (`{ theme, vars }`), `meta`, and the derived key-union types — instead of the curated `PALETTE` / `FG_TOKENS` / `TEXT_SIZES` / `RADII` / … arrays. The values are complete (including surviving Tailwind defaults) and always in sync with the CSS. Presentation-only metadata (palette hue/description, semantic ShadeRef tables, the spacing display scale) now lives in the docs app.

`scripts/generate-css.ts` (`pnpm generate:css`) is retired; run `pnpm generate:tokens` after editing `index.css`, and `pnpm check:tokens` guards against drift in CI.
