'use client';

/* oxlint-disable import/max-dependencies -- メインレイアウトとして必要な依存 */
import { Outlet, useLocation } from '@funstack/router';
import {
  Drawer,
  Heading,
  IconButton,
  ListIcon,
  Separator,
} from '@k8o/arte-odyssey';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../components/error-fallback';
import { LocaleAnchor } from '../components/locale-anchor';
import { Navigation } from '../components/navigation';
import { SideNavigation } from '../components/side-navigation';
import { componentCategories } from '../data/components-nav';
import { helperCategories } from '../data/helpers-nav';
import { hookCategories } from '../data/hooks-nav';
import type { NavCategory } from '../data/nav-types';
import {
  detectLocale,
  isLocale,
  LocaleProvider,
  useLocale,
  useTranslation,
} from '../i18n';
import { ThemeProvider } from '../theme/context';
import { WritingModeProvider } from '../theme/writing-mode-context';

type SideNavConfig = {
  categories: NavCategory[];
  titleKey: 'nav.components' | 'nav.hooks' | 'nav.helpers';
  catalogPath: string;
};

function useSideNavConfig(): SideNavConfig | null {
  const location = useLocation();
  const { pathname } = location;

  // /ja/components/button → match, /ja/components → no match
  if (/^\/[^/]+\/components\/.+/.test(pathname)) {
    return {
      categories: componentCategories,
      titleKey: 'nav.components',
      catalogPath: '/components',
    };
  }

  // /ja/hooks/use-click-away → match, /ja/hooks → no match
  if (/^\/[^/]+\/hooks\/.+/.test(pathname)) {
    return {
      categories: hookCategories,
      titleKey: 'nav.hooks',
      catalogPath: '/hooks',
    };
  }

  // /ja/helpers/cn → match, /ja/helpers → no match
  if (/^\/[^/]+\/helpers\/.+/.test(pathname)) {
    return {
      categories: helperCategories,
      titleKey: 'nav.helpers',
      catalogPath: '/helpers',
    };
  }

  return null;
}

function OutletWithErrorBoundary() {
  const location = useLocation();
  const locale = useLocale();

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorFallback
          locale={locale}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
      resetKeys={[location.entryId]}
    >
      <Outlet />
    </ErrorBoundary>
  );
}

function LayoutContent() {
  const sideNavConfig = useSideNavConfig();
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return sideNavConfig ? (
    <>
      <div className="bg-bg-base shrink-0">
        <Navigation />
        <Separator color="mute" />
        <div className="lg:hidden">
          <div className="bg-bg-surface flex items-center px-4 py-2">
            <IconButton
              label={t('sideNav.openNavigation')}
              onClick={() => {
                setIsDrawerOpen(true);
              }}
            >
              <ListIcon />
            </IconButton>
          </div>
          <Separator color="mute" />
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="border-border-mute hidden w-56 shrink-0 overflow-y-auto border-r p-2 lg:block">
          <SideNavigation categories={sideNavConfig.categories} />
        </aside>
        <main className="min-w-0 flex-1 overflow-y-auto">
          <OutletWithErrorBoundary />
        </main>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        side="left"
        title={
          <Heading type="h3">
            <LocaleAnchor path={sideNavConfig.catalogPath}>
              {t(sideNavConfig.titleKey)}
            </LocaleAnchor>
          </Heading>
        }
      >
        <SideNavigation
          categories={sideNavConfig.categories}
          onNavigate={() => {
            setIsDrawerOpen(false);
          }}
        />
      </Drawer>
    </>
  ) : (
    <>
      <div className="bg-bg-base shrink-0">
        <Navigation />
        <Separator color="mute" />
      </div>
      <main className="min-w-0 flex-1 overflow-y-auto">
        <OutletWithErrorBoundary />
      </main>
    </>
  );
}

export function LocaleLayout({ params }: { params: { locale: string } }) {
  const location = useLocation();
  const localeParam = params.locale;

  useEffect(() => {
    if (isLocale(localeParam)) {
      document.documentElement.lang = localeParam;
    }
  }, [localeParam]);

  if (!isLocale(localeParam)) {
    navigation.navigate(`/${detectLocale()}/`, { history: 'replace' });
    return null;
  }

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorFallback
          fullScreen
          locale={localeParam}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
      resetKeys={[location.entryId]}
    >
      <LocaleProvider locale={localeParam}>
        <ThemeProvider>
          <WritingModeProvider>
            <div className="flex h-dvh flex-col">
              <LayoutContent />
            </div>
          </WritingModeProvider>
        </ThemeProvider>
      </LocaleProvider>
    </ErrorBoundary>
  );
}
