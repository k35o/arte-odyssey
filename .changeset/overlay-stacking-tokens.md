---
'@k8o/arte-odyssey': minor
---

オーバーレイ系コンポーネントの重なり順を司る z-index デザイントークンを追加した。これまで `Toast` が `z-50` を直接指定していたほかは z-index の管理が無く、複数のオーバーレイを混在させた際の重なり順が暗黙的だった。

3 層スケールで整理した:

- `z-overlay` (1000) — `Popover` / `DropdownMenu` / `ListBox` / `Tooltip` (trigger に紐付く浮遊 UI)
- `z-modal` (1300) — `Modal` / `Drawer` (`<dialog>` top-layer により実質はネイティブ制御だが、stacking context を持つ非ネイティブ実装に切り替えても破綻しないよう明示)
- `z-toast` (1500) — `Toast` (モーダルや浮遊 UI より上に必ず表示される)

公開 API:

- `@k8o/arte-odyssey/tokens` から `Z_INDICES` を export
- スタイルシートに CSS 変数 `--z-overlay` / `--z-modal` / `--z-toast` と Tailwind ユーティリティ `z-overlay` / `z-modal` / `z-toast` を追加
