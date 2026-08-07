---
'docs': patch
---

同梱ドキュメントの markdown ツインを配信するようにしました。

`packages/arte-odyssey/docs/**/*.md` をビルド時に `public/docs/` へ複製し、
`llms.txt` のリンク先を HTML ページから `.md` に統一しています。エージェントが
HTML を剥がさずにリファレンスを読めます。
