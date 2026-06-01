/**
 * Docs-only design-token view.
 *
 * The token VALUES come from `@k8o/arte-odyssey/tokens` (extracted from the
 * design system's CSS by `tailwind-token-extractor`). Presentation metadata that
 * does NOT exist in CSS — palette hue/description, the semantic ShadeRef tables,
 * and the spacing display scale — lives here, since it is a documentation
 * concern rather than part of the library's public token API.
 */
import { tokens } from '@k8o/arte-odyssey/tokens';

export const SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
export type Shade = (typeof SHADES)[number];

export const PALETTE_PREFIXES = [
  'gray',
  'red',
  'pink',
  'purple',
  'cyan',
  'blue',
  'teal',
  'green',
  'yellow',
  'orange',
] as const;
export type PalettePrefix = (typeof PALETTE_PREFIXES)[number];

export type ShadeRef = `${PalettePrefix}-${Shade}` | 'white';

export type PaletteFamily = {
  name: string;
  prefix: PalettePrefix;
  hue: number;
  description: string;
  shades: Record<Shade, string>;
};

export type SemanticToken = { name: string; light: ShadeRef; dark: ShadeRef };
export type TextSize = { name: string; fontSize: string; lineHeight: number };
export type NamedScale = { name: string; value: string };
export type SpacingStep = { step: number; rem: string; px: string };
export type Breakpoint = { name: string; rem: string; px: string };

// --- value accessors over the extracted tokens --------------------------------
type Scalar = string | number;
type VarValue = Scalar | { light: Scalar; dark: Scalar };
const VARS = new Map<string, VarValue>(Object.entries(tokens.vars));
const THEME = tokens.theme as unknown as Record<
  string,
  Record<string, unknown>
>;

const scalarVar = (key: string): string => {
  const value = VARS.get(key);
  if (value === undefined) {
    throw new Error(
      `design-tokens: missing CSS variable --${key}; regenerate tokens.generated.ts`,
    );
  }
  return typeof value === 'object' ? String(value.light) : String(value);
};

const namedScale = (group: Record<string, unknown> | undefined): NamedScale[] =>
  Object.entries(group ?? {}).map(([name, value]) => ({
    name,
    value: String(value),
  }));

// --- palette (hue/description = metadata, shade values = extracted) -----------
const PALETTE_META: ReadonlyArray<Omit<PaletteFamily, 'shades'>> = [
  {
    name: 'Gray',
    prefix: 'gray',
    hue: 235,
    description: 'H: 235 (sky blue tint), minimal chroma for branded neutral',
  },
  { name: 'Red', prefix: 'red', hue: 25, description: 'H: 25' },
  { name: 'Pink', prefix: 'pink', hue: 350, description: 'H: 350' },
  { name: 'Purple', prefix: 'purple', hue: 305, description: 'H: 305' },
  { name: 'Cyan', prefix: 'cyan', hue: 210, description: 'H: 210 (Secondary)' },
  { name: 'Blue', prefix: 'blue', hue: 260, description: 'H: 260' },
  { name: 'Teal', prefix: 'teal', hue: 180, description: 'H: 180 (Primary)' },
  { name: 'Green', prefix: 'green', hue: 150, description: 'H: 150' },
  { name: 'Yellow', prefix: 'yellow', hue: 90, description: 'H: 90' },
  { name: 'Orange', prefix: 'orange', hue: 55, description: 'H: 55' },
];

export const PALETTE: readonly PaletteFamily[] = PALETTE_META.map((family) => ({
  name: family.name,
  prefix: family.prefix,
  hue: family.hue,
  description: family.description,
  shades: Object.fromEntries(
    SHADES.map((shade) => [shade, scalarVar(`${family.prefix}-${shade}`)]),
  ) as Record<Shade, string>,
}));

// --- semantic tokens (ShadeRef labels = metadata; swatch uses live CSS var) ---
export const FG_TOKENS: readonly SemanticToken[] = [
  { name: 'fg-base', light: 'gray-900', dark: 'gray-50' },
  { name: 'fg-subtle', light: 'gray-400', dark: 'gray-500' },
  { name: 'fg-mute', light: 'gray-700', dark: 'gray-300' },
  { name: 'fg-inverse', light: 'gray-50', dark: 'gray-900' },
  { name: 'fg-info', light: 'blue-800', dark: 'blue-200' },
  { name: 'fg-success', light: 'green-800', dark: 'green-200' },
  { name: 'fg-warning', light: 'yellow-800', dark: 'yellow-200' },
  { name: 'fg-error', light: 'red-800', dark: 'red-200' },
];

export const BG_TOKENS: readonly SemanticToken[] = [
  { name: 'bg-base', light: 'white', dark: 'gray-800' },
  { name: 'bg-raised', light: 'white', dark: 'gray-700' },
  { name: 'bg-surface', light: 'gray-50', dark: 'gray-900' },
  { name: 'bg-subtle', light: 'gray-100', dark: 'gray-800' },
  { name: 'bg-mute', light: 'gray-200', dark: 'gray-700' },
  { name: 'bg-emphasize', light: 'gray-300', dark: 'gray-600' },
  { name: 'bg-inverse', light: 'gray-900', dark: 'white' },
  { name: 'bg-info', light: 'blue-100', dark: 'blue-900' },
  { name: 'bg-success', light: 'green-100', dark: 'green-900' },
  { name: 'bg-warning', light: 'yellow-100', dark: 'yellow-900' },
  { name: 'bg-error', light: 'red-100', dark: 'red-900' },
];

