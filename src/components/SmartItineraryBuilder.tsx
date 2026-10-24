import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  Hotel, 
  Utensils, 
  CheckCircle2, 
  ShieldAlert, 
  Luggage, 
  Share2, 
  Printer, 
  Download, 
  Compass, 
  ArrowRight,
  Loader2,
  DollarSign,
  Fuel,
  Users
} from 'lucide-react';
import { ItineraryPlan, DayItinerary } from '../types';
import { AFRICAN_COUNTRIES } from '../data/countries';
import { DIRECTORY_LISTINGS } from '../data/directory';
import { playKalimbaChime } from '../utils/audio';

interface SmartItineraryBuilderProps {
  initialCountry?: string;
  onOpenSOS: () => void;
}

export const SmartItineraryBuilder: React.FC<SmartItineraryBuilderProps> = ({
  initialCountry,
  onOpenSOS,
}) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    initialCountry || 'Kenya',
    'Tanzania'
  ]);
  const [daysCount, setDaysCount] = useState<number>(5);
  const [travelStyle, setTravelStyle] = useState('Safari & Cultural Heritage');
  const [budgetTier, setBudgetTier] = useState('Premium Eco-Lodge');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<string | null>(null);

  // Default curated plan
  const [itinerary, setItinerary] = useState<ItineraryPlan>({
    title: 'The Great Savanna Arc: Maasai Mara to Serengeti & Ngorongoro',
    summary: 'An unparalleled 5-day cross-border expedition uniting the world-famous Great Migration plains, pristine acacia woodlands, and ancient Ngorongoro caldera.',
    totalEstCostUSD: 3650,
    transportModes: ['Safari 4x4 Land Cruiser with pop-up roof', 'Scenic Bush Flight Charter', 'Traditional Dhow Sundowner'],
    days: [
      {
        dayNumber: 1,
        dateLabel: 'Day 1',
        region: 'Nairobi to Maasai Mara National Reserve, Kenya',
        theme: 'Descent into the Great Rift Valley & Sunset Sundowner',
        morning: {
          time: '07:30 AM',
          title: '4x4 Departure via Great Rift Valley Escarpment',
          desc: 'Scenic descent into the floor of the Great Rift Valley with viewpoint stop overlooking Mount Longonot and Maasai herds.',
          type: 'transit_viewpoint',
          estCostUSD: 45,
        },
        afternoon: {
          time: '01:30 PM',
          title: 'Swahili Farm-to-Table Lunch & Camp Orientation',
          desc: 'Arrive at Angama Mara rim; enjoy roasted tilapia, coconut sukuma wiki, and briefing on elephant conservation corridors.',
          type: 'culinary',
          estCostUSD: 35,
        },
        evening: {
          time: '04:30 PM',
          title: 'Golden Hour Maiden Game Drive & Boma Sundowner',
          desc: 'Spot prides of lions on kopjes and sprawling zebra herds. Sunset drinks on Out of Africa hill overlooking the boundless Mara triangle.',
          type: 'safari',
          estCostUSD: 85,
        },
        accommodation: {
          name: 'Angama Mara Suspended Eco-Lodge',
          type: 'Luxury Eco-Lodge',
          rating: 4.98,
          estPricePerNightUSD: 950,
          ecoCertified: true,
        },
        transitNotes: '240 km / 4.5 hrs via Narok highway. Pop-up roof safari vehicle recommended.',
      },
      {
        dayNumber: 2,
        dateLabel: 'Day 2',
        region: 'Maasai Mara, Kenya',
        theme: 'Dawn River Crossing Tracking & Indigenous Ethnobotany Walk',
        morning: {
          time: '06:00 AM',
          title: 'Dawn Big Cat Patrol & Mara River Hippos',
          desc: 'Track cheetah brothers hunting in early morning thermals and observe 60-strong hippo pods basking along the Mara River.',
          type: 'wildlife',
          estCostUSD: 85,
        },
        afternoon: {
          time: '01:00 PM',
          title: 'Picnic Beneath Wild Olive Trees & Elder Storytelling',
          desc: 'Bush picnic with local Maasai warrior naturalist explaining traditional medicinal plant cures and beadwork symbology.',
          type: 'cultural',
          estCostUSD: 40,
        },
        evening: {
          time: '06:30 PM',
          title: 'Night Sky Stargazing with Astro-Biologists',
          desc: 'Unpolluted African celestial telescope viewing of the Southern Cross, Jupiter, and indigenous star navigation lore.',
          type: 'astronomy',
          estCostUSD: 30,
        },
        accommodation: {
          name: 'Mara Bush Safari Sanctuary',
          type: 'Luxury Tented Camp',
          rating: 4.94,
          estPricePerNightUSD: 680,
          ecoCertified: true,
        },
        transitNotes: '100% off-road conservancy tracks. 4WD low gear active.',
      },
      {
        dayNumber: 3,
        dateLabel: 'Day 3',
        region: 'Isebania Border to Northern Serengeti, Tanzania',
        theme: 'Pan-African Border Crossing & Endless Plains Entry',
        morning: {
          time: '08:00 AM',
          title: 'Cross-Border Transit via East Africa Tourist Visa',
          desc: 'Smooth biometric border clearance at Isebania with dedicated Afrivoya expedited agent. Entry into Northern Serengeti National Park.',
          type: 'border_transit',
          estCostUSD: 60,
        },
        afternoon: {
          time: '01:30 PM',
          title: 'Nyama Choma & Serengeti Rock Kopje Exploration',
          desc: 'Tanzanian spiced grilled barbecue lunch followed by boulder scrambling to view leopard resting spots.',
          type: 'culinary_safari',
          estCostUSD: 45,
        },
        evening: {
          time: '05:30 PM',
          title: 'Sunset Game Drive & Campfire Drum Circles',
          desc: 'Vast herds of wildebeest streaming south. Evening fireside acoustic percussion and Swahili songs.',
          type: 'safari_culture',
          estCostUSD: 50,
        },
        accommodation: {
          name: 'Singita Serengeti Plains Retreat',
          type: 'Sustainable Safari Sanctuary',
          rating: 4.97,
          estPricePerNightUSD: 850,
          ecoCertified: true,
        },
        transitNotes: '160 km gravel and paved road. 3.5 hrs including friendly border checkpoint.',
      },
      {
        dayNumber: 4,
        dateLabel: 'Day 4',
        region: 'Central Serengeti (Seronera Valley), Tanzania',
        theme: 'Hot Air Balloon Sunrise Safari & Predator Tracking',
        morning: {
          time: '05:30 AM',
          title: 'Champagne Hot Air Balloon Flight Over Savanna',
          desc: 'Silently float 1,000 feet above the awakening plains at dawn, witnessing wildlife herds scattering like ripples of gold.',
          type: 'hot_air_balloon',
          estCostUSD: 550,
        },
        afternoon: {
          time: '01:00 PM',
          title: 'Seronera Wildlife Research Centre & Cheetah Habitats',
          desc: 'Visit conservation biologists mapping genetic corridors for East African cheetahs.',
          type: 'conservation',
          estCostUSD: 30,
        },
        evening: {
          time: '06:00 PM',
          title: 'Boma Lantern Dinner Beneath Acacia Trees',
          desc: 'Four-course Tanzanian fusion dinner with organic estate wines from Dodoma.',
          type: 'fine_dining',
          estCostUSD: 70,
        },
        accommodation: {
          name: 'Kubu Kubu Tented Lodge',
          type: 'Tented Eco-Lodge',
          rating: 4.92,
          estPricePerNightUSD: 520,
          ecoCertified: true,
        },
        transitNotes: '90 km game drive trails. Speeds strictly limited to 35 km/h for wildlife safety.',
      },
      {
        dayNumber: 5,
        dateLabel: 'Day 5',
        region: 'Ngorongoro Crater, Tanzania',
        theme: 'Descent into the World\'s Greatest Intact Volcanic Caldera',
        morning: {
          time: '06:30 AM',
          title: 'Crater Floor Safari & Endangered Black Rhino Quest',
          desc: 'Descend 600 vertical meters into the caldera amphitheater hosting 25,000 large mammals and rare black rhinos.',
          type: 'geological_safari',
          estCostUSD: 100,
        },
        afternoon: {
          time: '01:00 PM',
          title: 'Lake Magadi Flamingo Shoreline Bush Lunch',
          desc: 'Lunch overlooking thousands of lesser flamingos tinting the alkaline lake shores vivid pastel pink.',
          type: 'culinary_views',
          estCostUSD: 40,
        },
        evening: {
          time: '05:30 PM',
          title: 'Climb to Crater Rim & Celebration Sundowner',
          desc: 'Farewell toast overlooking the ancient crater with certified guide team and transfer to Kilimanjaro International Airport.',
          type: 'farewell',
          estCostUSD: 35,
        },
        accommodation: {
          name: 'Ngorongoro Crater Conservation Lodge',
          type: 'Eco-Architecture Lodge',
          rating: 4.96,
          estPricePerNightUSD: 790,
          ecoCertified: true,
        },
        transitNotes: 'Steep winding caldera ascent. 4x4 low range transmission mandatory.',
      },
    ],
    safetyAdvisories: [
      'Carry offline GPS cache—network connectivity drops inside Ngorongoro Caldera floor.',
      'Take recommended malaria prophylaxis (Malarone/Doxycycline) before safari arrival.',
      'Ensure East Africa Tourist Visa (valid for Kenya, Rwanda, Uganda) or separate Tanzania eVisa is printed.',
      'Wear neutral khaki, brown, or olive attire—avoid dark blue/black which attracts tsetse flies.',
    ],
    packingHighlights: [
      'Lightweight binoculars (8x42 or 10x42 magnification)',
      'High SPF 50+ mineral sunscreen and wide-brimmed safari hat with chin cord',
      'Universal Type G (UK 3-pin) and Type D electrical power adapter',
      'Warm fleece jacket for chilly crater rim dawns (elevations over 2,200m)',
    ],
  });

  // Call Server-Side Gemini endpoint or fallback
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    playKalimbaChime();

    try {
      const res = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countries: selectedCountries,
          days: daysCount,
          travelStyle,
          budgetTier,
          travelersCount,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.days && data.days.length > 0) {
          setItinerary(data);
          setSelectedDayIdx(0);
        }
      }
    } catch (err) {
      console.warn('Using rich fallback itinerary', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimulateBooking = (type: string, title: string) => {
    playKalimbaChime();
    setBookingConfirmation(`Confirmed reservation for "${title}" via verified Pan-African partners.`);
    setTimeout(() => {
      setBookingConfirmation(null);
    }, 4000);
  };

  const activeDay = itinerary.days[selectedDayIdx] || itinerary.days[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C29B38] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dynamic AI-Assisted Planner</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            Smart Itinerary Builder & Transit Router
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Automatically connects Accommodation ➔ Guided Activities ➔ Local Dining ➔ Route & Transit Navigation across all 54 African countries with direct booking APIs.
          </p>
        </div>

        {/* Global Export & Share Buttons */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs font-bold text-[#4A3B32] hover:bg-[#FAEDCD] transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Share & Export Voucher</span>
          </button>
        </div>
      </div>

      {/* Booking Toast Confirmation */}
      {bookingConfirmation && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-900 text-emerald-100 border border-emerald-700 flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">{bookingConfirmation}</span>
          </div>
          <button
            onClick={() => setBookingConfirmation(null)}
            className="text-xs text-emerald-300 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Control Configuration Panel */}
      <div className="bg-white rounded-2xl border-2 border-[#D4A373]/50 p-6 shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Countries multi-select */}
          <div className="lg:col-span-2">
            <label className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-1">
              Select African Country / Multi-Country:
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#FAEDCD]/40 rounded-xl border border-[#D4A373]/30 min-h-[44px]">
              {selectedCountries.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center space-x-1 text-xs bg-[#4A3B32] text-[#FAEDCD] px-2.5 py-1 rounded-lg font-semibold"
                >
                  <span>{c}</span>
                  <button
                    onClick={() => {
                      if (selectedCountries.length > 1) {
                        setSelectedCountries(selectedCountries.filter((item) => item !== c));
                      }
                    }}
                    className="hover:text-red-300 text-xs ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}

              <select
                onChange={(e) => {
                  if (e.target.value && !selectedCountries.includes(e.target.value)) {
                    setSelectedCountries([...selectedCountries, e.target.value]);
                  }
                }}
                className="text-xs bg-transparent text-[#4A3B32] font-semibold focus:outline-hidden cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>+ Add Country</option>
                {AFRICAN_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.flag} {country.name} ({country.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Days Count */}
          <div>
            <label className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-1">
              Expedition Length:
            </label>
            <div className="flex items-center bg-[#F4F1DE] rounded-xl border border-[#D4A373]/30 p-1">
              {[3, 5, 7, 10].map((d) => (
                <button
                  key={d}
                  onClick={() => setDaysCount(d)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    daysCount === d
                      ? 'bg-[#4A3B32] text-[#FAEDCD]'
                      : 'text-[#4A3B32] hover:text-[#1F1814]'
                  }`}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-1">
              Travel Philosophy:
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full text-xs font-medium text-[#4A3B32] bg-[#F4F1DE] p-2.5 rounded-xl border border-[#D4A373]/30 focus:outline-hidden"
            >
              <option value="Safari & Cultural Heritage">Big Five Safari & Heritage</option>
              <option value="Ancient Kingdoms & UNESCO">Ancient Kingdoms & UNESCO</option>
              <option value="Luxury Eco-Glamping & Wine">Luxury Eco-Glamping & Wine</option>
              <option value="Overland 4x4 Expedition">Overland 4x4 Wilderness</option>
              <option value="Coastal Dhow & Marine">Tropical Coastal Dhow & Coral</option>
            </select>
          </div>

          {/* AI Generator CTA */}
          <div>
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#BC4749] via-[#E76F51] to-[#C29B38] hover:brightness-105 active:scale-98 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-[#BC4749]/30 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Itinerary Title & High-level Summary */}
      <div className="bg-gradient-to-r from-[#FAEDCD] to-[#F4F1DE] rounded-2xl p-6 border border-[#D4A373]/40 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#BC4749] tracking-wider block mb-1">
              Afrivoya Generated Expedition Route &bull; {selectedCountries.join(' & ')}
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-3xl text-[#1F1814]">
              {itinerary.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#4A3B32]/90 leading-relaxed max-w-3xl">
              {itinerary.summary}
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-[#D4A373]/40 shadow-xs text-center md:text-right shrink-0">
            <span className="text-[10px] text-[#4A3B32]/70 font-semibold uppercase block">Est. Voyage Budget</span>
            <span className="text-2xl font-black text-[#BC4749] font-display">
              ${itinerary.totalEstCostUSD.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-800 font-medium block">
              For {travelersCount} Travelers (${Math.round(itinerary.totalEstCostUSD / travelersCount)}/person)
            </span>
          </div>
        </div>

        {/* Transport Modes Badges */}
        <div className="mt-4 pt-3 border-t border-[#D4A373]/30 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#4A3B32] flex items-center space-x-1">
            <Fuel className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Connected Transit:</span>
          </span>
          {itinerary.transportModes.map((mode, i) => (
            <span
              key={i}
              className="text-xs bg-white text-[#4A3B32] px-2.5 py-1 rounded-lg border border-[#D4A373]/30 font-medium"
            >
              ✓ {mode}
            </span>
          ))}
        </div>
      </div>

      {/* Day Picker Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {itinerary.days.map((day, idx) => {
          const isSelected = selectedDayIdx === idx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => {
                playKalimbaChime();
                setSelectedDayIdx(idx);
              }}
              className={`px-4 py-2.5 rounded-xl text-left whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? 'bg-[#4A3B32] text-[#FAEDCD] border-[#4A3B32] shadow-md'
                  : 'bg-white text-[#4A3B32] hover:bg-[#FAEDCD]/60 border-[#D4A373]/30'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                {day.dateLabel}
              </div>
              <div className="text-xs font-bold truncate max-w-[140px]">
                {day.region.split(',')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Card Layout: Morning ➔ Afternoon ➔ Evening ➔ Accommodation */}
      {activeDay && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Day Timeline (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/40 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4A373]/20">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#BC4749] text-white px-2.5 py-0.5 rounded-md">
                    {activeDay.dateLabel}
                  </span>
                  <span className="text-xs text-[#4A3B32]/70 font-semibold">
                    Region: {activeDay.region}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#C29B38] italic">
                  Theme: {activeDay.theme}
                </span>
              </div>

              {/* Time Slots */}
              <div className="mt-5 space-y-5">
                {/* Morning */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 shrink-0 text-right pt-0.5">
                    <span className="font-mono text-xs font-bold text-[#4A3B32] block">
                      {activeDay.morning.time}
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold uppercase">Morning</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#C29B38] mt-1.5 shrink-0 ring-4 ring-[#FAEDCD]" />
                  <div className="flex-1 bg-[#FAEDCD]/30 p-3.5 rounded-xl border border-[#D4A373]/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-[#1F1814]">
                        {activeDay.morning.title}
                      </h4>
                      <span className="text-xs font-bold text-[#BC4749]">
                        ${activeDay.morning.estCostUSD}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A3B32]/85 leading-relaxed">
                      {activeDay.morning.desc}
                    </p>
                  </div>
                </div>

                {/* Afternoon */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 shrink-0 text-right pt-0.5">
                    <span className="font-mono text-xs font-bold text-[#4A3B32] block">
                      {activeDay.afternoon.time}
                    </span>
                    <span className="text-[10px] text-orange-700 font-bold uppercase">Afternoon</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#E76F51] mt-1.5 shrink-0 ring-4 ring-[#FAEDCD]" />
                  <div className="flex-1 bg-[#FAEDCD]/30 p-3.5 rounded-xl border border-[#D4A373]/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-[#1F1814]">
                        {activeDay.afternoon.title}
                      </h4>
                      <span className="text-xs font-bold text-[#BC4749]">
                        ${activeDay.afternoon.estCostUSD}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A3B32]/85 leading-relaxed">
                      {activeDay.afternoon.desc}
                    </p>
                  </div>
                </div>

                {/* Evening */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 shrink-0 text-right pt-0.5">
                    <span className="font-mono text-xs font-bold text-[#4A3B32] block">
                      {activeDay.evening.time}
                    </span>
                    <span className="text-[10px] text-[#BC4749] font-bold uppercase">Evening</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#BC4749] mt-1.5 shrink-0 ring-4 ring-[#FAEDCD]" />
                  <div className="flex-1 bg-[#FAEDCD]/30 p-3.5 rounded-xl border border-[#D4A373]/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-[#1F1814]">
                        {activeDay.evening.title}
                      </h4>
                      <span className="text-xs font-bold text-[#BC4749]">
                        ${activeDay.evening.estCostUSD}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A3B32]/85 leading-relaxed">
                      {activeDay.evening.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transit & Driving Notes */}
              <div className="mt-5 p-3 rounded-xl bg-[#F4F1DE] border border-[#D4A373]/30 flex items-center space-x-2 text-xs text-[#4A3B32]">
                <Car className="w-4 h-4 text-[#C29B38] shrink-0" />
                <span>
                  <strong>Transit & Route Notes:</strong> {activeDay.transitNotes}
                </span>
              </div>
            </div>
          </div>

          {/* Overnight Accommodation & Booking Desk (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Overnight Eco-Lodge Card */}
            <div className="bg-white rounded-2xl border-2 border-[#D4A373]/40 p-5 shadow-sm">
              <span className="text-[11px] font-bold text-[#C29B38] uppercase tracking-wider block mb-1">
                Connected Overnight Accommodation
              </span>
              <h4 className="font-display font-bold text-base text-[#1F1814]">
                {activeDay.accommodation.name}
              </h4>
              <div className="text-xs text-[#4A3B32]/75 mt-0.5">
                Type: {activeDay.accommodation.type} &bull; Rating: ★ {activeDay.accommodation.rating}
              </div>

              <div className="mt-3 p-3 bg-[#FAEDCD]/50 rounded-xl border border-[#D4A373]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#4A3B32]/70 block">Verified Rate</span>
                  <span className="text-lg font-black text-[#BC4749] font-display">
                    ${activeDay.accommodation.estPricePerNightUSD}
                  </span>
                  <span className="text-[10px] text-[#4A3B32]/60 block">/ night</span>
                </div>
                {activeDay.accommodation.ecoCertified && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md">
                    🌿 Eco-Certified
                  </span>
                )}
              </div>

              {/* Direct Booking Action Buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleSimulateBooking('lodge', activeDay.accommodation.name)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
                >
                  <Hotel className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Reserve Lodge via Affiliate API</span>
                </button>

                <button
                  onClick={() => handleSimulateBooking('4x4', 'Safari 4x4 Land Cruiser & Driver-Guide')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FAEDCD] hover:bg-[#F4F1DE] text-[#4A3B32] text-xs font-bold flex items-center justify-center space-x-1.5 transition-all border border-[#D4A373]/40"
                >
                  <Car className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>Add 4x4 Pop-Up Cruiser ($160/day)</span>
                </button>
              </div>
            </div>

            {/* Safety & Packing highlights */}
            <div className="bg-white rounded-2xl border border-[#D4A373]/30 p-5 shadow-xs text-xs space-y-3">
              <div>
                <span className="font-bold text-[#BC4749] uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Safari & Health Advisories:</span>
                </span>
                <ul className="space-y-1 text-[#4A3B32]/85">
                  {itinerary.safetyAdvisories.slice(0, 2).map((adv, i) => (
                    <li key={i} className="flex items-start space-x-1">
                      <span className="text-[#BC4749] font-bold">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#D4A373]/20">
                <span className="font-bold text-[#4A3B32] uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
                  <Luggage className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>Packing Essentials:</span>
                </span>
                <ul className="space-y-1 text-[#4A3B32]/85">
                  {itinerary.packingHighlights.slice(0, 2).map((pack, i) => (
                    <li key={i} className="flex items-start space-x-1">
                      <span className="text-[#C29B38] font-bold">•</span>
                      <span>{pack}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share / Export Voucher Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6ED] rounded-3xl max-w-lg w-full border-2 border-[#D4A373] p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#D4A373]/30">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-[#C29B38]" />
                <h3 className="font-display font-extrabold text-base text-[#1F1814]">
                  Afrivoya Digital Voyage Pass
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-xs text-[#4A3B32]/70 hover:text-black"
              >
                Close
              </button>
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-white border-2 border-dashed border-[#D4A373] text-center space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#BC4749] tracking-wider block">
                Official Pan-African Safari Voucher
              </span>
              <h4 className="font-display font-extrabold text-lg text-[#1F1814]">
                {itinerary.title}
              </h4>
              <p className="text-xs text-[#4A3B32]/80">
                Duration: {itinerary.days.length} Days &bull; Countries: {selectedCountries.join(', ')}
              </p>
              <div className="py-2 px-3 bg-[#FAEDCD] rounded-xl text-xs font-mono font-bold text-[#4A3B32] inline-block">
                REF: AFR-VOY-2027-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <p className="text-[11px] text-gray-500">
                Includes connected accommodations, 4x4 vehicles, park conservation fees, and 24/7 SOS safety satellite tracking.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  window.print();
                  setShowShareModal(false);
                }}
                className="py-2.5 rounded-xl bg-[#4A3B32] text-[#FAEDCD] font-bold flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Voyage itinerary link copied to clipboard!');
                  setShowShareModal(false);
                }}
                className="py-2.5 rounded-xl bg-[#C29B38] text-[#1F1814] font-bold flex items-center justify-center space-x-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Share Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
