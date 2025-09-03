import { NextRequest } from 'next/server';
import { streamChat } from '@/app/api/ollama/client';

export const runtime = 'nodejs'; // IMPORTANT: Ollama needs Node (not Edge)

export async function POST(req: NextRequest) {
  const { messages, model = 'llama3.1', options } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        for await (const chunk of streamChat({ model, messages, options })) {
          controller.enqueue(enc.encode(JSON.stringify(chunk) + '\n'));
        }
      } catch (e: any) {
        controller.enqueue(enc.encode(JSON.stringify({ error: e?.message || 'stream error' }) + '\n'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson' } });
}
