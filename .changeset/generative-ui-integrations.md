---
'@k8o/arte-odyssey': major
---

Generative UI 統合（json-render / OpenUI）の公式アダプタを追加した。LLM が ArteOdyssey のコンポーネントで UI を生成できるよう、props を Zod + デザイントークンの enum に制約したカタログ/ライブラリを同梱する。

## 追加した subpath export

| export | 種別 | 内容 |
| --- | --- | --- |
| `@k8o/arte-odyssey/json-render` | サーバー安全 | `catalog`（スキーマ + `prompt()`） |
| `@k8o/arte-odyssey/json-render/registry` | `'use client'` | `registry`（描画） |
| `@k8o/arte-odyssey/openui` | `'use client'` | `library`（描画） |

依存（json-render / OpenUI / zod）は **optional peerDependencies** なので、統合を使う利用者だけが追加すればよい。

## 特徴

- **RSC 対応**: json-render はカタログ（スキーマ/プロンプト）と registry（描画）を分離し、catalog をサーバーコンポーネントから `catalog.prompt()` で利用できる。Next.js App Router で検証済み。
- **render props の橋渡し**: `Button` の `renderItem` などの関数 prop はアダプタ内部で組み立て、JSON/DSL には平たい値（`href` 等）だけを見せる。コンポーネント側は無改造。
- **トークン制約**: `gap` / `color` / `variant` などを enum で制約し、生成 UI がデザインシステムから外れないようにする。
- **対応コンポーネント（全47種）**: Stack, Card, InteractiveCard, Form, Modal, Dialog, Drawer, Popover, Tooltip, DropdownMenu, Toast, Button, IconButton, Badge, Heading, Anchor, Avatar, Code, Icon, Alert, Spinner, Progress, Skeleton, Separator, ScrollLinked, BaselineStatus, Tabs, Accordion, Breadcrumb, Table, TextField, Textarea, PasswordInput, NumberField, Slider, Checkbox, Switch, Select, Radio, RadioCard, CheckboxCard, Pagination, ListBox, CheckboxGroup, Autocomplete, FileField, FormControl。フォーム系は各フレームワークの状態機構（json-render: `useBoundProp` / OpenUI: `useStateField`）に接続。Tabs / Accordion / Table / Breadcrumb はデータ駆動。
- **オーバーレイの扱い**: Modal/Dialog/Drawer/Popover/Tooltip/DropdownMenu/Toast は「トリガーボタン＋コンテンツ」の **自己完結ウィジェット** として実装。`triggerLabel` を指定するだけで開閉ボタンが組み込まれ、children がサーフェス内に描画される。命令的な開閉制御を生成 UI から扱える形にした。

詳細は README の「Generative UI integrations」を参照。
