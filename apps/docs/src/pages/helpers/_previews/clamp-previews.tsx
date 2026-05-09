'use client';

import { clamp } from '@k8o/arte-odyssey';

export function ClampPreview() {
  const samples = [
    { input: 5, min: 0, max: 10 },
    { input: -5, min: 0, max: 10 },
    { input: 15, min: 0, max: 10 },
  ];

  return (
    <div className="flex flex-col gap-2 text-sm">
      {samples.map((s) => (
        <div
          className="border-border-mute flex items-center justify-between rounded-lg border px-3 py-2"
          key={s.input}
        >
          <span className="text-fg-mute">
            clamp({s.input}, {s.min}, {s.max})
          </span>
          <span className="text-fg-base font-medium">
            → {clamp(s.input, s.min, s.max)}
          </span>
        </div>
      ))}
    </div>
  );
}
