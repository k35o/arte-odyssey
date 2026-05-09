import type { FC, HTMLAttributes } from 'react';

import { cn } from './../../../helpers/cn';
import { toPrecision } from './../../../internal/to-precision';

type Props = {
  progress: number;
  maxProgress: number;
  minProgress?: number;
  label?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Progress: FC<Props> = ({
  progress,
  maxProgress,
  minProgress = 0,
  label,
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={cn('bg-bg-emphasize w-full rounded-full', className)}
  >
    <div
      aria-label={label ?? `${toPrecision(progress / maxProgress).toString()}%`}
      aria-valuemax={maxProgress}
      aria-valuemin={minProgress}
      aria-valuenow={progress}
      className="bg-primary-bg h-4 rounded-full transition-all"
      role="progressbar"
      style={{
        width: `${((progress / maxProgress) * 100).toString()}%`,
      }}
    />
  </div>
);
