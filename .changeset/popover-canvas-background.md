---
'@k8o/arte-odyssey': patch
---

fix: Tooltip / DropdownMenu / ListBox の背景に UA 既定の白い矩形が出る不具合を修正

Popover API 化で content ラッパーが `[popover]` 要素になり、UA 既定の
`background-color: Canvas`（OS のカラースキームに追従し、アプリの `.dark` と一致しない）/
`border: solid` / `padding: 0.25em` が残っていた。内側の角丸ボックスの背後に白い枠付きの
矩形が透けて見えていたため、位置決め用ラッパーの背景・枠・余白を打ち消して透明にした。
見た目（背景・余白・角丸）は内側の renderItem 側が持つため影響はない。
