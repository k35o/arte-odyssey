---
'@k8o/arte-odyssey': patch
---

Release pipeline を pnpm v11 ネイティブ publish に移行し、CI を供給網的に固めた。

- pnpm を 10.33.2 -> 11.0.4 に更新したことで、`changeset publish` が呼ぶ `pnpm publish` が v11 のネイティブ実装に切り替わった（npm CLI への委譲が廃止）
- `.github/workflows/release.yml` から `npm install -g npm@latest` を削除した。バージョン未固定の `@latest` を CI のたびに取得する挙動は `pnpm-workspace.yaml#minimumReleaseAge: 10080`（7日）など他の供給網保護方針と矛盾するため
- 残りの `npm info` / `npm profile get` 呼び出しは Node.js 24.15.0 同梱の npm 11.12.1 で動作する

公開 API の変更はなく、library 利用者側で必要な対応はない。
