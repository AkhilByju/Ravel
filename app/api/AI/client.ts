'use server';

import ollama from 'ollama';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function* streamChat({
  model = 'gpt-5-nano',
  messages,
  options,
}: {
  model?: string;
  messages: ChatMessage[];
  options?: Record<string, any>;
}) {
  const result = await openai.responses.create({
  model: "gpt-5",
  input: messages,
  reasoning: { effort: "low" },
  text: { verbosity: "low" },
});
  for await (const chunk of result.output_text) {
    yield chunk;
  }
}