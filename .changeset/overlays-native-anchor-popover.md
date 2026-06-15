---
'@k8o/arte-odyssey': minor
---

オーバーレイ系コンポーネント（Popover / Tooltip / DropdownMenu / ListBox / Autocomplete）の位置決め・操作レイヤを Web 標準へ移行し、`@floating-ui/react` 依存を撤去しました。

- **位置決め**: CSS Anchor Positioning（`anchor()` / `position-area` / `position-try-fallbacks` / `anchor-size()`）。スクロール追従や端での反転（flip）もネイティブで動作
- **トップレイヤー / dismiss**: Popover API（`popover` 属性 + top layer）
- **フォーカス管理 / リストのキーボード操作**: 自前フック（`useFocusTrap` / roving-tabindex）。縦書きでは矢印キーが書字方向に追従

公開 API（各コンポーネントの props）は変更ありません。

> **必要ブラウザ**: CSS Anchor Positioning と Popover API に対応した環境（目安: Chrome 125+ / Safari 26+ / Firefox 147+）。フォールバックは持たないため、これより古いブラウザでは位置決めが正しく動作しません。
