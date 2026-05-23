# ArteOdyssey Design Guide

`@k8o/arte-odyssey` デザインシステムを使って UI を作るためのガイド。

## セットアップ

```bash
npm install @k8o/arte-odyssey
```

```tsx
// 1. スタイルシートを読み込む（エントリポイントで1回）
import '@k8o/arte-odyssey/styles.css';

// 2. Provider でアプリを囲む
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

function App() {
  return (
    <ArteOdysseyProvider>
      <YourApp />
    </ArteOdysseyProvider>
  );
}

// 3. コンポーネントを使う
import { Button, Card } from '@k8o/arte-odyssey';
```

### Tailwind CSS の設定

`@k8o/arte-odyssey` は Tailwind CSS 4 以上が必要。プロジェクトの CSS で以下を追加：

```css
@import 'tailwindcss';
@import '@k8o/arte-odyssey/styles.css';
```

## デザインの方向性

### コアコンセプト

**「触れるものは柔らかく、読むものは端正に」**

- **空間と形が主役**: 色ではなく、余白のゆとりと形の柔らかさがこのデザインの個性
- **要素の性格で使い分ける**: 触れる要素（フォーム、ボタン）は柔らかく、情報を示す要素（Alert、Badge）は端正に
- **余白で語る**: 詰め込まず、空間にゆとりを持たせる
- **静かな変化**: アニメーションは控えめに、繊細なフィードバック
- **穏やかな色**: OKLCH ベースのパレット、セマンティックトークンで抑えたトーンに

### トーン

柔らかな余白と静かな洗練。空間と形の柔らかさで魅せる。

## 美学ガイドライン

### ページ構造

**DO:**

- ページ背景は `bg-bg-subtle`（薄いグレー）
- コンテンツは白いカードで浮かせる
- カード間に十分な余白（`gap-6`〜`gap-10`）

**DON'T:**

- 純白背景にカードをフラットに置く
- すべてを Card に入れる
- Card を入れ子にする（Card in Card）

### タイポグラフィ

**DO:**

- 日本語フォント（Noto Sans JP, M PLUS 2）を使う
- フォントウェイトは 3種類まで（`font-normal`, `font-medium`, `font-bold`）
- `font-medium` が 450（一般的な 500 より軽い）であることを活かした繊細な強調

**DON'T:**

- Inter / Roboto / Open Sans を使う
- 4種類以上のフォントサイズを1画面で使う
- テキストにグラデーションをかける

> [タイポグラフィ詳細](references/typography.md)

### カラー

**DO:**

- 60-30-10 ルール（ニュートラル60%, サポート30%, アクセント10%）
- セマンティックカラートークンを使う（`bg-bg-subtle`, `text-fg-mute` 等）
- ダークモードを独立したトーンで設計する
- 色は穏やかに、空間と形で魅せる

**DON'T:**

- グラデーション背景
- ホバーに `bg-primary-bg` — `bg-bg-mute` を使う
- 透明度(`/90`)で状態表現 — 専用トークンを使う
- 鮮やかな色を広範囲に使う
- 生のパレット色（`bg-teal-500`）— セマンティックトークン（`bg-primary-bg`）を使う

> [カラー詳細](references/color.md)

### スペーシング

**DO:**

- `p-8` を標準パディングとする（フォーム・カード内）
- 余白の差で関連度を表す（`mt-2` 近い、`mt-4` 標準、`mt-8` セクション間）
- Separator でセクションを区切る

**DON'T:**

- すべてを Card に入れる
- Card を入れ子にする（Card in Card）
- `gap-1` のような極端に狭いスペーシング

> [スペーシング詳細](references/spatial-design.md)

### インタラクション

**DO:**

- `transition-colors` を基本にする
- `focus-visible:ring-2 focus-visible:ring-border-info` でフォーカス表現
- `hover:bg-bg-mute` で穏やかなホバー

**DON'T:**

- bounce / spring 系のイージング
- 300ms を超えるアニメーション
- ホバーに強い原色を使う

> [インタラクション詳細](references/interaction-design.md)

## コンポーネント使用の原則

### Button

`color` と `variant` で統一されたスタイル。ピル型（`rounded-full`）。

