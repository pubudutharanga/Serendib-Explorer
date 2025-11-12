// api/openrouter.js
// Vercel serverless handler — proxy + CORS
export default async function handler(req, res) {
  // Allowed origin — set to your GitHub Pages origin for production
  const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || 'https://pubudutharanga.github.io';
  const UPSTREAM_URL = process.env.OPENROUTER_URL || 'https://api.openrouter.ai/v1/chat/completions';
  const UPSTREAM_KEY = process.env.OPENROUTER_KEY || process.env.OPENROUTER_API_KEY;

  // Always set CORS headers (for preflight and real requests)
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // If you need credentials, also set Access-Control-Allow-Credentials: true (and don't use '*')
  // res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only accept POST (adjust if you want GET passthroughs)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read request body (supports both already-parsed req.body and raw stream)
  let body = req.body;
  if (!body) {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString('utf8');
      body = raw ? JSON.parse(raw) : {};
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  if (!UPSTREAM_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: OPENROUTER_KEY not set' });
  }

  try {
    // Proxy request to upstream
    const upstreamResp = await fetch(UPSTREAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Upstream expects Bearer auth in most cases — change if your API expects different header
        Authorization: `Bearer ${UPSTREAM_KEY}`
      },
      body: JSON.stringify(body),
      // no-cors/mode not relevant server-side
    });

    // Pass upstream status and content-type through
    const contentType = upstreamResp.headers.get('content-type') || 'application/json';
    res.status(upstreamResp.status);
    res.setHeader('Content-Type', contentType);

    // Stream text back (works for JSON or text responses)
    const text = await upstreamResp.text();
    // Try to return JSON if response is JSON-like
    if (contentType.includes('application/json')) {
      try {
        return res.send(JSON.parse(text));
      } catch (e) {
        // fallthrough to send raw text
      }
    }
    return res.send(text);
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(502).json({ error: 'Bad Gateway', details: err.message });
  }
}

