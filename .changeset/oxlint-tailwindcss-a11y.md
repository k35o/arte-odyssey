---
'@k8o/arte-odyssey': patch
---

Accessibility: `Autocomplete` now exposes its dropdown as a proper `listbox` with `option` items (`aria-selected` reflects each selection), and `CheckboxCard` associates every control with its visible label via `aria-labelledby`. `Anchor`'s default `renderAnchor` is now a stable module-level reference so it is not re-created on each render.
