import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Compass, Cpu, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler that works both on root page and from /studio
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + targetId);
      setTimeout(() => {
        const element = document.querySelector(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#11101D]/85 backdrop-blur-xl border-b border-[#8B5CF6]/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="MOODORA AI Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#5EDCF5] to-[#FF8066] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <div className="w-full h-full bg-[#11101D] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C4B5FD] group-hover:text-white transition-colors" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-wider text-white">
                  MOODORA
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#5EDCF5] tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#A5A1B8] hidden sm:block">
                EMOTION CORE 2.0
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#181628]/60 border border-white/5 backdrop-blur-md">
            <a
              href="#how-it-works"
              onClick={(e) => handleAnchorClick(e, '#how-it-works')}
              className="px-4 py-1.5 text-sm font-medium text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5 rounded-full transition-all duration-200"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleAnchorClick(e, '#features')}
              className="px-4 py-1.5 text-sm font-medium text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Creative DNA
            </a>
            <a
              href="#universe"
              onClick={(e) => handleAnchorClick(e, '#universe')}
              className="px-4 py-1.5 text-sm font-medium text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Resonance Engine
            </a>
            <Link
              to="/studio"
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                location.pathname === '/studio'
                  ? 'text-[#5EDCF5] bg-[#5EDCF5]/10'
                  : 'text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5'
              }`}
            >
              Studio
            </Link>
            <Link
              to="/canvas"
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                location.pathname === '/canvas'
                  ? 'text-[#5EDCF5] bg-[#5EDCF5]/10'
                  : 'text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5'
              }`}
            >
              Canvas
            </Link>
            <Link
              to="/creations"
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                location.pathname === '/creations'
                  ? 'text-[#FF8066] bg-[#FF8066]/10'
                  : 'text-[#A5A1B8] hover:text-[#F8F7FF] hover:bg-white/5'
              }`}
            >
              Saved
            </Link>
          </nav>

          {/* Desktop Right CTA: "Start Creating" -> /studio */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/studio"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-medium text-sm text-white overflow-hidden group shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#5EDCF5] opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)]" />
              <span className="relative flex items-center gap-2">
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/studio"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#C4B5FD]"
            >
              Studio
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#181628] border border-white/10 text-[#F8F7FF] hover:text-[#5EDCF5] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-[#8B5CF6]/20 bg-[#11101D]/98 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-5 py-6 space-y-3">
              <a
                href="#how-it-works"
                onClick={(e) => handleAnchorClick(e, '#how-it-works')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F8F7FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#5EDCF5]" />
                <span>How It Works</span>
              </a>
              <a
                href="#features"
                onClick={(e) => handleAnchorClick(e, '#features')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F8F7FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Cpu className="w-4 h-4 text-[#8B5CF6]" />
                <span>Creative DNA</span>
              </a>
              <a
                href="#universe"
                onClick={(e) => handleAnchorClick(e, '#universe')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F8F7FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Layers className="w-4 h-4 text-[#FF8066]" />
                <span>Resonance Engine</span>
              </a>

              <Link
                to="/canvas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F8F7FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#5EDCF5]" />
                <span>Creative Canvas</span>
              </Link>

              <Link
                to="/creations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F8F7FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#FF8066]" />
                <span>My Creations Gallery</span>
              </Link>
              
              <div className="pt-3 border-t border-white/10">
                <Link
                  to="/studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-medium text-sm text-white bg-gradient-to-r from-[#8B5CF6] to-[#5EDCF5] shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  <span>Start Creating</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
