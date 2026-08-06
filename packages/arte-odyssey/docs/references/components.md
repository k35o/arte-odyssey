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
  color="primary" | "secondary" | "base"
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

Props:

- `color`: `'primary'` | `'secondary'` | `'base'`（デフォルト: `'primary'`）
- `variant`: `'solid'` | `'outline'` | `'skeleton'`（デフォルト: `'solid'`）
- `size`: `'sm'` | `'md'` | `'lg'`
- `type`: `'button'` | `'submit'`（デフォルト: `'button'`）
- `onAction`: `() => void | Promise<void>`（非同期処理を `useTransition` で包み、保留中は自動でスピナー表示。素のイベントが要るときは `onClick`）
- そのほか `<button>` の HTML 属性（`disabled`, `name`, `aria-*` 等）をそのまま受け取る。`<button>` に無い属性（`href` 等）は渡せないので、リンクにするときは `renderItem` を使う

リンクとしてレンダーする場合は `renderItem` prop を使う。Next.js の `<Link>` などにも応用できる。

```tsx
<Button
  color="base"
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
- `label`: string（必須、aria-label として使用。hover / focus で Tooltip に出る）
- `tooltipPlacement`: Placement（デフォルト: `'top'`）, `tooltipDisabled`: boolean
- `onAction`: `() => void | Promise<void>`（Button と同じ）
- そのほか `<button>` の HTML 属性。Button と同様、`<button>` に無い属性（`href` 等）は `renderItem` 経由で渡す

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

### Pagination

ページ送り。前後ボタンと現在ページの表示のみで、ページ番号のリストは持たない。

```tsx
import { Pagination } from '@k8o/arte-odyssey';

<Pagination currentPage={page} onChange={setPage} totalPages={10} />;
```

Props:

- `totalPages`: number（必須）
- `currentPage`: number（必須）
- `onChange`: `(page: number) => void`（必須）
- `disabled`: boolean
- `prevLabel`, `nextLabel`, `aria-label`: string（未指定なら文言辞書の既定値）

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

`ref` は実要素（`input` / `textarea` / `select` / `fieldset`）に届く。内部で ref を使う `Textarea` / `FileField` も内部 ref と合成されるため、`react-hook-form` の `register()` などをそのまま渡せる。`Radio`（複数の input を描くグループ）と `FormControl`（ラッパー）は `ref` を受け取らない。

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

ラッパー要素は `labelAs` で変わる。`'label'`（既定）は `<div>` + `<label htmlFor>`、`'legend'` は `<fieldset>` + `<legend>`。単一フィールドを名前の無いグループにしないため、`<fieldset>` は `legend` のときだけ使う。`Radio` / `CheckboxGroup` のようなグループ入力を包むときは `labelAs="legend"` を指定する。

### TextField

```tsx
import { TextField } from '@k8o/arte-odyssey';

// Uncontrolled
<TextField id="email" defaultValue="" placeholder="example@mail.com"
  invalid={false} disabled={false} required={false} />

// Controlled
<TextField id="email" value={value} onChange={onChange}
  invalid={false} disabled={false} required={false} />

// type も渡せる（デフォルト: "text"）
<TextField id="tel" type="tel" inputMode="numeric" />
```

Props:

- `invalid`: boolean
- `ref`: `Ref<HTMLInputElement>`
- そのほか `<input>` の HTML 属性（`type`, `id`, `name`, `placeholder`, `autoComplete` 等）をそのまま受け取る。パスワードは `type="password"` ではなく `PasswordInput` を使う（表示/非表示トグルが `type` を占有するため `PasswordInput` は `type` を受け取らない）

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
<Checkbox checked={checked} label="同意する" onChange={onChange} />

// Uncontrolled
<Checkbox defaultChecked label="同意する" />
```

Props:

- `label`: string（必須）
- `itemValue`: string（`CheckboxGroup` 内では必須）
- Controlled: `checked: boolean` + `onChange: (checked, event) => void` / Uncontrolled: `defaultChecked`
- `ref`: `Ref<HTMLInputElement>`

### CheckboxGroup

複数チェックボックスのグループ。子は `CheckboxGroup.Item`（= `Checkbox`）で、`itemValue` が必須。

