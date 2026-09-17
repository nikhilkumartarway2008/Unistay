import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Sparkles, Search, Star, CheckCircle2, Truck, Wifi, Utensils, WashingMachine } from 'lucide-react';
import { ScreenType, PartnerItem } from '../types';

interface PartnerDirectoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PartnerDirectoryScreen: React.FC<PartnerDirectoryScreenProps> = ({ onNavigate }) => {
  const [filterType, setFilterType] = useState<string>('All');

  const partners: PartnerItem[] = [
    {
      id: '1',
      name: 'Campus Wash & Fold Laundry',
      type: 'Service',
      city: 'Bengaluru',
      verificationStatus: 'Verified',
      rating: 4.8,
      reviewsCount: 142,
      description: 'Daily pickup and delivery student laundry service with eco-friendly wash and iron.'
    },
    {
      id: '2',
      name: 'SwiftMove Student Relocation',
      type: 'Moving',
      city: 'Bengaluru',
      verificationStatus: 'Verified',
      rating: 4.9,
      reviewsCount: 98,
      description: 'Specialized luggage and room shifting service for college students with transparent flat rates.'
    },
    {
      id: '3',
      name: 'Airtel GigaFiber Student Fast-Link',
      type: 'Internet',
      city: 'Delhi',
      verificationStatus: 'Verified',
      rating: 4.7,
      reviewsCount: 215,
      description: 'High-speed zero-latency fiber broadband installation with no long-term lock-in for PGs.'
    },
    {
      id: '4',
      name: 'Annapurna Daily Tiffin & Mess',
      type: 'Food',
      city: 'Ranchi',
      verificationStatus: 'Verified',
      rating: 4.6,
      reviewsCount: 84,
      description: 'Hygenic home-cooked North & South Indian meals delivered right to your PG door.'
    }
  ];

  const filteredPartners = partners.filter(p => {
    if (filterType !== 'All' && p.type !== filterType) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">Partner Ecosystem (Phase 9)</div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">UniStay Verified Partner Network & Trust Passports 2.0</h1>
            <p className="text-xs text-zinc-400 mt-1">Discover verified moving, laundry, internet, and food providers with complete trust transparency.</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-3 rounded-2xl border border-zinc-200 shadow-xs">
        {['All', 'Service', 'Moving', 'Internet', 'Food'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === type
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {type} Partners
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPartners.map(partner => (
          <div key={partner.id} className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 mb-1">
                    {partner.type} • {partner.city}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-zinc-900">{partner.name}</h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Trust Passport Verified</span>
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">{partner.description}</p>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{partner.rating} / 5.0</span>
                <span className="text-zinc-400 font-normal">({partner.reviewsCount} student reviews)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700">Available in service zone</span>
              <button
                onClick={() => onNavigate('student-services')}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20"
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
