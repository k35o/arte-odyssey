'use client';

import * as motion from 'motion/react-client';
import {
  type FC,
  type KeyboardEvent,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from './../../../helpers/cn';
import { createSafeContext } from './../../../helpers/create-safe-context';

type TabsContext = {
  rootId: string;
  ids: [string, ...string[]];
  selectedId: string;
  setSelectedId: (id: string) => void;
};

const [TabsProvider, useTabsState] = createSafeContext<TabsContext>(
  'useTabsState must be used within a TabsProvider',
);

const Root: FC<
  PropsWithChildren<{
    defaultSelectedId?: string | null;
    ids: [string, ...string[]];
  }>
> = ({ defaultSelectedId = null, ids, children }) => {
  const defaultIndex =
    defaultSelectedId !== null && defaultSelectedId !== ''
      ? ids.indexOf(defaultSelectedId)
      : 0;
  const [selectedId, setSelectedId] = useState<string>(
    defaultSelectedId ?? ids[defaultIndex] ?? ids[0],
  );
  const rootId = useId();
  const contextValue = useMemo<TabsContext>(
    () => ({
      rootId,
      ids,
      selectedId,
      setSelectedId,
    }),
    [rootId, ids, selectedId],
  );

  return (
    <TabsProvider value={contextValue}>
      {/* TODO: スクロール以外の見せ方を考えても良さそう */}
      <div className="flex flex-col gap-1 overflow-x-auto p-0.5">
        {children}
      </div>
    </TabsProvider>
  );
};

const [TabsListProvider, useTabsListState] = createSafeContext<{
  setFocusRef: RefObject<boolean>;
}>('useTabListState must be used within a TabListProvider');

const List: FC<
  PropsWithChildren<{
    label: string;
  }>
> = ({ label, children }) => {
  const { rootId } = useTabsState();
  const setFocusRef = useRef<boolean>(false);
  const listContextValue = useMemo(() => ({ setFocusRef }), []);
  return (
    <div
      aria-label={label}
      aria-orientation="horizontal"
      className="border-border-base flex overflow-x-auto overflow-y-hidden border-b p-0.5 wrap-normal"
      id={`${rootId}-tablist`}
      role="tablist"
    >
      <TabsListProvider value={listContextValue}>{children}</TabsListProvider>
    </div>
  );
};

const Tab: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => {
  const { rootId, ids, selectedId, setSelectedId } = useTabsState();
  const { setFocusRef } = useTabsListState();
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const activeIndex = ids.indexOf(selectedId);
  const index = ids.indexOf(id);

  useEffect(() => {
    if (activeIndex === index && setFocusRef.current) {
      ref.current?.focus();
      setFocusRef.current = false;
    }
  }, [activeIndex, index, setFocusRef]);

  return (
    <div
      aria-controls={selectedId === id ? `${rootId}-panel-${id}` : undefined}
      aria-selected={selectedId === id}
      className={cn(
        'relative cursor-pointer rounded-lg p-2 transition-colors',
        selectedId !== id && 'hover:bg-primary-bg-subtle hover:text-primary-fg',
        'focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
      )}
      id={`${rootId}-tab-${id}`}
      onClick={() => {
        setSelectedId(id);
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          const nextActiveIndex = index === 0 ? ids.length - 1 : index - 1;
          setSelectedId(ids[nextActiveIndex] ?? ids[0]);
          setFocusRef.current = true;
          return;
        }
        if (e.key === 'ArrowRight') {
          const nextActiveIndex = index === ids.length - 1 ? 0 : index + 1;
          setSelectedId(ids[nextActiveIndex] ?? ids[0]);
          setFocusRef.current = true;
        }
      }}
      ref={ref}
      role="tab"
      tabIndex={activeIndex === index ? 0 : -1}
    >
      {selectedId === id && (
        <motion.div
          className="bg-primary-border vertical:right-auto vertical:bottom-0 vertical:-left-0.5 vertical:top-0 vertical:h-auto vertical:w-1 absolute right-0 -bottom-0.5 left-0 h-1"
          layoutId={`${rootId}-underline`}
        />
      )}
      {children}
    </div>
  );
};

const Panel: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => {
  const { rootId, selectedId } = useTabsState();

  if (selectedId !== id) {
    return null;
  }

  return (
    <div
      aria-labelledby={`${rootId}-tab-${id}`}
      className={cn(
        'grow rounded-lg p-2',
        'focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
      )}
      id={`${rootId}-panel-${id}`}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
} as const;
