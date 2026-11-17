import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Eye, BookOpen, Music, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DimensionState {
  id: string;
  name: string;
  color: string;
  glow: string;
  valence: string;
  arousal: string;
  visualPreview: {
    palette: string[];
    lighting: string;
    texture: string;
  };
  storyPreview: {
    genre: string;
    theme: string;
    snippet: string;
  };
  soundPreview: {
    key: string;
    tempo: string;
    texture: string;
    frequency: string;
  };
}

const emotionPresets: DimensionState[] = [
  {
    id: 'wonder',
    name: 'Cosmic Wonder',
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.45)',
    valence: '+0.88',
    arousal: '+0.72',
    visualPreview: {
      palette: ['#8B5CF6', '#C4B5FD', '#5EDCF5', '#1F1B36'],
      lighting: 'Nebula Backlit with Luminescent Haze',
      texture: 'Stardust Crystalline Grain'
    },
    storyPreview: {
      genre: 'Speculative Odyssey',
      theme: 'The Awakening of Ancient Consciousness',
      snippet: '"The silence of the constellation spoke not in words, but in the sudden realization that we were never merely observers, but the universe remembering itself."'
    },
    soundPreview: {
      key: 'D-Major (Lydian Mode)',
      tempo: '64 BPM Ambient',
      texture: 'Shimmering Reverb & Ethereal Glass Harmonics',
      frequency: '528 Hz Solfeggio'
    }
  },
  {
    id: 'euphoria',
    name: 'Lucid Euphoria',
    color: '#5EDCF5',
    glow: 'rgba(94, 220, 245, 0.45)',
    valence: '+0.95',
    arousal: '+0.91',
    visualPreview: {
      palette: ['#5EDCF5', '#8B5CF6', '#F8F7FF', '#0D3B4C'],
      lighting: 'High-Key Iridescent Prism Flares',
      texture: 'Electrified Liquid Chrome'
    },
    storyPreview: {
      genre: 'Solarpunk Cyber-Realism',
      theme: 'Transcendence Through Symbiosis',
      snippet: '"Every photon in the hyper-canopy ignited simultaneously, turning the skyline into a breathing tapestry of uninhibited joy and kinetic velocity."'
    },
    soundPreview: {
      key: 'E-Major Harmonic',
      tempo: '118 BPM Dynamic',
      texture: 'Analog Pulse Arpeggio & Sparkling Treble',
      frequency: '639 Hz Harmonic'
    }
  },
  {
    id: 'passion',
    name: 'Solar Passion',
    color: '#FF8066',
    glow: 'rgba(255, 128, 102, 0.45)',
    valence: '+0.76',
    arousal: '+0.98',
    visualPreview: {
      palette: ['#FF8066', '#8B5CF6', '#C4B5FD', '#2A121A'],
      lighting: 'Volcanic Glow with High Contrast Chiaroscuro',
      texture: 'Ember Filaments & Thermal Dispersion'
    },
    storyPreview: {
      genre: 'Mythic Epic',
      theme: 'The Crucible of Devotion & Creation',
      snippet: '"A singular spark struck against the obsidian core, igniting a hunger that tore through boundaries and forged new galaxies in the furnace of will."'
    },
    soundPreview: {
      key: 'A-Minor Pentatonic',
      tempo: '92 BPM Driving',
      texture: 'Warm Resonant Cellos & Taiko Low-End',
      frequency: '432 Hz Earth Resonance'
    }
  },
  {
    id: 'serenity',
    name: 'Zenith Serenity',
    color: '#C4B5FD',
    glow: 'rgba(196, 181, 253, 0.45)',
    valence: '+0.82',
    arousal: '+0.24',
    visualPreview: {
      palette: ['#C4B5FD', '#11101D', '#5EDCF5', '#1A1830'],
      lighting: 'Soft Twilight Gradient & Ambient Caustics',
      texture: 'Silk Mist & Still Water Reflections'
    },
    storyPreview: {
      genre: 'Philosophical Contemplation',
      theme: 'Stillness Within the Infinite',
      snippet: '"In the hush between tidal waves, time dissolved into an infinite pond where every ripple gently carried memory without weight."'
    },
    soundPreview: {
      key: 'C-Major Deep Ambient',
      tempo: '52 BPM Calming',
      texture: 'Tibetan Sing Bowl Overtone & Rain Whispers',
      frequency: '396 Hz Grounding'
    }
  }
];

