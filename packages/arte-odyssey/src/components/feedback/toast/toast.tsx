'use client';

import { type FC, useCallback } from 'react';

import { Alert } from '../alert';
import { useTimeout } from './../../../hooks/timeout';
import type { Status } from './../../../types/variables';
import { useToast } from './context';

type ToastProps = {
  id: string;
  tone: Status;
  message: string;
};

const DELAY_MS = 5000;

export const Toast: FC<ToastProps> = ({ id, tone, message }) => {
  const { onClose } = useToast();

  useTimeout(
    useCallback(() => {
      onClose(id);
    }, [id, onClose]),
    DELAY_MS,
  );

  return <Alert message={message} tone={tone} />;
};
