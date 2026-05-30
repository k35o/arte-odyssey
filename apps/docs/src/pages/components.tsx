'use client';

import { Heading, Separator } from '@k8o/arte-odyssey';

import { CatalogCard } from '../components/catalog-card';
import { componentPreviews } from '../components/component-previews';
import { T } from '../components/t';
import { componentCategories } from '../data/components-nav';
import { useTranslation } from '../i18n';

export function Components() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">{t('nav.components')}</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.description" />
        </p>
      </div>
      <Separator color="mute" />
      {componentCategories.map((category) => (
        <section className="flex flex-col gap-4" key={category.titleKey}>
          <Heading type="h2">
            <T k={category.titleKey} />
          </Heading>
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <CatalogCard
                item={item}
                key={item.name}
                preview={componentPreviews[item.name]}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
