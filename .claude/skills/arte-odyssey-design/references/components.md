# ArteOdyssey コンポーネント一覧

## インポート方法

```tsx
// スタイルシート（必須）
import '@k8o/arte-odyssey/styles.css';

// プロバイダー（アプリルートで1回）
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

// 各コンポーネント
import { Button, Card, Dialog } from '@k8o/arte-odyssey';
```

## アイコン

すべてのアイコンは `size` prop を受け取る。

```tsx
import { CheckIcon, ChevronIcon, AlertIcon } from '@k8o/arte-odyssey';

<CheckIcon size="md" />
<ChevronIcon direction="right" size="sm" />
<AlertIcon status="error" size="lg" />
```

Props:
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`（デフォルト: `'md'`）

サイズマッピング:
| サイズ | クラス | ピクセル |
|--------|--------|---------|
| `xs` | `size-3` | 12px |
| `sm` | `size-4` | 16px |
| `md` | `size-6` | 24px |
| `lg` | `size-8` | 32px |
| `xl` | `size-10` | 40px |
| `2xl` | `size-12` | 48px |
| `3xl` | `size-14` | 56px |

特殊アイコン:
- `ChevronIcon`: `direction: 'up' | 'down' | 'left' | 'right'`（必須）
- `AlertIcon`: `status: 'success' | 'info' | 'warning' | 'error'`（必須）

## レイアウト・ナビゲーション

### Accordion

折りたたみ可能なセクション。コンパウンドコンポーネント。

```tsx
import { Accordion } from '@k8o/arte-odyssey';

<Accordion.Root>
  <Accordion.Item defaultOpen>
    <Accordion.Button>セクション1</Accordion.Button>
    <Accordion.Panel>コンテンツ</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Button>セクション2</Accordion.Button>
    <Accordion.Panel>コンテンツ</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

Props:
- `Accordion.Item`: `isOpen?: boolean`（controlled）, `defaultOpen?: boolean`（uncontrolled）, `onChange?: (isOpen: boolean) => void`

### Breadcrumb

パンくずリスト。コンパウンドコンポーネント。

```tsx
import { Breadcrumb } from '@k8o/arte-odyssey';

<Breadcrumb.List size="md">
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">ホーム</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/products">製品</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/products/1" current>詳細</Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>
```

Props:
- `Breadcrumb.List`: `size?: 'sm' | 'md' | 'lg'`
- `Breadcrumb.Link`: `href: string`, `current?: boolean`, `component?: FC`（カスタムリンクコンポーネント）

### Card

コンテンツをグループ化するカード。

```tsx
import { Card } from '@k8o/arte-odyssey';

<Card width="full" appearance="shadow">
  <div className="p-6">コンテンツ</div>
</Card>

// クリック可能なカード（ホバーでスケールアップ）
<Card interactive>
  <div className="p-6">ホバーでスケールアップ</div>
</Card>
```

Props:
- `width`: `'full'` | `'fit'`
- `appearance`: `'shadow'` | `'bordered'` — shadow はシャドウ付き、bordered はボーダーのみ
- `interactive`: boolean — `hover:scale-[1.02]`, `active:scale-[0.98]` のスケール変化付き

### Tabs

タブ切り替え。コンパウンドコンポーネント。

```tsx
import { Tabs } from '@k8o/arte-odyssey';

<Tabs.Root ids={['tab1', 'tab2']} defaultSelectedId="tab1">
  <Tabs.List label="タブナビゲーション">
    <Tabs.Tab id="tab1">タブ1</Tabs.Tab>
    <Tabs.Tab id="tab2">タブ2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">パネル1</Tabs.Panel>
  <Tabs.Panel id="tab2">パネル2</Tabs.Panel>
</Tabs.Root>
```

Props:
- `Tabs.Root`: `ids: [string, ...string[]]`, `selectedId?: string`（controlled）, `defaultSelectedId?: string | null`（uncontrolled）, `onChange?: (id: string) => void`
- `Tabs.List`: `label: string`
- `Tabs.Tab`: `id: string`
- `Tabs.Panel`: `id: string`

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
// または特定コンテナを指定
<ScrollLinked container={containerRef} />
```

### Table

テーブル。コンパウンドコンポーネント。

```tsx
import { Table } from '@k8o/arte-odyssey';