```tsx
import { Button } from '@k8o/arte-odyssey';

// プライマリアクション
<Button color="primary" variant="contained">保存する</Button>

// セカンダリアクション
<Button color="gray" variant="outlined">キャンセル</Button>

// テキストのみ
<Button variant="skeleton">詳細を見る</Button>

// リンクとしてレンダーする（renderItem prop）
<Button
  color="gray"
  renderItem={({ className, children }) => (
    <a className={className} href="/settings">{children}</a>
  )}
>
  設定へ
</Button>
```

### IconButton

`bg` prop でスタイルを制御（`variant` ではない）。

```tsx
import { IconButton } from '@k8o/arte-odyssey';

<IconButton bg="transparent" label="コピー"><CopyIcon /></IconButton>
<IconButton bg="primary" label="送信"><SendIcon /></IconButton>

// リンクとしてレンダーする（renderItem prop）
<IconButton
  bg="base"
  label="ホーム"
  renderItem={({ className, children, 'aria-label': ariaLabel, triggerProps }) => (
    <a aria-label={ariaLabel} className={className} href="/home" {...triggerProps}>
      {children}
    </a>
  )}
>
  <HomeIcon />
</IconButton>
```

### Card / InteractiveCard

シャドウで浮かせるのが基本。ページ背景 `bg-subtle` の上に白カード。

```tsx
import { Card, InteractiveCard } from '@k8o/arte-odyssey';

// 静的カード（シャドウで浮かせる）
<Card appearance="shadow">
  <div className="p-8">カードのコンテンツ</div>
</Card>

// クリック可能なカード（ホバーでスケールアップ）
<InteractiveCard appearance="shadow">
  <div className="p-8">コンテンツ</div>
</InteractiveCard>
```

### フォーム

`FormControl` + 各フォームコンポーネントの `renderInput` パターン。

```tsx
import { FormControl, TextField, Select, FileField } from '@k8o/arte-odyssey';

<FormControl label="メール" isRequired renderInput={(props) => (
  <TextField {...props} placeholder="example@mail.com" />
)} />

<FormControl label="カテゴリ" renderInput={(props) => (
  <Select
    {...props}
    options={[{ value: '1', label: 'オプション1' }]}
    value={value}
    onChange={onChange}
  />
)} />

<FileField.Root accept="image/*" multiple>
  <FileField.Trigger>ファイルを選択</FileField.Trigger>
  <FileField.ItemList />
</FileField.Root>
```

## アンチパターン: 「AI スロップ」を避ける

AI が生成したと一目でわかるUIの特徴を避ける。

| アンチパターン                 | ArteOdyssey での代替                               |
| ------------------------------ | -------------------------------------------------- |
| パープルグラデーション         | Teal/Cyan のフラットカラー                         |
| Card in Card（入れ子カード）   | Separator + 余白で区切り                           |
| グレー背景にグレーテキスト     | `text-fg-base` / `text-fg-mute` のコントラスト確保 |
| bounce / spring アニメーション | `transition-colors duration-150 ease-out`          |
| Inter フォント                 | Noto Sans JP / M PLUS 2                            |
| 過剰な glassmorphism           | border + subtle な背景色                           |
| 情報の詰め込み                 | 余白を活かした疎な配置                             |

### AI スロップテスト

> このUIを誰かに見せて「AIが作った」と言ったら、すぐに信じるだろうか？
> もし「はい」なら、それが問題だ。

## 実装の原則

- **既存コンポーネントを使う**: カスタムUIの前にまず ArteOdyssey コンポーネントを探す
- **セマンティックトークンを使う**: 生のカラー値（`bg-teal-500`）ではなくトークン（`bg-primary-bg`）
- **空間と形で魅せる**: 色の華やかさではなく、余白と角丸の柔らかさで個性を出す
- **ダークモードを忘れない**: セマンティックトークンを使えば自動対応
- **アクセシビリティ**: `aria-label`, キーボードナビゲーション, カラーだけに頼らない状態表現

## 詳細リファレンス

- タイポグラフィ: [references/typography.md](references/typography.md)
- カラーシステム: [references/color.md](references/color.md)
- スペーシング・レイアウト: [references/spatial-design.md](references/spatial-design.md)
- インタラクション: [references/interaction-design.md](references/interaction-design.md)
- コンポーネント一覧: [references/components.md](references/components.md)
- Hooks: [references/hooks.md](references/hooks.md)
- ヘルパー・型: [references/helpers.md](references/helpers.md)
