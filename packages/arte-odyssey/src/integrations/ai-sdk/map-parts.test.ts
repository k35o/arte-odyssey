import type { UIMessage } from 'ai';

import { mapMessageParts } from './map-parts';

describe('mapMessageParts', () => {
  it('maps text / reasoning / tool parts preserving order', () => {
    const message = {
      id: 'm1',
      role: 'assistant',
      parts: [
        { type: 'step-start' },
        { type: 'reasoning', text: 'まず器から作る' },
        { type: 'text', text: 'こんにちは' },
        {
          type: 'tool-search',
          toolCallId: 'c1',
          state: 'output-available',
          input: { q: 'x' },
          output: 'result',
        },
      ],
    } as unknown as UIMessage;

    expect(mapMessageParts(message)).toEqual([
      { kind: 'reasoning', text: 'まず器から作る' },
      { kind: 'text', text: 'こんにちは' },
      {
        kind: 'tool',
        name: 'search',
        toolCallId: 'c1',
        state: 'output-available',
        input: { q: 'x' },
        output: 'result',
        errorText: undefined,
      },
    ]);
  });

  it('maps dynamic-tool with the error state', () => {
    const message = {
      id: 'm2',
      role: 'assistant',
      parts: [
        {
          type: 'dynamic-tool',
          toolName: 'run',
          toolCallId: 'c2',
          state: 'output-error',
          input: {},
          errorText: 'boom',
        },
      ],
    } as unknown as UIMessage;

    expect(mapMessageParts(message)).toEqual([
      {
        kind: 'tool',
        name: 'run',
        toolCallId: 'c2',
        state: 'output-error',
        input: {},
        output: undefined,
        errorText: 'boom',
      },
    ]);
  });

  it('skips unsupported parts', () => {
    const message = {
      id: 'm3',
      role: 'assistant',
      parts: [
        { type: 'step-start' },
        { type: 'file', mediaType: 'image/png', url: 'https://example.com/x' },
      ],
    } as unknown as UIMessage;

    expect(mapMessageParts(message)).toEqual([]);
  });
});
