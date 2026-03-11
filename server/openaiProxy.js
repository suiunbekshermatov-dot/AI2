import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/assistant', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a college assistant. Give concise, useful answers about the College Digital System.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return res.json({ reply: completion.choices[0]?.message?.content || 'No reply generated.' });
  } catch (error) {
    return res.status(500).json({ error: 'OpenAI request failed', details: error.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`OpenAI proxy running on http://localhost:${port}`);
});
