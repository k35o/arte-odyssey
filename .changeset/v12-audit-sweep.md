---
'@k8o/arte-odyssey': major
---

v12 監査で見つかった「後から非破壊では直せない」取りこぼしを一括修正しました。

## 破壊的変更

- **`Heading` の `type` を `level` に改名しました。** 生成 UI スキーマは以前から `level` で、ライブラリ本体だけ旧名のままでした。
- **生成 UI スキーマから `text` キーを廃止し、語彙を統一しました。** `Heading` / `Anchor` は `label`、`Tooltip` は `triggerLabel`（トリガー文言）+ `content`（本体）になります（`label` = 可視テキスト、`triggerLabel` = トリガー文言、`content` = 本体、という既存語彙に整列）。旧キーの保存済み spec は `validateGeneratedSpec()` が未知のキーとして報告します。
- **`RadioCard` が先頭オプションを自動選択しなくなりました。** `defaultValue` 未指定の非制御では未選択で開始し、`Radio` / `CheckboxCard` と対称になります（非制御フォームの送信値が変わります）。生成 UI（json-render / OpenUI）のフォーム状態は従来どおり `defaultValue ?? 先頭オプション` で初期化します（生成フォームでは Radio とも対称の既定です）。
- **`Messages` 型に `tabList` / `fileFieldTrigger` が増えました。** 生成 UI のタブリストのアクセシブル名とファイル選択ボタンの文言が辞書経由になります（従来は日本語ハードコードで、英語辞書でも日本語のままでした）。辞書を型注釈付きで全置換している場合はキーを追加してください。

## 追加

- **`Radio` が `ref`（`Ref<HTMLDivElement>`）を受け取れるようになりました。**「フォーム系が ref を受け取れる」対応の唯一の漏れでした。
- **公開 API が参照していた未公開の型を export しました**: `ToastOptions` / `ToastAction`（`useToast().onOpen` の第3引数）、`GapSize` / `PaddingSize`（`Stack` / `Grid`）、`CellAlign`（`Table`）、`BaseIconProps` / `IconRenderProps`（アイコン・`Logo`）。
- **`useMessages()` を `@k8o/arte-odyssey/i18n` から export しました。** ライブラリの文言（`close` など）を、上に重ねる自作 UI からも参照できます。
