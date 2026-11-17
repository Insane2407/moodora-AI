import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouter from './routes/generate.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY && 
    process.env.GEMINI_API_KEY.trim() !== '' && 
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );

  res.json({
    status: 'online',
    service: 'MOODORA AI Emotion Intelligence Engine',
    geminiConfigured: hasKey,
    timestamp: new Date().toISOString()
  });
});

// Mount /api routes
app.use('/api', generateRouter);

// 404 Handler for unrecognized /api routes
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `API endpoint ${req.originalUrl} does not exist.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[MOODORA Server Error]:', err.stack || err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred in the MOODORA Emotion Intelligence Core.'
  });
});

// Start Express Server
app.listen(PORT, () => {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY && 
    process.env.GEMINI_API_KEY.trim() !== '' && 
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );

  console.log(`===============================================`);
  console.log(`🌌 MOODORA AI Emotion Intelligence Core Online`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log(`🔑 Gemini API Key configured: ${hasKey ? 'YES (Live Gemini active)' : 'NO (Verified fallback active)'}`);
  console.log(`===============================================`);
});

export default app;
