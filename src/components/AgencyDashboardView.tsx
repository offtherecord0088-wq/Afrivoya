import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Radio, 
  FileText, 
  Plus, 
  ArrowUpRight, 
  Code,
  Key,
  ShieldCheck,
  Send
} from 'lucide-react';
import { playKalimbaChime } from '../utils/audio';

export const AgencyDashboardView: React.FC = () => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [quoteSentNotice, setQuoteSentNotice] = useState<string | null>(null);

  const leads = [
    {
      id: 'lead-1',
      traveler: 'Marcus & Elena Vance (United Kingdom)',
      destination: 'Serengeti Migration & Zanzibar Dhow Safari',
      pax: 2,
      budget: '$8,400',
      days: 8,
      status: 'Quotation Pending',
    },
    {
      id: 'lead-2',
      traveler: 'Dr. Kwesi Mensah (Ghana Diaspora / US)',
      destination: 'Ethiopia Lalibela Pilgrimage & Simien Mountains',
      pax: 4,
      budget: '$11,200',
      days: 10,
      status: 'Deposit Paid (40%)',
    },
    {
      id: 'lead-3',
      traveler: 'Sophie Moreau (France)',
      destination: 'Bwindi Gorilla Trekking & Queen Elizabeth NP',
      pax: 2,
      budget: '$5,900',
      days: 6,
      status: 'Quotation Pending',
    },
  ];

  const handleSendQuote = (traveler: string) => {
    playKalimbaChime();
    setQuoteSentNotice(`Custom itinerary & invoice dispatched to ${traveler}`);
    setTimeout(() => {
      setQuoteSentNotice(null);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4A373]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C29B38] uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified Tourism Agency Command Portal</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F1814]">
            African Safari & Hospitality Operator Console
          </h2>
          <p className="text-sm text-[#4A3B32]/80 mt-1 max-w-2xl">
            Live inventory synchronization, automated traveler lead pipelines, affiliate commission payouts, and direct emergency coordination with regional tourism police.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Gold Agency Status</span>
          </span>
        </div>
      </div>

      {quoteSentNotice && (
        <div className="mb-6 p-3.5 bg-emerald-900 text-emerald-100 rounded-xl text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{quoteSentNotice}</span>
          </div>
          <button onClick={() => setQuoteSentNotice(null)} className="text-emerald-300">×</button>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#4A3B32]/70 font-semibold">
            <span>Pending Leads Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#1F1814] mt-2 font-display">$25,500</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">↑ 18% vs last month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#4A3B32]/70 font-semibold">
            <span>Direct Inquiries</span>
            <Users className="w-4 h-4 text-[#BC4749]" />
          </div>
          <div className="text-2xl font-black text-[#1F1814] mt-2 font-display">14 Active</div>
          <div className="text-[11px] text-[#4A3B32]/70 mt-1">From UK, US, Germany, Nigeria</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#4A3B32]/70 font-semibold">
            <span>Affiliate Revenue Commission</span>
            <TrendingUp className="w-4 h-4 text-[#C29B38]" />
          </div>
          <div className="text-2xl font-black text-[#C29B38] mt-2 font-display">$4,180</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">Ready for M-Pesa / Bank EFT</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#4A3B32]/70 font-semibold">
            <span>API Sync Health</span>
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2 font-display">99.98%</div>
          <div className="text-[11px] text-[#4A3B32]/70 mt-1">42 safari vehicles & 18 lodges mapped</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Lead Management Pipeline (Left 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#D4A373]/40 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h3 className="font-display font-extrabold text-base text-[#1F1814]">
              Incoming Traveler Leads & Quotation Engine
            </h3>
            <span className="text-xs bg-[#FAEDCD] text-[#4A3B32] px-2.5 py-1 rounded-md font-bold">
              3 Requires Fast Response
            </span>
          </div>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-xl bg-[#FAEDCD]/30 border border-[#D4A373]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAEDCD]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-display font-bold text-sm text-[#1F1814]">
                      {lead.traveler}
                    </h4>
                    <span className="text-[10px] bg-[#4A3B32] text-[#FAEDCD] px-2 py-0.5 rounded font-mono">
                      {lead.pax} Guests
                    </span>
                  </div>
                  <div className="text-xs text-[#4A3B32]/80 mt-0.5">
                    Destination: <strong>{lead.destination}</strong> ({lead.days} Days)
                  </div>
                  <div className="text-[11px] text-[#BC4749] font-bold mt-1">
                    Indicative Budget: {lead.budget} &bull; Status: {lead.status}
                  </div>
                </div>

                <button
                  onClick={() => handleSendQuote(lead.traveler)}
                  className="px-3.5 py-2 rounded-xl bg-[#4A3B32] hover:bg-[#332822] text-[#FAEDCD] text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Send Instant Quote</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Inventory Connector & Key (Right 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#D4A373]/40 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
            <Code className="w-4 h-4 text-[#C29B38]" />
            <span>Afrivoya B2B API Inventory Connector</span>
          </div>

          <p className="text-xs text-[#4A3B32]/80 leading-relaxed">
            Connect your agency's booking engine (Bedsonline, Sabre, local PMS) directly via GraphQL or Webhooks to push live lodge availability and vehicle seat allocations.
          </p>

          <div className="p-3 bg-[#F4F1DE] rounded-xl border border-[#D4A373]/30 text-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#4A3B32]/70 mb-1">
              <span>AGENCY API KEY (LIVE)</span>
              <button
                onClick={() => setApiKeyVisible(!apiKeyVisible)}
                className="text-[#BC4749] underline"
              >
                {apiKeyVisible ? 'Hide' : 'Reveal'}
              </button>
            </div>
            <div className="font-bold text-[#1F1814] truncate">
              {apiKeyVisible ? 'afr_live_sec_89218294719284719283' : '••••••••••••••••••••••••••••••••'}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span>Webhook Endpoint</span>
              <span className="font-bold">Active (200 OK)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span>Rate Limit Remaining</span>
              <span className="font-bold">98,400 req/day</span>
            </div>
          </div>

          <button
            onClick={() => {
              playKalimbaChime();
              alert('API documentation & Postman Collection opened in developer tab!');
            }}
            className="w-full py-2.5 rounded-xl bg-[#FAEDCD] text-[#4A3B32] text-xs font-bold hover:bg-[#F4F1DE] transition-colors border border-[#D4A373]/40"
          >
            Download REST / GraphQL SDK
          </button>
        </div>
      </div>
    </div>
  );
};
