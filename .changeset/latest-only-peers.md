---
'@k8o/arte-odyssey': major
---

peer 依存の下限を「実際に検証しているバージョン」に統一し、古いバージョンのための互換を廃止しました。

- **`ai` は v7 のみサポートします**（`>=7.0.51`）。AI SDK v7 のツール状態機械に追随し、`ToolState` に `approval-requested` / `approval-responded` / `output-denied` を追加、`ToolInvocation` は拒否状態を警告トーンで表示します（`deniedReason` prop、既定文言は辞書の `toolDenied`）。`mapMessageParts` は v7 で削除された `isToolOrDynamicToolUIPart` と deprecated の `getToolOrDynamicToolName` をやめ、`isToolUIPart` / `getToolName` を使います。`MappedPart` の tool には `deniedReason` が追加されています。
- **`typescript` の下限を `>=7.0.2` にしました。** 配布物の型定義は TS 7 の tsc での型チェックで検証しています（リポジトリ内のビルドは vite-plus の dts 生成が TS 7 の JS API 未提供に未対応のため、当面 TS 6 を使います）。
- そのほかの peer も devDependencies で検証している版を下限にしました: `react` / `react-dom` `>=19.2.6`、`@types/react` `>=19.2.18`、`@types/react-dom` `>=19.2.4`、`tailwindcss` `>=4.3.3`、`zod` `>=4.4.3`、`@openuidev/lang-core` `>=0.2.10`、`@openuidev/react-lang` `>=0.2.9`。

`Messages` 型に `toolDenied` キーが増えています。辞書を型注釈付きで全置換している場合はキーを追加してください。
