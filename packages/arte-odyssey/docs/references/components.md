# ArteOdyssey コンポーネント一覧

## インポート方法

```tsx
// スタイルシート（必須）
import '@k8o/arte-odyssey/styles.css';

// プロバイダー（アプリルートで1回）
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

// コンポーネント（すべてルートからインポート）
import { Button, Card, TextField } from '@k8o/arte-odyssey';
```

## ボタン・リンク

### Button

```tsx
import { Button } from '@k8o/arte-odyssey';

<Button
  size="sm" | "md" | "lg"
  color="primary" | "gray"
  variant="contained" | "outlined" | "skeleton"
  fullWidth={false}
  startIcon={<Icon />}
  endIcon={<Icon />}
  disabled={false}
  active={false}
>
  ボタン
</Button>
```

リンクとしてレンダーする場合は `renderItem` prop を使う。Next.js の `<Link>` などにも応用できる。

```tsx
<Button
  color="gray"
  variant="outlined"
  renderItem={({ className, children }) => (
    <a className={className} href="/page">
      {children}
    </a>
  )}
>
  リンク
</Button>
```

### IconButton

アイコンのみのボタン。`bg` prop でスタイルを制御。

```tsx
import { IconButton } from '@k8o/arte-odyssey';

<IconButton label="閉じる" bg="transparent" size="md">
  <XIcon />
</IconButton>;
```

Props:

- `bg`: `'transparent'` | `'base'` | `'primary'`（デフォルト: `'transparent'`）
- `size`: `'sm'` | `'md'` | `'lg'`
- `label`: string（必須、aria-label として使用）

リンクとしてレンダーする場合は `renderItem` prop を使う。`triggerProps` を `<a>` にスプレッドすると hover/focus 時に `label` が Tooltip として表示される。

```tsx
<IconButton
  bg="base"
  label="ホーム"
  renderItem={({
    className,
    children,
    'aria-label': ariaLabel,
    triggerProps,
  }) => (
    <a
      aria-label={ariaLabel}
      className={className}
      href="/home"
      {...triggerProps}
    >
      {children}
    </a>
  )}
>
  <HomeIcon />
</IconButton>
```

### Anchor

テキストリンク。外部リンクには自動で新規タブアイコンが付く。

```tsx
import { Anchor } from '@k8o/arte-odyssey';

<Anchor href="https://example.com">外部リンク</Anchor>
<Anchor href="/about">内部リンク</Anchor>
<Anchor href="/docs" openInNewTab>新規タブで開く</Anchor>
```

Props:

- `href`: string（必須）
- `openInNewTab`: boolean
- `renderAnchor`: カスタムリンクレンダラー（Next.js の Link 等）

## レイアウト・ナビゲーション

### Accordion

折りたたみ可能なセクション。Compound component パターン。

```tsx
import { Accordion } from '@k8o/arte-odyssey';

<Accordion.Root>
  <Accordion.Item>
    <Accordion.Button>セクション1</Accordion.Button>
    <Accordion.Panel>コンテンツ</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>;
```

### Breadcrumb

パンくずリスト。Compound component パターン。

```tsx
import { Breadcrumb } from '@k8o/arte-odyssey';

<Breadcrumb.List>
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">ホーム</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/products">製品</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/products/1" current>
      詳細
    </Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>;
```

Props (Breadcrumb.List):

- `size`: `'sm'` | `'md'` | `'lg'`

Props (Breadcrumb.Link):

- `href`: string
- `current`: boolean
- `component`: カスタムリンクコンポーネント

### Tabs

タブ切り替え。Compound component パターン。

```tsx
import { Tabs } from '@k8o/arte-odyssey';

<Tabs.Root ids={['tab1', 'tab2']}>
  <Tabs.List label="タブ">
    <Tabs.Tab id="tab1">タブ1</Tabs.Tab>
    <Tabs.Tab id="tab2">タブ2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">パネル1</Tabs.Panel>
  <Tabs.Panel id="tab2">パネル2</Tabs.Panel>
</Tabs.Root>;
```

Props (Tabs.Root):

- `ids`: `[string, ...string[]]`（必須）
- `defaultSelectedId`: string | null

### Card

コンテンツをグループ化するカード。

```tsx
import { Card } from '@k8o/arte-odyssey';

// 静的カード
<Card width="full" appearance="shadow">
  <div className="p-6">コンテンツ</div>
</Card>

// クリック可能なカード（hover:scale-[1.02], active:scale-[0.98]）
<Card appearance="bordered" interactive>
  <div className="p-6">コンテンツ</div>
</Card>
```

