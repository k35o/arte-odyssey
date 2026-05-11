'use client';

import type { ChangeEventHandler, FC, InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '../../../helpers/cn';
import { useControllableState } from '../../../hooks/controllable-state';

type BaseProps = {
  invalid?: boolean;
  label: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'type'
  | 'role'
  | 'className'
  | 'style'
  | 'value'
  | 'onChange'
  | 'defaultChecked'
  | 'checked'
  | 'children'
>;

type ControlledProps = {
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: never;
};

type UncontrolledProps = {
  defaultChecked?: boolean;
  value?: never;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

type Props = BaseProps & (ControlledProps | UncontrolledProps);

export const Switch: FC<Props> = ({
  value,
  defaultChecked,
  id,
  disabled = false,
  invalid = false,
  required = false,
  label,
  onChange,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isSelected, setSelected] = useControllableState({
    value,
    defaultValue: defaultChecked ?? false,
  });
  const { pending } = useFormStatus();

  const isControlled = value !== undefined;
  const disabledResolved = disabled || pending;

  return (
    <label
      className={cn(
        'inline-flex w-fit items-center gap-3',
        disabledResolved ? 'cursor-not-allowed text-fg-mute' : 'cursor-pointer',
      )}
      htmlFor={inputId}
    >
      <span className="relative inline-flex shrink-0">
        <input
          {...rest}
          aria-checked={isSelected}
          aria-invalid={invalid}
          aria-required={required}
          {...(isControlled ? { checked: value } : { defaultChecked })}
          className="peer sr-only"
          disabled={disabledResolved}
          id={inputId}
          onChange={(event) => {
            setSelected(event.target.checked);
            onChange?.(event);
          }}
          required={required}
          role="switch"
          type="checkbox"
        />
        <span
          aria-hidden
          className={cn(
            'inline-flex h-7 w-12 items-center rounded-full transition-colors',
            invalid && 'ring-2 ring-border-error',
            isSelected ? 'bg-primary-bg' : 'bg-bg-mute',
            disabledResolved && 'bg-bg-subtle',
            'peer-focus-visible:outline-hidden peer-focus-visible:ring-2 peer-focus-visible:ring-border-info peer-focus-visible:ring-offset-2',
          )}
        >
          <span
            className={cn(
              'ml-0.5 size-5 rounded-full bg-bg-base shadow-xs transition-transform',
              isSelected && 'translate-x-5',
              disabledResolved && 'bg-bg-emphasize',
            )}
          />
        </span>
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
};
