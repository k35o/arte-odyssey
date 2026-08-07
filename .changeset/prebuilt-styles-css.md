---
'@k8o/arte-odyssey': major
---

`styles.css` をビルド済み CSS にして、Tailwind を持たないプロジェクト（CSS Modules・素の CSS）でも import 1行で使えるようにしました。ライブラリのルールはすべて `@layer` 内にあるため利用側の CSS が優先され（例外は preflight の `[hidden] { display: none !important }` のみ）、デザイントークンは `:root` / `.dark` の CSS カスタムプロパティとして参照できます（`var(--fg-mute)` など）。どちらのエントリも Tailwind の preflight とライブラリの base スタイルを文書全体に適用します（既存アプリへの後付け時は注意）。`Response`（streamdown）だけは利用側の Tailwind ビルドが必要なため、ビルド済み CSS では対象外です。

**破壊的変更**: Tailwind CSS 4 のプロジェクトは import を `@k8o/arte-odyssey/tailwind.css`（従来の `styles.css` と同内容の Tailwind ソース版）に変更してください。デザイントークンを自分のマークアップの Tailwind クラスとして使うにはこちらが必要です。

あわせて、コンポーネントが参照しながら生成されていなかったユーティリティを修正しました: `rounded-xs`（`--radius-xs: 0.125rem` をトークンに追加。AI コンポーネントの停止ボタン・ストリーミングカーソルに 2px の角丸が付くようになります）と、`Modal` center の `max-h-lg` / `vertical:max-h-2xl`（実在する `max-h-128` / `max-h-168` に置換。中央モーダルに意図されていた最大高さが初めて効きます）。
