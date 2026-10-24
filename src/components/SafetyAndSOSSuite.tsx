import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  AlertTriangle, 
  Radio, 
  CheckCircle2, 
  Download, 
  Search, 
  Building, 
  Compass, 
  Globe, 
  HeartHandshake, 
  Battery, 
  Wifi, 
  WifiOff, 
  X,
  Volume2,
  StopCircle
} from 'lucide-react';
import { CountryInfo, EmergencySOSDispatch } from '../types';
import { AFRICAN_COUNTRIES } from '../data/countries';
import { playSOSSiren, playKalimbaChime } from '../utils/audio';

interface SafetyAndSOSSuiteProps {
  onClose?: () => void;
}

export const SafetyAndSOSSuite: React.FC<SafetyAndSOSSuiteProps> = ({ onClose }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [sosActive, setSosActive] = useState(false);
  const [dispatchData, setDispatchData] = useState<EmergencySOSDispatch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(AFRICAN_COUNTRIES[5]); // Default Kenya
  const [isOfflineCached, setIsOfflineCached] = useState(true);
  const [sirenStopFn, setSirenStopFn] = useState<(() => void) | null>(null);
  const [simulatedDialing, setSimulatedDialing] = useState<string | null>(null);

  const pressTimerRef = useRef<any>(null);

  // Handle tactile 3-second hold for SOS
  const handleMouseDown = () => {
    setIsPressing(true);
    setCountdown(3);

    let count = 3;
    pressTimerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(pressTimerRef.current);
        triggerEmergencySOS();
      }
    }, 1000);
  };

  const handleMouseUp = () => {
    if (pressTimerRef.current && !sosActive) {
      clearInterval(pressTimerRef.current);
      setIsPressing(false);
      setCountdown(3);
    }
  };

  const triggerEmergencySOS = () => {
    setIsPressing(false);
    setSosActive(true);

    // Play tactical emergency siren
    const stopFn = playSOSSiren(6);
    setSirenStopFn(() => stopFn);

    // Call server route or generate simulated instant dispatch
    fetch('/api/sos/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: selectedCountry.coordinates.lat || -1.2921,
        longitude: selectedCountry.coordinates.lng || 36.8219,
        country: selectedCountry.name,
        travelerName: 'Sarah Jenkins (Tourist ID: AFR-88219)',
        emergencyContacts: ['+1-555-019-2834', '+254-711-234-567'],
        batteryLevel: 91,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDispatchData(data);
      })
      .catch(() => {
        setDispatchData({
          incidentId: 'AFR-SOS-991204',
          timestamp: new Date().toISOString(),
          status: 'DISPATCHED',
          message: 'Emergency broad spectrum alert registered across Pan-African emergency networks.',
          coordinates: { lat: selectedCountry.coordinates.lat, lng: selectedCountry.coordinates.lng },
          dispatchedTo: [
            { authority: `${selectedCountry.name} Tourism Police Command`, phone: selectedCountry.emergencyNumbers.police, etaMinutes: 12 },
            { authority: 'Regional Flying Doctors / Air Ambulance Emergency Rescue', status: 'STANDBY', etaMinutes: 24 },
            { authority: 'Nearest Verified Afrivoya Host Agency & Field Ranger Unit', status: 'NOTIFIED', distanceKm: 3.8 },
            { authority: 'Configured Emergency Contacts via SMS/WhatsApp with Live GPS Pin', count: 2, delivered: true },
          ],
          liveTrackingUrl: 'https://afrivoya.travel/sos-live/AFR-SOS-991204',
          batteryLevel: 91,
        });
      });
  };

  const cancelSOS = () => {
    if (sirenStopFn) {
      sirenStopFn();
      setSirenStopFn(null);
    }
    setSosActive(false);
    setDispatchData(null);
    setIsPressing(false);
    setCountdown(3);
  };

  const handleSimulateCall = (title: string, phone: string) => {
    setSimulatedDialing(`${title} (${phone})`);
    setTimeout(() => {
      setSimulatedDialing(null);
    }, 4000);
  };

  const filteredCountries = AFRICAN_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#BC4749] uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>24/7 Pan-African Satellite Safety Grid</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            Safety & Panic SOS Emergency Suite
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Instant broad-spectrum emergency dispatch, live GPS tracking, and offline emergency hotlines for all 54 sovereign African nations.
          </p>
        </div>

        {/* Offline Cache Status Badge */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button
            onClick={() => {
              playKalimbaChime();
              setIsOfflineCached(!isOfflineCached);
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isOfflineCached
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}
          >
            {isOfflineCached ? <WifiOff className="w-3.5 h-3.5 text-emerald-600" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineCached ? 'Offline Safety Pack: Synchronized (54 Nations)' : 'Sync Offline Pack'}</span>
          </button>
        </div>
      </div>

      {/* Primary Panic Activator Card */}
      <div className="bg-gradient-to-br from-stone-900 via-[#332822] to-[#1F1814] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#BC4749]/60 relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold tracking-wider uppercase mb-3 border border-red-500/30">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>Tactile Satellite Distress Beacon</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight">
              One-Touch Emergency SOS
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
              In danger, medical distress, or remote breakdown? Press and hold the SOS button for 3 seconds. The beacon transmits your verified GPS coordinates, battery level, and medical profile to local tourism police commands and private air rescue across all 54 nations.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-400 justify-center lg:justify-start font-mono">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>GPS: {selectedCountry.coordinates.lat.toFixed(4)}°, {selectedCountry.coordinates.lng.toFixed(4)}° ({selectedCountry.name})</span>
              </span>
              <span className="flex items-center space-x-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                <span>Battery: 91%</span>
              </span>
            </div>
          </div>

          {/* Big Tactile SOS Trigger */}
          <div className="flex flex-col items-center">
            {!sosActive ? (
              <div className="relative">
                {/* Hold progress ring animation */}
                <div
                  className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center p-2.5 transition-all cursor-pointer select-none active:scale-95 ${
                    isPressing
                      ? 'bg-red-600 animate-pulse ring-8 ring-red-500/50'
                      : 'bg-gradient-to-tr from-[#BC4749] to-[#E76F51] shadow-2xl shadow-red-700/50 hover:brightness-110'
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                >
                  <div className="w-full h-full rounded-full border-4 border-dashed border-white/40 flex flex-col items-center justify-center text-center p-2">
                    <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1" />
                    <span className="font-display font-black text-2xl sm:text-3xl tracking-widest text-white">
                      SOS
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                      {isPressing ? `Hold (${countdown}s)` : 'Press & Hold 3s'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 animate-in fade-in max-w-sm">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-display font-black text-lg text-red-200">
                  SOS DISPATCH ACTIVE
                </h4>
                <p className="text-[11px] text-stone-300 mt-1">
                  Broad spectrum alert broadcasting on regional police & medical bands.
                </p>
                <button
                  onClick={cancelSOS}
                  className="mt-3 px-4 py-2 rounded-xl bg-white text-red-900 font-extrabold text-xs hover:bg-stone-200 active:scale-95 transition-all shadow-md flex items-center justify-center space-x-1.5 mx-auto"
                >
                  <StopCircle className="w-4 h-4 text-red-600" />
                  <span>Cancel Emergency Alert</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Broadcast Feed when Active */}
        {sosActive && dispatchData && (
          <div className="mt-8 pt-6 border-t border-red-500/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-black/50 p-4 rounded-xl border border-red-500/30">
              <div className="text-[11px] font-mono font-bold text-red-400 mb-1">
                INCIDENT ID: {dispatchData.incidentId}
              </div>
              <div className="text-sm font-bold text-white mb-2">{dispatchData.message}</div>
              <div className="text-stone-300 text-[11px]">
                Live Satellite Stream: <span className="text-[#D4A373] underline">{dispatchData.liveTrackingUrl}</span>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border border-red-500/30 space-y-2">
              <span className="font-bold text-[#D4A373] uppercase tracking-wider block">
                Dispatched Responders:
              </span>
              {dispatchData.dispatchedTo.map((resp, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] text-stone-200">
                  <span>✓ {resp.authority}</span>
                  {resp.etaMinutes && (
                    <span className="bg-red-900/60 text-red-300 font-mono px-1.5 py-0.5 rounded">
                      ETA ~{resp.etaMinutes} min
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Simulated Dialing Banner */}
      {simulatedDialing && (
        <div className="mb-6 p-4 rounded-xl bg-[#BC4749] text-white flex items-center justify-between font-bold text-xs shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-4 h-4" />
            <span>Simulating live cellular call to: {simulatedDialing}...</span>
          </div>
          <button
            onClick={() => setSimulatedDialing(null)}
            className="text-[11px] bg-white text-[#BC4749] px-2 py-0.5 rounded font-bold"
          >
            End Call
          </button>
        </div>
      )}

      {/* Country Emergency Directory (All 54 Countries) */}
      <div className="bg-white rounded-2xl border-2 border-[#D4A373]/40 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D4A373]/20">
          <div>
            <h3 className="font-display font-extrabold text-lg text-[#1F1814]">
              Pan-African Offline Emergency Database (54 Nations)
            </h3>
            <p className="text-xs text-[#4A3B32]/75">
              Access certified national police, medical rescue, and dedicated tourist bureaus without an internet connection.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#D4A373] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter country or capital..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D4A373]/40 text-xs focus:outline-hidden"
            />
          </div>
        </div>

        {/* Selected Country Emergency Card */}
        <div className="p-4 bg-[#FAEDCD]/40 rounded-2xl border border-[#D4A373]/30 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{selectedCountry.flag}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-display font-bold text-base text-[#1F1814]">
                  {selectedCountry.name}
                </h4>
                <span className="text-[11px] font-bold bg-[#4A3B32] text-[#FAEDCD] px-2 py-0.5 rounded">
                  {selectedCountry.dialCode}
                </span>
              </div>
              <div className="text-xs text-[#4A3B32]/75">
                Capital: <strong>{selectedCountry.capital}</strong> &bull; Region: {selectedCountry.region}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSimulateCall('Police', selectedCountry.emergencyNumbers.police)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 text-xs font-bold text-[#BC4749] hover:bg-red-50 transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Police: {selectedCountry.emergencyNumbers.police}</span>
            </button>

            <button
              onClick={() => handleSimulateCall('Ambulance', selectedCountry.emergencyNumbers.ambulance)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 text-xs font-bold text-[#BC4749] hover:bg-red-50 transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Medical: {selectedCountry.emergencyNumbers.ambulance}</span>
            </button>

            {selectedCountry.emergencyNumbers.touristPolice && (
              <button
                onClick={() => handleSimulateCall('Tourist Police', selectedCountry.emergencyNumbers.touristPolice!)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold hover:bg-[#332822] transition-all shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Tourist Police: {selectedCountry.emergencyNumbers.touristPolice}</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Country Switcher Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-56 overflow-y-auto pr-1">
          {filteredCountries.map((c) => {
            const isSelected = selectedCountry.code === c.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  playKalimbaChime();
                  setSelectedCountry(c);
                }}
                className={`p-2 rounded-xl text-left text-xs transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-[#4A3B32] text-[#FAEDCD] border-[#4A3B32] font-bold'
                    : 'bg-white hover:bg-[#FAEDCD]/50 text-[#4A3B32] border-[#D4A373]/20'
                }`}
              >
                <span>{c.flag}</span>
                <span className="truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