グループの選択状態は `value` / `onChange`（`string[]`）で持つ。単体の `Checkbox` が真偽値を `checked` で持つのとは別物なので、混同しないこと。

`fieldset[role="group"]` を描くため `aria-labelledby` が必須。必須入力であることは、参照先のラベル要素（`FormControl` の必須表示など）に含めて伝える。`role="group"` は `aria-required` を許可していないので、グループ側には出さない。

```tsx
import { CheckboxGroup } from '@k8o/arte-odyssey';

<p id="interests-label">興味のある分野</p>
<CheckboxGroup
  aria-labelledby="interests-label"
  name="interests"
  value={values}
  onChange={setValues}
>
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

カードスタイルのラジオボタン。`fieldset[role="radiogroup"]` の中に本物の `input[type="radio"]` を並べるため、矢印キーのローミングと単一選択はブラウザに任せている。テストからは `getByRole('radio', { checked })` で参照する。

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
  checked={checked}
  disabled={false}
  invalid={false}
  label="通知を有効にする"
  onChange={onChange}
  required={false}
/>;
```

Props:

- `label`: string（必須）
- Controlled: `checked: boolean` + `onChange: (checked, event) => void` / Uncontrolled: `defaultChecked`
- `disabled`, `invalid`, `required`: boolean
- `ref`: `Ref<HTMLInputElement>`

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
- `label`: string（省略時は文言辞書の `loading`。既定は「読み込み中」）

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

<Modal isOpen={open} onClose={onClose} placement="center">
  コンテンツ
</Modal>;
```

Props:

- `placement`: `'center'` | `'bottom'` | `'right'` | `'left'`（デフォルト: `'center'`）
- `isOpen`: boolean
- `defaultOpen`: boolean
- `onClose`: () => void
- `aria-label` / `aria-labelledby` / `aria-describedby`: string
- `ref`: `RefObject<HTMLDialogElement | null>`

名前の解決順は `aria-label` / `aria-labelledby` > 中の `Dialog.Root` が登録した見出し。どちらも無ければ無名の dialog になるため、`Dialog` を入れずに直接コンテンツを置くときは `aria-label` を渡す。

```tsx
<Modal aria-label="画像プレビュー" isOpen={open} onClose={onClose}>
  <img alt="" src={src} />
</Modal>
```

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
- `flipDisabled`, `closeOnClickAway`, `trapFocus`: boolean
- 開閉状態: Controlled は `isOpen` + `onChange: (isOpen: boolean) => void`、Uncontrolled は `defaultOpen`

Escape は入れ子のうち**最も内側の 1 枚だけ**を閉じる。

### Tooltip

ツールチップ。Compound component パターン。

```tsx
import { Tooltip } from '@k8o/arte-odyssey';

<Tooltip.Root placement="top">
  <Tooltip.Trigger renderItem={(props) => <Button {...props}>ホバー</Button>} />
  <Tooltip.Content>ヒント</Tooltip.Content>
</Tooltip.Root>;
```

Props (Root):

- `placement`: Placement（デフォルト: `'bottom'`）
- 開閉状態: `isOpen` / `defaultOpen` / `onChange`（Popover と同じ）

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

Props (Root):

- `placement`: Placement（デフォルト: `'bottom-start'`）
- 開閉状態: `isOpen` / `defaultOpen` / `onChange`（Popover と同じ）

Trigger バリアント:

- `DropdownMenu.Trigger`: テキストベース（`text`, `size`, `variant`）
- `DropdownMenu.IconTrigger`: アイコンベース（`icon`, `label`）

### ListBox

リスト選択。Compound component パターン。選択肢は `Select` と同じ `Option`（`{ value, label }`）。

```tsx
import { ListBox } from '@k8o/arte-odyssey';

<ListBox.Root
  onChange={onChange}
  options={[
    { value: '1', label: 'オプション1' },
    { value: '2', label: 'オプション2' },
  ]}
  value={value}
>
  <ListBox.Trigger label="表示件数" size="md" />
  <ListBox.Content />
