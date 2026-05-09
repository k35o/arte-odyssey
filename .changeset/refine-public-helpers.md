---
'@k8o/arte-odyssey': major
---

公開している Helpers を整理し、UIライブラリとして必要な5つに絞った。

新しい公開 Helpers:

- `cn` (既存) — clsx + tailwind-merge ラッパー
- `mergeRefs` (新規公開) — 複数のrefを1つの要素に結合する
- `mergeProps` (新規) — className/style/イベントハンドラを適切にマージしながら複数のpropsを合成する
- `chain` (新規) — 複数の関数を順番に呼び出す関数を作る
- `createSafeContext` (新規) — Provider外でアクセスされた場合に明確にthrowするContextを作成する

廃止または非公開化した Helpers:

- `between` → 内部実装 (`src/internal/clamp.ts`) として `clamp` にリネーム
- `findAllColors` → Code コンポーネント内部に colocate
- `isInternalRoute` → Anchor 内にインライン化
- `cast` → NumberField コンポーネント内部に colocate
- `toPrecision` → 内部実装 (`src/internal/`) に移動
- `uuidV4` → `crypto.randomUUID()` 直接利用に置換、削除
- `commalize` → 利用箇所がないため削除

これらを `@k8o/arte-odyssey` から直接 import している場合は、自プロジェクトに移すか標準API・他ライブラリへ置き換える必要がある。
