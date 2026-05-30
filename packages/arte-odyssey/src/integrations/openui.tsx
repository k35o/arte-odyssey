'use client';

import {
  type ComponentRenderProps,
  createLibrary,
  defineComponent,
  useStateField,
} from '@openuidev/react-lang';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { z } from 'zod';

import * as ui from './renderers';
import * as s from './schemas';

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

// フォームは OpenUI の form state（name で識別）に接続する。
// hook を使うため、rules-of-hooks を満たす大文字始まりの関数コンポーネントにする。
const TextFieldView: FC<ComponentRenderProps<s.TextFieldProps>> = ({
  props,
}) => {
  const field = useStateField<string>(props.name, props.defaultValue ?? '');
  return ui.renderTextField(props, field.value, field.setValue);
};

const CheckboxView: FC<ComponentRenderProps<s.CheckboxProps>> = ({ props }) => {
  const field = useStateField<boolean>(
    props.name,
    props.defaultChecked ?? false,
  );
  return ui.renderCheckbox(props, field.value, field.setValue);
};

const SwitchView: FC<ComponentRenderProps<s.SwitchProps>> = ({ props }) => {
  const field = useStateField<boolean>(
    props.name,
    props.defaultChecked ?? false,
  );
  return ui.renderSwitch(props, field.value, field.setValue);
};

const SelectView: FC<ComponentRenderProps<s.SelectProps>> = ({ props }) => {
  const field = useStateField<string>(
    props.name,
    props.defaultValue ?? props.options[0]?.value ?? '',
  );
  return ui.renderSelect(props, field.value, field.setValue);
};

const TextareaView: FC<ComponentRenderProps<s.TextareaProps>> = ({ props }) => {
  const field = useStateField<string>(props.name, props.defaultValue ?? '');
  return ui.renderTextarea(props, field.value, field.setValue);
};

const PasswordInputView: FC<ComponentRenderProps<s.PasswordInputProps>> = ({
  props,
}) => {
  const field = useStateField<string>(props.name, props.defaultValue ?? '');
  return ui.renderPasswordInput(props, field.value, field.setValue);
};

const NumberFieldView: FC<ComponentRenderProps<s.NumberFieldProps>> = ({
  props,
}) => {
  const field = useStateField<number>(props.name, props.defaultValue ?? 0);
  return ui.renderNumberField(props, field.value, field.setValue);
};

const SliderView: FC<ComponentRenderProps<s.SliderProps>> = ({ props }) => {
  const field = useStateField<number>(
    props.name,
    props.defaultValue ?? props.min ?? 0,
  );
  return ui.renderSlider(props, field.value, field.setValue);
};

const RadioView: FC<ComponentRenderProps<s.RadioProps>> = ({ props }) => {
  const field = useStateField<string>(
    props.name,
    props.defaultValue ?? props.options[0]?.value ?? '',
  );
  return ui.renderRadio(props, field.value, field.setValue);
};

const RadioCardView: FC<ComponentRenderProps<s.RadioCardProps>> = ({
  props,
}) => {
  const field = useStateField<string>(
    props.name,
    props.defaultValue ?? props.options[0]?.value ?? '',
  );
  return ui.renderRadioCard(props, field.value, field.setValue);
};

const CheckboxCardView: FC<ComponentRenderProps<s.CheckboxCardProps>> = ({
  props,
}) => {
  const field = useStateField<string[]>(props.name, props.defaultValue ?? []);
  return ui.renderCheckboxCard(props, field.value, field.setValue);
};

const PaginationView: FC<ComponentRenderProps<s.PaginationProps>> = ({
  props,
}) => {
  const field = useStateField<number>(props.name, 1);
  return ui.renderPagination(props, field.value, field.setValue);
};

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
] as const;

const Stack = defineComponent({
  name: 'Stack',
  description: '子要素を縦/横に等間隔で並べるレイアウトコンテナ。',
  props: s.stackProps.extend({
    children: z.array(z.union(childRefs)).describe('並べる子要素'),
  }),
  component: ({ props, renderNode }) => (
    <div className={ui.stackClassName(props)}>
      {renderChildren(props.children, renderNode)}
    </div>
  ),
});

// Card は leaf / form に加えて Stack も内包できる（Stack より後に定義）。
const Card = defineComponent({
  name: 'Card',
  description: 'コンテンツをまとめるカード（コンテナ）。Stack も入れられる。',
  props: s.cardProps.extend({
    children: z
      .array(z.union([...childRefs, Stack.ref]))
      .describe('カード内の子要素'),
  }),
  component: ({ props, renderNode }) =>
    ui.renderCard(props, renderChildren(props.children, renderNode)),
});

export const library = createLibrary({
  components: [
    Stack,
    Card,
    Button,
    IconButton,
    Badge,
    Heading,
    Anchor,
    Avatar,
    Code,
    Icon,
    Alert,
    Spinner,
    Progress,
    Skeleton,
    Separator,
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
  ],
  root: 'Stack',
});
