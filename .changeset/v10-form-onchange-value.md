---
"@k8o/arte-odyssey": major
---

フォームコンポーネントの `onChange` を値型シグネチャに統一。イベント型と値型の混在、`ListBox` の `onSelect` 別名を解消した。第1引数を「その要素の意味的な値」とし、実 `<input>` を持つコンポーネントは第2引数で本物の DOM イベントも渡す。

**BREAKING**:

- `Checkbox` / `Switch`: `ChangeEventHandler<HTMLInputElement>` → `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void`
- `Radio`: `ChangeEventHandler<HTMLInputElement>` → `(value: string, event: ChangeEvent<HTMLInputElement>) => void`
- `RadioCard`: `ChangeEventHandler<HTMLInputElement>` → `(value: string) => void`（`<button>` 駆動で change イベントが存在しないため値のみ）
- `FileField`: `ChangeEventHandler<HTMLInputElement>` → `(files: FileList | null, event?: ChangeEvent<HTMLInputElement>) => void`（プログラム的なファイル削除時は `event` が `undefined`）
- `ListBox.Root`: `onSelect` を `onChange: (key: string) => void` にリネーム

`Slider` / `NumberField` / `Autocomplete` / `CheckboxCard` / `CheckboxGroup` / `Tabs` は既に値型のため変更なし。`TextField` / `Textarea` / `Select` / `PasswordInput` はネイティブ `<input>` 互換のため従来どおりイベント型 `onChange` を維持する。

> 値だけ使う場合は第1引数のみ受け取れば良い（`(value) => void` は `(value, event) => void` に代入可能）。`preventDefault` や `currentTarget` 等が必要なときは第2引数の本物の DOM イベントを使う。

```tsx
// v9
<Checkbox onChange={(e) => setChecked(e.target.checked)} />
// v10（値だけ / イベントも）
<Checkbox onChange={(checked) => setChecked(checked)} />
<Checkbox onChange={(checked, event) => { event.stopPropagation(); setChecked(checked); }} />

// v9
<ListBox.Root onSelect={(key) => setKey(key)} options={options} value={value}>
// v10
<ListBox.Root onChange={(key) => setKey(key)} options={options} value={value}>
```
