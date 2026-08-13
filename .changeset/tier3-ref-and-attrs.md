---
'@k8o/arte-odyssey': minor
---

v12 監査の非破壊項目（Tier 3）を対応しました。すべて受け入れ範囲の拡張です。

- **`Modal` の `ref` がコールバック ref も受け取れるようになりました**（`RefObject` 固定 → `Ref<HTMLDialogElement>`）。内部の開閉制御は内部 ref に一本化し、外部 ref は要素で合成します。
- **`Table` の各サブコンポーネントが要素固有の HTML 属性を受け取れるようになりました**（`id` / `data-*` / aria 属性など。`className` / `style` は従来どおり不可）。`Cell` の `colSpan` は `TdHTMLAttributes` 経由になり、`HeaderCell` の `scope` が上書き可能になりました（既定 `col`）。
- **`FormControl` / `Pagination` が `ref` と HTML 属性を受け取れるようになりました。**
- **`PromptInput.Textarea` が `ref` を受け取れるようになりました**（内部の autosize 用 ref と合成）。
- **`Dialog.Header` の `title` が `ReactNode` になりました**（`Drawer.title` と同型に）。
- 内部整理: `React.` グローバル名前空間への依存 3 件を明示 import に置き換えました（公開 API への影響なし）。
