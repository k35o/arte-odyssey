/* eslint-disable import/max-dependencies -- 全コンポーネントの型を集めるため import が多くなる */
/* eslint-disable no-underscore-dangle -- type-level assertion 用の擬似変数名として `_Foo_bar` を使う */
/**
 * Generative UI 統合のスキーマと本体コンポーネント Props の **型レベル sync 検査**。
 *
 * `schemas.ts` は LLM 向けに手書きの Zod スキーマを定義しているため、本体
 * コンポーネントの Props 型と二重メンテになる。本体側の Props を破壊的に
 * 変更したときに（例: `variant` の enum を縮めたとき）integration が静かに
 * 古い値を許容し続けてしまう問題を、コンパイル時に検出する。
 *
 * ## アプローチ
 *
 * 「**zod で宣言した enum/型が、本体 props の対応 enum/型の subset である**」
 * ことを TypeScript の型関係でチェックする。
 *
 * - `AssertSubset<Sub, Sup>` … `Sub` が `Sup` のサブタイプであることを要求。
 *   違反するとここで型エラー（`true` が `never` に代入できない）になる。
 * - 本体 props の値を `string` / `number` / `boolean` などに広げず、リテラル
 *   union のまま比較するので、enum の追加・削除が直接検知できる。
 *
 * Props 名のリネームや shape の大きな変更（例: `label` → `text`）は完全には
 * 検知できないが、props 関数が呼び出しエラーになって `renderers.tsx` の
 * typecheck で落ちるため、実質的に同等に検出される。
 *
 * このファイルは **type-only**。実行時コードは出ない（`const _: true = true` の
 * 行は dead code として最適化で消える）。
 */

import type { FC } from 'react';
import type { z } from 'zod';

import type { Button } from '../components/buttons/button';
import type { IconButton } from '../components/buttons/icon-button';
import type { Badge } from '../components/data-display/badge';
import type { Heading } from '../components/data-display/heading';
import type { Alert } from '../components/feedback/alert';
import type { Spinner } from '../components/feedback/spinner';
import type { Grid } from '../components/layout/grid';
import type { Separator } from '../components/layout/separator';
import type { Stack } from '../components/layout/stack';
import type {
  alertProps,
  badgeProps,
  buttonProps,
  gridProps,
  headingProps,
  iconButtonProps,
  separatorProps,
  spinnerProps,
  stackProps,
} from './schemas';

/** Sub が Sup のサブタイプかを要求する。違反すると `true` が `never` に代入できず型エラー。 */
type AssertSubset<Sub, Sup extends Sub> = Sup extends Sub ? true : never;

/** FC から props 型を取り出し、`undefined` を除いて値域だけにする。 */
type PropsOf<C> = C extends FC<infer P> ? P : never;
type Prop<C, K extends keyof PropsOf<C>> = NonNullable<PropsOf<C>[K]>;
type ZProp<S extends z.ZodType, K extends keyof z.infer<S>> = NonNullable<
  z.infer<S>[K]
>;

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

const _Button_variant: AssertSubset<
  Prop<typeof Button, 'variant'>,
  ZProp<typeof buttonProps, 'variant'>
> = true;
const _Button_color: AssertSubset<
  Prop<typeof Button, 'color'>,
  ZProp<typeof buttonProps, 'color'>
> = true;
const _Button_size: AssertSubset<
  Prop<typeof Button, 'size'>,
  ZProp<typeof buttonProps, 'size'>
> = true;
const _Button_fullWidth: AssertSubset<
  Prop<typeof Button, 'fullWidth'>,
  ZProp<typeof buttonProps, 'fullWidth'>
> = true;

// ---------------------------------------------------------------------------
// IconButton
// ---------------------------------------------------------------------------

const _IconButton_size: AssertSubset<
  Prop<typeof IconButton, 'size'>,
  ZProp<typeof iconButtonProps, 'size'>
> = true;
const _IconButton_bg: AssertSubset<
  Prop<typeof IconButton, 'bg'>,
  ZProp<typeof iconButtonProps, 'bg'>
