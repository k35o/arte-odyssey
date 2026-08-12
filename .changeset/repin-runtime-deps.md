---
'@k8o/arte-odyssey': patch
---

ランタイム依存（`clsx` / `lucide-react` / `tailwind-merge`）を exact 固定に戻しました。caret 範囲は Renovate の運用方針（rangeStrategy: pin）と衝突し、未検証バージョンが利用者環境に混入しうるためです。二重バンドルの懸念が最も大きかった motion は依存ごと削除済みです。
