/**
 * Fallback Data & Validation Utilities for MOODORA AI
 * Provides guaranteed schema-compliant blueprints when the Gemini API is unreachable
 * or when GEMINI_API_KEY is not configured.
 */

export const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

/**
 * Validates that a blueprint strictly adheres to the required MOODORA AI schema.
 * @param {any} data 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateBlueprint(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Blueprint must be a non-null object'] };
  }

  // Root title
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Missing or invalid root "title" string');
  }

  // Emotional DNA
  if (!data.emotionalDNA || typeof data.emotionalDNA !== 'object') {
    errors.push('Missing "emotionalDNA" object');
  } else {
    if (!data.emotionalDNA.primaryEmotion) errors.push('emotionalDNA.primaryEmotion is required');
    if (!Array.isArray(data.emotionalDNA.secondaryEmotions)) errors.push('emotionalDNA.secondaryEmotions must be an array');
    if (typeof data.emotionalDNA.intensity !== 'number') errors.push('emotionalDNA.intensity must be a number');
    if (!data.emotionalDNA.interpretation) errors.push('emotionalDNA.interpretation is required');
  }

  // Visual DNA
  if (!data.visualDNA || typeof data.visualDNA !== 'object') {
    errors.push('Missing "visualDNA" object');
  } else {
    if (!Array.isArray(data.visualDNA.colors) || data.visualDNA.colors.length !== 5) {
      errors.push(`visualDNA.colors must contain exactly 5 entries (received ${data.visualDNA?.colors?.length || 0})`);
    } else {
      data.visualDNA.colors.forEach((col, idx) => {
        if (!col.hex || !HEX_COLOR_REGEX.test(col.hex)) {
          errors.push(`visualDNA.colors[${idx}].hex "${col?.hex}" is not a valid hex color code`);
        }
        if (!col.name) errors.push(`visualDNA.colors[${idx}].name is required`);
        if (!col.meaning) errors.push(`visualDNA.colors[${idx}].meaning is required`);
      });
    }
    if (!data.visualDNA.style) errors.push('visualDNA.style is required');
    if (!data.visualDNA.lighting) errors.push('visualDNA.lighting is required');
    if (!data.visualDNA.composition) errors.push('visualDNA.composition is required');
    if (!data.visualDNA.atmosphere) errors.push('visualDNA.atmosphere is required');
  }

  // Story DNA
  if (!data.storyDNA || typeof data.storyDNA !== 'object') {
    errors.push('Missing "storyDNA" object');
  } else {
    if (!data.storyDNA.title) errors.push('storyDNA.title is required');
    if (!data.storyDNA.narrative) errors.push('storyDNA.narrative is required');
    if (!data.storyDNA.message) errors.push('storyDNA.message is required');
  }

  // Sound DNA
  if (!data.soundDNA || typeof data.soundDNA !== 'object') {
    errors.push('Missing "soundDNA" object');
  } else {
    if (!data.soundDNA.genre) errors.push('soundDNA.genre is required');
    if (!data.soundDNA.mood) errors.push('soundDNA.mood is required');
    if (!Array.isArray(data.soundDNA.instruments)) errors.push('soundDNA.instruments must be an array');
    if (!data.soundDNA.tempo) errors.push('soundDNA.tempo is required');
    if (!Array.isArray(data.soundDNA.soundEffects)) errors.push('soundDNA.soundEffects must be an array');
  }

  // Art prompt
  if (!data.artPrompt || typeof data.artPrompt !== 'string') {
    errors.push('Missing or invalid "artPrompt" string');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * High-quality fallback blueprints tailored by mood archetype
 */
