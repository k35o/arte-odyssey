'use client';

import type {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FieldsetHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react';
import { useId, useRef } from 'react';

import { cn } from '../../../helpers/cn';
import { useControllableState } from '../../../hooks/controllable-state';
import { FOCUS_RING_NO_BORDER } from '../../_internal/focus-ring';

export type RadioCardOption = Readonly<{
  value: string;
  label: string;
  description?: string;
  visual?: ReactNode;
  disabled?: boolean;
}>;

type BaseProps = {
  'aria-labelledby': string;
  invalid?: boolean;
  options: readonly RadioCardOption[];
} & Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  | 'className'
  | 'style'
  | 'children'
  | 'onChange'
  | 'defaultValue'
  | 'aria-labelledby'
>;

type ControlledProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: never;
};

type UncontrolledProps = {
  defaultValue?: string;
  value?: never;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

type Props = BaseProps & (ControlledProps | UncontrolledProps);

export const RadioCard: FC<Props> = ({
  'aria-labelledby': labelledbyId,
  name,
  disabled = false,
  invalid = false,
  options,
  value,
  defaultValue,
  onChange,
  ...rest
}) => {
  const groupId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [currentValue, setCurrentValue] = useControllableState<
    string | undefined
  >({
    value,
    defaultValue: defaultValue ?? options[0]?.value,
  });

  const selectValue = (nextValue: string) => {
    setCurrentValue(nextValue);
    onChange?.({
      target: { value: nextValue },
    } as ChangeEvent<HTMLInputElement>);
  };

  const focusIndex = (index: number) => {
    buttonRefs.current[index]?.focus();
  };

  const getNextIndex = (index: number, direction: 1 | -1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0) {
      return options.length - 1;
    }
    if (nextIndex >= options.length) {
      return 0;
    }
    return nextIndex;
  };

  return (
    <fieldset
      {...rest}
      aria-labelledby={labelledbyId}
      className={cn(
        'm-0 min-w-0 border-0 p-0 inline-full',
        'grid gap-3',
        disabled && 'opacity-70',
      )}
    >
      {name !== undefined && name !== '' ? (
        <input name={name} type="hidden" value={currentValue ?? ''} />
      ) : null}
      {options.map((option, index) => {
        const checked = currentValue === option.value;
        const optionDisabled = disabled || option.disabled === true;
        const hasDescription =
          option.description !== undefined && option.description !== '';
        const hasVisual = option.visual !== undefined && option.visual !== null;
        const optionId = `${groupId}-${option.value}`;

        return (
          <button
            aria-describedby={
              hasDescription ? `${optionId}-description` : undefined
            }
            aria-pressed={checked}
            className={cn(
              'flex min-w-0 rounded-xl border bg-bg-base p-4 text-left transition-colors inline-full',
              FOCUS_RING_NO_BORDER,
              checked &&
                'border-primary-border bg-primary-bg-subtle hover:bg-primary-bg-mute',
              invalid
                ? 'border-border-error'
                : !checked && 'border-border-mute hover:bg-bg-subtle',
              optionDisabled &&
                'cursor-not-allowed border-border-mute bg-bg-subtle text-fg-mute',
            )}
            disabled={optionDisabled}
            id={optionId}
            key={option.value}
            onClick={() => {
              selectValue(option.value);
            }}
            onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
              if (
                event.key !== 'ArrowDown' &&
                event.key !== 'ArrowRight' &&
                event.key !== 'ArrowUp' &&
                event.key !== 'ArrowLeft'
              ) {
                return;
              }

              event.preventDefault();
              const isVerticalRl =
                getComputedStyle(event.currentTarget).writingMode ===
                'vertical-rl';
              const forwardKey = isVerticalRl ? 'ArrowLeft' : 'ArrowRight';
              const direction =
                event.key === 'ArrowDown' || event.key === forwardKey ? 1 : -1;
              const nextIndex = getNextIndex(index, direction);
              const nextOption = options[nextIndex];
              if (!nextOption) {
                return;
              }
              selectValue(nextOption.value);
              focusIndex(nextIndex);
            }}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            tabIndex={checked ? 0 : -1}
            type="button"
          >
            {hasVisual ? (
              <span aria-hidden className="mr-4 shrink-0">
                {option.visual}
              </span>
            ) : null}
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-fg-base font-medium">{option.label}</span>
              {hasDescription ? (
                <span
                  className="text-fg-mute text-sm"
                  id={`${optionId}-description`}
                >
                  {option.description}
                </span>
              ) : null}
            </span>
            <span
              aria-hidden
              className={cn(
                'mt-0.5 ml-4 inline-flex size-5 shrink-0 items-center justify-center rounded-full border',
                checked
                  ? 'border-border-base bg-primary-bg'
                  : 'border-border-mute bg-bg-base',
              )}
            >
              <span
                className={cn(
                  'size-2 rounded-full bg-primary-border transition-opacity',
                  checked ? 'opacity-100' : 'opacity-0',
                )}
              />
            </span>
          </button>
        );
      })}
    </fieldset>
  );
};
