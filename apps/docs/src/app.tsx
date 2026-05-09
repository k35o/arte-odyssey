/* oxlint-disable import/max-dependencies -- このファイルはルーティング集約のため import 多 */
import type { RouteDefinition } from '@funstack/router/server';
import { route } from '@funstack/router/server';

import { LocaleLayout } from './layouts/locale-layout';
import { Components } from './pages/components';
import { AccordionPage } from './pages/components/accordion-page';
import { AlertPage } from './pages/components/alert-page';
import { AnchorPage } from './pages/components/anchor-page';
import { AutocompletePage } from './pages/components/autocomplete-page';
import { AvatarPage } from './pages/components/avatar-page';
import { BadgePage } from './pages/components/badge-page';
import { BaselineStatusPage } from './pages/components/baseline-status-page';
import { BreadcrumbPage } from './pages/components/breadcrumb-page';
import { ButtonPage } from './pages/components/button-page';
import { CardPage } from './pages/components/card-page';
import { CheckboxCardPage } from './pages/components/checkbox-card-page';
import { CheckboxPage } from './pages/components/checkbox-page';
import { CodePage } from './pages/components/code-page';
import { DialogPage } from './pages/components/dialog-page';
import { DrawerPage } from './pages/components/drawer-page';
import { DropdownMenuPage } from './pages/components/dropdown-menu-page';
import { FileFieldPage } from './pages/components/file-field-page';
import { FormControlPage } from './pages/components/form-control-page';
import { FormPage } from './pages/components/form-page';
import { HeadingPage } from './pages/components/heading-page';
import { IconButtonPage } from './pages/components/icon-button-page';
import { IconsPage } from './pages/components/icons-page';
import { ListBoxPage } from './pages/components/list-box-page';
import { ModalPage } from './pages/components/modal-page';
import { NumberFieldPage } from './pages/components/number-field-page';
import { PaginationPage } from './pages/components/pagination-page';
import { PasswordInputPage } from './pages/components/password-input-page';
import { PopoverPage } from './pages/components/popover-page';
import { ProgressPage } from './pages/components/progress-page';
import { RadioCardPage } from './pages/components/radio-card-page';
import { RadioPage } from './pages/components/radio-page';
import { ScrollLinkedPage } from './pages/components/scroll-linked-page';
import { SelectPage } from './pages/components/select-page';
import { SeparatorPage } from './pages/components/separator-page';
import { SkeletonPage } from './pages/components/skeleton-page';
import { SliderPage } from './pages/components/slider-page';
import { SpinnerPage } from './pages/components/spinner-page';
import { SwitchPage } from './pages/components/switch-page';
import { TablePage } from './pages/components/table-page';
import { TabsPage } from './pages/components/tabs-page';
import { TextFieldPage } from './pages/components/text-field-page';
import { TextareaPage } from './pages/components/textarea-page';
import { ToastPage } from './pages/components/toast-page';
import { TooltipPage } from './pages/components/tooltip-page';
import { GetStarted } from './pages/get-started';
import { Helpers } from './pages/helpers';
import { ChainPage } from './pages/helpers/chain-page';
import { CnPage } from './pages/helpers/cn-page';
import { CreateSafeContextPage } from './pages/helpers/create-safe-context-page';
import { MergePropsPage } from './pages/helpers/merge-props-page';
import { MergeRefsPage } from './pages/helpers/merge-refs-page';
import { Home } from './pages/home';
import { HooksPage } from './pages/hooks';
import { UseBreakpointPage } from './pages/hooks/use-breakpoint-page';
import { UseClickAwayPage } from './pages/hooks/use-click-away-page';
import { UseClientPage } from './pages/hooks/use-client-page';
import { UseClipboardPage } from './pages/hooks/use-clipboard-page';
import { UseControllableStatePage } from './pages/hooks/use-controllable-state-page';
import { UseDebouncedTransitionPage } from './pages/hooks/use-debounced-transition-page';
import { UseDeferredDebouncePage } from './pages/hooks/use-deferred-debounce-page';
import { UseDisclosurePage } from './pages/hooks/use-disclosure-page';
import { UseHashPage } from './pages/hooks/use-hash-page';
import { UseHoverPage } from './pages/hooks/use-hover-page';
import { UseInViewPage } from './pages/hooks/use-in-view-page';
import { UseIntersectionObserverPage } from './pages/hooks/use-intersection-observer-page';
import { UseIntervalPage } from './pages/hooks/use-interval-page';
import { UseLocalStoragePage } from './pages/hooks/use-local-storage-page';
import { UseResizePage } from './pages/hooks/use-resize-page';
import { UseScrollDirectionPage } from './pages/hooks/use-scroll-direction-page';
import { UseScrollLockPage } from './pages/hooks/use-scroll-lock-page';
import { UseSessionStoragePage } from './pages/hooks/use-session-storage-page';
import { UseStepPage } from './pages/hooks/use-step-page';
import { UseTimeoutPage } from './pages/hooks/use-timeout-page';
import { UseWindowResizePage } from './pages/hooks/use-window-resize-page';
import { UseWindowSizePage } from './pages/hooks/use-window-size-page';
import { RootRedirect } from './pages/root-redirect';
import { Theming } from './pages/theming';
import { Router } from './router';

