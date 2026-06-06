# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Commands

All commands run from this directory (`packages/arte-odyssey`).

```bash
pnpm test                                    # Run all tests
pnpm test -- --project=helpers               # Helper tests only (no browser)
pnpm test -- --project=hooks                 # Hook tests only (Playwright)
pnpm test -- --project=components            # Component tests only (Storybook + Playwright)
pnpm test -- src/helpers/cn.test.ts          # Single test file
pnpm build                                   # vp pack + CSS copy
pnpm typecheck                               # Type check (no emit)
pnpm check                                   # Oxlint/Oxfmt lint/format check
pnpm check:write                             # Oxlint/Oxfmt lint/format auto-fix
pnpm storybook                               # Storybook dev server (port 6006)
```

## Adding a New Component

1. Create directory `src/components/<name>/` with 3 files:

```
src/components/<name>/
  <name>.tsx            # Implementation
  <name>.stories.tsx    # Storybook stories (also used as component tests)
  index.ts              # Re-export: export { ComponentName } from './<name>';
```

2. Add re-export in `src/index.ts` if the component should be available from the root entry point.

## Props Naming Conventions

### Boolean Props

- **状態を表す boolean** → `is` prefix を付ける: `isOpen`, `isDisabled`, `isRequired`, `isExternal`
- **モード・バリアントを表す boolean** → prefix なし: `interactive`, `animate`, `current`, `fullWidth`, `multiple`
- **ネイティブ HTML 属性 / ARIA 状態に 1:1 対応する boolean** → そのまま: `disabled`, `checked`, `required`, `invalid`（`aria-invalid` にそのまま渡るため `is` prefix を付けない）

### Controllable Props（開閉・選択などの状態）

開閉・選択といった「制御可能な状態」を持つコンポーネントは、controlled / uncontrolled の両対応（controllable）を基本とし、prop 名を横断で統一する。`useControllableState` を流用する。

- **状態（controlled）**: 真偽の開閉は `isOpen`、選択値は `selectedId` / `value` など意味的な名前。
- **初期値（uncontrolled）**: `defaultOpen` / `defaultValue` / `defaultSelectedId`。
- **変更通知**: `onChange?: (next) => void`（開閉専用の閉じ操作は `onClose?`）。

例: `Modal` / `Drawer` は `isOpen?` + `defaultOpen?` + `onClose?`、`Tabs.Root` は `selectedId?` + `defaultSelectedId?` + `onChange?`、`Accordion.Item` は `isOpen?` + `defaultOpen?` + `onChange?`。

### イベントハンドラの値型

フォーム系コンポーネントの `onChange` は、ネイティブ要素をそのまま薄くラップするもの（`TextField` / `Textarea` / `Select` / `PasswordInput`）を除き、**第1引数にその要素の意味的な値**を取る（イベントオブジェクトではなく値）。実 `<input>` を持つコンポーネントは、汎用性のため**第2引数で本物の DOM イベント**も渡す:

- `Checkbox` / `Switch`: `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void`
- `Radio`: `(value: string, event: ChangeEvent<HTMLInputElement>) => void`
- `FileField`: `(files: FileList | null, event?: ChangeEvent<HTMLInputElement>) => void`（プログラム的削除時は `event` 無し）
- `RadioCard`（`<button>` 駆動で change イベントが無い）/ `ListBox`: 値のみ（`(value) => void` / `(key) => void`）

第2引数は後方互換に追加でき（`(value) => void` は `(value, event) => void` に代入可能）、利用側は値だけ使うなら第1引数のみ受け取れば良い。

## Component Authoring Patterns

### Standard Component

```tsx
import type { FC, HTMLProps, ReactNode } from 'react';
import { cn } from '../../helpers/cn';

export const MyComponent: FC<
  { customProp?: string } & Omit<HTMLProps<HTMLDivElement>, 'customProp'>
> = ({ customProp, className, ...rest }) => {
  return <div className={cn('base-classes', className)} {...rest} />;
};
```

### Compound Component (Dialog, Tabs, FileField pattern)

```tsx
const Root: FC<PropsWithChildren> = ({ children }) => (
  <Context value={...}>{children}</Context>
);
const Part: FC = () => { /* use(Context) */ };

export const MyComponent = { Root, Part } as const;
```

- Use `createContext` + `use()` for sharing state between parts
- Use `useId()` for accessible `aria-labelledby`/`aria-describedby` connections
- `'use client'` directive at top when using hooks

## Design Token System

No raw color values — always use semantic tokens in Tailwind classes. The tokens are defined in `src/styles/index.css` via CSS custom properties and mapped to Tailwind's `@theme inline`.

### Token Categories

| Category   | Tokens                                                                       | Usage              |
| ---------- | ---------------------------------------------------------------------------- | ------------------ |
| Foreground | `fg-base`, `fg-mute`, `fg-subtle`, `fg-inverse`                              | Text colors        |
| Background | `bg-base`, `bg-raised`, `bg-subtle`, `bg-mute`, `bg-emphasize`, `bg-inverse` | Surfaces           |
| Border     | `border-base`, `border-subtle`, `border-mute`, `border-emphasize`            | Borders            |
| Status     | `{fg,bg,border}-{info,success,warning,error}`                                | Semantic status    |
| Primary    | `primary-{fg,bg,bg-subtle,bg-mute,bg-emphasize,border}`                      | Teal accent        |
| Secondary  | `secondary-{fg,bg,bg-subtle,bg-mute,bg-emphasize,border}`                    | Cyan accent        |
| Group      | `group-{primary,secondary,tertiary,quaternary}`                              | Data visualization |

### Dark Mode

Dark mode is class-based (`.dark` on `html`). All semantic tokens automatically remap — no manual `dark:` prefixes needed for tokens. Custom variant defined via `@custom-variant dark (&:where(.dark, .dark *))`.

### Focus Style

Standard pattern: `focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info`

### Custom Utilities

- `grid-cols-auto-fill-*` / `grid-cols-auto-fit-*` — responsive grid columns
- `grid-rows-auto-fill-*` / `grid-rows-auto-fit-*` — responsive grid rows

## Testing

- **Component tests** rely on Storybook stories as test fixtures via `@storybook/addon-vitest`. Writing a story IS writing a test.
- **Hook tests** use `vitest-browser-react` for rendering hooks in a real browser.
- **Helper tests** are standard unit tests, no browser needed.
- Storybook preview wraps all stories in `ArteOdysseyProvider` with light/dark theme toggle.
- a11y addon is configured with `color-contrast` check disabled (trusts design token contrast).
- Mock date is set to `2023-01-02 12:34:56` in Storybook.

## Build Pipeline

1. `vp pack` — tsdown bundles `src/index.ts` → ESM with `.d.mts` type declarations
2. `build:css` — copies `src/styles/index.css` → `dist/styles/index.css`

## Export Structure

```
@k8o/arte-odyssey              → dist/index.mjs       (all components)
@k8o/arte-odyssey/styles.css   → dist/styles/index.css
```
