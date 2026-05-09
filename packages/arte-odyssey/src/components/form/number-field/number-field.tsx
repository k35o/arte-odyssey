'use client';

import { type FC, type InputHTMLAttributes, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { ChevronIcon } from '../../icons';
import { cn } from './../../../helpers/cn';
import { useControllableState } from './../../../hooks/controllable-state';
import { clamp } from './../../../internal/clamp';
import { toPrecision } from './../../../internal/to-precision';
import { cast } from './cast';

type BaseProps = {
  invalid?: boolean;
  precision?: number;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'type'
  | 'role'
  | 'className'
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'children'
  | 'step'
  | 'min'
  | 'max'
> & {
    step?: number;
    min?: number;
    max?: number;
  };

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

export const NumberField: FC<Props> = ({
  invalid = false,
  disabled = false,
  required = false,
  value,
  defaultValue,
  onChange,
  step = 1,
  precision = 0,
  max = 9_007_199_254_740_991,
  min = -9_007_199_254_740_991,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useControllableState<number>({
    value,
    defaultValue: defaultValue ?? 0,
    onChange,
  });
  const [displayValue, setDisplayValue] = useState(
    currentValue.toFixed(precision),
  );
  const [prevValue, setPrevValue] = useState(currentValue);
  const { pending } = useFormStatus();

  if (currentValue !== prevValue) {
    setDisplayValue(currentValue.toFixed(precision));
    setPrevValue(currentValue);
  }

  const handleChange = (newValue: number) => {
    setCurrentValue(newValue);
  };

  return (
    <div
      className={cn(
        'relative flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-border-base bg-bg-base',
        'focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-border-info',
        'has-aria-invalid:border-border-error',
        'has-disabled:cursor-not-allowed has-disabled:border-border-mute has-disabled:bg-bg-mute hover:has-disabled:has-hover:bg-bg-mute',
      )}
    >
      <input
        autoComplete="off"
        autoCorrect="off"
        inputMode="decimal"
        {...rest}
        aria-invalid={invalid}
        aria-required={required}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={currentValue}
        className={cn(
          'grow bg-transparent pr-8 pl-3 focus-visible:outline-hidden size-full',
          'disabled:cursor-not-allowed',
          'read-only:cursor-not-allowed',
        )}
        disabled={disabled}
        readOnly={pending || undefined}
        onBlur={() => {
          const newValue = clamp(cast(displayValue, precision), min, max);
          handleChange(newValue);
          setDisplayValue(newValue.toFixed(precision));
        }}
        onChange={(e) => {
          if (
            e.nativeEvent instanceof InputEvent &&
            e.nativeEvent.isComposing
          ) {
            return;
          }
          setDisplayValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            const newValue = clamp(
              toPrecision(cast(displayValue, precision) + step, precision),
              min,
              max,
            );
            handleChange(newValue);
            setDisplayValue(newValue.toFixed(precision));
          }
          if (e.key === 'ArrowDown') {
            const newValue = clamp(
              toPrecision(cast(displayValue, precision) - step, precision),
              min,
              max,
            );
            handleChange(newValue);
            setDisplayValue(newValue.toFixed(precision));
          }
        }}
        pattern="[0-9]*(.[0-9]+)?"
        role="spinbutton"
        type="text"
        value={displayValue}
      />
      <div
        aria-hidden="true"
        className="absolute right-1 flex h-full flex-col py-1"
      >
        <button
          className={cn(
            'flex w-6 grow items-center justify-center rounded-md text-fg-mute transition-colors',
            'hover:bg-bg-mute hover:text-fg-base',
            'disabled:cursor-not-allowed disabled:text-fg-mute hover:disabled:bg-transparent',
          )}
          disabled={disabled || pending}
          onClick={() => {
            const newValue = clamp(
              toPrecision(cast(displayValue, precision) + step, precision),
              min,
              max,
            );
            handleChange(newValue);
            setDisplayValue(newValue.toFixed(precision));
          }}
          tabIndex={-1}
          type="button"
        >
          <span className="sr-only">増やす</span>
          <ChevronIcon direction="up" size="sm" />
        </button>
        <button
          className={cn(
            'flex w-6 grow items-center justify-center rounded-md text-fg-mute transition-colors',
            'hover:bg-bg-mute hover:text-fg-base',
            'disabled:cursor-not-allowed disabled:text-fg-mute hover:disabled:bg-transparent',
          )}
          disabled={disabled || pending}
          onClick={() => {
            const newValue = clamp(
              toPrecision(cast(displayValue, precision) - step, precision),
              min,
              max,
            );
            handleChange(newValue);
            setDisplayValue(newValue.toFixed(precision));
          }}
          tabIndex={-1}
          type="button"
        >
          <span className="sr-only">減らす</span>
          <ChevronIcon direction="down" size="sm" />
        </button>
      </div>
    </div>
  );
};
