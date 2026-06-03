---
'@k8o/arte-odyssey': minor
---

`Tabs.Root` now accepts a controlled `selectedId` / `onChange` pair (via `useControllableState`), matching the form components' controlled pattern. The `DebouncedAction` callback type is now exported from the package root, and the `json-render` `Pagination` schema gains a bindable `defaultPage` so its `$bindState` contract works.

Accessibility: interactive elements that used `focus-visible:outline-none` now use `outline-hidden`, preserving the focus affordance under forced-colors / high-contrast mode. `CheckboxGroup`'s `required` prop is now reflected as `aria-required`.

Internally, the generative-UI integration schemas are deduplicated and gain a compile-time guard that fails the build when a component prop enum widens without the integration following, the json-render registry bindings are consolidated, and shared focus-ring / gap styles are centralized.
