'use client';

import {
  createContext,
  type FC,
  type FieldsetHTMLAttributes,
  type PropsWithChildren,
  use,
  useCallback,
  useMemo,
} from 'react';

import { cn } from '../../../helpers/cn';
import { useControllableState } from '../../../hooks/controllable-state';

type CheckboxGroupContextValue = {
  currentValue: string[];
  disabled: boolean;
  name: string;
  toggleValue: (value: string) => void;
};

const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

export const useCheckboxGroupContext = () => use(CheckboxGroupContext);

type RootBaseProps = PropsWithChildren<
  {
    invalid?: boolean;
    required?: boolean;
    name: string;
  } & Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'className' | 'style' | 'onChange' | 'defaultValue' | 'name'
  >
>;

type RootControlledProps = {
  value: string[];
  onChange: (value: string[]) => void;
  defaultValue?: never;
};

type RootUncontrolledProps = {
  defaultValue?: string[];
  value?: never;
  onChange?: (value: string[]) => void;
};

type RootProps = RootBaseProps & (RootControlledProps | RootUncontrolledProps);

const Root: FC<RootProps> = ({
  children,
  defaultValue,
  disabled = false,
  invalid = false,
  required = false,
  name,
  onChange,
  value,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? [],
    onChange,
  });

  const toggleValue = useCallback(
    (targetValue: string) => {
      const nextValue = currentValue.includes(targetValue)
        ? currentValue.filter((item) => item !== targetValue)
        : [...currentValue, targetValue];

      setCurrentValue(nextValue);
    },
    [currentValue, setCurrentValue],
  );

  const contextValue = useMemo<CheckboxGroupContextValue>(
    () => ({
      currentValue,
      disabled,
      name,
      toggleValue,
    }),
    [currentValue, disabled, name, toggleValue],
  );

  return (
    <fieldset
      {...rest}
      aria-invalid={invalid}
      aria-required={required}
      className={cn('flex flex-col gap-2', disabled && 'cursor-not-allowed')}
    >
      <CheckboxGroupContext value={contextValue}>
        {children}
      </CheckboxGroupContext>
    </fieldset>
  );
};

export const CheckboxGroup = Object.assign(Root, { Root });
