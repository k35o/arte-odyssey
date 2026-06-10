---
'@k8o/arte-odyssey': patch
---

InteractiveCard を Card の `interactive` prop に統合し、dark モード時の Card のデフォルト border を撤去した。

## InteractiveCard → `<Card interactive>`

InteractiveCard と Card の差分はホバー・アクティブ時のスケール変化（`hover:scale-[1.02]`, `active:scale-[0.98]`）のみだったため、`Table.Row` / `Badge` と同じ `interactive?: boolean` prop 方式に統合し、InteractiveCard を削除した。

```diff
- <InteractiveCard>
+ <Card interactive>
    ...
- </InteractiveCard>
+ </Card>
```

json-render / OpenUI の生成カタログからも `InteractiveCard` を削除した（`Card` の `interactive` prop で同じ表現が可能）。

## dark モードの Card border 撤去

dark の背景トークンの再構成（別 changeset: bg-surface=gray-950 / bg-base=gray-800）でカードと背景の輝度差だけで境界が成立するため、`appearance="shadow"` に付けていた dark 専用の `border-border-subtle` と、レイアウト維持用の transparent border を撤去した。`bg-base` と同色の背景に置く場合は `appearance="bordered"` を使うか、`bg-subtle` の井戸の上に置く。
