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

export const buttonProps = z.object({
  label: z.string(),
  variant: z.enum(['contained', 'outlined', 'skeleton']).optional(),
  color: z.enum(['primary', 'secondary', 'gray']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  fullWidth: z.boolean().optional(),
  href: z.string().optional(),
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
  href: z.string(),
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
        href: z.string().optional(),
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
