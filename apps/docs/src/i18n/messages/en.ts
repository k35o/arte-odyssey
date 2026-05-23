import type { MessageKey } from '../types';

export const en = {
  'nav.home': 'Home',
  'nav.getStarted': 'Get Started',
  'nav.components': 'Components',
  'nav.theming': 'Theming',
  'nav.hooks': 'Hooks',
  'nav.helpers': 'Helpers',
  'home.title': 'ArteOdyssey',
  'home.description': 'React UI Component Library for k8o',
  'home.github': 'GitHub',
  'home.storybook': 'Storybook',
  'home.featuresTitle': 'Features',
  'home.featureReact': 'React 19',
  'home.featureReactDescription':
    'Built with the latest React 19. Supports modern patterns like Server Components and actions.',
  'home.featureTailwind': 'Tailwind CSS 4',
  'home.featureTailwindDescription':
    'Integrated with Tailwind CSS 4 utility-first approach. Light and dark modes switch seamlessly via semantic tokens.',
  'home.featureDarkMode': 'Dark Mode',
  'home.featureDarkModeDescription':
    'Seamless light and dark mode switching. Semantic tokens adapt automatically.',
  'home.featureTypeScript': 'TypeScript',
  'home.featureTypeScriptDescription':
    'Full type definitions included. Develop safely with editor autocompletion and compile-time type checking.',
  'home.featureAccessible': 'Accessibility',
  'home.featureAccessibleDescription':
    'Aiming for components that consider keyboard navigation and screen reader support based on WAI-ARIA patterns.',
  'home.featureMinimal': 'Soft & Sharp Design',
  'home.featureMinimalDescription':
    'Soft where you touch, sharp where you read. UI that speaks through whitespace and gentle forms.',
  'home.featureVerticalWriting': 'Vertical Writing Support',
  'home.featureVerticalWritingDescription':
    'The `writing-v` utility and `vertical:` variant deliver readable layouts on vertical paper. Preview the Japanese docs in vertical mode.',
  'common.language': 'Language',
  'nav.openMenu': 'Open menu',
  'getStarted.introduction':
    'ArteOdyssey is a UI component library built with React 19 and Tailwind CSS 4. Interactive elements like forms and cards feel approachable with rounded shapes and generous spacing, while informational elements stay crisp and clear. Calm but never boring UI.',
  'getStarted.installationTitle': 'Installation',
  'getStarted.installationDescription':
    'Install with your preferred package manager.',
  'getStarted.setupTitle': 'Setup',
  'getStarted.setupDescription':
    'After installation, complete the following two configuration steps.',
  'getStarted.setupCssDescription':
    'Import the CSS file at your application entry point.',
  'getStarted.setupProviderDescription':
    'Wrap your application with ArteOdysseyProvider.',
  'getStarted.usageTitle': 'Usage',
  'getStarted.usageDescription':
    'Once setup is complete, you can import and use components.',
  'getStarted.requirementsTitle': 'Requirements',
  'getStarted.requirementsDescription':
    'ArteOdyssey requires the following peer dependencies.',
  'getStarted.nextStepsTitle': 'Next Steps',
  'getStarted.nextStepsComponents':
    'Browse the component catalog to discover available UI parts',
  'getStarted.nextStepsTheming': 'Learn how to customize the theme',
  'getStarted.nextStepsStorybook':
    'View detailed documentation for each component in Storybook',
  'getStarted.packageManagerLabel': 'Package manager',
  'components.description':
    'A catalog of UI components provided by ArteOdyssey.',
  'components.categoryButtons': 'Buttons',
  'components.categoryNavigation': 'Navigation',
  'components.categoryForms': 'Forms',
  'components.categoryDataDisplay': 'Data Display',
  'components.categoryFeedback': 'Feedback',
  'components.categoryOverlays': 'Overlays',
  'components.categoryLayout': 'Layout',
  'components.categoryMedia': 'Media',
  'components.common.storybookLink': 'View in Storybook',
  'components.common.importTitle': 'Import',
  'components.common.usageTitle': 'Usage',
  'components.common.propsTitle': 'Props',
  'components.common.inheritsLabel':
    'Type base (some attrs are managed internally):',
  'components.button.description':
    'A button component that triggers user actions.',
  'components.button.variantsTitle': 'Variants',
  'components.button.colorsTitle': 'Colors',
  'components.button.sizesTitle': 'Sizes',
  'components.button.iconsTitle': 'With Icons',
  'components.button.fullWidthTitle': 'Full Width',
  'components.button.disabledTitle': 'Disabled',
  'components.button.renderItemTitle': 'Render as Link',
  'components.iconButton.description': 'An icon-only button component.',
  'components.iconButton.sizesTitle': 'Sizes',
  'components.iconButton.backgroundsTitle': 'Backgrounds',
  'components.iconButton.disabledTitle': 'Disabled',
  'components.iconButton.renderItemTitle': 'Render as Link',
  'components.anchor.description': 'A text link component.',
  'components.anchor.openInNewTabTitle': 'Open in New Tab',
  'components.anchor.renderAnchorTitle': 'Swap element via render prop',
  'components.anchor.renderAnchorDescription':
    'Pass renderAnchor to swap the element to a framework-specific anchor (e.g. Next.js Link, react-router Link). Spread all received props onto the replacement element.',
  'components.textField.description': 'A text input field.',
  'components.textField.placeholderTitle': 'Placeholder',
  'components.textField.disabledTitle': 'Disabled',
  'components.textField.invalidTitle': 'Invalid',
  'components.textarea.description': 'A multi-line text input field.',
  'components.textarea.rowsTitle': 'Rows',
  'components.textarea.autoResizeTitle': 'Auto Resize',
  'components.textarea.disabledTitle': 'Disabled',
  'components.textarea.invalidTitle': 'Invalid',
  'components.numberField.description': 'A number input field.',
  'components.numberField.stepPrecisionTitle': 'Step & Precision',
  'components.numberField.minMaxTitle': 'Min / Max',
  'components.numberField.disabledTitle': 'Disabled',
  'components.numberField.invalidTitle': 'Invalid',
  'components.select.description': 'A select box to choose from options.',
  'components.select.disabledTitle': 'Disabled',
  'components.select.invalidTitle': 'Invalid',
  'components.select.requiredTitle': 'Required',
  'components.select.defaultValueTitle': 'Default Value',
  'components.checkbox.description': 'A checkbox component.',
  'components.checkbox.defaultCheckedTitle': 'Default Checked',
  'components.checkbox.disabledTitle': 'Disabled',
  'components.checkbox.controlledTitle': 'Controlled',
  'components.checkboxCard.description':
    'A multi-select card group that makes each option a larger click target.',
  'components.checkboxCard.defaultValueTitle': 'Default Value',
  'components.switch.description':
    'A switch component for binary on/off state.',
  'components.switch.defaultCheckedTitle': 'Default Checked',
  'components.switch.disabledTitle': 'Disabled',
  'components.switch.controlledTitle': 'Controlled',
  'components.passwordInput.description':
    'A password field with a built-in visibility toggle.',
  'components.passwordInput.controlledTitle': 'Controlled',
  'components.passwordInput.disabledTitle': 'Disabled',
  'components.radio.description': 'A radio button group.',
  'components.radioGroup.description':
    'A group component for mutually exclusive radio options.',
  'components.radio.disabledTitle': 'Disabled',
  'components.radio.defaultValueTitle': 'Default Value',
  'components.radioCard.description':
    'A single-select card group for larger, more descriptive choices.',
  'components.radioCard.defaultValueTitle': 'Default Value',
  'components.autocomplete.description':
    'A selection component with autocomplete.',
  'components.autocomplete.disabledTitle': 'Disabled',
  'components.autocomplete.invalidTitle': 'Invalid',
  'components.autocomplete.requiredTitle': 'Required',
  'components.autocomplete.multipleSelectionTitle': 'Multiple Selection',
  'components.slider.description':
    'A single-thumb slider input with a styled track and handle.',
  'components.slider.minMaxStepTitle': 'Min / Max / Step',
  'components.slider.disabledTitle': 'Disabled',
  'components.fileField.description': 'A file upload field.',
  'components.fileField.acceptTypesTitle': 'Accept Types',
  'components.fileField.multipleFilesTitle': 'Multiple Files',
  'components.fileField.disabledTitle': 'Disabled',
  'components.fileField.invalidTitle': 'Invalid',
  'components.formControl.description':
    'A form control wrapper providing labels and error display.',
  'components.formControl.helpTextTitle': 'Help Text',
  'components.formControl.errorTextTitle': 'Error Text',
  'components.formControl.requiredTitle': 'Required',
  'components.formControl.disabledTitle': 'Disabled',
  'components.form.description':
    'A form wrapper that accepts an action prop and handles submission via the Async React form action pattern.',
  'components.form.actionStateTitle': 'With useActionState',
  'components.accordion.description': 'A collapsible content panel.',
  'components.accordion.defaultOpenTitle': 'Default Open',
  'components.avatar.description': 'A profile image component with fallback.',
  'components.avatar.withImageTitle': 'With Image',
  'components.avatar.sizesTitle': 'Sizes',
  'components.badge.description': 'A compact status or category label.',
  'components.badge.tonesTitle': 'Tones',
  'components.badge.variantsTitle': 'Variants',
  'components.badge.interactiveTitle': 'Interactive',
  'components.card.description': 'A card for grouping content.',
  'components.card.widthTitle': 'Width',
  'components.code.description': 'An inline code display component.',
  'components.code.colorDetectionTitle': 'Color Detection',
  'components.table.description':
    'A semantic table component with horizontal overflow support.',
  'components.table.emptyStateTitle': 'Empty State',
  'components.listBox.description': 'A dropdown list selection component.',
  'components.baselineStatus.description':
    'Displays browser support status for web features.',
  'components.baselineStatus.differentFeaturesTitle': 'Different Features',
  'components.progress.description': 'A progress bar component.',
  'components.progress.differentValuesTitle': 'Different Values',
  'components.progress.withLabelTitle': 'With Label',
  'components.heading.description': 'A heading component.',
  'components.heading.typesTitle': 'Types',
  'components.heading.lineClampTitle': 'Line Clamp',
  'components.alert.description':
    'An alert that displays status-based messages.',
  'components.alert.statusesTitle': 'Statuses',
  'components.skeleton.description':
    'A loading placeholder for content that has not arrived yet.',
  'components.skeleton.shapesTitle': 'Shapes',
  'components.skeleton.sizesTitle': 'Sizes',
  'components.skeleton.animationTitle': 'Animation',
  'components.spinner.description': 'A loading spinner.',
  'components.spinner.sizesTitle': 'Sizes',
  'components.toast.description':
    'A toast for temporary notification messages.',
  'components.tooltip.description':
    'A tooltip that shows supplementary info on hover.',
  'components.dialog.description': 'A dialog component.',
  'components.drawer.description':
    'A drawer that slides in from the screen edge.',
  'components.modal.description': 'A modal dialog component.',
  'components.popover.description': 'Floating content anchored to an element.',
  'components.dropdownMenu.description': 'A dropdown menu component.',
  'components.dropdownMenu.iconTriggerTitle': 'With Icon Trigger',
  'components.separator.description': 'A separator / divider component.',
  'components.separator.orientationsTitle': 'Orientations',
  'components.separator.colorsTitle': 'Colors',
  'components.tabs.description': 'A tab switching component.',
  'components.tabs.defaultSelectedTitle': 'Default Selected',
  'components.breadcrumb.description': 'A breadcrumb navigation component.',
  'components.breadcrumb.sizesTitle': 'Sizes',
  'components.pagination.description':
    'A minimal pagination component with prev/next controls and current position indicator.',
  'components.pagination.disabledTitle': 'Disabled',
  'components.scrollLinked.description':
    'A progress bar linked to scroll position.',
  'components.icons.description':
    'A catalog of icon components provided by ArteOdyssey.',
  'components.icons.sizesTitle': 'Sizes',
  'components.errorBoundary.description': 'An error boundary component.',
  'components.common.basicUsageTitle': 'Basic Usage',
  'components.modal.typesTitle': 'Types',
  'components.toast.useToastTitle': 'useToast Hook',
  'components.errorBoundary.fallbackRenderTitle': 'Fallback with Reset',
  'components.popover.placementTitle': 'Placement',
  'components.tooltip.placementTitle': 'Placement',
  'components.listBox.sizesTitle': 'Sizes',
  'components.listBox.triggerIconTitle': 'With TriggerIcon',
  'components.modal.defaultOpenTitle': 'Default Open',
  'components.dropdownMenu.sizesTitle': 'Sizes',
  'components.dropdownMenu.placementTitle': 'Placement',
  'components.drawer.customContentTitle': 'With Custom Content',
  'components.dialog.alertDialogTitle': 'Alert Dialog',
  'components.alert.multipleMessagesTitle': 'Multiple Messages',
  'components.accordion.multipleDefaultOpenTitle': 'Multiple Default Open',
  'components.breadcrumb.currentPageTitle': 'Current Page',
  'components.toast.closeAllTitle': 'Close All',
  'components.scrollLinked.windowScrollTitle': 'Window Scroll',
  'components.errorBoundary.fallbackComponentTitle': 'FallbackComponent',
  'components.errorBoundary.resetKeysTitle': 'Reset Keys',
  'hooks.description': 'A catalog of custom hooks provided by ArteOdyssey.',
  'hooks.categoryDomInteraction': 'DOM Interaction',
  'hooks.categoryStateStorage': 'State & Storage',
  'hooks.categoryTiming': 'Timing',
  'hooks.categoryUtility': 'Utility',
  'hooks.categoryObserver': 'Observer',
  'hooks.common.importTitle': 'Import',
  'hooks.common.usageTitle': 'Usage',
  'hooks.common.basicUsageTitle': 'Basic Usage',
  'hooks.common.parametersTitle': 'Parameters',
  'hooks.common.returnValueTitle': 'Return Value',
  'hooks.useClickAway.description':
    'A hook that detects clicks outside a specified element.',
  'hooks.useClient.description':
    'A hook that returns whether the code is running on the client.',
  'hooks.useClipboard.description':
    'A hook that provides clipboard read/write operations.',
  'hooks.useHash.description':
    'A hook that tracks the URL hash and reacts to changes.',
  'hooks.useInterval.description':
    'A hook that executes a callback at regular intervals.',
  'hooks.useLocalStorage.description':
    'A hook that persists state in localStorage with cross-tab sync.',
  'hooks.useLocalStorage.removeTitle': 'Remove Value',
  'hooks.useSessionStorage.description':
    'A hook that persists state in sessionStorage.',
  'hooks.useSessionStorage.removeTitle': 'Remove Value',
  'hooks.useResize.description':
    'A hook that observes element size changes via ResizeObserver.',
  'hooks.useScrollDirection.description':
    'A hook that detects the current scroll direction.',
  'hooks.useScrollDirection.targetTitle': 'Target element',
  'hooks.useScrollDirection.bodyNotScrollableNote':
    "This page's body does not scroll, so the behavior can't be tried here. Please verify on an actual scrollable page.",
  'hooks.useStep.description':
    'A hook for step-based navigation with keyboard support.',
  'hooks.useTimeout.description':
    'A hook that executes a callback after a specified delay.',
  'hooks.useWindowResize.description':
    'A hook that listens to window resize events.',
  'hooks.useBreakpoint.description':
    'A hook that checks whether the viewport matches a given breakpoint.',
  'hooks.useDebouncedTransition.description':
    'A hook that runs an action after a delay using startTransition and AbortController.',
  'hooks.useDeferredDebounce.description':
    'A hook that wraps useDeferredValue and returns the value together with a pending flag.',
  'hooks.useDisclosure.description':
    'A hook for managing open/close state with open, close, and toggle actions.',
  'hooks.useIntersectionObserver.description':
    'A hook that observes element visibility via IntersectionObserver.',
  'hooks.useInView.description':
    'A hook that returns whether an element is currently visible in the viewport.',
  'hooks.useWindowSize.description':
    'A hook that returns the current window dimensions.',
  'hooks.useScrollLock.description':
    'A hook that locks and unlocks scroll on the body or a specified element.',
  'hooks.useScrollLock.targetTitle': 'Target element',
  'hooks.useScrollLock.bodyNotScrollableNote':
    "This page's body does not scroll, so the behavior can't be tried here. Please verify on an actual scrollable page.",
  'hooks.useHover.description':
    'A hook that detects hover state of an element.',
  'hooks.useControllableState.description':
    'A hook that manages controlled/uncontrolled component state.',
  'hooks.useWritingMode.description':
    "A hook that observes an element's writing-mode and returns either horizontal or vertical.",
  'helpers.description':
    'A catalog of helper functions provided by ArteOdyssey.',
  'helpers.categoryStyling': 'Styling',
  'helpers.categoryReact': 'React',
  'helpers.common.importTitle': 'Import',
  'helpers.common.usageTitle': 'Usage',
  'helpers.common.basicUsageTitle': 'Basic Usage',
  'helpers.common.parametersTitle': 'Parameters',
  'helpers.common.returnValueTitle': 'Return Value',
  'helpers.cn.description':
    'A class name utility combining clsx and tailwind-merge.',
  'helpers.mergeRefs.description':
    'A utility that merges multiple refs into a single element.',
  'helpers.mergeProps.description':
    'A utility that merges multiple props together, properly combining className and event handlers.',
  'helpers.chain.description':
    'A utility that creates a function that calls multiple functions in order.',
  'helpers.createSafeContext.description':
    'A utility that creates a Context that throws clearly when accessed outside its Provider.',
  'theming.introduction':
    'ArteOdyssey uses a CSS variable-based design token system. It supports both light and dark modes and is easy to customize.',
  'theming.colorPaletteTitle': 'Color Palette',
  'theming.colorPaletteDescription':
    'There are 10 base color families, each with 10 shades from 50 to 900.',
  'theming.semanticColorsTitle': 'Semantic Colors',
  'theming.semanticColorsDescription':
    'Purpose-specific color tokens derived from the base colors. They automatically adapt when switching themes.',
  'theming.foregroundTitle': 'Foreground',
  'theming.backgroundTitle': 'Background',
  'theming.borderTitle': 'Border',
  'theming.brandColorsTitle': 'Brand Colors',
  'theming.brandColorsDescription':
    'Primary uses Teal and Secondary uses Cyan as their base brand colors.',
  'theming.typographyTitle': 'Typography',
  'theming.typographyDescription':
    'Design tokens for text sizes, font weights, letter spacing, and line heights.',
  'theming.textSizesTitle': 'Text Sizes',
  'theming.fontWeightsTitle': 'Font Weights',
  'theming.letterSpacingTitle': 'Letter Spacing',
  'theming.lineHeightTitle': 'Line Height',
  'theming.shadowTitle': 'Shadow',
  'theming.shadowDescription': 'Design tokens for box shadows.',
  'theming.borderRadiusTitle': 'Border Radius',
  'theming.borderRadiusDescription': 'Design tokens for border radius values.',
  'theming.darkModeTitle': 'Dark Mode',
  'theming.darkModeDescription':
    'Add the dark class to the root element to enable dark mode. Semantic color tokens automatically switch to their dark mode values.',
  'theming.spacingTitle': 'Spacing',
  'theming.spacingDescription':
    'The spacing scale. The base unit is 0.25rem (4px), and p-{n} or gap-{n} computes to n × 0.25rem.',
  'theming.breakpointsTitle': 'Breakpoints',
  'theming.breakpointsDescription': 'Responsive breakpoints.',
  'theming.zIndexTitle': 'Z-Index Layers',
  'theming.zIndexDescription':
    'A three-tier scale that defines stacking order for overlay components. Anchored floating UI (Popover / DropdownMenu / ListBox / Tooltip) sits on overlay, Modal / Drawer on modal, and Toast on toast.',
  'sideNav.openNavigation': 'Open navigation',
  'common.switchToDarkMode': 'Switch to dark mode',
  'common.switchToLightMode': 'Switch to light mode',
  'common.switchToVerticalWriting': 'Switch to vertical preview',
  'common.switchToHorizontalWriting': 'Switch to horizontal preview',
  'error.title': 'Something went wrong',
  'error.description': 'An unexpected error occurred.',
  'error.retry': 'Retry',
} as const satisfies Record<MessageKey, string>;
