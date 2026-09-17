import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Sparkles, ShieldCheck, DollarSign, MapPin, Star, HelpCircle, Check, AlertTriangle } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';

interface DecisionSupportScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedProperty?: PropertyItem;
}

export const DecisionSupportScreen: React.FC<DecisionSupportScreenProps> = ({ onNavigate, selectedProperty }) => {
  const [checklist, setChecklist] = useState({
    trustReviewed: true,
    monthlyCostUnderstood: true,
    oneTimeCostsUnderstood: false,
    commuteChecked: true,
    studentExperiencesReviewed: false,
    agreementReviewed: false,
    cancellationPolicyReviewed: false
  });

  const property = selectedProperty || {
    name: 'Scholar Haven Deluxe PG',
    location: 'Koramangala 5th Block, near University Gate 2',
    rent: '₹9,500 / mo',
    distance: '0.4 km',
    verified: true
  };

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('property-details')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Property</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">AI Decision Support ✨</h1>
            <p className="text-xs text-zinc-400">Informed guidance, trade-offs, and pre-booking checklist for {property.name}.</p>
          </div>
        </div>
      </div>

      {/* Before You Book Checklist */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-200 shadow-xs mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-zinc-900">Before You Book Checklist</h3>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
            {completedCount} / {totalCount} Completed
          </span>
        </div>
        <p className="text-xs text-zinc-600 mb-6">Review these verified parameters before submitting your booking request.</p>

        <div className="space-y-3">
          {[
            { key: 'trustReviewed', label: 'Trust information reviewed (Owner ID & Title Deed verified)' },
            { key: 'monthlyCostUnderstood', label: 'Monthly cost understood (Rent ₹9,500 + estimated utilities)' },
            { key: 'oneTimeCostsUnderstood', label: 'One-time costs understood (Security deposit & escrow fee)' },
            { key: 'commuteChecked', label: 'Commute checked (0.4 km, 6 mins walk to campus)' },
            { key: 'studentExperiencesReviewed', label: 'Student experiences reviewed (14 verified reviews)' },
            { key: 'agreementReviewed', label: 'Rental agreement and house rules reviewed' },
            { key: 'cancellationPolicyReviewed', label: 'Cancellation & refund policy understood' }
          ].map(item => {
            const isChecked = checklist[item.key as keyof typeof checklist];
            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key as any)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  isChecked ? 'bg-emerald-50/30 border-emerald-300 text-zinc-900' : 'bg-white border-zinc-200 hover:border-orange-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                  isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-zinc-300 bg-white'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-zinc-900' : 'text-zinc-700'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Trade-offs & Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>What Fits Your Preferences</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Within your preferred monthly budget (₹9,500 vs max ₹12,000).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Ultra-close to campus (0.4 km, walking distance).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>High-speed Wi-Fi and study desk included in rent.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700 font-extrabold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Key Trade-offs & Missing Info</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">!</span>
              <span>Electricity is billed separately based on sub-meter (approx ₹400-₹600/mo).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">!</span>
              <span>Gate curfew is 11:00 PM on weekdays.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Suggested Questions to Ask Owner */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-200 shadow-xs">
        <h3 className="text-base font-extrabold text-zinc-900 mb-2">Before booking, you may want to ask about:</h3>
        <p className="text-xs text-zinc-600 mb-4">Questions generated from missing or variable property details.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Are guests allowed on weekends?",
            "What is the exact electricity rate per unit?",
            "Is the security deposit refundable immediately upon moving out?",
            "Is bicycle parking available inside the premises?"
          ].map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-bold text-zinc-800 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
