'use client';

import {
  type CSSProperties,
  type FC,
  type InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormStatus } from 'react-dom';

import {
  useControllableState,
  useDeferredDebounce,
  useDisclosure,
  useWritingMode,
} from '../../../hooks';
import type { Option } from '../../../types/variables';
import { FOCUS_RING_WITHIN } from '../../_internal/focus-ring';
import { IconButton } from '../../buttons/icon-button';
import { CloseIcon } from '../../icons';
import { cn } from './../../../helpers/cn';

type BaseProps = {
  id: string;
  invalid?: boolean;
  options: readonly Option[];
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'type'
  | 'role'
  | 'className'
  | 'style'
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'children'
  | 'id'
  | 'autoComplete'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-expanded'
>;

type ControlledProps = {
  value: string[];
  onChange: (value: string[]) => void;
  defaultValue?: never;
};

type UncontrolledProps = {
  defaultValue?: string[];
  value?: never;
  onChange?: (value: string[]) => void;
};

type Props = BaseProps & (ControlledProps | UncontrolledProps);

export const Autocomplete: FC<Props> = ({
  id,
  name,
  invalid = false,
  disabled = false,
  required = false,
  options,
  value,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [currentValue, handleChange] = useControllableState({
    value,
    defaultValue: defaultValue ?? [],
    onChange,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, open, close } = useDisclosure();
  const [text, setText] = useState('');
  const [selectIndex, setSelectIndex] = useState<number>();

  // floating-ui の位置決め（offset/flip/size/autoUpdate）を CSS Anchor Positioning に置換。
  // reference の inline 寸法に幅を合わせる。縦書きでは inline 軸が物理 height になるため、
  // 元実装と同様に書字方向で anchor-size の物理キーワードを切り替える（論理 inline より広くサポート）。
  const writingMode = useWritingMode(ref);
  const anchorName = `--ao-ac-${id.replaceAll(/[^a-zA-Z0-9_-]/gu, '')}`;
  const listboxStyle: CSSProperties & {
    positionAnchor?: string;
    positionArea?: string;
    positionTryFallbacks?: string;
  } = {
    position: 'fixed',
    inset: 'auto',
    margin: 0,
    marginTop: '4px',
    positionAnchor: anchorName,
    positionArea: 'bottom span-right',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
    inlineSize: `anchor-size(${writingMode === 'vertical' ? 'height' : 'width'})`,
  };

  const [deferredText, isPending] = useDeferredDebounce(text);
  const filteredOptions = options.filter((option) =>
    option.label.includes(deferredText),
  );
  const { pending: formPending } = useFormStatus();
  const disabledResolved = disabled || formPending;

  const reset = useCallback(() => {
    setText('');
    close();
    setSelectIndex(undefined);
  }, [close]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && ref.current?.contains(e.target) === true)
        return;
      reset();
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [reset]);

  const setReferenceRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      if (node) {
        node.style.setProperty('anchor-name', anchorName);
      }
    },
    [anchorName],
  );

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border-base bg-bg-base inline-full',
        FOCUS_RING_WITHIN,
        'has-aria-invalid:border-border-error',
        'has-disabled:cursor-not-allowed has-disabled:border-border-mute has-disabled:bg-bg-mute hover:has-disabled:has-hover:bg-bg-mute',
      )}
      ref={setReferenceRef}
    >
      {name !== undefined && name !== ''
        ? currentValue.map((selectedValue) => (
            <input
              key={selectedValue}
              name={name}
              type="hidden"
              value={selectedValue}
            />
          ))
        : null}
      <div className="flex min-h-12 items-center justify-between gap-2 px-3 py-2">
        <div className="flex w-full flex-wrap gap-1">
          {currentValue.map((selectedValue) => {
            const label = options.find(
              (option) => option.value === selectedValue,
            )?.label;
            return (
              <div
                className="bg-bg-mute inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                key={selectedValue}
                tabIndex={-1}
              >
                {label}
                <IconButton
                  label="閉じる"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                    handleChange(
                      currentValue.filter((v) => v !== selectedValue),
                    );
                  }}
                  size="sm"
                >
                  <CloseIcon size="sm" />
                </IconButton>
              </div>
            );
          })}
          <input
            {...rest}
            aria-autocomplete="list"
            aria-controls={isOpen ? `${id}_listbox` : undefined}
            aria-expanded={isOpen}
            aria-invalid={invalid}
            aria-required={required}
            autoComplete="off"
            className={cn(
              'grow bg-transparent focus-visible:outline-hidden',
              'disabled:cursor-not-allowed',
            )}
            disabled={disabledResolved}
            id={id}
            onBlur={(e) => {
              if (e.relatedTarget?.id.startsWith(`${id}_option_`) === true) {
                return;
              }
              close();
            }}
            onChange={(e) => {
              open();
              setText(e.target.value);
              setSelectIndex(undefined);
            }}
            onClick={() => {
              if (isOpen && text.length === 0) {
                close();
                return;
              }
              open();
              setSelectIndex(undefined);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && text.length === 0) {
                reset();
                handleChange(currentValue.slice(0, -1));
                return;
              }
              if (e.key === 'ArrowDown') {
                open();
                setSelectIndex((prev) => {
                  if (prev === undefined) {
                    return 0;
                  }
                  return Math.min(prev + 1, options.length - 1);
                });
                return;
              }
              if (e.key === 'ArrowUp') {
                open();
                setSelectIndex((prev) => {
                  if (prev === undefined) {
                    return 0;
                  }
                  return Math.max(prev - 1, 0);
                });
                return;
              }
              if (
                e.key === 'Enter' &&
                selectIndex !== undefined &&
                selectIndex >= 0
              ) {
                if (isPending) {
                  e.preventDefault();
                  return;
                }
                const selected = filteredOptions[selectIndex];
                if (!selected) {
                  return;
                }
                if (currentValue.includes(selected.value)) {
                  handleChange(
                    currentValue.filter((v) => v !== selected.value),
                  );
                  reset();
                  return;
                }
                handleChange([...currentValue, selected.value]);
                reset();
              }
            }}
            placeholder="入力して絞り込めます"
            role="combobox"
            type="text"
            value={text}
          />
        </div>
        {currentValue.length > 0 && (
          <IconButton
            label="すべて閉じる"
            onClick={(e) => {
              e.stopPropagation();
              handleChange([]);
            }}
            size="sm"
          >
            <CloseIcon size="sm" />
          </IconButton>
        )}
      </div>
      {isOpen && (
        <div
          className="bg-bg-raised z-10 rounded-xl shadow-md"
          role="presentation"
          style={listboxStyle}
        >
          <ul
            aria-busy={isPending || undefined}
            className={cn(
              'max-h-96 py-2 transition-opacity vertical:max-h-none vertical:max-w-96',
              isPending && 'opacity-60',
            )}
            id={`${id}_listbox`}
            role="listbox"
          >
            {filteredOptions.length === 0 && (
              <li className="text-fg-mute px-3 py-2" role="presentation">
                該当なし
              </li>
            )}
            {filteredOptions.map((option, idx) => {
              const selected = currentValue.includes(option.value);
              return (
                <li
                  aria-selected={selected}
                  className={cn(
                    'cursor-pointer px-3 py-2 transition-colors',
                    selected && 'bg-primary-bg-subtle text-primary-fg',
                    selectIndex === idx && !selected && 'bg-bg-subtle',
                    selectIndex === idx &&
                      selected &&
                      'bg-primary-bg-mute text-primary-fg',
                  )}
                  id={`${id}_option_${option.value}`}
                  key={option.value}
                  role="option"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                    if (selected) {
                      handleChange(
                        currentValue.filter((v) => v !== option.value),
                      );
                      return;
                    }
                    handleChange([...currentValue, option.value]);
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onMouseEnter={() => {
                    setSelectIndex(idx);
                  }}
                  tabIndex={-1}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
