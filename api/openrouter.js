// api/openrouter.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
  const OPENROUTER_URL = process.env.OPENROUTER_URL;

  if (!OPENROUTER_KEY || !OPENROUTER_URL) {
    res.status(500).json({ error: 'Server misconfiguration: API key or URL missing' });
    return;
  }

  let body;
  try {
    body = req.body;
    if (!body) throw new Error('Empty request body');
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON', details: e.message });
    return;
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: 'Upstream API error', details: text });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    res.status(502).json({ error: 'Bad Gateway', details: error.message });
  }
}

