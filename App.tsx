import React from 'react';
import StarryBackground from './components/StarryBackground';
import CoupleSilhouette from './components/CoupleSilhouette';
import LoveNoteGenerator from './components/LoveNoteGenerator';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Background Canvas Layer */}
      <StarryBackground />
      
      {/* Interactive UI Layer */}
      <LoveNoteGenerator />
      
      {/* Foreground Visual Layer */}
      <CoupleSilhouette />
      
      {/* Overlay Vignette for atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-slate-950/80" />
    </div>
  );
};

export default App;
