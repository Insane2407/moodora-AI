import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, FolderHeart, Trash2, ExternalLink, 
  Download, Plus, Calendar, Compass
} from 'lucide-react';
import { useMoodora } from '../context/MoodoraContext';
import { downloadBlueprintTxt } from '../utils/exportBlueprint';

export const MyCreationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedCreations, deleteSavedCreation, loadSavedCreation, resetMoodState } = useMoodora();

  const handleOpenCreation = (id: string) => {
    const success = loadSavedCreation(id);
    if (success) {
      navigate('/canvas');
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSavedCreation(id);
  };

  const handleCreateNew = () => {
    resetMoodState();
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-[#11101D] text-[#F8F7FF] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-[#5EDCF5]">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#11101D]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/canvas')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#C4B5FD] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Canvas</span>
            <span className="sm:hidden">Canvas</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] via-[#FF8066] to-[#5EDCF5] p-[1px]">
              <div className="w-full h-full bg-[#11101D] rounded-[7px] flex items-center justify-center">
                <FolderHeart className="w-3.5 h-3.5 text-[#FF8066]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wide text-white">
                MOODORA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#5EDCF5]">
                MY CREATIONS
              </span>
            </div>
          </div>
        </div>

        {/* Action button: Create Another */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] text-xs font-mono font-semibold text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create Another</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-[#8B5CF6]/30 text-xs font-mono font-medium text-[#C4B5FD] tracking-wider mb-4">
            <FolderHeart className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>MODULE 6 • CREATION ARCHIVE</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#F8F7FF] tracking-tight">
            My Saved{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C4B5FD] to-[#5EDCF5] bg-clip-text text-transparent">
              Universes
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#A5A1B8] font-body">
            All blueprints saved to your browser LocalStorage are safely preserved across sessions. Open any creation to inspect or export its DNA.
          </p>
        </div>

        {/* Empty State */}
        {savedCreations.length === 0 && (
          <div className="rounded-3xl bg-[#181628]/60 border border-white/10 p-12 sm:p-20 text-center max-w-xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto mb-5 text-[#C4B5FD]">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              No Saved Universes Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A1B8] mb-6 leading-relaxed">
              You haven't saved any creations to your local archive. Step into Mood Studio, express what your soul feels like, and generate your first universe.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] text-white font-heading font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Mood Studio</span>
            </button>
          </div>
        )}

        {/* Saved Creations Grid */}
        {savedCreations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {savedCreations.map((item, index) => {
                const colors = item.blueprint?.visualDNA?.colors || [];
                const primaryEmotion = item.blueprint?.emotionalDNA?.primaryEmotion || item.userInputs?.emotions?.[0] || 'Aligned';
                const intensity = item.blueprint?.emotionalDNA?.intensity || item.userInputs?.intensity || 7;
                const dateFormatted = new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleOpenCreation(item.id)}
                    className="group relative rounded-3xl bg-[#181628]/90 border border-white/10 hover:border-white/25 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div>
                      {/* Top Bar: Date & Delete */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#A5A1B8] mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#5EDCF5]" />
                          <span>{dateFormatted}</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 rounded-lg text-[#A5A1B8] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete this saved creation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#5EDCF5] transition-colors line-clamp-1 mb-2">
                        {item.title}
                      </h3>

                      {/* Emotion & Intensity Pills */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                          {primaryEmotion}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-white/80">
                          Intensity {intensity}/10
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#FF8066]/15 border border-[#FF8066]/30 text-[#FF8066]">
                          {item.userInputs?.artisticStyle || item.blueprint?.visualDNA?.style || 'Cinematic'}
                        </span>
                      </div>

                      {/* 5-Color Palette Strip */}
                      <div className="mb-5">
                        <span className="text-[10px] font-mono text-[#A5A1B8] block mb-1.5 uppercase">
                          Visual DNA Palette
                        </span>
                        <div className="grid grid-cols-5 gap-1.5 h-7 rounded-lg overflow-hidden p-0.5 bg-black/40 border border-white/5">
                          {colors.map((c, i) => (
                            <div
                              key={i}
                              className="h-full rounded-md shadow-sm"
                              style={{ backgroundColor: c.hex }}
                              title={`${c.name} (${c.hex})`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Narrative Preview */}
                      <p className="text-xs text-[#A5A1B8] font-body line-clamp-2 leading-relaxed mb-6 italic">
                        "{item.blueprint?.storyDNA?.narrative || 'A harmonious synthesis of human emotion and cosmic reality.'}"
                      </p>
                    </div>

                    {/* Bottom Card Actions */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadBlueprintTxt(item.blueprint);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C4B5FD] transition-colors"
                        title="Download as TXT"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>TXT</span>
                      </button>

                      <div className="flex items-center gap-1 text-[#5EDCF5] font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Open Canvas</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </main>

    </div>
  );
};
