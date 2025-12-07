import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Play } from 'lucide-react';
import { LiveStatus } from '../types';

interface ControlTrayProps {
  status: LiveStatus;
  isMuted: boolean;
  isVideoActive: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
}

const ControlTray: React.FC<ControlTrayProps> = ({
  status,
  isMuted,
  isVideoActive,
  onConnect,
  onDisconnect,
  onToggleMute,
  onToggleVideo,
}) => {
  const isConnected = status === LiveStatus.CONNECTED;

  return (
    <div className="flex items-center gap-6 bg-zinc-900/50 backdrop-blur-xl px-8 py-6 rounded-full border border-white/10 shadow-2xl">
      {/* Mic Toggle */}
      <button
        onClick={onToggleMute}
        disabled={!isConnected}
        className={`p-4 rounded-full transition-all duration-300 ${
          !isConnected 
            ? 'text-zinc-600 cursor-not-allowed' 
            : isMuted 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'
        }`}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>

      {/* End Call Action */}
      <button
        onClick={onDisconnect}
        className="px-8 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-full font-medium transition-all hover:scale-105"
      >
          End Session
      </button>

      {/* Video Toggle */}
      <button
        onClick={onToggleVideo}
        disabled={!isConnected}
        className={`p-4 rounded-full transition-all duration-300 ${
          !isConnected 
            ? 'text-zinc-600 cursor-not-allowed' 
            : !isVideoActive 
                ? 'bg-white/5 text-white hover:bg-white/10 hover:scale-105' 
                : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
        }`}
      >
        {isVideoActive ? <Video size={24} /> : <VideoOff size={24} />}
      </button>
    </div>
  );
};

export default ControlTray;