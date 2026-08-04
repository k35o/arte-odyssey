---
'@k8o/arte-odyssey': major
---

グループ入力とフィールドラッパーのアクセシブルネームを整理しました。

**CheckboxGroup（破壊的変更）**

- `aria-labelledby` を必須にしました。`RadioCard` / `CheckboxCard` / `Radio` と同じく、グループ名を指す要素の id を渡してください。
- `required` prop を削除しました。`role="group"`（`fieldset` の暗黙ロール）は `aria-required` を許可しておらず、axe の `aria-allowed-attr` に引っかかります。必須であることは、`aria-labelledby` の参照先ラベル（`FormControl` の必須表示など）に含めて伝えてください。

```tsx
<p id="interests-label">興味のある分野</p>
<CheckboxGroup aria-labelledby="interests-label" name="interests" ...>
```

生成 UI（json-render / OpenUI）の `CheckboxGroup` にはグループ名用の `label` を追加しました（キーは末尾に追加）。

**FormControl（破壊的変更）**

`labelAs="label"`（既定）のラッパーを `<fieldset>` から `<div>` に変更しました。従来は 1 フィールド包むだけで名前の無い `role="group"` が生まれ、全フォーム部品にそれが付いていました。`labelAs="legend"` は従来どおり `<fieldset>` + `<legend>` です。DOM 構造に依存したスタイル・テストがある場合は追随してください。
