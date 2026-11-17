import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, Sliders, Wand2, 
  Sun, CloudRain, Clock, Wind, Flame, Heart, Moon, Zap,
  Film, Cloud, Minimize2, Eye, Palette, AlertCircle, CheckCircle2, RotateCcw
} from 'lucide-react';
import { useMoodora } from '../context/MoodoraContext';
import { EmotionChip, ArtisticStyle } from '../types';

interface EmotionMeta {
  chip: EmotionChip;
  icon: React.ElementType;
  color: string;
  glow: string;
  desc: string;
}

const emotionCatalog: EmotionMeta[] = [
  { chip: 'Happiness', icon: Sun, color: '#5EDCF5', glow: 'rgba(94, 220, 245, 0.45)', desc: 'Luminous joy and buoyant light' },
  { chip: 'Sadness', icon: CloudRain, color: '#818CF8', glow: 'rgba(129, 140, 248, 0.45)', desc: 'Gentle melancholy & deep quiet' },
  { chip: 'Nostalgia', icon: Clock, color: '#C4B5FD', glow: 'rgba(196, 181, 253, 0.45)', desc: 'Warm echoes of distant memories' },
  { chip: 'Peace', icon: Wind, color: '#34D399', glow: 'rgba(52, 211, 153, 0.45)', desc: 'Stillness like a tranquil lake' },
  { chip: 'Anger', icon: Flame, color: '#FF8066', glow: 'rgba(255, 128, 102, 0.45)', desc: 'Fierce heat and raw creative power' },
  { chip: 'Hope', icon: Heart, color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.45)', desc: 'A dawn breaking through shadows' },
  { chip: 'Loneliness', icon: Moon, color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.45)', desc: 'Solitary expanse under silent stars' },
  { chip: 'Excitement', icon: Zap, color: '#F472B6', glow: 'rgba(244, 114, 182, 0.45)', desc: 'Electric kinetic anticipation' },
];

interface StyleMeta {
  style: ArtisticStyle;
  icon: React.ElementType;
  tagline: string;
  detail: string;
}

const styleCatalog: StyleMeta[] = [
  { style: 'Cinematic', icon: Film, tagline: 'Anamorphic & Dramatic', detail: '35mm grain, deep shadows, cinematic scale' },
  { style: 'Dreamy', icon: Cloud, tagline: 'Ethereal & Luminescent', detail: 'Soft pastel haze, diffused glow, floating realm' },
  { style: 'Minimalist', icon: Minimize2, tagline: 'Zen & Uncluttered', detail: 'Vast negative space, pure geometric poise' },
  { style: 'Surreal', icon: Eye, tagline: 'Dream Logic & Paradox', detail: 'Non-Euclidean architectures and impossible physics' },
  { style: 'Abstract', icon: Palette, tagline: 'Pure Chromatic Energy', detail: 'Fluid gradients, wave textures, raw emotional vector' },
];

