/**
 * ArteOdyssey デザイントークンの単一の情報源 (Single Source of Truth)。
 *
 * ここで定義された値から `index.css` がビルド時に生成される。
 * トークンを編集したら `pnpm generate:css` を実行し、生成された
 * `index.css` と合わせてコミットすること。
 */

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------

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

/**
 * OKLCH Palette — Unified Lightness Scale
 *
 * L (lightness) は各段で全色相に共通で、同じ shade 番号の知覚コントラストが揃う:
 *   50: 0.975  |  400: 0.750  |  700: 0.490
 *  100: 0.945  |  500: 0.660  |  800: 0.410
 *  200: 0.900  |  600: 0.575  |  900: 0.370
 *  300: 0.840  |                 950: 0.180
 *
 * C (chroma) は色相ごとに gamut 内で最大に。H (hue) は色相ファミリごとに固定。
 */
export const PALETTE: readonly PaletteFamily[] = [
  {
    name: 'Gray',
    prefix: 'gray',
    hue: 235,
    description: 'H: 235 (sky blue tint), minimal chroma for branded neutral',
    shades: {
      50: 'oklch(0.975 0.001 235)',
      100: 'oklch(0.945 0.0015 235)',
      200: 'oklch(0.9 0.003 235)',
      300: 'oklch(0.84 0.004 235)',
      400: 'oklch(0.75 0.005 235)',
      500: 'oklch(0.66 0.006 235)',
      600: 'oklch(0.52 0.006 235)',
      700: 'oklch(0.42 0.003 235)',
      800: 'oklch(0.3 0.002 235)',
      900: 'oklch(0.25 0.0015 235)',
      950: 'oklch(0.18 0.001 235)',
    },
  },
  {
    name: 'Red',
    prefix: 'red',
    hue: 25,
    description: 'H: 25',
    shades: {
      50: 'oklch(0.975 0.016 25)',
      100: 'oklch(0.945 0.042 25)',
      200: 'oklch(0.9 0.084 25)',
      300: 'oklch(0.84 0.15 25)',
      400: 'oklch(0.75 0.225 25)',
      500: 'oklch(0.66 0.27 25)',
      600: 'oklch(0.575 0.255 25)',
      700: 'oklch(0.49 0.22 25)',
      800: 'oklch(0.41 0.18 25)',
      900: 'oklch(0.37 0.14 25)',
      950: 'oklch(0.18 0.1 25)',
    },
  },
  {
    name: 'Pink',
    prefix: 'pink',
    hue: 350,
    description: 'H: 350',
    shades: {
      50: 'oklch(0.975 0.016 350)',
      100: 'oklch(0.945 0.038 350)',
      200: 'oklch(0.9 0.078 350)',
      300: 'oklch(0.84 0.145 350)',
      400: 'oklch(0.75 0.225 350)',
      500: 'oklch(0.66 0.27 350)',
      600: 'oklch(0.575 0.26 350)',
      700: 'oklch(0.49 0.23 350)',
      800: 'oklch(0.41 0.19 350)',
      900: 'oklch(0.37 0.15 350)',
      950: 'oklch(0.18 0.108 350)',
    },
  },
  {
    name: 'Purple',
    prefix: 'purple',
    hue: 305,
    description: 'H: 305',
    shades: {
      50: 'oklch(0.975 0.018 305)',
      100: 'oklch(0.945 0.042 305)',
      200: 'oklch(0.9 0.082 305)',
      300: 'oklch(0.84 0.155 305)',
      400: 'oklch(0.75 0.24 305)',
      500: 'oklch(0.66 0.29 305)',
      600: 'oklch(0.575 0.295 305)',
      700: 'oklch(0.49 0.265 305)',
      800: 'oklch(0.41 0.22 305)',
      900: 'oklch(0.37 0.175 305)',
      950: 'oklch(0.18 0.125 305)',
    },
  },
  {
    name: 'Cyan',
    prefix: 'cyan',
    hue: 210,
    description: 'H: 210 (Secondary)',
    shades: {
      50: 'oklch(0.975 0.022 210)',
      100: 'oklch(0.945 0.055 210)',
      200: 'oklch(0.9 0.098 210)',
      300: 'oklch(0.84 0.155 210)',
      400: 'oklch(0.75 0.18 210)',
      500: 'oklch(0.66 0.17 210)',
      600: 'oklch(0.575 0.15 210)',
      700: 'oklch(0.49 0.128 210)',
      800: 'oklch(0.41 0.105 210)',
      900: 'oklch(0.37 0.082 210)',
      950: 'oklch(0.18 0.058 210)',
    },
  },
  {
    name: 'Blue',
    prefix: 'blue',
    hue: 260,
    description: 'H: 260',
    shades: {
      50: 'oklch(0.975 0.016 260)',
      100: 'oklch(0.945 0.04 260)',
      200: 'oklch(0.9 0.078 260)',
      300: 'oklch(0.84 0.145 260)',
      400: 'oklch(0.75 0.21 260)',
      500: 'oklch(0.66 0.255 260)',
      600: 'oklch(0.575 0.275 260)',
      700: 'oklch(0.49 0.26 260)',
      800: 'oklch(0.41 0.215 260)',
      900: 'oklch(0.37 0.165 260)',
      950: 'oklch(0.18 0.118 260)',
    },
  },
  {
    name: 'Teal',
    prefix: 'teal',
    hue: 180,
    description: 'H: 180 (Primary)',
    shades: {
      50: 'oklch(0.975 0.02 180)',
      100: 'oklch(0.945 0.058 180)',
      200: 'oklch(0.9 0.11 180)',
      300: 'oklch(0.84 0.16 180)',
      400: 'oklch(0.75 0.175 180)',
      500: 'oklch(0.66 0.165 180)',
      600: 'oklch(0.575 0.145 180)',
      700: 'oklch(0.49 0.12 180)',
      800: 'oklch(0.41 0.098 180)',
      900: 'oklch(0.37 0.078 180)',
      950: 'oklch(0.18 0.055 180)',
    },
  },
  {
    name: 'Green',
    prefix: 'green',
    hue: 150,
    description: 'H: 150',
    shades: {
      50: 'oklch(0.975 0.02 150)',
      100: 'oklch(0.945 0.052 150)',
      200: 'oklch(0.9 0.1 150)',
      300: 'oklch(0.84 0.175 150)',
      400: 'oklch(0.75 0.235 150)',
      500: 'oklch(0.66 0.245 150)',
      600: 'oklch(0.575 0.22 150)',
      700: 'oklch(0.49 0.18 150)',
      800: 'oklch(0.41 0.14 150)',
      900: 'oklch(0.37 0.108 150)',
      950: 'oklch(0.18 0.075 150)',
    },
  },
  {
    name: 'Yellow',
    prefix: 'yellow',
    hue: 90,
    description: 'H: 90',
    shades: {
      50: 'oklch(0.975 0.03 90)',
      100: 'oklch(0.945 0.08 90)',
      200: 'oklch(0.9 0.148 90)',
      300: 'oklch(0.84 0.2 90)',
      400: 'oklch(0.75 0.2 90)',
      500: 'oklch(0.66 0.18 90)',
      600: 'oklch(0.575 0.158 90)',
      700: 'oklch(0.49 0.135 90)',
      800: 'oklch(0.41 0.11 90)',
      900: 'oklch(0.37 0.085 90)',
      950: 'oklch(0.18 0.06 90)',
    },
  },
  {
    name: 'Orange',
    prefix: 'orange',
    hue: 55,
    description: 'H: 55',
    shades: {
      50: 'oklch(0.975 0.02 55)',
      100: 'oklch(0.945 0.05 55)',
      200: 'oklch(0.9 0.098 55)',
      300: 'oklch(0.84 0.165 55)',
      400: 'oklch(0.75 0.22 55)',
      500: 'oklch(0.66 0.24 55)',
      600: 'oklch(0.575 0.235 55)',
      700: 'oklch(0.49 0.2 55)',
      800: 'oklch(0.41 0.165 55)',
      900: 'oklch(0.37 0.128 55)',
      950: 'oklch(0.18 0.09 55)',
    },
  },
];

