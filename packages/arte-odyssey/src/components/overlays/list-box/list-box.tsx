'use client';

import {
  FloatingList,
  type Placement,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react';
import {
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useRef,
  useState,
} from 'react';

import { Button } from '../../buttons/button';
import { IconButton } from '../../buttons/icon-button';
import { CheckIcon, ChevronIcon } from '../../icons';
import { Popover } from '../popover';
import { useFloatingUIContext } from '../popover/hooks';
import { cn } from './../../../helpers/cn';
import {
  MenuContextProvider,
  type Option,
  useMenuContent,
  useMenuItem,
  useMenuTrigger,
} from './hooks';

const Root: FC<
  PropsWithChildren<{
    placement?: Placement;
    options: Option[];
    value: Option['key'] | undefined;
    onChange: (key: Option['key']) => void;
  }>
> = ({ children, placement = 'bottom', options, value, onChange }) => (
  <Popover.Root flipDisabled placement={placement} type="listbox">
    <MenuProvider onChange={onChange} options={options} value={value}>
      {children}
    </MenuProvider>
  </Popover.Root>
);

const MenuProvider: FC<
  PropsWithChildren<{
    options: Option[];
    value: Option['key'] | undefined;
    onChange: (key: Option['key']) => void;
  }>
> = ({ children, options, onChange, value }) => {
  const selectedIndex = options.findIndex((option) => option.key === value);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemElementsRef = useRef<Array<HTMLElement | null>>([]);

  const context = useFloatingUIContext();

  const listNavigation = useListNavigation(context, {
    listRef: itemElementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation],
  );

  const handleSelect = (index: number) => {
    const key = options[index]?.key;
    if (key !== undefined && key !== '') {
      onChange(key);
    }
  };

  return (
    <MenuContextProvider
      value={{
        options,
        activeIndex,
        selectedIndex,
        handleSelect,
        itemElementsRef,
        getTriggerProps: getReferenceProps,
        getContentProps: getFloatingProps,
        getItemProps,
      }}
    >
      {children}
    </MenuContextProvider>
  );
};

const Content: FC<{
  helpContent?: ReactElement;
}> = ({ helpContent }) => {
  const { options, contentProps, itemElementsRef } = useMenuContent();

  return (
    <FloatingList elementsRef={itemElementsRef}>
      <Popover.Content
        renderItem={(props) => (
          <div
            {...props}
            {...contentProps}
            className="bg-bg-raised vertical:max-h-none vertical:min-w-0 vertical:max-w-48 vertical:min-h-40 vertical:overflow-x-auto vertical:overflow-y-visible flex max-h-48 min-w-40 flex-col overflow-y-auto rounded-lg py-2 shadow-md"
          >
            {helpContent}
            {options.map(({ key, label }, idx) => (
              <Item index={idx} key={key} label={label} />
            ))}
          </div>
        )}
      />
    </FloatingList>
  );
};

const Item: FC<{
  label: Option['label'];
  index: number;
}> = ({ label, index }) => {
  const { props, selected } = useMenuItem(index);

  return (
    <button
      className={cn(
        'flex w-full items-center justify-between px-3 py-2 text-left transition-colors',
        'hover:bg-bg-subtle',
        'focus-visible:border-transparent focus-visible:bg-bg-subtle focus-visible:outline-hidden',
      )}
      type="button"
      {...props}
    >
      {label}
      {selected && (
        <span className="text-fg-success">
          <CheckIcon />
        </span>
      )}
    </button>
  );
};

const Trigger: FC<{
  size?: ComponentProps<typeof Button>['size'];
}> = ({ size = 'md' }) => {
  const { label, getTriggerProps } = useMenuTrigger();

  return (
    <Popover.Trigger
      renderItem={(props) => (
        <Button
          {...getTriggerProps(props)}
          aria-label={label}
          color="gray"
          endIcon={<ChevronIcon direction="down" />}
          fullWidth
          size={size}
          type="button"
          variant="solid"
        >
          {label}
        </Button>
      )}
    />
  );
};

const TriggerIcon: FC<{
  size?: ComponentProps<typeof Button>['size'];
  icon: ReactElement;
}> = ({ size = 'md', icon }) => {
  const { label, getTriggerProps } = useMenuTrigger();

  return (
    <Popover.Trigger
      renderItem={(props) => (
        <IconButton
          label={label}
          size={size}
          tooltipDisabled
          {...getTriggerProps(props)}
        >
          {icon}
        </IconButton>
      )}
    />
  );
};

export const ListBox = {
  Root,
  Content,
  Trigger,
  TriggerIcon,
} as const;
