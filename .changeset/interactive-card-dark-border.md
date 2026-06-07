---
'@k8o/arte-odyssey': patch
---

`InteractiveCard` の `appearance="shadow"`（デフォルト）に、`Card` と同じ dark モード用 subtle border を追加した。

dim-dark-mode の対応で `Card` には dark モード時に `border-border-subtle` の薄いボーダーを出す調整を入れたが、同じ `shadow-sm` を使う `InteractiveCard` は対象から漏れていた。そのため dark モードでは `InteractiveCard` だけ shadow がほぼ視認できず、カードが浮かない不整合が生じていた。

`Card` と同様に常時 `border border-transparent` を出して light モードのレイアウトを維持しつつ、dark モードのみ `border-border-subtle` を可視化する。light モードの見た目は変わらない。
