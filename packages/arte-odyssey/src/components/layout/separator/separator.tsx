import type { FC, HTMLAttributes } from 'react';

import { cn } from './../../../helpers/cn';

type Props = {
  orientation?: 'horizontal' | 'vertical';
  color?: 'base' | 'mute' | 'subtle';
} & Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'role' | 'aria-orientation' | 'className' | 'style'
>;

export const Separator: FC<Props> = ({
  orientation = 'horizontal',
  color = 'base',
  ...rest
}) => {
  const isVertical = orientation === 'vertical';
  return (
    <span
      {...rest}
      aria-orientation={orientation}
      className={cn(
        'block',
        isVertical
          ? 'h-full w-px vertical:h-px vertical:w-full'
          : 'h-px w-full vertical:h-full vertical:w-px',
        color === 'base' && 'bg-border-base',
        color === 'mute' && 'bg-border-mute',
        color === 'subtle' && 'bg-border-subtle',
      )}
      role="separator"
    />
  );
};
