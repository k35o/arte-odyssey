---
'@k8o/arte-odyssey': patch
---

RSC の server 環境で `Breadcrumb.List` などが undefined になり、server コンポーネントから使うと「Element type is invalid」で落ちるのを修正しました。v12 で nav ラベルを辞書化するために `useMessages()` を使い、`breadcrumb.tsx` が client モジュールになった結果、その中で合成していた `Breadcrumb` オブジェクトが参照プロキシになりプロパティを引けなくなっていました。`CheckboxGroup` と同じく、パーツを個別に export して client でない `index.ts` 側で合成します。公開 API は変わりません。

あわせて、`'use client'` モジュール内で合成された複合コンポーネントが増えないことを検証するテストを追加しました。v12 以前から同じ形の 11 件（`Dialog` / `Tabs` / `Tooltip` など）は、個別に検証しながら順次移すため既知として許容リストに載せています。
