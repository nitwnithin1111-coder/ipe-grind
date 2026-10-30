// Vercel Serverless Function Proxy for Groq API
// Protects API keys and allows server-side GROQ_API_KEY environment variable

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-groq-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY || req.headers['x-groq-key'];
  if (!apiKey) {
    return res.status(400).json({
      error: 'Missing Groq API Key. Set GROQ_API_KEY in Vercel environment variables or provide x-groq-key header.'
    });
  }

  try {
    const { messages, model = 'qwen/qwen3.8-27b', temperature = 0.7, max_tokens = 900 } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    });

    const data = await groqRes.json();
    return res.status(groqRes.status).json(data);
  } catch (err) {
    console.error('Groq Proxy Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
