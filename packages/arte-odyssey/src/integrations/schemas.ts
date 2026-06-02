import { z } from 'zod';

/**
 * Generative UI 統合の props スキーマ（純データ）。
 *
 * React に一切依存しないため **サーバー安全**（RSC のサーバーコンポーネントから
 * import して `catalog.prompt()` などのプロンプト生成に使える）。
 * 描画ロジックは ./renderers（'use client'）に分離している。
 *
 * enum でデザイントークンの値に制約することで、生成 UI が崩れないようにする。
 */

/**
 * LLM 生成の `href` は `<a href>` に直接渡るため、`javascript:` や `data:` の
 * スキームが通ると XSS になる。`http(s)://` 始まり、または `/` から始まる
 * 相対パスのみを許可する。`z.url()` は `javascript:` を拒否しないため正規表現で
 * 明示的にブロックしている。
 */
const safeUrl = z
  .string()
  .regex(/^(https?:\/\/|\/)/u, '外部 URL（http/https）または相対 URL のみ許可');

export const buttonProps = z.object({
  label: z.string(),
  variant: z.enum(['contained', 'outlined', 'skeleton']).optional(),
  color: z.enum(['primary', 'secondary', 'gray']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  fullWidth: z.boolean().optional(),
  href: safeUrl.optional(),
});

export const badgeProps = z.object({
  text: z.string(),
  tone: z.enum(['neutral', 'info', 'success', 'warning', 'error']).optional(),
  variant: z.enum(['solid', 'outline']).optional(),
  size: z.enum(['sm', 'md']).optional(),
});

export const headingProps = z.object({
  text: z.string(),
  level: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).optional(),
  lineClamp: z.number().optional(),
});

export const alertProps = z.object({
  status: z.enum(['success', 'info', 'warning', 'error']),
  message: z.union([z.string(), z.array(z.string())]),
});

export const spinnerProps = z.object({
  label: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
});

export const separatorProps = z.object({
  orientation: z.enum(['horizontal', 'vertical']).optional(),
  color: z.enum(['base', 'mute', 'subtle']).optional(),
});

export const stackProps = z.object({
  direction: z.enum(['row', 'column']).optional(),
  gap: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
  justify: z.enum(['start', 'center', 'end', 'between']).optional(),
});

export const textFieldProps = z.object({
  name: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
});

