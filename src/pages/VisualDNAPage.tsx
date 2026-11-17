import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dna, Layers } from 'lucide-react';
import { VisualDNA } from '../components/VisualDNA';

export const VisualDNAPage: React.FC = () => {
  const navigate = useNavigate();

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
                VISUAL DNA
              </span>
            </div>
          </div>
        </div>

        {/* Quick Nav to other dimensions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/canvas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#A5A1B8] hover:text-white transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden sm:inline">Full Universe Canvas</span>
            <span className="sm:hidden">Canvas</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <VisualDNA />
      </main>

    </div>
  );
};
