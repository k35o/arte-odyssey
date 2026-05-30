import type { NavCategory } from './nav-types';

export const hookCategories: NavCategory[] = [
  {
    titleKey: 'hooks.categoryDomInteraction',
    items: [
      {
        name: 'useClickAway',
        path: '/hooks/use-click-away',
        descKey: 'hooks.useClickAway.description',
      },
      {
        name: 'useHover',
        path: '/hooks/use-hover',
        descKey: 'hooks.useHover.description',
      },
      {
        name: 'useResize',
        path: '/hooks/use-resize',
        descKey: 'hooks.useResize.description',
      },
      {
        name: 'useScrollDirection',
        path: '/hooks/use-scroll-direction',
        descKey: 'hooks.useScrollDirection.description',
      },
      {
        name: 'useScrollLock',
        path: '/hooks/use-scroll-lock',
        descKey: 'hooks.useScrollLock.description',
      },
      {
        name: 'useWindowResize',
        path: '/hooks/use-window-resize',
        descKey: 'hooks.useWindowResize.description',
      },
      {
        name: 'useWritingMode',
        path: '/hooks/use-writing-mode',
        descKey: 'hooks.useWritingMode.description',
      },
    ],
  },
  {
    titleKey: 'hooks.categoryStateStorage',
    items: [
      {
        name: 'useClipboard',
        path: '/hooks/use-clipboard',
        descKey: 'hooks.useClipboard.description',
      },
      {
        name: 'useControllableState',
        path: '/hooks/use-controllable-state',
        descKey: 'hooks.useControllableState.description',
      },
      {
        name: 'useLocalStorage',
        path: '/hooks/use-local-storage',
        descKey: 'hooks.useLocalStorage.description',
      },
      {
        name: 'useSessionStorage',
        path: '/hooks/use-session-storage',
        descKey: 'hooks.useSessionStorage.description',
      },
      {
        name: 'useHash',
        path: '/hooks/use-hash',
        descKey: 'hooks.useHash.description',
      },
    ],
  },
  {
    titleKey: 'hooks.categoryTiming',
    items: [
      {
        name: 'useDebouncedTransition',
        path: '/hooks/use-debounced-transition',
        descKey: 'hooks.useDebouncedTransition.description',
      },
      {
        name: 'useDeferredDebounce',
        path: '/hooks/use-deferred-debounce',
        descKey: 'hooks.useDeferredDebounce.description',
      },
      {
        name: 'useInterval',
        path: '/hooks/use-interval',
        descKey: 'hooks.useInterval.description',
      },
      {
        name: 'useTimeout',
        path: '/hooks/use-timeout',
        descKey: 'hooks.useTimeout.description',
      },
    ],
  },
  {
    titleKey: 'hooks.categoryUtility',
    items: [
      {
        name: 'useBreakpoint',
        path: '/hooks/use-breakpoint',
        descKey: 'hooks.useBreakpoint.description',
      },
      {
        name: 'useClient',
        path: '/hooks/use-client',
        descKey: 'hooks.useClient.description',
      },
      {
        name: 'useDisclosure',
        path: '/hooks/use-disclosure',
        descKey: 'hooks.useDisclosure.description',
      },
      {
        name: 'useStep',
        path: '/hooks/use-step',
        descKey: 'hooks.useStep.description',
      },
      {
        name: 'useWindowSize',
        path: '/hooks/use-window-size',
        descKey: 'hooks.useWindowSize.description',
      },
    ],
  },
  {
    titleKey: 'hooks.categoryObserver',
    items: [
      {
        name: 'useIntersectionObserver',
        path: '/hooks/use-intersection-observer',
        descKey: 'hooks.useIntersectionObserver.description',
      },
      {
        name: 'useInView',
        path: '/hooks/use-in-view',
        descKey: 'hooks.useInView.description',
      },
    ],
  },
];
