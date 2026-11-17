import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EmotionChip, ArtisticStyle, MoodoraContextType, BlueprintData, SavedCreation } from '../types';
import { generateBlueprint } from '../services/aiService.js';

const MoodoraContext = createContext<MoodoraContextType | undefined>(undefined);

const STORAGE_KEY = 'moodora_module2_state';
const BLUEPRINT_STORAGE_KEY = 'moodora_active_blueprint';
const SAVED_CREATIONS_KEY = 'moodora_saved_creations';

export const MoodoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage if available, or default
  const [emotions, setEmotions] = useState<EmotionChip[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.emotions)) return parsed.emotions;
      }
    } catch {
      // Ignore JSON parse errors
    }
    return ['Peace'];
  });

  const [description, setDescription] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.description === 'string') return parsed.description;
      }
    } catch {
      // Ignore
    }
    return '';
  });

  const [intensity, setIntensity] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.intensity === 'number' && parsed.intensity >= 1 && parsed.intensity <= 10) {
          return parsed.intensity;
        }
      }
    } catch {
      // Ignore
    }
    return 7;
  });

  const [artisticStyle, setArtisticStyle] = useState<ArtisticStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (['Cinematic', 'Dreamy', 'Minimalist', 'Surreal', 'Abstract'].includes(parsed.artisticStyle)) {
          return parsed.artisticStyle;
        }
      }
    } catch {
      // Ignore
    }
    return 'Cinematic';
  });

  // Shared AI Blueprint State
  const [blueprint, setBlueprint] = useState<BlueprintData | null>(() => {
    try {
      const saved = localStorage.getItem(BLUEPRINT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState<boolean>(false);

  // Module 6: Saved Creations Gallery (persisted in LocalStorage)
  const [savedCreations, setSavedCreations] = useState<SavedCreation[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_CREATIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore
    }
    return [];
  });

  // Keep localStorage synchronized so data is fully preserved
  useEffect(() => {
    try {
      const state = {
        emotions,
        description,
        intensity,
        artisticStyle,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [emotions, description, intensity, artisticStyle]);

  // Keep blueprint synced to localStorage
  useEffect(() => {
    try {
      if (blueprint) {
        localStorage.setItem(BLUEPRINT_STORAGE_KEY, JSON.stringify(blueprint));
      } else {
        localStorage.removeItem(BLUEPRINT_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [blueprint]);

  // Keep saved creations synced to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_CREATIONS_KEY, JSON.stringify(savedCreations));
    } catch {
      // Ignore
    }
  }, [savedCreations]);

  // Fetch or retrieve existing blueprint
  const fetchOrCreateBlueprint = useCallback(async (forceRefresh = false): Promise<BlueprintData> => {
    // If we already have a blueprint in shared state and are not forcing a refresh, return it directly!
    // This satisfies "Do not make another Gemini API call. Use the existing generated blueprint."
    if (blueprint && !forceRefresh) {
      return blueprint;
    }

    setIsGeneratingBlueprint(true);
    try {
      const result = await generateBlueprint({
        emotions,
        description,
        intensity,
        artisticStyle,
      });

      const blueprintData = result as unknown as BlueprintData;
      setBlueprint(blueprintData);
      return blueprintData;
    } catch (err) {
      console.error('[MoodoraContext] Error generating blueprint:', err);
      throw err;
    } finally {
      setIsGeneratingBlueprint(false);
    }
  }, [blueprint, emotions, description, intensity, artisticStyle]);

  // Save current creation to LocalStorage
  const saveCurrentCreation = useCallback((): { success: boolean; message: string; id?: string } => {
    if (!blueprint) {
      return { success: false, message: 'Cannot save: No blueprint has been generated yet.' };
    }

    const newCreation: SavedCreation = {
      id: `creation_${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: blueprint.title || 'Untitled Universe',
      blueprint,
      userInputs: {
        emotions,
        description,
        intensity,
        artisticStyle,
      }
    };

    setSavedCreations((prev) => {
      // Check if already saved (avoid exact duplicates created within 2 seconds)
      const existing = prev.find(
        (c) => c.title === newCreation.title && 
        c.blueprint.storyDNA.title === newCreation.blueprint.storyDNA.title &&
        (Date.now() - new Date(c.createdAt).getTime()) < 3000
      );
      if (existing) {
        return prev;
      }
      return [newCreation, ...prev];
    });

    return {
      success: true,
      message: `"${newCreation.title}" saved to your local creations library!`,
      id: newCreation.id
    };
  }, [blueprint, emotions, description, intensity, artisticStyle]);

  // Delete saved creation
  const deleteSavedCreation = useCallback((id: string) => {
    setSavedCreations((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Load a saved creation into active workspace
  const loadSavedCreation = useCallback((id: string): boolean => {
    const found = savedCreations.find((item) => item.id === id);
    if (!found) return false;

    // Restore blueprint and input states
    setBlueprint(found.blueprint);
    if (found.userInputs) {
      if (Array.isArray(found.userInputs.emotions)) setEmotions(found.userInputs.emotions);
      if (typeof found.userInputs.description === 'string') setDescription(found.userInputs.description);
      if (typeof found.userInputs.intensity === 'number') setIntensity(found.userInputs.intensity);
      if (found.userInputs.artisticStyle) setArtisticStyle(found.userInputs.artisticStyle);
    }
    return true;
  }, [savedCreations]);

  // Toggle multiple emotions
  const toggleEmotion = (emotion: EmotionChip) => {
    setEmotions((prev) => {
      if (prev.includes(emotion)) {
        return prev.filter((e) => e !== emotion);
      } else {
        return [...prev, emotion];
      }
    });
  };

  const resetMoodState = () => {
    setEmotions(['Peace']);
    setDescription('');
    setIntensity(7);
    setArtisticStyle('Cinematic');
    setBlueprint(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(BLUEPRINT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Validation: user has entered an emotion description OR selected at least one emotion
  const isFormValid = description.trim().length > 0 || emotions.length > 0;

  return (
    <MoodoraContext.Provider
      value={{
        emotions,
        setEmotions,
        toggleEmotion,
        description,
        setDescription,
        intensity,
        setIntensity,
        artisticStyle,
        setArtisticStyle,
        resetMoodState,
        isFormValid,
        blueprint,
        setBlueprint,
        isGeneratingBlueprint,
        fetchOrCreateBlueprint,
        savedCreations,
        saveCurrentCreation,
        deleteSavedCreation,
        loadSavedCreation,
      }}
    >
      {children}
    </MoodoraContext.Provider>
  );
};

export const useMoodora = (): MoodoraContextType => {
  const context = useContext(MoodoraContext);
  if (!context) {
    throw new Error('useMoodora must be used within a MoodoraProvider');
  }
  return context;
};