export const checkboxProps = z.object({
  name: z.string(),
  label: z.string(),
  defaultChecked: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const switchProps = z.object({
  name: z.string(),
  label: z.string(),
  defaultChecked: z.boolean().optional(),
  disabled: z.boolean().optional(),
  invalid: z.boolean().optional(),
  required: z.boolean().optional(),
});

export const cardProps = z.object({
  width: z.enum(['full', 'fit']).optional(),
  appearance: z.enum(['shadow', 'bordered']).optional(),
});

export const selectProps = z.object({
  name: z.string(),
  options: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1)
    .describe('選択肢（value / label）'),
  defaultValue: z.string().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const tabsProps = z.object({
  label: z.string().optional().describe('タブリストのアクセシブル名'),
  tabs: z
    .array(z.object({ label: z.string(), content: z.string() }))
    .min(1)
    .describe('各タブのラベルとテキストパネル'),
});

// 生成 UI で使えるアイコン名（size のみで描画できる安全なものに限定）。
export const iconName = z.enum([
  'plus',
  'minus',
  'check',
  'close',
  'mail',
  'link',
  'external-link',
  'send',
  'copy',
  'tag',
  'list',
  'table',
  'location',
  'sparkles',
]);

export const iconProps = z.object({
  name: iconName,
  size: z.enum(['sm', 'md', 'lg']).optional(),
});

export const iconButtonProps = z.object({
  icon: iconName,
  label: z.string(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  bg: z.enum(['transparent', 'base', 'primary', 'secondary']).optional(),
});

export const anchorProps = z.object({
  text: z.string(),
  href: safeUrl,
  openInNewTab: z.boolean().optional(),
});

export const avatarProps = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  name: z.string().optional(),
  fallback: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
});

export const codeProps = z.object({
  code: z.string(),
});

export const progressProps = z.object({
  progress: z.number(),
  maxProgress: z.number(),
  minProgress: z.number().optional(),
  label: z.string().optional(),
});

export const skeletonProps = z.object({
  shape: z.enum(['rect', 'circle']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  animate: z.boolean().optional(),
});

export const accordionProps = z.object({
  items: z
    .array(
      z.object({
        title: z.string(),
        content: z.string(),
        defaultOpen: z.boolean().optional(),
      }),
    )
    .min(1)
    .describe('各アコーディオン項目（タイトルとテキスト本文）'),
});

export const breadcrumbProps = z.object({
  size: z.enum(['sm', 'md', 'lg']).optional(),
  items: z
    .array(
      z.object({
        label: z.string(),
        href: safeUrl.optional(),
        current: z.boolean().optional(),
      }),
    )
    .min(1)
    .describe('パンくず項目（href 無し、または current=true で現在地）'),
});

export const tableProps = z.object({
  caption: z.string().optional(),
  columns: z
    .array(
      z.object({
        label: z.string(),
        align: z.enum(['left', 'center', 'right']).optional(),
      }),
    )
    .min(1),
  rows: z
    .array(z.array(z.string()))
    .describe('各行のセル文字列（columns と同じ順序・個数）'),
});

export const textareaProps = z.object({
  name: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
});

export const passwordInputProps = z.object({
  name: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const numberFieldProps = z.object({
  name: z.string(),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const sliderProps = z.object({
  name: z.string(),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const radioProps = z.object({
  name: z.string(),
  label: z.string(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  defaultValue: z.string().optional(),
  disabled: z.boolean().optional(),
});

export const radioCardProps = z.object({
  name: z.string(),
  label: z.string(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
        disabled: z.boolean().optional(),
      }),
    )
    .min(1),
  defaultValue: z.string().optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const checkboxCardProps = z.object({
  name: z.string(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
        disabled: z.boolean().optional(),
      }),
    )
    .min(1),
  defaultValue: z.array(z.string()).optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const paginationProps = z.object({
  name: z.string(),
  totalPages: z.number(),
  prevLabel: z.string().optional(),
  nextLabel: z.string().optional(),
  disabled: z.boolean().optional(),
});

// --- コンテナ系（children を持つ。OpenUI では children を別途 extend する） ---

export const interactiveCardProps = z.object({
  width: z.enum(['full', 'fit']).optional(),
  appearance: z.enum(['shadow', 'bordered']).optional(),
});

export const formProps = z.object({
  action: z.string().optional().describe('送信先 URL（任意）'),
});

export const modalProps = z.object({
  triggerLabel: z.string().describe('モーダルを開くボタンの文言'),
  title: z.string(),
  type: z.enum(['center', 'bottom', 'right', 'left']).optional(),
});

export const dialogProps = z.object({
  triggerLabel: z.string().describe('ダイアログを開くボタンの文言'),
  title: z.string(),
});

export const drawerProps = z.object({
  triggerLabel: z.string().describe('ドロワーを開くボタンの文言'),
  title: z.string(),
  side: z.enum(['left', 'right']).optional(),
});

export const popoverProps = z.object({
  triggerLabel: z.string().describe('ポップオーバーを開くボタンの文言'),
});

// --- leaf / data 系 ---

export const scrollLinkedProps = z.object({});

export const baselineStatusProps = z.object({
  featureId: z.string().describe('Web feature の ID'),
});

export const tooltipProps = z.object({
  label: z.string().describe('ツールチップを表示するトリガーの文言'),
  text: z.string().describe('ツールチップの内容'),
});

export const dropdownMenuProps = z.object({
  triggerLabel: z.string(),
  items: z
    .array(z.object({ label: z.string() }))
    .min(1)
    .describe('メニュー項目'),
});

export const toastProps = z.object({
  triggerLabel: z.string().describe('トーストを表示するボタンの文言'),
  status: z.enum(['success', 'info', 'warning', 'error']),
  message: z.string(),
});

// --- フォーム系 ---

export const listBoxProps = z.object({
  name: z.string(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  defaultValue: z.string().optional(),
});

export const checkboxGroupProps = z.object({
  name: z.string(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  defaultValue: z.array(z.string()).optional(),
});

export const autocompleteProps = z.object({
  name: z.string(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  defaultValue: z.array(z.string()).optional(),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const fileFieldProps = z.object({
  multiple: z.boolean().optional(),
  maxFiles: z.number().optional(),
  clearable: z.boolean().optional(),
});

export const formControlProps = z.object({
  label: z.string(),
  fieldType: z.enum(['text', 'textarea', 'password']).optional(),
  name: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  helpText: z.string().optional(),
  errorText: z.string().optional(),
  required: z.boolean().optional(),
  invalid: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof buttonProps>;
export type BadgeProps = z.infer<typeof badgeProps>;
export type HeadingProps = z.infer<typeof headingProps>;
export type AlertProps = z.infer<typeof alertProps>;
export type SpinnerProps = z.infer<typeof spinnerProps>;
export type SeparatorProps = z.infer<typeof separatorProps>;
export type StackProps = z.infer<typeof stackProps>;
export type TextFieldProps = z.infer<typeof textFieldProps>;
export type CheckboxProps = z.infer<typeof checkboxProps>;
export type SwitchProps = z.infer<typeof switchProps>;
export type CardProps = z.infer<typeof cardProps>;
export type SelectProps = z.infer<typeof selectProps>;
export type TabsProps = z.infer<typeof tabsProps>;
export type IconName = z.infer<typeof iconName>;
export type IconProps = z.infer<typeof iconProps>;
export type IconButtonProps = z.infer<typeof iconButtonProps>;
export type AnchorProps = z.infer<typeof anchorProps>;
export type AvatarProps = z.infer<typeof avatarProps>;
export type CodeProps = z.infer<typeof codeProps>;
export type ProgressProps = z.infer<typeof progressProps>;
export type SkeletonProps = z.infer<typeof skeletonProps>;
export type AccordionProps = z.infer<typeof accordionProps>;
export type BreadcrumbProps = z.infer<typeof breadcrumbProps>;
export type TableProps = z.infer<typeof tableProps>;
export type TextareaProps = z.infer<typeof textareaProps>;
export type PasswordInputProps = z.infer<typeof passwordInputProps>;
export type NumberFieldProps = z.infer<typeof numberFieldProps>;
export type SliderProps = z.infer<typeof sliderProps>;
export type RadioProps = z.infer<typeof radioProps>;
export type RadioCardProps = z.infer<typeof radioCardProps>;
export type CheckboxCardProps = z.infer<typeof checkboxCardProps>;
export type PaginationProps = z.infer<typeof paginationProps>;
export type InteractiveCardProps = z.infer<typeof interactiveCardProps>;
export type FormProps = z.infer<typeof formProps>;
export type ModalProps = z.infer<typeof modalProps>;
export type DialogProps = z.infer<typeof dialogProps>;
export type DrawerProps = z.infer<typeof drawerProps>;
export type PopoverProps = z.infer<typeof popoverProps>;
export type ScrollLinkedProps = z.infer<typeof scrollLinkedProps>;
export type BaselineStatusProps = z.infer<typeof baselineStatusProps>;
export type TooltipProps = z.infer<typeof tooltipProps>;
export type DropdownMenuProps = z.infer<typeof dropdownMenuProps>;
export type ToastProps = z.infer<typeof toastProps>;
export type ListBoxProps = z.infer<typeof listBoxProps>;
export type CheckboxGroupProps = z.infer<typeof checkboxGroupProps>;
export type AutocompleteProps = z.infer<typeof autocompleteProps>;
export type FileFieldProps = z.infer<typeof fileFieldProps>;
export type FormControlProps = z.infer<typeof formControlProps>;
