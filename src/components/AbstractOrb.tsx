import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Eye, BookOpen, Music } from 'lucide-react';

interface AbstractOrbProps {
  interactive?: boolean;
}

export const AbstractOrb: React.FC<AbstractOrbProps> = ({ interactive = true }) => {
  const [activeMood, setActiveMood] = useState<'violet' | 'cyan' | 'coral' | 'lavender'>('violet');

  const moodColors = {
    violet: {
      primary: '#8B5CF6',
      secondary: '#C4B5FD',
      glow: 'rgba(139, 92, 246, 0.55)',
      ambient: 'rgba(139, 92, 246, 0.2)',
      name: 'Transcendence',
      freq: '432 Hz'
    },
    cyan: {
      primary: '#5EDCF5',
      secondary: '#8B5CF6',
      glow: 'rgba(94, 220, 245, 0.55)',
      ambient: 'rgba(94, 220, 245, 0.2)',
      name: 'Lucid Euphoria',
      freq: '528 Hz'
    },
    coral: {
      primary: '#FF8066',
      secondary: '#C4B5FD',
      glow: 'rgba(255, 128, 102, 0.55)',
      ambient: 'rgba(255, 128, 102, 0.2)',
      name: 'Vibrant Passion',
      freq: '639 Hz'
    },
    lavender: {
      primary: '#C4B5FD',
      secondary: '#5EDCF5',
      glow: 'rgba(196, 181, 253, 0.55)',
      ambient: 'rgba(196, 181, 253, 0.2)',
      name: 'Serene Wonder',
      freq: '741 Hz'
    }
  };

  const currentTheme = moodColors[activeMood];

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background radial ambient halo */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[80px] pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentTheme.glow} 0%, ${currentTheme.ambient} 45%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.08, 0.98, 1],
          opacity: [0.75, 0.95, 0.75]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Outer concentric orbital dashed rings */}
      <motion.div 
        className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-[#8B5CF6]/20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#5EDCF5]/25 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[68%] h-[68%] rounded-full border border-[#FF8066]/20 pointer-events-none"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inclined Planetary Orbital Ring 1 */}
      <div 
        className="absolute w-[105%] h-[45%] rounded-full border border-[#8B5CF6]/30 pointer-events-none"
        style={{ transform: 'rotate(-28deg)' }}
      >
        <motion.div 
          className="absolute -top-1.5 left-1/4 w-3.5 h-3.5 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]"
          animate={{ x: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Inclined Planetary Orbital Ring 2 */}
      <div 
        className="absolute w-[105%] h-[45%] rounded-full border border-[#5EDCF5]/30 pointer-events-none"
        style={{ transform: 'rotate(32deg)' }}
      >
        <motion.div 
          className="absolute -bottom-1.5 right-1/4 w-3 h-3 rounded-full bg-[#5EDCF5] shadow-[0_0_12px_#5EDCF5]"
          animate={{ x: [0, -35, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Central Core Glowing Orb */}
      <div className="relative w-[52%] h-[52%] flex items-center justify-center">
        {/* Deep aura layer */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #C4B5FD 0%, #8B5CF6 32%, #5EDCF5 65%, #11101D 95%)',
            boxShadow: `0 0 50px 10px ${currentTheme.glow}, inset 0 0 40px 10px rgba(94, 220, 245, 0.6)`
          }}
          animate={{
            scale: [1, 1.04, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary fluid gradient mesh overlay */}
        <motion.div 
          className="absolute inset-1 rounded-full opacity-80 mix-blend-screen pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 65% 70%, #FF8066 0%, #8B5CF6 45%, transparent 80%)'
          }}
          animate={{
            rotate: [360, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Gloss highlight / specular reflections */}
        <div 
          className="absolute top-3 left-6 w-1/3 h-1/4 rounded-full bg-white/40 blur-[4px] pointer-events-none"
          style={{ transform: 'rotate(-30deg)' }}
        />
        <div 
          className="absolute bottom-5 right-7 w-1/4 h-1/5 rounded-full bg-[#5EDCF5]/40 blur-[6px] pointer-events-none"
        />

        {/* Inner dynamic resonance pulse icon */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.div 
            className="w-12 h-12 rounded-full bg-[#11101D]/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-[#F8F7FF] drop-shadow-[0_0_8px_#5EDCF5]" />
          </motion.div>
          <span className="mt-2 text-[11px] font-mono tracking-widest uppercase text-[#F8F7FF]/90 font-medium drop-shadow-md">
            {currentTheme.freq}
          </span>
        </div>
      </div>

      {/* Floating Interactive Emotion Satellite Badges */}
      {interactive && (
        <>
          {/* Node 1: Serenity (Top Left) */}
          <motion.button
            onClick={() => setActiveMood('violet')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-4 left-2 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              activeMood === 'violet'
                ? 'bg-[#8B5CF6]/25 border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.5)]'
                : 'bg-[#181628]/80 border-white/10 text-[#C4B5FD] hover:border-[#8B5CF6]/50'
            } backdrop-blur-md`}
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
            <Activity className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Serenity</span>
          </motion.button>

          {/* Node 2: Euphoria (Top Right) */}
          <motion.button
            onClick={() => setActiveMood('cyan')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-6 right-2 sm:right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              activeMood === 'cyan'
                ? 'bg-[#5EDCF5]/20 border-[#5EDCF5] text-white shadow-[0_0_16px_rgba(94,220,245,0.5)]'
                : 'bg-[#181628]/80 border-white/10 text-[#5EDCF5] hover:border-[#5EDCF5]/50'
            } backdrop-blur-md`}
          >
            <span className="w-2 h-2 rounded-full bg-[#5EDCF5] shadow-[0_0_6px_#5EDCF5]" />
            <Eye className="w-3.5 h-3.5 text-[#5EDCF5]" />
            <span>Euphoria</span>
          </motion.button>

          {/* Node 3: Passion (Bottom Left) */}
          <motion.button
            onClick={() => setActiveMood('coral')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-6 left-2 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              activeMood === 'coral'
                ? 'bg-[#FF8066]/20 border-[#FF8066] text-white shadow-[0_0_16px_rgba(255,128,102,0.5)]'
                : 'bg-[#181628]/80 border-white/10 text-[#FF8066] hover:border-[#FF8066]/50'
            } backdrop-blur-md`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF8066] shadow-[0_0_6px_#FF8066]" />
            <BookOpen className="w-3.5 h-3.5 text-[#FF8066]" />
            <span>Passion</span>
          </motion.button>

          {/* Node 4: Wonder (Bottom Right) */}
          <motion.button
            onClick={() => setActiveMood('lavender')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-5 right-2 sm:right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              activeMood === 'lavender'
                ? 'bg-[#C4B5FD]/20 border-[#C4B5FD] text-white shadow-[0_0_16px_rgba(196,181,253,0.5)]'
                : 'bg-[#181628]/80 border-white/10 text-[#C4B5FD] hover:border-[#C4B5FD]/50'
            } backdrop-blur-md`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C4B5FD] shadow-[0_0_6px_#C4B5FD]" />
            <Music className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Wonder</span>
          </motion.button>
        </>
      )}

      {/* Ambient Micro-Particles floating around */}
      <motion.div 
        className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#5EDCF5] pointer-events-none"
        animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/6 w-2 h-2 rounded-full bg-[#FF8066] pointer-events-none"
        animate={{ y: [8, -12, 8], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#C4B5FD] pointer-events-none"
        animate={{ x: [-8, 8, -8], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
