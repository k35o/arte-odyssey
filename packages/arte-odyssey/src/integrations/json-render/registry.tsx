'use client';

import { defineRegistry, useBoundProp } from '@json-render/react';
import { useState } from 'react';

import * as ui from '../renderers';
import { catalog } from './catalog';

/**
 * `@k8o/arte-odyssey/json-render/registry`（'use client'）
 *
 * `<Renderer registry={registry} spec={...} />` に渡す実装対応表。
 * フックを使うためクライアント専用。プロンプト生成だけ行いたい場合は
 * サーバー安全な `@k8o/arte-odyssey/json-render`（catalog）を使う。
 */
export const { registry } = defineRegistry(catalog, {
  components: {
    Stack: ({ props, children }) => (
      <div className={ui.stackClassName(props)}>{children}</div>
    ),
    Card: ({ props, children }) => ui.renderCard(props, children),
    Button: ({ props }) => ui.renderButton(props),
    Badge: ({ props }) => ui.renderBadge(props),
    Heading: ({ props }) => ui.renderHeading(props),
    Alert: ({ props }) => ui.renderAlert(props),
    Spinner: ({ props }) => ui.renderSpinner(props),
    Separator: ({ props }) => ui.renderSeparator(props),
    Tabs: ({ props }) => ui.renderTabs(props),

    // フォームは json-render の状態機構に接続。
    // spec が `defaultValue: { $bindState: "..." }` を使うと双方向束縛になり、
    // 束縛が無い場合はローカル state でインタラクティブに動く。
    TextField: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(props.defaultValue ?? '');
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderTextField(props, value, setValue);
    },
    Checkbox: ({ props, bindings }) => {
      const path = bindings?.defaultChecked;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<boolean>(
        props.defaultChecked,
        path,
      );
      const [local, setLocal] = useState(props.defaultChecked ?? false);
      const checked = hasBinding ? (bound ?? false) : local;
      const setChecked = hasBinding ? setBound : setLocal;
      return ui.renderCheckbox(props, checked, setChecked);
    },
    Switch: ({ props, bindings }) => {
      const path = bindings?.defaultChecked;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<boolean>(
        props.defaultChecked,
        path,
      );
      const [local, setLocal] = useState(props.defaultChecked ?? false);
      const checked = hasBinding ? (bound ?? false) : local;
      const setChecked = hasBinding ? setBound : setLocal;
      return ui.renderSwitch(props, checked, setChecked);
    },
    Select: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(
        props.defaultValue ?? props.options[0]?.value ?? '',
      );
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderSelect(props, value, setValue);
    },

    // 表示・データ駆動（状態なし）
    Anchor: ({ props }) => ui.renderAnchor(props),
    Avatar: ({ props }) => ui.renderAvatar(props),
    Code: ({ props }) => ui.renderCode(props),
    Progress: ({ props }) => ui.renderProgress(props),
    Skeleton: ({ props }) => ui.renderSkeleton(props),
    Icon: ({ props }) => ui.renderIcon(props),
    IconButton: ({ props }) => ui.renderIconButton(props),
    Accordion: ({ props }) => ui.renderAccordion(props),
    Breadcrumb: ({ props }) => ui.renderBreadcrumb(props),
    Table: ({ props }) => ui.renderTable(props),

    // フォーム（文字列）
    Textarea: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(props.defaultValue ?? '');
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderTextarea(props, value, setValue);
    },
    PasswordInput: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(props.defaultValue ?? '');
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderPasswordInput(props, value, setValue);
    },
    Radio: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(
        props.defaultValue ?? props.options[0]?.value ?? '',
      );
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderRadio(props, value, setValue);
    },
    RadioCard: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(
        props.defaultValue ?? props.options[0]?.value ?? '',
      );
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderRadioCard(props, value, setValue);
    },

    // フォーム（数値）
    NumberField: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<number>(props.defaultValue, path);
      const [local, setLocal] = useState(props.defaultValue ?? 0);
      const value = hasBinding ? (bound ?? 0) : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderNumberField(props, value, setValue);
    },
    Slider: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<number>(props.defaultValue, path);
      const [local, setLocal] = useState(props.defaultValue ?? props.min ?? 0);
      const value = hasBinding ? (bound ?? 0) : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderSlider(props, value, setValue);
    },

    // フォーム（複数選択）
    CheckboxCard: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string[]>(
        props.defaultValue,
        path,
      );
      const [local, setLocal] = useState(props.defaultValue ?? []);
      const value = hasBinding ? (bound ?? []) : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderCheckboxCard(props, value, setValue);
    },

    // ページネーション（ローカル状態）
    Pagination: ({ props }) => {
      const [page, setPage] = useState(1);
      return ui.renderPagination(props, page, setPage);
    },

    // コンテナ追加
    InteractiveCard: ({ props, children }) =>
      ui.renderInteractiveCard(props, children),
    Form: ({ props, children }) => ui.renderForm(props, children),

    // オーバーレイ（自己完結ウィジェット）
    Modal: ({ props, children }) => (
      <ui.ModalWidget props={props}>{children}</ui.ModalWidget>
    ),
    Dialog: ({ props, children }) => (
      <ui.DialogWidget props={props}>{children}</ui.DialogWidget>
    ),
    Drawer: ({ props, children }) => (
      <ui.DrawerWidget props={props}>{children}</ui.DrawerWidget>
    ),
    Popover: ({ props, children }) => ui.renderPopover(props, children),
    Tooltip: ({ props }) => ui.renderTooltip(props),
    DropdownMenu: ({ props }) => ui.renderDropdownMenu(props),
    Toast: ({ props }) => <ui.ToastWidget props={props} />,

    // leaf 追加
    ScrollLinked: ({ props }) => ui.renderScrollLinked(props),
    BaselineStatus: ({ props }) => ui.renderBaselineStatus(props),

    // フォーム追加
    ListBox: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string>(props.defaultValue, path);
      const [local, setLocal] = useState(
        props.defaultValue ?? props.options[0]?.value ?? '',
      );
      const value = hasBinding ? (bound ?? '') : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderListBox(props, value, setValue);
    },
    CheckboxGroup: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string[]>(
        props.defaultValue,
        path,
      );
      const [local, setLocal] = useState(props.defaultValue ?? []);
      const value = hasBinding ? (bound ?? []) : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderCheckboxGroup(props, value, setValue);
    },
    Autocomplete: ({ props, bindings }) => {
      const path = bindings?.defaultValue;
      const hasBinding = path !== undefined && path !== '';
      const [bound, setBound] = useBoundProp<string[]>(
        props.defaultValue,
        path,
      );
      const [local, setLocal] = useState(props.defaultValue ?? []);
      const value = hasBinding ? (bound ?? []) : local;
      const setValue = hasBinding ? setBound : setLocal;
      return ui.renderAutocomplete(props, value, setValue);
    },
    FileField: ({ props }) => <ui.FileFieldWidget props={props} />,
    FormControl: ({ props }) => <ui.FormControlWidget props={props} />,
  },
});
