import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Star, 
  Volume2, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Tag, 
  Plus, 
  Check, 
  Filter, 
  Info,
  Trees,
  Landmark,
  Hotel,
  X
} from 'lucide-react';
import { DirectoryListing, ListingCategory } from '../types';
import { DIRECTORY_LISTINGS } from '../data/directory';
import { playKalimbaChime } from '../utils/audio';

interface DirectoryExplorerProps {
  onPlayAudioListing: (listing: DirectoryListing) => void;
  onAddToItinerary: (listing: DirectoryListing) => void;
  selectedIdsInItinerary: string[];
}

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = ({
  onPlayAudioListing,
  onAddToItinerary,
  selectedIdsInItinerary,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeModalListing, setActiveModalListing] = useState<DirectoryListing | null>(null);
  const [offlineSavedIds, setOfflineSavedIds] = useState<string[]>(['heritage-lalibela', 'wildlife-serengeti-mara']);

  const categories = [
    { id: 'all', label: 'All Pan-African Listings', icon: Compass },
    { id: 'heritage', label: 'Heritage & Ancient Kingdoms', icon: Landmark },
    { id: 'wildlife', label: 'Wildlife & Nature Sanctuaries', icon: Trees },
    { id: 'stay', label: 'Eco-Lodges & Heritage Riads', icon: Hotel },
  ];

  const filteredListings = DIRECTORY_LISTINGS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
    return matchesCat && matchesRegion;
  });

  const toggleOfflineSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playKalimbaChime();
    setOfflineSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C29B38] uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Pan-African Heritage & Nature Directory</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            Living Heritage, Wildlife & Sustainable Hospitality
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Curated databases supporting GPS coordinates, historical significance tags, native audio guides, and offline cache for remote savanna and mountain expeditions.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5 bg-[#F4F1DE] p-1.5 rounded-xl border border-[#D4A373]/30">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playKalimbaChime();
                  setSelectedCategory(cat.id as any);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#4A3B32] text-[#FAEDCD] shadow-xs'
                    : 'text-[#4A3B32] hover:bg-[#FAEDCD]/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => {
          const isAdded = selectedIdsInItinerary.includes(listing.id);
          const isOffline = offlineSavedIds.includes(listing.id);

          return (
            <div
              key={listing.id}
              onClick={() => setActiveModalListing(listing)}
              className="bg-white rounded-2xl border border-[#D4A373]/30 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C29B38] transition-all flex flex-col group cursor-pointer"
            >
              {/* Media Card Header */}
              <div className="relative h-52 overflow-hidden bg-stone-200">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Country Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="bg-[#4A3B32]/90 backdrop-blur-md text-[#FAEDCD] text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4A373]/40 shadow-xs">
                    {listing.country}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {listing.gpsCoords.lat.toFixed(2)}°, {listing.gpsCoords.lng.toFixed(2)}°
                  </span>
                </div>

                {/* Quick Audio & Offline Buttons */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudioListing(listing);
                    }}
                    className="p-2 rounded-full bg-[#D4A373] text-[#1F1814] hover:bg-[#C29B38] shadow-md transition-all active:scale-95 flex items-center space-x-1"
                    title="Play Audio Guide Narration"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold pr-0.5">{listing.audioGuide.duration}</span>
                  </button>

                  <button
                    onClick={(e) => toggleOfflineSave(listing.id, e)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isOffline
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/50 text-white/80 hover:bg-black/70'
                    }`}
                    title={isOffline ? 'Cached for offline use' : 'Save to offline pack'}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title & Subcategory overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A373] block mb-0.5">
                    {listing.subcategory}
                  </span>
                  <h3 className="font-display font-extrabold text-base leading-tight drop-shadow-xs">
                    {listing.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-[#4A3B32]/85 line-clamp-2 leading-relaxed">
                  {listing.description}
                </p>

                {/* Historical Tags */}
                <div className="flex flex-wrap gap-1">
                  {listing.historicalTags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-[#FAEDCD] text-[#4A3B32] px-2 py-0.5 rounded-md border border-[#D4A373]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-[#D4A373]/20 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-[#C29B38]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-extrabold text-[#1F1814]">{listing.rating}</span>
                    <span className="text-[#4A3B32]/60 text-[11px]">({listing.reviewsCount})</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#4A3B32]/60 block -mb-0.5">
                      {listing.category === 'stay' ? 'Price / Night' : 'Entrance / Permit'}
                    </span>
                    <span className="font-extrabold text-sm text-[#BC4749]">
                      ${listing.entranceFeeUSD}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudioListing(listing);
                    }}
                    className="py-2 px-3 rounded-xl bg-[#FAEDCD] hover:bg-[#F4F1DE] text-[#4A3B32] text-xs font-bold flex items-center justify-center space-x-1.5 transition-all border border-[#D4A373]/40"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>Audio Guide</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToItinerary(listing);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Itinerary</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>Add to Trip</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {activeModalListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#D4A373] shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalListing(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-72">
              <img
                src={activeModalListing.image}
                alt={activeModalListing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-[#D4A373]">
                  {activeModalListing.subcategory} &bull; {activeModalListing.country}
                </span>
                <h3 className="font-display font-extrabold text-2xl drop-shadow-md">
                  {activeModalListing.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Backstory & Narrative */}
              <div>
                <h4 className="font-display font-bold text-sm text-[#1F1814] uppercase tracking-wider mb-2">
                  Historical & Cultural Significance
                </h4>
                <p className="text-xs text-[#4A3B32]/90 leading-relaxed bg-[#FAEDCD]/30 p-4 rounded-xl border border-[#D4A373]/30">
                  {activeModalListing.description}
                </p>
              </div>

              {/* Audio Guide Excerpt */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#F4F1DE] to-[#FAEDCD] border border-[#D4A373]/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#4A3B32]">
                    <Volume2 className="w-4 h-4 text-[#BC4749]" />
                    <span>Audio Guide: "{activeModalListing.audioGuide.title}"</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#4A3B32] text-[#FAEDCD] px-2 py-0.5 rounded">
                    {activeModalListing.audioGuide.duration}
                  </span>
                </div>
                <p className="text-xs italic text-[#4A3B32]/85 leading-relaxed line-clamp-3">
                  "{activeModalListing.audioGuide.transcript}"
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#4A3B32]/70">
                    Voice Tone: <strong>{activeModalListing.audioGuide.tone}</strong>
                  </span>
                  <button
                    onClick={() => {
                      onPlayAudioListing(activeModalListing);
                      setActiveModalListing(null);
                    }}
                    className="text-xs font-bold text-[#BC4749] hover:underline flex items-center space-x-1"
                  >
                    <span>Launch Full Player</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Metadata Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F4F1DE] p-3 rounded-xl border border-[#D4A373]/20">
                  <span className="text-[10px] text-[#4A3B32]/70 uppercase font-bold block">Best Time to Visit</span>
                  <span className="font-bold text-[#1F1814]">{activeModalListing.bestTimeToVisit}</span>
                </div>

                <div className="bg-[#F4F1DE] p-3 rounded-xl border border-[#D4A373]/20">
                  <span className="text-[10px] text-[#4A3B32]/70 uppercase font-bold block">Verified Partner Agency</span>
                  <span className="font-bold text-[#1F1814] flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    <span>{activeModalListing.verifiedAgency}</span>
                  </span>
                </div>
              </div>

              {/* Amenities */}
              {activeModalListing.amenities && (
                <div>
                  <span className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block mb-2">
                    Included Amenities & Facilities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalListing.amenities.map((am, i) => (
                      <span key={i} className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-md font-medium">
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Modal Footer */}
              <div className="pt-4 border-t border-[#D4A373]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#4A3B32]/70 block">Estimated Rate</span>
                  <span className="text-2xl font-black text-[#BC4749] font-display">
                    ${activeModalListing.entranceFeeUSD}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onAddToItinerary(activeModalListing);
                    setActiveModalListing(null);
                  }}
                  className="py-3 px-6 rounded-xl bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold shadow-md transition-all"
                >
                  {selectedIdsInItinerary.includes(activeModalListing.id)
                    ? 'Remove from Itinerary'
                    : 'Add to My Voyage Itinerary'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
