---
'@k8o/arte-odyssey': minor
---

Alert に `action`（テキストリンク）を追加しました。

- `action?: { label: string; renderItem: ({ className, children }) => ReactNode }` を追加。`message` の直後にインラインでテキストリンクを描画します（`string` の場合は本文と同じ行に続けて表示）。
- 遷移リンク（`<a>` / `Anchor` / Next.js `Link`）にも、モーダルを開く等のアクション（`<button onClick>`）にも対応。要素は `renderItem` で利用側が返します（`Button` / `IconButton` と同じパターン）。
- リンクのスタイルは `Anchor` と共有の定数（`LINK_CLASS_NAME`）に統一しました。
