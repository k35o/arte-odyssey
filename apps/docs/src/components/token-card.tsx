'use client';

import { Card } from '@k8o/arte-odyssey';

import { useTheme } from '../theme/context';
import type { SemanticToken } from '../theme/design-tokens';

export function TokenCard({
  token,
  type = 'fill',
}: {
  token: SemanticToken;
  type?: 'fill' | 'border';
}) {
  const { theme } = useTheme();
  const source = token[theme];

  return (
    <Card appearance="shadow">
      <div className="flex items-center gap-3 px-3 py-2">
        <div
          className="size-6 shrink-0 rounded-md"
          style={
            type === 'border'
              ? { border: `2px solid var(--${token.name})` }
              : { backgroundColor: `var(--${token.name})` }
          }
        />
        <div className="min-w-0">
          <p className="text-sm font-medium">{token.name}</p>
          <p className="text-fg-subtle text-xs">{source}</p>
        </div>
      </div>
    </Card>
  );
}
