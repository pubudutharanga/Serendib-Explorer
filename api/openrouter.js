// api/openrouter.js
export default async function handler(req, res) {
  // ✅ Only allow your GitHub Pages site to access this proxy
  const ALLOWED_ORIGIN = 'https://pubudutharanga.github.io'; // <-- exact origin, no trailing slash or path

  const origin = req.headers.origin || '';

  // ✅ Handle preflight (CORS OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // ✅ Always send CORS header on all responses
  if (origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  } else {
    // Optional: restrict or allow all for testing
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }

  // ✅ Only POST supported
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // ✅ Your secret API key from Vercel environment variables
  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_KEY) {
    console.error('❌ Missing OPENROUTER_API_KEY env var');
    res.status(500).json({ error: 'Server misconfigured (missing API key)' });
    return;
  }

  try {
    // ✅ Forward the user’s prompt to OpenRouter
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
      },
      body,
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const text = await upstream.text();

    // ✅ Send OpenRouter’s response back to the browser
    res.status(upstream.status);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.send(text);
  } catch (err) {
    console.error('⚠️ Proxy error', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}

