---
"@k8o/arte-odyssey": patch
---

アイコンを lucide-react のバレル（巨大な再エクスポート）ではなく個別ファイルから import するようにした。バレル import は Vite dev サーバの事前バンドルで named export が undefined 化し、consumer 側でアイコンが描画時に落ちることがあったため、それを回避する（本番ビルドでは元から問題なし）。
