---
"@k8o/arte-odyssey": major
---

依存・設定の前提を更新（v10 の締め）。

**BREAKING**: `peerDependencies.typescript` を `>=5.9.0` → `>=6.0.0` に引き上げ。型定義は TypeScript 6 系を前提とする。

- `peerDependencies.zod`（optional）を `>=4.0.0` → `>=4.4.0` に引き上げ（内部利用 API に合わせて SoT を統一）。
- ルート `tsconfig.json` に `forceConsistentCasingInFileNames: true` を追加（非破壊）。
- `engines.node` は `>=24.13.0` を維持。
