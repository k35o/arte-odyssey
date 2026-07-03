---
'@k8o/arte-odyssey': patch
---

ダークモードのオーバーレイ背景（`bg-raised`）を gray-700 から gray-800 に変更

ダークモードの `--bg-raised` は gray-700（明度 0.42）で、Modal / Popover / DropdownMenu などのオーバーレイがほぼ黒の背景の上で白っぽく浮いて見えていました。ライトモードの raised が base と同じ white で影によって分離しているのと同様に、ダークモードも `bg-base` と同じ gray-800（明度 0.3）にして、影で分離する構成に揃えました。ライトモードは変更ありません。
