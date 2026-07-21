# @k8o/arte-odyssey

## 11.0.0

### Major Changes

- [#575](https://github.com/k35o/arte-odyssey/pull/575) [`30a8c20`](https://github.com/k35o/arte-odyssey/commit/30a8c20acf879ebed0829828a86ce8858d6a6e93) Thanks [@k35o](https://github.com/k35o)! - **BREAKING**: `BaselineStatus` コンポーネントを削除しました。ランタイムで webstatus.dev を取得する実装だったため、対応状況の表示は各アプリ側で web-features 等のデータから構築する方針に変更します（ブラウザ別の表示には `ChromeIcon` 等のアイコンを利用できます）。

### Minor Changes

- [#575](https://github.com/k35o/arte-odyssey/pull/575) [`5fda8cb`](https://github.com/k35o/arte-odyssey/commit/5fda8cbe86b88c9d92e7e228a1108eab42ae1c1d) Thanks [@k35o](https://github.com/k35o)! - 公式ブラウザロゴのアイコン `ChromeIcon` / `EdgeIcon` / `FirefoxIcon` / `SafariIcon` を追加しました。ブラウザ別の対応状況表示などに使えます。

## 10.9.0

### Minor Changes

- [#568](https://github.com/k35o/arte-odyssey/pull/568) [`652f871`](https://github.com/k35o/arte-odyssey/commit/652f871894ff74fe164a8990e8e751e812349275) Thanks [@k35o](https://github.com/k35o)! - `RefreshIcon` を追加しました。円を描く矢印のアイコンで、再読み込みや再取得のボタンに使えます。時系列をさかのぼる `HistoryIcon` とは意味が異なるため、更新操作にはこちらを使ってください。

## 10.8.0

### Minor Changes

- [#566](https://github.com/k35o/arte-odyssey/pull/566) [`8192f24`](https://github.com/k35o/arte-odyssey/commit/8192f2433150f8c60a60137acc29950f7f17c9bc) Thanks [@k35o](https://github.com/k35o)! - `ColorScaleIcon` を追加しました。段階的に濃くなるスウォッチを並べたアイコンで、カラースケールやパレット生成系の UI を表すのに使えます。

## 10.7.0

### Minor Changes

- [#564](https://github.com/k35o/arte-odyssey/pull/564) [`a896a99`](https://github.com/k35o/arte-odyssey/commit/a896a99cc5ec609c5fc7c5498e49e1ac43a35bc0) Thanks [@k35o](https://github.com/k35o)! - AI チャット向けのコンポーネント群を追加しました。

  サブパス `@k8o/arte-odyssey/ai` から、状態管理や通信を持たない presentational なチャット部品を提供します。`messages.map()` で組み立てる composition 駆動の API で、AI SDK でも自前実装でも接続できます。

  - `Conversation`（`Root` / `Messages` / `ScrollButton`）: stick-to-bottom スクロールと「最新へ」ボタン。`role="log"` と `aria-busy` でストリーミングを支援。
  - `Message`（`Root` / `Content`）: `from` で user / assistant を切り替える吹き出し。`isStreaming` で点滅カーソル。
  - `PromptInput`（`Root` / `Textarea` / `Submit`）: IME 変換確定の Enter では送信しない入力欄。`status` に応じて送信 / 停止を切り替え。
  - `ToolInvocation` / `Reasoning`: ツール呼び出しと思考過程の折りたたみ表示。
  - `Suggestion`（`List` / `Item`）: サジェストチップ。

  加えて 2 つのサブパスを追加しました。

  - `@k8o/arte-odyssey/ai/response`: ストリーミング対応の Markdown レンダラ `Response`。`streamdown` を optional peer として利用（未クローズのコードブロック等にも耐える）。
  - `@k8o/arte-odyssey/ai-sdk`: AI SDK の `UIMessage.parts` を各コンポーネントに対応付ける `mapMessageParts`。`ai` を optional peer として利用。

  `streamdown` と `ai` はいずれも optional peerDependency のため、該当サブパスを使う場合のみインストールが必要です。

  あわせて、`Avatar` に `icon?: ReactNode` と `color?: 'base' | 'primary' | 'secondary'` を追加しました。画像・イニシャルに加えてアイコンをアバターとして表示でき（優先度は `src`(画像) > `icon` > イニシャル）、`color` で Teal / Cyan のアクセント円にできます。アシスタントの表示などに使えます。アシスタント向けの `AssistantIcon`（Lucide の `bot-message-square`）も追加しています。

## 10.6.4

### Patch Changes

- [#562](https://github.com/k35o/arte-odyssey/pull/562) [`f74412f`](https://github.com/k35o/arte-odyssey/commit/f74412f346835a92bd9fa00de79b444d419d5c1a) Thanks [@k35o](https://github.com/k35o)! - ダークモードのオーバーレイ背景（`bg-raised`）を gray-700 から gray-800 に変更

  ダークモードの `--bg-raised` は gray-700（明度 0.42）で、Modal / Popover / DropdownMenu などのオーバーレイがほぼ黒の背景の上で白っぽく浮いて見えていました。ライトモードの raised が base と同じ white で影によって分離しているのと同様に、ダークモードも `bg-base` と同じ gray-800（明度 0.3）にして、影で分離する構成に揃えました。ライトモードは変更ありません。

## 10.6.3

### Patch Changes

- [#560](https://github.com/k35o/arte-odyssey/pull/560) [`0ae6124`](https://github.com/k35o/arte-odyssey/commit/0ae6124ca30d0537ccb3f912ba9563e4faa4ebf2) Thanks [@k35o](https://github.com/k35o)! - Autocomplete: 狭い幅で「すべて閉じる」ボタンが枠外にはみ出す問題を修正

  選択チップを並べる内部コンテナ（`flex w-full flex-wrap`）に `min-w-0` が無く、幅の狭いコンテナ内で縮められなかったため、隣の「すべて閉じる」ボタンが枠の外へ押し出されていました。チップ行に `min-w-0` を付与し、常に枠内へ収まるようにしました。

## 10.6.2

### Patch Changes

- [#558](https://github.com/k35o/arte-odyssey/pull/558) [`6c4ce76`](https://github.com/k35o/arte-odyssey/commit/6c4ce766c5f722447aa1e7f8a3de56b35d5ee320) Thanks [@k35o](https://github.com/k35o)! - FormControl: 狭い幅のコンテナで中身がはみ出す問題を修正

  `<fieldset>` はブラウザ標準スタイルで `min-inline-size: min-content` を持つため、サイドバーやグリッドなど幅の狭いコンテナ内で `FormControl` を使うと、中身（例: Autocomplete の選択チップ）がコンテナからはみ出していました。fieldset に `min-w-0` を付与し、コンテナ幅に合わせて縮むようにしました。

## 10.6.1

### Patch Changes

- [#556](https://github.com/k35o/arte-odyssey/pull/556) [`3772032`](https://github.com/k35o/arte-odyssey/commit/377203297bee9eaf8bd51a81773eeeaf34a6c4e1) Thanks [@k35o](https://github.com/k35o)! - Alert に onClose(閉じるボタン) を追加

  `onClose` を渡すと、枠内の右端に閉じる(×)ボタンを表示します。メッセージ部は `flex-1` で × の分だけ縮むため、長文でも × に被りません。閉じるボタンのアクセシブルラベルは `closeLabel`（省略時 `'閉じる'`）で変更できます。`action`(本文末尾のリンク)とも併用可能です。

## 10.6.0

### Minor Changes

- [#554](https://github.com/k35o/arte-odyssey/pull/554) [`fca8989`](https://github.com/k35o/arte-odyssey/commit/fca898946fcb575ff488aae7b5091704112fa055) Thanks [@k35o](https://github.com/k35o)! - Alert に `action`（テキストリンク）を追加しました。

  - `action?: { label: string; renderItem: ({ children }) => ReactNode }` を追加。`message` の直後にインラインでリンク／アクションを描画します（`string` の場合は本文と同じ行に続けて表示）。
  - 遷移リンク（`<a>` / `Anchor` / Next.js `Link`）にも、モーダルを開く等のアクション（`<button onClick>`）にも対応。要素とその見た目は `renderItem` で利用側が決めます（Alert は本文末尾へのインライン配置のみ担保）。`Button` / `IconButton` と同じパターンですが、スタイルは強制しません。リンクの見た目を揃えたい場合は `Anchor` を返してください。

## 10.5.0

### Minor Changes

- [#553](https://github.com/k35o/arte-odyssey/pull/553) [`d857485`](https://github.com/k35o/arte-odyssey/commit/d8574852bee32739b316dc6af6b50639ac66d959) Thanks [@k35o](https://github.com/k35o)! - `CodeXmlIcon`（`</>` 形のコードアイコン）を追加しました。lucide-react の `code-xml` を `BaseIcon` でラップした、他アイコンと同じ `size` API のアイコンです。

### Patch Changes

- [#551](https://github.com/k35o/arte-odyssey/pull/551) [`469e2c6`](https://github.com/k35o/arte-odyssey/commit/469e2c6ba8c187184d30f3ec903a3911181c0e07) Thanks [@k35o](https://github.com/k35o)! - fix: Tooltip / DropdownMenu / ListBox の背景に UA 既定の白い矩形が出る不具合を修正

  Popover API 化で content ラッパーが `[popover]` 要素になり、UA 既定の
  `background-color: Canvas`（OS のカラースキームに追従し、アプリの `.dark` と一致しない）/
  `border: solid` / `padding: 0.25em` が残っていた。内側の角丸ボックスの背後に白い枠付きの
  矩形が透けて見えていたため、位置決め用ラッパーの背景・枠・余白を打ち消して透明にした。
  見た目（背景・余白・角丸）は内側の renderItem 側が持つため影響はない。

## 10.4.0

### Minor Changes

- [#549](https://github.com/k35o/arte-odyssey/pull/549) [`132831d`](https://github.com/k35o/arte-odyssey/commit/132831df380e19dbb4ebac82e47c9c92522533a8) Thanks [@k35o](https://github.com/k35o)! - UI 用のアイコンを追加した。

  - `ForkIcon`（フォーク / lucide GitFork）
  - `FullscreenIcon`（全画面 / lucide Maximize）
  - `LockIcon`（非公開 / lucide Lock）, `LockOpenIcon`（公開 / lucide LockOpen）

## 10.3.0

### Minor Changes

- [#538](https://github.com/k35o/arte-odyssey/pull/538) [`756d6e2`](https://github.com/k35o/arte-odyssey/commit/756d6e2f8d218250a4b1adb0d07602abd36fb178) Thanks [@k35o](https://github.com/k35o)! - オーバーレイ系コンポーネント（Popover / Tooltip / DropdownMenu / ListBox / Autocomplete）の位置決め・操作レイヤを Web 標準へ移行し、`@floating-ui/react` 依存を撤去しました。

  - **位置決め**: CSS Anchor Positioning（`anchor()` / `position-area` / `position-try-fallbacks` / `anchor-size()`）。スクロール追従や端での反転（flip）もネイティブで動作
  - **トップレイヤー / dismiss**: Popover API（`popover` 属性 + top layer）
  - **フォーカス管理 / リストのキーボード操作**: 自前フック（`useFocusTrap` / roving-tabindex）。縦書きでは矢印キーが書字方向に追従

  公開 API（各コンポーネントの props）は変更ありません。

  > **必要ブラウザ**: CSS Anchor Positioning と Popover API に対応した環境（目安: Chrome 125+ / Safari 26+ / Firefox 147+）。フォールバックは持たないため、これより古いブラウザでは位置決めが正しく動作しません。

### Patch Changes

- [#547](https://github.com/k35o/arte-odyssey/pull/547) [`e1d379a`](https://github.com/k35o/arte-odyssey/commit/e1d379aec5497d79f31e6431efb877331f85b61b) Thanks [@k35o](https://github.com/k35o)! - アイコンを lucide-react のバレル（巨大な再エクスポート）ではなく個別ファイルから import するようにした。バレル import は Vite dev サーバの事前バンドルで named export が undefined 化し、consumer 側でアイコンが描画時に落ちることがあったため、それを回避する（本番ビルドでは元から問題なし）。

## 10.2.0

### Minor Changes

- [#536](https://github.com/k35o/arte-odyssey/pull/536) [`e44d3d3`](https://github.com/k35o/arte-odyssey/commit/e44d3d37e1db0970fd122406cce3dce5054a75e2) Thanks [@k35o](https://github.com/k35o)! - Add SquircleIcon, FlaskIcon, and PackageIcon to the icon set

## 10.1.2

### Patch Changes

- [#533](https://github.com/k35o/arte-odyssey/pull/533) [`06d7e87`](https://github.com/k35o/arte-odyssey/commit/06d7e8738fc1cde9fee4ab962ce9c83d05f011b3) Thanks [@k35o](https://github.com/k35o)! - fix: Slider のスパンが 1 未満のとき塗りがつまみとズレる不具合を修正

  `range = Math.max(max - min, 1)` が、0 除算回避のつもりでスパンが 1 未満
  （例: OKLCH の C チャンネル 0〜0.4）のときに range を 1 に丸めていた。その結果、
  塗り(fill)は `value × 100%`、ネイティブのつまみは `value ÷ span × 100%` となり、
  両者が一致しなかった。`max === min`（スパン 0）のときだけ 1 にフォールバックする
  よう修正し、小数レンジでも塗りとつまみが一致するようにした。

## 10.1.1

### Patch Changes

- [#524](https://github.com/k35o/arte-odyssey/pull/524) [`86cc591`](https://github.com/k35o/arte-odyssey/commit/86cc591204f9dc9a28d9c114eb828499cc8da846) Thanks [@k35o](https://github.com/k35o)! - dark モードの背景トークンを単調な「トーンの梯子」に再構成し、borderless な elevation 表現を成立させた。

  | token        | before                         | after               |
  | ------------ | ------------------------------ | ------------------- |
  | `bg-surface` | `gray-900` (L=0.25)            | `gray-950` (L=0.18) |
  | `bg-subtle`  | `gray-800`（`bg-base` と同値） | `gray-900` (L=0.25) |

  - `bg-surface`（ページのキャンバス）を一段暗くし、`bg-base` のカードが border なしで浮く輝度差（ΔL 0.05→0.12）を確保した。Material 3 のトーンベース elevation と同じ原理。コンテンツが載る `bg-base` / `bg-raised` は dim トーンのまま変えない。
  - dark の `bg-subtle` が `bg-base` と同値で、凹み（井戸・read-only・subtle hover）の表現が全て潰れていた欠陥を修正した。light の構造（base=white / subtle=gray-100）の鏡像になる。

  これにより dark の背景階層は `surface (950) < subtle (900) < base (800) < raised (700)` の単調な梯子になる。

- [#524](https://github.com/k35o/arte-odyssey/pull/524) [`6f29f9d`](https://github.com/k35o/arte-odyssey/commit/6f29f9d7ebb1979159ec80540e4f90c57cd4b678) Thanks [@k35o](https://github.com/k35o)! - InteractiveCard を Card の `interactive` prop に統合し、dark モード時の Card のデフォルト border を撤去した。

  ## InteractiveCard → `<Card interactive>`

  InteractiveCard と Card の差分はホバー・アクティブ時のスケール変化（`hover:scale-[1.02]`, `active:scale-[0.98]`）のみだったため、`Table.Row` / `Badge` と同じ `interactive?: boolean` prop 方式に統合し、InteractiveCard を削除した。

  ```diff
  - <InteractiveCard>
  + <Card interactive>
      ...
  - </InteractiveCard>
  + </Card>
  ```

  json-render / OpenUI の生成カタログからも `InteractiveCard` を削除した（`Card` の `interactive` prop で同じ表現が可能）。

  ## dark モードの Card border 撤去

  dark の背景トークンの再構成（別 changeset: bg-surface=gray-950 / bg-base=gray-800）でカードと背景の輝度差だけで境界が成立するため、`appearance="shadow"` に付けていた dark 専用の `border-border-subtle` と、レイアウト維持用の transparent border を撤去した。`bg-base` と同色の背景に置く場合は `appearance="bordered"` を使うか、`bg-subtle` の井戸の上に置く。

## 10.1.0

### Minor Changes

- [#522](https://github.com/k35o/arte-odyssey/pull/522) [`7568886`](https://github.com/k35o/arte-odyssey/commit/7568886b40e6d67c0cbcabb964a42473da5e1172) Thanks [@k35o](https://github.com/k35o)! - feat(json-render): Stack に `padding` prop、Card / InteractiveCard に `size`(sm/md/lg) を追加

  生成 UI 統合には内側 padding を表現する手段が無く（gap のみ・className エスケープも排除）、
  生成された Card / InteractiveCard が余白ゼロで描画されていた。

  - `Stack` に `padding`（none〜xl）prop を追加（openui 統合とも共有）。
  - Card / InteractiveCard に `size`（sm/md/lg、デフォルト md）を追加し、内側 padding を
    サイズで決める（16/24/32px）。shadcn/Chakra/Fluent/Radix の size→padding 慣習に倣う。
  - Tailwind の `@source` に `../integrations` を追加。生成 UI の renderer が出すユーティリティ
    クラス（カードの padding 等）が、利用側で未スキャン → 未生成になる問題を修正。

## 10.0.1

### Patch Changes

- [#520](https://github.com/k35o/arte-odyssey/pull/520) [`4acf16f`](https://github.com/k35o/arte-odyssey/commit/4acf16f30e63f80a3a0bc46d38e48ce225613646) Thanks [@k35o](https://github.com/k35o)! - `InteractiveCard` の `appearance="shadow"`（デフォルト）に、`Card` と同じ dark モード用 subtle border を追加した。

  dim-dark-mode の対応で `Card` には dark モード時に `border-border-subtle` の薄いボーダーを出す調整を入れたが、同じ `shadow-sm` を使う `InteractiveCard` は対象から漏れていた。そのため dark モードでは `InteractiveCard` だけ shadow がほぼ視認できず、カードが浮かない不整合が生じていた。

  `Card` と同様に常時 `border border-transparent` を出して light モードのレイアウトを維持しつつ、dark モードのみ `border-border-subtle` を可視化する。light モードの見た目は変わらない。

## 10.0.0

### Major Changes

- [#499](https://github.com/k35o/arte-odyssey/pull/499) [`8b5f9f2`](https://github.com/k35o/arte-odyssey/commit/8b5f9f28e065bada9238058decc31310789ba71a) Thanks [@k35o](https://github.com/k35o)! - Design tokens are now derived from `src/styles/index.css` — the single source of truth — via [`tailwind-token-extractor`](https://www.npmjs.com/package/tailwind-token-extractor), instead of being hand-maintained in `tokens.ts` and generating the CSS from it.

  **BREAKING**: `@k8o/arte-odyssey/tokens` now exposes the fully-resolved extractor output — `tokens` (`{ theme, vars }`), `meta`, and the derived key-union types — instead of the curated `PALETTE` / `FG_TOKENS` / `TEXT_SIZES` / `RADII` / … arrays. The values are complete (including surviving Tailwind defaults) and always in sync with the CSS. Presentation-only metadata (palette hue/description, semantic ShadeRef tables, the spacing display scale) now lives in the docs app.

  `scripts/generate-css.ts` (`pnpm generate:css`) is retired; run `pnpm generate:tokens` after editing `index.css`, and `pnpm check:tokens` guards against drift in CI.

- [#497](https://github.com/k35o/arte-odyssey/pull/497) [`b4bed72`](https://github.com/k35o/arte-odyssey/commit/b4bed720dc2b527385c956a2b1e09af4aabe8549) Thanks [@k35o](https://github.com/k35o)! - Generative UI 統合（json-render / OpenUI）の公式アダプタを追加した。LLM が ArteOdyssey のコンポーネントで UI を生成できるよう、props を Zod + デザイントークンの enum に制約したカタログ/ライブラリを同梱する。

  ## 追加した subpath export

  | export                                   | 種別           | 内容                               |
  | ---------------------------------------- | -------------- | ---------------------------------- |
  | `@k8o/arte-odyssey/json-render`          | サーバー安全   | `catalog`（スキーマ + `prompt()`） |
  | `@k8o/arte-odyssey/json-render/registry` | `'use client'` | `registry`（描画）                 |
  | `@k8o/arte-odyssey/openui`               | `'use client'` | `library`（描画）                  |

  依存（json-render / OpenUI / zod）は **optional peerDependencies** なので、統合を使う利用者だけが追加すればよい。

  ## 特徴

  - **RSC 対応**: json-render はカタログ（スキーマ/プロンプト）と registry（描画）を分離し、catalog をサーバーコンポーネントから `catalog.prompt()` で利用できる。Next.js App Router で検証済み。
  - **render props の橋渡し**: `Button` の `renderItem` などの関数 prop はアダプタ内部で組み立て、JSON/DSL には平たい値（`href` 等）だけを見せる。コンポーネント側は無改造。
  - **トークン制約**: `gap` / `color` / `variant` などを enum で制約し、生成 UI がデザインシステムから外れないようにする。
  - **対応コンポーネント（全 47 種）**: Stack, Card, InteractiveCard, Form, Modal, Dialog, Drawer, Popover, Tooltip, DropdownMenu, Toast, Button, IconButton, Badge, Heading, Anchor, Avatar, Code, Icon, Alert, Spinner, Progress, Skeleton, Separator, ScrollLinked, BaselineStatus, Tabs, Accordion, Breadcrumb, Table, TextField, Textarea, PasswordInput, NumberField, Slider, Checkbox, Switch, Select, Radio, RadioCard, CheckboxCard, Pagination, ListBox, CheckboxGroup, Autocomplete, FileField, FormControl。フォーム系は各フレームワークの状態機構（json-render: `useBoundProp` / OpenUI: `useStateField`）に接続。Tabs / Accordion / Table / Breadcrumb はデータ駆動。
  - **オーバーレイの扱い**: Modal/Dialog/Drawer/Popover/Tooltip/DropdownMenu/Toast は「トリガーボタン＋コンテンツ」の **自己完結ウィジェット** として実装。`triggerLabel` を指定するだけで開閉ボタンが組み込まれ、children がサーフェス内に描画される。命令的な開閉制御を生成 UI から扱える形にした。

  詳細は README の「Generative UI integrations」を参照。

- [#516](https://github.com/k35o/arte-odyssey/pull/516) [`69bdbed`](https://github.com/k35o/arte-odyssey/commit/69bdbedc1128477d3f3adaca7c03868207f29369) Thanks [@k35o](https://github.com/k35o)! - 依存・設定の前提を更新（v10 の締め）。

  **BREAKING**: `peerDependencies.typescript` を `>=5.9.0` → `>=6.0.0` に引き上げ。型定義は TypeScript 6 系を前提とする。

  - `peerDependencies.zod`（optional）を `>=4.0.0` → `>=4.4.0` に引き上げ（内部利用 API に合わせて SoT を統一）。
  - ルート `tsconfig.json` に `forceConsistentCasingInFileNames: true` を追加（非破壊）。
  - `engines.node` は `>=24.13.0` を維持。

- [#517](https://github.com/k35o/arte-odyssey/pull/517) [`5b98483`](https://github.com/k35o/arte-odyssey/commit/5b98483130f5ac025c7914f7fe4d071778420108) Thanks [@k35o](https://github.com/k35o)! - フォームコンポーネントの `onChange` を値型シグネチャに統一。イベント型と値型の混在、`ListBox` の `onSelect` 別名を解消した。第 1 引数を「その要素の意味的な値」とし、実 `<input>` を持つコンポーネントは第 2 引数で本物の DOM イベントも渡す。

  **BREAKING**:

  - `Checkbox` / `Switch`: `ChangeEventHandler<HTMLInputElement>` → `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void`
  - `Radio`: `ChangeEventHandler<HTMLInputElement>` → `(value: string, event: ChangeEvent<HTMLInputElement>) => void`
  - `RadioCard`: `ChangeEventHandler<HTMLInputElement>` → `(value: string) => void`（`<button>` 駆動で change イベントが存在しないため値のみ）
  - `FileField`: `ChangeEventHandler<HTMLInputElement>` → `(files: FileList | null, event?: ChangeEvent<HTMLInputElement>) => void`（プログラム的なファイル削除時は `event` が `undefined`）
  - `ListBox.Root`: `onSelect` を `onChange: (key: string) => void` にリネーム

  `Slider` / `NumberField` / `Autocomplete` / `CheckboxCard` / `CheckboxGroup` / `Tabs` は既に値型のため変更なし。`TextField` / `Textarea` / `Select` / `PasswordInput` はネイティブ `<input>` 互換のため従来どおりイベント型 `onChange` を維持する。

  > 値だけ使う場合は第 1 引数のみ受け取れば良い（`(value) => void` は `(value, event) => void` に代入可能）。`preventDefault` や `currentTarget` 等が必要なときは第 2 引数の本物の DOM イベントを使う。

  ```tsx
  // v9
  <Checkbox onChange={(e) => setChecked(e.target.checked)} />
  // v10（値だけ / イベントも）
  <Checkbox onChange={(checked) => setChecked(checked)} />
  <Checkbox onChange={(checked, event) => { event.stopPropagation(); setChecked(checked); }} />

  // v9
  <ListBox.Root onSelect={(key) => setKey(key)} options={options} value={value}>
  // v10
  <ListBox.Root onChange={(key) => setKey(key)} options={options} value={value}>
  ```

- [#519](https://github.com/k35o/arte-odyssey/pull/519) [`1281372`](https://github.com/k35o/arte-odyssey/commit/1281372e0315e3d39305e9d161076249e11effec) Thanks [@k35o](https://github.com/k35o)! - オーバーレイ／開閉系コンポーネントの controllable パターンを統一（`Modal` / `Tabs` に `Drawer` / `Accordion.Item` を揃える）。

  **BREAKING**:

  - `Drawer`: `isOpen`（必須）+ `onClose`（必須）の full controlled から、`isOpen?` + `defaultOpen?` + `onClose?` の controllable に変更。`isOpen` を渡さなければ `defaultOpen` による uncontrolled 動作になる。閉じるボタンは内部で `<dialog>.close()` を呼ぶため、controlled / uncontrolled の双方で動作する。

  ```tsx
  // v9: isOpen が必須（uncontrolled 不可）
  <Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>

  // v10: uncontrolled も可。controlled は従来どおり動作
  <Drawer defaultOpen title="...">...</Drawer>
  <Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>
  ```

  **追加（非破壊）**:

  - `Accordion.Item` を controllable 化。従来の `defaultOpen?`（uncontrolled）に加え、`isOpen?` + `onChange?: (isOpen: boolean) => void` で制御可能になった。

  開閉状態の命名は「真偽の状態 = `isOpen` / 初期値 = `defaultOpen`」で全オーバーレイ横断に統一（`packages/arte-odyssey/CLAUDE.md` の命名規約に準拠）。

- [#518](https://github.com/k35o/arte-odyssey/pull/518) [`43e26dc`](https://github.com/k35o/arte-odyssey/commit/43e26dcb8172683c254fdad7412e766e549411f8) Thanks [@k35o](https://github.com/k35o)! - `variant` / `size` / 色系 prop の語彙をコンポーネント横断で統一。

  **BREAKING**:

  - `Button` の `variant` を `'contained' | 'outlined' | 'skeleton'` → `'solid' | 'outline' | 'skeleton'` にリネーム（`Badge` の `solid` / `outline` に合わせる）。`DropdownMenu.Trigger` も連動。
  - `IconButton` の色軸 prop を `bg` → `color` にリネーム（`Button` の `color` と prop 名を統一）。値は `'transparent' | 'base' | 'primary' | 'secondary'` のまま（背景の塗り方を表す）。
  - `Alert` / `Toast` の `status` prop を `tone` にリネーム（`Badge` の `tone` に合わせて semantic status 色の prop 名を統一）。`useToast().onOpen(tone, message)` は位置引数のため呼び出し側は無変更。

  **追加（非破壊）**:

  - `Badge` に `size="lg"` を追加（`sm | md | lg` の標準スケールに揃える）。

  ```tsx
  // v9 → v10
  <Button variant="contained" /> → <Button variant="solid" />
  <Button variant="outlined" /> → <Button variant="outline" />
  <IconButton bg="base" label="..." /> → <IconButton color="base" label="..." />
  <Alert status="success" message="..." /> → <Alert tone="success" message="..." />
  ```

  > `AlertIcon` の `status`（表示するアイコンの種類を選ぶ軸）、`Button.color`（`primary | secondary | gray` のアクセント色）、`Separator.color` / `Table.tone`（装飾系）は意味が異なるため対象外。

### Minor Changes

- [#493](https://github.com/k35o/arte-odyssey/pull/493) [`78fd050`](https://github.com/k35o/arte-odyssey/commit/78fd050bcebef5214aaeb541b5d34d4f36845d07) Thanks [@k35o](https://github.com/k35o)! - dark モードを「Dim 寄り」に調整し、Card に dark 専用の subtle border を追加した。

  ## dark モードの色味調整

  `tokens.ts` の semantic token (dark) を 1 段ずつ明るくシフトし、純黒に寄り過ぎていた dark モードを「長時間 UI を見ても疲れにくい Dim 寄り」のトーンに変更した。light モードや palette ファミリーには影響しない。

  | token        | before              | after               |
  | ------------ | ------------------- | ------------------- |
  | `bg-surface` | `gray-950` (L=0.18) | `gray-900` (L=0.25) |
  | `bg-base`    | `gray-900` (L=0.25) | `gray-800` (L=0.30) |
  | `bg-raised`  | `gray-800` (L=0.30) | `gray-700` (L=0.42) |

  ## Card に dark mode 用 subtle border

  `appearance="shadow"` (デフォルト) の Card は `shadow-sm` で elevation を表現していたが、これは dark mode 下ではほぼ視認できない。dark mode のみ `border-border-subtle` の薄いボーダーを出すよう調整し、Dim 寄りで L 差が縮まったカードも自然に浮かぶようにした。

  light mode の見た目に影響しないよう、常時 `border border-transparent` を出してレイアウトずれが起きないようにしてある。

- [#509](https://github.com/k35o/arte-odyssey/pull/509) [`fa0baec`](https://github.com/k35o/arte-odyssey/commit/fa0baeca5a03cb4f96b144fe88a925db6342ccaf) Thanks [@k35o](https://github.com/k35o)! - `Tabs.Root` now accepts a controlled `selectedId` / `onChange` pair (via `useControllableState`), matching the form components' controlled pattern. The `DebouncedAction` callback type is now exported from the package root, and the `json-render` `Pagination` schema gains a bindable `defaultPage` so its `$bindState` contract works.

  Accessibility: interactive elements that used `focus-visible:outline-none` now use `outline-hidden`, preserving the focus affordance under forced-colors / high-contrast mode. `CheckboxGroup`'s `required` prop is now reflected as `aria-required`.

  Internally, the generative-UI integration schemas are deduplicated and gain a compile-time guard that fails the build when a component prop enum widens without the integration following, the json-render registry bindings are consolidated, and shared focus-ring / gap styles are centralized.

### Patch Changes

- [#511](https://github.com/k35o/arte-odyssey/pull/511) [`c3740e2`](https://github.com/k35o/arte-odyssey/commit/c3740e29095dc3daf7e1665b26d9bc87bdb8283b) Thanks [@renovate](https://github.com/apps/renovate)! - Accessibility: `Autocomplete` now exposes its dropdown as a proper `listbox` with `option` items (`aria-selected` reflects each selection), and `CheckboxCard` associates every control with its visible label via `aria-labelledby`. `Anchor`'s default `renderAnchor` is now a stable module-level reference so it is not re-created on each render.

- [#490](https://github.com/k35o/arte-odyssey/pull/490) [`c15b1a2`](https://github.com/k35o/arte-odyssey/commit/c15b1a223f1046ae4552054edc4bbeb015d49bd1) Thanks [@k35o](https://github.com/k35o)! - npm パッケージに同梱されるドキュメントを実装に追従させた。

  `packages/arte-odyssey/docs/GUIDE.md` および `references/components.md` から、すでに削除済みの `LinkButton` / `IconLink` の記述を除去し、代わりに `Button` / `IconButton` の `renderItem` prop でリンク化するパターンを記載した。`references/hooks.md` には `useWritingMode` の説明を追加した。

  `README.md` のコンポーネント一覧・カスタムフック一覧も、実際の export と一致するよう全面的に書き直した（`Pagination` / `Switch` / `CheckboxGroup` / `PasswordInput` / `Badge` / `Spinner` / `Skeleton` / `Table` / `Avatar` / `Heading` / `PortalRootProvider` などを追加、`useBreakpoint` / `useControllableState` / `useDebouncedTransition` / `useDeferredDebounce` / `useDisclosure` / `useHover` / `useIntersectionObserver` / `useInView` / `useScrollLock` / `useSessionStorage` / `useWritingMode` を追加）。

  実装変更は含まないが、AI コーディングアシスタント向けのガイドが npm パッケージに同梱されているため patch として扱う。

## 9.1.0

### Minor Changes

- [#476](https://github.com/k35o/arte-odyssey/pull/476) [`b470d1e`](https://github.com/k35o/arte-odyssey/commit/b470d1e1e45f4b969dc567163e87f41e398a287b) Thanks [@k35o](https://github.com/k35o)! - オーバーレイ系コンポーネントの重なり順を司る z-index デザイントークンを追加した。これまで `Toast` が `z-50` を直接指定していたほかは z-index の管理が無く、複数のオーバーレイを混在させた際の重なり順が暗黙的だった。

  3 層スケールで整理した:

  - `z-overlay` (1000) — `Popover` / `DropdownMenu` / `ListBox` / `Tooltip` (trigger に紐付く浮遊 UI)
  - `z-modal` (1300) — `Modal` / `Drawer` (`<dialog>` top-layer により実質はネイティブ制御だが、stacking context を持つ非ネイティブ実装に切り替えても破綻しないよう明示)
  - `z-toast` (1500) — `Toast` (モーダルや浮遊 UI より上に必ず表示される)

  公開 API:

  - `@k8o/arte-odyssey/tokens` から `Z_INDICES` を export
  - スタイルシートに CSS 変数 `--z-overlay` / `--z-modal` / `--z-toast` と Tailwind ユーティリティ `z-overlay` / `z-modal` / `z-toast` を追加

- [#479](https://github.com/k35o/arte-odyssey/pull/479) [`c78669f`](https://github.com/k35o/arte-odyssey/commit/c78669fc974f0938766ab3bf1fc086bb53b4ffb5) Thanks [@k35o](https://github.com/k35o)! - 縦書き (vertical writing mode) を新しい特徴として追加。Tailwind の論理プロパティと組み合わせて、ライブラリ全体のコンポーネントが縦書き紙面でも自然に表示できるようにした。

  ## Tailwind utility と variant

  - `@utility writing-h` — 横書き (`writing-mode: horizontal-tb`) に戻す
  - `@utility writing-v` — 縦書き (`writing-mode: vertical-rl`) を適用し、`text-orientation`・`text-underline-position`・`line-break`・`word-break` の推奨初期値も設定する
  - `@utility writing-sideways-rl` — 表組みなどブロック単位で 90° 横倒しにする
  - `@custom-variant vertical` — `.writing-v` 子孫で活性化し、`.writing-h` 子孫では無効化する variant。横書きデフォルトに対する上書きを宣言的に書ける

  ```tsx
  <div className="writing-v">
    <p className="my-4 vertical:my-0" />
  </div>
  ```

  ## コンポーネントの縦書き対応

  - **Accordion**: chevron を 90° 回転、item を block-axis に伸ばし、区切り線を border-left に切り替え
  - **Code**: 縦書きでは inline 表示に変えてカラースウォッチ周りの不自然な改行を解消
  - **Table**: `sideways-rl` で 90° 横倒しの島として描画。行/caption の区切り線も論理に
  - **Progress**: 論理サイズで両モード対応 (縦書きでは縦長 bar)
  - **Separator**: `orientation` を論理向きの意味に変更し、寸法も `block-*` / `inline-*` で書き直し。`Horizontal` story を `Block`, `Vertical` story を `Inline` にリネーム
  - **Breadcrumb / Pagination**: 進行方向の chevron を 90° 回転
  - **Tabs**: 選択 indicator と List separator を block-end に配置 (横書きで下、縦書きで左)
  - **Modal (center)**: 寸法を論理プロパティに置き換え、両モードで自然なアスペクト比
  - **Drawer**: header+content の縦並びを両モードで維持
  - **Popover** (および ListBox / DropdownMenu): portaled content に trigger の writing-mode を伝搬し、縦書き内でも variant が効く
  - **Form 系** (TextField / Textarea / NumberField / PasswordInput / Select / Slider / Switch / Autocomplete / CheckboxCard / RadioCard): `inline-size` / `block-size` を中心にした論理サイズへ移行
  - **Button**: `fullWidth` が縦書きでは content fit になるよう調整
  - **RadioCard**: writing-mode を実行時に取得して、`vertical-rl` のとき左右キーの forward/backward を反転
  - **Tabs**: `aria-orientation` を writing-mode から導出し、縦書きでは上下キー、横書きでは左右キーでタブ移動

  ## Hook

  - `useWritingMode(ref)` を追加。要素の `writing-mode` を `'horizontal' | 'vertical'` で返し、`ResizeObserver` で writing-mode 切替も追従する。`useEffect` / `useLayoutEffect` を呼び出し側から消すためのプリミティブ。

  ## Storybook

  - toolbar に「横書き / 縦書き」トグルを追加し、全 story を両モードで確認可能に

### Patch Changes

- [#477](https://github.com/k35o/arte-odyssey/pull/477) [`943d9e5`](https://github.com/k35o/arte-odyssey/commit/943d9e5bc58325b6b9d54b9495d95d99eb63e5d4) Thanks [@k35o](https://github.com/k35o)! - 全コンポーネントで `className` と `style` プロップを受け取れないようにした。

  スタイルはコンポーネント内部の実装に閉じ、外部からのオーバーライド経路を廃止する。Tailwind の utility class を渡してデザインを上書きする使い方ができなくなるため、利用側の影響範囲は大きい。

  対象コンポーネント:

  - Buttons: `Button`, `IconButton`
  - Data Display: `Card`, `InteractiveCard`, `Badge`, `Avatar`, `Heading`, `Code`, `Table.*`
  - Feedback: `Alert`, `Progress`, `Skeleton`, `Spinner`
  - Form: `Form`, `TextField`, `Textarea`, `Select`, `PasswordInput`, `Checkbox`, `Radio`, `Switch`, `NumberField`, `Slider`, `Autocomplete`, `FileField`, `CheckboxCard`, `RadioCard`, `CheckboxGroup`
  - Layout: `Separator`
  - Navigation: `Anchor`

  `Table.Root` の `className` / `containerClassName` プロップも併せて削除した。

- [#476](https://github.com/k35o/arte-odyssey/pull/476) [`59c9ea3`](https://github.com/k35o/arte-odyssey/commit/59c9ea3095d859f1739cf480781da1fcb475ee01) Thanks [@k35o](https://github.com/k35o)! - `Modal` 内で `Popover` / `DropdownMenu` / `ListBox` / `Tooltip` を使うと、それらの `FloatingPortal` が `document.body` 直下に portal されるため `<dialog>` の top-layer に隠れて見えない問題を修正した。

  `Modal` が children を `PortalRootProvider` で自動ラップし、dialog 要素を portal root として配信するようにした。これにより `Modal` 内の Popover 系コンポーネントは何も書かずとも dialog の top-layer に乗って表示される。

  これまで動作させるには手動で `<PortalRootProvider value={dialogRef}>` を書く必要があったが、その workaround は不要になる(残してあっても上書きされるだけで害はない)。

## 9.0.0

### Major Changes

- [#467](https://github.com/k35o/arte-odyssey/pull/467) [`a20d9f3`](https://github.com/k35o/arte-odyssey/commit/a20d9f337c46c57890da9c6ea66c67202f516b47) Thanks [@k35o](https://github.com/k35o)! - 公開している Helpers を整理し、UI ライブラリとして必要な 5 つに絞った。

  新しい公開 Helpers:

  - `cn` (既存) — clsx + tailwind-merge ラッパー
  - `mergeRefs` (新規公開) — 複数の ref を 1 つの要素に結合する
  - `mergeProps` (新規) — className/style/イベントハンドラを適切にマージしながら複数の props を合成する
  - `chain` (新規) — 複数の関数を順番に呼び出す関数を作る
  - `createSafeContext` (新規) — Provider 外でアクセスされた場合に明確に throw する Context を作成する

  廃止または非公開化した Helpers:

  - `between` → 内部実装 (`src/internal/clamp.ts`) として `clamp` にリネーム
  - `findAllColors` → Code コンポーネント内部に colocate
  - `isInternalRoute` → Anchor 内にインライン化
  - `cast` → NumberField コンポーネント内部に colocate
  - `toPrecision` → 内部実装 (`src/internal/`) に移動
  - `uuidV4` → `crypto.randomUUID()` 直接利用に置換、削除
  - `commalize` → 利用箇所がないため削除

  これらを `@k8o/arte-odyssey` から直接 import している場合は、自プロジェクトに移すか標準 API・他ライブラリへ置き換える必要がある。

### Patch Changes

- [#472](https://github.com/k35o/arte-odyssey/pull/472) [`7812f1c`](https://github.com/k35o/arte-odyssey/commit/7812f1c8f3961c84b45a301b8295326cab32dbe7) Thanks [@k35o](https://github.com/k35o)! - `useControllableState` フックを内部のフォーム系コンポーネントで dogfood 適用した。各コンポーネントが手書きで持っていた `isControlled = value !== undefined` + `useState` + 条件分岐 + `onChange` 呼び出しの定型コードを削減した。

  対象: `Switch` / `Checkbox` / `Radio` / `RadioCard` / `CheckboxCard` / `NumberField`

- [#471](https://github.com/k35o/arte-odyssey/pull/471) [`7bb19eb`](https://github.com/k35o/arte-odyssey/commit/7bb19eb2fc2ef9579f3d334d29eb30541553c86e) Thanks [@k35o](https://github.com/k35o)! - `createSafeContext` ヘルパーを内部の Compound コンポーネントで dogfood 適用した。`createContext` + `use` + null チェックの定型コードを削減し、Provider 外で利用された際のエラーメッセージを統一した。

  対象: `FileField` / `Dialog` / `DropdownMenu` / `ListBox` / `Popover` / `Tabs` / `Toast` / `Accordion`

- [#473](https://github.com/k35o/arte-odyssey/pull/473) [`6761d92`](https://github.com/k35o/arte-odyssey/commit/6761d92bcf9d6fbc7c76d92cab1d0eaece2dd69d) Thanks [@k35o](https://github.com/k35o)! - `useDisclosure` フックを `Autocomplete` で適用した。`useState(false)` + `setOpen(true)`/`setOpen(false)` の手動 open/close 管理を `useDisclosure` の `isOpen`/`open`/`close` に置き換えた。

  `chain` ヘルパーを `IconButton` の Tooltip トリガープロップ統合で適用した。`(e) => { triggerProps.onFoo(e); userOnFoo?.(e); }` の手動チェイニングを `chain(triggerProps.onFoo, userOnFoo)` で簡潔にした。

- [#470](https://github.com/k35o/arte-odyssey/pull/470) [`0777043`](https://github.com/k35o/arte-odyssey/commit/07770431211d79df8661b3e4b85037e0045ad6c8) Thanks [@k35o](https://github.com/k35o)! - `Tooltip` をホバー非対応デバイス (タッチデバイス) では表示しないようにした。`(hover: hover)` のメディアクエリを `useSyncExternalStore` で監視し、ホバーが効かないデバイスではマウス起因の開閉ロジックをスキップする。フォーカス起因の開閉は引き続き動作するため、キーボード操作やスクリーンリーダーには影響しない。

  `IconButton` など `Tooltip` を内部利用するコンポーネントでも同じ挙動になる。

## 8.0.3

### Patch Changes

- [#463](https://github.com/k35o/arte-odyssey/pull/463) [`adda8df`](https://github.com/k35o/arte-odyssey/commit/adda8dfec1cd27f0c06497209615cb41b849ddb3) Thanks [@k35o](https://github.com/k35o)! - `IconButton` の `tooltipPlacement` のデフォルト値を `'bottom'` から `'top'` に変更した。

  ツールチップがボタンの上に表示されることで、下部のコンテンツが隠れにくくなる。`tooltipPlacement` を明示的に指定しているコードに影響はない。

- [#460](https://github.com/k35o/arte-odyssey/pull/460) [`66852a1`](https://github.com/k35o/arte-odyssey/commit/66852a13a3cc7d1dfe763402f30ede890848f646) Thanks [@k35o](https://github.com/k35o)! - リポジトリ名を `k35o/ArteOdyssey` から `k35o/arte-odyssey` に変更したことに伴い、パッケージメタデータを追従させた。

  - `packages/arte-odyssey/package.json` の `bugs.url` と `repository.url` を新リポジトリ URL に更新
  - `.changeset/config.json` の `repo` を更新（今後の CHANGELOG 生成リンクが新 URL になる）
  - ルート `package.json` の `repository.url` を更新

  GitHub のリダイレクトで旧 URL は当面動くが、npm 上の "Bug Reports" / "Repository" リンクを新 URL に正すため publish に反映する。公開 API・実装の変更はない。

## 8.0.2

### Patch Changes

- [#457](https://github.com/k35o/ArteOdyssey/pull/457) [`aeb24be`](https://github.com/k35o/ArteOdyssey/commit/aeb24be5dbd01d85d2d69a9e6559d08610191161) Thanks [@k35o](https://github.com/k35o)! - Release pipeline を pnpm v11 ネイティブ publish に移行し、CI を供給網的に固めた。

  - pnpm を 10.33.2 -> 11.0.4 に更新したことで、`changeset publish` が呼ぶ `pnpm publish` が v11 のネイティブ実装に切り替わった（npm CLI への委譲が廃止）
  - `.github/workflows/release.yml` から `npm install -g npm@latest` を削除した。バージョン未固定の `@latest` を CI のたびに取得する挙動は `pnpm-workspace.yaml#minimumReleaseAge: 10080`（7 日）など他の供給網保護方針と矛盾するため
  - 残りの `npm info` / `npm profile get` 呼び出しは Node.js 24.15.0 同梱の npm 11.12.1 で動作する

  公開 API の変更はなく、library 利用者側で必要な対応はない。

## 8.0.1

### Patch Changes

- [#454](https://github.com/k35o/ArteOdyssey/pull/454) [`1859e15`](https://github.com/k35o/ArteOdyssey/commit/1859e15d4bd6d1af8e9f95294ac5770d1a7e560c) Thanks [@k35o](https://github.com/k35o)! - `BaselineStatus` を Next.js の SSG/SSR 環境で render したときに `ReferenceError: window is not defined` で build が落ちる問題を修正した。

  `baseline-status` パッケージは module top-level で `window.customElements.define(...)` を実行するため、`use(import('baseline-status'))` の Promise が server で解決されると window 未定義エラーになっていた。`loadBaselineStatus` に `typeof window === 'undefined'` ガードを入れ、server では never-resolve な Promise を返して Suspense fallback (`BaselineStatusSkeleton`) を維持するようにした。

  これにより SSG の static HTML には skeleton が出力され、client hydration 後に本物の `<baseline-status>` 要素に差し替わる。

## 8.0.0

### Major Changes

- [#447](https://github.com/k35o/ArteOdyssey/pull/447) [`a5846ac`](https://github.com/k35o/ArteOdyssey/commit/a5846ace1cf9d260e05e46f8822e9e1be8499378) Thanks [@k35o](https://github.com/k35o)! - `IconButton` と `IconLink` にホバー/フォーカス時の `Tooltip` を内蔵し、`label` を視覚的にも確認できるようにした。

  ### Breaking changes

  - **`IconLink` の `label` を必須化**（旧: optional）
  - **`IconLink` の `renderAnchor` シグネチャを変更**: 旧来の `{ href, className, target, rel, children }` に加えて `'aria-label': string` と `triggerProps: IconLinkTriggerProps`（Tooltip 連携用の `ref` / `aria-describedby` / mouse・focus handlers）を渡すようになった。カスタム `renderAnchor` を提供している場合は `triggerProps` を `<a>` にスプレッドする必要がある:

    ```tsx
    // Before
    renderAnchor={(props) => <a {...props}>{props.children}</a>}

    // After
    renderAnchor={({ triggerProps, children, ...rest }) => (
      <a {...rest} {...triggerProps}>{children}</a>
    )}
    ```

  - **`IconLink` が client component になった**（`'use client'` 追加）。Tooltip 内蔵に伴う変更で、React Server Component として render できなくなる。Tooltip 不要なら `tooltipDisabled` を指定しても client 化は避けられない点に注意。

  ### Additions

  - 別の Popover のトリガーとして使う場合（`DropdownMenu.IconTrigger` / `ListBox.IconTrigger` など）に Tooltip を抑止できる `tooltipDisabled` prop を追加
  - Tooltip の表示位置を制御する `tooltipPlacement` prop を追加（デフォルト `'bottom'`、`Tooltip.Root` のデフォルト `'bottom-start'` とは異なる）
  - ユーザーが `aria-describedby` を渡した場合、Tooltip の describedby とスペース区切りでマージされるようになった

  ### Internal fixes

  - `Popover` の `tooltip` タイプにおいて `aria-describedby` が存在しない `_content` ID を参照していたバグを `_list` に修正、加えて `isOpen` 時のみ set する形に変更

### Minor Changes

- [#450](https://github.com/k35o/ArteOdyssey/pull/450) [`c6583b4`](https://github.com/k35o/ArteOdyssey/commit/c6583b4b310ed4ee374950ce94d73f8557a2e301) Thanks [@k35o](https://github.com/k35o)! - Form 系コンポーネントのカスタム命名 (`isXxx` / `describedbyId` / `labelId`) を廃止し、HTML 標準属性名に揃えた。素直に `<input>` の HTML 属性が渡せるようになる。

  ### Renamed props

  - `isDisabled` → `disabled`（HTML 標準）
  - `isRequired` → `required`（HTML 標準）
  - `isInvalid` → `invalid`（HTML には native invalid がないため独自、`aria-invalid` を生成）
  - `describedbyId` → `aria-describedby`（HTML 標準）
  - `labelId` → `aria-labelledby`（HTML 標準）

  ### HTMLAttributes spread

  すべての form 系コンポーネントが対応する `HTMLAttributes` を extend するようになり、HTML 属性 (`name` / `autoComplete` / `inputMode` / `pattern` / `data-*` / `placeholder` etc.) がそのまま渡せる。各コンポーネントが描画する主要な要素に対応する型を選択:

  | Component                                                                                                            | extend する型                                         |
  | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
  | `TextField` / `PasswordInput` / `Checkbox` / `Switch` / `Slider` / `NumberField` / `Autocomplete` / `FileField.Root` | `InputHTMLAttributes<HTMLInputElement>`               |
  | `Textarea`                                                                                                           | `TextareaHTMLAttributes<HTMLTextAreaElement>`         |
  | `Select`                                                                                                             | `SelectHTMLAttributes<HTMLSelectElement>`             |
  | `Radio`                                                                                                              | `HTMLAttributes<HTMLDivElement>` (radiogroup wrapper) |
  | `RadioCard` / `CheckboxCard` / `CheckboxGroup`                                                                       | `FieldsetHTMLAttributes<HTMLFieldSetElement>`         |

  機能を乱す attrs（独自 controlled API の `value` / `onChange` / `defaultValue` / `defaultChecked`、内部で固定する `type` / `role` / `className` 等）は `Omit` で除外。

  ### Newly accepted attrs

  - `NumberField` に `aria-labelledby` prop を追加（FormControl の `legend` ラベル用）

  ### FormControl の renderInput slot

  ```tsx
  // Before
  renderInput={({ id, describedbyId, labelId, isDisabled, isInvalid, isRequired }) => (
    <TextField
      id={id}
      describedbyId={describedbyId}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    />
  )}

  // After (props が HTML 標準名なのでスプレッド一発で済む)
  renderInput={(props) => <TextField {...props} />}
  ```

  ### Migration

  機械的なリネームで対応可能:

  ```diff
  - <TextField isDisabled={...} isInvalid={...} isRequired={...} describedbyId={...} />
  + <TextField disabled={...} invalid={...} required={...} aria-describedby={...} />

  - <Radio labelId="..." />
  + <Radio aria-labelledby="..." />
  ```

- [#449](https://github.com/k35o/ArteOdyssey/pull/449) [`3c4f4bb`](https://github.com/k35o/ArteOdyssey/commit/3c4f4bbc61546e305cdde1dbf6a9e5da7d6169be) Thanks [@k35o](https://github.com/k35o)! - `LinkButton` と `IconLink` を廃止し、`Button` / `IconButton` の `renderItem` render prop に統合した。

  ### Breaking changes

  - **`LinkButton` を削除**: `Button` の `renderItem` で `<a>` を返す形に置き換える。

    ```tsx
    // Before
    <LinkButton href="/foo" variant="contained">Go</LinkButton>

    // After
    <Button
      renderItem={({ className, children }) => (
        <a className={className} href="/foo">{children}</a>
      )}
      variant="contained"
    >
      Go
    </Button>
    ```

  - **`IconLink` を削除**: `IconButton` の `renderItem` で `<a>` を返す形に置き換える。Tooltip 連携用の props は `triggerProps` で渡される。

    ```tsx
    // Before
    <IconLink href="/foo" label="Go"><Icon /></IconLink>

    // After
    <IconButton
      label="Go"
      renderItem={({ className, children, 'aria-label': ariaLabel, triggerProps }) => (
        <a
          aria-label={ariaLabel}
          className={className}
          href="/foo"
          {...triggerProps}
        >
          {children}
        </a>
      )}
    >
      <Icon />
    </IconButton>
    ```

  ### Additions

  - `Button` に `active?: boolean` prop を追加（旧 `LinkButton` のアクティブ状態スタイル）
  - `Button` に `renderItem?: (props: { className, children }) => ReactNode` prop を追加
  - `IconButton` に `renderItem?: (props: { className, children, 'aria-label', triggerProps }) => ReactNode` prop を追加
  - `IconButtonTriggerProps` 型を export

  ### Cleanups

  - `Tooltip` の `onFocus` を `:focus-visible` チェック付きに変更。マウスクリック直後など focus-visible にならないケースで tooltip が auto-open しなくなった
  - `Button` の `active` prop を `isActive` に rename（CLAUDE.md の命名規約に合わせる）

  ### Notes

  - `renderItem` を指定した場合、`disabled` / `onAction` / Spinner などのボタン専用機能は適用されない（リンクには無関係なため）
  - `renderItem` 内で適切な `href` / `target` / `rel` 等のリンク属性を指定する責任は利用者側にある

- [#451](https://github.com/k35o/ArteOdyssey/pull/451) [`27da7f0`](https://github.com/k35o/ArteOdyssey/commit/27da7f03032a2f988ae10a8cfa98437d915004d5) Thanks [@k35o](https://github.com/k35o)! - Styled element 系コンポーネントが `HTMLAttributes` を受けるようになった。`id` / `data-*` / `aria-*` / `style` / event handlers / `className` 等が普通に渡せるようになり、テストや analytics の attrs を component 編集なしで追加できる。

  ### 対象

  | Component                  | 受ける attrs                                                             |
  | -------------------------- | ------------------------------------------------------------------------ |
  | `Avatar`                   | `HTMLAttributes<HTMLSpanElement>`                                        |
  | `Badge`                    | `HTMLAttributes<HTMLElement>` (interactive モードでは `<button>` に渡る) |
  | `Card` / `InteractiveCard` | `HTMLAttributes<HTMLDivElement>`                                         |
  | `Code`                     | `HTMLAttributes<HTMLElement>`                                            |
  | `Heading`                  | `HTMLAttributes<HTMLHeadingElement>`                                     |
  | `Spinner`                  | `OutputHTMLAttributes<HTMLOutputElement>`                                |
  | `Skeleton`                 | `HTMLAttributes<HTMLDivElement>`                                         |
  | `Progress`                 | `HTMLAttributes<HTMLDivElement>`                                         |
  | `Alert`                    | `HTMLAttributes<HTMLDivElement>`                                         |
  | `Separator`                | `HTMLAttributes<HTMLSpanElement>`                                        |
  | `Anchor`                   | `AnchorHTMLAttributes<HTMLAnchorElement>`                                |

  `className` を渡した場合はコンポーネント内部の class とマージされる。`role` / `aria-orientation` / `aria-label` (component が責任を持つもの) は `Omit` で除外。

  ### 例

  ```tsx
  <Avatar id="user" data-testid="avatar" name="k8o" />
  <Heading id="section-1" type="h2">タイトル</Heading>
  <Card onClick={...} className="custom-class">...</Card>
  ```

  ### Anchor の `renderAnchor` シグネチャ拡張

  `renderAnchor` のコールバック引数に `AnchorHTMLAttributes` の rest props が含まれるようになった。デフォルト実装は spread するので影響なし。カスタム `renderAnchor` を提供している場合、追加された attrs を `<a>` (or `<Link>`) にスプレッドし忘れないよう注意。

- [#452](https://github.com/k35o/ArteOdyssey/pull/452) [`d791552`](https://github.com/k35o/ArteOdyssey/commit/d791552fbfa55cb6f01059e8d8aa267757dada13) Thanks [@k35o](https://github.com/k35o)! - `Popover.Trigger` / `Tooltip.Trigger` の `renderItem` の型を緩い `Record<string, unknown>` から固有型 `PopoverTriggerProps` / `TooltipTriggerProps` に置き換え、利用者が型キャストなしで spread できるようにした。

  ### Type changes

  - `PopoverTriggerProps`: `Popover` から export。すべての popover type で必要な props (ref / onClick / onKeyDown / mouse・focus handlers / aria-haspopup / aria-expanded / aria-controls / aria-describedby / role) を optional union として持つ
  - `PopoverContentProps`: `Popover` から export。content の props (id / ref / role / aria-orientation / mouse・focus handlers) を持つ
  - `TooltipTriggerProps`: `Tooltip` から export。tooltip type 専用の props (ref / mouse・focus handlers / aria-describedby) のみ
  - 各 props の handler は `MouseEventHandler<HTMLElement>` などの汎用型なので、`<button>` / `<a>` / `<div>` など任意の要素に spread 可能
  - `DropdownMenu` / `ListBox` の `getTriggerProps` / `getContentProps` / `getItemProps` の return 型を `Record<string, unknown>` から `HTMLAttributes<HTMLElement>` に変更

  ### IconButton の型整理

  - 内部の `as unknown as` キャストを撤廃し、`Tooltip.Trigger` の renderItem からそのまま `triggerProps` を取り回せるようになった
  - `IconButtonTriggerProps` は `Partial<TooltipTriggerProps>` のエイリアスに

  ### Default placement の統一

  - `Tooltip.Root` のデフォルト `placement` を `'bottom-start'` から `'bottom'` に変更（`IconButton.tooltipPlacement` のデフォルトと揃えた）。アイコンボタン下に中央寄せで表示されるのが視覚的に自然なため
  - 以前の挙動が必要な場合は `<Tooltip.Root placement="bottom-start">` を明示

  ### Popover を tooltip 知識から切り離し

  - `Popover.Root` の `type` union から `'tooltip'` を削除（`'dialog' | 'menu' | 'listbox'` のみ）
  - 旧 `type='tooltip'` で暗黙的に切り替えていた挙動を `Popover.Root` の専用 props として明示化:
    - `closeOnClickAway?: boolean` (デフォルト `true`) — 外側クリックで閉じるか
    - `trapFocus?: boolean` (デフォルト `true`) — `FloatingFocusManager` の focus trap
  - `Tooltip` 関連の型 (`TooltipTriggerProps`) と hook (`useTooltipTriggerProps`) を popover モジュールから tooltip モジュールへ移動
  - `Tooltip.Root` は `<Popover.Root closeOnClickAway={false} trapFocus={false}>` を内部で利用しつつ、自前で trigger / content 要素を組み立てる形に
  - これにより Popover が generic な primitive として綺麗になり、Tooltip-specific な分岐が popover/hooks.ts から消えた

  ### Migration

  利用者は `<Popover.Root type="tooltip">` を直接使っていなければ影響なし。直接使っていた場合は `<Tooltip.Root>` への置き換えを推奨。

## 7.0.1

### Patch Changes

- [#441](https://github.com/k35o/ArteOdyssey/pull/441) [`c33c937`](https://github.com/k35o/ArteOdyssey/commit/c33c93739dc3f0d26edec15744b8f26f5ad2b8bb) Thanks [@k35o](https://github.com/k35o)! - Adopt the shared `@k8o/oxc-config` oxlint+oxfmt preset and apply the resulting cleanup. Mostly internal refactors with no public API changes:

  - Compound component context value memoization (`Tabs.Root`, `Dialog.Root`, `CheckboxGroup.Root`)
  - `Toast` provider/hook split into `toast/context.ts` and `toast/provider.tsx` to break a circular import
  - `ChevronIcon` / `AlertIcon` rewritten as record-lookup so the underlying component is determined eagerly instead of in a `switch`
  - Various conditional truthy checks made explicit (`string \| undefined`, `boolean \| undefined`)
  - `Checkbox` / `Radio` / `RadioCard` / `Switch` controlled state branching switched to spreading `{ checked }` or `{ defaultChecked }` instead of passing both

## 7.0.0

### Major Changes

- [#432](https://github.com/k35o/ArteOdyssey/pull/432) [`5ee321f`](https://github.com/k35o/ArteOdyssey/commit/5ee321f72ba4504362fdcdd2395cc027abe683d9) Thanks [@k35o](https://github.com/k35o)! - feat: step toward Async React across Button, Form, hooks, and components

  ライブラリ全体を「Async React」の流儀に揃えるための変更。

  **Button / IconButton**

  - 新設の `onAction?: () => void | Promise<void>` prop を渡すと、内部で `startTransition` に包んで実行する。ペンディング中は `disabled` + `aria-busy` + Spinner（Button のみ）を表示。
  - `onClick` は従来どおり同期的な urgent ハンドラで、transition 化されない。非同期処理を扱うときは `onAction` を使う。
  - `Button` は `type='submit'` の場合、親 `<form>` の action 実行中にも `useFormStatus` 経由で pending を拾う。`IconButton` は form 内で常に pending を反映。

  **Form（新規）**

  - `action` prop を受け付ける `<form>` ラッパー `Form` を追加。React 19 の form action パターンと `useActionState` / `useFormStatus` と素直に組み合わせて使える。

  **各フォームフィールドの pending 連携**

  親 `<form>` が action 実行中のとき、`useFormStatus` 経由で pending を拾って UI を抑制する。

  - 入力系 (`TextField` / `Textarea` / `NumberField` / `PasswordInput`) は `readOnly` を立てる。
  - 選択系 (`Select` / `Checkbox` / `Radio` / `Switch` / `FileField` / `Autocomplete` / `Slider`) は既存の `isDisabled` と OR して disabled 扱いにする。

  **Hooks**

  - `useDebouncedTransition` を追加。`startTransition(async)` + `AbortController` で delay 経過後にアクションを実行し、再呼び出し時は前回のアクションに渡した signal を abort する。
  - `useDeferredDebounce` を追加。`useDeferredValue` をラップし `[deferredValue, isPending]` を返す。
  - `useDebounce` / `useDebouncedCallback` / `useThrottle` / `useThrottledCallback` を削除（**BREAKING**）。代替として上記 2 フックまたは `useDeferredValue` を利用してください。
  - `useWindowResize` / `useResize` の `options.debounceMs` を削除（**BREAKING**）。resize イベントの整流は呼び出し側で `useDeferredValue` や `useDebouncedTransition` を使って行う方針へ統一。
  - `useTimeout` / `useInterval` が callback の参照変化でタイマーを張り直さないように、ref パターンへ整理（挙動は互換）。

  **Components**

  - `Autocomplete`: フィルタリングを `useDeferredDebounce` による遅延値に切り替え、ペンディング中はリストに `aria-busy` と opacity を付与。
  - `BaselineStatus`: 動的 `import` の完了観測を `useSyncExternalStore` + 可変モジュール変数から、`Suspense` + `use(Promise)` に置き換え。

### Minor Changes

- [#425](https://github.com/k35o/ArteOdyssey/pull/425) [`94f1ec8`](https://github.com/k35o/ArteOdyssey/commit/94f1ec8e7d005e54e37fc3a07556b31e2ffee352) Thanks [@k35o](https://github.com/k35o)! - refactor(tokens): テーマ定義を tokens.ts に集約して index.css を自動生成

  - デザイントークン（パレット、セマンティックマッピング、typography、radius、shadow、spacing、breakpoint）を `src/styles/tokens.ts` に集約し single source of truth 化
  - 新しいエントリポイント `@k8o/arte-odyssey/tokens` から型付きでトークンを参照可能に
  - `index.css` は `tokens.ts` + `base.css` + `utilities.css` からビルド時に自動生成される

### Patch Changes

- [#421](https://github.com/k35o/ArteOdyssey/pull/421) [`e86fad2`](https://github.com/k35o/ArteOdyssey/commit/e86fad2c813ede8c5057de33fbb1e2ef53fa8373) Thanks [@k35o](https://github.com/k35o)! - fix: Textarea・BaselineStatus・Modal の修正

  - Textarea: autoResize の useEffect に依存配列を追加し、onInput ハンドラで uncontrolled 対応
  - BaselineStatus: スケルトンの高さをレスポンシブ対応し CLS 軽減
  - Modal: MutationObserver で外部 ref 操作時の state 同期を実装

- [#418](https://github.com/k35o/ArteOdyssey/pull/418) [`77891a2`](https://github.com/k35o/ArteOdyssey/commit/77891a2fc4f0f3cb710e301794b2d3a31b9d8205) Thanks [@k35o](https://github.com/k35o)! - Toast の同時表示数を最大 5 つに制限

## 6.0.1

### Patch Changes

- [#409](https://github.com/k35o/ArteOdyssey/pull/409) [`82b9121`](https://github.com/k35o/ArteOdyssey/commit/82b9121f05991249c889484c6c9a59a01182f051) Thanks [@k35o](https://github.com/k35o)! - ### Card / InteractiveCard

  - 背景色を `bg-raised` から `bg-base` に変更
  - ダークモードの `dark:border` を削除
    - カードが背景に馴染み、コンテンツが主役になるように

## 6.0.0

### Major Changes

- [#400](https://github.com/k35o/ArteOdyssey/pull/400) [`92b2dbc`](https://github.com/k35o/ArteOdyssey/commit/92b2dbce81af72c37b5092a8e2ddf2b42b89636c) Thanks [@k35o](https://github.com/k35o)! - useScrollLock と useScrollDirection を任意の要素に適用できるように拡張

  - `useScrollLock(target?)`: 引数に `RefObject<HTMLElement | null>` を受け取り、指定要素の `overflow` を制御できるように。未指定時は従来通り `document.body`
  - `useScrollDirection(options?)`: 引数を `{ threshold?, target? }` の options 形式に変更（破壊的変更）。`target` 指定時はその要素のスクロール方向を検出
  - `fix(form-control)`: `helpText` / `errorText` と input の間に余白を追加
  - `fix(checkbox-card)`: 選択時の枠・インジケータの色を通常 Checkbox に揃える

### Minor Changes

- [#407](https://github.com/k35o/ArteOdyssey/pull/407) [`ed07136`](https://github.com/k35o/ArteOdyssey/commit/ed07136fc00f0216772ecd1b56766586851bc53f) Thanks [@k35o](https://github.com/k35o)! - bg-raised トークンを追加し浮く UI に適用

  - `bg-raised` トークン追加（light: white, dark: gray-800）
  - Card/InteractiveCard: `bg-raised` を適用、secondary variant を削除
  - Modal, Dialog, Tooltip, DropdownMenu, ListBox, AutoComplete: `bg-raised` を適用し border を削除
  - Tooltip: 背景を inverse に変更

- [#404](https://github.com/k35o/ArteOdyssey/pull/404) [`73b62a2`](https://github.com/k35o/ArteOdyssey/commit/73b62a282c30ae9683ca35bc27807c88c9034210) Thanks [@k35o](https://github.com/k35o)! - Button / IconButton / LinkButton / IconLink の hover/active 色を整理し、`secondary` カラーを追加

  - hover/active で opacity ハック (`/90`, `/80`) を使っていた箇所をセマンティックトークン (`*-emphasize`) に置き換え
  - skeleton variant に hover 時の背景色 (`bg-bg-subtle`) を追加して状態を分かりやすく
  - outlined / gray contained の active を 1 段薄く調整
  - `Button` / `LinkButton` の `color` に `secondary` を追加 (cyan ベース)
  - `IconButton` / `IconLink` の `bg` に `secondary` を追加

- [#405](https://github.com/k35o/ArteOdyssey/pull/405) [`aaaf2b4`](https://github.com/k35o/ArteOdyssey/commit/aaaf2b49f8064486a7450eb0e8dd825f37d23fe9) Thanks [@k35o](https://github.com/k35o)! - Pagination コンポーネントを追加

  前後ページ移動と現在位置 (`4 / 10`) を示すミニマルなページネーション。Button (`variant="skeleton" color="gray"`) ベースで実装し、他のナビゲーションコンポーネントと視覚的に統一。

  ```tsx
  <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
  ```

### Patch Changes

- [#403](https://github.com/k35o/ArteOdyssey/pull/403) [`65e0cd4`](https://github.com/k35o/ArteOdyssey/commit/65e0cd4062e1c9246e76a467bcd63bcd1ca7450e) Thanks [@k35o](https://github.com/k35o)! - NumberField のステッパーボタンのデザインを刷新

  縦並びは維持しつつ、区切り線・グレー背景を撤去してアイコンを `+`/`−` から chevron (`▲`/`▼`) に変更。通常時は枠と一体化し、hover 時のみ薄く背景色が出るように。他の Input 要素と並べた際の視覚的な統一感を改善。

- [#406](https://github.com/k35o/ArteOdyssey/pull/406) [`201cbb6`](https://github.com/k35o/ArteOdyssey/commit/201cbb6888135691013d58d4730803eb5daed1be) Thanks [@k35o](https://github.com/k35o)! - 各コンポーネントの hover・選択状態の色を整理

  - Tabs/Accordion: hover 時に primary カラーを適用
  - CheckboxCard/RadioCard: 選択中カードを primary カラーに統一し、hover 状態を追加
  - Switch: border を削除
  - AutoComplete: ドロップダウンの選択・ハイライト状態を primary カラーに
  - DropdownMenu/ListBox: hover 背景を bg-subtle に統一
  - FormControl: label と helper テキストに左余白を追加

## 5.0.4

### Patch Changes

- [#393](https://github.com/k35o/ArteOdyssey/pull/393) [`fa0a0d1`](https://github.com/k35o/ArteOdyssey/commit/fa0a0d1d4f658c4e9ebb7deeefaefd9398912ab7) Thanks [@k35o](https://github.com/k35o)! - AccordionButton に水平方向の padding を追加

## 5.0.3

### Patch Changes

- [#384](https://github.com/k35o/ArteOdyssey/pull/384) [`971e776`](https://github.com/k35o/ArteOdyssey/commit/971e776f16522bc4e553efa93d448a6077941a1c) Thanks [@k35o](https://github.com/k35o)! - primary / secondary トークンの被りを解消し階調を整理

  - dark の `primary-fg` / `secondary-fg` を 100 → 300 に変更（明るすぎを抑制）
  - light の `bg-emphasize` を 200 → 300 に変更（bg との被りを解消）
  - dark の `bg-subtle` を 900 → 950、`bg-mute` を 800 → 900 に変更（bg との被りを解消）

## 5.0.2

### Patch Changes

- [#382](https://github.com/k35o/ArteOdyssey/pull/382) [`9ad4f24`](https://github.com/k35o/ArteOdyssey/commit/9ad4f2430826d96bfddea8c695e4595c8fb8dd4c) Thanks [@k35o](https://github.com/k35o)! - useScrollDirection・useWindowSize の getServerSnapshot を定数化し無限ループを修正

  `useSyncExternalStore` の `getServerSnapshot` が呼び出しごとに新しいオブジェクトリテラルを返していたため、React が参照の不一致を検出して無限ループが発生する問題を修正。

## 5.0.1

### Patch Changes

- [#380](https://github.com/k35o/ArteOdyssey/pull/380) [`276d607`](https://github.com/k35o/ArteOdyssey/commit/276d607940e72ab59cb3d0d1b1158908da5c1f7c) Thanks [@k35o](https://github.com/k35o)! - Gray パレットの色相を H:235（sky blue tint）に調整し、彩度を極小に抑制

  - H:205 → H:235 に変更し、緑味（苔っぽさ）を解消
  - chroma を半減させ、ほぼニュートラルだがわずかにブランドを感じる程度に

## 5.0.0

### Major Changes

- [#372](https://github.com/k35o/ArteOdyssey/pull/372) [`a1dc58b`](https://github.com/k35o/ArteOdyssey/commit/a1dc58bd6737976599586039636228e549549b36) Thanks [@k35o](https://github.com/k35o)! - feat: add `useIntersectionObserver` and `useInView` hooks, refactor ref-based hooks to accept ref

  BREAKING CHANGE: `useClickAway` and `useResize` now accept a `ref` as the first argument instead of returning one.

### Minor Changes

- [#360](https://github.com/k35o/ArteOdyssey/pull/360) [`eb9d8cf`](https://github.com/k35o/ArteOdyssey/commit/eb9d8cfeeeca41ef0926510120efae62e80f201d) Thanks [@k35o](https://github.com/k35o)! - feat: add `useBreakpoint` hook for Tailwind CSS 4 breakpoint detection

- [#365](https://github.com/k35o/ArteOdyssey/pull/365) [`8762e91`](https://github.com/k35o/ArteOdyssey/commit/8762e91fe17b16014b05e830a042755eff458ebb) Thanks [@k35o](https://github.com/k35o)! - feat: add `useDebounce` and `useThrottle` hooks

  Both hooks support overloaded APIs:

  - Pass a value to get a debounced/throttled value
  - Pass a callback to get a debounced/throttled function

- [#364](https://github.com/k35o/ArteOdyssey/pull/364) [`1e9fb8c`](https://github.com/k35o/ArteOdyssey/commit/1e9fb8c39c372c13440d5fe2bcd246b1ebd3ac90) Thanks [@k35o](https://github.com/k35o)! - feat: add `useDisclosure` hook for open/close/toggle state management

- [#375](https://github.com/k35o/ArteOdyssey/pull/375) [`a7154b7`](https://github.com/k35o/ArteOdyssey/commit/a7154b7d8ff2f9710b7648314c57af1127c7f694) Thanks [@k35o](https://github.com/k35o)! - feat: add `useSessionStorage` hook for sessionStorage state management

- [#379](https://github.com/k35o/ArteOdyssey/pull/379) [`5181edc`](https://github.com/k35o/ArteOdyssey/commit/5181edc1225386f7c85f20fb9359d30f34f44154) Thanks [@k35o](https://github.com/k35o)! - ブランドカラーに寄せた Gray パレットと 950 シェードの追加

  ### カラーパレット

  - Gray の色相を H:265 → H:205（Cyan 寄り）に変更し、ブランドカラーとの統一感を強化
  - Gray の彩度を抑え、より自然なブランドニュートラルに調整
  - 全カラーファミリーに `950` シェードを追加（ダークモード背景用）
  - `bg-surface` トークンを `gray-50` / `gray-950` に統一

- [#377](https://github.com/k35o/ArteOdyssey/pull/377) [`03cbcbc`](https://github.com/k35o/ArteOdyssey/commit/03cbcbc3d963566e828d142860041e029b444ac4) Thanks [@k35o](https://github.com/k35o)! - デザインリフレッシュ: 「触れるものは柔らかく、読むものは端正に」

  ### カラーパレット

  - 全色を OKLCH 色空間に移行（明度統一スケール）
  - セマンティックトークンを穏やかな階調にシフト（WCAG AAA 準拠）
  - ダークモードをより深い暗さに調整

  ### コンポーネントの角丸

  - Button, LinkButton → `rounded-full`（ピル型）
  - TextField, Textarea, Select, NumberField, PasswordInput, Autocomplete, CheckboxCard, RadioCard, FileField → `rounded-xl`
  - Card, InteractiveCard → `rounded-xl`

  ### デザイントークン

  - `rounded-xl` (1rem), `rounded-2xl` (1.25rem) を追加

  ### バグ修正

  - Tabs: 同一ページ内の複数インスタンスでアンダーラインが干渉する問題を修正

### Patch Changes

- [#378](https://github.com/k35o/ArteOdyssey/pull/378) [`35ef6a0`](https://github.com/k35o/ArteOdyssey/commit/35ef6a08d346935f3858f5bef4fa1fb4791dc9fb) Thanks [@k35o](https://github.com/k35o)! - docs: update design system docs to match current component and hook APIs

## 4.2.1

### Patch Changes

- [#351](https://github.com/k35o/ArteOdyssey/pull/351) [`b844daa`](https://github.com/k35o/ArteOdyssey/commit/b844daa5e3555820f47c22d87a794584e1493356) Thanks [@k35o](https://github.com/k35o)! - Allow passing `name` to additional form components, including autocomplete, radio-card, checkbox-card, select, number-field, checkbox, and radio.

## 4.2.0

### Minor Changes

- [#343](https://github.com/k35o/ArteOdyssey/pull/343) [`e2c9259`](https://github.com/k35o/ArteOdyssey/commit/e2c9259231fd89c9ca7e75a2ff2e01c686b45a0e) Thanks [@k35o](https://github.com/k35o)! - ErrorBoundary の re-export を削除。react-error-boundary を直接利用してください。

## 4.1.0

### Minor Changes

- [#339](https://github.com/k35o/ArteOdyssey/pull/339) [`dec8ccb`](https://github.com/k35o/ArteOdyssey/commit/dec8ccba100bc396737e0f1cf2ef512041c099f2) Thanks [@k35o](https://github.com/k35o)! - ArteOdyssey のアイコンを変更

## 4.0.0

### Major Changes

- [#329](https://github.com/k35o/ArteOdyssey/pull/329) [`602125d`](https://github.com/k35o/ArteOdyssey/commit/602125dcd0f80a4c5b3191349155efca53b243b7) Thanks [@k35o](https://github.com/k35o)! - Remove standalone `Content` export from Dialog — use `Dialog.Content` instead.

  Remove `FileFieldProvider` from public exports — it was only used internally.

- [#315](https://github.com/k35o/ArteOdyssey/pull/315) [`cd8edb4`](https://github.com/k35o/ArteOdyssey/commit/cd8edb4f9e1e22f46981d680688f0da4e9641083) Thanks [@k35o](https://github.com/k35o)! - Add new `CheckboxGroup` form components with docs and Storybook
  coverage.

  Allow `Checkbox` to be used directly inside `CheckboxGroup` so grouped
  checkboxes share the same visual API as standalone checkboxes.

- [#313](https://github.com/k35o/ArteOdyssey/pull/313) [`68e9652`](https://github.com/k35o/ArteOdyssey/commit/68e9652037a48390bcd9c91e7f14e5fab667a663) Thanks [@k35o](https://github.com/k35o)! - Add new `Switch`, `Avatar`, `Badge`, `Skeleton`, `Spinner`, and `Slider`
  components, including docs and Storybook coverage.

  Remove `TextTag` and `RangeField` from the public API and docs in favor of
  `Badge` and `Slider`.

  Tighten the public props for `Avatar`, `Skeleton`, and `Spinner` to match the
  library's constrained component API style.

- [#316](https://github.com/k35o/ArteOdyssey/pull/316) [`a97db65`](https://github.com/k35o/ArteOdyssey/commit/a97db651a1151f57c846de5acf253b34a609039f) Thanks [@k35o](https://github.com/k35o)! - Add new `Table`, `PasswordInput`, `RadioCard`, and `CheckboxCard`
  components, including docs and Storybook coverage.

  Fix `Checkbox` disabled handling and stabilize `Checkbox` and `Radio`
  selection behavior, including `Radio` default value handling.

  Remove `RadioGroup` from the public API and docs in favor of the
  options-based `Radio` component.

- [#325](https://github.com/k35o/ArteOdyssey/pull/325) [`970d2ed`](https://github.com/k35o/ArteOdyssey/commit/970d2ed6b265ec8be9171cda90beb9dcf1ff90cf) Thanks [@k35o](https://github.com/k35o)! - Restrict the public JavaScript and TypeScript API to the root
  `@k8o/arte-odyssey` entrypoint.

  Consumers must now import components, hooks, helpers, and types from the
  package root instead of subpath exports.

  Keep `@k8o/arte-odyssey/styles.css` as the only public subpath for stylesheet
  loading.

### Patch Changes

- [#331](https://github.com/k35o/ArteOdyssey/pull/331) [`a9ea042`](https://github.com/k35o/ArteOdyssey/commit/a9ea04278950d1851b63358eb97ed8f67b5ced2b) Thanks [@k35o](https://github.com/k35o)! - Migrate build toolchain from esbuild to Vite+ (vp pack / tsdown).

  Output format changes from `.js` to `.mjs` with `.d.mts` type declarations.

## 3.1.0

### Minor Changes

- [#271](https://github.com/k35o/ArteOdyssey/pull/271) [`3f5cd56`](https://github.com/k35o/ArteOdyssey/commit/3f5cd562c349fab39a269d014b255d625a6b5731) Thanks [@k35o](https://github.com/k35o)! - Drawer コンポーネントの title に ReactNode を受け付けるように変更し、side prop で左右の表示位置を選択可能に。Modal に left タイプを追加。helpers 関数のエクスポートを追加。

- [#274](https://github.com/k35o/ArteOdyssey/pull/274) [`c73c690`](https://github.com/k35o/ArteOdyssey/commit/c73c6904803f17e199e4b862da4d0f5f7337f8aa) Thanks [@k35o](https://github.com/k35o)! - Card / InteractiveCard に `appearance` prop を追加（`'shadow' | 'bordered'`）。HTML 要素を `<section>` から `<div>` に変更。

### Patch Changes

- [#274](https://github.com/k35o/ArteOdyssey/pull/274) [`037d31c`](https://github.com/k35o/ArteOdyssey/commit/037d31cc6500aa2b75725d068dd2c0867af76523) Thanks [@k35o](https://github.com/k35o)! - leading, shadow, inset-shadow, spacing, breakpoints のデザイントークンを @theme inline に明示的に定義

## 3.0.0

### Major Changes

- [#266](https://github.com/k35o/ArteOdyssey/pull/266) [`e905a76`](https://github.com/k35o/ArteOdyssey/commit/e905a76030357520f7da18d050bf5cd86226e01e) Thanks [@k35o](https://github.com/k35o)! - Card/InteractiveCard から overflow-hidden を削除し、子要素の focus ring が表示されるように修正。未使用の title prop を削除（breaking change）。

### Patch Changes

- [#267](https://github.com/k35o/ArteOdyssey/pull/267) [`1c1d27f`](https://github.com/k35o/ArteOdyssey/commit/1c1d27fb69f01b217d0f26ba2f247444103b2fea) Thanks [@k35o](https://github.com/k35o)! - カスタム hooks に'use client'ディレクティブを追加して Next.js App Router 互換性を確保

- [#262](https://github.com/k35o/ArteOdyssey/pull/262) [`70dee44`](https://github.com/k35o/ArteOdyssey/commit/70dee4492e3c2e0d8b16bd79fd544f3e39112f46) Thanks [@k35o](https://github.com/k35o)! - export \*を named exports に変換して RSC 互換性を確保

## 2.0.2

### Patch Changes

- [#215](https://github.com/k35o/ArteOdyssey/pull/215) [`7f95e1e`](https://github.com/k35o/ArteOdyssey/commit/7f95e1e5227373531dc79c9dfa10428deced22ec) Thanks [@k35o](https://github.com/k35o)! - NumberField: +/-ボタンの角丸を親要素に合わせて lg に修正

## 2.0.1

### Patch Changes

- [#212](https://github.com/k35o/ArteOdyssey/pull/212) [`723668d`](https://github.com/k35o/ArteOdyssey/commit/723668dfd319bbe5f5a82d0de4d782adc1d64993) Thanks [@k35o](https://github.com/k35o)! - Card, InteractiveCard: border を shadow-sm に変更し、よりソフトな見た目に

## 2.0.0

### Major Changes

- [#209](https://github.com/k35o/ArteOdyssey/pull/209) [`5b8b434`](https://github.com/k35o/ArteOdyssey/commit/5b8b434d4656887a17d22218a4dae762887cd14c) Thanks [@k35o](https://github.com/k35o)! - デザインシステム全体を「静謐で落ち着いた、余白を活かした UI」原則に基づいて刷新

  ## Breaking Changes

  ### Accordion

  - 外枠のボーダーを削除、区切り線のみに変更
  - motion ライブラリを CSS トランジションに置き換え
  - パネルの強制テキスト色を削除

  ### Alert

  - アイコンサイズを lg → md に変更
  - list-disc を削除、space-y-1 に変更

  ### Button

  - `border-2` をベースクラスに追加（contained/skeleton は border-transparent）
  - 全バリアントでサイズが統一される

  ### Card

  - shadow-md を削除、border のみに変更
  - bg の透明度を削除、solid な bg-bg-base に
  - グラデーションタイトルを bg-primary-bg/10 に変更
  - motion ライブラリを CSS トランジションに置き換え（InteractiveCard）

  ### Dialog

  - shadow-xl → shadow-md に変更

  ### Dropdown Menu

  - shadow-xl → shadow-md に変更
  - ホバー色を primary から bg-bg-mute に変更

  ### Form 全般

  - rounded-lg に統一
  - shadow-xs を削除
  - Autocomplete の選択状態を bg-bg-mute に変更

  ### IconButton / IconLink

  - bg-bg-base の /90 透明度を削除
  - **IconLink に `bg: 'primary'` オプションを追加**

  ### Icons

  - **ZennIcon を削除**

  ### LinkButton

  - **`color` prop を追加** (`'primary' | 'gray'`)
  - `border-2` をベースクラスに追加

  ### ListBox

  - **チェックマークを左から右に移動**
  - アイテムのパディングを px-2 py-1 → px-3 py-2 に増加
  - shadow-xl → shadow-md に変更

  ### Modal

  - shadow-xl → shadow-md に変更

  ### Popover

  - rounded-lg に統一

  ### Progress / ScrollLinked

  - **bg-primary-fg → bg-primary-bg に変更**（色が柔らかくなる）
  - Progress に rounded-full と transition-all を追加

  ### Radio

  - **`name` prop を追加**（ラジオボタンのグループ化に必要）

  ### Separator

  - **`color` prop を追加** (`'base' | 'mute' | 'subtle'`)
  - hr/div から span 要素に変更

  ### Styles

  - **spacing-lg トークンを削除** - 未使用だったカスタムトークン

  ### Tabs

  - rounded-md → rounded-lg に変更

  ### Tooltip

  - shadow-xl → shadow-md に変更

  ## New Features

  ### デザイン原則ドキュメント

  - DESIGN_PRINCIPLES.md を追加
  - Claude スキル（.claude/skills/arte-odyssey-design/）を追加

  ### 共通改善

  - 全インタラクティブ要素に `transition-colors` を追加
  - focus-visible リングをアクセシビリティ向上のため追加
  - Storybook の例を日本語の具体的な内容に更新

  ## デザイン原則

  - **角丸**: `rounded-lg` を基本に統一
  - **シャドウ**: `shadow-md` を最大に制限
  - **ホバー**: `bg-bg-mute` を使用（強い原色を避ける）
  - **トランジション**: `transition-colors` を必須化
  - **透明度**: `/90` などの透明度は使わず、専用トークンを使用

## 1.4.3

### Patch Changes

- [#185](https://github.com/k35o/ArteOdyssey/pull/185) [`c94af38`](https://github.com/k35o/ArteOdyssey/commit/c94af38854c72a30eacebc79a992d3372ea17f9a) Thanks [@k35o](https://github.com/k35o)! - フォームコンポーネントの value と defaultValue を排他的な型に変更

  制御コンポーネント（value + onChange）と非制御コンポーネント（defaultValue）を同時に指定できないように型定義を修正しました。これにより、React の警告や予期しない動作を防ぎます。

  対象コンポーネント:

  - TextField, Textarea, Select
  - Radio, Checkbox
  - NumberField, RangeField
  - Autocomplete

  また、RangeField と FileField に `w-full` を追加し、親要素の幅に合わせて伸びるようにしました。

## 1.4.2

### Patch Changes

- [#165](https://github.com/k35o/ArteOdyssey/pull/165) [`a118369`](https://github.com/k35o/ArteOdyssey/commit/a118369846e35c21ec2cc11a64f2860650819005) Thanks [@k35o](https://github.com/k35o)! - Update React and Next.js dependencies to address security vulnerabilities (DoS and source code exposure in React Server Components)

## 1.4.1

### Patch Changes

- [#152](https://github.com/k35o/ArteOdyssey/pull/152) [`d51d977`](https://github.com/k35o/ArteOdyssey/commit/d51d9771289174eb8b9e7ffb673b3e679745fd38) Thanks [@k35o](https://github.com/k35o)! - React CVE 55182 対応

## 1.4.0

### Minor Changes

- [#150](https://github.com/k35o/ArteOdyssey/pull/150) [`b6c9066`](https://github.com/k35o/ArteOdyssey/commit/b6c9066d7f28f388f54be0f02a5ee3dd35cc6c5c) Thanks [@k35o](https://github.com/k35o)! - ScrollLinked コンポーネントに container prop を追加

  ScrollLinked コンポーネントにオプショナルな container prop を追加しました。

  主な機能:

  - container prop で特定のコンテナ要素のスクロール進捗を追跡可能
  - RefObject<HTMLElement | null>型で TypeScript の型安全性を確保
  - Storybook に新しい WithContainer ストーリーを追加してデモを提供
  - デフォルトでは window のスクロールを追跡（既存の動作を維持）

## 1.3.0

### Minor Changes

- [#141](https://github.com/k35o/ArteOdyssey/pull/141) [`f44ac3f`](https://github.com/k35o/ArteOdyssey/commit/f44ac3f5f9f8cd020e2ec53fd6e421de7d01a7ec) Thanks [@k35o](https://github.com/k35o)! - useResize と useWindowResize フックを追加

  要素と window のリサイズを検知する 2 つのフックを追加しました。

  ## useResize

  ResizeObserver を使用して要素のリサイズを検知するフックです。

  主な機能:

  - ResizeObserver による要素のリサイズ検知
  - コールバックで ResizeObserverEntry を受け取り可能
  - enabled パラメータで監視の有効/無効を切り替え可能
  - debounceMs パラメータで任意の間隔で debounce 処理が可能

  ## useWindowResize

  window のリサイズを検知するフックです。

  主な機能:

  - window のリサイズイベントを検知
  - コールバックで window サイズ（width, height）を受け取り可能
  - enabled パラメータで監視の有効/無効を切り替え可能
  - debounceMs パラメータで任意の間隔で debounce 処理が可能
  - 初回のレンダリング時にはコールバックを呼び出さない

### Patch Changes

- [#139](https://github.com/k35o/ArteOdyssey/pull/139) [`5a54eb4`](https://github.com/k35o/ArteOdyssey/commit/5a54eb4d377fe1c9629d3fa02984b7d280aacd68) Thanks [@k35o](https://github.com/k35o)! - IconButton に cursor-pointer を追加

  IconButton コンポーネントに cursor-pointer クラスを追加し、ホバー時のカーソル表示を改善しました。

## 1.2.0

### Minor Changes

- [#138](https://github.com/k35o/ArteOdyssey/pull/138) [`70e4952`](https://github.com/k35o/ArteOdyssey/commit/70e495257ac35abbfb92a7e8777c5a46b1a8e6e1) Thanks [@k35o](https://github.com/k35o)! - FileField コンポーネントを追加

  ファイル選択 UI を提供する新しい FileField コンポーネントを追加しました。

  主な機能:

  - Root、Trigger、ItemList の 3 つのサブコンポーネントによる柔軟な構成
  - ファイルの選択、表示、削除機能
  - 複数ファイル選択のサポート
  - 最大ファイル数制限
  - webkitDirectory 対応でフォルダ選択が可能
  - ref を使って acceptedFiles にアクセス可能
  - Button コンポーネントと組み合わせて使用可能

- [#136](https://github.com/k35o/ArteOdyssey/pull/136) [`f08b0c5`](https://github.com/k35o/ArteOdyssey/commit/f08b0c5bdfe9b72e28f500fa7598f0f52cc52cd7) Thanks [@k35o](https://github.com/k35o)! - Fix code color display issue where consecutive strings containing colors were incorrectly displayed

## 1.1.0

### Minor Changes

- [#108](https://github.com/k35o/ArteOdyssey/pull/108) [`3bc361a`](https://github.com/k35o/ArteOdyssey/commit/3bc361a2705a9177831f90d529cdff26c658398c) Thanks [@renovate](https://github.com/apps/renovate)! - bump dependencies

## 1.0.0

### Major Changes

- [#57](https://github.com/k35o/ArteOdyssey/pull/57) [`df367e3`](https://github.com/k35o/ArteOdyssey/commit/df367e3040785ee177191a7769b8aea5d5197dc9) Thanks [@k35o](https://github.com/k35o)! - Rename ComponentProvider to ArteOdysseyProvider

  BREAKING CHANGE: ComponentProvider has been renamed to ArteOdysseyProvider. Update your imports from `import { ComponentProvider }` to `import { ArteOdysseyProvider }`.

## 0.1.0

### Minor Changes

- [#50](https://github.com/k35o/ArteOdyssey/pull/50) [`b1cb256`](https://github.com/k35o/ArteOdyssey/commit/b1cb256d6f034e7a7e4694c2b8b1b21baf1abcd2) Thanks [@k35o](https://github.com/k35o)! - Add defaultValue support to form components

  Add defaultValue prop to form components to enable uncontrolled usage:

  - Checkbox: add defaultChecked prop
  - NumberField: add defaultValue prop with proper state initialization
  - RangeField: add defaultValue prop
  - Select: add defaultValue prop
  - Radio: add defaultValue prop (defaultChecked for individual options)
  - Autocomplete: add defaultValue prop with controlled/uncontrolled state management

  This allows components to work in both controlled (value + onChange) and uncontrolled (defaultValue + onChange) modes for better flexibility.

### Patch Changes

- [#43](https://github.com/k35o/ArteOdyssey/pull/43) [`3d89a22`](https://github.com/k35o/ArteOdyssey/commit/3d89a2255d5647080f2e15a8631576db163a2185) Thanks [@k35o](https://github.com/k35o)! - nextjs の examples を追加

## 0.0.6

### Patch Changes

- [#33](https://github.com/k35o/ArteOdyssey/pull/33) [`d048c79`](https://github.com/k35o/ArteOdyssey/commit/d048c7991c94134aaa66b14d876ef03003100835) Thanks [@k35o](https://github.com/k35o)! - link に自由な型を渡せるように

## 0.0.5

### Patch Changes

- [#31](https://github.com/k35o/ArteOdyssey/pull/31) [`c33eb31`](https://github.com/k35o/ArteOdyssey/commit/c33eb316796a5441004ca1a85a0514efc366fa93) Thanks [@k35o](https://github.com/k35o)! - Accordion オブジェクトからコンポーネントを提供するようにする

- [#32](https://github.com/k35o/ArteOdyssey/pull/32) [`7659205`](https://github.com/k35o/ArteOdyssey/commit/76592057ec2caa384aad5e0403de09fccd03bfbf) Thanks [@k35o](https://github.com/k35o)! - Component をまとめて出荷する値の型の強化

- [#29](https://github.com/k35o/ArteOdyssey/pull/29) [`5ddfb06`](https://github.com/k35o/ArteOdyssey/commit/5ddfb06ee6b15271d5fb14bfd4b6c17a8fdbe9b3) Thanks [@k35o](https://github.com/k35o)! - peerDeps の範囲を拡大

## 0.0.4

### Patch Changes

- [#27](https://github.com/k35o/ArteOdyssey/pull/27) [`f4e0adc`](https://github.com/k35o/ArteOdyssey/commit/f4e0adcc07a8387b4bacf411138c8e8a5dbef071) Thanks [@k35o](https://github.com/k35o)! - React のバージョンアップ

- [#23](https://github.com/k35o/ArteOdyssey/pull/23) [`042190c`](https://github.com/k35o/ArteOdyssey/commit/042190ce06e868362e7045724e83f2be7e774a27) Thanks [@k35o](https://github.com/k35o)! - パッケージのバージョンアップ

## 0.0.3

### Patch Changes

- [#7](https://github.com/k35o/ArteOdyssey/pull/7) [`199e831`](https://github.com/k35o/ArteOdyssey/commit/199e8313bb81cc8ed34e8d3dddb3bf0cf90f34cf) Thanks [@k35o](https://github.com/k35o)! - ReactErrorBoundary を依存に加える

## 0.0.2

### Patch Changes

- [`bf31ae8`](https://github.com/k35o/ArteOdyssey/commit/bf31ae86fadfef8a2324e2dcabb95f099a32aac8) Thanks [@k35o](https://github.com/k35o)! - dummy

## 0.0.1

### Patch Changes

- [#2](https://github.com/k35o/ArteOdyssey/pull/2) [`f16a84d`](https://github.com/k35o/ArteOdyssey/commit/f16a84daf78714238247d53b854a4d9311e63693) Thanks [@k35o](https://github.com/k35o)! - ファーストリリース
