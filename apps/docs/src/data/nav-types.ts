import type { MessageKey } from '../i18n';

export type NavItem = { name: string; path: string; descKey: MessageKey };
export type NavCategory = { titleKey: MessageKey; items: NavItem[] };
