---
'@k8o/arte-odyssey': patch
---

RSC の server 環境で `CheckboxGroup.Root` が undefined になり、server コンポーネントから使うと「Element type is invalid」で落ちるのを修正しました。合成モジュールが client モジュールの export（参照プロキシ）をスプレッドしており、`Root` がコピーされずに消えていたためで、`Accordion` などと同じ直接参照での合成に揃えています。公開 API は変わりません。
