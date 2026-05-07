'use client';

import {
  AccessibilityIcon,
  AtomIcon,
  BlogIcon,
  Button,
  Card,
  DarkModeIcon,
  GitHubIcon,
  Heading,
  PaletteIcon,
  Separator,
  ShieldCheckIcon,
  SparklesIcon,
} from '@k8o/arte-odyssey';
import type { FC, ReactNode } from 'react';

import { STORYBOOK_URL } from '../constants';
import { useTranslation } from '../i18n';
import type { MessageKey } from '../i18n/types';

type Feature = {
  title: MessageKey;
  description: MessageKey;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: 'home.featureReact',
    description: 'home.featureReactDescription',
    icon: <AtomIcon />,
  },
  {
    title: 'home.featureTailwind',
    description: 'home.featureTailwindDescription',
    icon: <PaletteIcon />,
  },
  {
    title: 'home.featureDarkMode',
    description: 'home.featureDarkModeDescription',
    icon: <DarkModeIcon />,
  },
  {
    title: 'home.featureTypeScript',
    description: 'home.featureTypeScriptDescription',
    icon: <ShieldCheckIcon />,
  },
  {
    title: 'home.featureAccessible',
    description: 'home.featureAccessibleDescription',
    icon: <AccessibilityIcon />,
  },
  {
    title: 'home.featureMinimal',
    description: 'home.featureMinimalDescription',
    icon: <SparklesIcon />,
  },
];

const FeatureCard: FC<{ feature: Feature }> = ({ feature }) => {
  const { t } = useTranslation();

  return (
    <Card appearance="shadow">
      <div className="flex flex-col gap-3 p-5">
        <div className="text-fg-mute">{feature.icon}</div>
        <p className="text-fg-base font-medium">{t(feature.title)}</p>
        <p className="text-fg-mute text-sm leading-relaxed">
          {t(feature.description)}
        </p>
      </div>
    </Card>
  );
};

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-4">
        <Heading type="h1">{t('home.title')}</Heading>
        <p className="text-fg-mute text-lg">{t('home.description')}</p>
      </div>
      <Separator color="mute" />
      <div className="flex gap-6">
        <Button
          color="gray"
          renderItem={({ className, children }) => (
            <a
              className={className}
              href="https://github.com/k35o/arte-odyssey"
              rel="noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          )}
          size="md"
          startIcon={<GitHubIcon />}
          variant="outlined"
        >
          {t('home.github')}
        </Button>
        <Button
          renderItem={({ className, children }) => (
            <a
              className={className}
              href={STORYBOOK_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          )}
          size="md"
          startIcon={<BlogIcon />}
          variant="contained"
        >
          {t('home.storybook')}
        </Button>
      </div>
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <Heading type="h2">{t('home.featuresTitle')}</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
