import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// API Route: AI Dynamic Itinerary Generator
app.post('/api/itinerary/generate', async (req, res) => {
  const { countries, days, travelStyle, pace, budgetTier, interests, travelersCount } = req.body;

  if (!countries || !days) {
    return res.status(400).json({ error: 'Countries and days are required' });
  }

  const prompt = `You are Afrivoya's Principal Pan-African Safari & Travel Architect.
Create a hyper-detailed, authentic, connected day-by-day itinerary across ${Array.isArray(countries) ? countries.join(', ') : countries} for ${days} days.
Travel Style: ${travelStyle || 'Cultural & Wildlife Safari'}
Pace: ${pace || 'Balanced'}
Budget Tier: ${budgetTier || 'Mid-Range to Luxury Eco-Lodge'}
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests || 'Wildlife, UNESCO Heritage, Local Gastronomy'}
Travelers: ${travelersCount || 2} people.

Return ONLY a valid JSON object matching this structure:
{
  "title": "Short poetic title for the voyage",
  "summary": "2-3 sentences capturing the soul and highlights of the journey",
  "totalEstCostUSD": 2450,
  "transportModes": ["4x4 Land Cruiser", "Domestic Bush Flight", "Traditional Dhow / Ferry"],
  "days": [
    {
      "dayNumber": 1,
      "dateLabel": "Day 1",
      "region": "City or National Park Name, Country",
      "theme": "Theme of the day (e.g., Arrival & Spice Souks)",
      "morning": {
        "time": "08:30 AM",
        "title": "Morning activity title",
        "desc": "Detailed authentic activity description",
        "type": "activity",
        "estCostUSD": 45
      },
      "afternoon": {
        "time": "01:00 PM",
        "title": "Afternoon activity or dining",
        "desc": "Detailed activity or local authentic culinary stop",
        "type": "culinary_cultural",
        "estCostUSD": 30
      },
      "evening": {
        "time": "06:30 PM",
        "title": "Sunset game drive or traditional music gathering",
        "desc": "Sunset experience with sundowner drinks or cultural performance",
        "type": "relaxation_culture",
        "estCostUSD": 50
      },
      "accommodation": {
        "name": "Eco-Lodge or Heritage Boutique Hotel Name",
        "type": "Eco-Lodge | Safari Camp | Heritage Riad | Boutique Hotel",
        "rating": 4.9,
        "estPricePerNightUSD": 180,
        "ecoCertified": true
      },
      "transitNotes": "Route distance (e.g. 140km / 2.5h) and road condition notes"
    }
  ],
  "safetyAdvisories": [
    "Malaria prophylaxis guidance for safari reserves",
    "Yellow fever certificate requirement check",
    "Local currency tipping customs and mobile money tips"
  ],
  "packingHighlights": [
    "Neutral khaki/olive clothing for game drives",
    "Type G/D/C universal plug adapter",
    "Binoculars 8x42 for birding & big cats"
  ]
}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const jsonText = response.text?.trim() || '{}';
      const parsed = JSON.parse(jsonText);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Gemini Itinerary Generation Error:', err);
      // Fallback below
    }
  }

  // Curated Fallback Itinerary
  const fallbackItinerary = {
    title: `Afrivoya Signature: The ${Array.isArray(countries) ? countries[0] : countries} Grand Voyage`,
    summary: `An immersive journey connecting untamed savanna wilderness, ancestral heritage sanctuaries, and exquisite Pan-African gastronomy.`,
    totalEstCostUSD: 1850 * Math.max(1, Math.min(days, 7)),
    transportModes: ['Safari 4x4 Land Cruiser', 'Scenic Bush Charter', 'Traditional Dhow Canoe'],
    days: Array.from({ length: Math.min(Number(days) || 3, 10) }).map((_, idx) => ({
      dayNumber: idx + 1,
      dateLabel: `Day ${idx + 1}`,
      region: `${Array.isArray(countries) ? countries[idx % countries.length] : countries}`,
      theme: idx === 0 ? 'Savannah Arrival & Sunset Sundowner' : idx === 1 ? 'Big Five Dawn Game Drive & Maasai Boma' : 'Crater Exploration & Cultural Gastronomy',
      morning: {
        time: '06:00 AM',
        title: 'Dawn Golden Hour Game Safari',
        desc: 'Track lions, leopards, and herds of migratory wildebeest with certified expert guide.',
        type: 'activity',
        estCostUSD: 75,
      },
      afternoon: {
        time: '01:00 PM',
        title: 'Bush Lunch & Herbal Medicine Walk',
        desc: 'Locally sourced Swahili-spiced delicacies followed by an ethnobotanical flora tour with elder naturalists.',
        type: 'culinary_cultural',
        estCostUSD: 35,
      },
      evening: {
        time: '06:30 PM',
        title: 'Boma Firepit Gathering & Star Navigation',
        desc: 'Traditional acoustic drumming, stargazing under pollution-free African celestial skies, and storytelling.',
        type: 'relaxation_culture',
        estCostUSD: 40,
      },
      accommodation: {
        name: 'Savannah Horizon Eco-Sanctuary',
        type: 'Luxury Eco-Lodge',
        rating: 4.95,
        estPricePerNightUSD: 240,
        ecoCertified: true,
      },
      transitNotes: '110 km paved + gravel road. 4WD recommended. 2 hrs drive.',
    })),
    safetyAdvisories: [
      'Carry offline GPS cache when driving remote conservancies.',
      'Always listen to park rangers regarding wildlife distance (minimum 25m).',
      'Download M-Pesa / Mobile Money wallet for seamless remote gratuities.',
    ],
    packingHighlights: [
      'Earth-tone breathable long sleeves',
      'Polarized sunglasses and broad-brimmed safari hat',
      'High-SPF sunscreen and insect repellent with DEET/Picaridin',
    ],
  };

  return res.json(fallbackItinerary);
});

// API Route: Panic SOS Broadcast Simulator
app.post('/api/sos/broadcast', (req, res) => {
  const { latitude, longitude, country, travelerName, emergencyContacts, batteryLevel } = req.body;

  const incidentId = 'AFR-SOS-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toISOString();

  // Simulated emergency response dispatch
  res.json({
    success: true,
    incidentId,
    timestamp,
    status: 'DISPATCHED',
    message: 'Emergency broad spectrum alert registered across Pan-African emergency networks.',
    dispatchedTo: [
      { authority: `${country || 'Local'} Tourism Police Command`, phone: '112 / +254-20-222-2222', etaMinutes: 14 },
      { authority: 'Regional Flying Doctors / Air Ambulance Emergency Rescue', status: 'STANDBY', etaMinutes: 28 },
      { authority: 'Nearest Verified Afrivoya Host Agency & Field Ranger Unit', status: 'NOTIFIED', distanceKm: 4.2 },
      { authority: 'Configured Emergency Contacts via SMS/WhatsApp with Live GPS Pin', count: emergencyContacts?.length || 2, delivered: true },
    ],
    coordinates: { lat: latitude || -1.2921, lng: longitude || 36.8219 },
    liveTrackingUrl: `https://afrivoya.travel/sos-live/${incidentId}`,
    batteryLevel: batteryLevel || 88,
  });
});

