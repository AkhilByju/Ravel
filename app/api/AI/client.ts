'use server';

import ollama from 'ollama';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function* streamChat({
  model = 'gpt-4',
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