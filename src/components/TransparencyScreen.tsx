import React from 'react';
import { ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { ScreenType } from '../types';

interface TransparencyScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const TransparencyScreen: React.FC<TransparencyScreenProps> = ({ onNavigate }) => {
  const verifiedList = [
    'Verified owner identity and background records',
    'Physically audited property address and geo-coordinates',
    'Transparent rent structure without undocumented surge fees',
    'Working power backup, water supply, and verified high-speed Wi-Fi'
  ];

  const thingsToKnowList = [
    { title: 'Additional charges', desc: 'Potential variable utility fees (electricity meter reading)' },
    { title: 'Restrictions', desc: 'Visitor timings & campus curfew guidelines' },
    { title: 'Missing amenities', desc: 'Some rooms may not include personal laundry machines (common facility available)' },
    { title: 'Information requiring confirmation', desc: 'Exact room availability for the upcoming academic term' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-28">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('property-details')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Property</span>
        </button>

        <button
          onClick={() => onNavigate('booking')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-sm"
        >
          <span>Next: Proceed to Booking</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          Unbiased Decision Support
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Before you book</h2>
        <p className="text-sm text-orange-100 max-w-xl">
          UniStay is committed to radical transparency. We highlight both verified strengths and crucial considerations so you can make an informed choice without anxiety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* WHAT WE VERIFIED */}
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">WHAT WE VERIFIED</h3>
              <p className="text-xs text-zinc-500">Confirmed facts & audits</p>
            </div>
          </div>

          <div className="space-y-4">
            {verifiedList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* THINGS TO KNOW */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">THINGS TO KNOW</h3>
              <p className="text-xs text-zinc-500">Important trade-offs & notices</p>
            </div>
          </div>

          <div className="space-y-4">
            {thingsToKnowList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900">{item.title}</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
