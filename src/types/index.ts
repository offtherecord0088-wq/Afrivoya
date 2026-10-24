export type UserRole = 'tourist' | 'agency' | 'guide';

export type AfricanRegion = 'East Africa' | 'West Africa' | 'North Africa' | 'Southern Africa' | 'Central Africa';

export interface CountryInfo {
  code: string;
  name: string;
  region: AfricanRegion;
  flag: string;
  capital: string;
  currency: {
    code: string;
    symbol: string;
    usdRate: number;
  };
  emergencyNumbers: {
    police: string;
    ambulance: string;
    touristPolice?: string;
  };
  unescoSitesCount: number;
  visaPolicy: 'Visa-free (selected passports)' | 'e-Visa Online' | 'Visa on Arrival' | 'Consulate Visa';
  topAttractions: string[];
  malariaRisk: 'Low' | 'Moderate' | 'High' | 'Nil';
  yellowFeverRequired: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  dialCode: string;
  overview: string;
}

export type ListingCategory = 'heritage' | 'wildlife' | 'stay';

export interface DirectoryListing {
  id: string;
  title: string;
  category: ListingCategory;
  subcategory: string;
  country: string;
  countryCode: string;
  region: AfricanRegion;
  gpsCoords: {
    lat: number;
    lng: number;
  };
  historicalTags: string[];
  audioGuide: {
    available: boolean;
    duration: string;
    title: string;
    transcript: string;
    tone: string;
  };
  rating: number;
  reviewsCount: number;
  image: string;
  entranceFeeUSD: number;
  description: string;
  bestTimeToVisit: string;
  ecoCertified: boolean;
  verifiedAgency: string;
  amenities?: string[];
}

export interface DayItinerary {
  dayNumber: number;
  dateLabel: string;
  region: string;
  theme: string;
  morning: {
    time: string;
    title: string;
    desc: string;
    type: string;
    estCostUSD: number;
  };
  afternoon: {
    time: string;
    title: string;
    desc: string;
    type: string;
    estCostUSD: number;
  };
  evening: {
    time: string;
    title: string;
    desc: string;
    type: string;
    estCostUSD: number;
  };
  accommodation: {
    name: string;
    type: string;
    rating: number;
    estPricePerNightUSD: number;
    ecoCertified: boolean;
  };
  transitNotes: string;
}

export interface ItineraryPlan {
  title: string;
  summary: string;
  totalEstCostUSD: number;
  transportModes: string[];
  days: DayItinerary[];
  safetyAdvisories: string[];
  packingHighlights: string[];
}

export interface CulturalEvent {
  id: string;
  title: string;
  country: string;
  city: string;
  date: string;
  category: 'Music Festival' | 'Cultural Dance' | 'Arts Biennale' | 'Food & Wine' | 'Heritage Ritual';
  description: string;
  ticketPriceUSD: number;
  performerHighlights: string[];
  image: string;
  venue: string;
  verifiedOrganizer: string;
}

export interface TourismNews {
  id: string;
  country: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  urgency: 'positive' | 'info' | 'advisory';
}

export interface SubscriptionPlan {
  id: string;
  role: UserRole;
  title: string;
  priceUSD: number;
  billingCycle: 'annually' | 'per trip pass';
  tagline: string;
  features: string[];
  popular?: boolean;
}

export interface EmergencySOSDispatch {
  incidentId: string;
  timestamp: string;
  status: string;
  message: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dispatchedTo: {
    authority: string;
    phone?: string;
    etaMinutes?: number;
    status?: string;
    distanceKm?: number;
    count?: number;
    delivered?: boolean;
  }[];
  liveTrackingUrl: string;
  batteryLevel: number;
}
