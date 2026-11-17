import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Eye, BookOpen, Music2, CheckCircle2, Sparkles } from 'lucide-react';

const features = [
  {
    id: 'emotion-intelligence',
    title: 'Emotion Intelligence',
    badge: 'CORE ENGINE',
    subtitle: 'High-Dimensional Sentiment Mapping',
    description:
      'Decodes subtle human emotional spectra into actionable mathematical vectors. Bridges affective psychology with latent space to understand not just what you say, but what you feel.',
    accentColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    icon: BrainCircuit,
    highlights: [
      'Valence, arousal, and dominance coordinate calculation',
      'Context-aware emotional nuance & micro-sentiment capture',
      'Continuous affective feedback loop'
    ],
    previewPill: 'Empathy Core Online',
    previewValue: '0.94 Resonance'
  },
  {
    id: 'visual-dna',
    title: 'Visual DNA',
    badge: 'AESTHETIC MATRIX',
    subtitle: 'Emotionally Attuned Imagery & Lighting',
    description:
      'Translates emotional frequencies into coherent visual aesthetics, generative color palettes, volumetric lighting, and surreal textures that reflect your inner atmosphere.',
    accentColor: '#5EDCF5',
    secondaryColor: '#8B5CF6',
    glowColor: 'rgba(94, 220, 245, 0.45)',
    icon: Eye,
    highlights: [
      'Adaptive chromatic palette tuned to emotional temperature',
      'Volumetric haze, light ray dynamics & texture styling',
      'Persistent aesthetic coherence across infinite canvas frames'
    ],
    previewPill: 'Aura Spectrum',
    previewValue: '4K Volumetric'
  },
  {
    id: 'story-dna',
    title: 'Story DNA',
    badge: 'NARRATIVE SYNTHESIS',
    subtitle: 'Deep Lore, Poetry & Evocative Arcs',
    description:
      'Architects literary and narrative structures aligned with your state of mind. Generates resonant character internal monologues, evocative poetic prose, and worldbuilding lore.',
    accentColor: '#FF8066',
    secondaryColor: '#C4B5FD',
    glowColor: 'rgba(255, 128, 102, 0.45)',
    icon: BookOpen,
    highlights: [
      'Dynamic narrative pacing dictated by emotional arc',
      'Metaphoric worldbuilding calibrated to psychological themes',
      'Poetic and dramatic prose harmonization'
    ],
    previewPill: 'Narrative Arc',
    previewValue: '3-Act Harmonic'
  },
  {
    id: 'sound-dna',
    title: 'Sound DNA',
    badge: 'ACOUSTIC RESONANCE',
    subtitle: 'Psychoacoustic Soundscapes & Harmonics',
    description:
      'Generates binaural frequencies, atmospheric drones, and harmonic melodic progressions engineered to evoke physical emotional goosebumps and somatic immersion.',
    accentColor: '#C4B5FD',
    secondaryColor: '#5EDCF5',
    glowColor: 'rgba(196, 181, 253, 0.45)',
    icon: Music2,
    highlights: [
      'Solfege & tuned psychoacoustic frequencies (432Hz / 528Hz)',
      'Generative ambient chord progressions and sonic textures',
      'Spatial 3D binaural sound positioning'
    ],
    previewPill: 'Binaural Tuning',
    previewValue: '528 Hz Solfeggio'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-28 bg-[#11101D] overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 right-5 w-[500px] h-[500px] bg-[#8B5CF6]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-[500px] h-[500px] bg-[#5EDCF5]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-[#8B5CF6]/30 text-xs font-mono font-medium text-[#C4B5FD] tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>CREATIVE DNA MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8F7FF] tracking-tight"
          >
            Four Pillars of{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#5EDCF5] to-[#FF8066] bg-clip-text text-transparent">
              Emotional Creation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#A5A1B8] font-body"
          >
            A cohesive multimodal stack designed to translate the nuances of your feelings into
            synchronized visual aesthetics, compelling storytelling, and immersive soundscapes.
          </motion.p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl bg-[#181628]/80 border border-white/10 hover:border-white/25 p-8 lg:p-10 backdrop-blur-xl transition-all duration-300 group shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient glow corner inside card */}
                <div 
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-[60px] opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: feature.accentColor }}
                />

                <div>
                  {/* Top Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${feature.accentColor}18`,
                        borderColor: `${feature.accentColor}50`,
                        boxShadow: `0 0 20px ${feature.glowColor}`
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.accentColor }} />
                    </div>

                    <span 
                      className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold border"
                      style={{
                        backgroundColor: `${feature.accentColor}15`,
                        borderColor: `${feature.accentColor}40`,
                        color: feature.accentColor
                      }}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Feature Title & Subtitle */}
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-[#F8F7FF] tracking-tight mb-1">
                    {feature.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-[#C4B5FD]/80 uppercase tracking-wider mb-4">
                    {feature.subtitle}
                  </div>

                  {/* Feature Description */}
                  <p className="text-sm lg:text-base text-[#A5A1B8] leading-relaxed font-body mb-8">
                    {feature.description}
                  </p>

                  {/* Feature Highlights Checklist */}
                  <div className="space-y-3 mb-8">
                    {feature.highlights.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <CheckCircle2 
                          className="w-4 h-4 mt-0.5 shrink-0" 
                          style={{ color: feature.accentColor }} 
                        />
                        <span className="text-xs sm:text-sm text-[#F8F7FF]/90 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive / Telemetry Pill Bar */}
                <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: feature.accentColor }} />
                    <span className="text-xs font-mono text-[#A5A1B8]">
                      {feature.previewPill}
                    </span>
                  </div>
                  <span 
                    className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-black/40 border border-white/5"
                    style={{ color: feature.accentColor }}
                  >
                    {feature.previewValue}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
