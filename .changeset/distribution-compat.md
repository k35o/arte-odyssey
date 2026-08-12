---
'@k8o/arte-odyssey': patch
---

パッケージ配布の互換性を修正しました。

- `typescript` / `tailwindcss` / `@types/react` / `@types/react-dom` の peer 依存を optional にしました。npm v7+ は peer 範囲をインストール時に強制するため、JS のみ・Tailwind 非使用の利用者で `npm install` が失敗していました。
- `exports` の全エントリに `default` 条件を追加（従来は `import` のみ）。`require(ESM)` 対応の Node.js や `import` 以外の条件で解決するツールから `ERR_PACKAGE_PATH_NOT_EXPORTED` にならず利用できます。
- ランタイム依存（`clsx` / `lucide-react` / `tailwind-merge`）を exact 固定から caret 範囲に変更し、利用側アプリの同一ライブラリと dedupe できるようにしました。
- npm パッケージに `LICENSE` を同梱し、`homepage`（https://arte-odyssey.k8o.me）を追加。
