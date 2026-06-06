# @k8o/arte-odyssey v10.0.0 リリース計画

現行: **9.1.0** → 目標: **10.0.0**（メジャー）

本ドキュメントはメジャーリリースに合わせて「まとめて行うべき破壊的変更」の計画書である。
実装はまだ行わず、各項目の現状・変更案・before/after・影響範囲・移行ガイド草案・changeset 種別を整理する。

実装対象として合意済みのスコープ:

- **B-1** フォーム `onChange` シグネチャ統一
- **B-2** オーバーレイ開閉 API 統一 / **B-4** `onAction`/`onClick` の方針確定
- **B-3** `variant` / `size` / `tone` 語彙統一
- **C** 依存・設定（peerDeps / engines / tsconfig）の締め

> 注: 本計画では各 API の **方針決定（どちらに寄せるか）** が最重要。実装着手前にメンテナの最終判断を要する箇所を「要決定」として明示する。

---

## A. すでに確定している major（積まれている changeset）

バージョンは以下 2 件だけで自動的に 10.0.0 になる。本計画の B/C はこれに相乗りする形。

| changeset | 種別 | 内容 | 破壊性 |
|---|---|---|---|
| `css-token-sot.md` | major | token API 刷新。`PALETTE` / `FG_TOKENS` / `TEXT_SIZES` 等の curated array を廃止し `tokens`（`{ theme, vars }`）へ統一。`generate:css` → `generate:tokens` | **あり**（`@k8o/arte-odyssey/tokens` 利用者は要移行） |
| `generative-ui-integrations.md` | major扱い | json-render / OpenUI 連携の subpath export 追加 | 実質追加のみ（非破壊） |

**TODO（A 関連）**: 旧 token からの before/after を移行ガイドに必ず記載する（v10 最大の破壊点）。

---

## B-1. フォーム `onChange` シグネチャの統一【要決定 → 実装】

### 現状（実コードで確認済み）

| コンポーネント | 現行シグネチャ | 種別 |
|---|---|---|
| `Checkbox` | `onChange?: ChangeEventHandler<HTMLInputElement>` | イベント型 |
| `Switch` | `onChange?: ChangeEventHandler<HTMLInputElement>` | イベント型 |
| `Radio` | `onChange?: ChangeEventHandler<HTMLInputElement>` | イベント型 |
| `RadioCard` | `onChange?: ChangeEventHandler<HTMLInputElement>` | イベント型 |
| `FileField` | `onChange?: ChangeEventHandler<HTMLInputElement>` | イベント型 |
| `Autocomplete` | `onChange?: (value: string[]) => void` | 値型 |
| `Slider` | `onChange?: (value: number) => void` | 値型 |
| `NumberField` | `onChange?: (value: number) => void` | 値型 |
| `CheckboxCard` | `onChange?: (value: string[]) => void` | 値型 |
| `CheckboxGroup` | `onChange?: (value: string[]) => void` | 値型 |
| `Tabs.Root` | `onChange?: (id: string) => void` | 値型 |
| `ListBox` | `onSelect?: (key: string) => void` | 値型（名前が違う） |

イベント型と値型が混在し、`ListBox` だけ `onSelect` という別名。

### 変更案（推奨: 値型に統一）

- すべての form コンポーネントの `onChange` を **値型**（その要素の意味的な値）に統一する。
- `ListBox` の `onSelect` → `onChange` にリネーム。

| コンポーネント | after |
|---|---|
| `Checkbox` | `onChange?: (checked: boolean) => void` |
| `Switch` | `onChange?: (checked: boolean) => void` |
| `Radio` | `onChange?: (value: string) => void` |
| `RadioCard` | `onChange?: (value: string) => void` |
| `FileField` | `onChange?: (files: FileList \| null) => void` |
| `ListBox` | `onSelect` を `onChange?: (key: string) => void` にリネーム |

> 既に値型の `Autocomplete` / `Slider` / `NumberField` / `CheckboxCard` / `CheckboxGroup` / `Tabs` は変更なし。

### before / after（例: Checkbox）

```tsx
// v9
<Checkbox onChange={(e) => setChecked(e.target.checked)} />

// v10
<Checkbox onChange={(checked) => setChecked(checked)} />
```

### 影響範囲（変更ファイル想定）

- `components/form/checkbox/checkbox.tsx`
- `components/form/switch/switch.tsx`
- `components/form/radio/radio.tsx`
- `components/form/radio-card/radio-card.tsx`
- `components/form/file-field/file-field.tsx`
- `components/overlays/list-box/`（`onSelect` 呼び出し箇所と型）
- 上記の `*.stories.tsx` / `*.test.tsx`
- `docs`（GUIDE / references の onChange 例）

### changeset 種別: **major**

### 要決定

- 統一方向は「値型」で確定して良いか（イベントオブジェクトが必要な利用者向けに第2引数で `event` を渡す案もある: `(checked, event) => void`）。

---

