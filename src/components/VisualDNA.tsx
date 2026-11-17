import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Copy, Check, Sparkles, Palette, Sun, Layers, Wind, 
  Code
} from 'lucide-react';
import { useMoodora } from '../context/MoodoraContext';
import { ColorEntry } from '../types';

export const VisualDNA: React.FC = () => {
  const { 
    blueprint, 
    isGeneratingBlueprint, 
    fetchOrCreateBlueprint 
  } = useMoodora();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);

  // If blueprint is not yet available, fetch or create it once using existing mood state
  useEffect(() => {
    if (!blueprint && !isGeneratingBlueprint) {
      fetchOrCreateBlueprint().catch((err) => {
        console.error('Error fetching blueprint in VisualDNA:', err);
      });
    }
  }, [blueprint, isGeneratingBlueprint, fetchOrCreateBlueprint]);

  // Copy single color hex code
  const handleCopyHex = (hex: string, index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Copy all five hex codes as a comma-separated list
  const handleCopyAllPalette = () => {
    if (!blueprint?.visualDNA?.colors) return;
    const allHex = blueprint.visualDNA.colors.map((c: ColorEntry) => c.hex).join(', ');
    navigator.clipboard.writeText(allHex);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Copy as CSS Variables
  const handleCopyCssVars = () => {
    if (!blueprint?.visualDNA?.colors) return;
    const cssVars = blueprint.visualDNA.colors
      .map((c: ColorEntry, i: number) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`)
      .join('\n');
    const cssBlock = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(cssBlock);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  // Loading State
  if (isGeneratingBlueprint || !blueprint) {
    return (
      <div className="relative rounded-3xl bg-[#181628]/80 border border-white/10 p-10 sm:p-16 backdrop-blur-2xl text-center overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-[#8B5CF6]/30 via-[#5EDCF5]/10 to-transparent blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-md mx-auto">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#8B5CF6]/20 border-t-[#5EDCF5] animate-spin" />
            <Eye className="w-8 h-8 text-[#5EDCF5] animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl text-white">
              Synthesizing Visual DNA...
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#A5A1B8] leading-relaxed">
              Decoding emotional vectors into five coherent chromatic harmonies, volumetric lighting, and atmospheric depth.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { visualDNA, title, _meta } = blueprint;
  const colors = Array.isArray(visualDNA?.colors) ? visualDNA.colors : [];

  // Generate continuous gradient CSS string from the 5 dynamic colors
  const gradientString = colors.length > 0 
    ? `linear-gradient(to right, ${colors.map((c: ColorEntry) => c.hex).join(', ')})`
    : 'linear-gradient(to right, #8B5CF6, #5EDCF5)';

  return (
    <div className="space-y-10">
      
      {/* Module 4 Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181628] border border-[#5EDCF5]/30 text-xs font-mono font-medium text-[#5EDCF5] tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5 text-[#5EDCF5]" />
            <span>MODULE 4 • VISUAL DNA</span>
            {_meta?.source === 'gemini' && (
              <>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400">Gemini Live</span>
              </>
            )}
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#F8F7FF] tracking-tight">
            Chromatic & Atmospheric{' '}
            <span className="bg-gradient-to-r from-[#5EDCF5] via-[#C4B5FD] to-[#FF8066] bg-clip-text text-transparent">
              DNA Board
            </span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#A5A1B8] max-w-2xl font-body">
            Dynamically synthesized palette and dimensional visual direction derived from the emotional intelligence blueprint for <strong className="text-white">"{title || 'Your Universe'}"</strong>.
          </p>
        </div>

        {/* Action Buttons: Copy All Palette & Copy CSS */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyAllPalette}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181628] hover:bg-[#1F1B36] border border-[#5EDCF5]/30 hover:border-[#5EDCF5]/60 text-xs font-mono text-[#5EDCF5] transition-all shadow-md"
            title="Copy all 5 hex color codes"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">All 5 Hex Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#5EDCF5]" />
                <span>Copy All Palette</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyCssVars}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 text-xs font-mono text-[#C4B5FD] transition-all shadow-md"
            title="Copy as CSS :root variables"
          >
            {copiedCss ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">CSS Copied!</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5 text-[#C4B5FD]" />
                <span>CSS Variables</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feature: Continuous Dynamic Gradient Spectrum Strip */}
      <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono text-[#A5A1B8] mb-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#5EDCF5]" />
            <span>Harmonized Chromatic Transition</span>
          </span>
          <span className="text-white/60">5-Band Synthesis</span>
        </div>

        <div 
          className="w-full h-8 sm:h-10 rounded-xl border border-white/10 shadow-inner"
          style={{ background: gradientString }}
        />
      </div>

      {/* Feature 1–4: Five Dynamically Generated Color Swatches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#8B5CF6]" />
            <span>Five Dynamic Color Swatches</span>
          </h3>
          <span className="text-xs font-mono text-[#A5A1B8]">
            Click any swatch or button to copy hex
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {colors.map((color: ColorEntry, index: number) => {
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                onClick={() => handleCopyHex(color.hex, index)}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-[#181628]/90 border border-white/10 hover:border-white/30 p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
                style={{
                  boxShadow: `0 10px 30px -10px ${color.hex}40`,
                }}
              >
                {/* Large Color Swatch Block */}
                <div>
                  <div 
                    className="relative w-full aspect-square rounded-xl mb-4 border border-white/10 transition-transform duration-300 group-hover:scale-[1.03] shadow-inner flex flex-col justify-between p-3 overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Top Tag on Swatch */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-black/40 text-white backdrop-blur-md border border-white/10 shadow">
                        0{index + 1}
                      </span>

                      {/* Quick copy checkmark inside swatch */}
                      <span className="p-1 rounded-md bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    {/* Bottom Hex Overlay */}
                    <div className="self-start">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-black/50 text-white backdrop-blur-md border border-white/15 drop-shadow">
                        {color.hex}
                      </span>
                    </div>
                  </div>

                  {/* Color Name */}
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#F8F7FF] group-hover:text-[#5EDCF5] transition-colors leading-snug">
                    {color.name || `Resonant Shade ${index + 1}`}
                  </h4>

                  {/* Hex Code & Dedicated Copy Button */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="font-mono text-xs font-semibold text-[#5EDCF5]">
                      {color.hex}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleCopyHex(color.hex, index, e)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        isCopied 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-white/5 hover:bg-white/10 text-[#C4B5FD] border border-white/5'
                      }`}
                      title="Copy hex code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Emotional Meaning of Color */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-[#A5A1B8] uppercase block mb-1">
                    Affective Meaning
                  </span>
                  <p className="text-xs text-[#C4B5FD] font-body leading-relaxed line-clamp-4">
                    {color.meaning || 'Harmonic psychological resonance aligning with your state of mind.'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature 5–8: Visual Style, Lighting, Composition & Atmosphere */}
      <div className="space-y-4 pt-4">
        <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#5EDCF5]" />
          <span>Architectural Visual Direction</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 5. Visual Style */}
          <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#8B5CF6] uppercase font-semibold">
                  Aesthetic Style
                </span>
              </div>

              <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Stylistic Dimension</span>
              <h4 className="font-heading font-bold text-xl text-white mb-3">
                {visualDNA?.style || 'Cinematic & Ethereal'}
              </h4>

              <p className="text-xs sm:text-sm text-[#A5A1B8] font-body leading-relaxed">
                The visual framework governing texture density, brush mechanics, and medium authenticity.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#C4B5FD]">
              <span>Coherence</span>
              <span className="text-[#8B5CF6]">Active</span>
            </div>
          </div>

          {/* 6. Lighting Direction */}
          <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#5EDCF5]/15 border border-[#5EDCF5]/40 text-[#5EDCF5]">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#5EDCF5] uppercase font-semibold">
                  Illumination Vector
                </span>
              </div>

              <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Lighting Mechanics</span>
              <h4 className="font-heading font-bold text-lg text-white mb-3">
                {visualDNA?.lighting || 'Volumetric Ambient Haze'}
              </h4>

              <p className="text-xs sm:text-sm text-[#A5A1B8] font-body leading-relaxed">
                Dictates the key, fill, specular caustics, and volumetric light falloff across the canvas.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#5EDCF5]">
              <span>Caustics</span>
              <span>Synchronized</span>
            </div>
          </div>

          {/* 7. Composition */}
          <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#FF8066]/15 border border-[#FF8066]/40 text-[#FF8066]">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#FF8066] uppercase font-semibold">
                  Spatial Framing
                </span>
              </div>

              <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Framing & Horizon</span>
              <h4 className="font-heading font-bold text-lg text-white mb-3">
                {visualDNA?.composition || 'Panoramic Horizontal Horizon'}
              </h4>

              <p className="text-xs sm:text-sm text-[#A5A1B8] font-body leading-relaxed">
                Establishes focal depth, dynamic leading lines, and golden ratio balance throughout the scene.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#FF8066]">
              <span>Perspective</span>
              <span>Calibrated</span>
            </div>
          </div>

          {/* 8. Atmosphere */}
          <div className="rounded-2xl bg-[#181628]/90 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#C4B5FD]/15 border border-[#C4B5FD]/40 text-[#C4B5FD]">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#C4B5FD] uppercase font-semibold">
                  Atmospheric Aura
                </span>
              </div>

              <span className="text-xs font-mono text-[#A5A1B8] block mb-1">Environmental Temperature</span>
              <h4 className="font-heading font-bold text-lg text-white mb-3">
                {visualDNA?.atmosphere || 'Still Twilight Resonance'}
              </h4>

              <p className="text-xs sm:text-sm text-[#A5A1B8] font-body leading-relaxed">
                Captures the visceral sensory aura, moisture, stardust dispersion, and emotional climate.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#C4B5FD]">
              <span>Climate</span>
              <span>Affective</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
