/* eslint-disable import/max-dependencies -- Generative UI 統合の描画集約モジュールのため、多数のコンポーネントを束ねる */
'use client';

import { Fragment, type FC, type ReactNode, useId, useState } from 'react';

import { Button } from '../../components/buttons/button';
import { IconButton } from '../../components/buttons/icon-button';
import { Accordion } from '../../components/data-display/accordion';
import { Avatar } from '../../components/data-display/avatar';
import { Badge } from '../../components/data-display/badge';
import { BaselineStatus } from '../../components/data-display/baseline-status';
import { Card, InteractiveCard } from '../../components/data-display/card';
import { Code } from '../../components/data-display/code';
import { Heading } from '../../components/data-display/heading';
import { Table } from '../../components/data-display/table';
import { Alert } from '../../components/feedback/alert';
import { Progress } from '../../components/feedback/progress';
import { Skeleton } from '../../components/feedback/skeleton';
import { Spinner } from '../../components/feedback/spinner';
import { ToastProvider, useToast } from '../../components/feedback/toast';
import { Autocomplete } from '../../components/form/autocomplete';
import { Checkbox } from '../../components/form/checkbox';
import { CheckboxCard } from '../../components/form/checkbox-card';
import { CheckboxGroup } from '../../components/form/checkbox-group';
import { FileField } from '../../components/form/file-field';
import { Form } from '../../components/form/form';
import { FormControl } from '../../components/form/form-control';
import { NumberField } from '../../components/form/number-field';
import { PasswordInput } from '../../components/form/password-input';
import { Radio } from '../../components/form/radio';
import { RadioCard } from '../../components/form/radio-card';
import { Select } from '../../components/form/select';
import { Slider } from '../../components/form/slider';
import { Switch } from '../../components/form/switch';
import { TextField } from '../../components/form/text-field';
import { Textarea } from '../../components/form/textarea';
import {
  AccessibilityIcon,
  AIIcon,
  AlertIcon,
  ArteOdyssey,
  AtomIcon,
  BadIcon,
  BlogIcon,
  BoringIcon,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  ColorContrastIcon,
  ColorInfoIcon,
  CopyIcon,
  DarkModeIcon,
  DifficultIcon,
  EasyIcon,
  ExternalLinkIcon,
  FormIcon,
  GitHubIcon,
  GoodIcon,
  HistoryIcon,
  HorizontalWritingIcon,
  InformativeIcon,
  InterestingIcon,
  LightModeIcon,
  LinkIcon,
  ListIcon,
  LocationIcon,
  LogoIcon,
  MailIcon,
  MinusIcon,
  MixedColorIcon,
  NavigationMenuIcon,
  NewsIcon,
  PaletteIcon,
  PlusIcon,
  PrepareIcon,
  PublishDateIcon,
  QiitaIcon,
  RSSIcon,
  SendIcon,
  ShallowIcon,
  ShieldCheckIcon,
  SlideIcon,
  SparklesIcon,
  SubscribeIcon,
  TableIcon,
  TagIcon,
  TwitterIcon,
  UpdateDateIcon,
  VerticalWritingIcon,
  ViewIcon,
  ViewOffIcon,
} from '../../components/icons';
import { Grid } from '../../components/layout/grid';
import { ScrollLinked } from '../../components/layout/scroll-linked';
import { Separator } from '../../components/layout/separator';
import { Stack } from '../../components/layout/stack';
import { Anchor } from '../../components/navigation/anchor';
import { Breadcrumb } from '../../components/navigation/breadcrumb';
import { Pagination } from '../../components/navigation/pagination';
import { Tabs } from '../../components/navigation/tabs';
import { Dialog } from '../../components/overlays/dialog';
import { Drawer } from '../../components/overlays/drawer';
import { DropdownMenu } from '../../components/overlays/dropdown-menu';
import { ListBox } from '../../components/overlays/list-box';
import { Modal } from '../../components/overlays/modal';
import { Popover } from '../../components/overlays/popover';
import { Tooltip } from '../../components/overlays/tooltip';
import type {
  AccordionProps,
  AlertProps,
  AnchorProps,
  AutocompleteProps,
  AvatarProps,
  BadgeProps,
  BaselineStatusProps,
  BreadcrumbProps,
  ButtonProps,
  CardProps,
  CheckboxCardProps,
  CheckboxGroupProps,
  CheckboxProps,
  ChevronIconProps,
  CodeProps,
  GridProps,
  DialogProps,
  DrawerProps,
  DropdownMenuProps,
  FileFieldProps,
  FormControlProps,
  FormProps,
  HeadingProps,
  IconButtonProps,
  IconName,
  IconProps,
  InteractiveCardProps,
  ListBoxProps,
  ModalProps,
  NumberFieldProps,
  PaginationProps,
  PasswordInputProps,
  PopoverProps,
  ProgressProps,
  RadioCardProps,
  RadioProps,
  ScrollLinkedProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SliderProps,
  SpinnerProps,
  StackProps,
  StatusIconProps,
  SwitchProps,
  TableProps,
  TabsProps,
  TextareaProps,
  TextFieldProps,
  ToastProps,
  TooltipProps,
} from './schemas';

