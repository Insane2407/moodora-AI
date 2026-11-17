import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, Eye, BookOpen, Music, 
  Copy, Check, Dna, Bot, FileText, Download, 
  Bookmark, Plus, FolderHeart, Quote, Info
} from 'lucide-react';
import { useMoodora } from '../context/MoodoraContext';
import { isRealGeminiOutput } from '../services/aiService.js';
import { formatBlueprintAsText, downloadBlueprintTxt } from '../utils/exportBlueprint';
import { ColorEntry } from '../types';

export const CanvasPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    emotions, 
    blueprint,
    isGeneratingBlueprint,
    fetchOrCreateBlueprint,
    savedCreations,
    saveCurrentCreation,
    resetMoodState
  } = useMoodora();

  // Action states
  const [copiedEverything, setCopiedEverything] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedStory, setCopiedStory] = useState(false);
  const [copiedSound, setCopiedSound] = useState(false);
  const [copiedHexIndex, setCopiedHexIndex] = useState<number | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Fetch blueprint once if not already present
  useEffect(() => {
    if (!blueprint && !isGeneratingBlueprint) {
      fetchOrCreateBlueprint().catch((err) => {
        console.error('Error fetching blueprint in CanvasPage:', err);
      });
    }
  }, [blueprint, isGeneratingBlueprint, fetchOrCreateBlueprint]);

  // 1. Functional Requirement: Save Creation to LocalStorage
  const handleSaveCreation = () => {
    if (!blueprint) return;
    const res = saveCurrentCreation();
    if (res.success) {
      setSaveSuccessMessage(res.message);
      setTimeout(() => setSaveSuccessMessage(null), 4000);
    }
  };

  // 2. Functional Requirement: Export as TXT
  const handleExportTxt = () => {
    if (!blueprint) return;
    downloadBlueprintTxt(blueprint);
  };

  // 3. Functional Requirement: Copy Everything
  const handleCopyEverything = () => {
    if (!blueprint) return;
    const allText = formatBlueprintAsText(blueprint);
    navigator.clipboard.writeText(allText);
    setCopiedEverything(true);
    setTimeout(() => setCopiedEverything(false), 2500);
  };

  // 4. Functional Requirement: Create Another (back to Mood Studio)
  const handleCreateAnother = () => {
    resetMoodState();
    navigate('/studio');
  };

  // Copy single color hex
  const handleCopyHex = (hex: string, idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHexIndex(idx);
    setTimeout(() => setCopiedHexIndex(null), 2000);
  };

  // Copy Story
  const handleCopyStory = () => {
    if (!blueprint?.storyDNA) return;
    const text = `STORY: ${blueprint.storyDNA.title || blueprint.title}\n\n${blueprint.storyDNA.narrative}\n\nMESSAGE: "${blueprint.storyDNA.message}"`;
    navigator.clipboard.writeText(text);
    setCopiedStory(true);
    setTimeout(() => setCopiedStory(false), 2000);
  };

  // Copy Sound Direction
  const handleCopySound = () => {
    if (!blueprint?.soundDNA) return;
    const s = blueprint.soundDNA;
    const text = `SOUND DIRECTION: ${blueprint.title}\nGenre: ${s.genre}\nMood: ${s.mood}\nTempo: ${s.tempo}\nInstruments: ${s.instruments?.join(', ')}\nEffects: ${s.soundEffects?.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedSound(true);
    setTimeout(() => setCopiedSound(false), 2000);
  };

  // Copy Art Prompt
  const handleCopyPrompt = () => {
    if (!blueprint?.artPrompt) return;
    navigator.clipboard.writeText(blueprint.artPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const isGemini = blueprint ? isRealGeminiOutput(blueprint) : false;

  return (
    <div className="min-h-screen bg-[#11101D] text-[#F8F7FF] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-[#5EDCF5]">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#11101D]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/studio')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Studio</span>
            <span className="sm:hidden">Studio</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] via-[#5EDCF5] to-[#FF8066] p-[1px]">
              <div className="w-full h-full bg-[#11101D] rounded-[7px] flex items-center justify-center">
                <Dna className="w-3.5 h-3.5 text-[#5EDCF5]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wide text-white">
                MOODORA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#5EDCF5]/20 border border-[#5EDCF5]/40 text-[#5EDCF5]">
                CREATIVE CANVAS
              </span>
            </div>
          </div>
        </div>

        {/* Header Right: My Creations Link & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/creations"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-colors"
          >
            <FolderHeart className="w-3.5 h-3.5 text-[#FF8066]" />
            <span className="hidden sm:inline">My Creations</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#8B5CF6]/30 text-white font-bold">
              {savedCreations.length}
            </span>
          </Link>

          {blueprint && (
            <div 
              className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
                isGemini 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                  : 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-[#C4B5FD]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isGemini ? 'bg-emerald-400' : 'bg-[#C4B5FD]'} animate-pulse`} />
              <span>{isGemini ? 'Gemini 2.5 Flash' : 'Fallback Engine'}</span>
            </div>
          )}
        </div>
      </header>

      {/* Floating Success Toast Message */}
      <AnimatePresence>
        {saveSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-xl flex items-center gap-2.5"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMessage}</span>
            <Link to="/creations" className="underline font-bold text-white ml-1">
              View Creations →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Creative Dashboard Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Loading State Skeleton */}
        {isGeneratingBlueprint && (
          <div className="text-center py-24 space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#8B5CF6]/30 border-t-[#5EDCF5] animate-spin" />
              <Bot className="w-8 h-8 text-[#5EDCF5] animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-2xl text-white">
                Synthesizing Creative Universe...
              </h2>
              <p className="text-sm font-mono text-[#A5A1B8]">
                Materializing Emotional, Visual, Narrative, and Sonic DNA into unified reality.
              </p>
            </div>
          </div>
        )}

        {/* Complete Loaded Dashboard */}
        {!isGeneratingBlueprint && blueprint && (
          <div className="space-y-12">
            
            {/* Top Action Toolbar (Functional Requirements: Save, Export TXT, Copy Everything, Create Another, My Creations) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#181628]/95 border border-white/10 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* 1. Save Creation Button */}
                <button
                  type="button"
                  onClick={handleSaveCreation}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] text-white font-heading font-semibold text-xs shadow-md hover:shadow-lg transition-all"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save Creation</span>
                </button>

                {/* 2. Export as TXT Button */}
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-all shadow-sm"
                  title="Download complete blueprint as a TXT file"
                >
                  <Download className="w-4 h-4 text-[#5EDCF5]" />
                  <span>Export as TXT</span>
                </button>

                {/* 3. Copy Everything Button */}
                <button
                  type="button"
                  onClick={handleCopyEverything}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-all shadow-sm"
                  title="Copy formatted plain text blueprint to clipboard"
                >
                  {copiedEverything ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Everything Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C4B5FD]" />
                      <span>Copy Everything</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {/* 4. Create Another Button */}
                <button
                  type="button"
                  onClick={handleCreateAnother}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#A5A1B8] hover:text-white transition-all"
                  title="Reset and start a fresh universe in Mood Studio"
                >
                  <Plus className="w-4 h-4 text-[#5EDCF5]" />
                  <span>Create Another</span>
                </button>

                {/* 5. My Creations Link */}
                <Link
                  to="/creations"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#FF8066] hover:text-white transition-all"
                >
                  <FolderHeart className="w-4 h-4" />
                  <span>My Creations ({savedCreations.length})</span>
                </Link>
              </div>
            </div>

            {/* SECTION 1: Creative Identity Title */}
            <section className="text-center max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-white/10 text-xs font-mono">
                {isGemini ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 font-semibold">GEMINI 2.5 FLASH</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                    <span className="text-[#C4B5FD] font-semibold">VERIFIED FALLBACK INTELLIGENCE</span>
                  </>
                )}
                <span className="text-white/20">•</span>
                <span className="text-[#A5A1B8]">UNIFIED CREATIVE BLUEPRINT</span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-[#F8F7FF] tracking-tight leading-tight">
                {blueprint.title || 'Untitled Universe'}
              </h1>

              <p className="text-sm sm:text-base text-[#C4B5FD] font-body max-w-2xl mx-auto leading-relaxed italic">
                "{blueprint.emotionalDNA?.interpretation || 'A synchronized reflection of human emotion synthesized across four creative vectors.'}"
              </p>
            </section>

            {/* SECTION 2: Emotional DNA */}
            <section className="rounded-3xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                    <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Section 2: Emotional DNA</h3>
                    <span className="text-[11px] font-mono text-[#8B5CF6] uppercase">Affective Psychological Vectors</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#5EDCF5]">
                  Score: {blueprint.emotionalDNA?.intensity || 7} / 10 Intensity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-mono text-[#A5A1B8] uppercase block mb-1">Primary Emotion</span>
                  <div className="font-heading font-bold text-xl text-[#5EDCF5]">
                    {blueprint.emotionalDNA?.primaryEmotion || emotions[0] || 'Wonder'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-mono text-[#A5A1B8] uppercase block mb-1">Secondary Vectors</span>
                  <div className="font-mono text-sm text-[#C4B5FD] truncate">
                    {blueprint.emotionalDNA?.secondaryEmotions?.join(', ') || 'Equanimity, Curiosity'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-mono text-[#A5A1B8] uppercase block mb-1">Affective Valence</span>
                  <div className="font-heading font-bold text-xl text-[#FF8066]">
                    Level {blueprint.emotionalDNA?.intensity || 7} / 10
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Psychological Interpretation:</span>
                <p className="text-xs sm:text-sm text-[#F8F7FF] font-body leading-relaxed">
                  {blueprint.emotionalDNA?.interpretation}
                </p>
              </div>
            </section>

            {/* SECTION 3: Visual DNA with Five Color Swatches */}
            <section className="rounded-3xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#5EDCF5]/15 border border-[#5EDCF5]/40 text-[#5EDCF5]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Section 3: Visual DNA</h3>
                    <span className="text-[11px] font-mono text-[#5EDCF5] uppercase">Five Dynamically Generated Color Swatches</span>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[#C4B5FD] self-start sm:self-auto">
                  Style: {blueprint.visualDNA?.style || 'Cinematic'}
                </span>
              </div>

              {/* Five Color Swatches Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {(blueprint.visualDNA?.colors || []).map((color: ColorEntry, idx: number) => {
                  const isCopied = copiedHexIndex === idx;

                  return (
                    <div 
                      key={idx}
                      onClick={() => handleCopyHex(color.hex, idx)}
                      className="group rounded-2xl bg-black/40 border border-white/5 hover:border-white/25 p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-md"
                    >
                      <div>
                        {/* Swatch preview tile */}
                        <div 
                          className="w-full h-16 rounded-xl mb-3 border border-white/10 shadow-inner flex items-end justify-between p-2"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/50 text-white backdrop-blur-sm">
                            0{idx + 1}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/50 text-white backdrop-blur-sm">
                            {color.hex}
                          </span>
                        </div>

                        {/* Name & Hex */}
                        <h4 className="font-heading font-semibold text-sm text-white group-hover:text-[#5EDCF5] transition-colors truncate">
                          {color.name}
                        </h4>

                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-xs font-mono">
                          <span className="text-[#5EDCF5]">{color.hex}</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyHex(color.hex, idx, e)}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-[#C4B5FD]"
                          >
                            {isCopied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      {/* Meaning */}
                      <p className="mt-3 pt-2 border-t border-white/5 text-[11px] text-[#A5A1B8] font-body line-clamp-3 leading-snug">
                        {color.meaning}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Visual Specifications: Lighting, Composition, Atmosphere */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Lighting Direction</span>
                  <span className="text-white font-medium">{blueprint.visualDNA?.lighting}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Composition & Horizon</span>
                  <span className="text-white font-medium">{blueprint.visualDNA?.composition}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Atmospheric Resonance</span>
                  <span className="text-white font-medium">{blueprint.visualDNA?.atmosphere}</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: Story DNA */}
            <section className="rounded-3xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#FF8066]/15 border border-[#FF8066]/40 text-[#FF8066]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Section 4: Story DNA</h3>
                    <span className="text-[11px] font-mono text-[#FF8066] uppercase">Original Emotional Narrative</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyStory}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#FF8066] transition-colors"
                >
                  {copiedStory ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStory ? 'Story Copied' : 'Copy Story'}</span>
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Title:</span>
                <h4 className="font-heading font-bold text-2xl text-white mb-4">
                  {blueprint.storyDNA?.title || blueprint.title}
                </h4>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-sm sm:text-base text-[#F8F7FF] font-body leading-relaxed sm:leading-loose text-justify italic">
                  "{blueprint.storyDNA?.narrative}"
                </div>
              </div>

              {blueprint.storyDNA?.message && (
                <div className="p-4 rounded-xl bg-[#FF8066]/10 border border-[#FF8066]/20 flex items-start gap-3 text-xs">
                  <Quote className="w-4 h-4 text-[#FF8066] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-bold text-[#FF8066] uppercase block mb-0.5">Central Message</span>
                    <span className="text-white font-medium italic">"{blueprint.storyDNA.message}"</span>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 5: Sound DNA */}
            <section className="rounded-3xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                    <Music className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Section 5: Sound DNA</h3>
                    <span className="text-[11px] font-mono text-[#C4B5FD] uppercase">Acoustic & Compositional Direction</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopySound}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#C4B5FD] transition-colors"
                >
                  {copiedSound ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSound ? 'Direction Copied' : 'Copy Sound'}</span>
                </button>
              </div>

              {/* No fake audio notice */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-[#A5A1B8]">
                <Info className="w-4 h-4 text-[#5EDCF5] shrink-0" />
                <span>Compositional guidelines for acoustic arrangement & scoring. (No audio playback simulated).</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Recommended Genre</span>
                  <span className="font-heading font-bold text-base text-white">{blueprint.soundDNA?.genre}</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Acoustic Mood</span>
                  <span className="font-heading font-bold text-base text-[#5EDCF5]">{blueprint.soundDNA?.mood}</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[#A5A1B8] block text-[10px] uppercase mb-1">Tempo Cadence</span>
                  <span className="font-heading font-bold text-base text-[#FF8066]">{blueprint.soundDNA?.tempo}</span>
                </div>
              </div>

              {/* Instruments & Sound Effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                  <span className="text-xs font-mono text-[#A5A1B8] block mb-2">Instrumentation Matrix:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {blueprint.soundDNA?.instruments?.map((inst: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                  <span className="text-xs font-mono text-[#A5A1B8] block mb-2">Suggested Sound Effects & Ambience:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {blueprint.soundDNA?.soundEffects?.map((sfx: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD]">
                        {sfx}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: Complete Image-Generation Prompt */}
            <section className="rounded-3xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#5EDCF5]/15 border border-[#5EDCF5]/40 text-[#5EDCF5]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Section 6: Image-Generation Prompt</h3>
                    <span className="text-[11px] font-mono text-[#5EDCF5] uppercase">Engineered for Midjourney / DALL-E / Imagen</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5EDCF5]/15 hover:bg-[#5EDCF5]/25 border border-[#5EDCF5]/40 text-xs font-mono text-[#5EDCF5] transition-colors"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Prompt Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs sm:text-sm text-[#F8F7FF] leading-relaxed select-all shadow-inner">
                {blueprint.artPrompt}
              </div>
            </section>

            {/* Bottom Actions Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveCreation}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] text-white font-heading font-semibold text-xs shadow-md hover:shadow-lg transition-all"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save Creation</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#C4B5FD] transition-all"
                >
                  <Download className="w-4 h-4 text-[#5EDCF5]" />
                  <span>Export as TXT</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCreateAnother}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#A5A1B8] hover:text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Another</span>
                </button>

                <Link
                  to="/creations"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 text-xs font-mono text-[#C4B5FD] transition-all"
                >
                  <FolderHeart className="w-4 h-4 text-[#FF8066]" />
                  <span>My Creations ({savedCreations.length})</span>
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
