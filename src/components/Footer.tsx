import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0d0c17] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#5EDCF5] to-[#FF8066] p-[1px]">
                <div className="w-full h-full bg-[#11101D] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-wider text-white">
                  MOODORA
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#5EDCF5]">
                  AI
                </span>
              </div>
            </Link>

            <p className="font-heading text-sm text-[#C4B5FD] font-medium">
              Feel it. Transform it. Create it.
            </p>

            <p className="text-xs sm:text-sm text-[#A5A1B8] leading-relaxed max-w-sm font-body">
              The premier affective generative engine. Synthesizing human emotional nuance into synchronized Visual, Story, and Sound creative universes.
            </p>

            {/* System Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181628] border border-white/5 text-[11px] font-mono text-[#5EDCF5]">
                <span className="w-2 h-2 rounded-full bg-[#5EDCF5] animate-pulse" />
                <span>Neural Lattice v2.4 Operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#F8F7FF] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A5A1B8]">
              <li>
                <a href="#hero" className="hover:text-[#5EDCF5] transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#5EDCF5] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#5EDCF5] transition-colors">
                  Creative DNA
                </a>
              </li>
              <li>
                <a href="#universe" className="hover:text-[#5EDCF5] transition-colors">
                  Resonance Engine
                </a>
              </li>
              <li>
                <Link to="/studio" className="text-[#C4B5FD] hover:text-[#5EDCF5] transition-colors flex items-center gap-1.5">
                  <span>Studio Workspace</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-[#8B5CF6]/20 text-[#5EDCF5]">Live</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Creative DNA Matrix Column */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#F8F7FF] uppercase tracking-wider mb-4">
              DNA Modalities
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A5A1B8]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                <a href="#features" className="hover:text-[#F8F7FF] transition-colors">Emotion Intelligence</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5EDCF5]" />
                <a href="#features" className="hover:text-[#F8F7FF] transition-colors">Visual DNA</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066]" />
                <a href="#features" className="hover:text-[#F8F7FF] transition-colors">Story DNA</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5FD]" />
                <a href="#features" className="hover:text-[#F8F7FF] transition-colors">Sound DNA</a>
              </li>
              <li>
                <a href="#features" className="text-xs font-mono text-[#5EDCF5]/80 hover:text-[#5EDCF5] transition-colors">
                  Tri-Modal Synchronization →
                </a>
              </li>
            </ul>
          </div>

          {/* Project Modules Column */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#F8F7FF] uppercase tracking-wider mb-4">
              Project Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A5A1B8]">
              <li>
                <Link to="/studio" className="hover:text-[#5EDCF5] transition-colors">
                  Mood Studio (Module 2)
                </Link>
              </li>
              <li>
                <Link to="/visual-dna" className="hover:text-[#5EDCF5] transition-colors">
                  Visual DNA (Module 4)
                </Link>
              </li>
              <li>
                <Link to="/story-sound-dna" className="hover:text-[#5EDCF5] transition-colors">
                  Story & Sound DNA (Module 5)
                </Link>
              </li>
              <li>
                <Link to="/canvas" className="hover:text-[#5EDCF5] transition-colors">
                  Creative Canvas (Module 6)
                </Link>
              </li>
              <li>
                <Link to="/creations" className="hover:text-[#FF8066] transition-colors">
                  My Creations Gallery
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A5A1B8]">
            <span>© 2026 MOODORA AI. Built for the emotional web.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181628] hover:bg-[#1F1B36] border border-white/10 text-xs font-mono text-[#A5A1B8] hover:text-[#F8F7FF] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#5EDCF5]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
