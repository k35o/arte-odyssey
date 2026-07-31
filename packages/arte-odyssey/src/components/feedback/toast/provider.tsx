'use client';

import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from './../../../helpers/cn';
import type { Status } from './../../../types/variables';
import {
  type ToastOptions,
  ToastStoreContext,
  type ToastType,
} from './context';
import { Toast } from './toast';

const MAX_TOAST_COUNT = 5;
const DEFAULT_DURATION_MS = 5000;
// base.css の .ao-toast-item の transition と同じ長さ。transitionend には
// 依存しない(reduced motion で transition が無効でも確実に取り除くため)
const EXIT_MS = 200;

type ToastState = {
  toasts: ToastType[];
  // 閉じ演出中(高さ 0 へ畳む transition 中)のトースト。EXIT_MS 後に除去する
  closingIds: string[];
};

export const ToastProvider: FC<
  PropsWithChildren<{
    portalRef?: RefObject<HTMLElement | null>;
    position?: 'fixed' | 'absolute';
  }>
> = ({ children, portalRef = null, position = 'fixed' }) => {
  const [state, setState] = useState<ToastState>({
    toasts: [],
    closingIds: [],
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // ライブリージョン(section)はトーストが増える前から DOM に存在している必要が
  // あるため、ref ではなく state で持ちマウント直後の再レンダーで描画する
  const [defaultContainer, setDefaultContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setDefaultContainer(document.body);
  }, []);

  // 閉じ演出を終えたエントリを id ごとの独立したタイマーで取り除く。
  // 全体で 1 本のタイマーだと、EXIT_MS 未満の間隔で閉じ始めが続いたとき
  // 先行エントリの除去が際限なく先送りされてしまう
  const exitTimersRef = useRef(new Map<string, number>());
  useEffect(() => {
    for (const id of state.closingIds) {
      if (exitTimersRef.current.has(id)) {
        continue;
      }
      const timerId = window.setTimeout(() => {
        exitTimersRef.current.delete(id);
        setState((prev) => ({
          toasts: prev.toasts.filter((toast) => toast.id !== id),
          closingIds: prev.closingIds.filter((closingId) => closingId !== id),
        }));
      }, EXIT_MS);
      exitTimersRef.current.set(id, timerId);
    }
  }, [state.closingIds]);
  useEffect(() => {
    const timers = exitTimersRef.current;
    return () => {
      for (const timerId of timers.values()) {
        window.clearTimeout(timerId);
      }
      timers.clear();
    };
  }, []);

  const store = useMemo(
    () => ({
      open: (tone: Status, message: string, options?: ToastOptions) => {
        // updater は StrictMode で二重実行されうるので、非決定的な ID 生成は外で行う
        const id = crypto.randomUUID();
        setState((prev) => {
          const toasts: ToastType[] = [
            ...prev.toasts,
            {
              id,
              tone,
              message,
              duration: options?.duration ?? DEFAULT_DURATION_MS,
              action: options?.action,
            },
          ];
          const active = toasts.filter(
            (toast) => !prev.closingIds.includes(toast.id),
          );
          const overflow = active.length - MAX_TOAST_COUNT;
          if (overflow <= 0) {
            return { toasts, closingIds: prev.closingIds };
          }
          // 上限を超えた分は最古のものから閉じ演出つきで退避させる
          return {
            toasts,
            closingIds: [
              ...prev.closingIds,
              ...active.slice(0, overflow).map((toast) => toast.id),
            ],
          };
        });
      },
      close: (id: string) => {
        setState((prev) =>
          prev.closingIds.includes(id)
            ? prev
            : { toasts: prev.toasts, closingIds: [...prev.closingIds, id] },
        );
      },
      closeAll: () => {
        setState((prev) => ({
          toasts: prev.toasts,
          closingIds: prev.toasts.map((toast) => toast.id),
        }));
      },
    }),
    [],
  );

  const container = portalRef?.current ?? defaultContainer;
  const isPaused = isHovered || isFocused;

  return (
    <ToastStoreContext value={store}>
      {children}
      {container
        ? createPortal(
            <section
              // 空の間は名前を付けず region ランドマークにしない（複数 Provider の
              // 共存時に同名ランドマークが重複して axe の landmark-unique に反するため）。
              // aria-live 自体は最初から存在し、初回トーストも読み上げ対象になる
              aria-label={state.toasts.length > 0 ? '通知' : undefined}
              aria-live="polite"
              className={cn(
                'bottom-3 z-toast flex w-full flex-col items-center justify-center',
                position === 'fixed' && 'fixed',
                position === 'absolute' && 'absolute',
              )}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsFocused(false);
                }
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onPointerEnter={() => {
                setIsHovered(true);
              }}
              onPointerLeave={() => {
                setIsHovered(false);
              }}
            >
              {state.toasts.map((toast) => {
                const isClosing = state.closingIds.includes(toast.id);
                return (
                  <div
                    className="ao-toast-item w-full justify-items-center"
                    data-closing={isClosing || undefined}
                    // 閉じ演出中は不可視のままフォーカス可能な要素が残らないようにする
                    inert={isClosing || undefined}
                    key={toast.id}
                  >
                    <div className="min-h-0">
                      {/* role は Alert 自身が tone に応じて持つ(status / alert) */}
                      <div className="ao-toast-enter shadow-lg">
                        <Toast
                          action={toast.action}
                          duration={toast.duration}
                          isPaused={isPaused}
                          message={toast.message}
                          onClose={() => {
                            store.close(toast.id);
                          }}
                          tone={toast.tone}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>,
            container,
          )
        : null}
    </ToastStoreContext>
  );
};
