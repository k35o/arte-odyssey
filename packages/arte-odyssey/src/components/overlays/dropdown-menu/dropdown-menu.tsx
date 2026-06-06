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
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactNode,
  useRef,
  useState,
} from 'react';

import { Button } from '../../buttons/button';
import { IconButton } from '../../buttons/icon-button';
import { ChevronIcon } from '../../icons';
import { Popover } from '../popover';
import { useFloatingUIContext } from '../popover/hooks';
import { cn } from './../../../helpers/cn';
import {
  MenuContextProvider,
  useMenuContent,
  useMenuItem,
  useMenuTrigger,
} from './hooks';

const Root: FC<PropsWithChildren<{ placement?: Placement }>> = ({
  children,
  placement = 'bottom-start',
}) => (
  <Popover.Root placement={placement} type="menu">
    <MenuProvider>{children}</MenuProvider>
  </Popover.Root>
);

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemElementsRef = useRef<Array<HTMLElement | null>>([]);

  const context = useFloatingUIContext();

  const listNavigation = useListNavigation(context, {
    listRef: itemElementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation],
  );

  return (
    <MenuContextProvider
      value={{
        activeIndex,
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

const Content: FC<PropsWithChildren> = ({ children }) => {
  const { contentProps, itemElementsRef } = useMenuContent();

  return (
    <FloatingList elementsRef={itemElementsRef}>
      <Popover.Content
        renderItem={(props) => (
          <div
            {...props}
            {...contentProps}
            className="bg-bg-raised vertical:min-w-0 vertical:min-h-40 flex min-w-40 flex-col rounded-lg py-2 shadow-md"
          >
            {children}
          </div>
        )}
      />
    </FloatingList>
  );
};

const Item: FC<{ onClick: MouseEventHandler; label: string }> = ({
  label,
  onClick,
}) => {
  const props = useMenuItem({ onClick });

  return (
    <button
      className={cn(
        'w-full px-2 py-1 text-left transition-colors',
        'hover:bg-bg-subtle',
        'focus-visible:bg-bg-subtle focus-visible:outline-hidden',
      )}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};

const Trigger: FC<{
  text: string;
  size?: ComponentProps<typeof Button>['size'];
  variant?: ComponentProps<typeof Button>['variant'];
}> = ({ text, size = 'md', variant = 'solid' }) => {
  const getTriggerProps = useMenuTrigger();

  return (
    <Popover.Trigger
      renderItem={(props) => (
        <Button
          {...getTriggerProps(props)}
          color="gray"
          endIcon={<ChevronIcon direction="down" />}
          size={size}
          type="button"
          variant={variant}
        >
          {text}
        </Button>
      )}
    />
  );
};

const IconTrigger: FC<{
  icon: ReactNode;
  label: string;
}> = ({ icon, label }) => {
  const getTriggerProps = useMenuTrigger();

  return (
    <Popover.Trigger
      renderItem={(props) => (
        <IconButton
          color="base"
          label={label}
          tooltipDisabled
          {...getTriggerProps(props)}
        >
          {icon}
        </IconButton>
      )}
    />
  );
};

export const DropdownMenu = {
  Root,
  Content,
  Item,
  Trigger,
  IconTrigger,
} as const;