export const WHITE = 'oklch(1 0 0)';

export const BACK_DROP = 'rgb(0, 0, 0, 0.5)';

// ---------------------------------------------------------------------------
// Semantic tokens (light / dark)
// ---------------------------------------------------------------------------

export type SemanticToken = {
  name: string;
  light: ShadeRef;
  dark: ShadeRef;
};

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
  { name: 'bg-base', light: 'white', dark: 'gray-900' },
  { name: 'bg-raised', light: 'white', dark: 'gray-800' },
  { name: 'bg-surface', light: 'gray-50', dark: 'gray-950' },
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

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export type TextSize = {
  name: string;
  fontSize: string;
  /** Ratio used to compute line-height; CSS emits calc(numerator / denominator). */
  lineHeight: { numerator: number; denominator: number } | number;
};

export const TEXT_SIZES: readonly TextSize[] = [
  {
    name: 'xs',
    fontSize: '0.75rem',
    lineHeight: { numerator: 1, denominator: 0.75 },
  },
  {
    name: 'sm',
    fontSize: '0.875rem',
    lineHeight: { numerator: 1.25, denominator: 0.875 },
  },
  {
    name: 'md',
    fontSize: '1rem',
    lineHeight: { numerator: 1.5, denominator: 1 },
  },
  {
    name: 'lg',
    fontSize: '1.125rem',
    lineHeight: { numerator: 1.75, denominator: 1.125 },
  },
  {
    name: 'xl',
    fontSize: '1.25rem',
    lineHeight: { numerator: 1.75, denominator: 1.25 },
  },
  {
    name: '2xl',
    fontSize: '1.5rem',
    lineHeight: { numerator: 2, denominator: 1.5 },
  },
  {
    name: '3xl',
    fontSize: '1.875rem',
    lineHeight: { numerator: 2.25, denominator: 1.875 },
  },
  { name: 'emphasize', fontSize: '3rem', lineHeight: 1 },
  { name: 'highlight', fontSize: '6rem', lineHeight: 1 },
];

