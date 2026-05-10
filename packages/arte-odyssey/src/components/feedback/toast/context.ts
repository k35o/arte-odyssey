'use client';

import { type Dispatch, type SetStateAction, useCallback } from 'react';

import { createSafeContext } from './../../../helpers/create-safe-context';
import type { Status } from './../../../types/variables';

const MAX_TOAST_COUNT = 5;

export type ToastType = {
  id: string;
  status: Status;
  message: string;
};

export const [SetToastContext, useSetToast] = createSafeContext<
  Dispatch<SetStateAction<ToastType[]>>
>('useToast must be used within a ToastProvider');

export const useToast = () => {
  const setToasts = useSetToast();

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
