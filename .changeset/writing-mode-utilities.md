---
'@k8o/arte-odyssey': minor
---

縦書き (vertical writing mode) を新しい特徴として追加。Tailwind の論理プロパティと組み合わせて、ライブラリ全体のコンポーネントが縦書き紙面でも自然に表示できるようにした。

## Tailwind utility と variant

- `@utility writing-h` — 横書き (`writing-mode: horizontal-tb`) に戻す
- `@utility writing-v` — 縦書き (`writing-mode: vertical-rl`) を適用し、`text-orientation`・`text-underline-position`・`line-break`・`word-break` の推奨初期値も設定する
- `@utility writing-sideways-rl` — 表組みなどブロック単位で 90° 横倒しにする
- `@custom-variant vertical` — `.writing-v` 子孫で活性化し、`.writing-h` 子孫では無効化する variant。横書きデフォルトに対する上書きを宣言的に書ける

```tsx
<div className="writing-v">
  <p className="my-4 vertical:my-0" />
</div>
```

## コンポーネントの縦書き対応

- **Accordion**: chevron を 90° 回転、item を block-axis に伸ばし、区切り線を border-left に切り替え
- **Code**: 縦書きでは inline 表示に変えてカラースウォッチ周りの不自然な改行を解消
- **Table**: `sideways-rl` で 90° 横倒しの島として描画。行/caption の区切り線も論理に
- **Progress**: 論理サイズで両モード対応 (縦書きでは縦長 bar)
- **Separator**: `orientation` を論理向きの意味に変更し、寸法も `block-*` / `inline-*` で書き直し。`Horizontal` story を `Block`, `Vertical` story を `Inline` にリネーム
- **Breadcrumb / Pagination**: 進行方向の chevron を 90° 回転
- **Tabs**: 選択 indicator と List separator を block-end に配置 (横書きで下、縦書きで左)
- **Modal (center)**: 寸法を論理プロパティに置き換え、両モードで自然なアスペクト比
- **Drawer**: header+content の縦並びを両モードで維持
- **Popover** (および ListBox / DropdownMenu): portaled content に trigger の writing-mode を伝搬し、縦書き内でも variant が効く
- **Form 系** (TextField / Textarea / NumberField / PasswordInput / Select / Slider / Switch / Autocomplete / CheckboxCard / RadioCard): `inline-size` / `block-size` を中心にした論理サイズへ移行
- **Button**: `fullWidth` が縦書きでは content fit になるよう調整
- **RadioCard**: writing-mode を実行時に取得して、`vertical-rl` のとき左右キーの forward/backward を反転
- **Tabs**: `aria-orientation` を writing-mode から導出し、縦書きでは上下キー、横書きでは左右キーでタブ移動

## Hook

- `useWritingMode(ref)` を追加。要素の `writing-mode` を `'horizontal' | 'vertical'` で返し、`ResizeObserver` で writing-mode 切替も追従する。`useEffect` / `useLayoutEffect` を呼び出し側から消すためのプリミティブ。

## Storybook

- toolbar に「横書き / 縦書き」トグルを追加し、全 story を両モードで確認可能に