export const lineHeightToNumber = (lh: TextSize['lineHeight']): number =>
  typeof lh === 'number' ? lh : lh.numerator / lh.denominator;

export type NamedScale = { name: string; value: string };

export const FONT_WEIGHTS: readonly NamedScale[] = [
  { name: 'medium', value: '450' },
  { name: 'bold', value: '700' },
];

export const LETTER_SPACINGS: readonly NamedScale[] = [
  { name: 'none', value: '0em' },
  { name: 'normal', value: '0.025em' },
];

export const LINE_HEIGHTS: readonly NamedScale[] = [
  { name: 'none', value: '1' },
  { name: 'tight', value: '1.25' },
  { name: 'snug', value: '1.375' },
  { name: 'normal', value: '1.5' },
  { name: 'relaxed', value: '1.625' },
  { name: 'loose', value: '2' },
];

/** Font family CSS vars expected to be injected by the host app. */
export const FONT_FAMILIES: readonly NamedScale[] = [
  { name: 'noto-sans-jp', value: 'var(--font-noto-sans-jp)' },
  { name: 'm-plus-2', value: 'var(--font-m-plus-2)' },
];

// ---------------------------------------------------------------------------
// Radii / Shadows / Spacing / Breakpoints
// ---------------------------------------------------------------------------

export const RADII: readonly NamedScale[] = [
  { name: 'sm', value: '0.375rem' },
  { name: 'md', value: '0.5rem' },
  { name: 'lg', value: '0.75rem' },
  { name: 'xl', value: '1rem' },
  { name: '2xl', value: '1.25rem' },
];

export const SHADOWS: readonly NamedScale[] = [
  { name: '2xs', value: '0 1px rgb(0 0 0 / 0.05)' },
  { name: 'xs', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  {
    name: 'sm',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  },
  {
    name: 'md',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  {
    name: 'lg',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  {
    name: 'xl',
    value:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  { name: '2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
];

export const INSET_SHADOWS: readonly NamedScale[] = [
  { name: '2xs', value: 'inset 0 1px rgb(0 0 0 / 0.05)' },
  { name: 'xs', value: 'inset 0 1px 1px rgb(0 0 0 / 0.05)' },
  { name: 'sm', value: 'inset 0 2px 4px rgb(0 0 0 / 0.05)' },
];

/** Base unit used by Tailwind `--spacing` (all `p-*`, `m-*` etc. multiply this). */
export const SPACING_BASE = '0.25rem';

export type SpacingStep = { step: number; rem: string; px: string };

/** Display scale for docs — expanded from `SPACING_BASE`. */
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

export type Breakpoint = { name: string; rem: string; px: string };

export const BREAKPOINTS: readonly Breakpoint[] = [
  { name: 'sm', rem: '40rem', px: '640px' },
  { name: 'md', rem: '48rem', px: '768px' },
  { name: 'lg', rem: '64rem', px: '1024px' },
  { name: 'xl', rem: '80rem', px: '1280px' },
  { name: '2xl', rem: '96rem', px: '1536px' },
];

// ---------------------------------------------------------------------------
// Overlay z-index layers
// ---------------------------------------------------------------------------

/**
 * オーバーレイ系コンポーネントの重なり順を定義する 3 層スケール。
 *
 *   overlay (1000) — trigger に紐付く浮遊 UI (Popover / DropdownMenu / ListBox / Tooltip)
 *   modal   (1300) — Modal / Drawer。`<dialog>` top-layer により実質はネイティブ制御だが、
 *                     stacking context を持つ非ネイティブ実装に切り替えても破綻しないよう明示
 *   toast   (1500) — Toast。モーダルや浮遊 UI より上に必ず表示される
 *
 * 同層内の同時表示はサポート外。新たな層が必要になったら間に挿入する。
 */
export const Z_INDICES: readonly NamedScale[] = [
  { name: 'overlay', value: '1000' },
  { name: 'modal', value: '1300' },
  { name: 'toast', value: '1500' },
];
