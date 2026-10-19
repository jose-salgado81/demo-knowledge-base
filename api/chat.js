const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

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

    // 1. Load Knowledge Base Index (Retrieval Step)
    let kbContext = '';
    try {
      const indexPath = path.join(process.cwd(), 'static', 'kb-index.json');
      if (fs.existsSync(indexPath)) {
        const kbData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        
        // Simple keyword matching relevance scoring
        const queryKeywords = prompt.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        
        const scoredDocs = kbData.map(doc => {
          let score = 0;
          const textLower = (doc.title + ' ' + doc.content).toLowerCase();
          queryKeywords.forEach(kw => {
            if (textLower.includes(kw)) score += 1;
          });
          return { ...doc, score };
        });

        // Sort by relevance and take top 2 matches
        scoredDocs.sort((a, b) => b.score - a.score);
        const topMatches = scoredDocs.filter(d => d.score > 0).slice(0, 2);

        if (topMatches.length > 0) {
          kbContext = topMatches.map(d => `--- Document: ${d.title} ---\n${d.content.substring(0, 1500)}`).join('\n\n');
        }
      }
    } catch (indexError) {
      console.warn('Could not load KB index for RAG:', indexError);
    }

    // 2. Construct the RAG Prompt for Gemini
    const ai = new GoogleGenAI({ apiKey });
    
    const systemPrompt = `You are a helpful AI support assistant for XLeap Docs (currently in BETA). 
Answer the user's question using ONLY the provided documentation context below if relevant. If the answer cannot be found in the documentation, politely state that you cannot find it in the knowledge base.

DOCUMENTATION CONTEXT:
${kbContext || 'No specific documentation matched.'}

USER QUESTION: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: systemPrompt,
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    const errorMessage = error.message || '';
    if (errorMessage.includes('503') || errorMessage.includes('UNAVAILABLE')) {
      return res.status(503).json({ 
        error: 'The AI model is temporarily experiencing high demand (503). Please try again shortly.' 
      });
    }

    return res.status(500).json({ error: errorMessage || 'Internal server error' });
  }
};