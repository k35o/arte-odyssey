'use client';

import type { FC, InputHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '../../../helpers/cn';
import { useControllableState } from '../../../hooks/controllable-state';

type BaseProps = {
  invalid?: boolean;
  step?: number;
  max?: number;
  min?: number;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'type'
  | 'className'
  | 'style'
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'children'
  | 'step'
  | 'max'
  | 'min'
>;

type ControlledProps = {
  value: number;
  onChange: (value: number) => void;
  defaultValue?: never;
};

type UncontrolledProps = {
  defaultValue?: number;
  value?: never;
  onChange?: (value: number) => void;
};

type Props = BaseProps & (ControlledProps | UncontrolledProps);

export const Slider: FC<Props> = ({
  invalid = false,
  disabled = false,
  required = false,
  value,
  defaultValue,
  onChange,
  step = 1,
  max = 100,
  min = 0,
  ...rest
}) => {
  const [currentValue, handleChange] = useControllableState({
    value,
    defaultValue: defaultValue ?? min,
    onChange,
  });
  const { pending } = useFormStatus();
  const disabledResolved = disabled || pending;
  const range = Math.max(max - min, 1);
  const progress = ((currentValue - min) / range) * 100;
  const clampedProgress = `${Math.min(Math.max(progress, 0), 100)}%`;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        'h-8 w-full vertical:h-full vertical:w-8',
        disabledResolved && 'opacity-50',
      )}
      style={{ '--slider-progress': clampedProgress } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="bg-bg-mute vertical:h-full vertical:w-2 relative h-2 w-full rounded-full"
      >
        <span
          aria-hidden
          className={cn(
            'bg-primary-bg absolute inset-y-0 left-0 h-full w-(--slider-progress) rounded-full',
            'vertical:top-0 vertical:left-auto vertical:right-0 vertical:inset-y-auto vertical:h-(--slider-progress) vertical:w-full',
            invalid && 'bg-bg-error',
          )}
        />
      </span>
      <input
        {...rest}
        aria-invalid={invalid}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={currentValue}
        className={cn(
          'absolute inset-0 z-10 appearance-none bg-transparent',
          'h-8 w-full vertical:h-full vertical:w-8 vertical:[writing-mode:vertical-lr]',
          'focus:outline-none',
          'disabled:cursor-not-allowed',
          '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent',
          '[&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border-base [&::-webkit-slider-thumb]:bg-bg-base [&::-webkit-slider-thumb]:shadow-xs',
          '[&:focus-visible::-webkit-slider-thumb]:border-transparent [&:focus-visible::-webkit-slider-thumb]:ring-2 [&:focus-visible::-webkit-slider-thumb]:ring-border-info',
          '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent',
          '[&::-moz-range-progress]:h-2 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-transparent',
          '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-border-base [&::-moz-range-thumb]:bg-bg-base [&::-moz-range-thumb]:shadow-xs',
          '[&:focus-visible::-moz-range-thumb]:border-transparent [&:focus-visible::-moz-range-thumb]:ring-2 [&:focus-visible::-moz-range-thumb]:ring-border-info',
          invalid &&
            '[&::-moz-range-thumb]:border-border-error [&::-webkit-slider-thumb]:border-border-error [&:focus-visible::-moz-range-thumb]:ring-border-error [&:focus-visible::-webkit-slider-thumb]:ring-border-error',
        )}
        disabled={disabledResolved}
        max={max}
        min={min}
        onChange={(event) => {
          handleChange(Number(event.target.value));
        }}
        required={required}
        step={step}
        type="range"
        value={currentValue}
      />
    </div>
  );
};
