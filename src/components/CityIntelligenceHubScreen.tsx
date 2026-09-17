import React, { useState } from 'react';
import { ArrowLeft, Building2, Sparkles, TrendingUp, MapPin, DollarSign, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { ScreenType } from '../types';

interface CityIntelligenceHubScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentCity: string;
}

export const CityIntelligenceHubScreen: React.FC<CityIntelligenceHubScreenProps> = ({ onNavigate, currentCity }) => {
  const [selectedCity, setSelectedCity] = useState(currentCity || 'Bengaluru');

  const cityDataMap: Record<string, any> = {
    Bengaluru: {
      supply: 'High (1,840 verified PGs & apartments)',
      demand: 'Very High (+24% YoY student influx)',
      avgRent: '₹11,500 / mo',
      costRange: '₹7,000 - ₹22,000 / mo',
      topAreas: [
        { name: 'Koramangala', rent: '₹12,500/mo', commute: '10 mins to Christ Univ', safety: '4.8/5' },
        { name: 'BTM Layout', rent: '₹9,500/mo', commute: '15 mins to PES Univ', safety: '4.6/5' },
        { name: 'Indiranagar', rent: '₹16,000/mo', commute: '20 mins to Mount Carmel', safety: '4.9/5' }
      ],
      transportScore: '4.7/5 (Metro, BMTC buses, Namma Yatri)',
      foodScore: '4.9/5 (Abundant student messes, cafes, tiffin services)'
    },
    Delhi: {
      supply: 'Very High (2,450 verified properties)',
      demand: 'High (Peak admission season surge)',
      avgRent: '₹9,800 / mo',
      costRange: '₹6,000 - ₹18,000 / mo',
      topAreas: [
        { name: 'North Campus (Kamla Nagar)', rent: '₹10,500/mo', commute: '5 mins walk to DU Colleges', safety: '4.5/5' },
        { name: 'South Campus (Satya Niketan)', rent: '₹11,000/mo', commute: '5 mins to DU South Campus', safety: '4.7/5' }
      ],
      transportScore: '4.8/5 (Delhi Metro connectivity)',
      foodScore: '4.8/5 (Legendary student cafeterias & street food)'
    },
    Ranchi: {
      supply: 'Moderate (420 verified stays)',
      demand: 'Stable',
      avgRent: '₹7,500 / mo',
      costRange: '₹5,000 - ₹12,000 / mo',
      topAreas: [
        { name: 'Lalpur', rent: '₹8,000/mo', commute: '8 mins to Ranchi Univ', safety: '4.6/5' },
        { name: 'Bariatu', rent: '₹7,000/mo', commute: '12 mins to RIMS / BIT', safety: '4.5/5' }
      ],
      transportScore: '4.2/5 (Auto-rickshaws, cabs)',
      foodScore: '4.3/5 (Local tiffin & home messes)'
    }
  };

  const currentInfo = cityDataMap[selectedCity] || cityDataMap['Bengaluru'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('multi-city-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Multi-City Network</span>
        </button>

        <div className="flex items-center gap-2">
          {['Bengaluru', 'Delhi', 'Ranchi'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === c
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">City Intelligence Hub (Phase 9)</div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Student Life & Accommodation Intelligence in {selectedCity}</h1>
            <p className="text-xs text-zinc-400 mt-1">Reliable supply, demand, typical cost ranges, and student area analytics.</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-[24px] p-5 border border-zinc-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Accommodation Supply</div>
          <div className="text-base font-extrabold text-zinc-900">{currentInfo.supply}</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ 100% Trust Verified</div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-zinc-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Market Demand</div>
          <div className="text-base font-extrabold text-zinc-900">{currentInfo.demand}</div>
          <div className="text-[10px] text-orange-600 font-bold mt-1">High campus proximity demand</div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-zinc-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Typical Cost Range</div>
          <div className="text-base font-extrabold text-zinc-900">{currentInfo.costRange}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Avg: {currentInfo.avgRent}</div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-zinc-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Student Infrastructure</div>
          <div className="text-base font-extrabold text-zinc-900">Verified & Scored</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Transport: {currentInfo.transportScore.split(' ')[0]}</div>
        </div>
      </div>

      {/* Popular Student Areas */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-200 shadow-xs mb-8">
        <h3 className="text-base font-extrabold text-zinc-900 mb-4">Top Student Areas in {selectedCity}</h3>
        <div className="space-y-4">
          {currentInfo.topAreas.map((area: any, idx: number) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="font-extrabold text-sm text-zinc-900">{area.name}</span>
                </div>
                <p className="text-xs text-zinc-600">Commute: {area.commute} • Safety Score: {area.safety}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Average Rent</div>
                  <div className="text-sm font-extrabold text-orange-600">{area.rent}</div>
                </div>
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  View Stays
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Services & Food Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-3">
          <h4 className="font-extrabold text-sm text-zinc-900">Transport & Accessibility</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">{currentInfo.transportScore}</p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('transport-intelligence')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              <span>Explore transport routes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-3">
          <h4 className="font-extrabold text-sm text-zinc-900">Student Food & Mess Ecosystem</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">{currentInfo.foodScore}</p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('food-intelligence')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              <span>Explore food & messes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
