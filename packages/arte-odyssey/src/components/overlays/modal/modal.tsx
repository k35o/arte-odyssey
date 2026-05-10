'use client';

import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ToastProvider } from '../../feedback/toast';
import { cn } from './../../../helpers/cn';

const centerVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const bottomVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
const rightVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const leftVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const Modal: FC<
  PropsWithChildren<{
    ref?: RefObject<HTMLDialogElement | null>;
    type?: 'center' | 'bottom' | 'right' | 'left';
    defaultOpen?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
  }>
> = ({ ref, type = 'center', defaultOpen, isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogOpen, setDialogOpen] = useState(defaultOpen ?? false);

  const realDialogOpen =
    isOpen === true || isOpen === false ? isOpen : dialogOpen;
  const realOnClose = useCallback(() => {
    onClose?.();
    if (isOpen === undefined) {
      return;
    }
    setDialogOpen(false);
  }, [isOpen, onClose]);
  const realRef = ref ?? dialogRef;

  useEffect(() => {
    const dialog = realRef.current;
    if (!dialog || realDialogOpen === dialog.open) {
      return;
    }
    if (realDialogOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [realDialogOpen, realRef]);

  useEffect(() => {
    const dialog = realRef.current;
    if (!dialog || isOpen !== undefined) return undefined;

    const observer = new MutationObserver(() => {
      setDialogOpen(dialog.open);
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    return () => {
      observer.disconnect();
    };
  }, [isOpen, realRef]);

  return (
    <motion.dialog
      animate={realDialogOpen ? 'open' : 'closed'}
      className={cn(
        'bg-bg-raised text-fg-base z-modal shadow-md backdrop:bg-back-drop',
        type === 'center' &&
          'm-auto max-h-lg w-5/6 max-w-2xl rounded-lg vertical:h-5/6 vertical:max-h-2xl vertical:w-auto vertical:max-w-lg',
        type === 'bottom' && 'mt-auto w-screen max-w-screen rounded-t-lg',
        type === 'right' &&
          'ml-auto h-svh max-h-none w-screen max-w-sm rounded-l-lg',
        type === 'left' &&
          'mr-auto h-svh max-h-none w-screen max-w-sm rounded-r-lg',
      )}
      exit="closed"
      initial="closed"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          realRef.current?.close();
        }
      }}
      onClose={realOnClose}
      ref={realRef}
      variants={
        type === 'center'
          ? centerVariants
          : type === 'bottom'
            ? bottomVariants
            : type === 'left'
              ? leftVariants
              : rightVariants
      }
    >
      <ToastProvider portalRef={realRef} position="absolute">
        {children}
      </ToastProvider>
    </motion.dialog>
  );
};