Props:

- `width`: `'full'` | `'fit'`
- `appearance`: `'shadow'` | `'bordered'`
- `interactive`: boolean

### Separator

区切り線。

```tsx
import { Separator } from '@k8o/arte-odyssey';

<Separator />
<Separator color="mute" />
<Separator color="subtle" />
<Separator orientation="vertical" />
```

### ScrollLinked

スクロール進捗をプログレスバーで表示。

```tsx
import { ScrollLinked } from '@k8o/arte-odyssey';

<ScrollLinked />
<ScrollLinked container={containerRef} />
```

## フォーム

フォームコンポーネントは `FormControl` の `renderInput` パターンと組み合わせて使用する。各フォームコンポーネントは controlled / uncontrolled の両方に対応。

### FormControl

フォームフィールドのラッパー。ラベル・ヘルプテキスト・エラー表示を統一する。

```tsx
import { FormControl, TextField } from '@k8o/arte-odyssey';

<FormControl
  label="メールアドレス"
  errorText="入力してください"
  helpText="会社のメールアドレスを入力してください"
  isRequired
  renderInput={(props) => (
    <TextField {...props} placeholder="example@mail.com" />
  )}
/>;
```

Props:

- `label`: string（必須）
- `labelAs`: `'label'` | `'legend'`
- `helpText`: string
- `errorText`: string
- `isDisabled`, `isInvalid`, `isRequired`: boolean

`renderInput` は `{ id, describedbyId, labelId, isDisabled, isInvalid, isRequired }` を受け取る。

### TextField

```tsx
import { TextField } from '@k8o/arte-odyssey';

// Uncontrolled
<TextField id="email" defaultValue="" placeholder="example@mail.com"
  isInvalid={false} isDisabled={false} isRequired={false} />

// Controlled
<TextField id="email" value={value} onChange={onChange}
  isInvalid={false} isDisabled={false} isRequired={false} />
```

### Textarea

```tsx
import { Textarea } from '@k8o/arte-odyssey';

<Textarea
  id="description"
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
/>;
```

### NumberField

```tsx
import { NumberField } from '@k8o/arte-odyssey';

<NumberField
  id="quantity"
  min={0}
  max={100}
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
/>;
```

### PasswordInput

パスワード入力。表示/非表示トグル付き。

```tsx
import { PasswordInput } from '@k8o/arte-odyssey';

<PasswordInput
  id="password"
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
  showLabel="表示"
  hideLabel="非表示"
/>;
```

### Select

```tsx
import { Select } from '@k8o/arte-odyssey';

<Select
  id="category"
  options={[
    { value: '1', label: 'オプション1' },
    { value: '2', label: 'オプション2' },
  ]}
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
/>;
```

### Autocomplete

```tsx
import { Autocomplete } from '@k8o/arte-odyssey';

<Autocomplete
  options={options}
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
/>;
```

### Checkbox

```tsx
import { Checkbox } from '@k8o/arte-odyssey';

// Controlled
<Checkbox value={checked} onChange={onChange}>
  同意する
</Checkbox>

// Uncontrolled
<Checkbox defaultChecked>
  同意する
</Checkbox>
```

### CheckboxGroup

複数チェックボックスのグループ。コンテキストで子の Checkbox と連携する。

```tsx
import { CheckboxGroup } from '@k8o/arte-odyssey';

<CheckboxGroup name="interests" isDisabled={false}>
  {/* 子の Checkbox は useCheckboxGroupContext() 経由でグループと連携 */}
</CheckboxGroup>;
```

### CheckboxCard

カードスタイルのチェックボックス。

```tsx
import { CheckboxCard } from '@k8o/arte-odyssey';

<CheckboxCard
  name="plan"
  isDisabled={false}
  options={[
    { value: 'basic', label: 'ベーシック', description: '月額980円' },
    {
      value: 'pro',
      label: 'プロ',
      description: '月額1,980円',
      visual: <Icon />,
    },
  ]}
  value={selected}
  onChange={onChange}
/>;
```

### Radio

```tsx
import { Radio } from '@k8o/arte-odyssey';

<Radio
  labelId="example-radio"
  name="example"
  onChange={onChange}
  options={[
    { value: 'a', label: '選択肢A' },
    { value: 'b', label: '選択肢B' },
  ]}
  value={value}
/>;
```

### RadioCard

カードスタイルのラジオボタン。

