import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2,
  Music,
  Headphones,
  Compass
} from 'lucide-react';
import { DirectoryListing } from '../types';
import { DIRECTORY_LISTINGS } from '../data/directory';
import { speakNarration, playKalimbaChime } from '../utils/audio';

interface AudioGuidePlayerProps {
  currentListing: DirectoryListing | null;
  onClose: () => void;
}

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  currentListing,
  onClose,
}) => {
  const [activeListing, setActiveListing] = useState<DirectoryListing>(
    currentListing || DIRECTORY_LISTINGS[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // simulated percent
  const [speed, setSpeed] = useState(1.0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [speechCancelFn, setSpeechCancelFn] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (currentListing) {
      setActiveListing(currentListing);
      setIsPlaying(false);
      setProgress(0);
      if (speechCancelFn) {
        speechCancelFn();
        setSpeechCancelFn(null);
      }
    }
  }, [currentListing]);

  // Handle play/pause with Web Speech synthesis
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (speechCancelFn) {
        speechCancelFn();
        setSpeechCancelFn(null);
      }
      setIsPlaying(false);
    } else {
      playKalimbaChime();
      setIsPlaying(true);
      const cancel = speakNarration(
        `${activeListing.audioGuide.title}. ${activeListing.audioGuide.transcript}`,
        () => {
          setIsPlaying(false);
          setProgress(100);
        }
      );
      setSpeechCancelFn(() => cancel);
    }
  };

  // Progress simulation ticker when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1.2 * speed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleSeek = (amount: number) => {
    setProgress((prev) => Math.max(0, Math.min(100, prev + amount)));
  };

  if (!activeListing) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-[#4A3B32] text-[#FAEDCD] px-4 py-3 rounded-2xl shadow-2xl border-2 border-[#D4A373] flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={handleTogglePlay}
          className="w-9 h-9 rounded-full bg-[#D4A373] text-[#1F1814] flex items-center justify-center font-bold"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div>
          <div className="text-xs font-bold truncate max-w-[180px]">{activeListing.audioGuide.title}</div>
          <div className="text-[10px] text-[#FAEDCD]/70">{activeListing.country} &bull; {activeListing.audioGuide.duration}</div>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1.5 text-[#FAEDCD]/70 hover:text-white"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (speechCancelFn) speechCancelFn();
            onClose();
          }}
          className="p-1.5 text-[#FAEDCD]/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6ED] rounded-3xl max-w-lg w-full border-2 border-[#D4A373] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
        {/* Top Controls */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#D4A373]/30">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
            <Headphones className="w-4 h-4 text-[#BC4749]" />
            <span>Afrivoya Native Audio Guide</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-[#4A3B32]/70 hover:bg-[#FAEDCD]"
              title="Minimize to bottom bar"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (speechCancelFn) speechCancelFn();
                onClose();
              }}
              className="p-1.5 rounded-lg text-[#4A3B32]/70 hover:bg-[#FAEDCD]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Thumbnail & Title */}
        <div className="p-6">
          <div className="relative h-44 rounded-2xl overflow-hidden shadow-md mb-5 border border-[#D4A373]/40">
            <img
              src={activeListing.image}
              alt={activeListing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-bold text-[#D4A373] tracking-wider block">
                {activeListing.country} &bull; {activeListing.subcategory}
              </span>
              <h3 className="font-display font-extrabold text-lg leading-tight">
                {activeListing.audioGuide.title}
              </h3>
            </div>
          </div>

          {/* Simulated Animated Waveform */}
          <div className="bg-white p-4 rounded-2xl border border-[#D4A373]/30 shadow-xs mb-5">
            <div className="flex items-center justify-between text-xs text-[#4A3B32]/70 mb-2">
              <span className="font-mono text-[11px]">
                {Math.floor((progress / 100) * 14)}:{String(Math.floor(((progress / 100) * 60) % 60)).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-semibold text-[#BC4749]">
                Tone: {activeListing.audioGuide.tone}
              </span>
              <span className="font-mono text-[11px]">{activeListing.audioGuide.duration}</span>
            </div>

            {/* Visual Equalizer Bars */}
            <div className="flex items-center justify-center space-x-1 h-12 py-1">
              {Array.from({ length: 32 }).map((_, i) => {
                const isActive = (i / 32) * 100 <= progress;
                const dynamicHeight = isPlaying
                  ? Math.sin(i * 0.8 + progress * 0.2) * 18 + 24
                  : Math.max(6, (i % 5) * 6);
                return (
                  <div
                    key={i}
                    style={{ height: `${dynamicHeight}px` }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isActive ? 'bg-[#BC4749]' : 'bg-[#D4A373]/30'
                    }`}
                  />
                );
              })}
            </div>

            {/* Progress Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-[#BC4749] mt-2 cursor-pointer h-1.5 bg-[#F4F1DE] rounded-lg"
            />
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-between mb-5 px-4">
            <button
              onClick={() => handleSeek(-10)}
              className="p-2.5 rounded-full text-[#4A3B32] hover:bg-[#FAEDCD] transition-colors"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#BC4749] to-[#E76F51] text-white flex items-center justify-center shadow-lg shadow-[#BC4749]/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>

            <button
              onClick={() => handleSeek(10)}
              className="p-2.5 rounded-full text-[#4A3B32] hover:bg-[#FAEDCD] transition-colors"
              title="Forward 10 seconds"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1 bg-[#F4F1DE] px-2 py-1 rounded-lg border border-[#D4A373]/30">
              <span className="text-[10px] font-bold text-[#4A3B32]">Speed:</span>
              {[1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeed(spd)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                    speed === spd ? 'bg-[#4A3B32] text-[#FAEDCD]' : 'text-[#4A3B32]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Spoken Narration Transcript */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D4A373]/30 max-h-36 overflow-y-auto">
            <span className="text-[10px] uppercase font-bold text-[#4A3B32]/70 tracking-wider block mb-1">
              Spoken Narrative Transcript:
            </span>
            <p className="text-xs text-[#1F1814] leading-relaxed italic">
              "{activeListing.audioGuide.transcript}"
            </p>
          </div>

          {/* Ambient Melodic Kalimba Trigger */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#4A3B32]">
            <button
              onClick={() => playKalimbaChime()}
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#C29B38] hover:text-[#9E7D28]"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Chime Indigenous Kalimba Chord</span>
            </button>
            <span className="text-[11px] text-[#4A3B32]/60">Offline audio cached</span>
          </div>
        </div>
      </div>
    </div>
  );
};
