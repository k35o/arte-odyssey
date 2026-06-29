'use client';

import { Alert, Button } from '@k8o/arte-odyssey';
import { useState } from 'react';

export function AlertDismissiblePreview() {
  const [isVisible, setIsVisible] = useState(true);
  return isVisible ? (
    <Alert
      message="お使いのブラウザでは一部の機能が正しく動作しない可能性があります。最新版への更新をおすすめします。"
      onClose={() => {
        setIsVisible(false);
      }}
      tone="warning"
    />
  ) : (
    <Button
      onClick={() => {
        setIsVisible(true);
      }}
      variant="outline"
    >
      Reset
    </Button>
  );
}

export function AlertWithActionPreview() {
  const [isVisible, setIsVisible] = useState(true);
  return isVisible ? (
    <Alert
      action={{
        label: '詳しくはこちら',
        renderItem: ({ children }) => (
          <button
            className="text-primary-fg cursor-pointer underline underline-offset-2"
            onClick={() => {}}
            type="button"
          >
            {children}
          </button>
        ),
      }}
      message="お使いのブラウザでは一部の機能が正しく動作しない可能性があります。最新版への更新をおすすめします。"
      onClose={() => {
        setIsVisible(false);
      }}
      tone="warning"
    />
  ) : (
    <Button
      onClick={() => {
        setIsVisible(true);
      }}
      variant="outline"
    >
      Reset
    </Button>
  );
}
