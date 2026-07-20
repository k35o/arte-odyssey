---
'@k8o/arte-odyssey': major
---

**BREAKING**: `BaselineStatus` コンポーネントを削除しました。ランタイムで webstatus.dev を取得する実装だったため、対応状況の表示は各アプリ側で web-features 等のデータから構築する方針に変更します（ブラウザ別の表示には `ChromeIcon` 等のアイコンを利用できます）。
