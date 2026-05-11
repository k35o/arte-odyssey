---
'@k8o/arte-odyssey': minor
---

縦書きモード用の Tailwind utility と variant を追加した。

- `@utility writing-h` — 横書き (`writing-mode: horizontal-tb`) に戻す
- `@utility writing-v` — 縦書き (`writing-mode: vertical-rl`) を適用し、`text-orientation`・`text-underline-position`・`line-break`・`word-break` の推奨初期値も設定する
- `@custom-variant vertical` — `.writing-v` 子孫で活性化し、`.writing-h` 子孫では無効化する variant。横書きデフォルトに対する上書きを宣言的に書ける

```tsx
<div className="writing-v">
  <p className="my-4 vertical:my-0" />
</div>
```
