---
'@k8o/arte-odyssey': patch
---

`apps/docs/src/pages/home.tsx` の `Button.renderItem` 内 `className` 代入で `typescript-eslint/no-unsafe-assignment` が偽陽性を出していたため、`oxlint-disable-next-line` で個別抑制した。

`Button.renderItem` 引数の `className` は `string` 型に正しく型付けされているが、oxlint の型推論が分割代入引数を `any` として扱うため発生していた。`@oxlint/plugins` の更新で顕在化したもので、実装の挙動には影響しない。
