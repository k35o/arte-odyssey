'use client';

import { type FC, type ReactElement, useId } from 'react';

type FormControlProps = {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label: string;
  labelAs?: 'label' | 'legend';
  helpText?: string;
  errorText?: string | undefined;
  renderInput: (props: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-labelledby': string;
    disabled: boolean;
    invalid: boolean;
    required: boolean;
  }) => ReactElement;
};

export const FormControl: FC<FormControlProps> = ({
  disabled = false,
  invalid = false,
  required = false,
  label,
  labelAs = 'label',
  helpText,
  errorText,
  renderInput,
}) => {
  const id = useId();
  const hasErrorText = errorText !== undefined && errorText !== '';
  const hasHelpText = helpText !== undefined && helpText !== '';
  const describedbyId =
    invalid && hasErrorText
      ? `${id}-feedback`
      : hasHelpText
        ? `${id}-helptext`
        : undefined;
  const labelId = `${id}-label`;
  return (
    <fieldset className="flex w-full min-w-0 flex-col">
      {labelAs === 'label' ? (
        <label
          className="text-fg-base text-md mb-1 flex gap-2 pl-0.5 font-bold"
          htmlFor={id}
          id={labelId}
        >
          {label}
          {required && <span className="text-fg-error font-medium">必須</span>}
        </label>
      ) : (
        <legend className="text-fg-base text-md mb-1 flex gap-2 pl-0.5 font-bold">
          {label}
          {required && <span className="text-fg-error font-medium">必須</span>}
        </legend>
      )}
      {renderInput({
        id,
        'aria-describedby': describedbyId,
        'aria-labelledby': labelId,
        disabled,
        invalid,
        required,
      })}
      {invalid && hasErrorText ? (
        <p
          aria-live="polite"
          className="text-fg-error mt-1 pl-0.5 text-sm"
          id={`${id}-feedback`}
        >
          {errorText}
        </p>
      ) : hasHelpText ? (
        <p className="text-fg-mute mt-1 pl-0.5 text-sm" id={`${id}-helptext`}>
          {helpText}
        </p>
      ) : null}
    </fieldset>
  );
};
