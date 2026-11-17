import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dna, Eye, Layers } from 'lucide-react';
import { StoryDNA } from '../components/StoryDNA';
import { SoundDNA } from '../components/SoundDNA';
import { useMoodora } from '../context/MoodoraContext';
import { isRealGeminiOutput } from '../services/aiService.js';

export const StorySoundDNAPage: React.FC = () => {
  const navigate = useNavigate();
  const { blueprint } = useMoodora();

  const isGemini = blueprint ? isRealGeminiOutput(blueprint) : false;

  return (
    <div className="min-h-screen bg-[#11101D] text-[#F8F7FF] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-[#5EDCF5]">
      
      {/* Top Header */}
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
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] via-[#FF8066] to-[#5EDCF5] p-[1px]">
              <div className="w-full h-full bg-[#11101D] rounded-[7px] flex items-center justify-center">
                <Dna className="w-3.5 h-3.5 text-[#FF8066]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wide text-white">
                MOODORA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#FF8066]/20 border border-[#FF8066]/40 text-[#FF8066]">
                STORY & SOUND DNA
              </span>
            </div>
          </div>
        </div>

        {/* Dimension Switchers */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/visual-dna"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#5EDCF5] hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visual DNA (Mod 4)</span>
            <span className="sm:hidden">Visual</span>
          </Link>

          <Link
            to="/canvas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Universe Canvas</span>
            <span className="sm:hidden">Canvas</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* Source Badge Bar */}
        {blueprint && (
          <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs font-mono">
            <span className="text-[#A5A1B8]">
              Active Universe: <strong className="text-white">{blueprint.title}</strong>
            </span>

            <div 
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                isGemini 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                  : 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-[#C4B5FD]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isGemini ? 'bg-emerald-400' : 'bg-[#C4B5FD]'} animate-pulse`} />
              <span>{isGemini ? 'Gemini 2.5 Flash' : 'Fallback Engine'}</span>
            </div>
          </div>
        )}

        {/* Section 1: Story DNA */}
        <StoryDNA />

        {/* Section 2: Sound DNA */}
        <SoundDNA />

      </main>

    </div>
  );
};
