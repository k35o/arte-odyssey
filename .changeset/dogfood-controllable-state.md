---
'@k8o/arte-odyssey': patch
---

`useControllableState` フックを内部のフォーム系コンポーネントで dogfood 適用した。各コンポーネントが手書きで持っていた `isControlled = value !== undefined` + `useState` + 条件分岐 + `onChange` 呼び出しの定型コードを削減した。

対象: `Switch` / `Checkbox` / `Radio` / `RadioCard` / `CheckboxCard` / `NumberField`
