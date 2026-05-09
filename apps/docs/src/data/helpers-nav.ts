import type { NavCategory } from './nav-types';

export const helperCategories: NavCategory[] = [
  {
    titleKey: 'helpers.categoryStyling',
    items: [{ name: 'cn', path: '/helpers/cn' }],
  },
  {
    titleKey: 'helpers.categoryReact',
    items: [
      { name: 'mergeRefs', path: '/helpers/merge-refs' },
      { name: 'mergeProps', path: '/helpers/merge-props' },
      { name: 'chain', path: '/helpers/chain' },
      { name: 'createSafeContext', path: '/helpers/create-safe-context' },
    ],
  },
];