const routes: RouteDefinition[] = [
  route({
    path: '/',
    component: <RootRedirect />,
  }),
  route({
    path: '/:locale',
    component: LocaleLayout,
    children: [
      route({
        path: '/',
        component: <Home />,
      }),
      route({
        path: '/get-started',
        component: <GetStarted />,
      }),
      route({
        path: '/components',
        component: <Components />,
      }),
      route({
        path: '/components/button',
        component: <ButtonPage />,
      }),
      route({
        path: '/components/icon-button',
        component: <IconButtonPage />,
      }),
      route({
        path: '/components/anchor',
        component: <AnchorPage />,
      }),
      route({
        path: '/components/text-field',
        component: <TextFieldPage />,
      }),
      route({
        path: '/components/textarea',
        component: <TextareaPage />,
      }),
      route({
        path: '/components/number-field',
        component: <NumberFieldPage />,
      }),
      route({
        path: '/components/select',
        component: <SelectPage />,
      }),
      route({
        path: '/components/checkbox',
        component: <CheckboxPage />,
      }),
      route({
        path: '/components/checkbox-card',
        component: <CheckboxCardPage />,
      }),
      route({
        path: '/components/switch',
        component: <SwitchPage />,
      }),
      route({
        path: '/components/password-input',
        component: <PasswordInputPage />,
      }),
      route({
        path: '/components/radio',
        component: <RadioPage />,
      }),
      route({
        path: '/components/radio-card',
        component: <RadioCardPage />,
      }),
      route({
        path: '/components/autocomplete',
        component: <AutocompletePage />,
      }),
      route({
        path: '/components/slider',
        component: <SliderPage />,
      }),
      route({
        path: '/components/file-field',
        component: <FileFieldPage />,
      }),
      route({
        path: '/components/form-control',
        component: <FormControlPage />,
      }),
      route({
        path: '/components/form',
        component: <FormPage />,
      }),
      route({
        path: '/components/accordion',
        component: <AccordionPage />,
      }),
      route({
        path: '/components/avatar',
        component: <AvatarPage />,
      }),
      route({
        path: '/components/badge',
        component: <BadgePage />,
      }),
      route({
        path: '/components/card',
        component: <CardPage />,
      }),
      route({
        path: '/components/code',
        component: <CodePage />,
      }),
      route({
        path: '/components/table',
        component: <TablePage />,
      }),
      route({
        path: '/components/list-box',
        component: <ListBoxPage />,
      }),
      route({
        path: '/components/baseline-status',
        component: <BaselineStatusPage />,
      }),
      route({
        path: '/components/progress',
        component: <ProgressPage />,
      }),
      route({
        path: '/components/heading',
        component: <HeadingPage />,
      }),
      route({
        path: '/components/alert',
        component: <AlertPage />,
      }),
      route({
        path: '/components/skeleton',
        component: <SkeletonPage />,
      }),
      route({
        path: '/components/spinner',
        component: <SpinnerPage />,
      }),
      route({
        path: '/components/toast',
        component: <ToastPage />,
      }),
      route({
        path: '/components/tooltip',
        component: <TooltipPage />,
      }),
      route({
        path: '/components/dialog',
        component: <DialogPage />,
      }),
      route({
        path: '/components/drawer',
        component: <DrawerPage />,
      }),
      route({
        path: '/components/modal',
        component: <ModalPage />,
      }),
      route({
        path: '/components/popover',
        component: <PopoverPage />,
      }),
      route({
        path: '/components/dropdown-menu',
        component: <DropdownMenuPage />,
      }),
      route({
        path: '/components/separator',
        component: <SeparatorPage />,
      }),
      route({
        path: '/components/tabs',
        component: <TabsPage />,
      }),
      route({
        path: '/components/breadcrumb',
        component: <BreadcrumbPage />,
      }),
      route({
        path: '/components/pagination',
        component: <PaginationPage />,
      }),
      route({
        path: '/components/scroll-linked',
        component: <ScrollLinkedPage />,
      }),
      route({
        path: '/components/icons',
        component: <IconsPage />,
      }),
      route({
        path: '/theming',
        component: <Theming />,
      }),
      route({
        path: '/hooks',
        component: <HooksPage />,
      }),
      route({
        path: '/hooks/use-breakpoint',
        component: <UseBreakpointPage />,
      }),
      route({
        path: '/hooks/use-click-away',
        component: <UseClickAwayPage />,
      }),
      route({
        path: '/hooks/use-client',
        component: <UseClientPage />,
      }),
      route({
        path: '/hooks/use-clipboard',
        component: <UseClipboardPage />,
      }),
      route({
        path: '/hooks/use-debounced-transition',
        component: <UseDebouncedTransitionPage />,
      }),
      route({
        path: '/hooks/use-deferred-debounce',
        component: <UseDeferredDebouncePage />,
      }),
      route({
        path: '/hooks/use-disclosure',
        component: <UseDisclosurePage />,
      }),
      route({
        path: '/hooks/use-hash',
        component: <UseHashPage />,
      }),
      route({
        path: '/hooks/use-in-view',
        component: <UseInViewPage />,
      }),
      route({
        path: '/hooks/use-intersection-observer',
        component: <UseIntersectionObserverPage />,
      }),
      route({
        path: '/hooks/use-interval',
        component: <UseIntervalPage />,
      }),
      route({
        path: '/hooks/use-local-storage',
        component: <UseLocalStoragePage />,
      }),
      route({
        path: '/hooks/use-session-storage',
        component: <UseSessionStoragePage />,
      }),
      route({
        path: '/hooks/use-resize',
        component: <UseResizePage />,
      }),
      route({
        path: '/hooks/use-scroll-direction',
        component: <UseScrollDirectionPage />,
      }),
      route({
        path: '/hooks/use-step',
        component: <UseStepPage />,
      }),
      route({
        path: '/hooks/use-timeout',
        component: <UseTimeoutPage />,
      }),
      route({
        path: '/hooks/use-window-resize',
        component: <UseWindowResizePage />,
      }),
      route({
        path: '/hooks/use-scroll-lock',
        component: <UseScrollLockPage />,
      }),
      route({
        path: '/hooks/use-hover',
        component: <UseHoverPage />,
      }),
      route({
        path: '/hooks/use-controllable-state',
        component: <UseControllableStatePage />,
      }),
      route({
        path: '/hooks/use-window-size',
        component: <UseWindowSizePage />,
      }),
      route({
        path: '/helpers',
        component: <Helpers />,
      }),
      route({
        path: '/helpers/cn',
        component: <CnPage />,
      }),
      route({
        path: '/helpers/merge-refs',
        component: <MergeRefsPage />,
      }),
      route({
        path: '/helpers/merge-props',
        component: <MergePropsPage />,
      }),
      route({
        path: '/helpers/chain',
        component: <ChainPage />,
      }),
      route({
        path: '/helpers/create-safe-context',
        component: <CreateSafeContextPage />,
      }),
    ],
  }),
];

export default function App() {
  return <Router fallback="static" routes={routes} />;
}
