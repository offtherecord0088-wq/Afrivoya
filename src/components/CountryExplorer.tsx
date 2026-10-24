import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  PhoneCall, 
  ShieldAlert, 
  Sparkles, 
  FileCheck, 
  Coins, 
  Crosshair, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { CountryInfo, AfricanRegion } from '../types';
import { AFRICAN_COUNTRIES } from '../data/countries';
import { playKalimbaChime } from '../utils/audio';

interface CountryExplorerProps {
  onPlanCountry: (countryName: string) => void;
  selectedCountryName?: string;
}

export const CountryExplorer: React.FC<CountryExplorerProps> = ({
  onPlanCountry,
  selectedCountryName,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisa, setSelectedVisa] = useState<string>('All');
  const [activeCountry, setActiveCountry] = useState<CountryInfo | null>(
    selectedCountryName 
      ? AFRICAN_COUNTRIES.find(c => c.name.toLowerCase() === selectedCountryName.toLowerCase()) || AFRICAN_COUNTRIES[5] // default Kenya
      : AFRICAN_COUNTRIES[5]
  );
  const [isDialingNumber, setIsDialingNumber] = useState<string | null>(null);

  const regions: (AfricanRegion | 'All')[] = [
    'All',
    'East Africa',
    'West Africa',
    'North Africa',
    'Southern Africa',
    'Central Africa',
  ];

  const filteredCountries = AFRICAN_COUNTRIES.filter((country) => {
    const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisa = selectedVisa === 'All' || country.visaPolicy.includes(selectedVisa);
    return matchesRegion && matchesSearch && matchesVisa;
  });

  const handleSelectCountry = (country: CountryInfo) => {
    playKalimbaChime();
    setActiveCountry(country);
  };

  const handleSimulateCall = (number: string, title: string) => {
    setIsDialingNumber(`${title}: ${number}`);
    setTimeout(() => {
      setIsDialingNumber(null);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#BC4749] uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Pan-African Sovereign Directory</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            All 54 African Sovereign Nations
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Explore visa policies, emergency tourism hotlines, UNESCO heritage counts, local currency exchange rates, and travel advisories across North, West, Central, East, and Southern Africa.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="text-xs font-semibold text-[#4A3B32] bg-[#FAEDCD] px-3 py-1.5 rounded-lg border border-[#D4A373]/40">
            Showing <strong className="text-[#BC4749]">{filteredCountries.length}</strong> of 54 Nations
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        {/* Region Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRegion === region
                  ? 'bg-[#4A3B32] text-[#FAEDCD] shadow-sm'
                  : 'bg-white/80 text-[#4A3B32] hover:bg-[#FAEDCD] border border-[#D4A373]/30'
              }`}
            >
              {region === 'All' ? '🌍 All 54 Nations' : region}
            </button>
          ))}
        </div>

        {/* Search & Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative col-span-2">
            <Search className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by country name, capital, or code (e.g. Kenya, Dakar, ZAF)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#1F1814] placeholder-[#4A3B32]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C29B38]"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-[#D4A373]/40">
            <Filter className="w-4 h-4 text-[#C29B38]" />
            <select
              value={selectedVisa}
              onChange={(e) => setSelectedVisa(e.target.value)}
              className="w-full text-xs text-[#4A3B32] bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Visa Entry Rules</option>
              <option value="e-Visa">e-Visa Online</option>
              <option value="Visa-free">Visa-free</option>
              <option value="Arrival">Visa on Arrival</option>
              <option value="Consulate">Consulate Visa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid + Side Detail Sheet View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Country Grid (Left 7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[720px] overflow-y-auto pr-1">
          {filteredCountries.map((country) => {
            const isSelected = activeCountry?.code === country.code;
            return (
              <div
                key={country.code}
                onClick={() => handleSelectCountry(country)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#FAEDCD] to-white border-[#C29B38] ring-2 ring-[#C29B38]/30 shadow-md'
                    : 'bg-white hover:bg-[#FAEDCD]/40 border-[#D4A373]/30 hover:border-[#D4A373]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl filter drop-shadow-xs">{country.flag}</span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#1F1814] group-hover:text-[#BC4749] transition-colors">
                        {country.name}
                      </h4>
                      <div className="text-[11px] text-[#4A3B32]/70 font-medium">
                        {country.region} &bull; {country.capital}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F4F1DE] text-[#4A3B32]">
                    {country.code}
                  </span>
                </div>

                {/* Country Quick Highlights */}
                <div className="mt-3 pt-3 border-t border-[#D4A373]/20 flex items-center justify-between text-[11px] text-[#4A3B32]/80">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>{country.currency.code} (1$ = {country.currency.usdRate} {country.currency.symbol})</span>
                  </div>
                  <div className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    {country.unescoSitesCount} UNESCO
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-[#4A3B32]/75 line-clamp-2">
                  {country.overview}
                </div>
              </div>
            );
          })}

          {filteredCountries.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-[#D4A373]/50">
              <Globe className="w-8 h-8 text-[#D4A373] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold text-[#4A3B32]">No African country matched the filters</p>
              <button
                onClick={() => {
                  setSelectedRegion('All');
                  setSearchQuery('');
                  setSelectedVisa('All');
                }}
                className="mt-3 text-xs text-[#BC4749] font-bold underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Country Detail Dossier (Right 5 cols) */}
        {activeCountry && (
          <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-[#D4A373]/50 p-6 shadow-xl relative sticky top-24">
            {/* Header with Flag & Actions */}
            <div className="flex items-start justify-between pb-4 border-b border-[#D4A373]/30">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{activeCountry.flag}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-display font-extrabold text-xl text-[#1F1814]">
                      {activeCountry.name}
                    </h3>
                    <span className="text-xs bg-[#4A3B32] text-[#FAEDCD] px-2 py-0.5 rounded-full font-bold">
                      {activeCountry.dialCode}
                    </span>
                  </div>
                  <div className="text-xs text-[#4A3B32]/75 font-medium">
                    Capital: <strong>{activeCountry.capital}</strong> &bull; Region: {activeCountry.region}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-4 text-xs text-[#4A3B32]/90 leading-relaxed bg-[#FAEDCD]/30 p-3 rounded-xl border border-[#D4A373]/20">
              {activeCountry.overview}
            </p>

            {/* Key Data Matrix */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#F4F1DE] p-2.5 rounded-lg border border-[#D4A373]/20">
                <span className="text-[10px] text-[#4A3B32]/70 font-semibold uppercase block">Currency & Rate</span>
                <span className="font-bold text-[#1F1814]">{activeCountry.currency.code} ({activeCountry.currency.symbol})</span>
                <span className="text-[10px] text-emerald-800 block">1 USD = {activeCountry.currency.usdRate} {activeCountry.currency.symbol}</span>
              </div>

              <div className="bg-[#F4F1DE] p-2.5 rounded-lg border border-[#D4A373]/20">
                <span className="text-[10px] text-[#4A3B32]/70 font-semibold uppercase block">Visa Entry Status</span>
                <span className="font-bold text-[#1F1814]">{activeCountry.visaPolicy}</span>
                <span className="text-[10px] text-[#4A3B32]/70 block">Online Portal Supported</span>
              </div>

              <div className="bg-[#F4F1DE] p-2.5 rounded-lg border border-[#D4A373]/20">
                <span className="text-[10px] text-[#4A3B32]/70 font-semibold uppercase block">Health & Vaccines</span>
                <span className="font-semibold text-[#1F1814]">
                  Malaria: <strong className="text-amber-700">{activeCountry.malariaRisk}</strong>
                </span>
                <span className="text-[10px] text-[#4A3B32]/75 block">
                  Yellow Fever: {activeCountry.yellowFeverRequired ? '⚠️ Required' : 'Not Mandatory'}
                </span>
              </div>

              <div className="bg-[#F4F1DE] p-2.5 rounded-lg border border-[#D4A373]/20">
                <span className="text-[10px] text-[#4A3B32]/70 font-semibold uppercase block">UNESCO World Heritage</span>
                <span className="font-extrabold text-[#BC4749] text-base">{activeCountry.unescoSitesCount}</span>
                <span className="text-[10px] text-[#4A3B32]/70 block">Protected World Sites</span>
              </div>
            </div>

            {/* Emergency & Tourism Police Dispatch Directory */}
            <div className="mt-5 p-3.5 bg-red-50/70 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#BC4749] mb-2 uppercase tracking-wide">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Official Emergency Numbers (In-Country)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSimulateCall(activeCountry.emergencyNumbers.police, 'National Police')}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-red-200 hover:bg-red-100/50 transition-all font-semibold text-[#1F1814]"
                >
                  <span>Police: <strong>{activeCountry.emergencyNumbers.police}</strong></span>
                  <PhoneCall className="w-3.5 h-3.5 text-[#BC4749]" />
                </button>

                <button
                  onClick={() => handleSimulateCall(activeCountry.emergencyNumbers.ambulance, 'Ambulance / Medical')}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-red-200 hover:bg-red-100/50 transition-all font-semibold text-[#1F1814]"
                >
                  <span>Medical: <strong>{activeCountry.emergencyNumbers.ambulance}</strong></span>
                  <PhoneCall className="w-3.5 h-3.5 text-[#BC4749]" />
                </button>

                {activeCountry.emergencyNumbers.touristPolice && (
                  <button
                    onClick={() => handleSimulateCall(activeCountry.emergencyNumbers.touristPolice!, 'Tourist Police Bureau')}
                    className="col-span-2 flex items-center justify-between p-2 rounded-lg bg-white border border-red-200 hover:bg-red-100/50 transition-all font-semibold text-[#1F1814]"
                  >
                    <span>Dedicated Tourist Police: <strong>{activeCountry.emergencyNumbers.touristPolice}</strong></span>
                    <PhoneCall className="w-3.5 h-3.5 text-[#BC4749]" />
                  </button>
                )}
              </div>

              {/* In-App Call Simulation Notification */}
              {isDialingNumber && (
                <div className="mt-2.5 p-2 bg-[#BC4749] text-white text-[11px] font-bold rounded-lg flex items-center justify-between animate-pulse">
                  <span>Connecting to {isDialingNumber}...</span>
                  <span className="text-[10px] bg-white text-[#BC4749] px-1.5 py-0.5 rounded">Simulating Call</span>
                </div>
              )}
            </div>

            {/* Top Attractions in this Country */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-2">
                Premier Attractions & Reserves:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCountry.topAttractions.map((att, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#FAEDCD] text-[#4A3B32] px-2.5 py-1 rounded-md border border-[#D4A373]/30 font-medium"
                  >
                    {att}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA: Plan Voyage for this Country */}
            <div className="mt-6 pt-4 border-t border-[#D4A373]/30">
              <button
                onClick={() => onPlanCountry(activeCountry.name)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C29B38] to-[#D4A373] hover:brightness-105 active:scale-98 text-[#1F1814] font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-[#C29B38]/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#4A3B32]" />
                <span>Launch AI Dynamic Itinerary for {activeCountry.name}</span>
                <ArrowRight className="w-4 h-4 text-[#4A3B32]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
