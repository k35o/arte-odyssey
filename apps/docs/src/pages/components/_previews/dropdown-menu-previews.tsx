'use client';

import { DarkModeIcon, DropdownMenu } from '@k8o/arte-odyssey';

export function DropdownMenuBasicPreview() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger label="Actions" />
      <DropdownMenu.Content>
        <DropdownMenu.Item label="Edit" onClick={() => undefined} />
        <DropdownMenu.Item label="Duplicate" onClick={() => undefined} />
        <DropdownMenu.Item label="Delete" onClick={() => undefined} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function DropdownMenuIconTriggerPreview() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.IconTrigger
        icon={<DarkModeIcon size="lg" />}
        label="Theme"
      />
      <DropdownMenu.Content>
        <DropdownMenu.Item label="Light" onClick={() => undefined} />
        <DropdownMenu.Item label="Dark" onClick={() => undefined} />
        <DropdownMenu.Item label="System" onClick={() => undefined} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function DropdownMenuSizesPreview() {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger label="Small" size="sm" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger label="Medium" size="md" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger label="Large" size="lg" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}

export function DropdownMenuPlacementPreview() {
  return (
    <>
      <DropdownMenu.Root placement="bottom-start">
        <DropdownMenu.Trigger label="Bottom Start" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root placement="bottom-end">
        <DropdownMenu.Trigger label="Bottom End" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root placement="top-start">
        <DropdownMenu.Trigger label="Top Start" />
        <DropdownMenu.Content>
          <DropdownMenu.Item label="Edit" onClick={() => undefined} />
          <DropdownMenu.Item label="Delete" onClick={() => undefined} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
