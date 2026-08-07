'use client';

import {
  type ComponentProps,
  type FC,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from 'react';

import type { Placement } from '../../../types/variables';
import { Button } from '../../buttons/button';
import { IconButton } from '../../buttons/icon-button';
import { ChevronIcon } from '../../icons';
import { useListNavigation } from '../_internal';
import { Popover, useOpenContext } from '../popover';
import { MenuContextProvider, useMenuContent, useMenuItem } from './hooks';
import { cloneWithIndex, itemClass, panelClass } from './shared';
import { SubMenu } from './sub-menu';

const Root: FC<
  PropsWithChildren<{
    placement?: Placement;
    isOpen?: boolean;
    defaultOpen?: boolean;
    onChange?: (isOpen: boolean) => void;
  }>
> = ({
  children,
  placement = 'bottom-start',
  isOpen,
  defaultOpen,
  onChange,
}) => (
  <Popover.Root
    defaultOpen={defaultOpen}
    isOpen={isOpen}
    onChange={onChange}
    placement={placement}
    type="menu"
  >
    <MenuProvider>{children}</MenuProvider>
  </Popover.Root>
);

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose } = useOpenContext();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nav = useListNavigation({
    open: isOpen,
    activeIndex,
    setActiveIndex,
    loop: true,
  });

  return (
    <MenuContextProvider value={{ ...nav, closeRoot: onClose }}>
      {children}
    </MenuContextProvider>
  );
};

const Content: FC<PropsWithChildren> = ({ children }) => {
  const { contentProps } = useMenuContent();

  return (
    <Popover.Content
      renderItem={(props) => (
        <div {...props} {...contentProps} className={panelClass}>
          {cloneWithIndex(children)}
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
    <button className={itemClass} type="button" {...props}>
      {label}
    </button>
  );
};

const Trigger: FC<{
  label: string;
  size?: ComponentProps<typeof Button>['size'];
  variant?: ComponentProps<typeof Button>['variant'];
}> = ({ label, size = 'md', variant = 'solid' }) => (
  <Popover.Trigger
    renderItem={(props) => (
      <Button
        {...props}
        color="base"
        endIcon={<ChevronIcon direction="down" />}
        size={size}
        type="button"
        variant={variant}
      >
        {label}
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
  SubMenu,
  Trigger,
  IconTrigger,
} as const;
