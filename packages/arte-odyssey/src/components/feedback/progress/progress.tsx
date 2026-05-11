import type { FC, HTMLAttributes } from 'react';

import { toPrecision } from './../../../internal/to-precision';

type Props = {
  progress: number;
  maxProgress: number;
  minProgress?: number;
  label?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style'>;

export const Progress: FC<Props> = ({
  progress,
  maxProgress,
  minProgress = 0,
  label,
  ...rest
}) => (
  <div {...rest} className="bg-bg-emphasize w-full rounded-full">
    <div
      aria-label={label ?? `${toPrecision(progress / maxProgress).toString()}%`}
      aria-valuemax={maxProgress}
      aria-valuemin={minProgress}
      aria-valuenow={progress}
      className="bg-primary-bg rounded-full transition-all"
      role="progressbar"
      style={{
        inlineSize: `${((progress / maxProgress) * 100).toString()}%`,
        blockSize: '1rem',
      }}
    />
  </div>
);
