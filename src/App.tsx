import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountryExplorer } from './components/CountryExplorer';
import { DirectoryExplorer } from './components/DirectoryExplorer';
import { SmartItineraryBuilder } from './components/SmartItineraryBuilder';
import { SafetyAndSOSSuite } from './components/SafetyAndSOSSuite';
import { EventsAndCulturalHub } from './components/EventsAndCulturalHub';
import { SubscriptionAndRolesModal } from './components/SubscriptionAndRolesModal';
import { AgencyDashboardView } from './components/AgencyDashboardView';
import { GuideMarketplaceView } from './components/GuideMarketplaceView';
import { AudioGuidePlayer } from './components/AudioGuidePlayer';
import { ArchitectureAndDevHub } from './components/ArchitectureAndDevHub';
import { DeviceFrame } from './components/DeviceFrame';
import { Footer } from './components/Footer';
import { UserRole, DirectoryListing } from './types';
import { DIRECTORY_LISTINGS } from './data/directory';
import { playKalimbaChime } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('countries');
  const [activeRole, setActiveRole] = useState<UserRole>('tourist');
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'iphone' | 'galaxy'>('responsive');
  const [language, setLanguage] = useState<string>('en');

  // Modals & Sheets
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [activeAudioListing, setActiveAudioListing] = useState<DirectoryListing | null>(null);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);

  // Cross-component states
  const [selectedCountryForPlan, setSelectedCountryForPlan] = useState<string | undefined>(undefined);
  const [selectedItineraryListingIds, setSelectedItineraryListingIds] = useState<string[]>([]);

  const handleOpenAudioListing = (listing: DirectoryListing) => {
    playKalimbaChime();
    setActiveAudioListing(listing);
    setIsAudioPlayerVisible(true);
  };

  const handleToggleAddItinerary = (listing: DirectoryListing) => {
    playKalimbaChime();
    setSelectedItineraryListingIds((prev) =>
      prev.includes(listing.id) ? prev.filter((id) => id !== listing.id) : [...prev, listing.id]
    );
  };

  const handlePlanCountry = (countryName: string) => {
    playKalimbaChime();
    setSelectedCountryForPlan(countryName);
    setActiveTab('itinerary');
  };

  const handleRoleChange = (newRole: UserRole) => {
    playKalimbaChime();
    setActiveRole(newRole);
  };

  const content = (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] text-[#1F1814]">
      {/* Universal Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          playKalimbaChime();
          setActiveTab(tab);
        }}
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenAudioGuide={() => {
          if (!activeAudioListing) {
            setActiveAudioListing(DIRECTORY_LISTINGS[0]);
          }
          setIsAudioPlayerVisible(true);
        }}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Hero Banner (Always on countries tab or can browse) */}
      {activeTab === 'countries' && (
        <HeroSection
          onSelectCountry={(country) => handlePlanCountry(country)}
          onNavigateTab={(tab) => {
            playKalimbaChime();
            setActiveTab(tab);
          }}
          onOpenAudioGuide={() => {
            setActiveAudioListing(DIRECTORY_LISTINGS[0]);
            setIsAudioPlayerVisible(true);
          }}
          onOpenSOS={() => setIsSOSOpen(true)}
        />
      )}

      {/* Main Dynamic Viewport Switching */}
      <main className="flex-1">
        {/* Role Portal Overrides */}
        {activeRole === 'agency' && activeTab === 'countries' ? (
          <AgencyDashboardView />
        ) : activeRole === 'guide' && activeTab === 'countries' ? (
          <GuideMarketplaceView />
        ) : null}

        {/* Standard Tab Navigation */}
        {activeTab === 'countries' && activeRole === 'tourist' && (
          <CountryExplorer
            onPlanCountry={handlePlanCountry}
            selectedCountryName={selectedCountryForPlan}
          />
        )}

        {activeTab === 'directory' && (
          <DirectoryExplorer
            onPlayAudioListing={handleOpenAudioListing}
            onAddToItinerary={handleToggleAddItinerary}
            selectedIdsInItinerary={selectedItineraryListingIds}
          />
        )}

        {activeTab === 'itinerary' && (
          <SmartItineraryBuilder
            initialCountry={selectedCountryForPlan}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyAndSOSSuite onClose={() => setIsSOSOpen(false)} />
        )}

        {activeTab === 'events' && (
          <EventsAndCulturalHub />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureAndDevHub />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => {
          playKalimbaChime();
          setActiveTab(tab);
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
      />

      {/* Audio Guide Modal / Mini Player */}
      {isAudioPlayerVisible && (
        <AudioGuidePlayer
          currentListing={activeAudioListing}
          onClose={() => setIsAudioPlayerVisible(false)}
        />
      )}

      {/* Emergency SOS Modal Sheet (if opened via Navbar or button) */}
      {isSOSOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto">
            <button
              onClick={() => setIsSOSOpen(false)}
              className="absolute -top-12 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              ✕ Close Emergency Suite
            </button>
            <SafetyAndSOSSuite onClose={() => setIsSOSOpen(false)} />
          </div>
        </div>
      )}

      {/* User Subscription & Roles Modal */}
      {isSubscriptionOpen && (
        <SubscriptionAndRolesModal
          currentRole={activeRole}
          onSelectRole={(role) => {
            setActiveRole(role);
          }}
          onClose={() => setIsSubscriptionOpen(false)}
        />
      )}
    </div>
  );

  return (
    <DeviceFrame
      mode={deviceMode}
      onExitFrame={() => setDeviceMode('responsive')}
    >
      {content}
    </DeviceFrame>
  );
}
