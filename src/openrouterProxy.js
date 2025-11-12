// src/openrouterProxy.js
const PROXY_URL = 'https://serendib-explorer.vercel.app/api/openrouter'; // <- REPLACE this with your Vercel URL

export async function proxyOpenRouter(payload) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  try { return JSON.parse(text); } catch(e) { return text; }
}
