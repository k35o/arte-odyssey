'use client';

import type { FC, PropsWithChildren } from 'react';

import { ToastProvider } from '../feedback/toast';

// MotionConfig をここに置くと motion のランタイムが全利用者のバンドルに載るため、
// reduced motion の指定は motion を使う各コンポーネント側でローカルに行う
export const ArteOdysseyProvider: FC<PropsWithChildren> = ({ children }) => (
  <ToastProvider>{children}</ToastProvider>
);
