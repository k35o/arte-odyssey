---
'@k8o/arte-odyssey': major
---

v12 監査の残り（語彙・型の不統一と内部実装の露出）を一括修正しました。

## 改名

| 旧 | 新 |
| --- | --- |
| `<Popover.Root type="menu">` | `role="menu"`（`'dialog' \| 'menu' \| 'listbox'`。role の意味なので `Modal.type`→`side` と同じ整理） |
| `useToast()` の `onOpen` / `onClose` / `onCloseAll` | `open` / `close` / `closeAll`（利用者が呼ぶ命令であって callback ではないため） |
| `<Card appearance="bordered">` | `variant="outline"`（Button / Badge の `variant` 語彙に整列。`shadow` はそのまま） |
| `<Table.Cell tone="muted">` | `color="mute"`（`tone` はステータス語彙に予約。強さの軸は `Separator.color` と同じ `color` + トークン綴りに統一） |
| `<Progress progress={n} maxProgress={m} minProgress={l}>` | `value` / `max` / `min`（`Slider` と同語彙） |
| `<DropdownMenu.Item onClick={fn}>` | `onAction={fn}`（`() => void`。Button / IconButton の action 語彙に整列。イベント引数は渡らなくなります） |
| `<Breadcrumb.Link component={Link}>` | `renderAnchor={({ href, className, children }) => …}`（`Anchor.renderAnchor` と同じ render prop 形式） |
| `Anchor` の `renderAnchor` に渡る `type: 'internal' \| 'external'` | `kind`（HTML 属性でも role でもないため） |
| `<CheckboxGroup>` 直接呼び出し | `<CheckboxGroup.Root>`（他の compound と同じ `.Root` 一択。自己参照エイリアスを削除） |

## 型が変わるもの

- **`Dialog.Root` の `role` が `'dialog' \| 'alertdialog'` の union になりました**（従来は素の `string`）。
- **`Badge` が `interactive` の判別 union になりました。** `interactive` 時は `ButtonHTMLAttributes`（`disabled` / `name` など）、非 interactive 時は `HTMLAttributes<HTMLSpanElement>` を受け付け、`span` に `onClick` だけ渡すような組み合わせは型エラーになります。`type` 属性は内部で `"button"` 固定のため受け付けません。
- **`DropdownMenu.Item` / `SubMenu` の `index` prop が公開型から消えました。** `Content` の `cloneWithIndex` が注入する内部実装で、利用者が渡しても無視されていました。
- **`useOpenContext` のルート export を削除しました。** ドキュメント未掲載の内部フックです。

## 対応不要と結論づけたもの

- `ListBox.Root` の `onChange(value)`: フォーム系の「主状態を `onChange` で通知する」規約どおり（開閉は主状態ではない）。
- `ListBox.Trigger` の `label` が任意: 未指定時は選択値がアクセシブル名になる意図的な設計。
- `ToastProvider` の `portalRef` / `position`: Modal 内部用に見えるが、トーストの表示位置を変える公開機能としてドキュメント化済み。
