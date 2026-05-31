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
    Accordion: {
      props: s.accordionProps,
      description:
        '開閉できるアコーディオン。各項目は title とテキスト content。',
    },
    Breadcrumb: {
      props: s.breadcrumbProps,
      description: 'パンくずリスト。',
    },
    Table: {
      props: s.tableProps,
      description: 'テーブル。columns（見出し）と rows（行ごとのセル文字列）。',
    },
    Anchor: { props: s.anchorProps, description: 'テキストリンク。' },
    Avatar: {
      props: s.avatarProps,
      description: 'アバター（画像 or イニシャル）。',
    },
    Code: { props: s.codeProps, description: 'インラインのコード/値表示。' },
    Progress: { props: s.progressProps, description: '進捗バー。' },
    Skeleton: {
      props: s.skeletonProps,
      description: 'ローディングのプレースホルダ。',
    },
    Icon: { props: s.iconProps, description: 'アイコン（name で指定）。' },
    IconButton: {
      props: s.iconButtonProps,
      description: 'アイコンのみのボタン（label は必須・ツールチップ）。',
    },
    Textarea: {
      props: s.textareaProps,
      description:
        '複数行テキスト入力。defaultValue を $bindState で束縛できる。',
    },
    PasswordInput: {
      props: s.passwordInputProps,
      description: 'パスワード入力。defaultValue を $bindState で束縛できる。',
    },
    NumberField: {
      props: s.numberFieldProps,
      description: '数値入力。defaultValue を $bindState で束縛できる。',
    },
    Slider: {
      props: s.sliderProps,
      description: 'スライダー。defaultValue を $bindState で束縛できる。',
    },
    Radio: {
      props: s.radioProps,
      description: '単一選択ラジオ。defaultValue を $bindState で束縛できる。',
    },
    RadioCard: {
      props: s.radioCardProps,
      description:
        'カード型の単一選択。defaultValue を $bindState で束縛できる。',
    },
    CheckboxCard: {
      props: s.checkboxCardProps,
      description:
        'カード型の複数選択。defaultValue を $bindState で束縛できる。',
    },
    Pagination: {
      props: s.paginationProps,
      description: 'ページネーション。現在ページを $bindState で束縛できる。',
    },
    InteractiveCard: {
      props: s.interactiveCardProps,
      slots: ['default'],
      description: 'ホバーアニメーション付きのカード。',
    },
    Form: {
      props: s.formProps,
      slots: ['default'],
      description: 'フォーム要素のラッパー（縦並びレイアウト）。',
    },
    Modal: {
      props: s.modalProps,
      slots: ['default'],
      description:
        'モーダルダイアログ。triggerLabel のボタンで開く自己完結ウィジェット。',
    },
    Dialog: {
      props: s.dialogProps,
      slots: ['default'],
      description: 'センターダイアログ。triggerLabel のボタンで開く。',
    },
    Drawer: {
      props: s.drawerProps,
      slots: ['default'],
      description: 'サイドドロワー。triggerLabel のボタンで開く。',
    },
    Popover: {
      props: s.popoverProps,
      slots: ['default'],
      description: 'ポップオーバー。triggerLabel のボタンで開閉。',
    },
    Tooltip: {
      props: s.tooltipProps,
      description: 'ツールチップ。ホバー/フォーカスで表示。',
    },
    DropdownMenu: {
      props: s.dropdownMenuProps,
      description: 'ドロップダウンメニュー。',
    },
    Toast: {
      props: s.toastProps,
      description: 'トースト通知。triggerLabel のボタンで発火。',
    },
    ScrollLinked: {
      props: s.scrollLinkedProps,
      description: 'ページスクロール進捗バー（fixed top）。',
    },
    BaselineStatus: {
      props: s.baselineStatusProps,
      description: 'Web feature の Baseline ステータス表示。',
    },
    ListBox: {
      props: s.listBoxProps,
      description: 'ポップアップ型の単一選択リスト。',
    },
    CheckboxGroup: {
      props: s.checkboxGroupProps,
      description: 'チェックボックスグループ。',
    },
    Autocomplete: {
      props: s.autocompleteProps,
      description: 'タグ風の複数選択オートコンプリート。',
    },
    FileField: {
      props: s.fileFieldProps,
      description: 'ファイル選択フィールド。',
    },
    FormControl: {
      props: s.formControlProps,
      description:
        'ラベル＋ヘルプ/エラー付きフィールド（text/textarea/password）。',
    },
  },
  actions: {},
});
