import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { getFallbackBlueprint, validateBlueprint } from '../../src/utils/fallbackData.js';

const router = express.Router();

/**
 * Strict JSON Schema definition for Gemini responseSchema
 */
const BLUEPRINT_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING', description: 'Poetic universe title summarizing the emotional state' },
    emotionalDNA: {
      type: 'OBJECT',
      properties: {
        primaryEmotion: { type: 'STRING' },
        secondaryEmotions: { 
          type: 'ARRAY', 
          items: { type: 'STRING' } 
        },
        intensity: { type: 'INTEGER', description: 'Scale 1 to 10' },
        interpretation: { type: 'STRING', description: 'Psychological and philosophical interpretation' }
      },
      required: ['primaryEmotion', 'secondaryEmotions', 'intensity', 'interpretation']
    },
    visualDNA: {
      type: 'OBJECT',
      properties: {
        colors: {
          type: 'ARRAY',
          description: 'Exactly five color palette entries with valid hex codes',
          items: {
            type: 'OBJECT',
            properties: {
              name: { type: 'STRING' },
              hex: { type: 'STRING', description: 'Valid hex code e.g. #8B5CF6' },
              meaning: { type: 'STRING' }
            },
            required: ['name', 'hex', 'meaning']
          }
        },
        style: { type: 'STRING' },
        lighting: { type: 'STRING' },
        composition: { type: 'STRING' },
        atmosphere: { type: 'STRING' }
      },
      required: ['colors', 'style', 'lighting', 'composition', 'atmosphere']
    },
    storyDNA: {
      type: 'OBJECT',
      properties: {
        title: { type: 'STRING' },
        narrative: { type: 'STRING', description: 'An original evocative short story expressing the emotion' },
        message: { type: 'STRING' }
      },
      required: ['title', 'narrative', 'message']
    },
    soundDNA: {
      type: 'OBJECT',
      properties: {
        genre: { type: 'STRING' },
        mood: { type: 'STRING' },
        instruments: { 
          type: 'ARRAY', 
          items: { type: 'STRING' } 
        },
        tempo: { type: 'STRING' },
        soundEffects: { 
          type: 'ARRAY', 
          items: { type: 'STRING' } 
        }
      },
      required: ['genre', 'mood', 'instruments', 'tempo', 'soundEffects']
    },
    artPrompt: { 
      type: 'STRING', 
      description: 'Detailed high-fidelity image generation prompt matching visual DNA' 
    }
  },
  required: ['title', 'emotionalDNA', 'visualDNA', 'storyDNA', 'soundDNA', 'artPrompt']
};

/**
 * POST /api/generate
 * Analyzes emotion inputs and produces a unified creative blueprint.
 */
router.post('/generate', async (req, res) => {
  try {
    const { 
      emotions = [], 
      description = '', 
      intensity = 7, 
      artisticStyle = 'Cinematic' 
    } = req.body || {};

    // 1. Validate request body
    const hasEmotions = Array.isArray(emotions) && emotions.length > 0;
    const hasDescription = typeof description === 'string' && description.trim().length > 0;

    if (!hasEmotions && !hasDescription) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please provide at least one emotion or describe your emotional state in natural language.'
      });
    }

    const numericIntensity = Math.min(10, Math.max(1, Number(intensity) || 7));
    const safeStyle = typeof artisticStyle === 'string' ? artisticStyle.trim() : 'Cinematic';

    // 2. Read GEMINI_API_KEY from backend environment
    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is missing or blank, cleanly use fallback blueprint
    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      console.warn('[MOODORA Backend] GEMINI_API_KEY not configured. Serving verified fallback blueprint.');
      const fallback = getFallbackBlueprint({
        emotions,
        description,
        intensity: numericIntensity,
        artisticStyle: safeStyle
      });
      return res.json(fallback);
    }

    // 3. Construct Gemini Prompt
    const prompt = `
You are the MOODORA AI Affective Intelligence Core.
Analyze the following human emotional input and generate a single unified, emotionally coherent creative blueprint.

USER INPUT:
- Primary/Selected Emotions: ${hasEmotions ? emotions.join(', ') : 'Not explicitly listed; derive from description'}
- Natural Language Description: "${description.trim() || 'No additional description provided'}"
- Affective Intensity: ${numericIntensity} / 10
- Desired Artistic Style: "${safeStyle}"

RULES & CONSTRAINTS:
1. Generate EXACTLY FIVE color palette entries in visualDNA.colors.
2. Every color MUST have a valid 6-character hexadecimal code starting with '#' (e.g., #8B5CF6).
3. Generate an original, evocative short story in storyDNA that mirrors this exact emotional frequency.
4. Generate detailed music direction in soundDNA (instruments, mood, tempo, sound effects), NOT raw audio.
5. Generate a rich, detailed artPrompt in artPrompt for generative image synthesis matching the visualDNA.
6. All four DNA modalities (Emotional, Visual, Story, Sound) MUST reflect the exact same emotional identity.
7. Return pure structured JSON matching the schema.
`;

    // 4. Initialize official @google/genai SDK
    const ai = new GoogleGenAI({ apiKey });

    // Call Gemini 2.5 Flash with structured output
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: BLUEPRINT_RESPONSE_SCHEMA,
        temperature: 0.75,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    let parsedBlueprint;
    try {
      parsedBlueprint = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[MOODORA Backend] JSON parse error from Gemini output:', parseError);
      throw new Error('Failed to parse Gemini output as JSON.');
    }

    // Ensure colors has exactly 5 entries
    if (parsedBlueprint.visualDNA && Array.isArray(parsedBlueprint.visualDNA.colors)) {
      while (parsedBlueprint.visualDNA.colors.length < 5) {
        parsedBlueprint.visualDNA.colors.push({
          name: 'Resonant Indigo',
          hex: '#6366F1',
          meaning: 'Complementary harmonic layer'
        });
      }
      if (parsedBlueprint.visualDNA.colors.length > 5) {
        parsedBlueprint.visualDNA.colors = parsedBlueprint.visualDNA.colors.slice(0, 5);
      }
    }

    // 5. Validate the structured JSON
    const validation = validateBlueprint(parsedBlueprint);
    if (!validation.valid) {
      console.warn('[MOODORA Backend] Gemini output validation warnings:', validation.errors);
      // If validation fails critical checks, fallback
      const fallback = getFallbackBlueprint({
        emotions,
        description,
        intensity: numericIntensity,
        artisticStyle: safeStyle
      });
      fallback._meta.note = `Partial Gemini schema mismatch. Switched to verified fallback. (${validation.errors[0]})`;
      return res.json(fallback);
    }

    // 6. Return verified Gemini blueprint with clear source attribution
    return res.json({
      ...parsedBlueprint,
      _meta: {
        source: 'gemini',
        isFallback: false,
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    // Log error safely without leaking sensitive information
    console.error('[MOODORA Backend] Error processing /api/generate:', error.message || error);

    // Fallback gracefully so the application never breaks
    const fallback = getFallbackBlueprint({
      emotions: req.body?.emotions || [],
      description: req.body?.description || '',
      intensity: req.body?.intensity || 7,
      artisticStyle: req.body?.artisticStyle || 'Cinematic'
    });

    fallback._meta.note = `Fallback activated due to server error: ${error.message || 'Gemini service unavailable'}`;

    return res.json(fallback);
  }
});

export default router;
