/**
 * Docs design-token source.
 *
 * VALUES (palette literals, text sizes, radii, shadows, weights, tracking,
 * leading, breakpoints, z-index) are extracted from the compiled CSS by
 * `tailwind-token-extractor` (see `design-tokens.generated.ts`).
 *
 * METADATA that does not exist in CSS (palette hue/description, the semantic
 * ShadeRef tables, the spacing display scale) is reused from the design
 * system's hand-authored token module.
 */
import {
  BG_TOKENS,
  BORDER_TOKENS,
  FG_TOKENS,
  GROUP_TOKENS,
  PALETTE as PALETTE_SOURCE,
  PRIMARY_TOKENS,
  SECONDARY_TOKENS,
  SHADES,
  SPACING_SCALE,
  lineHeightToNumber,
  type Breakpoint,
  type NamedScale,
  type PaletteFamily,
  type SemanticToken,
  type TextSize,
} from '@k8o/arte-odyssey/tokens';

import { tokens } from './design-tokens.generated';

type Scalar = string | number;

type VarValue = Scalar | { light: Scalar; dark: Scalar };

// `tokens` is emitted `as const`; index it through a Map so a missing key surfaces
// as `undefined` (handled below) rather than a silent lookup.
const VARS = new Map<string, VarValue>(Object.entries(tokens.vars));
const THEME = tokens.theme as unknown as Record<
  string,
  Record<string, unknown>
>;

// Read a scalar var. Semantic vars carry { light, dark }; palette/z-index never
// do, but the union type does — narrow it (falling back to `light`) so we never
// stringify a raw object. Throws on a missing key so stale generated data is
// caught at build time instead of rendering the literal string "undefined".
const scalar = (key: string): string => {
  const value = VARS.get(key);
  if (value === undefined) {
    throw new Error(
      `design-tokens: missing CSS variable --${key}; regenerate design-tokens.generated.ts`,
    );
  }
  return typeof value === 'object' ? String(value.light) : String(value);
};

const namedScale = (group: Record<string, unknown> | undefined): NamedScale[] =>
  Object.entries(group ?? {}).map(([name, value]) => ({
    name,
    value: String(value),
  }));

// Palette: hue/description/name from the design system, shade VALUES from the extractor.
// Fields are listed explicitly (no spread) to satisfy oxc(no-map-spread).
export const PALETTE: readonly PaletteFamily[] = PALETTE_SOURCE.map(
  (family) => ({
    name: family.name,
    prefix: family.prefix,
    hue: family.hue,
    description: family.description,
    shades: Object.fromEntries(
      SHADES.map((shade) => [shade, scalar(`${family.prefix}-${shade}`)]),
    ) as PaletteFamily['shades'],
  }),
);

type GeneratedText = {
  value: string;
  lineHeight: Scalar;
  lineHeightNumber?: number;
};
const TEXT = tokens.theme.text as unknown as Record<string, GeneratedText>;

// Prefer the precomputed numeric line-height; fall back to a numeric raw value.
// Throw (rather than silently using 0) if neither is present, to catch drift.
const lineHeightOf = (name: string, t: GeneratedText): number => {
  if (t.lineHeightNumber !== undefined) return t.lineHeightNumber;
  if (typeof t.lineHeight === 'number') return t.lineHeight;
  throw new Error(
    `design-tokens: text size "${name}" has no numeric line-height; regenerate design-tokens.generated.ts`,
  );
};

export const TEXT_SIZES: readonly TextSize[] = Object.entries(TEXT).map(
  ([name, t]) => ({
    name,
    fontSize: t.value,
    lineHeight: lineHeightOf(name, t),
  }),
);

export const RADII: readonly NamedScale[] = namedScale(THEME['radius']);
export const SHADOWS: readonly NamedScale[] = namedScale(THEME['shadow']);
export const FONT_WEIGHTS: readonly NamedScale[] = namedScale(
  THEME['font-weight'],
);
export const LETTER_SPACINGS: readonly NamedScale[] = namedScale(
  THEME['tracking'],
);
export const LINE_HEIGHTS: readonly NamedScale[] = namedScale(THEME['leading']);

const remToPx = (rem: string): string => `${Number.parseFloat(rem) * 16}px`;
export const BREAKPOINTS: readonly Breakpoint[] = Object.entries(
  THEME['breakpoint'] ?? {},
).map(([name, rem]) => ({ name, rem: String(rem), px: remToPx(String(rem)) }));

const Z_ORDER = ['overlay', 'modal', 'toast'] as const;
export const Z_INDICES: readonly NamedScale[] = Z_ORDER.map((name) => ({
  name,
  value: scalar(`z-${name}`),
}));

// Metadata reused verbatim (not derivable from CSS).
export {
  BG_TOKENS,
  BORDER_TOKENS,
  FG_TOKENS,
  GROUP_TOKENS,
  PRIMARY_TOKENS,
  SECONDARY_TOKENS,
  SHADES,
  SPACING_SCALE,
  lineHeightToNumber,
};
export type { SemanticToken };
