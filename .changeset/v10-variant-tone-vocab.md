---
"@k8o/arte-odyssey": major
---

`variant` / `size` / 色系 prop の語彙をコンポーネント横断で統一。

**BREAKING**:

- `Button` の `variant` を `'contained' | 'outlined' | 'skeleton'` → `'solid' | 'outline' | 'skeleton'` にリネーム（`Badge` の `solid` / `outline` に合わせる）。`DropdownMenu.Trigger` も連動。
- `IconButton` の色軸 prop を `bg` → `color` にリネーム（`Button` の `color` と prop 名を統一）。値は `'transparent' | 'base' | 'primary' | 'secondary'` のまま（背景の塗り方を表す）。
- `Alert` / `Toast` の `status` prop を `tone` にリネーム（`Badge` の `tone` に合わせて semantic status 色の prop 名を統一）。`useToast().onOpen(tone, message)` は位置引数のため呼び出し側は無変更。

**追加（非破壊）**:

- `Badge` に `size="lg"` を追加（`sm | md | lg` の標準スケールに揃える）。

```tsx
// v9 → v10
<Button variant="contained" /> → <Button variant="solid" />
<Button variant="outlined" /> → <Button variant="outline" />
<IconButton bg="base" label="..." /> → <IconButton color="base" label="..." />
<Alert status="success" message="..." /> → <Alert tone="success" message="..." />
```

> `AlertIcon` の `status`（表示するアイコンの種類を選ぶ軸）、`Button.color`（`primary | secondary | gray` のアクセント色）、`Separator.color` / `Table.tone`（装飾系）は意味が異なるため対象外。
