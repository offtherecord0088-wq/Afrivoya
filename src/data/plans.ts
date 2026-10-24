import { SubscriptionPlan, UserRole } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'tourist-annual',
    role: 'tourist',
    title: 'Pan-African Explorer Pass',
    priceUSD: 200,
    billingCycle: 'annually',
    tagline: 'Unlimited access across all 54 African countries for frequent adventurers and diaspora travelers.',
    features: [
      'Unlimited AI dynamic day-by-day itinerary planner',
      'Instant broad-spectrum SOS panic safety suite with satellite GPS dispatch',
      'Complete offline maps, route vectors & emergency databases for all 54 nations',
      'Direct direct-to-host bookings with zero booking fees',
      'Full audio guide access with native master storyteller narrations',
      'Exclusive invitations to VIP cultural festivals, concerts & arts biennales',
      '24/7 dedicated Pan-African tourist concierge line',
    ],
    popular: true,
  },
  {
    id: 'tourist-trip',
    role: 'tourist',
    title: 'Single Voyage Access Pass',
    priceUSD: 35,
    billingCycle: 'per trip pass',
    tagline: 'Valid for 30 consecutive days in up to 3 African countries.',
    features: [
      'AI dynamic day-by-day planner for 1 customized expedition',
      'Full SOS emergency safety suite with live dispatch for 30 days',
      'Offline maps and emergency clinic directory for selected countries',
      'Direct guide & eco-lodge booking channels',
      'Curated audio guide highlights',
    ],
  },
  {
    id: 'agency-annual',
    role: 'agency',
    title: 'Verified Tourism Agency Partner',
    priceUSD: 500,
    billingCycle: 'annually',
    tagline: 'Empowering certified African tour operators, safari outfits, and hospitality networks.',
    features: [
      'Verified Gold Agency Trust Badge on pan-African directory',
      'REST & GraphQL API connector to sync real-time tour inventory & seat availability',
      'Direct traveler lead management portal & custom quotation engine',
      'Affiliate revenue commission on hotel, vehicle & excursion bookings',
      'Priority emergency coordination channel with local tourism police command',
      'Detailed analytics dashboard for traveler demographics & booking trends',
      'Multi-agent staff accounts (up to 10 dispatchers)',
    ],
  },
  {
    id: 'guide-annual',
    role: 'guide',
    title: 'Certified Tourist Guide Accreditation',
    priceUSD: 100,
    billingCycle: 'annually',
    tagline: 'For licensed naturalists, mountaineering leaders, and cultural heritage docents.',
    features: [
      'Verified Guide Badge & National Tourism Board License Verification',
      'Tour assignment marketplace with instant direct booking requests',
      'Direct encrypted tourist messaging & real-time trip coordination',
      'Instant payout via M-Pesa, MTN MoMo, Orange Money, or local bank EFT',
      'Personal multimedia guide profile with verified traveler reviews & badges',
      'Free wilderness first-aid & emergency SOS protocol digital training',
    ],
  },
];

export interface PaymentGateway {
  id: string;
  name: string;
  badge: string;
  regions: string;
  methods: string[];
  currencies: string[];
}

export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'flutterwave',
    name: 'Flutterwave Barter',
    badge: 'Pan-African Leader',
    regions: 'All 54 Countries (Pan-Africa)',
    methods: ['Debit/Credit Card', 'Bank Transfer', 'USSD', 'M-Pesa', 'MTN MoMo', 'Airtel Money'],
    currencies: ['USD', 'KES', 'NGN', 'ZAR', 'GHS', 'RWF', 'UGX', 'TZS'],
  },
  {
    id: 'paystack',
    name: 'Paystack (by Stripe)',
    badge: 'West & Southern Africa',
    regions: 'Nigeria, Ghana, South Africa, Kenya, Côte d\'Ivoire',
    methods: ['Mastercard / Visa / Verve', 'EFT Instant', 'Apple Pay', 'Mobile Money'],
    currencies: ['NGN', 'GHS', 'ZAR', 'KES', 'USD'],
  },
  {
    id: 'mobile-money',
    name: 'Direct Mobile Money (USSD / STK Push)',
    badge: 'Zero Card Needed',
    regions: 'East, West & Central Africa',
    methods: ['Safaricom M-Pesa (Kenya/Tanzania)', 'MTN MoMo', 'Orange Money', 'Airtel Money'],
    currencies: ['KES', 'TZS', 'UGX', 'GHS', 'XOF', 'RWF'],
  },
  {
    id: 'stripe-paypal',
    name: 'Stripe & PayPal Global',
    badge: 'International Travelers',
    regions: 'Worldwide (US, Europe, Asia, Americas)',
    methods: ['Visa', 'Mastercard', 'American Express', 'PayPal', 'Google Pay', 'Apple Pay'],
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY'],
  },
];

export const MOCK_VERIFIED_GUIDES = [
  {
    id: 'guide-1',
    name: 'Kiprono Cheruiyot',
    badge: 'Gold Level Naturalist (KPSGA)',
    country: 'Kenya',
    specialty: 'Big Cat Behavior & Great Migration Tracking',
    languages: ['English', 'Kiswahili', 'Maa (Maasai)'],
    experienceYears: 14,
    rating: 4.99,
    reviewsCount: 342,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedLicense: 'KPSGA-GL-2024-889',
    dayRateUSD: 140,
    availableStatus: 'Available for Booking',
  },
  {
    id: 'guide-2',
    name: 'Amina Mansour',
    badge: 'National Heritage Docent',
    country: 'Morocco',
    specialty: 'Islamic Architecture, Medina Crafts & High Atlas Trails',
    languages: ['Arabic', 'Français', 'English', 'Tamazight'],
    experienceYears: 11,
    rating: 4.98,
    reviewsCount: 285,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verifiedLicense: 'MOR-GUIDE-MED-042',
    dayRateUSD: 110,
    availableStatus: 'Available for Booking',
  },
  {
    id: 'guide-3',
    name: 'Blessing Adeyemi',
    badge: 'UNESCO Heritage Specialist',
    country: 'Nigeria & Benin',
    specialty: 'Yoruba Sacred Groves, Dahomey Kingdoms & Ouidah',
    languages: ['English', 'Yorùbá', 'Français'],
    experienceYears: 9,
    rating: 4.96,
    reviewsCount: 198,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verifiedLicense: 'NATOP-EXP-2025-110',
    dayRateUSD: 125,
    availableStatus: 'Available for Booking',
  },
  {
    id: 'guide-4',
    name: 'Innocent Uwimana',
    badge: 'Master Primate Tracker',
    country: 'Rwanda & Uganda',
    specialty: 'Mountain Gorilla Behavior, Birding & Volcano Ascents',
    languages: ['Kinyarwanda', 'English', 'Français', 'Swahili'],
    experienceYears: 16,
    rating: 5.0,
    reviewsCount: 412,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verifiedLicense: 'RDB-PRI-TRK-007',
    dayRateUSD: 160,
    availableStatus: 'Available for Booking',
  },
];