export const BORDER_TOKENS: readonly SemanticToken[] = [
  { name: 'border-base', light: 'gray-400', dark: 'gray-600' },
  { name: 'border-subtle', light: 'gray-100', dark: 'gray-700' },
  { name: 'border-mute', light: 'gray-200', dark: 'gray-600' },
  { name: 'border-emphasize', light: 'gray-500', dark: 'gray-500' },
  { name: 'border-inverse', light: 'gray-700', dark: 'gray-300' },
  { name: 'border-info', light: 'blue-500', dark: 'blue-400' },
  { name: 'border-success', light: 'green-500', dark: 'green-400' },
  { name: 'border-warning', light: 'yellow-500', dark: 'yellow-400' },
  { name: 'border-error', light: 'red-500', dark: 'red-400' },
];

export const PRIMARY_TOKENS: readonly SemanticToken[] = [
  { name: 'primary-fg', light: 'teal-800', dark: 'teal-300' },
  { name: 'primary-bg', light: 'teal-200', dark: 'teal-800' },
  { name: 'primary-bg-subtle', light: 'teal-50', dark: 'teal-950' },
  { name: 'primary-bg-mute', light: 'teal-100', dark: 'teal-900' },
  { name: 'primary-bg-emphasize', light: 'teal-300', dark: 'teal-700' },
  { name: 'primary-border', light: 'teal-500', dark: 'teal-500' },
];

export const SECONDARY_TOKENS: readonly SemanticToken[] = [
  { name: 'secondary-fg', light: 'cyan-800', dark: 'cyan-300' },
  { name: 'secondary-bg', light: 'cyan-200', dark: 'cyan-800' },
  { name: 'secondary-bg-subtle', light: 'cyan-50', dark: 'cyan-950' },
  { name: 'secondary-bg-mute', light: 'cyan-100', dark: 'cyan-900' },
  { name: 'secondary-bg-emphasize', light: 'cyan-300', dark: 'cyan-700' },
  { name: 'secondary-border', light: 'cyan-500', dark: 'cyan-500' },
];

export const GROUP_TOKENS: readonly SemanticToken[] = [
  { name: 'group-primary', light: 'teal-800', dark: 'teal-200' },
  { name: 'group-secondary', light: 'cyan-800', dark: 'cyan-200' },
  { name: 'group-tertiary', light: 'pink-800', dark: 'pink-200' },
  { name: 'group-quaternary', light: 'purple-800', dark: 'purple-200' },
];

// --- typography / scales (values extracted) -----------------------------------
type GeneratedText = {
  value: string;
  lineHeight: Scalar;
  lineHeightNumber?: number;
};
const TEXT = tokens.theme.text as unknown as Record<string, GeneratedText>;

const lineHeightOf = (name: string, t: GeneratedText): number => {
  if (t.lineHeightNumber !== undefined) return t.lineHeightNumber;
  if (typeof t.lineHeight === 'number') return t.lineHeight;
  throw new Error(
    `design-tokens: text size "${name}" has no numeric line-height; regenerate tokens.generated.ts`,
  );
};

export const TEXT_SIZES: readonly TextSize[] = Object.entries(TEXT).map(
  ([name, t]) => ({
    name,
    fontSize: t.value,
    lineHeight: lineHeightOf(name, t),
  }),
);

/** Line-height is already a numeric ratio; kept for call-site compatibility. */
export const lineHeightToNumber = (lineHeight: number): number => lineHeight;

export const FONT_WEIGHTS: readonly NamedScale[] = namedScale(
  THEME['font-weight'],
);
export const LETTER_SPACINGS: readonly NamedScale[] = namedScale(
  THEME['tracking'],
);
export const LINE_HEIGHTS: readonly NamedScale[] = namedScale(THEME['leading']);
export const RADII: readonly NamedScale[] = namedScale(THEME['radius']);
export const SHADOWS: readonly NamedScale[] = namedScale(THEME['shadow']);

const remToPx = (rem: string): string => `${Number.parseFloat(rem) * 16}px`;
export const BREAKPOINTS: readonly Breakpoint[] = Object.entries(
  THEME['breakpoint'] ?? {},
).map(([name, rem]) => ({ name, rem: String(rem), px: remToPx(String(rem)) }));

const Z_ORDER = ['overlay', 'modal', 'toast'] as const;
export const Z_INDICES: readonly NamedScale[] = Z_ORDER.map((name) => ({
  name,
  value: scalarVar(`z-${name}`),
}));

/** Display scale for docs — not derivable from CSS. */
export const SPACING_SCALE: readonly SpacingStep[] = [
  { step: 0.5, rem: '0.125rem', px: '2px' },
  { step: 1, rem: '0.25rem', px: '4px' },
  { step: 2, rem: '0.5rem', px: '8px' },
  { step: 3, rem: '0.75rem', px: '12px' },
  { step: 4, rem: '1rem', px: '16px' },
  { step: 5, rem: '1.25rem', px: '20px' },
  { step: 6, rem: '1.5rem', px: '24px' },
  { step: 8, rem: '2rem', px: '32px' },
  { step: 10, rem: '2.5rem', px: '40px' },
  { step: 12, rem: '3rem', px: '48px' },
  { step: 16, rem: '4rem', px: '64px' },
  { step: 20, rem: '5rem', px: '80px' },
  { step: 24, rem: '6rem', px: '96px' },
];
