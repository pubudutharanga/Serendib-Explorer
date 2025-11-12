// src/openrouterProxy.js
// Frontend proxy helper — returns JSON/text and exposes PROXY_URL constant.
// Edit DEFAULT_PROXY to your Vercel function if you prefer hardcoding it here.

const DEFAULT_PROXY = 'https://serendib-explorer.vercel.app/api/openrouter'; 
// <-- REPLACE this with your Vercel URL, e.g. https://serendib-proxy.vercel.app/api/openrouter

export const PROXY_URL = import.meta.env.VITE_OPENROUTER_PROXY_URL || DEFAULT_PROXY;

export async function proxyOpenRouter(payload) {
  if (!PROXY_URL) throw new Error('Proxy URL not configured');

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  // Try parse JSON, otherwise return raw text (helps propagate error bodies)
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

