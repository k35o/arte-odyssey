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
