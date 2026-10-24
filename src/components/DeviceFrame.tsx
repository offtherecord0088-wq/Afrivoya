import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

interface DeviceFrameProps {
  mode: 'responsive' | 'iphone' | 'galaxy';
  onExitFrame: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  mode,
  onExitFrame,
  children,
}) => {
  if (mode === 'responsive') {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  const isIPhone = mode === 'iphone';

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-2 sm:p-6">
      {/* Top Bar with Exit Button */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-4 text-stone-300 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">
            {isIPhone ? 'Apple iPhone 16 Pro (Edge-to-Edge iOS Simulator)' : 'Samsung Galaxy S25 Ultra (Android 1.2.2+ Engine)'}
          </span>
        </div>

        <button
          onClick={onExitFrame}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-semibold transition-colors flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Full Web View</span>
        </button>
      </div>

      {/* Realistic Mobile Device Mockup Bezel */}
      <div
        className={`w-full max-w-[430px] h-[880px] bg-black rounded-[52px] p-3 shadow-2xl relative border-4 flex flex-col overflow-hidden ${
          isIPhone ? 'border-stone-700 ring-4 ring-stone-800' : 'border-stone-800 ring-4 ring-stone-900 rounded-[38px]'
        }`}
      >
        {/* Device Notch / Dynamic Island / Hole Punch */}
        <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-between px-8 text-white text-[12px] font-semibold select-none pointer-events-none">
          <span>09:41</span>

          {isIPhone ? (
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-center space-x-2 px-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#BC4749]"></span>
              <span className="text-[10px] text-white/80 font-mono">Afrivoya</span>
            </div>
          ) : (
            <div className="w-3.5 h-3.5 bg-black rounded-full border border-stone-800"></div>
          )}

          <div className="flex items-center space-x-1 text-white">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Screen Viewport with internal scrolling */}
        <div className="flex-1 bg-[#FAF6ED] rounded-[42px] overflow-y-auto overflow-x-hidden pt-10 pb-6 relative scrollbar-none">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-white/40 rounded-full pointer-events-none z-50" />
      </div>
    </div>
  );
};
