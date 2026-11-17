export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  tag: string;
  metric: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  accentColor: string;
  accentGlow: string;
  iconName: string;
  capabilities: string[];
}

export type MoodType = 'serenity' | 'euphoria' | 'passion' | 'wonder' | 'melancholy';

export interface MoodProfile {
  id: MoodType;
  label: string;
  color: string;
  glowColor: string;
  frequency: string;
  description: string;
  visualSummary: string;
  storySummary: string;
  soundSummary: string;
}

// Module 2 Types
export type EmotionChip = 
  | 'Happiness' 
  | 'Sadness' 
  | 'Nostalgia' 
  | 'Peace' 
  | 'Anger' 
  | 'Hope' 
  | 'Loneliness' 
  | 'Excitement';

export type ArtisticStyle = 
  | 'Cinematic' 
  | 'Dreamy' 
  | 'Minimalist' 
  | 'Surreal' 
  | 'Abstract';

export interface MoodoraState {
  emotions: EmotionChip[];
  description: string;
  intensity: number;
  artisticStyle: ArtisticStyle;
}

// Module 3, 4 & 5 AI Blueprint Types
export interface ColorEntry {
  name: string;
  hex: string;
  meaning: string;
}

export interface VisualDNA {
  colors: ColorEntry[];
  style: string;
  lighting: string;
  composition: string;
  atmosphere: string;
}

export interface EmotionalDNA {
  primaryEmotion: string;
  secondaryEmotions: string[];
  intensity: number;
  interpretation: string;
}

export interface StoryDNA {
  title: string;
  narrative: string;
  message: string;
}

export interface SoundDNA {
  genre: string;
  mood: string;
  instruments: string[];
  tempo: string;
  soundEffects: string[];
}

export interface BlueprintData {
  title: string;
  emotionalDNA: EmotionalDNA;
  visualDNA: VisualDNA;
  storyDNA: StoryDNA;
  soundDNA: SoundDNA;
  artPrompt: string;
  _meta?: {
    source: 'gemini' | 'fallback';
    isFallback: boolean;
    model?: string;
    timestamp?: string;
    note?: string;
  };
}

// Module 6: Saved Creation in LocalStorage
export interface SavedCreation {
  id: string;
  createdAt: string;
  title: string;
  blueprint: BlueprintData;
  userInputs: {
    emotions: EmotionChip[];
    description: string;
    intensity: number;
    artisticStyle: ArtisticStyle;
  };
}

export interface MoodoraContextType extends MoodoraState {
  setEmotions: React.Dispatch<React.SetStateAction<EmotionChip[]>>;
  toggleEmotion: (emotion: EmotionChip) => void;
  setDescription: (desc: string) => void;
  setIntensity: (val: number) => void;
  setArtisticStyle: (style: ArtisticStyle) => void;
  resetMoodState: () => void;
  isFormValid: boolean;
  // Shared AI Blueprint State
  blueprint: BlueprintData | null;
  setBlueprint: React.Dispatch<React.SetStateAction<BlueprintData | null>>;
  isGeneratingBlueprint: boolean;
  fetchOrCreateBlueprint: (forceRefresh?: boolean) => Promise<BlueprintData>;
  // Module 6: Creation Persistence
  savedCreations: SavedCreation[];
  saveCurrentCreation: () => { success: boolean; message: string; id?: string };
  deleteSavedCreation: (id: string) => void;
  loadSavedCreation: (id: string) => boolean;
}
