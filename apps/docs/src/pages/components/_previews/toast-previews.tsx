'use client';

import { Button, ToastProvider, useToast } from '@k8o/arte-odyssey';

function ToastDemo() {
  const { onOpen } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        color="primary"
        onClick={() => {
          onOpen('success', 'Operation completed successfully');
        }}
      >
        Success
      </Button>
      <Button
        color="base"
        onClick={() => {
          onOpen('info', 'Here is some information');
        }}
      >
        Info
      </Button>
      <Button
        color="base"
        onClick={() => {
          onOpen('warning', 'Please check your input');
        }}
      >
        Warning
      </Button>
      <Button
        color="base"
        onClick={() => {
          onOpen('error', 'Something went wrong');
        }}
      >
        Error
      </Button>
    </div>
  );
}

function CloseAllDemo() {
  const { onOpen, onCloseAll } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        color="base"
        onClick={() => {
          onOpen('info', 'Notification 1');
        }}
      >
        Add Toast
      </Button>
      <Button
        color="base"
        onClick={() => {
          onOpen('success', 'Notification 2');
        }}
      >
        Add Another
      </Button>
      <Button color="primary" onClick={onCloseAll}>
        Close All
      </Button>
    </div>
  );
}

export function ToastBasicPreview() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}

export function ToastCloseAllPreview() {
  return (
    <ToastProvider>
      <CloseAllDemo />
    </ToastProvider>
  );
}