```tsx
import { RadioCard } from '@k8o/arte-odyssey';

<RadioCard
  labelId="plan-radio"
  name="plan"
  isDisabled={false}
  options={[
    { value: 'basic', label: 'ベーシック', description: '月額980円' },
    {
      value: 'pro',
      label: 'プロ',
      description: '月額1,980円',
      visual: <Icon />,
    },
  ]}
  value={value}
  onChange={onChange}
/>;
```

### Slider

レンジスライダー。

```tsx
import { Slider } from '@k8o/arte-odyssey';

<Slider
  min={0}
  max={100}
  step={1}
  value={value}
  onChange={onChange}
  isInvalid={false}
  isDisabled={false}
  isRequired={false}
/>;
```

### Switch

トグルスイッチ。

```tsx
import { Switch } from '@k8o/arte-odyssey';

<Switch
  label="通知を有効にする"
  value={checked}
  onChange={onChange}
  isDisabled={false}
  isInvalid={false}
  isRequired={false}
/>;
```

### FileField

コンポジットパターンのファイルアップロード。

```tsx
import { FileField } from '@k8o/arte-odyssey';

<FileField.Root accept="image/*" multiple maxFiles={5}>
  <FileField.Trigger>ファイルを選択</FileField.Trigger>
  <FileField.ItemList />
</FileField.Root>;
```

Props (Root):

- `accept`: string
- `multiple`: boolean
- `maxFiles`: number
- `isDisabled`, `isInvalid`, `isRequired`: boolean

## データ表示

### Heading

セマンティック見出し。`type` prop で HTML 要素を指定。

```tsx
import { Heading } from '@k8o/arte-odyssey';

<Heading type="h1">ページタイトル</Heading>
<Heading type="h2">セクション見出し</Heading>
<Heading type="h3">サブセクション</Heading>
```

Props:

- `type`: `'h1'` | `'h2'` | `'h3'` | `'h4'` | `'h5'` | `'h6'`（必須）
- `lineClamp`: number

### Avatar

ユーザーアバター。

```tsx
import { Avatar } from '@k8o/arte-odyssey';

<Avatar src="/avatar.jpg" alt="ユーザー名" size="md" />
<Avatar name="田中太郎" fallback="田" size="lg" />
```

Props:

- `src`: string
- `alt`: string
- `name`: string
- `fallback`: string
- `size`: `'sm'` | `'md'` | `'lg'`

### Badge

ステータスバッジ。

```tsx
import { Badge } from '@k8o/arte-odyssey';

<Badge text="新着" tone="info" variant="solid" />
<Badge text="完了" tone="success" variant="outline" />
<Badge text="フィルター" interactive />
```

Props:

- `text`: string（必須）
- `size`: `'sm'` | `'md'`
- `tone`: `'neutral'` | `'info'` | `'success'` | `'warning'` | `'error'`
- `variant`: `'solid'` | `'outline'`
- `interactive`: boolean（true でボタンとして描画）

### Code

インラインコード表示。

```tsx
import { Code } from '@k8o/arte-odyssey';

<Code>{`const x = 1;`}</Code>;
```

Props:

- `children`: string

### Table

データテーブル。Compound component パターン。

```tsx
import { Table } from '@k8o/arte-odyssey';

<Table.Root>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>名前</Table.HeaderCell>
      <Table.HeaderCell align="right">金額</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row interactive>
      <Table.Cell>商品A</Table.Cell>
      <Table.Cell align="right">¥1,000</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>;
```

## フィードバック

### Alert

```tsx
import { Alert } from '@k8o/arte-odyssey';

<Alert status="info" message="情報メッセージ" />
<Alert status="error" message={['エラー1', 'エラー2']} />
```

Props:

- `status`: `'info'` | `'success'` | `'warning'` | `'error'`
- `message`: `string | string[]`

### Toast

```tsx
import { useToast } from '@k8o/arte-odyssey';

const { onOpen, onClose, onCloseAll } = useToast();

onOpen('success', '保存しました');
onOpen('error', 'エラーが発生しました');
```

`ToastProvider` は `ArteOdysseyProvider` に含まれるため、別途ラップ不要。

- `onOpen`: `(status: Status, message: string) => void`
- `onClose`: `(id: string) => void`
- `onCloseAll`: `() => void`

### Progress

```tsx
import { Progress } from '@k8o/arte-odyssey';

<Progress progress={50} maxProgress={100} />
<Progress progress={50} maxProgress={100} minProgress={0} label="進捗" />
```

Props:

- `progress`: number
- `maxProgress`: number
- `minProgress`: number
- `label`: string

