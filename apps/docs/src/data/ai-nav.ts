import type { NavCategory } from './nav-types';

export const aiCategories: NavCategory[] = [
  {
    titleKey: 'nav.ai',
    items: [
      {
        name: 'AI Chat',
        path: '/ai/chat',
        descKey: 'ai.chatSummary',
      },
      {
        name: 'Generative UI',
        path: '/ai/generative-ui',
        descKey: 'ai.generativeUiSummary',
      },
      {
        name: 'AI Agents',
        path: '/ai/agents',
        descKey: 'ai.agentsSummary',
      },
    ],
  },
];
