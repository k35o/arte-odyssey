---
'@k8o/arte-odyssey': patch
---

`Modal` 内で `Popover` / `DropdownMenu` / `ListBox` / `Tooltip` を使うと、それらの `FloatingPortal` が `document.body` 直下に portal されるため `<dialog>` の top-layer に隠れて見えない問題を修正した。

`Modal` が children を `PortalRootProvider` で自動ラップし、dialog 要素を portal root として配信するようにした。これにより `Modal` 内の Popover 系コンポーネントは何も書かずとも dialog の top-layer に乗って表示される。

これまで動作させるには手動で `<PortalRootProvider value={dialogRef}>` を書く必要があったが、その workaround は不要になる(残してあっても上書きされるだけで害はない)。