## B-2. オーバーレイ開閉 API の統一【要決定 → 実装】

### 現状（実コードで確認済み）

| コンポーネント | 開閉 props |
|---|---|
| `Modal` | `isOpen?` + `defaultOpen?` + `onClose?`（controllable） |
| `Drawer` | `isOpen`（必須）+ `onClose`（必須）= full controlled |
| `Dialog` | 開閉 state を持たず親で制御 |
| `Accordion.Item` | `defaultOpen?` のみ（uncontrolled 専用） |
| `Tabs.Root` | `selectedId?` + `defaultSelectedId?` + `onChange?`（controllable） |

開閉系の controllable パターンが Modal / Tabs と Drawer / Accordion で揃っていない。
また `Accordion.Item` は `defaultOpen` という命名だが、他の開閉系（`isOpen`）と不揃い。

### 変更案（推奨: controllable パターンに統一）

- `Drawer` を `isOpen?` + `defaultOpen?` + `onClose?` の controllable に変更（`isOpen` 必須を緩和）。
- `Accordion.Item` の開閉も controllable 対応（`isOpen?` + `defaultOpen?` + `onChange?`）を追加。
- 命名は「真偽の状態 prop = `isOpen` / 初期値 = `defaultOpen`」で全オーバーレイ横断統一。
  - ※ この命名規約は現状 CLAUDE.md に明文化されていないため、**規約自体を CLAUDE.md に追記**して以降の判断基準にする。

### before / after（例: Drawer）

```tsx
// v9: isOpen が必須（uncontrolled 不可）
<Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>

// v10: uncontrolled も可
<Drawer defaultOpen title="...">...</Drawer>
<Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>
```

### 影響範囲（変更ファイル想定）

- `components/overlays/drawer/drawer.tsx`
- `components/data-display/accordion/`（`accordion-item.tsx` / `context.tsx`）
- `hooks/controllable-state`（既存の controllable hook を流用）
- 各 `*.stories.tsx` / `*.test.tsx`
- `docs`

### changeset 種別: **major**

### 要決定

- `Drawer` の `isOpen` 必須を任意化するだけにとどめるか、`Accordion.Item` まで controllable 化するか（後者はスコープ拡大）。
- 命名規約（`isOpen` / `defaultOpen`）を正式採用してよいか。

---

## B-4. `Button` / `IconButton` の `onAction` 方針確定【要決定 → 実装 or 据え置き】

### 現状（実コードで確認済み）

`Button` / `IconButton` は `onClick` と `onAction?: () => void | Promise<void>` を**併用可能**。

```tsx
// 現行の handleClick: onClick を先に実行し、preventDefault されなければ
// onAction を useTransition でラップして実行（async ローディング表示に連動）
const handleClick = onClick || onAction
  ? (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (onAction) startTransition(async () => { await onAction(); });
    }
  : undefined;
```

→ `onAction` は「非同期処理を `useTransition` で包み、保留中スピナーを自動表示する」ための糖衣であり、`onClick` と排他ではない。バグではないが、**2 つのクリックハンドラが存在する点が API として分かりにくい**。

### 変更案（3 択 / 要決定）

1. **現状維持 + ドキュメント明確化（非破壊）**: `onClick`（同期・素のイベント）と `onAction`（非同期・保留表示付き）の役割を docs で明示。changeset 不要。
2. **`onAction` に一本化（破壊的）**: `onClick` を内部実装に隠し、公開 API は `onAction` のみ。
3. **`onClick` に一本化（破壊的）**: `onAction` を削除し、保留表示は利用者側の `useTransition` / `isPending` prop に委譲。

推奨: まず **1（ドキュメント明確化）** を最低ラインとし、API 簡素化を強く望むなら 3 を選択。

### 影響範囲

- `components/buttons/button/button.tsx`
- `components/buttons/icon-button/icon-button.tsx`
- 関連 stories / test / docs

### changeset 種別: 案1=なし / 案2・3=**major**

### 要決定

- 3 択のいずれにするか。

---

## B-3. `variant` / `size` / `tone` 語彙の統一【要決定 → 実装】

### 現状（実コードで確認済み）

