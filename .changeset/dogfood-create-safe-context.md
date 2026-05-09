---
'@k8o/arte-odyssey': patch
---

`createSafeContext` ヘルパーを内部のCompoundコンポーネントで dogfood 適用した。`createContext` + `use` + null チェックの定型コードを削減し、Provider外で利用された際のエラーメッセージを統一した。

対象: `FileField` / `Dialog` / `DropdownMenu` / `ListBox` / `Popover` / `Tabs` / `Toast` / `Accordion`
