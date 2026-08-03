---
'@k8o/arte-odyssey': major
---

語彙を統一し、RadioCard を本物の `radiogroup` にし、文言を辞書化しました。

## 改名

| 旧                                                                              | 新                      |
| ------------------------------------------------------------------------------- | ----------------------- |
| `<Checkbox value={b}>` / `<Switch value={b}>` / `<CheckboxGroup.Item value={b}>` | `checked={b}`           |
| `<Modal type="center">`                                                         | `placement="center"`    |
| `<Button color="gray">`                                                         | `color="base"`          |
| `<Pagination onPageChange={fn}>`                                                | `onChange={fn}`         |
| `<ListBox.TriggerIcon>`                                                         | `<ListBox.IconTrigger>` |
| `ListBox` の options `{ key, label }`                                           | `{ value, label }`      |

値が `string[]` の `<CheckboxGroup value>`、`<CheckboxCard value>`、`<RadioCard value>` はそのままです。`Modal` の配置の値（`center` / `bottom` / `right` / `left`）も変わりません。

## 型・DOM が変わるもの

- **`RadioCard` が `input[type="radio"]` の `radiogroup` になりました。** props は変わりませんが、テストの `getByRole('button', { pressed })` は `getByRole('radio', { checked })` に、`getByRole('group')` は `getByRole('radiogroup')` に置き換えが必要です。ネイティブの radio group はグループ化に `name` が要るため、`name` 未指定でも `useId()` 由来のキーで選択値が送信されるようになります（旧実装は `name` 無しなら `FormData` に現れませんでした）。
- **`Button` / `IconButton` の props が `ButtonHTMLAttributes` になりました。** `HTMLProps`（= `AllHTMLAttributes`）だったので `href` / `src` なども型上は通っていました。実行時の挙動は変わらず、型だけが壊れます。
- **既定の文言がすべて日本語になりました。** `Spinner` の `Loading` は `読み込み中` になります。英語のままにするには辞書を渡してください。
- **生成 UI のスキーマが上記の改名に追随しました。** 保存済みの spec は `validateGeneratedSpec()` が旧 prop 名を未知のキーとして報告します（従来は無言で既定値に落ちていました）。

## 追加

- **フォーム系が `ref` を受け取れるようになりました。** 内部で ref を持つ `Textarea` / `FileField` は `mergeRefs` で合成します。
- **`TextField` が `type` を受け取れるようになりました**（`text` / `email` / `tel` / `url` / `search`）。
- **`Popover` / `DropdownMenu` / `Tooltip` が `isOpen` / `defaultOpen` / `onChange` に対応しました。**
- **`ListBox` が非制御でも使えるようになりました**（`defaultValue`）。`ListBox.Trigger` / `IconTrigger` の `label` でアクセシブル名を「値」ではなく「ラベル + 値」にできます。
- **`Modal` が `aria-label` / `aria-labelledby` を受け取れるようになりました。**
- **文言辞書を追加しました。** `@k8o/arte-odyssey/i18n` から `ja` / `en` と `Messages` 型を export します。

  ```tsx
  import { en } from '@k8o/arte-odyssey/i18n';

  <ArteOdysseyProvider messages={{ ...en, close: 'Dismiss' }}>{children}</ArteOdysseyProvider>;
  ```

  優先順位は「コンポーネントの prop > 辞書 > 既定」です。Provider を置かなければ日本語で動きます。

- **公開型をルートから export しました**（`Placement` / `Option` / `TooltipTriggerProps` / `RadioCardOption` / `Messages` など）。

## 挙動の改善（API は不変）

- **Toast**: 閉じたときにフォーカスを元の要素へ返します。上限を超えた古いトーストの追い出しは、ホバー中・フォーカス中は保留します。ライブリージョンの二重読み上げも解消しました。
- **Popover**: Escape がレイヤースタックの最も内側の 1 枚だけを閉じます。これまでは `IconButton` の数だけ window のリスナが積まれ、Escape 一発で開いているものが全部閉じていました。
- **Modal**: 名前の無い `dialog` が生まれる問題と、`Modal` 配下で role が二重に付く問題を解消しました。
- **ListBox**: `helpContent` を `role="listbox"` の外へ出し、`aria-required-children` 違反を解消しました（読み上げには `aria-describedby` で繋いでいます）。
