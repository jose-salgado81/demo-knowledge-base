const { GoogleGenAI } = require('@google/genai');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing from environment variables.' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const prompt = body?.prompt;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Try primary model, with a fallback if overloaded
    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: prompt,
      });
      responseText = response.text;
    } catch (modelError) {
      console.warn('Primary model busy, trying fallback...', modelError);
      // Fallback model or friendly message if 503
      if (modelError.message && modelError.message.includes('503')) {
        return res.status(503).json({ 
          error: 'The AI assistant is currently experiencing high traffic (Beta). Please try again in a moment!' 
        });
      }
      throw modelError;
    }

    return res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};