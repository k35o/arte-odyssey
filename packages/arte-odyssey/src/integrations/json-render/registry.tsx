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
  },
});
