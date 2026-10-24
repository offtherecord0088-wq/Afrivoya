import React from 'react';
import { Compass, ShieldAlert, Globe, Heart, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenSubscription: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenSOS,
  onOpenSubscription,
}) => {
  return (
    <footer className="bg-[#1F1814] text-[#FAEDCD] pt-12 pb-8 border-t border-[#D4A373]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4A373] to-[#C29B38] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#1F1814]" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Afri<span className="text-[#D4A373]">voya</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pan-African All-in-One Tourism Platform uniting all 54 sovereign nations with dynamic AI itineraries, living cultural heritage, and 24/7 satellite emergency safety.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              Savannah Grass Gold &bull; Deep Acacia Wood &bull; Terracotta
            </div>
          </div>

          {/* Core Modules Col */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#D4A373] mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigateTab('countries')} className="hover:text-white transition-colors">
                  54 Sovereign Nations Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('directory')} className="hover:text-white transition-colors">
                  UNESCO Heritage & Wildlife Parks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('itinerary')} className="hover:text-white transition-colors">
                  Smart AI Itinerary Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('events')} className="hover:text-white transition-colors">
                  Cultural Festivals & Music Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('architecture')} className="hover:text-white transition-colors">
                  Technical Architecture & Specs
                </button>
              </li>
            </ul>
          </div>

          {/* User Tiers & Subscriptions */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#D4A373] mb-3">
              Subscriptions & Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={onOpenSubscription} className="hover:text-white transition-colors">
                  Tourist Annual Pass ($200/yr)
                </button>
              </li>
              <li>
                <button onClick={onOpenSubscription} className="hover:text-white transition-colors">
                  Tourism Agency License ($500/yr)
                </button>
              </li>
              <li>
                <button onClick={onOpenSubscription} className="hover:text-white transition-colors">
                  Tourist Guide Accreditation ($100/yr)
                </button>
              </li>
              <li>
                <span className="text-stone-500 block pt-1">
                  Supported Gateways: Flutterwave, Paystack, M-Pesa, MTN MoMo, Orange Money, Stripe
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency Safety Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#BC4749] mb-3 flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safety & SOS Network</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Active across all 54 nations. Connects directly with local tourism police command and regional air ambulances.
            </p>
            <button
              onClick={onOpenSOS}
              className="w-full py-2.5 px-3 rounded-xl bg-[#BC4749] hover:bg-[#A23A3C] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-red-950 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Launch SOS Distress Beacon</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            &copy; 2026–2027 Afrivoya Inc. &bull; Pan-African Tourism Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>&bull;</span>
            <span>AES-256 Encrypted</span>
            <span>&bull;</span>
            <span>All 54 African Nations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
