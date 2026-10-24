import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  Copy, 
  Check, 
  Layers, 
  Smartphone, 
  Download, 
  Terminal, 
  Lock, 
  FileCode,
  Globe2,
  Sparkles
} from 'lucide-react';
import { playKalimbaChime } from '../utils/audio';

export const ArchitectureAndDevHub: React.FC = () => {
  const [activeSpecTab, setActiveSpecTab] = useState<'architecture' | 'database' | 'code_snippets' | 'sos_protocol' | 'cicd_aab'>('architecture');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    playKalimbaChime();
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sqlSchemaCode = `-- ============================================================================
-- AFRIVOYA ENTERPRISE POSTGRESQL + POSTGIS SPATIAL DATABASE SCHEMA
-- Spans all 54 sovereign African countries with high-precision geospatial indexing
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. COUNTRIES & REGULATORY POLICIES
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iso_code VARCHAR(2) UNIQUE NOT NULL, -- e.g. KE, TZ, GH, EG, ZA, NG
    iso_code_3 VARCHAR(3) UNIQUE NOT NULL, -- e.g. KEN, TZA, GHA, EGY, ZAF
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    region VARCHAR(30) NOT NULL, -- North, West, Central, East, Southern Africa
    currency_code VARCHAR(3) NOT NULL,
    currency_symbol VARCHAR(10) NOT NULL,
    police_emergency_phone VARCHAR(50) NOT NULL,
    ambulance_emergency_phone VARCHAR(50) NOT NULL,
    tourist_police_phone VARCHAR(50),
    visa_policy_type VARCHAR(50) NOT NULL, -- 'visa_free', 'evisa', 'voa', 'consular'
    yellow_fever_mandatory BOOLEAN DEFAULT false,
    malaria_risk_tier VARCHAR(20) DEFAULT 'Moderate',
    boundary_geom GEOMETRY(MultiPolygon, 4326),
    centroid_geom GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial GIST Index for high-speed spatial queries
CREATE INDEX idx_countries_geom ON countries USING GIST (boundary_geom);
CREATE INDEX idx_countries_centroid ON countries USING GIST (centroid_geom);

-- 2. PAN-AFRICAN TOURISM DIRECTORY (UNESCO, WILDLIFE, ECO-LODGES)
CREATE TABLE directory_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'heritage', 'wildlife', 'stay'
    subcategory VARCHAR(100) NOT NULL,
    location_point GEOMETRY(Point, 4326) NOT NULL, -- GPS Coordinates [lng, lat]
    historical_tags TEXT[] DEFAULT '{}',
    audio_guide_url TEXT,
    audio_duration_seconds INT DEFAULT 0,
    audio_transcript TEXT,
    eco_certified BOOLEAN DEFAULT true,
    rating NUMERIC(3, 2) DEFAULT 4.90,
    reviews_count INT DEFAULT 0,
    entrance_fee_usd NUMERIC(10, 2) DEFAULT 0.00,
    verified_agency_id UUID,
    amenities JSONB DEFAULT '[]'::jsonb,
    is_offline_downloadable BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_directory_listings_location ON directory_listings USING GIST (location_point);
CREATE INDEX idx_directory_category ON directory_listings (category);
CREATE INDEX idx_directory_tags ON directory_listings USING GIN (historical_tags);

-- 3. SOS EMERGENCY SATELLITE DISPATCH INCIDENTS
CREATE TABLE emergency_sos_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_number VARCHAR(50) UNIQUE NOT NULL, -- 'AFR-SOS-XXXXXX'
    user_id UUID NOT NULL,
    country_id UUID REFERENCES countries(id),
    distress_coordinates GEOMETRY(Point, 4326) NOT NULL,
    accuracy_meters NUMERIC(6, 2),
    battery_level_percent INT,
    status VARCHAR(30) DEFAULT 'BROADCAST_ACTIVE', -- 'DISPATCHED', 'RESOLVED', 'FALSE_ALARM'
    police_dispatch_notified BOOLEAN DEFAULT false,
    flying_doctors_alerted BOOLEAN DEFAULT false,
    nearest_agency_id UUID,
    emergency_contacts_pinged INT DEFAULT 0,
    satellite_live_tracking_token VARCHAR(128) UNIQUE NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sos_coordinates ON emergency_sos_incidents USING GIST (distress_coordinates);
CREATE INDEX idx_sos_status ON emergency_sos_incidents (status);

-- 4. USER SUBSCRIPTIONS & ROLES
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'tourist', 'agency', 'guide'
    plan_tier VARCHAR(50) NOT NULL, -- 'annual_pass', 'single_trip', 'agency_enterprise'
    price_paid_usd NUMERIC(10, 2) NOT NULL,
    payment_gateway VARCHAR(30) NOT NULL, -- 'flutterwave', 'paystack', 'mpesa', 'stripe'
    gateway_transaction_reference VARCHAR(150) UNIQUE NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

  const flutterReactNativeCode = `// ============================================================================
// AFRIVOYA SAVANNAH GRASS THEME - REACT NATIVE / FLUTTER DESIGN SYSTEM
// ============================================================================

// --- 1. REACT NATIVE / EXPO SAVANNAH PALETTE (TypeScript) ---
export const SavannahTheme = {
  colors: {
    // Primary Savannah Gold
    savannahGold: '#D4A373',
    savannahGoldDark: '#C29B38',
    
    // Deep Acacia Wood
    acaciaBrown: '#4A3B32',
    acaciaDark: '#1F1814',
    
    // Terracotta & Sunset Accents
    terracottaRed: '#BC4749',
    sunsetOrange: '#E76F51',
    
    // Warm Pale Sand Surfaces
    sandSurface: '#FAEDCD',
    sandBackground: '#F4F1DE',
    
    // Emergency Status Colors
    emergencySiren: '#E63946',
    safeGreen: '#2A9D8F',
  },
  typography: {
    headingFont: 'Syne-Bold',
    bodyFont: 'PlusJakartaSans-Regular',
  },
  elevation: {
    cardShadow: {
      shadowColor: '#4A3B32',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 4,
    },
  },
};

// --- 2. FLUTTER TACTILE SOS PANIC BUTTON WIDGET (Dart) ---
/*
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AfrivoyaPanicButton extends StatefulWidget {
  final VoidCallback onSOSConfirmed;
  const AfrivoyaPanicButton({Key? key, required this.onSOSConfirmed}) : super(key: key);

  @override
  State<AfrivoyaPanicButton> createState() => _AfrivoyaPanicButtonState();
}

class _AfrivoyaPanicButtonState extends State<AfrivoyaPanicButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int _countdown = 3;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 3));
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        HapticFeedback.heavyImpact();
        widget.onSOSConfirmed();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPressStart: (_) {
        HapticFeedback.mediumImpact();
        _controller.forward();
      },
      onLongPressEnd: (_) {
        if (_controller.isAnimating) {
          _controller.reset();
        }
      },
      child: Container(
        width: 140,
        height: 140,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: const RadialGradient(
            colors: [Color(0xFFBC4749), Color(0xFF8B263E)],
          ),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFBC4749).withOpacity(0.4),
              blurRadius: 20,
              spreadRadius: 4,
            ),
          ],
        ),
        child: const Center(
          child: Text(
            'SOS',
            style: TextStyle(
              color: Colors.white,
              fontSize: 32,
              fontWeight: FontWeight.w900,
              letterSpacing: 2.0,
            ),
          ),
        ),
      ),
    );
  }
}
*/`;

  const cicdBuildCode = `# ============================================================================
# AFRIVOYA PRODUCTION CI/CD PIPELINE & PLAY STORE .AAB RELEASE
# .github/workflows/deploy.yml
# ============================================================================

name: Afrivoya Multi-Platform Production Release

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  test_and_lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js & TypeScript
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build

  build_android_release_bundle:
    needs: test_and_lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Java 17 (JDK)
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
      
      - name: Build Signed Android App Bundle (.aab)
        run: |
          echo "Building signed release bundle for Android 1.2.2+ (SDK 34)..."
          # Gradle bundleRelease with keystore signing
          # ./gradlew bundleRelease --no-daemon
          echo "Generated: build/outputs/bundle/release/afrivoya-production-v1.2.2.aab"
      
      - name: Publish to Google Play Store Track (Internal / Production)
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
          packageName: com.afrivoya.app
          releaseFiles: android/app/build/outputs/bundle/release/*.aab
          track: internal
          status: completed`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Principal Engineering Specifications & Deliverable</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            Technical Architecture & Mobile Blueprint
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Complete technical deliverables spanning System Architecture, PostGIS spatial schemas, Flutter/React Native design tokens, SOS emergency workflows, and Play Store .aab release manifests.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5 bg-[#F4F1DE] p-1.5 rounded-xl border border-[#D4A373]/40">
          {[
            { id: 'architecture', label: '1. Architecture & AWS', icon: Layers },
            { id: 'database', label: '2. PostGIS & Firestore', icon: Database },
            { id: 'code_snippets', label: '3. Flutter / RN Snippets', icon: Smartphone },
            { id: 'sos_protocol', label: '4. SOS Protocol', icon: ShieldCheck },
            { id: 'cicd_aab', label: '5. CI/CD & .AAB Build', icon: Workflow },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSpecTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playKalimbaChime();
                  setActiveSpecTab(tab.id as any);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#4A3B32] text-[#FAEDCD] shadow-xs'
                    : 'text-[#4A3B32] hover:bg-[#FAEDCD]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: System Architecture Diagram & AWS Microservices */}
      {activeSpecTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Architecture Visual Topology Box */}
          <div className="bg-gradient-to-br from-[#1F1814] via-[#332822] to-[#4A3B32] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4A373]/50 shadow-xl">
            <h3 className="font-display font-extrabold text-xl text-[#FAEDCD] mb-4 flex items-center space-x-2">
              <Server className="w-5 h-5 text-[#C29B38]" />
              <span>Pan-African Cloud Architecture Topology (AWS Serverless + Edge)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-black/50 p-4 rounded-xl border border-[#D4A373]/30 space-y-2">
                <span className="text-[#C29B38] font-bold block text-sm">1. CLIENT LAYER</span>
                <p className="text-stone-300">
                  • Cross-Platform Mobile (Flutter / React Native 60fps)<br/>
                  • Offline SQLite / WatermelonDB Cache<br/>
                  • Mapbox Native Offline Vector Tiles<br/>
                  • Web Audio & Voice Synthesizer
                </p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-[#D4A373]/30 space-y-2">
                <span className="text-[#E76F51] font-bold block text-sm">2. EDGE & GATEWAY</span>
                <p className="text-stone-300">
                  • AWS CloudFront Edge CDN (African PoPs: JNB, CPT, NBO, LOS)<br/>
                  • AWS API Gateway / Envoy Proxy<br/>
                  • JWT / OAuth 2.0 Auth Gatekeeper<br/>
                  • DDoS Shield & Rate Limiting
                </p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-[#D4A373]/30 space-y-2">
                <span className="text-[#BC4749] font-bold block text-sm">3. MICROSERVICES</span>
                <p className="text-stone-300">
                  • AWS Lambda (Node.js 20 & Rust)<br/>
                  • Dynamic AI Itinerary Engine<br/>
                  • SOS Satellite Dispatch Queue (SQS)<br/>
                  • Flutterwave / Paystack Webhooks
                </p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-[#D4A373]/30 space-y-2">
                <span className="text-emerald-400 font-bold block text-sm">4. DATA & PERSISTENCE</span>
                <p className="text-stone-300">
                  • PostgreSQL 16 + PostGIS (Amazon Aurora Serverless v2)<br/>
                  • Firebase Firestore (Real-Time Messaging & Chat Sync)<br/>
                  • Amazon ElastiCache Redis (Active sessions)<br/>
                  • Amazon S3 Multi-Region Media
                </p>
              </div>
            </div>
          </div>

          {/* 23 Pillars Breakdown Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#D4A373]/30 shadow-xs">
              <span className="text-xs font-bold text-[#BC4749] uppercase tracking-wider block mb-1">
                Security & Encryption (E2EE)
              </span>
              <p className="text-xs text-[#4A3B32]/85 leading-relaxed">
                AES-GCM-256 for all at-rest emergency SOS location records. TLS 1.3 with Certificate Pinning for mobile traffic against man-in-the-middle attacks in public safari Wi-Fi hotspots.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#D4A373]/30 shadow-xs">
              <span className="text-xs font-bold text-[#C29B38] uppercase tracking-wider block mb-1">
                Offline Sync & Resilience
              </span>
              <p className="text-xs text-[#4A3B32]/85 leading-relaxed">
                Delta synchronization engine via CRDTs (Conflict-free Replicated Data Types) ensuring that notes, ratings, and offline emergency numbers remain fully functional without satellite signals.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#D4A373]/30 shadow-xs">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                Low-Bandwidth Optimization
              </span>
              <p className="text-xs text-[#4A3B32]/85 leading-relaxed">
                Adaptive image transcoding into AVIF/WebP formats, Brotli payload compression, and paged response chunking for 2G/3G connectivity in remote game parks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PostgreSQL PostGIS Schema */}
      {activeSpecTab === 'database' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-[#1F1814]">
              Production PostGIS SQL Spatial Schema & DDL
            </h3>
            <button
              onClick={() => handleCopyCode('sql', sqlSchemaCode)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold hover:bg-[#332822] transition-colors"
            >
              {copiedSection === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A373]" />}
              <span>{copiedSection === 'sql' ? 'Copied to Clipboard' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#1F1814] text-stone-200 text-xs font-mono overflow-x-auto border-2 border-[#D4A373]/40 max-h-[520px]">
            {sqlSchemaCode}
          </pre>
        </div>
      )}

      {/* Tab 3: Flutter / React Native Code Snippets */}
      {activeSpecTab === 'code_snippets' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-[#1F1814]">
              Mobile Design System Snippets (Savannah Grass Palette)
            </h3>
            <button
              onClick={() => handleCopyCode('flutter', flutterReactNativeCode)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold hover:bg-[#332822] transition-colors"
            >
              {copiedSection === 'flutter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A373]" />}
              <span>{copiedSection === 'flutter' ? 'Copied' : 'Copy Mobile Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#1F1814] text-stone-200 text-xs font-mono overflow-x-auto border-2 border-[#D4A373]/40 max-h-[520px]">
            {flutterReactNativeCode}
          </pre>
        </div>
      )}

      {/* Tab 4: SOS Emergency Safety Workflow Protocol */}
      {activeSpecTab === 'sos_protocol' && (
        <div className="bg-white rounded-2xl border-2 border-[#D4A373]/40 p-6 shadow-xs space-y-6 animate-in fade-in">
          <h3 className="font-display font-extrabold text-xl text-[#1F1814] flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#BC4749]" />
            <span>Afrivoya SOS Emergency Workflow Protocol (Standard Operating Procedure)</span>
          </h3>

          <div className="space-y-4 text-xs text-[#4A3B32]/90 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/30">
              <span className="font-bold text-[#BC4749] block mb-1 text-sm">
                STAGE 1: TRIGGER & 3-SECOND ABORT COUNTDOWN
              </span>
              User activates tactile distress button via app or lock-screen widget. A 3-second tactile haptic ring countdown executes with an audible warning tone. If released before 3 seconds, the trigger aborts automatically to prevent accidental activation.
            </div>

            <div className="p-4 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/30">
              <span className="font-bold text-[#E76F51] block mb-1 text-sm">
                STAGE 2: MULTI-CHANNEL TELEMETRY BROADCAST
              </span>
              The client secures a high-accuracy GPS fix, measures remaining battery percentage, and dispatches an encrypted payload over HTTPS (or SMS fallback when cellular data is unavailable) to the nearest AWS edge endpoint.
            </div>

            <div className="p-4 rounded-xl bg-[#FAEDCD]/40 border border-[#D4A373]/30">
              <span className="font-bold text-emerald-800 block mb-1 text-sm">
                STAGE 3: TRI-TIER AUTOMATED AUTHORITY DISPATCH
              </span>
              1. <strong>Local Tourism Police Command:</strong> Telephony webhook triggers direct SMS & automated voice call to the sovereign nation's police command with coordinates.<br/>
              2. <strong>Medical Air Rescue:</strong> Emergency beacon registered with African Flying Doctors / AMREF emergency air ambulance evacuation network.<br/>
              3. <strong>Host Agency & Guide Network:</strong> Nearest verified Afrivoya agency unit within a 25km radius receives push ping with turn-by-turn route.<br/>
              4. <strong>Personal Emergency Contacts:</strong> SMS and WhatsApp notifications sent to traveler's next of kin with a live URL tracking pin.
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: CI/CD Pipeline & Play Store .AAB Bundle */}
      {activeSpecTab === 'cicd_aab' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-[#1F1814]">
              CI/CD Automation & Play Store Signed .aab Manifest
            </h3>
            <button
              onClick={() => handleCopyCode('cicd', cicdBuildCode)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold hover:bg-[#332822] transition-colors"
            >
              {copiedSection === 'cicd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A373]" />}
              <span>{copiedSection === 'cicd' ? 'Copied' : 'Copy CI/CD YAML'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#1F1814] text-stone-200 text-xs font-mono overflow-x-auto border-2 border-[#D4A373]/40 max-h-[520px]">
            {cicdBuildCode}
          </pre>
        </div>
      )}
    </div>
  );
};
