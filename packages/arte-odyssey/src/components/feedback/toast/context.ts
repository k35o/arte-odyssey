'use client';

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  use,
  useCallback,
} from 'react';

import type { Status } from './../../../types/variables';

const MAX_TOAST_COUNT = 5;

export type ToastType = {
  id: string;
  status: Status;
  message: string;
};

export const SetToastContext = createContext<
  Dispatch<SetStateAction<ToastType[]>> | undefined
>(undefined);

export const useToast = () => {
  const setToasts = use(SetToastContext);
  if (!setToasts) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const onOpen = useCallback(
    (status: Status, message: string) => {
      setToasts((prev) => {
        const next = [...prev, { id: crypto.randomUUID(), status, message }];
        return next.slice(-MAX_TOAST_COUNT);
      });
    },
    [setToasts],
  );

  const onClose = useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    [setToasts],
  );

  const onCloseAll = useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  return {
    onOpen,
    onClose,
    onCloseAll,
  };
};
