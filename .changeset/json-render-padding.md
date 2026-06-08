---
'@k8o/arte-odyssey': minor
---

feat(json-render): Stack に `padding` prop、Card / InteractiveCard に `size`(sm/md/lg) を追加

生成UI統合には内側 padding を表現する手段が無く（gap のみ・className エスケープも排除）、
生成された Card / InteractiveCard が余白ゼロで描画されていた。

- `Stack` に `padding`（none〜xl）prop を追加（openui 統合とも共有）。
- Card / InteractiveCard に `size`（sm/md/lg、デフォルト md）を追加し、内側 padding を
  サイズで決める（16/24/32px）。shadcn/Chakra/Fluent/Radix の size→padding 慣習に倣う。
- Tailwind の `@source` に `../integrations` を追加。生成UI の renderer が出すユーティリティ
  クラス（カードの padding 等）が、利用側で未スキャン→未生成になる問題を修正。
