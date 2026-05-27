---
'@k8o/arte-odyssey': minor
---

dark モードを「Dim 寄り」に調整し、Card に dark 専用の subtle border を追加した。

## dark モードの色味調整

`tokens.ts` の semantic token (dark) を 1 段ずつ明るくシフトし、純黒に寄り過ぎていた dark モードを「長時間 UI を見ても疲れにくい Dim 寄り」のトーンに変更した。light モードや palette ファミリーには影響しない。

| token | before | after |
| --- | --- | --- |
| `bg-surface` | `gray-950` (L=0.18) | `gray-900` (L=0.25) |
| `bg-base` | `gray-900` (L=0.25) | `gray-800` (L=0.30) |
| `bg-raised` | `gray-800` (L=0.30) | `gray-700` (L=0.42) |

## Card に dark mode 用 subtle border

`appearance="shadow"` (デフォルト) の Card は `shadow-sm` で elevation を表現していたが、これは dark mode 下ではほぼ視認できない。dark mode のみ `border-border-subtle` の薄いボーダーを出すよう調整し、Dim 寄りで L 差が縮まったカードも自然に浮かぶようにした。

light mode の見た目に影響しないよう、常時 `border border-transparent` を出してレイアウトずれが起きないようにしてある。
