---
'@k8o/arte-odyssey': minor
---

Toast を刷新し、ライブラリの motion 依存を Provider から切り離しました。

**Toast の新機能**

- `onOpen(tone, message, options)` に第3引数 `options` を追加
  - `duration`: 自動クローズまでのミリ秒。`Number.POSITIVE_INFINITY` で自動クローズなし（既定 5000ms）
  - `action`: Alert と同じ `{ label, renderItem }` 形式のインラインアクション
- すべてのトーストに閉じるボタンが付き、手動で閉じられるようになりました
- ホバー中・フォーカス中は自動クローズのタイマーが一時停止します（WCAG 2.2.1 Timing Adjustable 対応）。再開時は残り時間から数えます
- 上限（5件）を超えたときは最古のトーストが閉じ演出つきで退避します

**motion 依存の縮小（バンドルサイズ）**

- トーストの出入りを CSS アニメーションに置き換え、`ToastProvider` から motion 依存を除去
- `ArteOdysseyProvider` から `MotionConfig` を外し、motion を使う各コンポーネント（Modal / Tabs / ScrollLinked）がローカルに `reducedMotion="user"` を設定するように変更

これにより、Modal / Tabs / ScrollLinked を使わないアプリのバンドルから motion のランタイム（数十KB gzip）が丸ごと外れます。既存の `onOpen(tone, message)` 呼び出しはそのまま動きます。
