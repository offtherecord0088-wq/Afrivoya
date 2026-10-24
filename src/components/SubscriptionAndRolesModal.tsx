import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Building2, 
  Award, 
  UserCheck, 
  Sparkles, 
  X,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserRole, SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS, PAYMENT_GATEWAYS } from '../data/plans';
import { playKalimbaChime } from '../utils/audio';

interface SubscriptionAndRolesModalProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onClose: () => void;
}

export const SubscriptionAndRolesModal: React.FC<SubscriptionAndRolesModalProps> = ({
  currentRole,
  onSelectRole,
  onClose,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('tourist-annual');
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('flutterwave');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [paymentPhone, setPaymentPhone] = useState('+254 712 345 678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];
  const selectedGateway = PAYMENT_GATEWAYS.find((g) => g.id === selectedGatewayId) || PAYMENT_GATEWAYS[0];

  // Currency multiplier approximations
  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    KES: { symbol: 'KSh', rate: 129.5 },
    NGN: { symbol: '₦', rate: 1650 },
    ZAR: { symbol: 'R', rate: 18.2 },
    GHS: { symbol: 'GH₵', rate: 15.8 },
    XOF: { symbol: 'CFA', rate: 600 },
    MAD: { symbol: 'DH', rate: 10.1 },
  };

  const currentRate = currencyRates[selectedCurrency] || currencyRates.USD;
  const convertedPrice = Math.round(selectedPlan.priceUSD * currentRate.rate);

  const handleProcessPayment = () => {
    setIsProcessing(true);
    playKalimbaChime();

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      onSelectRole(selectedPlan.role);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6ED] rounded-3xl max-w-3xl w-full border-2 border-[#D4A373] shadow-2xl max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#4A3B32] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#4A3B32] via-[#332822] to-[#1F1814] text-white rounded-t-3xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-2">
            <CreditCard className="w-4 h-4" />
            <span>Afrivoya Pan-African Tier Activation</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
            Select Your Pan-African Access Tier
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            Choose your membership tier with unified payments across Flutterwave, Paystack, M-Pesa, MTN MoMo, and international cards.
          </p>
        </div>

        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#1F1814]">
              Subscription Activated Successfully!
            </h3>
            <p className="text-xs text-[#4A3B32]/80 max-w-md mx-auto">
              Your <strong>{selectedPlan.title}</strong> is now live across all 54 African countries. Receipt and digital accreditation have been dispatched to your account.
            </p>
            <div className="py-2.5 px-4 bg-[#FAEDCD] text-[#4A3B32] rounded-xl text-xs font-mono font-bold inline-block border border-[#D4A373]/40">
              ACTIVATION CODE: AFR-{selectedPlan.role.toUpperCase()}-2027-{Math.floor(10000 + Math.random() * 90000)}
            </div>
            <div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 rounded-xl bg-[#4A3B32] text-[#FAEDCD] text-xs font-bold shadow-md hover:bg-[#332822]"
              >
                Access Platform as {selectedPlan.role.toUpperCase()}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-8">
            {/* 3 Tier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => {
                      playKalimbaChime();
                      setSelectedPlanId(plan.id);
                    }}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-white border-[#BC4749] ring-2 ring-[#BC4749]/30 shadow-lg'
                        : 'bg-white/60 border-[#D4A373]/30 hover:bg-white hover:border-[#D4A373]'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#BC4749] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#4A3B32]/70 tracking-wider">
                          {plan.role} Tier
                        </span>
                        <span className="text-xs font-bold text-stone-500">
                          {plan.billingCycle}
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold text-base text-[#1F1814] leading-snug">
                        {plan.title}
                      </h4>

                      <div className="mt-3 mb-3">
                        <span className="text-2xl font-black text-[#BC4749] font-display">
                          ${plan.priceUSD}
                        </span>
                        <span className="text-xs text-[#4A3B32]/60 font-medium ml-1">
                          / {plan.billingCycle === 'annually' ? 'year' : 'trip'}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#4A3B32]/80 leading-relaxed mb-4">
                        {plan.tagline}
                      </p>

                      <ul className="space-y-1.5 text-[11px] text-[#4A3B32]/85">
                        {plan.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-emerald-700 font-bold shrink-0">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className={`w-full py-2 rounded-xl text-center text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#BC4749] text-white'
                          : 'bg-[#F4F1DE] text-[#4A3B32]'
                      }`}>
                        {isSelected ? 'Selected Tier' : 'Select Plan'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Gateway & Currency Converter Section */}
            <div className="bg-white p-5 rounded-2xl border border-[#D4A373]/40 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1F1814]">
                    Payment Gateway & Pan-African Mobile Money
                  </h4>
                  <p className="text-xs text-[#4A3B32]/70">
                    Supports local African currencies with zero cross-border exchange penalties.
                  </p>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center space-x-1 bg-[#F4F1DE] px-2 py-1 rounded-xl border border-[#D4A373]/30">
                  <span className="text-[10px] font-bold text-[#4A3B32]">Currency:</span>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="text-xs font-bold text-[#4A3B32] bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    {Object.keys(currencyRates).map((curr) => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gateway Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_GATEWAYS.map((gw) => {
                  const isSelected = selectedGatewayId === gw.id;
                  return (
                    <div
                      key={gw.id}
                      onClick={() => {
                        playKalimbaChime();
                        setSelectedGatewayId(gw.id);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FAEDCD]/40 border-[#C29B38] ring-2 ring-[#C29B38]/30 shadow-xs'
                          : 'bg-white border-gray-200 hover:border-[#D4A373]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-xs text-[#1F1814]">{gw.name}</span>
                        <span className="text-[10px] font-bold bg-[#4A3B32] text-[#FAEDCD] px-1.5 py-0.5 rounded">
                          {gw.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#4A3B32]/70">{gw.regions}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {gw.methods.slice(0, 3).map((m, i) => (
                          <span key={i} className="text-[9px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Phone / Mobile Money Input */}
              {selectedGatewayId === 'mobile-money' && (
                <div className="p-3 bg-[#FAEDCD]/50 rounded-xl border border-[#D4A373]/30">
                  <label className="text-[11px] font-bold text-[#4A3B32] block mb-1">
                    Mobile Money Wallet Number (USSD / STK Push Prompt):
                  </label>
                  <input
                    type="text"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    className="w-full text-xs font-mono p-2 rounded-lg bg-white border border-[#D4A373]/40 focus:outline-hidden"
                    placeholder="+254 7XX XXX XXX or +233 XX XXX XXXX"
                  />
                  <span className="text-[10px] text-[#4A3B32]/70 mt-1 block">
                    You will receive an instant push prompt on your handset to enter PIN.
                  </span>
                </div>
              )}
            </div>

            {/* Total Due & Confirm Button */}
            <div className="p-4 bg-gradient-to-r from-[#F4F1DE] to-[#FAEDCD] rounded-2xl border border-[#D4A373]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#4A3B32]/70 block">Total Due ({selectedPlan.billingCycle}):</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-[#BC4749] font-display">
                    ${selectedPlan.priceUSD}
                  </span>
                  {selectedCurrency !== 'USD' && (
                    <span className="text-sm font-bold text-[#4A3B32]">
                      (~ {currentRate.symbol} {convertedPrice.toLocaleString()} {selectedCurrency})
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C29B38] to-[#D4A373] hover:brightness-105 active:scale-98 text-[#1F1814] font-extrabold text-xs shadow-md shadow-[#C29B38]/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing with {selectedGateway.name}...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize {selectedPlan.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