</ListBox.Root>;
```

Props (Root):

- `options`: `readonly Option[]`（`{ value: string; label: string }`）（必須）
- `value`: `string | undefined`（必須）
- `onChange`: `(value: string) => void`（必須）
- `placement`: Placement（デフォルト: `'bottom'`）

Trigger バリアント:

- `ListBox.Trigger`: テキストベース（`size`, `label`）
- `ListBox.IconTrigger`: アイコンベース（`size`, `icon`, `label`）

`label` を渡すとトリガーのアクセシブル名が「ラベル + 現在値」になる。省略すると現在値だけになるため、周囲に見出しが無いときは渡す。

Props (Content):

- `helpContent`: ReactElement（listbox の外側に置かれる補足表示）

## プロバイダー

### ArteOdysseyProvider

アプリのルートで1回ラップする。ToastProvider と文言辞書（下記 i18n）を含む。

```tsx
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

<ArteOdysseyProvider>
  <App />
</ArteOdysseyProvider>;
```

Props:

- `messages`: `Partial<Messages>`（省略時は日本語辞書）

### PortalRootProvider

Portal のルート要素を指定する。

```tsx
import { PortalRootProvider, usePortalRoot } from '@k8o/arte-odyssey';

<PortalRootProvider value={containerRef}>{children}</PortalRootProvider>;
```

## i18n（文言辞書）

コンポーネントが内部で持つ文言（閉じる、必須、読み込み中 …）は辞書から引く。**既定は日本語**で、Provider を置かなくても、`messages` を渡さなくても日本語で動く。

英語に切り替えるときは `@k8o/arte-odyssey/i18n` の `en` を渡す。

```tsx
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';
import { en } from '@k8o/arte-odyssey/i18n';

<ArteOdysseyProvider messages={en}>
  <App />
</ArteOdysseyProvider>;
```

一部だけ差し替えるときは辞書をスプレッドして上書きする（`Partial<Messages>` なので全キーを埋める必要はない）。

```tsx
<ArteOdysseyProvider messages={{ ...en, close: 'Dismiss' }}>
  <App />
</ArteOdysseyProvider>
```

日本語のまま一部だけ変えるなら、そのキーだけ渡せばよい。

```tsx
<ArteOdysseyProvider messages={{ close: '閉じる（Esc）' }}>
  <App />
</ArteOdysseyProvider>
```

### 優先順位

**コンポーネントの prop > Provider に渡した辞書 > 既定（日本語）**。

`Spinner` の `label`、`Alert` の `closeLabel`、`PasswordInput` の `showLabel` / `hideLabel`、`Pagination` の `prevLabel` / `nextLabel` のように個別の文言 prop を持つコンポーネントは、その prop が辞書より優先される。

```tsx
// 辞書が en でも、この Spinner だけは「保存中」になる
<Spinner label="保存中" />
```

### エクスポート

```tsx
import { en, ja, type Messages } from '@k8o/arte-odyssey/i18n';
```

`ja` / `en` は本体のバンドルに載らないよう、ルートではなく `@k8o/arte-odyssey/i18n` サブパスからのみ export される。

### キー一覧

`Messages` 型の全キー。値はすべて `string`。

| 分類          | キー                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 共通          | `close`, `required`, `loading`, `avatar`, `color`                                                                                  |
| Alert         | `alertSuccess`, `alertInfo`, `alertWarning`, `alertError`                                                                          |
| Toast         | `toastRegion`                                                                                                                      |
| Autocomplete  | `autocompletePlaceholder`, `autocompleteRemoveTag`, `autocompleteClear`, `autocompleteEmpty`                                       |
| FileField     | `fileFieldRemove`                                                                                                                  |
| NumberField   | `numberFieldIncrement`, `numberFieldDecrement`                                                                                     |
| PasswordInput | `passwordShow`, `passwordHide`                                                                                                     |
| ListBox       | `listBoxPlaceholder`                                                                                                               |
| Breadcrumb    | `breadcrumb`                                                                                                                       |
| Pagination    | `paginationLabel`, `paginationPrevious`, `paginationNext`                                                                          |
| AI チャット   | `chat`, `scrollToLatest`, `reasoning`, `reasoningStreaming`, `suggestions`, `send`, `stop`, `toolInput`, `toolOutput`, `toolError` |
