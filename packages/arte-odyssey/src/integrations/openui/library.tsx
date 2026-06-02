'use client';

import { createLibrary, defineComponent } from '@openuidev/react-lang';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { z } from 'zod';

import * as ui from '../_shared/renderers';
import * as s from '../_shared/schemas';
import {
  AutocompleteView,
  CheckboxCardView,
  CheckboxGroupView,
  CheckboxView,
  ListBoxView,
  NumberFieldView,
  PaginationView,
  PasswordInputView,
  RadioCardView,
  RadioView,
  SelectView,
  SliderView,
  SwitchView,
  TextareaView,
  TextFieldView,
} from './form-views';

/**
 * `@k8o/arte-odyssey/openui`（'use client'）
 *
 * `<Renderer library={library} response={openuiLang} />` に渡すライブラリ。
 * OpenUI は schema と描画関数を `defineComponent` で同居させる設計のため、
 * library はクライアント専用（描画用）になる。
 *
 * システムプロンプトは OpenUI の想定どおり **ビルド時**（`@openuidev/cli` の
 * `generate`）に生成して静的ファイル化するか、同じクライアントバンドル内で
 * `library.prompt()` を呼ぶ。サーバーランタイムで prompt を生成したい場合は
 * json-render 版（サーバー安全な catalog）を検討する。
 *
 * 合成モデルの違い: 子要素は json-render の slots ではなく、
 * `z.array(Child.ref)` という型付きサブコンポーネントの prop で表す。
 */

const Button = defineComponent({
  name: 'Button',
  description: 'アクションボタン。href を指定するとリンク（<a>）になる。',
  props: s.buttonProps,
  component: ({ props }) => ui.renderButton(props),
});

const Badge = defineComponent({
  name: 'Badge',
  description: 'ステータスやラベルのバッジ。',
  props: s.badgeProps,
  component: ({ props }) => ui.renderBadge(props),
});

const Heading = defineComponent({
  name: 'Heading',
  description: '見出し（h1〜h6）。',
  props: s.headingProps,
  component: ({ props }) => ui.renderHeading(props),
});

const Alert = defineComponent({
  name: 'Alert',
  description: '状態を伝えるアラート。message は文字列または文字列配列。',
  props: s.alertProps,
  component: ({ props }) => ui.renderAlert(props),
});

const Spinner = defineComponent({
  name: 'Spinner',
  description: 'ローディングスピナー。',
  props: s.spinnerProps,
  component: ({ props }) => ui.renderSpinner(props),
});

const Separator = defineComponent({
  name: 'Separator',
  description: '区切り線。',
  props: s.separatorProps,
  component: ({ props }) => ui.renderSeparator(props),
});

const Tabs = defineComponent({
  name: 'Tabs',
  description: 'タブ。各タブは label とテキスト content を持つ。',
  props: s.tabsProps,
  component: ({ props }) => ui.renderTabs(props),
});

// フォーム状態接続 FC は ./form-views へ切り出し済み（rules-of-hooks のため）。

const TextField = defineComponent({
  name: 'TextField',
  description: '1行テキスト入力。name でフォーム状態に束縛される。',
  props: s.textFieldProps,
  component: TextFieldView,
});

const Checkbox = defineComponent({
  name: 'Checkbox',
  description: 'チェックボックス。name でフォーム状態に束縛される。',
  props: s.checkboxProps,
  component: CheckboxView,
});

const Switch = defineComponent({
  name: 'Switch',
  description: 'オン/オフスイッチ。name でフォーム状態に束縛される。',
  props: s.switchProps,
  component: SwitchView,
});

const Select = defineComponent({
  name: 'Select',
  description: 'ドロップダウン選択。name でフォーム状態に束縛される。',
  props: s.selectProps,
  component: SelectView,
});

const Anchor = defineComponent({
  name: 'Anchor',
  description: 'テキストリンク。',
  props: s.anchorProps,
  component: ({ props }) => ui.renderAnchor(props),
});

const Avatar = defineComponent({
  name: 'Avatar',
  description: 'アバター（画像 or イニシャル）。',
  props: s.avatarProps,
  component: ({ props }) => ui.renderAvatar(props),
});

const Code = defineComponent({
  name: 'Code',
  description: 'インラインのコード/値表示。',
  props: s.codeProps,
  component: ({ props }) => ui.renderCode(props),
});

