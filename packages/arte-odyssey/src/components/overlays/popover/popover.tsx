'use client';

import {
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
  type ReferenceType,
  useFloating,
} from '@floating-ui/react';
import { AnimatePresence, type Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import {
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useEffect,
  useId,
} from 'react';

import { cn } from '../../../helpers/cn';
import { useDisclosure } from '../../../hooks/disclosure';
import { useWritingMode } from '../../../hooks/writing-mode';
import { usePortalRoot } from '../../providers';
import { getContentAnchorStyle, toAnchorName } from './anchor-positioning';
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

  // floating-ui は操作レイヤ（useListNavigation / FloatingFocusManager）が必要とする
  // context を供給する目的だけで使う。位置決め（offset / flip / autoUpdate）は
  // CSS Anchor Positioning へ移譲した。
  const { refs, context } = useFloating({ open: isOpen });

  const anchorName = toAnchorName(id);

  // trigger は Button / IconButton 経由で style・className を受け取れない（型で omit 済み）ため、
  // ref 経由で DOM に直接 anchor-name を付与する。
  const setTriggerRef = useCallback(
    (node: ReferenceType | null) => {
      refs.setReference(node);
      if (node instanceof HTMLElement) {
        node.style.setProperty('anchor-name', anchorName);
      }
    },
    [refs, anchorName],
  );

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
        placement,
        anchorName,
        flipDisabled,
        triggerRef: refs.domReference,
        setTriggerRef,
        setContentRef: refs.setFloating,
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
    anchorName,
    placement,
    flipDisabled,
    itemProps,
  } = usePopoverContent();
  const { triggerRef } = usePopoverContext();

  const root = usePortalRoot();
  const protalProps = root ? { root } : {};

  // Popover content は body 直下へ portal されるため、trigger 側の writing-mode を
  // 取り込まないと縦書きページでも横書きで描画されてしまう。
  // `vertical:` variant は `.writing-v` 祖先を要求するので、縦書きなら class を付与する。
  const writingMode = useWritingMode(triggerRef);
  const writingClass = writingMode === 'vertical' ? 'writing-v' : undefined;

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
              className={cn('z-overlay', writingClass)}
              ref={setContentRef}
              style={getContentAnchorStyle(anchorName, placement, flipDisabled)}
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