<Table.Root>
  <Table.Caption>ユーザー一覧</Table.Caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>名前</Table.HeaderCell>
      <Table.HeaderCell align="center">年齢</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row interactive>
      <Table.Cell>田中</Table.Cell>
      <Table.Cell align="center">25</Table.Cell>
    </Table.Row>
    <Table.EmptyState colSpan={2}>データがありません</Table.EmptyState>
  </Table.Body>
</Table.Root>
```

Props:
- `Table.Row`: `interactive?: boolean`（ホバー効果）
- `Table.HeaderCell`: `align?: 'left' | 'center' | 'right'`
- `Table.Cell`: `align?: 'left' | 'center' | 'right'`, `colSpan?: number`, `tone?: 'default' | 'muted'`
- `Table.EmptyState`: `colSpan: number`（必須）

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
</IconButton>
```

Props:
- `color`: `'transparent'` | `'base'` | `'primary'` | `'secondary'`（デフォルト: `'transparent'`）
- `size`: `'sm'` | `'md'` | `'lg'`
- `label`: string（必須、aria-label として使用。hover/focus 時に Tooltip 表示）
- `tooltipPlacement?: Placement`, `tooltipDisabled?: boolean`

リンクとしてレンダーする場合は `renderItem` prop を使う。`triggerProps` を `<a>` にスプレッドすると hover/focus 時に `label` が Tooltip として表示される。

```tsx
<IconButton
  color="base"
  label="メール"
  renderItem={({ className, children, 'aria-label': ariaLabel, triggerProps }) => (
    <a aria-label={ariaLabel} className={className} href="/contact" {...triggerProps}>
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
- `openInNewTab?: boolean`
- `renderAnchor?: FC`（カスタムリンクコンポーネント）

## フォーム

フォーム系コンポーネントの boolean props は HTML 標準の属性名（`disabled` / `required` / `invalid`）で、対応する `HTMLAttributes` を extend するため `name` / `placeholder` / `autoComplete` / `aria-describedby` などの HTML 属性がそのまま渡せる。

### FormControl

フォームフィールドのラッパー。`renderInput` で入力コンポーネントに id / aria 属性等を渡す。

```tsx
import { FormControl } from '@k8o/arte-odyssey';

<FormControl
  label="メールアドレス"
  helpText="連絡先として使用します"
  errorText={errors.email}
  required
  renderInput={(props) => (
    <TextField {...props} placeholder="example@mail.com" />
  )}
/>
```

Props:
- `label`: string（必須）
- `labelAs?: 'label' | 'legend'`（デフォルト: `'label'`）
- `helpText?: string`
- `errorText?: string`
- `disabled?: boolean`, `invalid?: boolean`, `required?: boolean`
- `renderInput`: `(props: { id, 'aria-describedby', 'aria-labelledby', disabled, invalid, required }) => ReactElement`（必須）

props が HTML 標準名なので、入力コンポーネントへはスプレッド一発で渡せる。

### TextField

テキスト入力。

```tsx
import { TextField } from '@k8o/arte-odyssey';

<TextField
  id="email"
  invalid={false}
  disabled={false}
  required={false}
  placeholder="example@mail.com"
/>
```

Props:
- `invalid?: boolean`
- そのほか `<input>` の HTML 属性（`id`, `name`, `disabled`, `required`, `placeholder`, `aria-describedby` 等）をそのまま受け取る
- Controlled: `value` + `onChange` / Uncontrolled: `defaultValue`

### Textarea

複数行テキスト入力。

```tsx
import { Textarea } from '@k8o/arte-odyssey';

<Textarea
  id="description"
  invalid={false}
  disabled={false}
  required={false}
  rows={4}
  fullHeight={false}
  autoResize={false}
