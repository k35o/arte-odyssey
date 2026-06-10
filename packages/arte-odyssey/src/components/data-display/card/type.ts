import type { HTMLAttributes } from 'react';

export type CardProps = {
  width?: 'full' | 'fit';
  appearance?: 'shadow' | 'bordered';
  interactive?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;