const fallbackCatalog = {
  Peace: {
    title: "Sanctuary of the Silent Horizon",
    emotionalDNA: {
      primaryEmotion: "Peace",
      secondaryEmotions: ["Serenity", "Stillness", "Equanimity"],
      intensity: 6,
      interpretation: "A state of profound inner quietude where the restless noise of existence settles into clear, reflective waters."
    },
    visualDNA: {
      colors: [
        { name: "Obsidian Void", hex: "#11101D", meaning: "The quiet foundation of boundless night and calm" },
        { name: "Deep Amethyst", hex: "#8B5CF6", meaning: "Spiritual resonance and introspective contemplation" },
        { name: "Celestial Lavender", hex: "#C4B5FD", meaning: "Gentle morning mist lingering over still tide pools" },
        { name: "Glacial Cyan", hex: "#5EDCF5", meaning: "Clarity of thought and crystalline air" },
        { name: "Pure Starlight", hex: "#F8F7FF", meaning: "Unwavering inner equilibrium and quiet awareness" }
      ],
      style: "Dreamy & Minimalist",
      lighting: "Soft ambient bioluminescent glow diffused through low-hanging atmospheric haze",
      composition: "Wide panoramic horizontal horizon with solitary floating monolithic arch reflecting on mirror-calm glass water",
      atmosphere: "Weightless, meditative stillness where time suspends beneath a twilight dome"
    },
    storyDNA: {
      title: "The Breathing Sea",
      narrative: "Before the first word of the dawn was spoken, the voyager stepped upon the glass shore. The sea did not crash; it simply breathed in synchrony with the pulse of the stars. In that breathless expanse, every sorrow that once felt insurmountable dissolved into the silver tide, leaving only the tranquil realization that peace is not the absence of storms, but the quiet center that outlasts them.",
      message: "Within every tempest lies a quiet core that remains eternally unbroken."
    },
    soundDNA: {
      genre: "Ambient Psychoacoustic Meditation",
      mood: "Deeply tranquil, grounding, and expansive",
      instruments: ["Tibetan Singing Bowls", "Warm Felt Piano", "Ethereal Choral Pad", "Bowed Cello Harmonics"],
      tempo: "52 BPM (Resting Heartbeat)",
      soundEffects: ["Subtle gentle lake water lapping", "Distant wind chime overtones", "Binaural 432Hz sine resonance"]
    },
    artPrompt: "A serene solitary traveler in minimalist flowing robes standing at the edge of an infinite mirror-like glass sea reflecting a lavender and cyan nebula, soft volumetric mist, bioluminescent floating crystal structures, 8k resolution, cinematic lighting, masterpiece, tranquil, peaceful atmosphere, trending on Artstation."
  },

  Happiness: {
    title: "Radiance of the Solaris Awakening",
    emotionalDNA: {
      primaryEmotion: "Happiness",
      secondaryEmotions: ["Joy", "Vitality", "Euphoria"],
      intensity: 8,
      interpretation: "An exuberant surge of creative energy where spirit and cosmos vibrate in harmonious celebration."
    },
    visualDNA: {
      colors: [
        { name: "Cosmic Midnight", hex: "#11101D", meaning: "The velvet backdrop enabling radiant light to shine" },
        { name: "Electric Cyan", hex: "#5EDCF5", meaning: "Kinetic optimism and boundless enthusiasm" },
        { name: "Solar Coral", hex: "#FF8066", meaning: "Warmth of shared affection and blooming life" },
        { name: "Radiant Violet", hex: "#8B5CF6", meaning: "The transformative elevation of the soul" },
        { name: "Aura White", hex: "#F8F7FF", meaning: "Pure illumination and unburdened freedom" }
      ],
      style: "Cinematic & Vibrant",
      lighting: "High-key golden prism flares and dynamic caustics dancing through crystalline towers",
      composition: "Dynamic ascending spiraling perspective reaching toward a blazing dual star system",
      atmosphere: "Electric, luminous, and brimming with uninhibited buoyancy"
    },
    storyDNA: {
      title: "The Prism of Dawn",
      narrative: "The crystal towers of Aethelgard caught the twin dawn rays all at once, ringing out like thousand-foot tuning forks. Kaelen ran across the suspension bridge as luminous birds woven from pure light burst from the canopy beneath. He threw his arms open, laughing into the slipstream, realizing that joy was not a fragile gift to be guarded, but a wildfire meant to illuminate the entire world.",
      message: "True joy is a creative force that expands the universe with every heartbeat."
    },
    soundDNA: {
      genre: "Uplifting Orchestral Electronic",
      mood: "Exhilarating, celebratory, and triumphant",
      instruments: ["French Horns", "Analog Arpeggiated Synthesizers", "Marimba", "Soaring Violins"],
      tempo: "122 BPM (Uplifting & Kinetic)",
      soundEffects: ["Shimmering prism chimes", "Gentle acoustic guitar strums", "Subtle warm vinyl crackle"]
    },
    artPrompt: "An ethereal solarpunk city carved into white alabaster spires bathed in warm coral and cyan sunlight, cascading airborne waterfalls, prismatic light beams, blooming bioluminescent flora, photorealistic 8k, cinematic wide shot, volumetric starlight, joyful and breathtaking."
  },

  Nostalgia: {
    title: "Echoes of the Amber Hourglass",
    emotionalDNA: {
      primaryEmotion: "Nostalgia",
      secondaryEmotions: ["Longing", "Tender Melancholy", "Warmth"],
      intensity: 7,
      interpretation: "A bittersweet reverence for moments preserved in amber, carrying both the sting of impermanence and the sweetness of memory."
    },
    visualDNA: {
      colors: [
        { name: "Sepia Shadow", hex: "#11101D", meaning: "The forgotten corners of time and memory" },
        { name: "Velvet Lavender", hex: "#C4B5FD", meaning: "The gentle haze that softens the passage of years" },
        { name: "Amber Coral", hex: "#FF8066", meaning: "The warmth of hearths and cherished voices" },
        { name: "Dusk Violet", hex: "#8B5CF6", meaning: "The twilight between what was and what remains" },
        { name: "Linen White", hex: "#F8F7FF", meaning: "The purity of preserved childhood promises" }
      ],
      style: "Dreamy & Cinematic",
      lighting: "Warm 35mm golden hour backlighting with soft lens distortion and floating dust motes",
      composition: "Intimate medium framing looking out an arched colonial window onto an overgrown garden",
      atmosphere: "Sentimental, quiet, tinged with golden hour longing"
    },
    storyDNA: {
      title: "The Watchmaker's Keepsake",
      narrative: "In the dusty attic of the old observatory, Mara found the music box she and her brother had buried beneath the floorboards thirty summers prior. She wound the brass key. As the familiar seven-note melody tinkled into the quiet afternoon air, the scent of wild jasmine flooded her mind. Time had swept away the town, the schoolhouse, and the summers, but in this melody, everyone she had ever loved was laughing in the sun once more.",
      message: "What is deeply loved in memory can never truly be taken by time."
    },
    soundDNA: {
      genre: "Neo-Classical Lo-Fi Acoustic",
      mood: "Bittersweet, evocative, and intimate",
      instruments: ["Upright Tape Piano", "Acoustic Fingerstyle Guitar", "Muted Clarinet", "Vintage Music Box"],
      tempo: "68 BPM (Waltz Pace)",
      soundEffects: ["Analog tape hiss", "Gentle creak of wooden floorboards", "Distant summer cicadas"]
    },
    artPrompt: "A cozy sun-drenched sunroom overlooking overgrown ivy-covered gardens during golden hour twilight, vintage brass telescope, open letters with handwritten calligraphy, warm dust particles dancing in amber and lavender sunbeams, 35mm film photograph aesthetic, tender, deeply evocative."
  }
};

