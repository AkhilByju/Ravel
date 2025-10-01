export async function* streamAI(messages: {role:'user'|'assistant'|'system';content:string}[], model='gpt-5-nano') {
  const res = await fetch('/api/AI', {
    method: 'POST',
    body: JSON.stringify({ messages, model }),
  });
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (line) yield JSON.parse(line);
    }
  }
}