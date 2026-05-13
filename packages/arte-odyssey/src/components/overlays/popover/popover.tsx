'use client';

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  useFloating,
} from '@floating-ui/react';
import { AnimatePresence, type Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import {
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from 'react';

import { useDisclosure } from '../../../hooks/disclosure';
import { usePortalRoot } from '../../providers';
import {
  type PopoverContentProps,
  PopoverProvider,
  type PopoverTriggerProps,
  usePopoverContent,
  usePopoverContext,
  usePopoverTrigger,
} from './hooks';

export {
  useOpenContext,
  type PopoverContentProps,
  type PopoverTriggerProps,
} from './hooks';

const Root: FC<
  PropsWithChildren<{
    placement?: Placement;
    type?: 'dialog' | 'menu' | 'listbox';
    flipDisabled?: boolean;
    closeOnClickAway?: boolean;
    trapFocus?: boolean;
  }>
> = ({
  children,
  type = 'menu',
  placement = 'bottom-start',
  flipDisabled = false,
  closeOnClickAway = true,
  trapFocus = true,
}) => {
  const id = useId();
  const { isOpen, open, close, toggle } = useDisclosure();

  const {
    refs,
    floatingStyles,
    context,
    placement: computedPlacement,
  } = useFloating({
    strategy: 'fixed',
    placement,
    open: isOpen,
    whileElementsMounted: autoUpdate,
    // 要素と8pxだけ離す
    middleware: [
      offset(8),
      !flipDisabled &&
        flip({
          fallbackAxisSideDirection: 'end',
          padding: 8,
        }),
    ],
    transform: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <PopoverProvider
      value={{
        rootId: id,
        type,
        closeOnClickAway,
        trapFocus,
        isOpen,
        toggleOpen: toggle,
        onOpen: open,
        onClose: close,
        context,
        placement: computedPlacement,
        triggerRef: refs.domReference,
        setTriggerRef: refs.setReference,
        setContentRef: refs.setFloating,
        contentStyles: floatingStyles,
      }}
    >
      {children}
    </PopoverProvider>
  );
};

const contentMotionVariants = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.1,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.2,
    },
  },
} satisfies Variants;

const Content: FC<{
  renderItem: (props: PopoverContentProps) => ReactElement;
  motionVariants?: Variants;
}> = ({ renderItem, motionVariants = contentMotionVariants }) => {
  const {
    isOpen,
    trapFocus,
    context,
    setContentRef,
    contentStyles,
    itemProps,
  } = usePopoverContent();
  const { triggerRef } = usePopoverContext();

  const root = usePortalRoot();
  const protalProps = root ? { root } : {};

  // Popover content は body 直下へ portal されるため、trigger 側の writing-mode を
  // 取り込まないと縦書きページでも横書きで描画されてしまう。
  // また `vertical:` variant は `.writing-v` 祖先を要求するため class も付与する。
  // 横書きで paint されてから縦書きに切り替わる flash を避けるため layout effect で同期適用する。
  const [writingClass, setWritingClass] = useState<'writing-v' | undefined>();
  useLayoutEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    if (trigger instanceof HTMLElement) {
      setWritingClass(
        getComputedStyle(trigger).writingMode === 'vertical-rl'
          ? 'writing-v'
          : undefined,
      );
    }
  }, [isOpen, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingPortal {...protalProps}>
          <FloatingFocusManager
            context={context}
            disabled={!trapFocus}
            modal={false}
          >
            <div
              className={writingClass}
              ref={setContentRef}
              style={contentStyles}
            >
              <motion.div
                animate="open"
                exit="closed"
                initial="closed"
                variants={motionVariants}
              >
                {renderItem(itemProps)}
              </motion.div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
};

const Trigger: FC<{
  renderItem: (props: PopoverTriggerProps) => ReactElement;
}> = ({ renderItem }) => renderItem(usePopoverTrigger());

export const Popover = {
  Root,
  Content,
  Trigger,
} as const;
