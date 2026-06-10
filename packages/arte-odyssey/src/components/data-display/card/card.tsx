import type { FC, HTMLAttributes } from 'react';

import { cn } from './../../../helpers/cn';

type CardProps = {
  width?: 'full' | 'fit';
  appearance?: 'shadow' | 'bordered';
  interactive?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

export const Card: FC<CardProps> = ({
  children,
  width = 'full',
  appearance = 'shadow',
  interactive = false,
  ...rest
}) => (
  <div
    {...rest}
    className={cn(
      'rounded-xl',
      appearance === 'shadow' && 'shadow-sm',
      appearance === 'bordered' && 'border border-border-mute',
      width === 'full' && 'w-full',
      width === 'fit' && 'w-fit',
      interactive &&
        'motion-safe:transition-transform hover:motion-safe:scale-[1.02] active:motion-safe:scale-[0.98]',
      'bg-bg-base',
    )}
  >
    {children}
  </div>
);
