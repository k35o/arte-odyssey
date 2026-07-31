import type { CSSProperties, FC, HTMLAttributes } from 'react';

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
}) => {
  const percentage = toPrecision(
    ((progress - minProgress) / (maxProgress - minProgress)) * 100,
  );
  return (
    <div
      {...rest}
      className="bg-bg-emphasize vertical:inline-48 rounded-full block-4 inline-full"
      style={
        {
          '--progress-fill': `${percentage.toString()}%`,
        } as CSSProperties
      }
    >
      <div
        aria-label={label ?? `${percentage.toString()}%`}
        aria-valuemax={maxProgress}
        aria-valuemin={minProgress}
        aria-valuenow={progress}
        className="bg-primary-bg rounded-full transition-[inline-size] block-full inline-(--progress-fill)"
        role="progressbar"
      />
    </div>
  );
};
