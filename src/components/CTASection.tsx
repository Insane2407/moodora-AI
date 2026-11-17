import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wand2, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#11101D] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-radial from-[#8B5CF6]/20 via-[#5EDCF5]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181628]/95 to-[#131122]/95 border border-[#8B5CF6]/30 p-10 sm:p-16 text-center backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,0.2)] overflow-hidden">
          
          {/* Top Decorative Light Bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#5EDCF5] to-transparent" />

          {/* Micro Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/30 via-[#5EDCF5]/20 to-[#FF8066]/20 border border-white/20 mx-auto flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(139,92,246,0.4)]"
          >
            <Sparkles className="w-7 h-7 text-[#5EDCF5]" />
          </motion.div>

          {/* Title */}
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8F7FF] tracking-tight max-w-2xl mx-auto">
            Ready to Materialize Your{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C4B5FD] to-[#5EDCF5] bg-clip-text text-transparent">
              Inner Universe?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[#A5A1B8] max-w-xl mx-auto font-body">
            Feel it. Transform it. Create it. Step into the next generation of multimodal affective AI and unleash your imagination.
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/studio"
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading font-semibold text-base text-white overflow-hidden group shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:shadow-[0_0_55px_rgba(139,92,246,0.9)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#5EDCF5] transition-all duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)]" />
              <span className="relative flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#5EDCF5]" />
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </span>
            </Link>
          </div>

          {/* Small Feature Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#A5A1B8]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              Zero Setup Required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EDCF5]" />
              Realtime Multimodal Synthesis
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066]" />
              Affective Coherence Guaranteed
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