export const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    emotions, 
    toggleEmotion, 
    description, 
    setDescription, 
    intensity, 
    setIntensity, 
    artisticStyle, 
    setArtisticStyle,
    isFormValid,
    resetMoodState,
    fetchOrCreateBlueprint
  } = useMoodora();

  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle Generate My Universe click
  const handleGenerate = () => {
    if (!isFormValid) {
      setValidationError('Please select at least one emotion or describe your emotional state.');
      return;
    }
    setValidationError(null);
    // Trigger blueprint generation for these inputs into shared MoodoraContext
    fetchOrCreateBlueprint(true).catch((err) => {
      console.warn('Blueprint background generation note:', err);
    });
    // Navigate to /canvas while preserving all state in MoodoraContext
    navigate('/canvas');
  };

  // Helper intensity label
  const getIntensityLabel = (val: number) => {
    if (val <= 3) return { label: 'Subtle & Gentle', tag: 'Valence Whispers' };
    if (val <= 6) return { label: 'Moderate & Centered', tag: 'Balanced Harmonic' };
    if (val <= 8) return { label: 'Deeply Expressive', tag: 'Resonant Wave' };
    return { label: 'Hyper-Resonant & Piercing', tag: 'Maximum Valence' };
  };

  const intensityInfo = getIntensityLabel(intensity);

  // Quick suggestion prompts
  const suggestions = [
    'A quiet longing for an ancient home I have never visited',
    'Golden afternoon sunlight cutting through quiet pine trees',
    'A stormy rush of sudden inspiration breaking through fatigue',
    'Standing on the shore watching silent ripples disappear into dusk',
  ];

  return (
    <div className="min-h-screen bg-[#11101D] text-[#F8F7FF] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-[#5EDCF5]">
      
      {/* Studio Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#11101D]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Universe</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] via-[#5EDCF5] to-[#FF8066] p-[1px]">
              <div className="w-full h-full bg-[#11101D] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#5EDCF5]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wide text-white">
                MOODORA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#5EDCF5]">
                STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* Live Vector Indicator & Reset */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#181628] border border-white/5 text-xs font-mono text-[#A5A1B8]">
            <span className="w-2 h-2 rounded-full bg-[#5EDCF5] animate-pulse" />
            <span>{emotions.length} {emotions.length === 1 ? 'Emotion' : 'Emotions'}</span>
            <span className="text-white/20">•</span>
            <span>Intensity {intensity}/10</span>
            <span className="text-white/20">•</span>
            <span className="text-[#C4B5FD]">{artisticStyle}</span>
          </div>

          <button
            onClick={resetMoodState}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono text-[#A5A1B8] hover:text-white transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Studio Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-[#8B5CF6]/30 text-xs font-mono font-medium text-[#C4B5FD] tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>MODULE 2 • MOOD STUDIO</span>
          </motion.div>

          {/* Required Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8F7FF] tracking-tight leading-tight"
          >
            What does your soul feel like{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C4B5FD] to-[#5EDCF5] bg-clip-text text-transparent">
              today?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[#A5A1B8] font-body"
          >
            Express your inner atmosphere. Combine natural sentiment with multi-dimensional emotion vectors to anchor your universe.
          </motion.p>
        </div>

        {/* Studio Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Feature 2: Natural Language Emotion Textarea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl bg-[#181628]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <label 
                  htmlFor="emotion-description" 
                  className="font-heading font-semibold text-base sm:text-lg text-white flex items-center gap-2"
                >
                  <span>Describe Your Emotions</span>
                  <span className="text-xs font-mono text-[#5EDCF5] px-2 py-0.5 rounded-full bg-[#5EDCF5]/10 border border-[#5EDCF5]/30">
                    Natural Language
                  </span>
                </label>
                <span className="text-xs font-mono text-[#A5A1B8]">
                  {description.length} chars
                </span>
              </div>

              <textarea
                id="emotion-description"
                rows={5}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="What feelings, thoughts, or mental landscapes are moving through you right now? E.g., 'A quiet warmth spreading after rain, with echoes of distant laughter and an expanse of open sky...'"
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#F8F7FF] placeholder-[#A5A1B8]/50 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all resize-none font-body leading-relaxed"
              />

              {/* Quick Inspiration Sparks */}
              <div className="mt-4">
                <div className="text-[11px] font-mono text-[#A5A1B8] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C4B5FD]" />
                  <span>Prompt Sparks (Click to load):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((snippet, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDescription(snippet);
                        if (validationError) setValidationError(null);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/5 hover:border-[#8B5CF6]/40 text-xs text-[#C4B5FD] transition-all text-left"
                    >
                      "{snippet.slice(0, 36)}..."
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature 3 & 4: Emotion Selection Chips (Multiple Selection) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-[#181628]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-white flex items-center gap-2">
                  <span>Emotion Selection Chips</span>
                  <span className="text-xs font-mono text-[#C4B5FD] px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30">
                    Select Multiple
                  </span>
                </h3>
                <span className="text-xs font-mono text-[#5EDCF5]">
                  {emotions.length} selected
                </span>
              </div>
              
              <p className="text-xs text-[#A5A1B8] mb-5">
                Select one or several emotional resonance archetypes that reflect your state.
              </p>

              {/* 8 Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {emotionCatalog.map((item) => {
                  const Icon = item.icon;
                  const isSelected = emotions.includes(item.chip);

                  return (
                    <motion.button
                      key={item.chip}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        toggleEmotion(item.chip);
                        if (validationError) setValidationError(null);
                      }}
                      className={`relative p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 text-center ${
                        isSelected
                          ? 'border-opacity-100 shadow-md text-white'
                          : 'bg-black/25 border-white/5 text-[#A5A1B8] hover:border-white/20 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${item.color}25` : undefined,
                        borderColor: isSelected ? item.color : undefined,
                        boxShadow: isSelected ? `0 0 16px ${item.glow}` : undefined,
                      }}
                    >
                      <div 
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-white/15' : 'bg-white/5'
                        }`}
                      >
                        <Icon 
                          className="w-4 h-4" 
                          style={{ color: isSelected ? item.color : undefined }} 
                        />
                      </div>
                      
                      <span className="text-xs font-heading font-semibold">
                        {item.chip}
                      </span>

                      {/* Active indicator dot */}
                      {isSelected && (
                        <span 
                          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active emotion summary pills */}
              {emotions.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#A5A1B8] mr-1">Active Vector:</span>
                  {emotions.map((e) => (
                    <span 
                      key={e} 
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] flex items-center gap-1"
                    >
                      <span>{e}</span>
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          toggleEmotion(e);
                        }}
                        className="text-white/40 hover:text-white ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Feature 5: Emotion Intensity Slider (1 to 10) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl bg-[#181628]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#8B5CF6]" />
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-white">
                    Emotion Intensity
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-[#8B5CF6]/40 shadow-inner">
                  <span className="text-xs font-mono text-[#A5A1B8]">Scale:</span>
                  <span className="font-heading font-bold text-lg text-[#5EDCF5]">
                    {intensity}
                  </span>
                  <span className="text-xs font-mono text-white/40">/ 10</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Range Input 1 to 10 */}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6] focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #8B5CF6 0%, #5EDCF5 ${intensity * 10}%, #11101D ${intensity * 10}%, #11101D 100%)`
                  }}
                />

                {/* 1 to 10 Tick Indicators */}
                <div className="flex justify-between px-1 text-[11px] font-mono text-[#A5A1B8]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setIntensity(num)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                        intensity === num
                          ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_8px_#8B5CF6]'
                          : 'hover:bg-white/5 text-[#A5A1B8]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Intensity Descriptors */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C4B5FD] font-medium">
                    Current Mode: {intensityInfo.label}
                  </span>
                  <span className="text-[#5EDCF5]">
                    {intensityInfo.tag}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Feature 6: Artistic Style Selector (Cinematic, Dreamy, Minimalist, Surreal, Abstract) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl bg-[#181628]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#FF8066]" />
                  <span>Artistic Style Selector</span>
                </h3>
                <span className="text-xs font-mono text-[#FF8066]">
                  {artisticStyle}
                </span>
              </div>

              <p className="text-xs text-[#A5A1B8] mb-5">
                Select the aesthetic dimension that defines how your emotional state is visualized.
              </p>

              {/* 5 Artistic Styles List / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {styleCatalog.map((item) => {
                  const Icon = item.icon;
                  const isSelected = artisticStyle === item.style;

                  return (
                    <button
                      key={item.style}
                      type="button"
                      onClick={() => setArtisticStyle(item.style)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.4)] text-white'
                          : 'bg-black/25 border-white/5 text-[#A5A1B8] hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#5EDCF5]' : 'text-[#A5A1B8]'}`} />
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5EDCF5] shadow-[0_0_6px_#5EDCF5]" />
                        )}
                      </div>

                      <div>
                        <div className="font-heading font-semibold text-xs sm:text-sm text-white mb-0.5">
                          {item.style}
                        </div>
                        <div className="text-[10px] font-mono text-[#A5A1B8] leading-snug line-clamp-2">
                          {item.tagline}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Validation Message Banner */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{validationError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feature 7: Generate My Universe Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="pt-2"
            >
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full relative group overflow-hidden py-4 px-8 rounded-2xl font-heading font-semibold text-base sm:text-lg text-white shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:shadow-[0_0_55px_rgba(139,92,246,0.8)] transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
              >
                {/* Radiant animated background */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#5EDCF5] transition-all duration-300 group-hover:scale-105" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)]" />

                <span className="relative z-10 flex items-center gap-2.5">
                  <Wand2 className="w-5 h-5 text-[#5EDCF5] group-hover:rotate-12 transition-transform" />
                  <span>Generate My Universe</span>
                  <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
                </span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-[#A5A1B8]">
                <CheckCircle2 className={`w-3.5 h-3.5 ${isFormValid ? 'text-emerald-400' : 'text-[#A5A1B8]'}`} />
                <span>
                  {isFormValid 
                    ? 'State validated & ready to materialize in Canvas'
                    : 'Enter description or pick an emotion chip to proceed'}
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Live Affective Vector Visualizer & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Reactive Orb Card */}
            <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl overflow-hidden relative">
              
              {/* Dynamic Aura background based on intensity & selected style */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[70px] pointer-events-none transition-colors duration-500"
                style={{
                  backgroundColor: emotions.length > 0 ? '#8B5CF6' : '#5EDCF5',
                  opacity: (intensity / 10) * 0.4
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5EDCF5] animate-ping" />
                    <span className="text-xs font-mono font-semibold text-[#5EDCF5] uppercase">
                      Affective Resonance Field
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#A5A1B8]">
                    Live Telemetry
                  </span>
                </div>

                {/* Central Dynamic Visual */}
                <div className="my-6 py-6 flex flex-col items-center justify-center text-center">
                  <motion.div
                    className="relative w-36 h-36 rounded-full border border-white/20 flex flex-col items-center justify-center shadow-2xl"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, #C4B5FD 0%, #8B5CF6 45%, #11101D 95%)',
                      boxShadow: `0 0 ${intensity * 4}px rgba(139, 92, 246, 0.6)`
                    }}
                    animate={{
                      scale: [1, 1 + (intensity * 0.015), 1],
                      rotate: 360
                    }}
                    transition={{
                      scale: { duration: 3 - (intensity * 0.15), repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 30 - (intensity * 1.5), repeat: Infinity, ease: 'linear' }
                    }}
                  >
                    <Sparkles className="w-7 h-7 text-white drop-shadow" />
                    <span className="text-[11px] font-mono text-white font-bold mt-1">
                      {artisticStyle}
                    </span>
                  </motion.div>

                  <div className="mt-4 font-heading font-semibold text-lg text-white">
                    {emotions.length > 0 ? emotions.join(' • ') : 'Neutral Harmony'}
                  </div>
                  <p className="text-xs font-mono text-[#A5A1B8] mt-1">
                    Intensity Level {intensity} • {intensityInfo.label}
                  </p>
                </div>

                {/* Preserved Parameters Inspector */}
                <div className="space-y-3 pt-5 border-t border-white/10 text-xs font-mono">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#A5A1B8]">Selected Modalities</span>
                    <span className="text-white font-semibold">
                      {emotions.length > 0 ? `${emotions.length} active` : 'None selected'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#A5A1B8]">Artistic Style</span>
                    <span className="text-[#5EDCF5] font-semibold">{artisticStyle}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#A5A1B8]">Natural Description</span>
                    <span className="text-[#C4B5FD] font-semibold truncate max-w-[170px]">
                      {description.trim().length > 0 ? description : '(Pending input)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#A5A1B8]">State Persistence</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      MoodoraContext
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro Helpful Hint Card */}
            <div className="rounded-xl bg-[#181628]/60 border border-white/5 p-4 text-xs text-[#A5A1B8] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#C4B5FD] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Clicking <strong className="text-white">"Generate My Universe"</strong> will preserve your full emotional state in <code className="text-[#5EDCF5]">MoodoraContext</code> and transition to the creative canvas interface.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
