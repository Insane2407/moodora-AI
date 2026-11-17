import { getFallbackBlueprint, validateBlueprint } from '../utils/fallbackData.js';

/**
 * MOODORA AI Frontend Service
 * Communicates with the backend Emotion Intelligence Engine at /api/generate.
 * Never handles or exposes API keys directly in the client.
 */

/**
 * Sends emotion parameters to the backend and returns a structured creative blueprint.
 * If the backend is unreachable or encounters an issue, automatically uses verified fallback.
 * 
 * @param {object} moodData
 * @param {string[]} moodData.emotions - Selected emotion chips
 * @param {string} moodData.description - User natural language description
 * @param {number} moodData.intensity - Emotion intensity (1-10)
 * @param {string} moodData.artisticStyle - Selected style (Cinematic, Dreamy, etc.)
 * @returns {Promise<object>} The unified creative blueprint with _meta attribution
 */
export async function generateBlueprint(moodData) {
  const {
    emotions = [],
    description = '',
    intensity = 7,
    artisticStyle = 'Cinematic'
  } = moodData || {};

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emotions,
        description,
        intensity,
        artisticStyle,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.warn('[aiService] Backend returned error status:', response.status, errorBody);
      throw new Error(errorBody.message || `Server returned status ${response.status}`);
    }

    const data = await response.json();

    // Verify schema integrity
    const validation = validateBlueprint(data);
    if (!validation.valid) {
      console.warn('[aiService] Blueprint validation warnings:', validation.errors);
    }

    return data;
  } catch (error) {
    console.warn('[aiService] Failed to reach /api/generate or parse response:', error.message);
    console.info('[aiService] Activating local verified fallback blueprint.');

    // Gracefully return local fallback blueprint with clear attribution
    const fallback = getFallbackBlueprint({
      emotions,
      description,
      intensity,
      artisticStyle,
    });

    fallback._meta.note = `Client-side fallback activated (${error.message || 'Backend unreachable'})`;

    return fallback;
  }
}

/**
 * Checks the status of the MOODORA backend service.
 * @returns {Promise<{ online: boolean, geminiConfigured?: boolean, raw?: object }>}
 */
export async function checkServerHealth() {
  try {
    const res = await fetch('/api/health');
    if (res.ok) {
      const data = await res.json();
      return {
        online: true,
        geminiConfigured: Boolean(data.geminiConfigured),
        raw: data
      };
    }
    return { online: false, geminiConfigured: false };
  } catch {
    return { online: false, geminiConfigured: false };
  }
}

/**
 * Helper to identify whether a blueprint originated from real Gemini or fallback data.
 * @param {object} blueprint
 * @returns {boolean}
 */
export function isRealGeminiOutput(blueprint) {
  return blueprint?._meta?.source === 'gemini' && !blueprint?._meta?.isFallback;
}
