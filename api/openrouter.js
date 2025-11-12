export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

  try {
    const body = req.body;
    if (!body) throw new Error('Empty request body');

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    if (text.startsWith('<!DOCTYPE html') || text.includes('Model Not Found')) {
      res.status(400).json({
        error: 'Invalid model or upstream response not JSON',
        details: text.slice(0, 300) + '...',
      });
      return;
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    res.status(502).json({ error: 'Bad Gateway', details: error.message });
  }
}


