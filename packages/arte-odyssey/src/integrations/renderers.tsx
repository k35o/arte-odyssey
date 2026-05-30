/* eslint-disable import/max-dependencies -- Generative UI 統合の描画集約モジュールのため、多数のコンポーネントを束ねる */
'use client';

import { Fragment, type FC, type ReactNode } from 'react';

import { Button } from '../components/buttons/button';
import { IconButton } from '../components/buttons/icon-button';
import { Accordion } from '../components/data-display/accordion';
import { Avatar } from '../components/data-display/avatar';
import { Badge } from '../components/data-display/badge';
import { Card } from '../components/data-display/card';
import { Code } from '../components/data-display/code';
import { Heading } from '../components/data-display/heading';
import { Table } from '../components/data-display/table';
import { Alert } from '../components/feedback/alert';
import { Progress } from '../components/feedback/progress';
import { Skeleton } from '../components/feedback/skeleton';
import { Spinner } from '../components/feedback/spinner';
import { Checkbox } from '../components/form/checkbox';
import { CheckboxCard } from '../components/form/checkbox-card';
import { NumberField } from '../components/form/number-field';
import { PasswordInput } from '../components/form/password-input';
import { Radio } from '../components/form/radio';
import { RadioCard } from '../components/form/radio-card';
import { Select } from '../components/form/select';
import { Slider } from '../components/form/slider';
import { Switch } from '../components/form/switch';
import { TextField } from '../components/form/text-field';
import { Textarea } from '../components/form/textarea';
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
  LinkIcon,
  ListIcon,
  LocationIcon,
  MailIcon,
  MinusIcon,
  PlusIcon,
  SendIcon,
  SparklesIcon,
  TableIcon,
  TagIcon,
} from '../components/icons';
import { Separator } from '../components/layout/separator';
import { Anchor } from '../components/navigation/anchor';
import { Breadcrumb } from '../components/navigation/breadcrumb';
import { Pagination } from '../components/navigation/pagination';
import { Tabs } from '../components/navigation/tabs';
import { cn } from '../helpers/cn';
import type {
  AccordionProps,
  AlertProps,
  AnchorProps,
  AvatarProps,
  BadgeProps,
  BreadcrumbProps,
  ButtonProps,
  CardProps,
  CheckboxCardProps,
  CheckboxProps,
  CodeProps,
  HeadingProps,
  IconButtonProps,
  IconName,
  IconProps,
  NumberFieldProps,
  PaginationProps,
  PasswordInputProps,
  ProgressProps,
  RadioCardProps,
  RadioProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SliderProps,
  SpinnerProps,
  StackProps,
  SwitchProps,
  TableProps,
  TabsProps,
  TextareaProps,
  TextFieldProps,
} from './schemas';

// 生成 UI で使えるアイコン（schemas.ts の iconName と対応）。
const iconMap = {
  plus: PlusIcon,
  minus: MinusIcon,
  check: CheckIcon,
  close: CloseIcon,
  mail: MailIcon,
  link: LinkIcon,
  'external-link': ExternalLinkIcon,
  send: SendIcon,
  copy: CopyIcon,
  tag: TagIcon,
  list: ListIcon,
  table: TableIcon,
  location: LocationIcon,
  sparkles: SparklesIcon,
} satisfies Record<IconName, FC<{ size?: 'sm' | 'md' | 'lg' }>>;

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

export function renderTextarea(
  props: TextareaProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  return (
    <Textarea
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

export function renderPasswordInput(
  props: PasswordInputProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  return (
    <PasswordInput
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      name={props.name}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      placeholder={u(props.placeholder)}
      value={value}
    />
  );
}

export function renderNumberField(
  props: NumberFieldProps,
  value: number,
  onChange: (next: number) => void,
): ReactNode {
  return (
    <NumberField
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      max={u(props.max)}
      min={u(props.min)}
      name={props.name}
      onChange={onChange}
      step={u(props.step)}
      value={value}
    />
  );
}

export function renderSlider(
  props: SliderProps,
  value: number,
  onChange: (next: number) => void,
): ReactNode {
  return (
    <Slider
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      max={u(props.max)}
      min={u(props.min)}
      name={props.name}
      onChange={onChange}
      step={u(props.step)}
      value={value}
    />
  );
}

export function renderRadio(
  props: RadioProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  const labelId = `${props.name}-label`;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-fg-base text-sm font-medium" id={labelId}>
        {props.label}
      </span>
      <Radio
        aria-labelledby={labelId}
        disabled={u(props.disabled)}
        name={props.name}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        options={props.options}
        value={value}
      />
    </div>
  );
}

export function renderRadioCard(
  props: RadioCardProps,
  value: string,
  onChange: (next: string) => void,
): ReactNode {
  const labelId = `${props.name}-label`;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-fg-base text-sm font-medium" id={labelId}>
        {props.label}
      </span>
      <RadioCard
        aria-labelledby={labelId}
        disabled={u(props.disabled)}
        invalid={u(props.invalid)}
        name={props.name}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        options={props.options}
        value={value}
      />
    </div>
  );
}

