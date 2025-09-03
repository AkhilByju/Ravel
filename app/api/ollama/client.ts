'use server'; // ensures server-only usage in Next.js

import ollama from 'ollama';

// Optional: override host if not default localhost:11434
// process.env.OLLAMA_HOST = process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434';

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function* streamChat({
  model = 'llama3.1',
  messages,
  options,
}: {
  model?: string;
  messages: ChatMessage[];
  options?: Record<string, any>;
}) {
  const response = await ollama.chat({ model, messages, stream: true, options });
  for await (const chunk of response) {
    yield chunk; // { message?: {role, content?}, done?: boolean, etc. }
  }
}

export async function chatOnce({
  model = 'llama3.1',
  messages,
  options,
}: {
  model?: string;
  messages: ChatMessage[];
  options?: Record<string, any>;
}) {
  return ollama.chat({ model, messages, stream: false, options });
}
