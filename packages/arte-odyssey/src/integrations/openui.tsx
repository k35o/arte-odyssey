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
const Stack = defineComponent({
  name: 'Stack',
  description: '子要素を縦/横に等間隔で並べるレイアウトコンテナ。',
  props: s.stackProps.extend({
    children: z
      .array(
        z.union([
          Button.ref,
          Badge.ref,
          Heading.ref,
          Alert.ref,
          Spinner.ref,
          Separator.ref,
          Tabs.ref,
          TextField.ref,
          Checkbox.ref,
          Switch.ref,
          Select.ref,
        ]),
      )
      .describe('並べる子要素'),
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
      .array(
        z.union([
          Button.ref,
          Badge.ref,
          Heading.ref,
          Alert.ref,
          Spinner.ref,
          Separator.ref,
          Tabs.ref,
          TextField.ref,
          Checkbox.ref,
          Switch.ref,
          Select.ref,
          Stack.ref,
        ]),
      )
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
    Badge,
    Heading,
    Alert,
    Spinner,
    Separator,
    Tabs,
    TextField,
    Checkbox,
    Switch,
    Select,
  ],
  root: 'Stack',
});
