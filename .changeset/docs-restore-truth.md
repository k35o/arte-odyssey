---
'@k8o/arte-odyssey': patch
---

npm に同梱されるドキュメント（README / docs/）を現行 API に追随させました。

- README・GUIDE.md・references/components.md のコード例を修正（`variant="contained"/"outlined"` → `"solid"/"outline"`、IconButton の `bg` → `color`、Card の削除済み `title` prop、フォーム系の `isInvalid/isDisabled/isRequired` → `invalid/disabled/required` ほか）。これまで Quick Start をコピペするとコンパイルエラーになっていました。
- AI チャットコンポーネント群（`/ai`, `/ai/response`, `/ai-sdk`）のリファレンス `docs/references/ai-chat.md` を新規追加し、README にもセクションと optional peer（`streamdown` / `ai`）のセットアップ手順を追加。
- 「Granular Imports」節を実態（単一 ESM エントリ + tree-shaking、実在するサブパス一覧）に合わせて書き換え、CSS の読み込み手順を 1 行 import に統一（現在のエントリの選び方は上の `styles.css` ビルド済み化の項を参照）。
- README 冒頭に公式ドキュメントサイトと公開 Storybook へのリンクを追加。
