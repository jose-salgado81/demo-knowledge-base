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

    // Call Gemini API directly
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Check if it's a 503 Overloaded error from Gemini
    const errorMessage = error.message || '';
    if (errorMessage.includes('503') || errorMessage.includes('UNAVAILABLE') || errorMessage.includes('high demand')) {
      return res.status(503).json({ 
        error: 'The AI model is temporarily experiencing high demand (503). Please try again shortly.' 
      });
    }

    return res.status(500).json({ error: errorMessage || 'Internal server error' });
  }
};