const Progress = defineComponent({
  name: 'Progress',
  description: '進捗バー。',
  props: s.progressProps,
  component: ({ props }) => ui.renderProgress(props),
});

const Skeleton = defineComponent({
  name: 'Skeleton',
  description: 'ローディングのプレースホルダ。',
  props: s.skeletonProps,
  component: ({ props }) => ui.renderSkeleton(props),
});

const Icon = defineComponent({
  name: 'Icon',
  description: 'アイコン（name で指定）。',
  props: s.iconProps,
  component: ({ props }) => ui.renderIcon(props),
});

const ChevronIconComp = defineComponent({
  name: 'ChevronIcon',
  description: '矢印アイコン。direction で向きを指定。',
  props: s.chevronIconProps,
  component: ({ props }) => ui.renderChevronIcon(props),
});

const StatusIcon = defineComponent({
  name: 'StatusIcon',
  description:
    'ステータスを表すアイコン（success/info/warning/error）。装飾用途で、メッセージ表示なら Alert を使う。',
  props: s.statusIconProps,
  component: ({ props }) => ui.renderStatusIcon(props),
});

const IconButton = defineComponent({
  name: 'IconButton',
  description: 'アイコンのみのボタン（label は必須）。',
  props: s.iconButtonProps,
  component: ({ props }) => ui.renderIconButton(props),
});

const Accordion = defineComponent({
  name: 'Accordion',
  description: '開閉できるアコーディオン。各項目は title とテキスト content。',
  props: s.accordionProps,
  component: ({ props }) => ui.renderAccordion(props),
});

const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  description: 'パンくずリスト。',
  props: s.breadcrumbProps,
  component: ({ props }) => ui.renderBreadcrumb(props),
});

const Table = defineComponent({
  name: 'Table',
  description: 'テーブル。columns と rows（行ごとのセル文字列）。',
  props: s.tableProps,
  component: ({ props }) => ui.renderTable(props),
});

const Textarea = defineComponent({
  name: 'Textarea',
  description: '複数行テキスト入力。name でフォーム状態に束縛される。',
  props: s.textareaProps,
  component: TextareaView,
});

const PasswordInput = defineComponent({
  name: 'PasswordInput',
  description: 'パスワード入力。name でフォーム状態に束縛される。',
  props: s.passwordInputProps,
  component: PasswordInputView,
});

const NumberField = defineComponent({
  name: 'NumberField',
  description: '数値入力。name でフォーム状態に束縛される。',
  props: s.numberFieldProps,
  component: NumberFieldView,
});

const Slider = defineComponent({
  name: 'Slider',
  description: 'スライダー。name でフォーム状態に束縛される。',
  props: s.sliderProps,
  component: SliderView,
});

const Radio = defineComponent({
  name: 'Radio',
  description: '単一選択ラジオ。name でフォーム状態に束縛される。',
  props: s.radioProps,
  component: RadioView,
});

const RadioCard = defineComponent({
  name: 'RadioCard',
  description: 'カード型の単一選択。name でフォーム状態に束縛される。',
  props: s.radioCardProps,
  component: RadioCardView,
});

const CheckboxCard = defineComponent({
  name: 'CheckboxCard',
  description: 'カード型の複数選択。name でフォーム状態に束縛される。',
  props: s.checkboxCardProps,
  component: CheckboxCardView,
});

const Pagination = defineComponent({
  name: 'Pagination',
  description: 'ページネーション。name でフォーム状態に束縛される。',
  props: s.paginationProps,
  component: PaginationView,
});

// --- leaf / overlay 追加 ---

const Tooltip = defineComponent({
  name: 'Tooltip',
  description: 'ツールチップ。ホバー/フォーカスで表示。',
  props: s.tooltipProps,
  component: ({ props }) => ui.renderTooltip(props),
});

const DropdownMenu = defineComponent({
  name: 'DropdownMenu',
  description: 'ドロップダウンメニュー。',
  props: s.dropdownMenuProps,
  component: ({ props }) => ui.renderDropdownMenu(props),
});

const Toast = defineComponent({
  name: 'Toast',
  description: 'トースト通知。triggerLabel のボタンで発火。',
  props: s.toastProps,
  component: ({ props }) => <ui.ToastWidget props={props} />,
});

