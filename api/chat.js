// Vercel Serverless Function Proxy for Gemini & Groq AI APIs
// Prioritizes Google Gemini (GEMINI_API_KEY) with Groq fallback (GROQ_API_KEY)
// Zero client API keys required — 100% server-side managed!

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-groq-key, x-gemini-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, temperature = 0.7, max_tokens = 900 } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  const headers = req.headers || {};
  const geminiKey = process.env.GEMINI_API_KEY || headers['x-gemini-key'];
  const groqKey = process.env.GROQ_API_KEY || headers['x-groq-key'];

  if (!geminiKey && !groqKey) {
    return res.status(400).json({
      error: 'Missing AI API Key. Set GEMINI_API_KEY or GROQ_API_KEY in Vercel environment variables.'
    });
  }

  // Tier 1: Try Google Gemini (Fast, official Google AI)
  if (geminiKey) {
    try {
      const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${geminiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-flash-latest',
          messages: messages,
          temperature: temperature,
          max_tokens: max_tokens
        })
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        return res.status(200).json(data);
      } else {
        const errText = await geminiRes.text();
        console.warn('Gemini API notice:', geminiRes.status, errText);
      }
    } catch (geminiErr) {
      console.warn('Gemini proxy error:', geminiErr);
    }
  }

  // Tier 2: Try Groq API
  if (groqKey) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          messages: messages,
          temperature: temperature,
          max_tokens: max_tokens
        })
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        return res.status(200).json(data);
      }
    } catch (groqErr) {
      console.warn('Groq proxy error:', groqErr);
    }
  }

  return res.status(502).json({ error: 'AI upstream providers unavailable. Please try again shortly.' });
}
