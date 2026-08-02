---
'@k8o/arte-odyssey': major
---

語彙を統一し、RadioCard を本物の `radiogroup` にし、文言を辞書化しました。破壊的変更のうち機械的に直せるものは codemod で書き換えられます。

## 移行

プロジェクトのルートで 1 コマンド。ast-grep のルールを流し込むだけで、ダウンロードしたものが実行されることはありません。

```sh
npx --yes --package @ast-grep/cli@0.45.0 -- ast-grep scan --update-all \
  --inline-rules "$(curl -fsSL https://raw.githubusercontent.com/k35o/arte-odyssey/main/codemods/rules/v12.yml)" \
  src
```

そのあと型チェックを走らせてください。codemod が届かない変更は、すべて v12 では型エラーになるように設計しています。ルールは JSX の要素名で絞ってあるので、`Heading` / `Button` / `Popover` の `type` や Tailwind の `gray` といった同名の別物は書き換わりません。詳細と、codemod が「報告するだけ」にとどめる項目は [codemods/README.md](https://github.com/k35o/arte-odyssey/blob/main/codemods/README.md) にあります。

## 破壊的変更

**codemod が書き換えるもの**

| 旧                                                             | 新                    |
| -------------------------------------------------------------- | --------------------- |
| `<Checkbox value={b}>` / `<Switch value={b}>` / `<CheckboxGroup.Item value={b}>` | `checked={b}`         |
| `<Modal type="center">`                                        | `placement="center"`  |
| `<Button color="gray">`                                        | `color="base"`        |
| `<Pagination onPageChange={fn}>`                               | `onChange={fn}`       |
| `<ListBox.TriggerIcon>`                                        | `<ListBox.IconTrigger>` |

`Checkbox` / `Switch` が受け取るのは boolean なので、DOM 属性に合わせて `checked` に改名しました。値が `string[]` の `<CheckboxGroup value>`、`<CheckboxCard value>`、`<RadioCard value>` は**そのまま**です。`Modal` の配置の値（`center` / `bottom` / `right` / `left`）も変わりません。

**手で直すもの**

- **`ListBox` の選択肢が `{ key, label }` から `{ value, label }` になりました。** `Select` や `RadioCard` と同じ `Option` 型に揃えたためです。データの形の変更なので codemod では届きません（型が付いていれば型エラーになります）。`option.key` を読んでいる箇所も併せて改名してください。
- **`RadioCard` の DOM とロールが変わりました。** `button[aria-pressed]` の集まりから、`fieldset[role="radiogroup"]` の中に本物の `input[type="radio"]` を並べる形になり、矢印キーのローミングと単一選択をブラウザに任せられるようになりました。**props は変わりません**が、テストの `getByRole('button', { pressed })` は `getByRole('radio', { checked })` に、`getByRole('group')` は `getByRole('radiogroup')` に置き換えが必要です。CSS セレクタも同様です。
- **`Button` / `IconButton` の props が `ButtonHTMLAttributes` になりました。** これまでは `HTMLProps`（= `AllHTMLAttributes`）だったため、`<button>` が持たない `href` / `target` / `src` なども型上は通っていました。**実行時の挙動は変わらず、型だけが壊れます**。要素そのものを差し替えたい場合は `renderItem` で描画してください。
- **既定の文言がすべて日本語になりました。** 日英が混在していたものを揃えたためで、`Spinner` の `Loading` は `読み込み中` になります。英語のまま使うには辞書を渡してください。

  ```tsx
  import { en } from '@k8o/arte-odyssey/i18n';

  <ArteOdysseyProvider messages={en}>{children}</ArteOdysseyProvider>;
  ```

- **生成 UI のスキーマが上記の改名に追随しました。** 保存済みの spec は `validateGeneratedSpec()` が旧 prop 名を未知のキーとして報告します。再生成するか手で直してください。

なお `<Checkbox {...props} />` のように spread した props に旧名が含まれる場合と、別の場所で組み立てたオブジェクトを渡している場合は、静的には検出できないため codemod も型チェックも素通りします。

## 追加

- **フォーム系コンポーネントが `ref` を受け取れるようになりました。** 内部で ref を持つ `Textarea` / `FileField` は `mergeRefs` で合成するので、利用側の ref と両立します。
- **`TextField` が `type` を受け取れるようになりました**（既定は `"text"`）。パスワードは引き続き `PasswordInput` を使ってください（表示/非表示トグルが `type` を占有するため、`PasswordInput` は `type` を開放していません）。
- **`Popover` / `DropdownMenu` / `Tooltip` が `isOpen` / `defaultOpen` / `onChange` に対応しました。** controlled / uncontrolled のどちらでも書けます。
- **`ListBox.Trigger` / `ListBox.IconTrigger` に `label` を追加しました。** 渡すとトリガーのアクセシブル名が「ラベル + 現在値」になります。省略時は従来どおり現在値だけなので、周囲に見出しが無いときは渡してください。
- **`ListBox` が非制御でも使えるようになりました。** `value` / `onChange` が任意になり、`defaultValue` を渡せば選択状態はコンポーネント内部で保持されます。
- **`Modal` が `aria-label` / `aria-labelledby` を受け取れるようになりました。**
- **文言辞書を追加しました。** `@k8o/arte-odyssey/i18n` から `ja` / `en` と `Messages` 型を export します。`<ArteOdysseyProvider messages={...}>` に部分辞書を渡せば、渡したキーだけが差し替わります。優先順位は「コンポーネントの prop > 辞書 > 既定」です。
- **公開型をルートから export しました**（`Placement` / `Option` / `TooltipTriggerProps` / `RadioCardOption` / `Messages` など）。

## 挙動の改善（API は不変）

- **Toast**: 閉じたときにフォーカスを元の要素へ返すようにしました。上限を超えた古いトーストの追い出しは、ホバー中・フォーカス中は保留します。ライブリージョンが二重に読み上げられる問題も解消しました。
- **Popover**: Escape がレイヤースタックの**最も内側の 1 枚だけ**を閉じるようになりました。これまでは `IconButton` の数だけ window のリスナが積まれ、Escape 一発で開いているものが全部閉じていました。
- **Modal**: 名前の無い `dialog` が生まれる問題と、`Modal` 配下で role が二重に付く問題を解消しました。
- **ListBox**: `helpContent` を `role="listbox"` の外へ出し、`aria-required-children` 違反を解消しました。