export function renderCheckboxCard(
  props: CheckboxCardProps,
  value: string[],
  onChange: (next: string[]) => void,
): ReactNode {
  return (
    <CheckboxCard
      disabled={u(props.disabled)}
      invalid={u(props.invalid)}
      name={props.name}
      onChange={onChange}
      options={props.options}
      value={value}
    />
  );
}

export function renderPagination(
  props: PaginationProps,
  currentPage: number,
  onPageChange: (next: number) => void,
): ReactNode {
  return (
    <Pagination
      currentPage={currentPage}
      disabled={u(props.disabled)}
      nextLabel={u(props.nextLabel)}
      onPageChange={onPageChange}
      prevLabel={u(props.prevLabel)}
      totalPages={props.totalPages}
    />
  );
}

// ---------------------------------------------------------------------------
// leaf / display (追加分)
// ---------------------------------------------------------------------------

export function renderIcon(props: IconProps): ReactNode {
  const IconComponent = iconMap[props.name];
  return <IconComponent size={u(props.size) ?? 'md'} />;
}

export function renderIconButton(props: IconButtonProps): ReactNode {
  const IconComponent = iconMap[props.icon];
  return (
    <IconButton bg={u(props.bg)} label={props.label} size={u(props.size)}>
      <IconComponent size={u(props.size) ?? 'md'} />
    </IconButton>
  );
}

export function renderAnchor(props: AnchorProps): ReactNode {
  return (
    <Anchor href={props.href} openInNewTab={u(props.openInNewTab)}>
      {props.text}
    </Anchor>
  );
}

export function renderAvatar(props: AvatarProps): ReactNode {
  return (
    <Avatar
      alt={u(props.alt)}
      fallback={u(props.fallback)}
      name={u(props.name)}
      size={u(props.size)}
      src={u(props.src)}
    />
  );
}

export function renderCode(props: CodeProps): ReactNode {
  return <Code>{props.code}</Code>;
}

export function renderProgress(props: ProgressProps): ReactNode {
  return (
    <Progress
      label={u(props.label)}
      maxProgress={props.maxProgress}
      minProgress={u(props.minProgress)}
      progress={props.progress}
    />
  );
}

export function renderSkeleton(props: SkeletonProps): ReactNode {
  return (
    <Skeleton
      animate={u(props.animate)}
      shape={u(props.shape)}
      size={u(props.size)}
    />
  );
}

// ---------------------------------------------------------------------------
// data-driven (items 配列)
// ---------------------------------------------------------------------------

export function renderAccordion(props: AccordionProps): ReactNode {
  return (
    <Accordion.Root>
      {props.items.map((item) => (
        <Accordion.Item defaultOpen={u(item.defaultOpen)} key={item.title}>
          <Accordion.Button>{item.title}</Accordion.Button>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export function renderBreadcrumb(props: BreadcrumbProps): ReactNode {
  return (
    <Breadcrumb.List size={u(props.size)}>
      {props.items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <Breadcrumb.Separator />}
          <Breadcrumb.Item>
            {item.href !== undefined && item.href !== '' ? (
              <Breadcrumb.Link current={u(item.current)} href={item.href}>
                {item.label}
              </Breadcrumb.Link>
            ) : (
              item.label
            )}
          </Breadcrumb.Item>
        </Fragment>
      ))}
    </Breadcrumb.List>
  );
}

export function renderTable(props: TableProps): ReactNode {
  return (
    <Table.Root>
      {props.caption !== undefined && props.caption !== '' ? (
        <Table.Caption>{props.caption}</Table.Caption>
      ) : null}
      <Table.Head>
        <Table.Row>
          {props.columns.map((column) => (
            <Table.HeaderCell align={u(column.align)} key={column.label}>
              {column.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {props.rows.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key -- 生成された静的な行
          <Table.Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Table.Cell
                align={u(props.columns[cellIndex]?.align)}
                // eslint-disable-next-line react/no-array-index-key -- 静的なセル
                key={cellIndex}
              >
                {cell}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
