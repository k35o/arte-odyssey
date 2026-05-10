import type { FC } from 'react';

import { cn } from './../../../helpers/cn';
import type { CardProps } from './type';

export const InteractiveCard: FC<CardProps> = ({
  children,
  width = 'full',
  appearance = 'shadow',
  ...rest
}) => (
  <div
    {...rest}
    className={cn(
      'rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]',
      appearance === 'shadow' && 'shadow-sm',
      appearance === 'bordered' && 'border border-border-mute',
      width === 'full' && 'w-full',
      width === 'fit' && 'w-fit',
      'bg-bg-base',
    )}
  >
    {children}
  </div>
);
