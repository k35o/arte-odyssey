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

// `tokens` is emitted `as const`; view it as indexable records for adapting.
const VARS = tokens.vars as unknown as Record<
  string,
  Scalar | { light: Scalar; dark: Scalar }
>;
const THEME = tokens.theme as unknown as Record<
  string,
  Record<string, unknown>
>;

// Read a scalar var. Semantic vars carry { light, dark }; palette/z-index never
// do, but the union type does — narrow it (falling back to `light`) so we never
// stringify a raw object.
const scalar = (key: string): string => {
  const value = VARS[key];
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

export const TEXT_SIZES: readonly TextSize[] = Object.entries(TEXT).map(
  ([name, t]) => ({
    name,
    fontSize: t.value,
    lineHeight:
      t.lineHeightNumber ??
      (typeof t.lineHeight === 'number' ? t.lineHeight : 0),
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
