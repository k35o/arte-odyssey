---
'@k8o/arte-odyssey': patch
---

dark モードの背景トークンを単調な「トーンの梯子」に再構成し、borderless な elevation 表現を成立させた。

| token | before | after |
| --- | --- | --- |
| `bg-surface` | `gray-900` (L=0.25) | `gray-950` (L=0.18) |
| `bg-subtle` | `gray-800`（`bg-base` と同値） | `gray-900` (L=0.25) |

- `bg-surface`（ページのキャンバス）を一段暗くし、`bg-base` のカードが border なしで浮く輝度差（ΔL 0.05→0.12）を確保した。Material 3 のトーンベース elevation と同じ原理。コンテンツが載る `bg-base` / `bg-raised` は dim トーンのまま変えない。
- dark の `bg-subtle` が `bg-base` と同値で、凹み（井戸・read-only・subtle hover）の表現が全て潰れていた欠陥を修正した。light の構造（base=white / subtle=gray-100）の鏡像になる。

これにより dark の背景階層は `surface (950) < subtle (900) < base (800) < raised (700)` の単調な梯子になる。
