'use client';

import {
  Children,
  cloneElement,
  type ComponentProps,
  type FC,
  isValidElement,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react';

import type { Placement } from '../../../types/variables';
import { Button } from '../../buttons/button';
import { IconButton } from '../../buttons/icon-button';
import { ChevronIcon } from '../../icons';
import { useListNavigation } from '../_internal/use-list-navigation';
import { Popover } from '../popover';
import { useOpenContext } from '../popover/hooks';
import { cn } from './../../../helpers/cn';
import { MenuContextProvider, useMenuContent, useMenuItem } from './hooks';

const Root: FC<PropsWithChildren<{ placement?: Placement }>> = ({
  children,
  placement = 'bottom-start',
}) => (
  <Popover.Root placement={placement} type="menu">
    <MenuProvider>{children}</MenuProvider>
  </Popover.Root>
);

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen } = useOpenContext();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nav = useListNavigation({
    open: isOpen,
    activeIndex,
    setActiveIndex,
    loop: true,
  });

  return <MenuContextProvider value={nav}>{children}</MenuContextProvider>;
};

const Content: FC<PropsWithChildren> = ({ children }) => {
  const { contentProps } = useMenuContent();

  return (
    <Popover.Content
      renderItem={(props) => (
        <div
          {...props}
          {...contentProps}
          className="bg-bg-raised vertical:min-w-0 vertical:min-h-40 flex min-w-40 flex-col rounded-lg py-2 shadow-md"
        >
          {Children.toArray(children).map((child, index) =>
            isValidElement(child)
              ? cloneElement(child as ReactElement<{ index?: number }>, {
                  index,
                })
              : child,
          )}
        </div>
      )}
    />
  );
};

const Item: FC<{
  onClick: MouseEventHandler;
  label: string;
  index?: number;
}> = ({ label, onClick, index = 0 }) => {
  const props = useMenuItem({ onClick, index });

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
}> = ({ text, size = 'md', variant = 'solid' }) => (
  <Popover.Trigger
    renderItem={(props) => (
      <Button
        {...props}
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

const IconTrigger: FC<{
  icon: ReactNode;
  label: string;
}> = ({ icon, label }) => (
  <Popover.Trigger
    renderItem={(props) => (
      <IconButton color="base" label={label} tooltipDisabled {...props}>
        {icon}
      </IconButton>
    )}
  />
);

export const DropdownMenu = {
  Root,
  Content,
  Item,
  Trigger,
  IconTrigger,
} as const;
