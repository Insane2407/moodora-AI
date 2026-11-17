import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MoodoraProvider } from './context/MoodoraContext';
import { LandingPage } from './pages/LandingPage';
import { StudioPage } from './pages/StudioPage';
import { CanvasPage } from './pages/CanvasPage';
import { VisualDNAPage } from './pages/VisualDNAPage';
import { StorySoundDNAPage } from './pages/StorySoundDNAPage';
import { MyCreationsPage } from './pages/MyCreationsPage';

export const App: React.FC = () => {
  return (
    <MoodoraProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/creations" element={<MyCreationsPage />} />
        <Route path="/my-creations" element={<Navigate to="/creations" replace />} />
        <Route path="/visual-dna" element={<VisualDNAPage />} />
        <Route path="/story-sound-dna" element={<StorySoundDNAPage />} />
        <Route path="/story-dna" element={<Navigate to="/story-sound-dna" replace />} />
        <Route path="/sound-dna" element={<Navigate to="/story-sound-dna" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MoodoraProvider>
  );
};

export default App;