/**
 * Returns a dynamically synthesized fallback blueprint based on user input parameters.
 * Guarantees schema validity and attaches source = 'fallback'.
 * @param {object} params
 * @param {string[]} [params.emotions]
 * @param {string} [params.description]
 * @param {number} [params.intensity]
 * @param {string} [params.artisticStyle]
 * @returns {object}
 */
export function getFallbackBlueprint({ emotions = [], description = '', intensity = 7, artisticStyle = 'Cinematic' } = {}) {
  const primaryEmotion = emotions[0] || 'Wonder';
  const secondaryEmotions = emotions.slice(1);
  if (secondaryEmotions.length === 0) {
    secondaryEmotions.push('Curiosity', 'Introspection');
  }

  // Check if we have a pre-authored base
  const base = fallbackCatalog[primaryEmotion] || fallbackCatalog.Peace;

  const blueprint = {
    title: base.title,
    emotionalDNA: {
      primaryEmotion,
      secondaryEmotions,
      intensity: Number(intensity) || 7,
      interpretation: description.trim() 
        ? `Reflecting user sentiment: "${description.trim().slice(0, 160)}". A profound synthesis of ${primaryEmotion} with ${artisticStyle.toLowerCase()} sensibility.`
        : base.emotionalDNA.interpretation
    },
    visualDNA: {
      colors: base.visualDNA.colors,
      style: artisticStyle,
      lighting: base.visualDNA.lighting,
      composition: base.visualDNA.composition,
      atmosphere: base.visualDNA.atmosphere
    },
    storyDNA: {
      title: base.storyDNA.title,
      narrative: base.storyDNA.narrative,
      message: base.storyDNA.message
    },
    soundDNA: {
      genre: base.soundDNA.genre,
      mood: base.soundDNA.mood,
      instruments: base.soundDNA.instruments,
      tempo: base.soundDNA.tempo,
      soundEffects: base.soundDNA.soundEffects
    },
    artPrompt: `${base.artPrompt}, rendered in ${artisticStyle} style, 8k resolution, masterpiece.`
  };

  // Attach metadata distinguishing fallback from real Gemini
  return {
    ...blueprint,
    _meta: {
      source: 'fallback',
      isFallback: true,
      timestamp: new Date().toISOString(),
      note: 'Generated using MOODORA Fallback Intelligence Engine (Gemini API unavailable or key unconfigured).'
    }
  };
}
