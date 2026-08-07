---
name: arte-odyssey-design
description: |
  ArteOdyssey デザインシステムに従ったフロントエンドUI作成。
  「柔らかな余白と静かな洗練」を原則とするミニマルなデザイン。

  Use when:
  - ArteOdyssey を使った React コンポーネントやページを作成するとき
  - k8o の Web サイト用の UI を実装するとき
  - ミニマルで統一感のあるインターフェースが必要なとき

  特徴: Teal/Cyan カラー（OKLCH）、控えめなアニメーション、ゆったりした余白、柔らかい角丸、日本語最適化
---

# ArteOdyssey Design Skill

ArteOdyssey デザインシステムに沿った UI を作成するためのスキル。

## デザインの方向性

まず、作ろうとしている UI の**目的**・**トーン**・**制約**を明確にする。

- **目的**: このページ/コンポーネントは何を達成するのか？
- **トーン**: 柔らかな余白と静かな洗練。空間と形の柔らかさで魅せる
- **制約**: ArteOdyssey デザインシステムのトークンとコンポーネントを使う
- **差別化**: 量産型の「AIが作った感」のあるUIとは一線を画す

## コアコンセプト

**「触れるものは柔らかく、読むものは端正に」**

### 魅力の源泉は空間と形

色ではなく、**余白のゆとり**と**形の柔らかさ**がこのデザインの個性。色は穏やかで目に優しいことが条件であり、主役ではない。

### 要素の性格で使い分ける

すべてを同じトーンにしない。触れる要素は柔らかく、情報を示す要素は端正に。

| 要素 | 方向性 |
|------|--------|
| フォーム（input, textarea, button） | 柔らかい（大きな角丸、ピル型ボタン、ゆったりパディング） |
| カード・コンテナ | 柔らかい（rounded-xl〜2xl、ふんわり影） |
| Alert, Badge | 現行のまま（情報の明確さ優先） |
| Tabs, Breadcrumb | シャープ（構造を示す要素は端正に） |

### 余白で語る
- 詰め込まず、空間にゆとりを持たせる
- 余白の差で情報の関連度と階層を表現する（[スペーシング詳細](references/spatial-design.md)）

### 静かな変化
- アニメーションは控えめに、繊細なフィードバック
- 150–200ms のトランジション、bounce/spring は使わない（[インタラクション詳細](references/interaction-design.md)）

### 穏やかな色
- OKLCHベースの鮮やかなパレットを引き出しとして持つ
- UIに出る色はセマンティックトークンで抑えたトーンに
- WCAG AAA 準拠（[カラー詳細](references/color.md)）

## クイックスタート

```bash
npm install @k8o/arte-odyssey
```

```tsx
// Tailwind CSS 4 のプロジェクト。デザイントークン（bg-bg-base 等）を
// 自分のマークアップの Tailwind クラスとして使うにはこちらが必要
import '@k8o/arte-odyssey/tailwind.css';
// Tailwind を持たないプロジェクト（CSS Modules・素の CSS）はビルド済み CSS を
// 使う。トークンは CSS カスタムプロパティ（var(--fg-mute) 等）で参照する
// import '@k8o/arte-odyssey/styles.css';
import { ArteOdysseyProvider, Button } from '@k8o/arte-odyssey';
```

## 美学ガイドライン

### ページ構造

**DO:**
- ページ背景は `bg-bg-subtle`（薄いグレー）
- コンテンツは白いカードで浮かせる
- カード間に十分な余白（`gap-6`〜`gap-10`）

**DON'T:**
- 純白背景にカードをフラットに置く
- すべてを Card に入れる
- Card を入れ子にする

### タイポグラフィ

**DO:**
- 日本語フォント（Noto Sans JP, M PLUS 2）を使う
- フォントウェイトは 3種類まで（normal, medium, bold）
- `font-medium` が 450 であることを活かした繊細な強調

**DON'T:**
- Inter / Roboto / Open Sans を使う
- 4種類以上のフォントサイズを1画面で使う
- テキストにグラデーションをかける

→ [タイポグラフィ詳細](references/typography.md)

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

→ [カラー詳細](references/color.md)

### スペーシング

**DO:**
- `p-8` を標準パディングとする（フォーム・カード内）
- 余白の差で関連度を表す（`mt-2` 近い、`mt-4` 標準、`mt-8` セクション間）
- Separator でセクションを区切る

**DON'T:**
- `gap-1` のような極端に狭いスペーシング
- コンテンツの詰め込み

→ [スペーシング詳細](references/spatial-design.md)

### インタラクション

**DO:**
- `transition-colors` を基本にする
- `focus-visible:ring-2 focus-visible:ring-border-info` でフォーカス表現
- `hover:bg-bg-mute` で穏やかなホバー

**DON'T:**
- bounce / spring 系のイージング
- 300ms を超えるアニメーション
- ホバーに強い原色を使う

→ [インタラクション詳細](references/interaction-design.md)

## アンチパターン: 「AI スロップ」を避ける

| アンチパターン | ArteOdyssey での代替 |
|---------------|---------------------|
| パープルグラデーション | Teal/Cyan のフラットカラー |
| Card in Card（入れ子カード） | Separator + 余白で区切り |
| グレー背景にグレーテキスト | `text-fg-base` / `text-fg-mute` のコントラスト確保 |
| bounce / spring アニメーション | `transition-colors duration-150 ease-out` |
| Inter フォント | Noto Sans JP / M PLUS 2 |
| 過剰な glassmorphism | border + subtle な背景色 |
| 情報の詰め込み | 余白を活かした疎な配置 |

## コンポーネント使用の原則

### Button

`color` と `variant` で統一されたスタイル。リンクは `renderItem` で `<a>` を返す。

```tsx
// プライマリアクション
<Button color="primary" variant="solid">保存する</Button>

// セカンダリアクション
<Button color="base" variant="outline">キャンセル</Button>

// テキストのみ
<Button variant="skeleton">詳細を見る</Button>
```

### Card

シャドウで浮かせるのが基本。ページ背景 `bg-subtle` の上に白カード。

```tsx
<Card appearance="shadow">
  <div className="p-8">カードのコンテンツ</div>
</Card>
```

### フォーム

```tsx
<FormControl
  label="メールアドレス"
  required
  renderInput={(props) => (
    <TextField {...props} placeholder="example@mail.com" />
  )}
/>
```

## 実装の原則

- **既存コンポーネントを使う**: カスタムUIの前にまず ArteOdyssey コンポーネントを探す
- **セマンティックトークンを使う**: 生のカラー値（`bg-teal-500`）ではなくトークン（`bg-primary-bg`）
- **空間と形で魅せる**: 色の華やかさではなく、余白と角丸の柔らかさで個性を出す

## 詳細リファレンス

- タイポグラフィ: [references/typography.md](references/typography.md)
- カラーシステム: [references/color.md](references/color.md)
- スペーシング・レイアウト: [references/spatial-design.md](references/spatial-design.md)
- インタラクション: [references/interaction-design.md](references/interaction-design.md)
- コンポーネント一覧: [references/components.md](references/components.md)