// API Route: Pan-African Tourism News & Advisory Feed
app.get('/api/news', (req, res) => {
  res.json([
    {
      id: 'news-1',
      country: 'Pan-African',
      title: 'AU Free Movement & Unified African Visa Protocol Expands to 32 Nations',
      category: 'Visa & Border Policy',
      date: '2026-10-22',
      summary: 'Member states vote to expedite seamless cross-border single tourist visas modeled after the East Africa Tourist Visa and Schengen system.',
      urgency: 'positive',
    },
    {
      id: 'news-2',
      country: 'Rwanda & Uganda',
      title: 'Mountain Gorilla Population Reaches Record Milestone in Virunga Massif',
      category: 'Conservation',
      date: '2026-10-18',
      summary: 'Cooperative cross-border anti-poaching and eco-tourism revenue sharing drives wild gorilla census beyond 1,100 individuals.',
      urgency: 'positive',
    },
    {
      id: 'news-3',
      country: 'Tanzania & Kenya',
      title: 'Great Wildebeest Migration: Southern Serengeti Calving Season Update',
      category: 'Safari Advisory',
      date: '2026-10-15',
      summary: 'Heavy early rains spark lush savanna pasture growth across Ndutu plains, signaling early predator-prey dynamics for November-January.',
      urgency: 'info',
    },
    {
      id: 'news-4',
      country: 'Morocco & Egypt',
      title: 'High-Speed Rail & Solar Desert Express Openings Enhance Heritage Corridors',
      category: 'Infrastructure',
      date: '2026-10-10',
      summary: 'New eco-friendly electrified transit lines connect Cairo to Luxor and Tangier to Marrakech with sub-3 hour travel times.',
      urgency: 'info',
    },
  ]);
});

// Start server with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, () => {
    console.log(`Afrivoya server running on port ${PORT}`);
  });
}

startServer();
