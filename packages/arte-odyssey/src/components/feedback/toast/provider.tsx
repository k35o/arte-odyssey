'use client';

import { AnimatePresence, type Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from './../../../helpers/cn';
import { SetToastContext, type ToastType } from './context';
import { Toast } from './toast';

const toastMotionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const ToastProvider: FC<
  PropsWithChildren<{
    portalRef?: RefObject<HTMLElement | null>;
    position?: 'fixed' | 'absolute';
  }>
> = ({ children, portalRef = null, position = 'fixed' }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = document.body;
  }, []);

  const container = portalRef?.current ?? ref.current;

  return (
    <SetToastContext value={setToasts}>
      {children}
      {container
        ? createPortal(
            <section
              aria-label="通知"
              aria-live="polite"
              className={cn(
                'absolute bottom-3 z-toast flex w-full flex-col items-center justify-center gap-4',
                position === 'fixed' && 'fixed',
                position === 'absolute' && 'absolute',
              )}
            >
              <AnimatePresence initial={false}>
                {toasts.map((toast) => (
                  <motion.div
                    animate="animate"
                    custom={{ position: 'bottom' }}
                    exit="exit"
                    initial="initial"
                    key={toast.id}
                    layout
                    variants={toastMotionVariants}
                  >
                    <div
                      aria-atomic
                      className="shadow-lg"
                      role={
                        toast.tone === 'error' || toast.tone === 'warning'
                          ? 'alert'
                          : 'status'
                      }
                    >
                      <Toast {...toast} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </section>,
            container,
          )
        : null}
    </SetToastContext>
  );
};
