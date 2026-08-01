---
'@k8o/arte-odyssey': patch
---

npm に同梱される `docs/references/components.md` の実装と食い違っていたコード例を修正しました。

- 存在しないアイコンを実在するものに差し替え（`XIcon` → `CloseIcon`、`HomeIcon` → `MailIcon`）。
- `FileField.Trigger` の例を children 形式から実装どおりの `renderItem` 形式に修正。
- `useToast().onOpen` に第 3 引数 `options?: { duration?, action? }` を追記。
