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
  color="primary" | "secondary" | "gray"
  variant="solid" | "outline" | "skeleton"
  fullWidth={false}
  startIcon={<Icon />}
  endIcon={<Icon />}
  disabled={false}
  isActive={false}
>
  ボタン
</Button>
```

リンクとしてレンダーする場合は `renderItem` prop を使う。Next.js の `<Link>` などにも応用できる。

```tsx
<Button
  color="gray"
  variant="outline"
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

アイコンのみのボタン。`color` prop でスタイルを制御。

```tsx
import { IconButton } from '@k8o/arte-odyssey';

<IconButton label="閉じる" color="transparent" size="md">
  <CloseIcon />
</IconButton>;
```

Props:

- `color`: `'transparent'` | `'base'` | `'primary'` | `'secondary'`（デフォルト: `'transparent'`）
- `size`: `'sm'` | `'md'` | `'lg'`
- `label`: string（必須、aria-label として使用）

リンクとしてレンダーする場合は `renderItem` prop を使う。`triggerProps` を `<a>` にスプレッドすると hover/focus 時に `label` が Tooltip として表示される。

```tsx
<IconButton
  color="base"
  label="メール"
  renderItem={({
    className,
    children,
    'aria-label': ariaLabel,
    triggerProps,
  }) => (
    <a
      aria-label={ariaLabel}
      className={className}
      href="/contact"
      {...triggerProps}
    >
      {children}
    </a>
  )}
>
  <MailIcon />
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
  required
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
- `disabled`, `invalid`, `required`: boolean

`renderInput` は `{ id, 'aria-describedby', 'aria-labelledby', disabled, invalid, required }` を受け取る。

### TextField

```tsx
import { TextField } from '@k8o/arte-odyssey';

// Uncontrolled
<TextField id="email" defaultValue="" placeholder="example@mail.com"
  invalid={false} disabled={false} required={false} />

// Controlled
<TextField id="email" value={value} onChange={onChange}
  invalid={false} disabled={false} required={false} />
```

### Textarea

```tsx
import { Textarea } from '@k8o/arte-odyssey';

<Textarea
  id="description"
  value={value}
  onChange={onChange}
  invalid={false}
  disabled={false}
  required={false}
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
  invalid={false}
  disabled={false}
  required={false}
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
  invalid={false}
  disabled={false}
  required={false}
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
  invalid={false}
  disabled={false}
  required={false}
/>;
```

### Autocomplete

複数選択のオートコンプリート。`value` / `onChange` は `string[]`。

```tsx
import { Autocomplete } from '@k8o/arte-odyssey';

<Autocomplete
  id="tags"
  options={options}
  value={value}
  onChange={onChange}
  invalid={false}
  disabled={false}
  required={false}
/>;
```

### Checkbox

ラベルは `label` prop で渡す（children ではない）。`onChange` は `(checked, event)`。

```tsx
import { Checkbox } from '@k8o/arte-odyssey';

// Controlled
<Checkbox label="同意する" value={checked} onChange={onChange} />

// Uncontrolled
<Checkbox label="同意する" defaultChecked />
```

### CheckboxGroup

複数チェックボックスのグループ。`value` / `onChange` は `string[]`。子は `CheckboxGroup.Item`（= `Checkbox`）で、`itemValue` が必須。

```tsx
import { CheckboxGroup } from '@k8o/arte-odyssey';

<CheckboxGroup name="interests" value={values} onChange={setValues}>
  <CheckboxGroup.Item itemValue="music" label="音楽" />
  <CheckboxGroup.Item itemValue="movie" label="映画" />
</CheckboxGroup>;
```

### CheckboxCard

カードスタイルのチェックボックス。

```tsx
import { CheckboxCard } from '@k8o/arte-odyssey';

<CheckboxCard
  name="plan"
  disabled={false}
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
  aria-labelledby="example-radio"
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
  aria-labelledby="plan-radio"
  name="plan"
  disabled={false}
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
  invalid={false}
  disabled={false}
  required={false}
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
  disabled={false}
  invalid={false}
  required={false}
/>;
```

### FileField

コンポジットパターンのファイルアップロード。

```tsx
import { FileField } from '@k8o/arte-odyssey';

<FileField.Root accept="image/*" multiple maxFiles={5}>
  <FileField.Trigger
    renderItem={({ onClick, disabled }) => (
      <Button onClick={onClick} disabled={disabled}>
        ファイルを選択
      </Button>
    )}
  />
  <FileField.ItemList />
</FileField.Root>;
```

Props (Root):

- `accept`: string
- `multiple`: boolean
- `maxFiles`: number
- `disabled`, `invalid`, `required`: boolean

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
<Avatar color="primary" icon={<AssistantIcon />} name="AI" size="sm" />
```

Props:

- `src`: string
- `alt`: string
- `name`: string
- `fallback`: string
- `icon`: ReactNode
- `color`: `'base'` | `'primary'` | `'secondary'`（デフォルト: `'base'`）
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
- `size`: `'sm'` | `'md'` | `'lg'`
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

<Alert tone="info" message="情報メッセージ" />
<Alert tone="error" message={['エラー1', 'エラー2']} />
```

Props:

- `tone`: `'info'` | `'success'` | `'warning'` | `'error'`（必須）
- `message`: `string | string[]`
- `action`: `{ label: string; renderItem: (props: { children: ReactNode }) => ReactNode }`
- `onClose`: `() => void`（指定すると閉じるボタンを表示）
- `closeLabel`: string

### Toast

```tsx
import { useToast } from '@k8o/arte-odyssey';

const { onOpen, onClose, onCloseAll } = useToast();

onOpen('success', '保存しました');
onOpen('error', 'エラーが発生しました');
```

`ToastProvider` は `ArteOdysseyProvider` に含まれるため、別途ラップ不要。

- `onOpen`: `(tone: Status, message: string, options?: { duration?: number; action?: ToastAction }) => void`
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

CSS Anchor Positioning ベースのポップオーバー。Compound component パターン。

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

- `placement`: Placement（デフォルト: `'bottom-start'`）
- `type`: `'dialog'` | `'menu'` | `'listbox'`（デフォルト: `'menu'`）
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
  onChange={onChange}
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
