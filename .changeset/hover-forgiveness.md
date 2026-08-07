---
'@k8o/arte-odyssey': minor
---

hover 操作を寛容にしました。

**DropdownMenu.SubMenu（新規）**

- hover / クリック / キーボード（Enter・Space・→ で開き、← / Escape で戻る）で開くネストサブメニュー
- ポインタ位置とサブメニューの手前側 2 角を結ぶ safe triangle により、サブメニューへ斜めに移動しても途中の兄弟項目で閉じません
- hover で開いたときはフォーカスを奪わず、キーボードで開いたときだけ先頭項目へフォーカスします

**Tooltip の hover 寛容化**

- `Tooltip.Root` に `openDelay`（既定 0）/ `closeDelay`（既定 150ms）を追加。trigger から外れても猶予内に content へ入れば表示が維持されます
- trigger と content の 8px の隙間を透明ブリッジ（trigger 幅と content 幅の 2 枚)で覆い、ポインタで渡れるようにしました（WCAG 1.4.13 Hoverable 対応）