### Spinner

ローディングスピナー。

```tsx
import { Spinner } from '@k8o/arte-odyssey';

<Spinner size="md" label="読み込み中" />;
```

Props:

- `size`: `'sm'` | `'md'` | `'lg'`
- `label`: string

### Skeleton

コンテンツプレースホルダー。

```tsx
import { Skeleton } from '@k8o/arte-odyssey';

<Skeleton shape="rect" size="md" />
<Skeleton shape="circle" size="lg" />
<Skeleton shape="rect" size="sm" animate={false} />
```

Props:

- `shape`: `'rect'` | `'circle'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `animate`: boolean

## オーバーレイ

### Modal

ベースのオーバーレイコンポーネント。`<dialog>` 要素を使用。

```tsx
import { Modal } from '@k8o/arte-odyssey';

<Modal isOpen={open} onClose={onClose} type="center">
  コンテンツ
</Modal>;
```

Props:

- `type`: `'center'` | `'bottom'` | `'right'` | `'left'`
- `isOpen`: boolean
- `defaultOpen`: boolean
- `onClose`: () => void

### Dialog

Compound component パターン。Modal と組み合わせて使用。

```tsx
import { Modal, Dialog } from '@k8o/arte-odyssey';

<Modal isOpen={open} onClose={onClose}>
  <Dialog.Root>
    <Dialog.Header title="確認" onClose={onClose} />
    <Dialog.Content>コンテンツ</Dialog.Content>
  </Dialog.Root>
</Modal>;
```

### Drawer

サイドパネル。内部で Modal を使用。

```tsx
import { Drawer } from '@k8o/arte-odyssey';

<Drawer title="メニュー" isOpen={open} onClose={onClose} side="right">
  コンテンツ
</Drawer>;
```

Props:

- `title`: ReactNode
- `isOpen`: boolean
- `onClose`: () => void
- `side`: `'left'` | `'right'`（デフォルト: `'right'`）

### Popover

Floating UI ベースのポップオーバー。Compound component パターン。

```tsx
import { Popover } from '@k8o/arte-odyssey';

<Popover.Root placement="bottom">
  <Popover.Trigger renderItem={(props) => <Button {...props}>開く</Button>} />
  <Popover.Content
    renderItem={(props) => <div {...props}>ポップオーバーコンテンツ</div>}
  />
</Popover.Root>;
```

Props (Root):

- `placement`: Placement（Floating UI の配置）
- `type`: `'dialog'` | `'menu'` | `'tooltip'` | `'listbox'`
- `flipDisabled`: boolean

### Tooltip

ツールチップ。Compound component パターン。

```tsx
import { Tooltip } from '@k8o/arte-odyssey';

<Tooltip.Root placement="top">
  <Tooltip.Trigger renderItem={(props) => <Button {...props}>ホバー</Button>} />
  <Tooltip.Content>ヒント</Tooltip.Content>
</Tooltip.Root>;
```

### DropdownMenu

ドロップダウンメニュー。Compound component パターン。

```tsx
import { DropdownMenu } from '@k8o/arte-odyssey';

<DropdownMenu.Root>
  <DropdownMenu.Trigger text="メニュー" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="アイテム1" onClick={handleClick} />
    <DropdownMenu.Item label="アイテム2" onClick={handleClick} />
  </DropdownMenu.Content>
</DropdownMenu.Root>;
```

Trigger バリアント:

- `DropdownMenu.Trigger`: テキストベース（`text`, `size`, `variant`）
- `DropdownMenu.IconTrigger`: アイコンベース（`icon`, `label`）

### ListBox

リスト選択。Compound component パターン。

```tsx
import { ListBox } from '@k8o/arte-odyssey';

<ListBox.Root
  options={[
    { key: '1', label: 'オプション1' },
    { key: '2', label: 'オプション2' },
  ]}
  value={value}
  onSelect={onSelect}
>
  <ListBox.Trigger size="md" />
  <ListBox.Content />
</ListBox.Root>;
```

## プロバイダー

### ArteOdysseyProvider

アプリのルートで1回ラップする。MotionConfig と ToastProvider を含む。

```tsx
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

<ArteOdysseyProvider>
  <App />
</ArteOdysseyProvider>;
```

### PortalRootProvider

Portal のルート要素を指定する。

```tsx
import { PortalRootProvider, usePortalRoot } from '@k8o/arte-odyssey';

<PortalRootProvider value={containerRef}>{children}</PortalRootProvider>;
```
