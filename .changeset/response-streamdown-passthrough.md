---
'@k8o/arte-odyssey': major
---

`Response` が streamdown の設定を透過し、コントロールの文言も辞書化しました。

- **`children` / `isStreaming` 以外の props が streamdown にそのまま渡ります。** 型は `Omit<StreamdownProps, 'children' | 'className' | 'mode'>` で、`translations` / `controls` / `linkSafety` / `urlTransform` / `components` / `plugins` / `dir` / `icons` などが指定できます。`className` と `mode` はこのライブラリが握ります（`mode` は `isStreaming` から決まります）。
- **`linkSafety` の既定を `{ enabled: false }` にしました（streamdown の既定は `{ enabled: true }`）。** streamdown は有効時にリンクを `<a href>` ではなく `<button type="button">` で描画するため、⌘クリック・中クリック・リンクアドレスのコピー・支援技術の link ロールが失われます。確認モーダルは URL を見せるだけで素通しできる一方、失われるものは全ユーザーに常に効くため、既定では切っています。従来どおり確認を挟むには `<Response linkSafety={{ enabled: true }}>` を指定してください。安全でないスキーム（`javascript:` など）は linkSafety とは無関係に rehype-harden が潰します。
- **コードブロックの Copy / Download、表のコピー、外部リンク確認などの文言が日本語になりました。** `Messages` に `response*` のキーを追加し、`useMessages()` 経由で streamdown の `translations` を組み立てます。優先順位は「`translations` prop > 辞書 > streamdown の既定」です。書式名（Markdown / CSV / TSV / SVG / PNG / MMD）は翻訳対象にしていません。
