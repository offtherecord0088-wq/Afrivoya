import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Headphones, 
  ArrowRight,
  Sun,
  Flame,
  Globe2
} from 'lucide-react';
import { AFRICAN_COUNTRIES } from '../data/countries';
import { DIRECTORY_LISTINGS } from '../data/directory';

interface HeroSectionProps {
  onSelectCountry: (countryName: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAudioGuide: () => void;
  onOpenSOS: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCountry,
  onNavigateTab,
  onOpenAudioGuide,
  onOpenSOS,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: 'country' | 'listing'; title: string; subtitle: string; id: string }[]>([]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const q = val.toLowerCase();
    const matchedCountries = AFRICAN_COUNTRIES
      .filter((c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({
        type: 'country' as const,
        title: `${c.flag} ${c.name}`,
        subtitle: `${c.region} • Capital: ${c.capital} • ${c.unescoSitesCount} UNESCO Sites`,
        id: c.name,
      }));

    const matchedListings = DIRECTORY_LISTINGS
      .filter((l) => l.title.toLowerCase().includes(q) || l.country.toLowerCase().includes(q) || l.historicalTags.some((t) => t.toLowerCase().includes(q)))
      .slice(0, 4)
      .map((l) => ({
        type: 'listing' as const,
        title: l.title,
        subtitle: `${l.country} • ${l.subcategory}`,
        id: l.country,
      }));

    setSearchResults([...matchedCountries, ...matchedListings]);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAEDCD] via-[#F4F1DE] to-[#FAEDCD] border-b border-[#D4A373]/30">
      {/* Decorative background African patterns & warm sun glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E76F51]/15 to-[#D4A373]/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#BC4749]/10 to-[#C29B38]/20 rounded-full blur-2xl pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4A3B32] text-[#FAEDCD] text-xs font-semibold tracking-wide mb-4 shadow-xs">
          <Globe2 className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Pan-African All-in-One Tourism Platform</span>
          <span className="text-[#D4A373]">|</span>
          <span className="text-amber-300">54 Sovereign Nations</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1814] tracking-tight leading-tight">
            Voyage across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC4749] via-[#E76F51] to-[#C29B38]">Africa</span> without boundaries.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4A3B32]/85 leading-relaxed font-normal">
            From the rock cathedrals of Lalibela to the mist of Victoria Falls and the great savanna migrations: Afrivoya unifies all 54 African countries with AI-assisted dynamic day-by-day itineraries, native audio guides, and real-time satellite SOS safety.
          </p>
        </div>

        {/* Global Live Statistics Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          <div className="bg-white/80 backdrop-blur-xs border border-[#D4A373]/30 rounded-xl p-3 shadow-xs">
            <div className="text-2xl font-black text-[#4A3B32] font-display">54</div>
            <div className="text-xs text-[#4A3B32]/70 font-medium">African Countries Covered</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs border border-[#D4A373]/30 rounded-xl p-3 shadow-xs">
            <div className="text-2xl font-black text-[#C29B38] font-display">145+</div>
            <div className="text-xs text-[#4A3B32]/70 font-medium">UNESCO World Heritage</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs border border-[#D4A373]/30 rounded-xl p-3 shadow-xs">
            <div className="text-2xl font-black text-[#BC4749] font-display">24/7</div>
            <div className="text-xs text-[#4A3B32]/70 font-medium">Satellite Panic SOS Alert</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs border border-[#D4A373]/30 rounded-xl p-3 shadow-xs">
            <div className="text-2xl font-black text-[#E76F51] font-display">100%</div>
            <div className="text-xs text-[#4A3B32]/70 font-medium">Verified Guides & Lodges</div>
          </div>
        </div>

        {/* Interactive Search Bar & Quick Jumper */}
        <div className="mt-8 max-w-2xl relative">
          <div className="relative flex items-center bg-white rounded-2xl border-2 border-[#D4A373] shadow-lg shadow-[#D4A373]/15 overflow-hidden transition-all focus-within:ring-3 focus-within:ring-[#C29B38]/30">
            <div className="pl-4 text-[#D4A373]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by country, ancient kingdom, national park, or festival..."
              className="w-full px-3 py-3.5 text-sm text-[#1F1814] placeholder-[#4A3B32]/50 focus:outline-hidden bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="pr-3 text-xs text-[#4A3B32]/60 hover:text-[#4A3B32]"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => onNavigateTab('itinerary')}
              className="m-1.5 px-4 py-2.5 rounded-xl bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>AI Plan</span>
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#D4A373]/40 shadow-xl overflow-hidden z-30 max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 bg-[#FAEDCD] text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider">
                Matching Results across 54 Nations
              </div>
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectCountry(res.id);
                    setSearchQuery('');
                    setSearchResults([]);
                    onNavigateTab('countries');
                  }}
                  className="px-4 py-2.5 hover:bg-[#FAEDCD]/50 cursor-pointer border-b border-gray-100 last:border-none flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-[#1F1814]">{res.title}</div>
                    <div className="text-xs text-[#4A3B32]/70">{res.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C29B38]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feature Quick Launch Tiles */}
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => onNavigateTab('itinerary')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C29B38] hover:bg-[#B38D2F] text-[#1F1814] text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Itinerary with AI</span>
          </button>

          <button
            onClick={() => onNavigateTab('countries')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-[#4A3B32] border border-[#D4A373]/40 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Globe2 className="w-4 h-4 text-[#C29B38]" />
            <span>Browse All 54 Nations</span>
          </button>

          <button
            onClick={onOpenAudioGuide}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-[#4A3B32] border border-[#D4A373]/40 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Headphones className="w-4 h-4 text-[#E76F51]" />
            <span>Audio Guides & Ambient Kalimba</span>
          </button>

          <button
            onClick={onOpenSOS}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#BC4749]/15 hover:bg-[#BC4749]/25 text-[#BC4749] border border-[#BC4749]/40 text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>SOS Safety & Emergency Suite</span>
          </button>
        </div>
      </div>
    </div>
  );
};
