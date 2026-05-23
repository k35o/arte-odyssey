import type { NavCategory } from './nav-types';

export const hookCategories: NavCategory[] = [
  {
    titleKey: 'hooks.categoryDomInteraction',
    items: [
      { name: 'useClickAway', path: '/hooks/use-click-away' },
      { name: 'useHover', path: '/hooks/use-hover' },
      { name: 'useResize', path: '/hooks/use-resize' },
      { name: 'useScrollDirection', path: '/hooks/use-scroll-direction' },
      { name: 'useScrollLock', path: '/hooks/use-scroll-lock' },
      { name: 'useWindowResize', path: '/hooks/use-window-resize' },
      { name: 'useWritingMode', path: '/hooks/use-writing-mode' },
    ],
  },
  {
    titleKey: 'hooks.categoryStateStorage',
    items: [
      { name: 'useClipboard', path: '/hooks/use-clipboard' },
      { name: 'useControllableState', path: '/hooks/use-controllable-state' },
      { name: 'useLocalStorage', path: '/hooks/use-local-storage' },
      { name: 'useSessionStorage', path: '/hooks/use-session-storage' },
      { name: 'useHash', path: '/hooks/use-hash' },
    ],
  },
  {
    titleKey: 'hooks.categoryTiming',
    items: [
      {
        name: 'useDebouncedTransition',
        path: '/hooks/use-debounced-transition',
      },
      { name: 'useDeferredDebounce', path: '/hooks/use-deferred-debounce' },
      { name: 'useInterval', path: '/hooks/use-interval' },
      { name: 'useTimeout', path: '/hooks/use-timeout' },
    ],
  },
  {
    titleKey: 'hooks.categoryUtility',
    items: [
      { name: 'useBreakpoint', path: '/hooks/use-breakpoint' },
      { name: 'useClient', path: '/hooks/use-client' },
      { name: 'useDisclosure', path: '/hooks/use-disclosure' },
      { name: 'useStep', path: '/hooks/use-step' },
      { name: 'useWindowSize', path: '/hooks/use-window-size' },
    ],
  },
  {
    titleKey: 'hooks.categoryObserver',
    items: [
      {
        name: 'useIntersectionObserver',
        path: '/hooks/use-intersection-observer',
      },
      { name: 'useInView', path: '/hooks/use-in-view' },
    ],
  },
];
