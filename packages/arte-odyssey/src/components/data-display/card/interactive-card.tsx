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
      // dark mode では shadow-sm がほぼ視認できないため、subtle な border で
      // カード境界を補強する。light 時のレイアウト維持のため transparent な
      // border を常時出しておく。Card と同じ扱い。
      appearance === 'shadow' &&
        'shadow-sm border border-transparent dark:border-border-subtle',
      appearance === 'bordered' && 'border border-border-mute',
      width === 'full' && 'w-full',
      width === 'fit' && 'w-fit',
      'bg-bg-base',
    )}
  >
    {children}
  </div>
);