| 箇所 | prop | 値 |
|---|---|---|
| `Button` | `size` | `'sm' \| 'md' \| 'lg'` |
| `Badge` | `size` | `'sm' \| 'md'`（**`lg` 欠落**） |
| `Button` | `variant` | `'contained' \| 'outlined' \| 'skeleton'` |
| `Badge` | `variant` | `'solid' \| 'outline'`（語彙が別） |
| `Button` | `color` | `'primary' \| 'secondary' \| 'gray'` |
| `Badge` | `tone` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` |
| `Table` | `tone` | `'default' \| 'muted'` |
| `Separator` | `color` | `'base' \| 'mute' \| 'subtle'` |

問題点:

- `Badge.size` だけ `lg` がなく、Button などと組み合わせ時に粒度が合わない。
- `variant` の語彙が `contained/outlined/skeleton`（Button）と `solid/outline`（Badge）で不一致。
- 色指定の prop 名が `color`（Button / Separator）と `tone`（Badge / Table）で混在。値の意味も「アクセント色」と「semantic status 色」で異なる。

### 変更案（役割で語彙を定義して統一）

- **`tone`** = semantic status 色（`neutral` / `info` / `success` / `warning` / `error`）。`Badge` は維持、status を表す他コンポーネントもこれに合わせる。
- **`color`** = アクセント色（`primary` / `secondary` / `gray`）。`Button` は維持。
- **`variant`** = 見た目パターン。語彙を全コンポーネントで揃える（例: `solid` / `outline` を基準に統一し、Button の `contained/outlined` も `solid/outline` へリネーム、`skeleton` は別 prop か維持を判断）。
- **`size`** = `'sm' \| 'md' \| 'lg'` を標準スケールとし、`Badge` に `lg` を追加。

> `Separator.color`（`base/mute/subtle`）と `Table.tone`（`default/muted`）は意味が他と異なる装飾系なので、無理に status/accent 体系へ寄せず、語彙の一貫性（`base/subtle/mute` など）だけ揃える方向で要検討。

### before / after（例）

```tsx
// Badge: lg 追加
<Badge size="lg" text="New" />          // v10 で有効に

// variant 語彙統一（案）
<Button variant="solid" />               // v9: variant="contained"
<Button variant="outline" />             // v9: variant="outlined"
```

### 影響範囲（変更ファイル想定）

- `components/data-display/badge/badge.tsx`（size に lg、variant 語彙）
- `components/buttons/button/button.tsx`（variant 語彙統一を選ぶ場合）
- `components/overlays/dropdown-menu/dropdown-menu.tsx`（`variant` を Button から借用しているため連動）
- `components/data-display/table/table.tsx` / `components/layout/separator/separator.tsx`（語彙確認）
- 各 stories / test / docs

### changeset 種別: **major**

### 要決定

- `variant` を `solid/outline` に統一するか（Button の語彙変更を伴う＝影響大）、`size` に `lg` を足すだけの最小対応に留めるか。
- `Separator` / `Table` を統一対象に含めるか。

---

## C. 依存・設定の締め【低コスト・先行着手可】

### C-1. `peerDependencies.typescript`

- 現状: `">=5.9.0"`。一方リポジトリ内部の devDependency は **TypeScript 6.0.3**。
- 変更案: `">=6.0.0"` に引き上げ。
- changeset: **major**（利用者環境の前提が変わる）。

### C-2. `engines.node`

- 現状: `">=24.13.0"`（Node 24 は非 LTS、過度に厳しい）。
- 変更案: `">=22"`（現行 LTS）あるいは `">=20"` への緩和を検討。CI に Node 22/24 マトリクスを追加。
- changeset: メジャーでの緩和（利用者に優しい変更）。**要決定**: 緩和先バージョン。

### C-3. `peerDependencies.zod`

- 現状: `">=4.0.0"`（optional、内部 4.4.3）。
- 変更案: 内部利用 API に合わせ `">=4.4.0"` への引き上げを検討（optional なので緊急度低）。

### C-4. tsconfig

- 現状: `strict` / `noUncheckedIndexedAccess` 済みで概ね良好。
- 変更案: `forceConsistentCasingInFileNames` の明示追加など軽微な締め（非破壊）。

### 影響範囲

- `packages/arte-odyssey/package.json`（peerDeps / engines）
- ルート `package.json`（engines）
- `tsconfig.json`
- `.github/workflows/ci.yml`（Node マトリクス）

### changeset 種別: **major**（peerDeps typescript）/ engines 緩和

---

## 参考: 調査で「問題なし」と確認した項目（対応不要）

サブエージェント調査で挙がったが、実コード確認の結果 **誤り / 対応不要** だったもの:

- `--border-emphasize` の dark variant 欠落 → **誤り**。`tokens.css` の light（:root）と dark の両方に定義あり。
- `--group-*` トークンが非公開 → **誤り**。`--color-group-primary` 〜 `quaternary` として公開済み（`tokens.css`）。`--group-*` を主体系に統合する TODO コメントは残っているが軽微（B/C スコープ外）。
- 「CLAUDE.md にある boolean prop 命名規約」 → **存在しない**。命名統一を進める場合は規約を新規に CLAUDE.md へ追記する必要がある。

---

## 推奨実装順序

1. **C（依存・設定）** — 影響が局所的で先に green を作りやすい。
2. **B-1（onChange 統一）** — 範囲は広いが機械的。
3. **B-3（variant/size/tone）** — `size` lg 追加など低リスクから着手し、`variant` 語彙統一は判断後。
4. **B-2 / B-4（開閉・onAction）** — 設計判断が大きいので方針確定後に着手。

各実装は個別 PR + 個別 changeset（すべて major bump、最終的に 10.0.0 へ集約）とし、`docs/`（GUIDE.md / references）と stories / test を同時更新する。