/>
```

Props:
- `invalid?: boolean`, `fullHeight?: boolean`, `autoResize?: boolean`
- そのほか `<textarea>` の HTML 属性（`id`, `name`, `rows`, `placeholder` 等）をそのまま受け取る
- Controlled: `value` + `onChange` / Uncontrolled: `defaultValue`

### Checkbox

```tsx
import { Checkbox } from '@k8o/arte-odyssey';

<Checkbox label="同意する" disabled={false} />
// CheckboxGroup 内で使う場合
<Checkbox label="選択肢A" itemValue="a" />
```

Props:
- `label: string`（必須）
- `itemValue?: string`（CheckboxGroup 内で必須）
- `disabled?: boolean`
- Controlled: `value: boolean` + `onChange: (checked, event) => void` / Uncontrolled: `defaultChecked`

### CheckboxGroup

チェックボックスのグループ。コンパウンドコンポーネント。

```tsx
import { CheckboxGroup } from '@k8o/arte-odyssey';

<CheckboxGroup name="options" value={value} onChange={onChange}>
  <CheckboxGroup.Item itemValue="a" label="選択肢A" />
  <CheckboxGroup.Item itemValue="b" label="選択肢B" />
</CheckboxGroup>
```

Props (Root):
- `name: string`（必須）
- `disabled?: boolean`, `invalid?: boolean`, `required?: boolean`
- Controlled: `value: string[]` + `onChange` / Uncontrolled: `defaultValue?: string[]`

Note: `CheckboxGroup.Item` は `Checkbox` コンポーネントのエイリアス。

### CheckboxCard

カードスタイルのチェックボックス選択。

```tsx
import { CheckboxCard } from '@k8o/arte-odyssey';

<CheckboxCard
  name="options"
  options={[
    { value: 'a', label: '選択肢A', description: '説明文' },
    { value: 'b', label: '選択肢B', visual: <Icon /> },
  ]}
  value={value}
  onChange={onChange}
/>
```

Props:
- `options: ReadonlyArray<{ value: string; label: string; description?: string; visual?: ReactNode; disabled?: boolean }>`
- `disabled?: boolean`, `invalid?: boolean`
- Controlled: `value: string[]` + `onChange` / Uncontrolled: `defaultValue?: string[]`

### Radio

ラジオボタン。options prop でアイテムを定義。

```tsx
import { Radio } from '@k8o/arte-odyssey';

<Radio
  aria-labelledby="plan-label"
  name="plan"
  options={[
    { value: 'a', label: '選択肢A' },
    { value: 'b', label: '選択肢B' },
  ]}
  value={value}
  onChange={onChange}
/>
```

Props:
- `aria-labelledby: string`（必須）
- `name?: string`, `disabled?: boolean`
- `options: readonly Option[]`（`{ value: string; label: string }`）
- Controlled: `value: string` + `onChange: (value, event) => void` / Uncontrolled: `defaultValue?: string`

### RadioCard

カードスタイルのラジオ選択。

```tsx
import { RadioCard } from '@k8o/arte-odyssey';

<RadioCard
  aria-labelledby="plan-label"
  name="plan"
  options={[
    { value: 'free', label: '無料プラン', description: '基本機能' },
    { value: 'pro', label: 'プロプラン', visual: <Icon /> },
  ]}
  value={value}
  onChange={onChange}
/>
```

Props:
- `aria-labelledby: string`（必須）
- `name?: string`, `disabled?: boolean`, `invalid?: boolean`
- `options: ReadonlyArray<{ value: string; label: string; description?: string; visual?: ReactNode; disabled?: boolean }>`
- Controlled: `value: string` + `onChange: (value) => void` / Uncontrolled: `defaultValue?: string`

### Select

```tsx
import { Select } from '@k8o/arte-odyssey';

<Select
  id="category"
  invalid={false}
  disabled={false}
  required={false}
  options={[
    { value: '1', label: 'オプション1' },
    { value: '2', label: 'オプション2' },
  ]}
  value={value}
  onChange={onChange}
/>
```

Props:
- `invalid?: boolean`
- `options: readonly Option[]`
- そのほか `<select>` の HTML 属性（`id`, `name`, `disabled`, `required` 等）をそのまま受け取る
- Controlled: `value` + `onChange` / Uncontrolled: `defaultValue`

### NumberField

数値入力。

```tsx
import { NumberField } from '@k8o/arte-odyssey';

