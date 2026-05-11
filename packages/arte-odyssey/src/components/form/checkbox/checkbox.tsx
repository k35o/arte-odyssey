'use client';

import type {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
} from 'react';
import { useFormStatus } from 'react-dom';

import { CheckIcon } from '../../icons';
import { useCheckboxGroupContext } from '../checkbox-group/checkbox-group';
import { cn } from './../../../helpers/cn';
import { useControllableState } from './../../../hooks/controllable-state';

type BaseProps = {
  itemValue?: string;
  label: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'type'
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

export const Checkbox: FC<Props> = ({
  name,
  itemValue,
  disabled = false,
  label,
  value,
  defaultChecked,
  onChange,
  ...rest
}) => {
  const groupContext = useCheckboxGroupContext();
  const { pending } = useFormStatus();
  const [internalChecked, setInternalChecked] = useControllableState({
    value,
    defaultValue: defaultChecked ?? false,
  });
  const groupItemValue = itemValue ?? '';

  if (groupContext && (itemValue === undefined || itemValue === '')) {
    throw new Error('Checkbox inside CheckboxGroup requires itemValue');
  }

  const isControlled = value !== undefined;
  const disabledResolved =
    disabled || groupContext?.disabled === true || pending;
  const checked = groupContext
    ? groupContext.currentValue.includes(groupItemValue)
    : internalChecked;

  const setChecked = (nextChecked: boolean) => {
    setInternalChecked(nextChecked);
    onChange?.({
      target: { checked: nextChecked },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-left',
        disabledResolved ? 'cursor-not-allowed text-fg-mute' : 'cursor-pointer',
      )}
    >
      <input
        {...rest}
        {...(groupContext || isControlled
          ? { checked: groupContext ? checked : value }
          : { defaultChecked })}
        className="peer sr-only"
        disabled={disabledResolved}
        name={groupContext?.name ?? name}
        onChange={(event) => {
          if (groupContext) {
            groupContext.toggleValue(groupItemValue);
            return;
          }

          setChecked(event.target.checked);
        }}
        type="checkbox"
        value={groupContext ? groupItemValue : undefined}
      />
      <span
        aria-hidden
        className={cn(
          'inline-flex size-5 items-center justify-center rounded-md border-2 transition-colors',
          'peer-focus-visible:border-transparent peer-focus-visible:outline-hidden peer-focus-visible:ring-2 peer-focus-visible:ring-border-info',
          disabledResolved && 'border-border-mute bg-bg-mute',
          checked
            ? 'border-border-base bg-primary-bg text-fg-base'
            : 'border-border-mute bg-bg-base',
        )}
      >
        {checked ? <CheckIcon size="sm" /> : null}
      </span>
      <span className="text-lg">{label}</span>
    </label>
  );
};
