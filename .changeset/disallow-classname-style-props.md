---
'@k8o/arte-odyssey': major
---

全コンポーネントで `className` と `style` プロップを受け取れないようにした。

スタイルはコンポーネント内部の実装に閉じ、外部からのオーバーライド経路を廃止する。Tailwind の utility class を渡してデザインを上書きする使い方ができなくなるため、利用側の影響範囲は大きい。

対象コンポーネント:

- Buttons: `Button`, `IconButton`
- Data Display: `Card`, `InteractiveCard`, `Badge`, `Avatar`, `Heading`, `Code`, `Table.*`
- Feedback: `Alert`, `Progress`, `Skeleton`, `Spinner`
- Form: `Form`, `TextField`, `Textarea`, `Select`, `PasswordInput`, `Checkbox`, `Radio`, `Switch`, `NumberField`, `Slider`, `Autocomplete`, `FileField`, `CheckboxCard`, `RadioCard`, `CheckboxGroup`
- Layout: `Separator`
- Navigation: `Anchor`

`Table.Root` の `className` / `containerClassName` プロップも併せて削除した。
