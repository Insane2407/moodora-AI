import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wand2, Compass } from 'lucide-react';
import { AbstractOrb } from './AbstractOrb';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-[#8B5CF6]/20 via-[#5EDCF5]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FF8066]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5EDCF5]/10 blur-[140px] pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Pill / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628]/90 border border-[#8B5CF6]/40 shadow-[0_0_20px_rgba(139,92,246,0.25)] mb-6"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EDCF5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EDCF5]"></span>
              </span>
              <span className="text-xs font-mono font-medium text-[#C4B5FD] tracking-wide">
                MOODORA CORE ARCHITECTURE
              </span>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs font-medium text-[#5EDCF5]">
                v2.4 Multimodal
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#F8F7FF] max-w-3xl"
            >
              Your Emotions.{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C4B5FD] to-[#5EDCF5] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
                Your Creative Universe.
              </span>
            </motion.h1>

            {/* Hero Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-xl sm:text-2xl font-heading font-medium tracking-wide text-[#C4B5FD]"
            >
              Feel it. Transform it. Create it.
            </motion.p>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg text-[#A5A1B8] leading-relaxed max-w-2xl font-body"
            >
              Moodora AI is an affective neural engine that transforms real human sentiment into
              synchronized Visual, Narrative, and Sonic DNA. Step beyond static prompts into living, emotion-driven worlds.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary: Start Creating -> /studio */}
              <Link
                to="/studio"
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading font-semibold text-base text-white overflow-hidden group shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)] transition-all duration-300"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#5EDCF5] transition-all duration-300 group-hover:scale-105" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_70%)]" />
                
                {/* Button Content */}
                <span className="relative flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-[#5EDCF5] group-hover:rotate-12 transition-transform" />
                  <span>Start Creating</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </Link>

              {/* Secondary: How It Works Anchor */}
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-medium text-base text-[#F8F7FF] bg-[#181628]/80 hover:bg-[#1F1B36] border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60 transition-all duration-300 backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-[#C4B5FD]" />
                <span>Explore How It Works</span>
              </a>
            </motion.div>

            {/* Micro Credibility / Stats Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-xl text-left"
            >
              <div>
                <div className="font-heading font-bold text-2xl sm:text-3xl text-white">4D</div>
                <div className="text-xs font-mono text-[#A5A1B8] mt-1">Creative DNA Spectrum</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl sm:text-3xl text-[#5EDCF5]">&lt;15ms</div>
                <div className="text-xs font-mono text-[#A5A1B8] mt-1">Neural Empathy Latency</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl sm:text-3xl text-[#FF8066]">100%</div>
                <div className="text-xs font-mono text-[#A5A1B8] mt-1">Modal Synchronization</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Abstract Glowing Orb Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <AbstractOrb interactive={true} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
