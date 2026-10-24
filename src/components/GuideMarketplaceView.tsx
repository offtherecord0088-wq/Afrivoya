import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  ShieldCheck, 
  FileCheck, 
  Send, 
  User, 
  Star,
  Smartphone
} from 'lucide-react';
import { MOCK_VERIFIED_GUIDES } from '../data/plans';
import { playKalimbaChime } from '../utils/audio';

export const GuideMarketplaceView: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState(MOCK_VERIFIED_GUIDES[0]);
  const [assignmentStatus, setAssignmentStatus] = useState<Record<string, string>>({
    'assign-1': 'pending',
    'assign-2': 'accepted',
  });
  const [activeChatMsg, setActiveChatMsg] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'guide' | 'tourist'; text: string; time: string }[]>([
    { sender: 'tourist', text: 'Hello Kiprono! We are arriving at Wilson Airport Nairobi on Thursday at 9am. Will you be picking us up in the 4x4 Land Cruiser?', time: '09:14 AM' },
    { sender: 'guide', text: 'Jambo! Yes, I will be waiting at Terminal 2 with an Afrivoya signboard. Pop-up roof vehicle is prepped with cooler box and binoculars ready for the Mara descent.', time: '09:18 AM' },
  ]);

  const handleSendMessage = () => {
    if (!activeChatMsg.trim()) return;
    playKalimbaChime();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'guide', text: activeChatMsg, time: 'Just now' }
    ]);
    setActiveChatMsg('');
  };

  const handleAcceptAssignment = (id: string) => {
    playKalimbaChime();
    setAssignmentStatus((prev) => ({ ...prev, [id]: 'accepted' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#BC4749] uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Tour Guide Marketplace & Accreditation</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            National Guide Registry & Assignment Portal
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            National tourism board verified badges, real-time expedition assignment dispatch, instant Mobile Money payouts (M-Pesa/MTN MoMo), and encrypted tourist communication.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#D4A373]/40 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
            <span>License: KPSGA-GL-2024-889 (Verified Active)</span>
          </span>
        </div>
      </div>

      {/* Guide Credentials & Payout Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="text-xs text-[#4A3B32]/70 font-semibold">Current Month Payouts</div>
          <div className="text-2xl font-black text-emerald-800 font-display mt-2">$2,240</div>
          <div className="text-[11px] text-[#4A3B32]/75 mt-1">Dispatched to Safaricom M-Pesa</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="text-xs text-[#4A3B32]/70 font-semibold">Completed Safari Days</div>
          <div className="text-2xl font-black text-[#1F1814] font-display mt-2">16 Days</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">100% 5-Star Reviews</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="text-xs text-[#4A3B32]/70 font-semibold">Tourist Satisfaction Index</div>
          <div className="text-2xl font-black text-[#C29B38] font-display mt-2">4.99 / 5.0</div>
          <div className="text-[11px] text-[#4A3B32]/75 mt-1">342 verified traveler ratings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="text-xs text-[#4A3B32]/70 font-semibold">Accreditation Tier</div>
          <div className="text-2xl font-black text-[#BC4749] font-display mt-2">Gold Naturalist</div>
          <div className="text-[11px] text-emerald-800 font-bold mt-1">Wilderness First Aid Certified</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tour Assignment Marketplace (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D4A373]/40 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-display font-extrabold text-base text-[#1F1814]">
              Available Safari & Heritage Tour Assignments
            </h3>
            <span className="text-xs bg-[#FAEDCD] text-[#4A3B32] px-2 py-0.5 rounded font-bold">
              Instant Accept
            </span>
          </div>

          {/* Assignment 1 */}
          <div className="p-4 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/30 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#BC4749] tracking-wider block">
                  New Booking Request &bull; Kenya & Tanzania
                </span>
                <h4 className="font-display font-bold text-sm text-[#1F1814]">
                  5-Day Mara-Serengeti Cross-Border Migration Safari
                </h4>
                <div className="text-xs text-[#4A3B32]/80 mt-0.5">
                  Dates: <strong>Nov 14–19, 2026</strong> &bull; Party: 2 Adults (UK) &bull; Vehicle: 4WD Pop-Up
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-emerald-800 font-display">$700</span>
                <span className="text-[10px] text-[#4A3B32]/60 block">($140/day fee)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#4A3B32]/75">
                Specialty needed: Big Cat behavior & Swahili translation
              </span>

              {assignmentStatus['assign-1'] === 'accepted' ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                  ✓ Assignment Confirmed
                </span>
              ) : (
                <button
                  onClick={() => handleAcceptAssignment('assign-1')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold transition-all shadow-xs"
                >
                  Accept Assignment ($700)
                </button>
              )}
            </div>
          </div>

          {/* Assignment 2 */}
          <div className="p-4 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/30 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                  Confirmed Upcoming Safari
                </span>
                <h4 className="font-display font-bold text-sm text-[#1F1814]">
                  Amboseli Elephant Sanctuary & Kilimanjaro Photographic Walk
                </h4>
                <div className="text-xs text-[#4A3B32]/80 mt-0.5">
                  Dates: <strong>Nov 22–24, 2026</strong> &bull; Party: 3 Photographers (USA)
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-emerald-800 font-display">$420</span>
                <span className="text-[10px] text-[#4A3B32]/60 block">Escrow locked</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#4A3B32]/75">
                Client preference: Golden hour dawn departures at 05:45 AM
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                ✓ Ready for Departure
              </span>
            </div>
          </div>
        </div>

        {/* Tourist Direct Messaging Console (Right 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#D4A373]/40 p-5 shadow-xs flex flex-col h-[460px]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#D4A373] text-[#1F1814] flex items-center justify-center font-bold text-xs">
                MJ
              </div>
              <div>
                <div className="text-xs font-bold text-[#1F1814]">Marcus Vance</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Active &bull; Mara Trip #AFR-8821</div>
              </div>
            </div>
            <span className="text-[10px] bg-[#F4F1DE] text-[#4A3B32] px-2 py-0.5 rounded font-mono">
              E2E Encrypted
            </span>
          </div>

          {/* Messages scroll box */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'guide' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'guide'
                      ? 'bg-[#4A3B32] text-[#FAEDCD] rounded-br-none'
                      : 'bg-[#FAEDCD] text-[#1F1814] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#4A3B32]/60 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat input box */}
          <div className="pt-3 border-t border-gray-100 flex items-center space-x-2">
            <input
              type="text"
              value={activeChatMsg}
              onChange={(e) => setActiveChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Send message to traveler..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-[#D4A373]/40 bg-[#FAEDCD]/30 focus:outline-hidden"
            />
            <button
              onClick={handleSendMessage}
              className="p-2.5 rounded-xl bg-[#4A3B32] text-[#FAEDCD] hover:bg-[#332822] transition-colors"
            >
              <Send className="w-4 h-4 text-[#D4A373]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
