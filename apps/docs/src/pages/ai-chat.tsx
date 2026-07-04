import { Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../components/code-block';
import { T } from '../components/t';

export function AiChat() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">
          <T k="nav.aiChat" />
        </Heading>
        <p className="text-fg-mute text-lg">
          <T k="aiChat.introduction" />
        </p>
      </div>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.overviewTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.overviewDescription" />
        </p>
        <CodeBlock
          code={`'use client';
import { Avatar, AssistantIcon } from '@k8o/arte-odyssey';
import { Conversation, Message, PromptInput } from '@k8o/arte-odyssey/ai';
import { useChat } from '@ai-sdk/react';

export function Chat() {
  const { messages, sendMessage, status, stop } = useChat();

  return (
    <div className="flex h-full flex-col gap-3">
      <Conversation.Root>
        <Conversation.Messages isStreaming={status === 'streaming'}>
          {messages.map((m) => (
            <Message.Root from={m.role === 'user' ? 'user' : 'assistant'} key={m.id}>
              {m.role !== 'user' && (
                <Avatar color="primary" icon={<AssistantIcon />} name="AI" size="sm" />
              )}
              <Message.Content>{textOf(m)}</Message.Content>
            </Message.Root>
          ))}
        </Conversation.Messages>
        <Conversation.ScrollButton />
      </Conversation.Root>

      <PromptInput.Root
        onStop={stop}
        onSubmit={(text) => sendMessage({ text })}
        status={status}
      >
        <PromptInput.Textarea placeholder="メッセージを入力" />
        <PromptInput.Submit />
      </PromptInput.Root>
    </div>
  );
}`}
          lang="tsx"
        />
      </section>

      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.inputTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.inputDescription" />
        </p>
        <CodeBlock
          code={`// Enter to send, Shift+Enter for a newline, IME-confirm Enter never submits.
// status: 'ready' | 'submitted' | 'streaming' | 'error' (matches AI SDK).
<PromptInput.Root status={status} onSubmit={send} onStop={stop}>
  <PromptInput.Textarea placeholder="メッセージを入力" />
  <PromptInput.Submit /> {/* send when ready, stop while streaming */}
</PromptInput.Root>`}
          lang="tsx"
        />
      </section>

      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.responseTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.responseDescription" />
        </p>
        <CodeBlock
          code={`// pnpm add streamdown
import { Response } from '@k8o/arte-odyssey/ai/response';
import 'streamdown/styles.css';

<Message.Content>
  <Response isStreaming={isStreaming}>{markdown}</Response>
</Message.Content>`}
          lang="tsx"
        />
      </section>

      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.toolTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.toolDescription" />
        </p>
        <CodeBlock
          code={`import { Reasoning, ToolInvocation } from '@k8o/arte-odyssey/ai';

<Reasoning isStreaming={isThinking}>{reasoningText}</Reasoning>

<ToolInvocation
  name="search_web"
  state="output-available" // 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  input={{ query: 'ArteOdyssey' }}
  output="…"
/>`}
          lang="tsx"
        />
      </section>

      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.aiSdkTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.aiSdkDescription" />
        </p>
        <CodeBlock
          code={`import { mapMessageParts } from '@k8o/arte-odyssey/ai-sdk';
import { Reasoning, ToolInvocation } from '@k8o/arte-odyssey/ai';
import { Response } from '@k8o/arte-odyssey/ai/response';

<Message.Content>
  {mapMessageParts(message).map((part, i) => {
    if (part.kind === 'reasoning') return <Reasoning key={i}>{part.text}</Reasoning>;
    if (part.kind === 'tool') return <ToolInvocation key={i} {...part} />;
    return <Response key={i}>{part.text}</Response>;
  })}
</Message.Content>`}
          lang="tsx"
        />
      </section>

      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="aiChat.jsonRenderTitle" />
        </Heading>
        <p className="text-fg-mute">
          <T k="aiChat.jsonRenderDescription" />
        </p>
        <CodeBlock
          code={`'use client';
import { Message } from '@k8o/arte-odyssey/ai';
import { JsonRenderUI } from '@k8o/arte-odyssey/json-render/registry';

// An LLM returned a UI spec as a tool result — render it inside the bubble.
<Message.Root from="assistant">
  <Message.Content>
    <JsonRenderUI spec={spec} />
  </Message.Content>
</Message.Root>`}
          lang="tsx"
        />
      </section>
    </div>
  );
}
