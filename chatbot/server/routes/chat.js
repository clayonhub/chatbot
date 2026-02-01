import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

const SYSTEM_PROMPT = `You are a helpful, concise AI assistant.

Answer clearly.
Be polite.
Use short paragraphs.
Use bullet points when helpful.
Avoid hallucinations.`;

const MODEL_CONFIG = {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.4,
    max_tokens: 1024,
};

// Initialize Groq client
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
        throw new Error('GROQ_API_KEY is not configured');
    }
    return new Groq({ apiKey });
};

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        // Input validation
        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({ error: 'Please enter a message.' });
        }

        // Sanitize and limit input length
        const sanitizedMessage = message.trim().slice(0, 4000);

        const groq = getGroqClient();

        const completion = await groq.chat.completions.create({
            ...MODEL_CONFIG,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: sanitizedMessage }
            ],
        });

        const response = completion.choices[0]?.message?.content ||
            'I apologize, but I could not generate a response. Please try again.';

        res.json({ response });

    } catch (error) {
        console.error('Chat API error:', error.message);
        console.error('Full error:', error);

        if (error.message === 'GROQ_API_KEY is not configured') {
            return res.status(500).json({
                error: 'API key not configured. Please check server configuration.'
            });
        }

        // Return more specific error for debugging
        res.status(500).json({
            error: error.message || 'The assistant is temporarily unavailable. Please try again.'
        });
    }
});

export default router;
