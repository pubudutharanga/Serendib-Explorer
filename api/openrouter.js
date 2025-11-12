// src/openrouterProxy.js
// Frontend proxy helper — uses your deployed Vercel function for OpenRouter requests.

const DEFAULT_PROXY = 'https://serendib-explorer.vercel.app/api/openrouter';
export const PROXY_URL = import.meta.env.VITE_OPENROUTER_PROXY_URL || DEFAULT_PROXY;

export async function proxyOpenRouter(payload) {
  if (!PROXY_URL) throw new Error('Proxy URL not configured');

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}


