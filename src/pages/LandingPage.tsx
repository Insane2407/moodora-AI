import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { ResonanceEngine } from '../components/ResonanceEngine';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#11101D] text-[#F8F7FF] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-[#5EDCF5]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Four Feature Cards: Emotion Intelligence, Visual DNA, Story DNA, Sound DNA */}
        <Features />

        {/* Interactive Resonance Engine Showcase */}
        <ResonanceEngine />

        {/* Final Call to Action */}
        <CTASection />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};