<NumberField
  id="quantity"
  invalid={false}
  disabled={false}
  required={false}
  min={0}
  max={100}
  step={1}
  precision={0}
  placeholder="0"
/>
```

Props:
- `invalid?: boolean`, `disabled?: boolean`, `required?: boolean`
- `min?: number`, `max?: number`, `step?: number`, `precision?: number`
- `placeholder?: string`
- Controlled: `value: number` + `onChange` / Uncontrolled: `defaultValue`

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
/>
```

Props:
- `disabled?: boolean`, `invalid?: boolean`, `required?: boolean`
- `min?: number`, `max?: number`, `step?: number`
- Controlled: `value` + `onChange` / Uncontrolled: `defaultValue`

### PasswordInput

パスワード入力（表示/非表示トグル付き）。

```tsx
import { PasswordInput } from '@k8o/arte-odyssey';

<PasswordInput
  id="password"
  placeholder="パスワードを入力"
  autoComplete="current-password"
/>
```

Props:
- `invalid?: boolean`
- `showLabel?: string`, `hideLabel?: string`
- そのほか `<input>` の HTML 属性（`id`, `name`, `disabled`, `required`, `autoComplete` 等）をそのまま受け取る
- Controlled: `value` + `onChange` / Uncontrolled: `defaultValue`

### Switch

トグルスイッチ。

```tsx
import { Switch } from '@k8o/arte-odyssey';

<Switch
  label="通知を有効にする"
  value={value}
  onChange={onChange}
/>
```

Props:
- `label: string`（必須）
- `disabled?: boolean`, `invalid?: boolean`, `required?: boolean`
- Controlled: `value: boolean` + `onChange: (checked, event) => void` / Uncontrolled: `defaultChecked`

### Autocomplete

複数選択のオートコンプリート入力。`value` / `onChange` は `string[]`。

```tsx
import { Autocomplete } from '@k8o/arte-odyssey';

<Autocomplete
  id="tags"
  invalid={false}
  disabled={false}
  required={false}
  options={[
    { value: '1', label: 'オプション1' },
    { value: '2', label: 'オプション2' },
  ]}
  value={value}
  onChange={onChange}
/>
```

Props:
- `id: string`（必須）
- `invalid?: boolean`, `disabled?: boolean`, `required?: boolean`
- `options: readonly Option[]`
- Controlled: `value: string[]` + `onChange` / Uncontrolled: `defaultValue?: string[]`

### FileField

ファイルアップロード。コンパウンドコンポーネント。

```tsx
import { FileField } from '@k8o/arte-odyssey';

<FileField.Root accept="image/*" multiple maxFiles={5}>
  <FileField.Trigger
    renderItem={({ onClick, disabled }) => (
      <Button onClick={onClick} disabled={disabled}>ファイルを選択</Button>
    )}
  />
  <FileField.ItemList clearable />
</FileField.Root>
```

Props (Root):
- `accept?: string`, `multiple?: boolean`, `maxFiles?: number`
- `disabled?: boolean`, `invalid?: boolean`, `required?: boolean`
- `webkitDirectory?: boolean`
- `onChange?: (files: FileList | null, event?: ChangeEvent) => void`（プログラム的なファイル削除時は `event` が `undefined`）
- そのほか `<input>` の HTML 属性（`id`, `name`, `aria-describedby` 等）をそのまま受け取る

Props (Trigger):
- `renderItem: (props: { onClick, disabled, invalid }) => ReactElement`（必須）

Props (ItemList):
- `showWebkitRelativePath?: boolean`
- `clearable?: boolean`

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
- `action?`: `{ label: string; renderItem: (props: { children: ReactNode }) => ReactNode }`
- `onClose?: () => void`（指定すると閉じるボタンを表示）
- `closeLabel?: string`

### Toast

`ToastProvider` は `ArteOdysseyProvider` に含まれるため、別途ラップ不要。

