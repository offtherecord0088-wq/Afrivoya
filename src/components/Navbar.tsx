import React, { useState } from 'react';
import { 
  Compass, 
  ShieldAlert, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Code2, 
  Smartphone, 
  Monitor, 
  Globe, 
  UserCheck, 
  Building2, 
  Award,
  CreditCard,
  Volume2,
  Menu,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  deviceMode: 'responsive' | 'iphone' | 'galaxy';
  setDeviceMode: (mode: 'responsive' | 'iphone' | 'galaxy') => void;
  onOpenSOS: () => void;
  onOpenSubscription: () => void;
  onOpenAudioGuide: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  deviceMode,
  setDeviceMode,
  onOpenSOS,
  onOpenSubscription,
  onOpenAudioGuide,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'countries', label: '54 Nations', icon: Globe },
    { id: 'directory', label: 'Heritage & Wildlife', icon: Compass },
    { id: 'itinerary', label: 'AI Planner', icon: Sparkles },
    { id: 'safety', label: 'Safety & SOS', icon: ShieldAlert },
    { id: 'events', label: 'Cultural Hub', icon: Calendar },
    { id: 'architecture', label: 'Tech & Architecture', icon: Code2 },
  ];

  const roleLabels: Record<UserRole, { title: string; badge: string; icon: any }> = {
    tourist: { title: 'Tourist Pass', badge: '$200/yr', icon: UserCheck },
    agency: { title: 'Agency Portal', badge: '$500/yr', icon: Building2 },
    guide: { title: 'Certified Guide', badge: '$100/yr', icon: Award },
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAEDCD]/95 backdrop-blur-md border-b border-[#D4A373]/30 shadow-xs">
      {/* Top Banner / Utility Bar */}
      <div className="bg-[#4A3B32] text-[#FAEDCD] text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium tracking-wide">Pan-African All-in-One Tourism Platform</span>
          <span className="hidden sm:inline text-[#D4A373]">• Spanning all 54 sovereign nations</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Audio narration quick launcher */}
          <button
            onClick={onOpenAudioGuide}
            className="flex items-center space-x-1 text-[#FAEDCD]/90 hover:text-[#D4A373] transition-colors"
            title="Launch Pan-African Audio Guide Player"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="hidden md:inline">Audio Guide</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-[#D4A373]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs text-[#FAEDCD] border-none focus:outline-hidden cursor-pointer"
            >
              <option value="en" className="bg-[#4A3B32] text-[#FAEDCD]">EN (English)</option>
              <option value="fr" className="bg-[#4A3B32] text-[#FAEDCD]">FR (Français)</option>
              <option value="sw" className="bg-[#4A3B32] text-[#FAEDCD]">SW (Kiswahili)</option>
              <option value="ar" className="bg-[#4A3B32] text-[#FAEDCD]">AR (العربية)</option>
              <option value="pt" className="bg-[#4A3B32] text-[#FAEDCD]">PT (Português)</option>
              <option value="zu" className="bg-[#4A3B32] text-[#FAEDCD]">ZU (isiZulu)</option>
            </select>
          </div>

          {/* Viewport Frame Mode Switcher */}
          <div className="hidden lg:flex items-center bg-[#332822] rounded-md p-0.5 border border-[#D4A373]/20">
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`p-1 rounded text-xs transition-all ${
                deviceMode === 'responsive' ? 'bg-[#D4A373] text-[#4A3B32] font-semibold' : 'text-[#FAEDCD]/70 hover:text-white'
              }`}
              title="Responsive Web Mode"
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              onClick={() => setDeviceMode('iphone')}
              className={`p-1 rounded text-xs transition-all ${
                deviceMode === 'iphone' ? 'bg-[#D4A373] text-[#4A3B32] font-semibold' : 'text-[#FAEDCD]/70 hover:text-white'
              }`}
              title="iPhone 16 Pro Frame"
            >
              <Smartphone className="w-3 h-3" />
            </button>
            <button
              onClick={() => setDeviceMode('galaxy')}
              className={`p-1 rounded text-xs transition-all ${
                deviceMode === 'galaxy' ? 'bg-[#D4A373] text-[#4A3B32] font-semibold' : 'text-[#FAEDCD]/70 hover:text-white'
              }`}
              title="Galaxy S25 Ultra Frame"
            >
              <span className="text-[10px] font-mono px-0.5">S25</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('countries')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A373] via-[#C29B38] to-[#4A3B32] flex items-center justify-center shadow-md shadow-[#D4A373]/20 border border-[#D4A373]/40">
              <Compass className="w-6 h-6 text-[#FAEDCD] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-[#4A3B32]">
                  Afri<span className="text-[#C29B38]">voya</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#4A3B32] text-[#FAEDCD]">
                  54 Nations
                </span>
              </div>
              <p className="text-[11px] text-[#4A3B32]/75 font-medium -mt-0.5">
                Africa Voyage &bull; Safari &bull; Heritage &bull; SOS
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#4A3B32] text-[#FAEDCD] shadow-xs'
                      : 'text-[#4A3B32] hover:bg-[#D4A373]/20 hover:text-[#332822]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A373]' : 'text-[#4A3B32]/70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Active Role Selector Switch */}
            <div className="hidden sm:flex items-center bg-[#F4F1DE] border border-[#D4A373]/40 rounded-lg p-1 text-xs">
              {(['tourist', 'agency', 'guide'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                    activeRole === role
                      ? 'bg-[#4A3B32] text-[#FAEDCD] font-bold shadow-xs'
                      : 'text-[#4A3B32]/75 hover:text-[#4A3B32]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Subscription Button */}
            <button
              onClick={onOpenSubscription}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4A373] to-[#C29B38] text-[#1F1814] text-xs font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all border border-[#C29B38]/50"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{roleLabels[activeRole].title}</span>
              <span className="bg-[#4A3B32] text-[#FAEDCD] text-[10px] px-1.5 py-0.5 rounded font-mono">
                {roleLabels[activeRole].badge}
              </span>
            </button>

            {/* High-Visibility Panic SOS Button */}
            <button
              onClick={onOpenSOS}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#BC4749] hover:bg-[#A23A3C] text-white text-xs font-extrabold tracking-wide shadow-md shadow-[#BC4749]/30 active:scale-95 transition-all animate-pulse"
              title="Open Instant SOS Emergency Safety Suite"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="tracking-wider">SOS</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4A3B32] hover:bg-[#D4A373]/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAEDCD] border-b border-[#D4A373]/40 px-4 pt-2 pb-4 space-y-2">
          {/* Role selector in mobile menu */}
          <div className="p-2 bg-[#F4F1DE] rounded-lg border border-[#D4A373]/30 mb-3">
            <span className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider block mb-1.5">
              Active Portal Role:
            </span>
            <div className="grid grid-cols-3 gap-1">
              {(['tourist', 'agency', 'guide'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 text-xs text-center rounded capitalize font-medium ${
                    activeRole === role
                      ? 'bg-[#4A3B32] text-[#FAEDCD] font-bold'
                      : 'bg-white/60 text-[#4A3B32]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2.5 rounded-lg text-xs font-semibold text-left ${
                    isActive
                      ? 'bg-[#4A3B32] text-[#FAEDCD]'
                      : 'bg-white/70 text-[#4A3B32]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#D4A373]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
