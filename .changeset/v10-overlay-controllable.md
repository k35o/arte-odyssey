---
"@k8o/arte-odyssey": major
---

オーバーレイ／開閉系コンポーネントの controllable パターンを統一（`Modal` / `Tabs` に `Drawer` / `Accordion.Item` を揃える）。

**BREAKING**:

- `Drawer`: `isOpen`（必須）+ `onClose`（必須）の full controlled から、`isOpen?` + `defaultOpen?` + `onClose?` の controllable に変更。`isOpen` を渡さなければ `defaultOpen` による uncontrolled 動作になる。閉じるボタンは内部で `<dialog>.close()` を呼ぶため、controlled / uncontrolled の双方で動作する。

```tsx
// v9: isOpen が必須（uncontrolled 不可）
<Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>

// v10: uncontrolled も可。controlled は従来どおり動作
<Drawer defaultOpen title="...">...</Drawer>
<Drawer isOpen={open} onClose={() => setOpen(false)} title="...">...</Drawer>
```

**追加（非破壊）**:

- `Accordion.Item` を controllable 化。従来の `defaultOpen?`（uncontrolled）に加え、`isOpen?` + `onChange?: (isOpen: boolean) => void` で制御可能になった。

開閉状態の命名は「真偽の状態 = `isOpen` / 初期値 = `defaultOpen`」で全オーバーレイ横断に統一（`packages/arte-odyssey/CLAUDE.md` の命名規約に準拠）。