```tsx
import { useToast } from '@k8o/arte-odyssey';

const toast = useToast();
toast.onOpen('success', '保存しました');
toast.onOpen('error', 'エラーが発生しました', { duration: Number.POSITIVE_INFINITY });
toast.onClose(id);
toast.onCloseAll();
```

- `onOpen`: `(tone: Status, message: string, options?: { duration?: number; action?: ToastAction }) => void`
- `onClose`: `(id: string) => void`
- `onCloseAll`: `() => void`

Props (ToastProvider):
- `portalRef?: RefObject<HTMLElement | null>`
- `position?: 'fixed' | 'absolute'`

### Progress

```tsx
import { Progress } from '@k8o/arte-odyssey';

<Progress progress={50} maxProgress={100} />
<Progress progress={75} maxProgress={100} minProgress={0} label="読み込み中" />
```

Props:
- `progress: number`（必須）
- `maxProgress: number`（必須）
- `minProgress?: number`
- `label?: string`

### Badge

バッジ / タグ表示。

```tsx
import { Badge } from '@k8o/arte-odyssey';

<Badge text="新着" tone="info" variant="solid" />
<Badge text="非推奨" tone="warning" variant="outline" size="sm" />
<Badge text="クリック可能" tone="neutral" interactive />
```

Props:
- `text: string`（必須）
- `tone?: 'neutral' | 'info' | 'success' | 'warning' | 'error'`
- `variant?: 'solid' | 'outline'`
- `size?: 'sm' | 'md' | 'lg'`
- `interactive?: boolean`（true の場合 button 要素になる）

## オーバーレイ

### Dialog

コンパウンドコンポーネント。Modal と組み合わせて使用する。

```tsx
import { Modal, Dialog } from '@k8o/arte-odyssey';

<Modal isOpen={isOpen} onClose={onClose}>
  <Dialog.Root>
    <Dialog.Header title="確認" onClose={onClose} />
    <Dialog.Content>
      コンテンツ
    </Dialog.Content>
  </Dialog.Root>
</Modal>
```

Props:
- `Dialog.Header`: `title: string`, `onClose: () => void`

### Drawer

```tsx
import { Drawer } from '@k8o/arte-odyssey';

<Drawer title="メニュー" isOpen={isOpen} onClose={onClose} side="right">
  コンテンツ
</Drawer>
```

Props:
- `title: ReactNode`（必須）
- `isOpen?: boolean`（controlled）
- `defaultOpen?: boolean`（uncontrolled）
- `onClose?: () => void`
- `side?: 'left' | 'right'`（デフォルト: `'right'`）

### Modal

```tsx
import { Modal } from '@k8o/arte-odyssey';

<Modal isOpen={isOpen} onClose={onClose} type="center">
  コンテンツ
</Modal>
```

Props:
- `isOpen?: boolean`
- `onClose?: () => void`
- `type?: 'center' | 'bottom' | 'right' | 'left'`
- `defaultOpen?: boolean`
- `ref?: RefObject<HTMLDialogElement | null>`

### Popover

コンパウンドコンポーネント。

```tsx
import { Popover } from '@k8o/arte-odyssey';

<Popover.Root placement="bottom">
  <Popover.Trigger renderItem={(props) => <Button {...props}>開く</Button>} />
  <Popover.Content renderItem={(props) => <div {...props}>ポップオーバーコンテンツ</div>} />
</Popover.Root>
```

Props:
- `Popover.Root`: `placement?: Placement`（デフォルト: `'bottom-start'`）, `type?: 'dialog' | 'menu' | 'listbox'`, `flipDisabled?: boolean`
- `Popover.Trigger`: `renderItem: (props) => ReactElement`
- `Popover.Content`: `renderItem: (props) => ReactElement`

### Tooltip

コンパウンドコンポーネント。

```tsx
import { Tooltip } from '@k8o/arte-odyssey';

<Tooltip.Root placement="top">
  <Tooltip.Trigger renderItem={(props) => <Button {...props}>ホバー</Button>} />
  <Tooltip.Content>ヒントテキスト</Tooltip.Content>
</Tooltip.Root>
```

Props:
- `Tooltip.Root`: `placement?: Placement`
- `Tooltip.Trigger`: `renderItem: (props) => ReactElement`

