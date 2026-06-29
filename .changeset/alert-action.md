---
'@k8o/arte-odyssey': minor
---

Alert に `action`（テキストリンク）を追加しました。

- `action?: { label: string; renderItem: ({ children }) => ReactNode }` を追加。`message` の直後にインラインでリンク／アクションを描画します（`string` の場合は本文と同じ行に続けて表示）。
- 遷移リンク（`<a>` / `Anchor` / Next.js `Link`）にも、モーダルを開く等のアクション（`<button onClick>`）にも対応。要素とその見た目は `renderItem` で利用側が決めます（Alert は本文末尾へのインライン配置のみ担保）。`Button` / `IconButton` と同じパターンですが、スタイルは強制しません。リンクの見た目を揃えたい場合は `Anchor` を返してください。