const ScrollLinkedComp = defineComponent({
  name: 'ScrollLinked',
  description: 'ページスクロール進捗バー（fixed top）。',
  props: s.scrollLinkedProps,
  component: ({ props }) => ui.renderScrollLinked(props),
});

const BaselineStatusComp = defineComponent({
  name: 'BaselineStatus',
  description: 'Web feature の Baseline ステータス表示。',
  props: s.baselineStatusProps,
  component: ({ props }) => ui.renderBaselineStatus(props),
});

// --- フォーム追加（FC で hook を呼ぶ） ---

const ListBox = defineComponent({
  name: 'ListBox',
  description: 'ポップアップ型の単一選択リスト。',
  props: s.listBoxProps,
  component: ListBoxView,
});

const CheckboxGroupComp = defineComponent({
  name: 'CheckboxGroup',
  description: 'チェックボックスグループ。name でフォーム状態に束縛。',
  props: s.checkboxGroupProps,
  component: CheckboxGroupView,
});

const Autocomplete = defineComponent({
  name: 'Autocomplete',
  description: 'タグ風の複数選択オートコンプリート。',
  props: s.autocompleteProps,
  component: AutocompleteView,
});

const FileFieldComp = defineComponent({
  name: 'FileField',
  description: 'ファイル選択フィールド（自己完結ウィジェット）。',
  props: s.fileFieldProps,
  component: ({ props }) => <ui.FileFieldWidget props={props} />,
});

const FormControlComp = defineComponent({
  name: 'FormControl',
  description:
    'ラベル＋ヘルプ/エラー付きフィールド（text/textarea/password）。',
  props: s.formControlProps,
  component: ({ props }) => <ui.FormControlWidget props={props} />,
});

// コンテナの子要素描画（Stack / Card 共通）。位置で固定なので index キーで問題ない。
const renderChildren = (
  children: ReadonlyArray<{ typeName: string }>,
  renderNode: (value: unknown) => ReactNode,
): ReactNode =>
  children.map((child, index) => (
    // eslint-disable-next-line react/no-array-index-key -- 静的な位置リスト
    <Fragment key={`${child.typeName}-${index}`}>{renderNode(child)}</Fragment>
  ));

// Stack は子要素を型付きサブコンポーネント配列（leaf / form）として受け取る。
// NOTE: OpenUI は自己参照スキーマを安定して扱えないため、Stack 自身の入れ子は非対応。
// （Card には Stack を入れられる。json-render 版は slots ベースなので任意に入れ子可能）。
// コンテナに入れられる leaf / data / form コンポーネント（Stack 自身は除く）。
const childRefs = [
  Button.ref,
  IconButton.ref,
  Badge.ref,
  Heading.ref,
  Anchor.ref,
  Avatar.ref,
  Code.ref,
  Icon.ref,
  ChevronIconComp.ref,
  StatusIcon.ref,
  Alert.ref,
  Spinner.ref,
  Progress.ref,
  Skeleton.ref,
  Separator.ref,
  Tabs.ref,
  Accordion.ref,
  Breadcrumb.ref,
  Table.ref,
  TextField.ref,
  Textarea.ref,
  PasswordInput.ref,
  NumberField.ref,
  Slider.ref,
  Checkbox.ref,
  Switch.ref,
  Select.ref,
  Radio.ref,
  RadioCard.ref,
  CheckboxCard.ref,
  Pagination.ref,
  Tooltip.ref,
  DropdownMenu.ref,
  Toast.ref,
  ScrollLinkedComp.ref,
  BaselineStatusComp.ref,
  ListBox.ref,
  CheckboxGroupComp.ref,
  Autocomplete.ref,
  FileFieldComp.ref,
  FormControlComp.ref,
] as const;

