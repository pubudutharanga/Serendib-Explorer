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

    const text = await response.text();

    // If OpenRouter returns HTML instead of JSON, likely model not found
    if (text.startsWith('<!DOCTYPE html') || text.includes('Model Not Found')) {
      res.status(400).json({
        error: 'Invalid model or upstream response not JSON',
        details: text.slice(0, 300) + '...', // truncate for readability
      });
      return;
    }

    // Try parsing JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      res.status(502).json({
        error: 'Upstream API returned invalid JSON',
        details: text.slice(0, 300) + '...',
      });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    res.status(502).json({ error: 'Bad Gateway', details: error.message });
  }
}

