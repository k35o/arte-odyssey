import type { NavCategory } from './nav-types';

export const helperCategories: NavCategory[] = [
  {
    titleKey: 'helpers.categoryStyling',
    items: [
      { name: 'cn', path: '/helpers/cn', descKey: 'helpers.cn.description' },
    ],
  },
  {
    titleKey: 'helpers.categoryReact',
    items: [
      {
        name: 'mergeRefs',
        path: '/helpers/merge-refs',
        descKey: 'helpers.mergeRefs.description',
      },
      {
        name: 'mergeProps',
        path: '/helpers/merge-props',
        descKey: 'helpers.mergeProps.description',
      },
      {
        name: 'chain',
        path: '/helpers/chain',
        descKey: 'helpers.chain.description',
      },
      {
        name: 'createSafeContext',
        path: '/helpers/create-safe-context',
        descKey: 'helpers.createSafeContext.description',
      },
    ],
  },
];
