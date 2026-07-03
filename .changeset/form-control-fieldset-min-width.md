---
'@k8o/arte-odyssey': patch
---

FormControl: 狭い幅のコンテナで中身がはみ出す問題を修正

`<fieldset>` はブラウザ標準スタイルで `min-inline-size: min-content` を持つため、サイドバーやグリッドなど幅の狭いコンテナ内で `FormControl` を使うと、中身（例: Autocomplete の選択チップ）がコンテナからはみ出していました。fieldset に `min-w-0` を付与し、コンテナ幅に合わせて縮むようにしました。
