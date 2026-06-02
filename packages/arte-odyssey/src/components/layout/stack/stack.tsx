import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from './../../../helpers/cn';

export type StackProps = PropsWithChildren<
  {
    direction?: 'row' | 'column';
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between';
  } & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>
>;

const GAP_CLASS = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;

const ALIGN_CLASS = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

const JUSTIFY_CLASS = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

export const Stack: FC<StackProps> = ({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  children,
  ...rest
}) => (
  <div
    {...rest}
    className={cn(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      GAP_CLASS[gap],
      align && ALIGN_CLASS[align],
      justify && JUSTIFY_CLASS[justify],
    )}
  >
    {children}
  </div>
);
