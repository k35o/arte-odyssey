---
'@k8o/arte-odyssey': patch
---

リポジトリ名を `k35o/ArteOdyssey` から `k35o/arte-odyssey` に変更したことに伴い、パッケージメタデータを追従させた。

- `packages/arte-odyssey/package.json` の `bugs.url` と `repository.url` を新リポジトリ URL に更新
- `.changeset/config.json` の `repo` を更新（今後の CHANGELOG 生成リンクが新URLになる）
- ルート `package.json` の `repository.url` を更新

GitHub のリダイレクトで旧URLは当面動くが、npm 上の "Bug Reports" / "Repository" リンクを新URLに正すため publish に反映する。公開 API・実装の変更はない。