> = true;
const _IconButton_label: AssertSubset<
  Prop<typeof IconButton, 'label'>,
  ZProp<typeof iconButtonProps, 'label'>
> = true;

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

const _Badge_text: AssertSubset<
  Prop<typeof Badge, 'text'>,
  ZProp<typeof badgeProps, 'text'>
> = true;
const _Badge_tone: AssertSubset<
  Prop<typeof Badge, 'tone'>,
  ZProp<typeof badgeProps, 'tone'>
> = true;
const _Badge_variant: AssertSubset<
  Prop<typeof Badge, 'variant'>,
  ZProp<typeof badgeProps, 'variant'>
> = true;
const _Badge_size: AssertSubset<
  Prop<typeof Badge, 'size'>,
  ZProp<typeof badgeProps, 'size'>
> = true;

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------

const _Heading_type: AssertSubset<
  Prop<typeof Heading, 'type'>,
  ZProp<typeof headingProps, 'level'>
> = true;

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------

const _Alert_status: AssertSubset<
  Prop<typeof Alert, 'status'>,
  ZProp<typeof alertProps, 'status'>
> = true;
const _Alert_message: AssertSubset<
  Prop<typeof Alert, 'message'>,
  ZProp<typeof alertProps, 'message'>
> = true;

// ---------------------------------------------------------------------------
// Spinner / Separator / Stack
// ---------------------------------------------------------------------------

const _Spinner_size: AssertSubset<
  Prop<typeof Spinner, 'size'>,
  ZProp<typeof spinnerProps, 'size'>
> = true;
const _Spinner_label: AssertSubset<
  Prop<typeof Spinner, 'label'>,
  ZProp<typeof spinnerProps, 'label'>
> = true;

const _Separator_orientation: AssertSubset<
  Prop<typeof Separator, 'orientation'>,
  ZProp<typeof separatorProps, 'orientation'>
> = true;
const _Separator_color: AssertSubset<
  Prop<typeof Separator, 'color'>,
  ZProp<typeof separatorProps, 'color'>
> = true;

const _Stack_direction: AssertSubset<
  Prop<typeof Stack, 'direction'>,
  ZProp<typeof stackProps, 'direction'>
> = true;
const _Stack_gap: AssertSubset<
  Prop<typeof Stack, 'gap'>,
  ZProp<typeof stackProps, 'gap'>
> = true;
const _Stack_align: AssertSubset<
  Prop<typeof Stack, 'align'>,
  ZProp<typeof stackProps, 'align'>
> = true;
const _Stack_justify: AssertSubset<
  Prop<typeof Stack, 'justify'>,
  ZProp<typeof stackProps, 'justify'>
> = true;

const _Grid_cols: AssertSubset<
  Prop<typeof Grid, 'cols'>,
  ZProp<typeof gridProps, 'cols'>
> = true;
const _Grid_minItemSize: AssertSubset<
  Prop<typeof Grid, 'minItemSize'>,
  ZProp<typeof gridProps, 'minItemSize'>
> = true;
const _Grid_gap: AssertSubset<
  Prop<typeof Grid, 'gap'>,
  ZProp<typeof gridProps, 'gap'>
> = true;

// 未使用変数のリント警告を抑制（type-only assertion なので参照だけしておく）。
export const _typeSyncAsserts = [
  _Button_variant,
  _Button_color,
  _Button_size,
  _Button_fullWidth,
  _IconButton_size,
  _IconButton_bg,
  _IconButton_label,
  _Badge_text,
  _Badge_tone,
  _Badge_variant,
  _Badge_size,
  _Heading_type,
  _Alert_status,
  _Alert_message,
  _Spinner_size,
  _Spinner_label,
  _Separator_orientation,
  _Separator_color,
  _Stack_direction,
  _Stack_gap,
  _Stack_align,
  _Stack_justify,
  _Grid_cols,
  _Grid_minItemSize,
  _Grid_gap,
] as const;
