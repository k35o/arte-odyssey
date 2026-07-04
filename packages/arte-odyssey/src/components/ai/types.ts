export type ChatStatus = 'ready' | 'submitted' | 'streaming' | 'error';

export type ToolState =
  | 'input-streaming'
  | 'input-available'
  | 'output-available'
  | 'output-error';
