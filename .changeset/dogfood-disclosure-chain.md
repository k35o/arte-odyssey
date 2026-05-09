---
'@k8o/arte-odyssey': patch
---

`useDisclosure` フックを `Autocomplete` で適用した。`useState(false)` + `setOpen(true)`/`setOpen(false)` の手動open/close管理を `useDisclosure` の `isOpen`/`open`/`close` に置き換えた。

`chain` ヘルパーを `IconButton` の Tooltip トリガープロップ統合で適用した。`(e) => { triggerProps.onFoo(e); userOnFoo?.(e); }` の手動チェイニングを `chain(triggerProps.onFoo, userOnFoo)` で簡潔にした。