// 生成 UI で使えるアイコン（schemas.ts の iconName と対応）。
const iconMap = {
  plus: PlusIcon,
  minus: MinusIcon,
  check: CheckIcon,
  close: CloseIcon,
  copy: CopyIcon,
  send: SendIcon,
  mail: MailIcon,
  subscribe: SubscribeIcon,
  rss: RSSIcon,
  history: HistoryIcon,
  'update-date': UpdateDateIcon,
  'publish-date': PublishDateIcon,
  link: LinkIcon,
  'external-link': ExternalLinkIcon,
  location: LocationIcon,
  'navigation-menu': NavigationMenuIcon,
  list: ListIcon,
  table: TableIcon,
  form: FormIcon,
  view: ViewIcon,
  'view-off': ViewOffIcon,
  'light-mode': LightModeIcon,
  'dark-mode': DarkModeIcon,
  palette: PaletteIcon,
  'color-contrast': ColorContrastIcon,
  'color-info': ColorInfoIcon,
  'mixed-color': MixedColorIcon,
  'horizontal-writing': HorizontalWritingIcon,
  'vertical-writing': VerticalWritingIcon,
  tag: TagIcon,
  blog: BlogIcon,
  news: NewsIcon,
  slide: SlideIcon,
  sparkles: SparklesIcon,
  ai: AIIcon,
  atom: AtomIcon,
  accessibility: AccessibilityIcon,
  'shield-check': ShieldCheckIcon,
  prepare: PrepareIcon,
  informative: InformativeIcon,
  good: GoodIcon,
  bad: BadIcon,
  easy: EasyIcon,
  difficult: DifficultIcon,
  interesting: InterestingIcon,
  boring: BoringIcon,
  shallow: ShallowIcon,
  'arte-odyssey': ArteOdyssey,
  logo: LogoIcon,
  github: GitHubIcon,
  twitter: TwitterIcon,
  qiita: QiitaIcon,
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

// Tabs は ARIA の `aria-controls` / `aria-labelledby` で ID を参照するため、
// 同一ページに複数描画されても衝突しないよう `useId()` で生成する必要がある。
// （生成 UI では Tabs が複数並ぶケースは普通にあり得る）。
export const TabsView: FC<{ props: TabsProps }> = ({ props }) => {
  const baseId = useId();
  const ids = props.tabs.map((_, index) => `${baseId}-tab-${index}`) as [
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
};

export function renderTabs(props: TabsProps): ReactNode {
  return <TabsView props={props} />;
}

// ---------------------------------------------------------------------------
// layout
// ---------------------------------------------------------------------------

export function renderStack(props: StackProps, children: ReactNode): ReactNode {
  return (
    <Stack
      align={u(props.align)}
      direction={u(props.direction)}
      gap={u(props.gap)}
      justify={u(props.justify)}
    >
      {children}
    </Stack>
  );
}

export function renderGrid(props: GridProps, children: ReactNode): ReactNode {
  return (
    <Grid
      cols={u(props.cols)}
      gap={u(props.gap)}
      minItemSize={u(props.minItemSize)}
    >
      {children}
    </Grid>
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

// 汎用 Icon に乗せられない、追加引数が必要なアイコンを独立コンポーネントとして公開する。
export function renderChevronIcon(props: ChevronIconProps): ReactNode {
  return (
    <ChevronIcon direction={props.direction} size={u(props.size) ?? 'md'} />
  );
}

// arte-odyssey の AlertIcon を「StatusIcon」として公開（status は文脈と分かるが、
// 生成 UI 利用者からは AlertIcon という名前だと「Alert コンポーネントを使え」と
// 誤解されやすいため改名）。
export function renderStatusIcon(props: StatusIconProps): ReactNode {
  return <AlertIcon size={u(props.size) ?? 'md'} status={props.status} />;
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

// ---------------------------------------------------------------------------
// containers (children を持つ追加分)
// ---------------------------------------------------------------------------

export function renderInteractiveCard(
  props: InteractiveCardProps,
  children: ReactNode,
): ReactNode {
  return (
    <InteractiveCard appearance={u(props.appearance)} width={u(props.width)}>
      {children}
    </InteractiveCard>
  );
}

export function renderForm(props: FormProps, children: ReactNode): ReactNode {
  return <Form action={u(props.action)}>{children}</Form>;
}

// ---------------------------------------------------------------------------
// overlays（自己完結ウィジェット: トリガーボタン＋コンテンツ、開閉は内部 state）
// ---------------------------------------------------------------------------

export const ModalWidget: FC<{ props: ModalProps; children: ReactNode }> = ({
  props,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        size="md"
        variant="contained"
      >
        {props.triggerLabel}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        type={u(props.type)}
      >
        <Dialog.Root>
          <Dialog.Header
            onClose={() => {
              setIsOpen(false);
            }}
            title={props.title}
          />
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog.Root>
      </Modal>
    </>
  );
};

export const DialogWidget: FC<{ props: DialogProps; children: ReactNode }> = ({
  props,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {props.triggerLabel}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        type="center"
      >
        <Dialog.Root>
          <Dialog.Header
            onClose={() => {
              setIsOpen(false);
            }}
            title={props.title}
          />
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog.Root>
      </Modal>
    </>
  );
};

export const DrawerWidget: FC<{ props: DrawerProps; children: ReactNode }> = ({
  props,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        variant="outlined"
      >
        {props.triggerLabel}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        side={u(props.side)}
        title={props.title}
      >
        {children}
      </Drawer>
    </>
  );
};

export function renderPopover(
  props: PopoverProps,
  children: ReactNode,
): ReactNode {
  return (
    <Popover.Root>
      <Popover.Trigger
        renderItem={(triggerProps) => (
          <Button {...triggerProps} variant="outlined">
            {props.triggerLabel}
          </Button>
        )}
      />
      <Popover.Content
        renderItem={({ id, ref }) => (
          <div
            className="bg-bg-raised text-fg-base rounded-lg p-4 shadow-md"
            id={id}
            ref={ref}
          >
            {children}
          </div>
        )}
      />
    </Popover.Root>
  );
}

export function renderTooltip(props: TooltipProps): ReactNode {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        renderItem={(triggerProps) => (
          <Button {...triggerProps} variant="outlined">
            {props.label}
          </Button>
        )}
      />
      <Tooltip.Content>{props.text}</Tooltip.Content>
    </Tooltip.Root>
  );
}

export function renderDropdownMenu(props: DropdownMenuProps): ReactNode {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger text={props.triggerLabel} />
      <DropdownMenu.Content>
        {props.items.map((item) => (
          <DropdownMenu.Item
            key={item.label}
            label={item.label}
            onClick={() => {
              /* no-op: 生成 UI ではローカルメニューのみ */
            }}
          />
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

// ---------------------------------------------------------------------------
// leaf / data 追加分
// ---------------------------------------------------------------------------

export function renderScrollLinked(_props: ScrollLinkedProps): ReactNode {
  return <ScrollLinked />;
}

export function renderBaselineStatus(props: BaselineStatusProps): ReactNode {
  return <BaselineStatus featureId={props.featureId} />;
}

// ---------------------------------------------------------------------------
// Toast: トースト発火ボタンを生成 UI から扱うためのウィジェット。
// ToastProvider はラッパー側で巻く必要があるため、ローカルにも 1 段被せる。
// ---------------------------------------------------------------------------

const ToastTriggerInner: FC<{ props: ToastProps }> = ({ props }) => {
  const { onOpen } = useToast();
  return (
    <Button
      onClick={() => {
        onOpen(props.status, props.message);
      }}
      variant="outlined"
    >
      {props.triggerLabel}
    </Button>
  );
};

export const ToastWidget: FC<{ props: ToastProps }> = ({ props }) => (
  <ToastProvider>
    <ToastTriggerInner props={props} />
  </ToastProvider>
);

// ---------------------------------------------------------------------------
// form 追加分
// ---------------------------------------------------------------------------

export function renderListBox(
  props: ListBoxProps,
  value: string,
  onSelect: (next: string) => void,
): ReactNode {
  const options = props.options.map((o) => ({ key: o.value, label: o.label }));
  return (
    <ListBox.Root
      onSelect={onSelect}
      options={options}
      value={value === '' ? undefined : value}
    >
      <ListBox.Trigger />
      <ListBox.Content />
    </ListBox.Root>
  );
}

export function renderCheckboxGroup(
  props: CheckboxGroupProps,
  value: string[],
  onChange: (next: string[]) => void,
): ReactNode {
  return (
    <CheckboxGroup.Root name={props.name} onChange={onChange} value={value}>
      {props.options.map((option) => (
        <CheckboxGroup.Item
          itemValue={option.value}
          key={option.value}
          label={option.label}
        />
      ))}
    </CheckboxGroup.Root>
  );
}

export function renderAutocomplete(
  props: AutocompleteProps,
  value: string[],
  onChange: (next: string[]) => void,
): ReactNode {
  // Autocomplete は id 必須。name または name から生成する（生成 UI では name でユニーク）。
  return (
    <Autocomplete
      disabled={u(props.disabled)}
      id={`ac-${props.name}`}
      invalid={u(props.invalid)}
      name={props.name}
      onChange={onChange}
      options={props.options}
      value={value}
    />
  );
}

export const FileFieldWidget: FC<{ props: FileFieldProps }> = ({ props }) => (
  <FileField.Root maxFiles={u(props.maxFiles)} multiple={u(props.multiple)}>
    <FileField.Trigger
      renderItem={({ onClick, disabled }) => (
        <Button disabled={disabled} onClick={onClick} variant="outlined">
          {u(props.triggerLabel) ?? 'ファイルを選択'}
        </Button>
      )}
    />
    <FileField.ItemList clearable={u(props.clearable)} />
  </FileField.Root>
);

// FormControl: text/textarea/password のいずれかの入力をラベル＋ヘルプ/エラー付きで包む。
// 自己完結ウィジェット（入力値はローカル state）。
export const FormControlWidget: FC<{ props: FormControlProps }> = ({
  props,
}) => {
  const [value, setValue] = useState(props.defaultValue ?? '');
  const fieldType = u(props.fieldType) ?? 'text';
  return (
    <FormControl
      errorText={u(props.errorText)}
      helpText={u(props.helpText)}
      invalid={u(props.invalid)}
      label={props.label}
      renderInput={(inputProps) =>
        fieldType === 'textarea' ? (
          <Textarea
            {...inputProps}
            name={props.name}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            placeholder={u(props.placeholder)}
            value={value}
          />
        ) : fieldType === 'password' ? (
          <PasswordInput
            {...inputProps}
            name={props.name}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            placeholder={u(props.placeholder)}
            value={value}
          />
        ) : (
          <TextField
            {...inputProps}
            name={props.name}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            placeholder={u(props.placeholder)}
            value={value}
          />
        )
      }
      required={u(props.required)}
    />
  );
};
