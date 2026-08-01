'use client';

import type { FC, PropsWithChildren } from 'react';

import { ToastProvider } from '../feedback/toast';

// アニメーションは全て CSS で実装しており、reduced motion は base.css の
// @media (prefers-reduced-motion) が一元処理するため、Provider の責務はトーストのみ
export const ArteOdysseyProvider: FC<PropsWithChildren> = ({ children }) => (
  <ToastProvider>{children}</ToastProvider>
);
