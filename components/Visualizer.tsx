import React from 'react';

interface VisualizerProps {
  volume: number; // 0 to 1
  isActive: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ volume, isActive }) => {
  // Map volume to scale (min 1, max 2.5)
  const scale = isActive ? 1 + volume * 1.5 : 1;
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Core */}
      <div 
        className={`absolute w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-500 to-amber-700 blur-md transition-transform duration-100 ease-out z-10 ${isActive ? 'opacity-100' : 'opacity-30 grayscale'}`}
        style={{ transform: `scale(${scale})` }}
      />
      
      {/* Outer Glow */}
      <div 
        className={`absolute w-40 h-40 rounded-full bg-amber-500 opacity-20 blur-xl transition-transform duration-200 ease-out z-0`}
        style={{ transform: `scale(${scale * 1.2})` }}
      />

       {/* Ring 1 */}
       <div 
        className={`absolute w-48 h-48 rounded-full border border-amber-500/30 transition-transform duration-300 ease-out z-0`}
        style={{ transform: `scale(${scale * 1.1})` }}
      />

       {/* Ring 2 */}
       <div 
        className={`absolute w-60 h-60 rounded-full border border-yellow-200/10 transition-transform duration-500 ease-out z-0`}
        style={{ transform: `scale(${scale * 1.4})` }}
      />
      
      {!isActive && (
        <span className="relative z-20 text-zinc-500 font-serif text-sm tracking-widest italic">
            MA FASHION AI
        </span>
      )}
    </div>
  );
};

export default Visualizer;