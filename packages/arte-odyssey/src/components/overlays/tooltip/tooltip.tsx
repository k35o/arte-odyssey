'use client';

import type { Placement } from '@floating-ui/react';
import {
  type FC,
  type FocusEvent,
  type FocusEventHandler,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type RefCallback,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';

import { Popover } from '../popover';
import { usePopoverContext } from '../popover/hooks';

const HOVER_QUERY = '(hover: hover)';

const useCanHover = (): boolean => {
  const subscribe = useCallback((cb: () => void) => {
    const mql = window.matchMedia(HOVER_QUERY);
    mql.addEventListener('change', cb);
    return () => {
      mql.removeEventListener('change', cb);
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => true,
  );
};

const noop = () => {
  /* skip hover handling on touch devices */
};

export type TooltipTriggerProps = {
  ref: RefCallback<HTMLElement>;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
  'aria-describedby'?: string;
};

const useTooltipTriggerProps = (): TooltipTriggerProps => {
  const popover = usePopoverContext();
  const canHover = useCanHover();
  return useMemo(
    () => ({
      ref: popover.setTriggerRef,
      onMouseEnter: canHover ? popover.onOpen : noop,
      onMouseLeave: canHover ? popover.onClose : noop,
      onFocus: (e: FocusEvent<HTMLElement>) => {
        if (e.target.matches(':focus-visible')) {
          popover.onOpen();
        }
      },
      onBlur: popover.onClose,
      'aria-describedby': popover.isOpen ? `${popover.rootId}_list` : undefined,
    }),
    [popover, canHover],
  );
};

const Root: FC<PropsWithChildren<{ placement?: Placement }>> = ({
  children,
  placement = 'bottom',
}) => (
  <Popover.Root
    closeOnClickAway={false}
    placement={placement}
    trapFocus={false}
    type="dialog"
  >
    {children}
  </Popover.Root>
);

const Trigger: FC<{
  renderItem: (props: TooltipTriggerProps) => ReactElement;
}> = ({ renderItem }) => renderItem(useTooltipTriggerProps());

const Content: FC<PropsWithChildren> = ({ children }) => {
  const popover = usePopoverContext();
  const canHover = useCanHover();

  return (
    <Popover.Content
      animation="fade"
      renderItem={({ id, ref }) => (
        <div
          className="bg-bg-inverse text-fg-inverse rounded-lg px-4 py-2 shadow-md"
          id={id}
          onBlur={popover.onClose}
          onFocus={popover.onOpen}
          onMouseEnter={canHover ? popover.onOpen : noop}
          onMouseLeave={canHover ? popover.onClose : noop}
          ref={ref}
          role="tooltip"
        >
          {children}
        </div>
      )}
    />
  );
};

export const Tooltip = {
  Root,
  Trigger,
  Content,
} as const;
