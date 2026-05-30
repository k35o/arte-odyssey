/* eslint-disable import/max-dependencies -- Generative UI 統合の描画集約モジュールのため、多数のコンポーネントを束ねる */
'use client';

import type { ReactNode } from 'react';

import { Button } from '../components/buttons/button';
import { Badge } from '../components/data-display/badge';
import { Card } from '../components/data-display/card';
import { Heading } from '../components/data-display/heading';
import { Alert } from '../components/feedback/alert';
import { Spinner } from '../components/feedback/spinner';
import { Checkbox } from '../components/form/checkbox';
import { Select } from '../components/form/select';
import { Switch } from '../components/form/switch';
import { TextField } from '../components/form/text-field';
import { Separator } from '../components/layout/separator';
import { Tabs } from '../components/navigation/tabs';
import { cn } from '../helpers/cn';
import type {
  AlertProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  HeadingProps,
  SelectProps,
  SeparatorProps,
  SpinnerProps,
  StackProps,
  SwitchProps,
  TabsProps,
  TextFieldProps,
} from './schemas';

/**
 * Generative UI 統合の描画関数（'use client'）。
 *
 * arte-odyssey のコンポーネントを無改造で使い、関数 prop（renderItem など）は
 * ここで内部的に組み立てる。json-render / OpenUI の両アダプタがこのモジュールを
 * 参照することで「見た目・橋渡しロジック」を 1 ソースに保つ。
 *
 * NOTE: OpenUI Lang は位置引数のため、省略された中間オプションが `null` で
 * 届きうる。arte-odyssey 側は `undefined` のみ想定するので `?? undefined` で正規化。
 */

// `null` (OpenUI の省略引数) と `undefined` を吸収する小ヘルパー。
const u = <T,>(value: T | null | undefined): T | undefined =>
  value ?? undefined;

// ---------------------------------------------------------------------------
// leaf renderers
// ---------------------------------------------------------------------------

export function renderButton(props: ButtonProps): ReactNode {
  const { label, href } = props;
  return (
    <Button
      color={u(props.color)}
      fullWidth={u(props.fullWidth)}
      // ★ render props の橋渡し: href（文字列）から renderItem を内部生成。
      renderItem={
        href !== undefined && href !== ''
          ? ({ className, children }) => (
              <a className={className} href={href}>
                {children}
              </a>
            )
          : undefined
      }
      size={u(props.size)}
      variant={u(props.variant)}
    >
      {label}
    </Button>
  );
}

export function renderBadge(props: BadgeProps): ReactNode {
  return (
    <Badge
      size={u(props.size)}
      text={props.text}
      tone={u(props.tone)}
      variant={u(props.variant)}
    />
  );
}

export function renderHeading(props: HeadingProps): ReactNode {
  return (
    <Heading lineClamp={u(props.lineClamp)} type={u(props.level) ?? 'h2'}>
      {props.text}
    </Heading>
  );
}

export function renderAlert(props: AlertProps): ReactNode {
  return <Alert message={props.message} status={props.status} />;
}

export function renderSpinner(props: SpinnerProps): ReactNode {
  return <Spinner label={u(props.label)} size={u(props.size)} />;
}

export function renderSeparator(props: SeparatorProps): ReactNode {
  return (
    <Separator color={u(props.color)} orientation={u(props.orientation)} />
  );
}

// ---------------------------------------------------------------------------
// containers (children は各 FW が描画して渡す)
// ---------------------------------------------------------------------------

export function renderCard(props: CardProps, children: ReactNode): ReactNode {
  return (
    <Card appearance={u(props.appearance)} width={u(props.width)}>
      {children}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// tabs（テキストパネルのデータ駆動版）
// ---------------------------------------------------------------------------

export function renderTabs(props: TabsProps): ReactNode {
  const ids = props.tabs.map((_, index) => `tab-${index}`) as [
    string,
    ...string[],
  ];
  return (
    <Tabs.Root ids={ids}>
      <Tabs.List label={u(props.label) ?? 'タブ'}>
        {props.tabs.map((tab, index) => (
          <Tabs.Tab id={ids[index] ?? ''} key={ids[index]}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {props.tabs.map((tab, index) => (
        <Tabs.Panel id={ids[index] ?? ''} key={ids[index]}>
          {tab.content}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

// ---------------------------------------------------------------------------
// layout
// ---------------------------------------------------------------------------

const gapClass = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;
const alignClass = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;
const justifyClass = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

/** Stack コンテナの className。children は各 FW が描画して渡す。 */
export function stackClassName(props: StackProps): string {
  const align = u(props.align);
  const justify = u(props.justify);
  return cn(
    'flex',
    props.direction === 'row' ? 'flex-row' : 'flex-col',
    gapClass[u(props.gap) ?? 'md'],
    align && alignClass[align],
    justify && justifyClass[justify],
  );
}

// ---------------------------------------------------------------------------
// form renderers (値とセッターは各 FW の状態機構から渡す)
// ---------------------------------------------------------------------------

export function renderTextField(
  props: TextFieldProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  return (
    <TextField
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      name={props.name}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      placeholder={u(props.placeholder)}
      readOnly={u(props.readOnly)}
      value={value}
    />
  );
}

export function renderCheckbox(
  props: CheckboxProps,
  checked: boolean,
  onChange: (next: boolean) => void,
): ReactNode {
  return (
    <Checkbox
      disabled={u(props.disabled)}
      label={props.label}
      name={props.name}
      onChange={(event) => {
        onChange(event.target.checked);
      }}
      value={checked}
    />
  );
}

export function renderSwitch(
  props: SwitchProps,
  checked: boolean,
  onChange: (next: boolean) => void,
): ReactNode {
  return (
    <Switch
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      label={props.label}
      name={props.name}
      onChange={(event) => {
        onChange(event.target.checked);
      }}
      required={u(props.required)}
      value={checked}
    />
  );
}

export function renderSelect(
  props: SelectProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  return (
    <Select
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      name={props.name}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      options={props.options}
      value={value}
    />
  );
}
