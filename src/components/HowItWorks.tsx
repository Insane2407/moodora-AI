import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Cpu, Sliders, Dna, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Capture Emotional Resonance',
    subtitle: 'Feel It',
    description:
      'Input your raw feeling through expressive language, mood coordinates, ambient tempo, or stream-of-consciousness sentiment. The Emotion Intelligence core senses your emotional valence and intensity.',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    badgeBg: 'bg-[#8B5CF6]/15',
    badgeText: 'text-[#C4B5FD]',
    icon: HeartPulse,
    tag: 'Input Vector',
    featureBadge: 'Affective Mapping'
  },
  {
    number: '02',
    title: 'Synthesize Creative DNA',
    subtitle: 'Transform It',
    description:
      'Moodora decomposes your sentiment into three synchronized creative strands: Visual DNA (chromatic moods, textures, aesthetics), Story DNA (narrative themes, emotional arcs), and Sound DNA (harmonic timbres, acoustic rhythms).',
    accentColor: '#5EDCF5',
    glowColor: 'rgba(94, 220, 245, 0.4)',
    badgeBg: 'bg-[#5EDCF5]/15',
    badgeText: 'text-[#5EDCF5]',
    icon: Dna,
    tag: 'Multimodal Triad',
    featureBadge: 'Tri-Modal Synthesis'
  },
  {
    number: '03',
    title: 'Materialize Your Creative Universe',
    subtitle: 'Create It',
    description:
      'Your emotion crystallizes into a living universe. Interact with synchronized visual atmospheres, compelling narratives, and immersive soundscapes in real-time within the Moodora Studio.',
    accentColor: '#FF8066',
    glowColor: 'rgba(255, 128, 102, 0.4)',
    badgeBg: 'bg-[#FF8066]/15',
    badgeText: 'text-[#FF8066]',
    icon: Rocket,
    tag: 'Living Universe',
    featureBadge: 'Realtime Atmosphere'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-28 bg-[#11101D] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-radial from-[#8B5CF6]/10 via-[#5EDCF5]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-[#5EDCF5]/30 text-xs font-mono font-medium text-[#5EDCF5] tracking-wider mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-[#5EDCF5]" />
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8F7FF] tracking-tight"
          >
            From Ephemeral Emotion to{' '}
            <span className="bg-gradient-to-r from-[#5EDCF5] via-[#C4B5FD] to-[#FF8066] bg-clip-text text-transparent">
              Infinite Universe
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#A5A1B8] font-body"
          >
            Three seamless stages bridge the gap between human internal sentiment and multidimensional creative reality.
          </motion.p>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#8B5CF6]/30 via-[#5EDCF5]/40 to-[#FF8066]/30 -translate-y-8 pointer-events-none" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col justify-between rounded-2xl bg-[#181628]/70 border border-white/10 hover:border-white/20 p-8 backdrop-blur-xl transition-all duration-300 group shadow-lg"
                style={{
                  boxShadow: `0 10px 30px -10px ${step.glowColor}`
                }}
              >
                {/* Step Top Bar: Number & Tag */}
                <div className="flex items-center justify-between mb-8">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg text-white border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${step.accentColor}20`,
                      borderColor: step.accentColor,
                      boxShadow: `0 0 15px ${step.glowColor}`
                    }}
                  >
                    {step.number}
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase font-semibold ${step.badgeBg} ${step.badgeText} border border-white/5`}>
                    {step.tag}
                  </span>
                </div>

                {/* Subtitle / Action verb */}
                <div 
                  className="text-xs font-mono tracking-widest uppercase font-semibold mb-1"
                  style={{ color: step.accentColor }}
                >
                  {step.subtitle}
                </div>

                {/* Step Title */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F7FF] mb-4">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#A5A1B8] leading-relaxed font-body mb-6 flex-grow">
                  {step.description}
                </p>

                {/* Card Bottom Meta */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#F8F7FF]/70 flex items-center gap-1.5">
                    <IconComponent className="w-4 h-4" style={{ color: step.accentColor }} />
                    {step.featureBadge}
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.accentColor }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Transition Banner to Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#181628] via-[#1E1A38] to-[#181628] border border-[#8B5CF6]/30 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center shrink-0">
              <Sliders className="w-6 h-6 text-[#C4B5FD]" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg text-[#F8F7FF]">
                Experience It Live in Moodora Studio
              </h4>
              <p className="text-xs sm:text-sm text-[#A5A1B8]">
                Adjust emotional coordinates, witness real-time DNA changes, and orchestrate your universe.
              </p>
            </div>
          </div>

          <Link
            to="/studio"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] font-heading font-semibold text-sm text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
