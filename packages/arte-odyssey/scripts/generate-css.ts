#!/usr/bin/env node
/**
 * Generates `src/styles/index.css` by concatenating:
 *   - `src/styles/base.css`      (hand-written static CSS prologue)
 *   - :root / .dark / @theme blocks rendered from `src/styles/tokens.ts`
 *   - `src/styles/utilities.css` (hand-written static @utility rules)
 *
 * Run:
 *   pnpm generate:css
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  BACK_DROP,
  BG_TOKENS,
  BORDER_TOKENS,
  BREAKPOINTS,
  FG_TOKENS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  GROUP_TOKENS,
  INSET_SHADOWS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  PALETTE,
  PRIMARY_TOKENS,
  RADII,
  SECONDARY_TOKENS,
  SHADOWS,
  SPACING_BASE,
  TEXT_SIZES,
  WHITE,
  Z_INDICES,
  type SemanticToken,
  type ShadeRef,
} from '../src/styles/tokens.ts';

const BANNER = `/**
 * AUTO-GENERATED — do not edit directly.
 *
 * Static CSS lives in \`base.css\` and \`utilities.css\`.
 * Design tokens live in \`tokens.ts\`.
 * Run \`pnpm generate:css\` after editing any of them.
 */`;

const shadeRefToVar = (ref: ShadeRef): string => `var(--${ref})`;

const renderSemanticBlock = (
  tokens: readonly SemanticToken[],
  mode: 'light' | 'dark',
): string =>
  tokens.map((t) => `  --${t.name}: ${shadeRefToVar(t[mode])};`).join('\n');

const renderPalette = (): string =>
  PALETTE.map(
    (family) =>
      `  /* ${family.name} — ${family.description} */\n${(
        Object.keys(family.shades) as unknown as Array<
          keyof typeof family.shades
        >
      )
        .map(
          (shade) => `  --${family.prefix}-${shade}: ${family.shades[shade]};`,
        )
        .join('\n')}`,
  ).join('\n\n');

const renderZRootBlock = (): string =>
  Z_INDICES.map((z) => `  --z-${z.name}: ${z.value};`).join('\n');

const renderRoot = (): string => {
  const palette = renderPalette();
  const fg = renderSemanticBlock(FG_TOKENS, 'light');
  const bg = renderSemanticBlock(BG_TOKENS, 'light');
  const border = renderSemanticBlock(BORDER_TOKENS, 'light');
  const primary = renderSemanticBlock(PRIMARY_TOKENS, 'light');
  const secondary = renderSemanticBlock(SECONDARY_TOKENS, 'light');
  const group = renderSemanticBlock(GROUP_TOKENS, 'light');
  const zIndices = renderZRootBlock();

  return `:root {
  --white: ${WHITE};

${palette}

${fg}

${bg}

${border}

${primary}

${secondary}

  --back-drop: ${BACK_DROP};

${zIndices}

  /* TODO: 上の変数の一環として使えるようにする */
${group}
}`;
};

const renderDark = (): string => {
  const fg = renderSemanticBlock(FG_TOKENS, 'dark');
  const bg = renderSemanticBlock(BG_TOKENS, 'dark');
  const border = renderSemanticBlock(BORDER_TOKENS, 'dark');
  const primary = renderSemanticBlock(PRIMARY_TOKENS, 'dark');
  const secondary = renderSemanticBlock(SECONDARY_TOKENS, 'dark');
  const group = renderSemanticBlock(GROUP_TOKENS, 'dark');

  return `.dark {
${fg}

${bg}

${border}

${primary}

${secondary}

  /* TODO: 上の変数の一環として使えるようにする */
${group}
}`;
};

const renderColorTheme = (): string => {
  const sections = [
    FG_TOKENS,
    BG_TOKENS,
    BORDER_TOKENS,
    PRIMARY_TOKENS,
    SECONDARY_TOKENS,
  ];
  const lines = sections
    .map((section) =>
      section.map((t) => `  --color-${t.name}: var(--${t.name});`).join('\n'),
    )
    .join('\n\n');

  const groupLines = GROUP_TOKENS.map(
    (t) => `  --color-${t.name}: var(--${t.name});`,
  ).join('\n');

  return `  --color-*: initial;
