import React, { useState } from 'react';
import { 
  Calendar, 
  Music, 
  MapPin, 
  Ticket, 
  Newspaper, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  ArrowRight,
  Flame,
  X
} from 'lucide-react';
import { CulturalEvent, TourismNews } from '../types';
import { CULTURAL_EVENTS, TOURISM_NEWS_FEEDS } from '../data/events';
import { playKalimbaChime } from '../utils/audio';

export const EventsAndCulturalHub: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);
  const [ticketModalEvent, setTicketModalEvent] = useState<CulturalEvent | null>(null);
  const [selectedTicketTier, setSelectedTicketTier] = useState<'Standard' | 'VIP Backstage' | 'Eco-Camping'>('Standard');
  const [ticketConfirmed, setTicketConfirmed] = useState(false);

  const handleBookTicket = () => {
    playKalimbaChime();
    setTicketConfirmed(true);
    setTimeout(() => {
      setTicketConfirmed(false);
      setTicketModalEvent(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-1">
            <Music className="w-3.5 h-3.5" />
            <span>Pan-African Festivals & Cultural Gathering</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            Local Events, Music Festivals & Tourism News
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Discover historic music festivals, contemporary arts biennales, sacred rituals, and real-time tourism policy advisories across the 54 sovereign nations.
          </p>
        </div>
      </div>

      {/* Tourism News Advisory Ticker */}
      <div className="mb-10 bg-[#FAEDCD] rounded-2xl p-5 border border-[#D4A373]/50 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-3">
          <Newspaper className="w-4 h-4 text-[#BC4749]" />
          <span>Pan-African Tourism Policy & Conservation Wire</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {TOURISM_NEWS_FEEDS.map((news) => (
            <div
              key={news.id}
              className="bg-white p-3.5 rounded-xl border border-[#D4A373]/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-[#4A3B32]/70 mb-1">
                  <span className="text-[#BC4749]">{news.category}</span>
                  <span>{news.date}</span>
                </div>
                <h4 className="font-display font-bold text-xs text-[#1F1814] leading-snug">
                  {news.title}
                </h4>
                <p className="text-[11px] text-[#4A3B32]/80 mt-1.5 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-semibold text-[#C29B38]">
                <span>Scope: {news.country}</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Verified AU Feed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Events & Festivals Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display font-extrabold text-xl text-[#1F1814]">
          Premier African Cultural Festivals & Dance Summits
        </h3>
        <span className="text-xs text-[#4A3B32]/70 font-semibold">
          Direct Ticketing & Lineups
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CULTURAL_EVENTS.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-[#D4A373]/30 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C29B38] transition-all flex flex-col"
          >
            {/* Event Poster */}
            <div className="relative h-52 overflow-hidden bg-stone-200">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="bg-[#4A3B32]/90 backdrop-blur-md text-[#FAEDCD] text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4A373]/40 shadow-xs">
                  {event.country} &bull; {event.city}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="bg-[#BC4749] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {event.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[11px] text-[#D4A373] font-semibold flex items-center space-x-1 mb-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{event.date}</span>
                </div>
                <h4 className="font-display font-extrabold text-base leading-tight">
                  {event.title}
                </h4>
              </div>
            </div>

            {/* Event Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-[#4A3B32]/85 line-clamp-3 leading-relaxed">
                {event.description}
              </p>

              {/* Performer Highlights */}
              <div className="bg-[#FAEDCD]/40 p-2.5 rounded-xl border border-[#D4A373]/20">
                <span className="text-[10px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-1">
                  Artist & Headliner Highlights:
                </span>
                <div className="flex flex-wrap gap-1">
                  {event.performerHighlights.map((art, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white text-[#4A3B32] px-2 py-0.5 rounded-md border border-[#D4A373]/30 font-medium"
                    >
                      {art}
                    </span>
                  ))}
                </div>
              </div>

              {/* Venue & Organizer */}
              <div className="text-[11px] text-[#4A3B32]/75 space-y-0.5">
                <div>Venue: <strong>{event.venue}</strong></div>
                <div>Curated by: {event.verifiedOrganizer}</div>
              </div>

              {/* Pricing & Booking Button */}
              <div className="pt-3 border-t border-[#D4A373]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#4A3B32]/60 block -mb-0.5">Official Passes From</span>
                  <span className="text-lg font-black text-[#BC4749] font-display">
                    ${event.ticketPriceUSD}
                  </span>
                </div>

                <button
                  onClick={() => {
                    playKalimbaChime();
                    setTicketModalEvent(event);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Reserve Passes</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Checkout Modal */}
      {ticketModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6ED] rounded-3xl max-w-md w-full border-2 border-[#D4A373] p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setTicketModalEvent(null)}
              className="absolute top-4 right-4 text-[#4A3B32]/70 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-[#D4A373]/30">
              <span className="text-xs uppercase font-bold text-[#BC4749] tracking-wider block">
                Official Festival Ticketing
              </span>
              <h3 className="font-display font-extrabold text-xl text-[#1F1814] mt-0.5">
                {ticketModalEvent.title}
              </h3>
              <p className="text-xs text-[#4A3B32]/70 mt-1">
                {ticketModalEvent.venue} &bull; {ticketModalEvent.date}
              </p>
            </div>

            {/* Ticket Tier Selection */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block">
                Choose Access Tier:
              </span>

              {[
                { tier: 'Standard' as const, price: ticketModalEvent.ticketPriceUSD, desc: 'Full event entry & main stage access' },
                { tier: 'VIP Backstage' as const, price: ticketModalEvent.ticketPriceUSD + 65, desc: 'Lounge access, fast-track entry & complimentary Swahili tapas' },
                { tier: 'Eco-Camping' as const, price: ticketModalEvent.ticketPriceUSD + 40, desc: 'Includes pre-pitched eco-tent & hot solar showers' },
              ].map((item) => (
                <div
                  key={item.tier}
                  onClick={() => setSelectedTicketTier(item.tier)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTicketTier === item.tier
                      ? 'bg-white border-[#C29B38] ring-2 ring-[#C29B38]/30 shadow-xs'
                      : 'bg-[#FAEDCD]/40 border-[#D4A373]/30 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#1F1814]">{item.tier} Pass</div>
                    <div className="text-[10px] text-[#4A3B32]/70">{item.desc}</div>
                  </div>
                  <span className="text-sm font-extrabold text-[#BC4749]">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Instant Mobile Money / Card Notice */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-[#D4A373]/30 text-xs text-[#4A3B32]">
              <span className="font-bold text-[#C29B38] block mb-0.5">Instant Mobile Money & Card Delivery</span>
              <p className="text-[11px] text-[#4A3B32]/80">
                Tickets are digitally minted with QR code and SMS verification compatible with M-Pesa, MTN MoMo, Paystack, and Apple Pay.
              </p>
            </div>

            {/* Checkout Action */}
            <div className="mt-5">
              {ticketConfirmed ? (
                <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-center text-xs font-bold flex items-center justify-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Passes issued! QR code dispatched to your phone.</span>
                </div>
              ) : (
                <button
                  onClick={handleBookTicket}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C29B38] to-[#D4A373] hover:brightness-105 active:scale-98 text-[#1F1814] font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Confirm Reservation ({selectedTicketTier})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