const Stack = defineComponent({
  name: 'Stack',
  description: '子要素を縦/横に等間隔で並べるレイアウトコンテナ。',
  props: s.stackProps.extend({
    children: z.array(z.union(childRefs)).describe('並べる子要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderStack(props, renderChildren(props.children, renderNode)),
});

const Grid = defineComponent({
  name: 'Grid',
  description:
    '子要素をグリッド状に並べる。cols（1〜6 / auto-fill / auto-fit）と gap、auto-fill/fit 時は minItemSize で各セルの最小サイズを制御。',
  props: s.gridProps.extend({
    children: z.array(z.union(childRefs)).describe('グリッド内の子要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderGrid(props, renderChildren(props.children, renderNode)),
});

// Stack / Grid を含めた汎用 child refs（コンテナの中身として使う）。
const containerChildRefs = [...childRefs, Stack.ref, Grid.ref] as const;

// Card は leaf / form に加えて Stack も内包できる（Stack より後に定義）。
const Card = defineComponent({
  name: 'Card',
  description: 'コンテンツをまとめるカード（コンテナ）。Stack も入れられる。',
  props: s.cardProps.extend({
    children: z.array(z.union(containerChildRefs)).describe('カード内の子要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderCard(props, renderChildren(props.children, renderNode)),
});

// InteractiveCard も Card と同じ children を受ける。
const InteractiveCardComp = defineComponent({
  name: 'InteractiveCard',
  description: 'ホバーアニメーション付きのカード。',
  props: s.interactiveCardProps.extend({
    children: z.array(z.union(containerChildRefs)).describe('カード内の子要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderInteractiveCard(props, renderChildren(props.children, renderNode)),
});

// Form: 縦並びのフォームラッパー。
const FormComp = defineComponent({
  name: 'Form',
  description: 'フォーム要素のラッパー（縦並びレイアウト）。',
  props: s.formProps.extend({
    children: z.array(z.union(containerChildRefs)).describe('フォーム内の要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderForm(props, renderChildren(props.children, renderNode)),
});

// オーバーレイ系（自己完結ウィジェット）。children はモーダル内に描画される。
const Modal = defineComponent({
  name: 'Modal',
  description: 'モーダルダイアログ。triggerLabel のボタンで開く。',
  props: s.modalProps.extend({
    children: z.array(z.union(containerChildRefs)).describe('モーダル内の要素'),
  }),
  component: ({ props, renderNode }) => (
    <ui.ModalWidget props={props}>
      {renderChildren(props.children, renderNode)}
    </ui.ModalWidget>
  ),
});

const Dialog = defineComponent({
  name: 'Dialog',
  description: 'センターダイアログ。triggerLabel のボタンで開く。',
  props: s.dialogProps.extend({
    children: z
      .array(z.union(containerChildRefs))
      .describe('ダイアログ内の要素'),
  }),
  component: ({ props, renderNode }) => (
    <ui.DialogWidget props={props}>
      {renderChildren(props.children, renderNode)}
    </ui.DialogWidget>
  ),
});

const Drawer = defineComponent({
  name: 'Drawer',
  description: 'サイドドロワー。triggerLabel のボタンで開く。',
  props: s.drawerProps.extend({
    children: z.array(z.union(containerChildRefs)).describe('ドロワー内の要素'),
  }),
  component: ({ props, renderNode }) => (
    <ui.DrawerWidget props={props}>
      {renderChildren(props.children, renderNode)}
    </ui.DrawerWidget>
  ),
});

const Popover = defineComponent({
  name: 'Popover',
  description: 'ポップオーバー。triggerLabel のボタンで開閉。',
  props: s.popoverProps.extend({
    children: z
      .array(z.union(containerChildRefs))
      .describe('ポップオーバー内の要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderPopover(props, renderChildren(props.children, renderNode)),
});

export const library = createLibrary({
  components: [
    Stack,
    Grid,
    Card,
    InteractiveCardComp,
    FormComp,
    Modal,
    Dialog,
    Drawer,
    Popover,
    Tooltip,
    DropdownMenu,
    Toast,
    Button,
    IconButton,
    Badge,
    Heading,
    Anchor,
    Avatar,
    Code,
    Icon,
    ChevronIconComp,
    StatusIcon,
    Alert,
    Spinner,
    Progress,
    Skeleton,
    Separator,
    ScrollLinkedComp,
    BaselineStatusComp,
    Tabs,
    Accordion,
    Breadcrumb,
    Table,
    TextField,
    Textarea,
    PasswordInput,
    NumberField,
    Slider,
    Checkbox,
    Switch,
    Select,
    Radio,
    RadioCard,
    CheckboxCard,
    Pagination,
    ListBox,
    CheckboxGroupComp,
    Autocomplete,
    FileFieldComp,
    FormControlComp,
  ],
  root: 'Stack',
});
