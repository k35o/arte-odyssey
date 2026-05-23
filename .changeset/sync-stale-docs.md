---
'@k8o/arte-odyssey': patch
---

npm パッケージに同梱されるドキュメントを実装に追従させた。

`packages/arte-odyssey/docs/GUIDE.md` および `references/components.md` から、すでに削除済みの `LinkButton` / `IconLink` の記述を除去し、代わりに `Button` / `IconButton` の `renderItem` prop でリンク化するパターンを記載した。`references/hooks.md` には `useWritingMode` の説明を追加した。

`README.md` のコンポーネント一覧・カスタムフック一覧も、実際の export と一致するよう全面的に書き直した（`Pagination` / `Switch` / `CheckboxGroup` / `PasswordInput` / `Badge` / `Spinner` / `Skeleton` / `Table` / `Avatar` / `Heading` / `PortalRootProvider` などを追加、`useBreakpoint` / `useControllableState` / `useDebouncedTransition` / `useDeferredDebounce` / `useDisclosure` / `useHover` / `useIntersectionObserver` / `useInView` / `useScrollLock` / `useSessionStorage` / `useWritingMode` を追加）。

実装変更は含まないが、AI コーディングアシスタント向けのガイドが npm パッケージに同梱されているため patch として扱う。