export const ResonanceEngine: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DimensionState>(emotionPresets[0]);

  return (
    <section id="universe" className="relative py-28 bg-[#11101D] overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedPreset.color }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-white/10 text-xs font-mono font-medium text-[#C4B5FD] tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5 text-[#5EDCF5]" />
            <span>LIVE RESONANCE ENGINE</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8F7FF] tracking-tight">
            See the Multimodal{' '}
            <span 
              className="transition-colors duration-500"
              style={{ color: selectedPreset.color }}
            >
              Triad In Action
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A5A1B8] font-body">
            Toggle emotional frequencies below to witness how Visual, Story, and Sound DNA dynamically synchronize to express the emotion.
          </p>
        </div>

        {/* Emotion Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {emotionPresets.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`relative px-5 py-2.5 rounded-xl font-heading text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 border ${
                  isSelected
                    ? 'text-white border-white/40 shadow-lg'
                    : 'text-[#A5A1B8] bg-[#181628]/70 border-white/10 hover:border-white/20 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? `${preset.color}25` : undefined,
                  borderColor: isSelected ? preset.color : undefined,
                  boxShadow: isSelected ? `0 0 20px ${preset.glow}` : undefined
                }}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: preset.color,
                    boxShadow: isSelected ? `0 0 8px ${preset.color}` : 'none',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Synchronized DNA Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPreset.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* 1. Visual DNA Panel */}
            <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#5EDCF5]/20 border border-[#5EDCF5]/40 text-[#5EDCF5]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">Visual DNA</h4>
                      <p className="text-[11px] font-mono text-[#5EDCF5]">CHROMATIC SYNTHESIS</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/50">4K Space</span>
                </div>

                {/* Color Palette bar */}
                <div className="my-5">
                  <div className="text-xs font-mono text-[#A5A1B8] mb-2">Aesthetic Palette</div>
                  <div className="grid grid-cols-4 gap-2 h-10 rounded-xl overflow-hidden p-1 bg-black/40 border border-white/5">
                    {selectedPreset.visualPreview.palette.map((hex, i) => (
                      <div 
                        key={i} 
                        className="h-full rounded-md flex items-center justify-center text-[10px] font-mono font-medium text-white/90 drop-shadow shadow-inner"
                        style={{ backgroundColor: hex }}
                      >
                        {hex}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div>
                    <span className="text-xs font-mono text-[#A5A1B8] block">Atmospheric Lighting</span>
                    <span className="text-sm font-medium text-[#F8F7FF]">{selectedPreset.visualPreview.lighting}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#A5A1B8] block">Texture Dimension</span>
                    <span className="text-sm font-medium text-[#F8F7FF]">{selectedPreset.visualPreview.texture}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A5A1B8]">
                <span>Status: Coherent</span>
                <span className="text-[#5EDCF5]">Aesthetic Score 99.4%</span>
              </div>
            </div>

            {/* 2. Story DNA Panel */}
            <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#FF8066]/20 border border-[#FF8066]/40 text-[#FF8066]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">Story DNA</h4>
                      <p className="text-[11px] font-mono text-[#FF8066]">LORE ARCHITECTURE</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/50">{selectedPreset.storyPreview.genre}</span>
                </div>

                <div className="my-4">
                  <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Central Motif</span>
                  <span className="text-sm font-medium text-white">{selectedPreset.storyPreview.theme}</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-[#C4B5FD] font-body italic leading-relaxed my-4">
                  {selectedPreset.storyPreview.snippet}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A5A1B8]">
                <span>Narrative Arc: Complete</span>
                <span className="text-[#FF8066]">Affective Resonance 98.7%</span>
              </div>
            </div>

            {/* 3. Sound DNA Panel */}
            <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">Sound DNA</h4>
                      <p className="text-[11px] font-mono text-[#C4B5FD]">ACOUSTIC HARMONICS</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/50">{selectedPreset.soundPreview.frequency}</span>
                </div>

                <div className="space-y-3 my-5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-xs font-mono text-[#A5A1B8]">Harmonic Key</span>
                    <span className="text-xs font-mono font-semibold text-white">{selectedPreset.soundPreview.key}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-xs font-mono text-[#A5A1B8]">Metronome Pace</span>
                    <span className="text-xs font-mono font-semibold text-[#5EDCF5]">{selectedPreset.soundPreview.tempo}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Acoustic Texture</span>
                    <span className="text-sm font-medium text-[#F8F7FF]">{selectedPreset.soundPreview.texture}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A5A1B8]">
                <span>Binaural Field: Spatial 3D</span>
                <span className="text-[#8B5CF6]">Coherence 99.1%</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* CTA to Studio */}
        <div className="mt-12 text-center">
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#181628] hover:bg-[#1F1B36] border border-[#8B5CF6]/40 text-[#F8F7FF] font-heading font-medium text-sm transition-all duration-300 shadow-md hover:border-[#8B5CF6]"
          >
            <Sparkles className="w-4 h-4 text-[#5EDCF5]" />
            <span>Customize Emotional Coordinates in Studio</span>
            <ArrowRight className="w-4 h-4 text-[#C4B5FD]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
