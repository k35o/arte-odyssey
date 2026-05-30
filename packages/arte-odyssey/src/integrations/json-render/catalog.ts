import { defineCatalog } from '@json-render/core';
import { schema } from '@json-render/react/schema';

import * as s from '../schemas';

/**
 * `@k8o/arte-odyssey/json-render`（サーバー安全）
 *
 * LLM が生成してよい部品の契約（Zod スキーマのみ）。React に依存しないので
 * RSC のサーバーコンポーネントから import して `catalog.prompt()` で
 * システムプロンプトを生成できる。
 *
 * 実際の描画は `@k8o/arte-odyssey/json-render/registry`（'use client'）。
 */
export const catalog = defineCatalog(schema, {
  components: {
    Stack: {
      props: s.stackProps,
      slots: ['default'],
      description: '子要素を縦/横に等間隔で並べるレイアウトコンテナ。',
    },
    Button: {
      props: s.buttonProps,
      description: 'アクションボタン。href を指定するとリンク（<a>）になる。',
    },
    Card: {
      props: s.cardProps,
      slots: ['default'],
      description: 'コンテンツをまとめるカード（コンテナ）。',
    },
    Badge: { props: s.badgeProps, description: 'ステータスやラベルのバッジ。' },
    Heading: { props: s.headingProps, description: '見出し（h1〜h6）。' },
    Alert: {
      props: s.alertProps,
      description: '状態を伝えるアラート。message は文字列または文字列配列。',
    },
    Spinner: { props: s.spinnerProps, description: 'ローディングスピナー。' },
    Separator: { props: s.separatorProps, description: '区切り線。' },
    TextField: {
      props: s.textFieldProps,
      description:
        '1行テキスト入力。defaultValue を $bindState で状態に束縛できる。',
    },
    Checkbox: {
      props: s.checkboxProps,
      description:
        'チェックボックス。defaultChecked を $bindState で束縛できる。',
    },
    Switch: {
      props: s.switchProps,
      description:
        'オン/オフスイッチ。defaultChecked を $bindState で束縛できる。',
    },
    Select: {
      props: s.selectProps,
      description:
        'ドロップダウン選択。defaultValue を $bindState で状態に束縛できる。',
    },
    Tabs: {
      props: s.tabsProps,
      description: 'タブ。各タブは label とテキスト content を持つ。',
    },
  },
  actions: {},
});
