export type Status = 'success' | 'info' | 'warning' | 'error';

export type Direction = 'up' | 'down' | 'right' | 'left';

/**
 * オーバーレイの配置。物理方向（side）と整列（alignment）の組み合わせ。
 * 旧 `@floating-ui/react` の `Placement` 互換のローカル定義。
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type Option = Readonly<{
  value: string;
  label: string;
}>;
