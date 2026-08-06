---
'@k8o/arte-odyssey': patch
---

コンポーネントの props を型から生成し、ドキュメントの三重手書きをやめました。

- `scripts/extract-props.ts` が TypeScript の型チェッカーで全 export の props を解決し、`docs/props.generated.json` を生成します（150 コンポーネント）。宣言の書き方（名前付き `Props` / インライン `FC<{…}>` / controlled・uncontrolled の union / `Object.assign` の複合）に依存しません。
- 生成物を `@k8o/arte-odyssey/props.json` として公開。エージェントやツールが props を機械可読に引けます。
- `docs/references/components.md` の props ブロックと、ドキュメントサイトの props 表を生成に切り替え。サイト側で手書きしていた 1000 行超を削除しました。散文とコード例は引き続き手書きです。
- CI に `check:props` を追加。型と生成物がずれたらビルドが落ちます。

あわせてドキュメントの実装とのずれを修正しました。

- コンパイルできなかったコード例: `<Badge text=…>` → `label`、`<Modal placement=…>` → `side`、`<DropdownMenu.Trigger text=…>` → `label`。
- `useToast().onOpen` の型（第 3 引数 `options` の欠落、`status` → `tone`）。
- 未掲載だった `Form` / `Grid` / `Stack` / `ToastProvider` を追加し、props ブロックの無かった 46 件を埋めました。
- `Badge` の `size` に `'lg'` が載っていなかったなど、生成に切り替えたことで解消した表記ゆれ多数。