${lines}

  --color-transparent: transparent;
  --color-back-drop: var(--back-drop);

  /* group */
${groupLines}`;
};

const renderRadii = (): string =>
  `  --radius-*: initial;\n${RADII.map((r) => `  --radius-${r.name}: ${r.value};`).join('\n')}`;

const renderFonts = (): string =>
  `  --font-*: initial;\n${FONT_FAMILIES.map((f) => `  --font-${f.name}: ${f.value};`).join('\n')}`;

const renderLineHeight = (
  lh: (typeof TEXT_SIZES)[number]['lineHeight'],
): string =>
  typeof lh === 'number'
    ? `${lh}`
    : `calc(${lh.numerator} / ${lh.denominator})`;

const renderText = (): string => {
  const header = `  --text-*: initial;`;
  const body = TEXT_SIZES.flatMap((t) => [
    `  --text-${t.name}: ${t.fontSize};`,
    `  --text-${t.name}--line-height: ${renderLineHeight(t.lineHeight)};`,
  ]).join('\n');
  return `${header}\n${body}`;
};

const renderFontWeights = (): string =>
  `  --font-weight-*: initial;\n${FONT_WEIGHTS.map((w) => `  --font-weight-${w.name}: ${w.value};`).join('\n')}`;

const renderTracking = (): string =>
  `  --tracking-*: initial;\n${LETTER_SPACINGS.map((t) => `  --tracking-${t.name}: ${t.value};`).join('\n')}`;

const renderLeading = (): string =>
  `  --leading-*: initial;\n${LINE_HEIGHTS.map((l) => `  --leading-${l.name}: ${l.value};`).join('\n')}`;

const renderShadows = (): string =>
  `  --shadow-*: initial;\n${SHADOWS.map((s) => `  --shadow-${s.name}: ${s.value};`).join('\n')}`;

const renderInsetShadows = (): string =>
  `  --inset-shadow-*: initial;\n${INSET_SHADOWS.map((s) => `  --inset-shadow-${s.name}: ${s.value};`).join('\n')}`;

const renderBreakpoints = (): string =>
  `  --breakpoint-*: initial;\n${BREAKPOINTS.map((b) => `  --breakpoint-${b.name}: ${b.rem};`).join('\n')}`;

const renderTheme = (): string =>
  `@theme inline {
${renderColorTheme()}

${renderRadii()}

${renderFonts()}

${renderText()}

${renderFontWeights()}

${renderTracking()}

${renderLeading()}

${renderShadows()}

${renderInsetShadows()}

  --spacing: ${SPACING_BASE};

${renderBreakpoints()}
}`;

const renderZUtilities = (): string =>
  Z_INDICES.map(
    (z) => `@utility z-${z.name} {\n  z-index: var(--z-${z.name});\n}`,
  ).join('\n\n');

const renderTokensCss = (): string => `${renderRoot()}

${renderDark()}

${renderTheme()}`;

const __dirname = import.meta.dirname;
const stylesDir = resolve(__dirname, '../src/styles');

const base = readFileSync(resolve(stylesDir, 'base.css'), 'utf8').trimEnd();
const utilities = readFileSync(
  resolve(stylesDir, 'utilities.css'),
  'utf8',
).trimEnd();

const output = `${BANNER}

${base}

${renderTokensCss()}

${utilities}

${renderZUtilities()}
`;

const outputPath = resolve(stylesDir, 'index.css');
writeFileSync(outputPath, output, 'utf8');
process.stdout.write(`✓ Generated ${outputPath}\n`);
