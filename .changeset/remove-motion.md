---
'@k8o/arte-odyssey': minor
---

motion（framer-motion）依存を完全に削除しました。Modal / Tabs / ScrollLinked のアニメーションを CSS に置き換え、どのコンポーネントを使ってもライブラリ由来で motion がバンドルされることはなくなりました。

- **Modal**: `@starting-style` + `transition-behavior: allow-discrete` + `overlay` による CSS transition に移行。これまで実装されていながら再生されていなかった**退場アニメーションが実際に動くようになりました**（backdrop のフェード込み）。`overlay` 未対応ブラウザ（Safari / Firefox）は `@supports` で退場を即時に切り替え、位置ずれしたゴーストが残らないようにしています（入場アニメーションは全対応ブラウザで動作）
- **Tabs**: 選択インジケータを CSS Anchor Positioning（`anchor-name` + `inset` の transition）によるスライドに移行。Popover と同じプラットフォーム依存で、未対応ブラウザでは選択タブの静的な下線に劣化します。`anchor-scope` で複数 React ルート間の名前衝突も防いでいます
- **ScrollLinked**: CSS scroll-driven animations（`animation-timeline: scroll(root)`）に移行。未対応ブラウザ（Firefox）と `container` 指定時は scroll リスナー + ResizeObserver で同じ見た目を再現します。バーに `aria-hidden` を付与しました
- `prefers-reduced-motion` は CSS メディアクエリで尊重します。従来の `MotionConfig reducedMotion="user"`（transform 系のみ無効化）より保守的に、Modal は退場含め遷移を完全に無効化します

公開 API の変更はありません。
