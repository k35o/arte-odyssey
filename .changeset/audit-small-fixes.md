---
'@k8o/arte-odyssey': minor
---

監査で見つかったバグ級の問題を一括修正しました。

**Autocomplete（スクリーンリーダーでほぼ操作不能だった問題の解消）**

- 矢印キーのハイライトを `aria-activedescendant` で支援技術に伝えるようにした
- Escape でリストを閉じられるようにした
- 絞り込み後に矢印キーの上限が全候補数のままで Enter が無反応になるバグを修正
- 候補リストに `overflow-y-auto` とアクティブ行への自動スクロールを追加し、`aria-multiselectable` を付与
- `placeholder` / `onBlur` / `onClick` / `onKeyDown` が内部実装に無言で上書きされていた問題を修正（利用者のハンドラと連結）
- document への click リスナーを開いている間だけ登録するようにした

**フォーム・表示系の修正**

- `Progress`: 読み上げ値が 100 倍されず「0.5%」になるバグを修正（`minProgress` オフセットも考慮）
- `Heading`: `lineClamp` が動的クラス生成のため CSS が生成されず機能していなかった問題を静的マップで修正。型は `1〜6` のリテラルに変更（従来はどの値でも無効だったため実害なし）
- `FileField`: 型定義のみで未実装だった `defaultValue` を実装
- `FormControl`: `labelAs="legend"` 時に radiogroup 等の `aria-labelledby` が空参照になる問題を修正
- `NumberField`: 利用者の `onBlur` / `onKeyDown` が破棄されていた問題を修正

**アクセシビリティ**

- 全アイコン（lucide ラッパー・自前 SVG とも）の svg に `aria-hidden="true"` / `focusable="false"` を注入
- `Dialog` / `Drawer`: アクセシブルネームに「閉じる」ボタンのラベルが混入していた問題を修正
- `Breadcrumb`: セパレータを a11y ツリーから除外し、現在ページに `aria-current="page"` を付与。nav ラベルの誤記「パンクズリスト」を修正
- `Pagination`: ページカウンタへの `aria-current` 誤用を削除
- `DropdownMenu` / `ListBox`: Tab でフォーカスが外れたときメニューが開いたままになる問題を修正（Popover の focusout 処理）

**ビジュアル（VRT に差分が出ます）**

- `fg-subtle` のコントラストを WCAG AA 準拠に（light: gray-400→gray-600 で 2.22:1→5.50:1、dark: gray-500→gray-400 で 4.39:1→6.13:1）
- ダークモードでメニュー・リストボックスの境界が見えなかった問題に対し、ポップアップ面へ `border-border-subtle` を追加