### DropdownMenu

コンパウンドコンポーネント。

```tsx
import { DropdownMenu } from '@k8o/arte-odyssey';

<DropdownMenu.Root placement="bottom">
  <DropdownMenu.Trigger text="メニュー" size="md" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="アイテム1" onClick={handleClick} />
    <DropdownMenu.Item label="アイテム2" onClick={handleClick} />
  </DropdownMenu.Content>
</DropdownMenu.Root>

// アイコンのみのトリガー
<DropdownMenu.Root placement="bottom">
  <DropdownMenu.IconTrigger icon={<NavigationMenuIcon />} label="メニュー" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="アイテム" onClick={handleClick} />
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

Props:
- `DropdownMenu.Trigger`: `text: string`, `size?: ButtonSize`, `variant?: ButtonVariant`（`'solid' | 'outline' | 'skeleton'`）
- `DropdownMenu.IconTrigger`: `icon: ReactNode`, `label: string`（アイコンのみのトリガー）
- `DropdownMenu.Item`: `label: string`, `onClick: MouseEventHandler`

## データ表示

### Code

コードブロック。

```tsx
import { Code } from '@k8o/arte-odyssey';

<Code>
  {`const x = 1;`}
</Code>
```

Props:
- `children: string`（必須）

### Heading

見出し。

```tsx
import { Heading } from '@k8o/arte-odyssey';

<Heading type="h1">見出し</Heading>
<Heading type="h2" lineClamp={2}>長いテキストは省略...</Heading>
```

Props:
- `type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`（必須）
- `id?: string`
- `lineClamp?: number`

### ListBox

リスト選択。コンパウンドコンポーネント。

```tsx
import { ListBox } from '@k8o/arte-odyssey';

<ListBox.Root
  options={[
    { key: '1', label: 'アイテム1' },
    { key: '2', label: 'アイテム2' },
  ]}
  value="1"
  onChange={(key) => setValue(key)}
>
  <ListBox.Trigger size="md" />
  <ListBox.Content />
</ListBox.Root>
```

Props:
- `ListBox.Root`: `options: Option[]`, `value: Option['key'] | undefined`, `onChange: (key) => void`, `placement?: Placement`
- `ListBox.Trigger`: `size?: ButtonSize`
- `ListBox.TriggerIcon`: `size?: ButtonSize`, `icon: ReactElement`（アイコンのみのトリガー）
- `ListBox.Content`: `helpContent?: ReactElement`

### Avatar

ユーザーアバター。画像・イニシャル・アイコンを表示。

```tsx
import { Avatar } from '@k8o/arte-odyssey';

<Avatar src="/photo.jpg" alt="田中太郎" size="md" />
<Avatar name="田中太郎" size="lg" />
<Avatar color="primary" icon={<AssistantIcon />} name="AI" size="sm" />
```

Props:
- `src?: string`（画像URL）
- `alt?: string`
- `name?: string`（イニシャル生成用）
- `fallback?: string`
- `icon?: ReactNode`
- `color?: 'base' | 'primary' | 'secondary'`（デフォルト: `'base'`）
- `size?: 'sm' | 'md' | 'lg'`

### Skeleton

ローディングプレースホルダー。

```tsx
import { Skeleton } from '@k8o/arte-odyssey';

<Skeleton shape="rect" size="md" />
<Skeleton shape="circle" size="lg" />
<Skeleton shape="rect" size="sm" animate={false} />
```

Props:
- `shape?: 'rect' | 'circle'`
- `size?: 'sm' | 'md' | 'lg'`
- `animate?: boolean`

### Spinner

ローディングスピナー。

```tsx
import { Spinner } from '@k8o/arte-odyssey';

<Spinner size="md" label="読み込み中..." />
```

Props:
- `size?: 'sm' | 'md' | 'lg'`
- `label?: string`（aria-live でスクリーンリーダーに通知）

## ユーティリティ

### ArteOdysseyProvider

アプリのルートで1回ラップする。ToastProvider を含む。

```tsx
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

<ArteOdysseyProvider>
  <App />
</ArteOdysseyProvider>
```
