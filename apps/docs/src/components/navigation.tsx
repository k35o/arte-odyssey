'use client';

import { useLocation } from '@funstack/router';
import { Button, DropdownMenu, NavigationMenuIcon } from '@k8o/arte-odyssey';

import type { MessageKey } from '../i18n';
import { localizeHref, useTranslation } from '../i18n';
import { LanguageSwitcher } from './language-switcher';
import { ThemeSwitcher } from './theme-switcher';

const NAV_ITEMS: Array<{ path: string; labelKey: MessageKey }> = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/get-started', labelKey: 'nav.getStarted' },
  { path: '/theming', labelKey: 'nav.theming' },
  { path: '/components', labelKey: 'nav.components' },
  { path: '/hooks', labelKey: 'nav.hooks' },
  { path: '/helpers', labelKey: 'nav.helpers' },
];

export function Navigation() {
  const { t, locale } = useTranslation();
  const location = useLocation();

  return (
    <nav className="bg-bg-surface">
      <div className="flex items-center justify-between px-6 py-4 md:px-8">
        <div className="md:hidden">
          <DropdownMenu.Root>
            <DropdownMenu.IconTrigger
              icon={<NavigationMenuIcon />}
              label={t('nav.openMenu')}
            />
            <DropdownMenu.Content>
              {NAV_ITEMS.map((item) => (
                <DropdownMenu.Item
                  key={item.path}
                  label={t(item.labelKey)}
                  onClick={() => {
                    navigation.navigate(localizeHref(item.path, locale));
                  }}
                />
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <ul className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => {
            const href = localizeHref(item.path, locale);
            const isActive = location.pathname === href;
            return (
              <li key={item.path}>
                <Button
                  isActive={isActive}
                  renderItem={({ className, children }) => (
                    <a className={className} href={href}>
                      {children}
                    </a>
                  )}
                  size="sm"
                  variant="skeleton"
                >
                  {t(item.labelKey)}
                </Button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
