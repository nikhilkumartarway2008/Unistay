import React, { useState } from 'react';
import { ScreenType, PropertyItem, StudentPreferences } from '../types';
import { Sparkles, ArrowLeft, Shield, MapPin, CheckCircle2, ChevronRight, SlidersHorizontal, Heart, Building2 } from 'lucide-react';

interface AiMatchesProps {
  onNavigate: (screen: ScreenType) => void;
  properties: PropertyItem[];
  preferences: StudentPreferences | null;
  onSelectProperty: (property: PropertyItem) => void;
}

export const AiMatchesScreen: React.FC<AiMatchesProps> = ({ onNavigate, properties, preferences, onSelectProperty }) => {
  const [filterMode, setFilterMode] = useState<'all' | 'good' | 'verified'>('all');

  const calculateMatch = (prop: PropertyItem) => {
    let score = 92;
    if (prop.rentNumeric && preferences && prop.rentNumeric > preferences.maxBudget) {
      score -= 15;
    }
    if (prop.distanceKm && preferences && prop.distanceKm > preferences.maxDistanceKm) {
      score -= 10;
    }
    return Math.max(70, Math.min(99, score));
  };

  const filtered = properties.filter(p => {
    if (filterMode === 'good') return calculateMatch(p) >= 90;
    if (filterMode === 'verified') return p.verified;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your personalized stays ✨</h1>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">LifeMatch Active</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Matched to what matters to your lifestyle, study routine, and budget.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('ai-onboarding')}
            className="px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Edit Living Profile
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Recommendations' },
          { id: 'good', label: '90%+ Match Only' },
          { id: 'verified', label: 'Trust Passport Verified' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterMode === tab.id ? 'bg-orange-500 text-white shadow-xs' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">
          <Building2 className="w-12 h-12 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 mb-1">No accommodations match this filter</h3>
          <p className="text-xs text-zinc-500 mb-6 max-w-md mx-auto">
            Try adjusting your budget or distance filters in your living profile to discover more verified stays.
          </p>
          <button
            onClick={() => onNavigate('ai-onboarding')}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs"
          >
            Update Living Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map(prop => {
            const score = calculateMatch(prop);
            return (
              <div
                key={prop.id}
                onClick={() => {
                  onSelectProperty(prop);
                  onNavigate('property-details');
                }}
                className="bg-white rounded-3xl border border-orange-100/80 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all cursor-pointer overflow-hidden flex flex-col sm:flex-row group"
              >
                <div className="relative sm:w-56 h-56 sm:h-auto overflow-hidden bg-zinc-100 shrink-0">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-orange-600 shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {score}% Match
                  </div>
                  {prop.verified && (
                    <div className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1">
                      <Shield className="w-3 h-3 text-orange-400" />
                      Trust Verified
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">{prop.category}</span>
                      <span className="text-xs text-zinc-500">{prop.distance}</span>
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    {/* Why this fits you box */}
                    <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100 mb-4 space-y-1.5">
                      <div className="text-[11px] font-bold text-orange-800 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Why this fits you:
                      </div>
                      <ul className="text-xs text-zinc-700 space-y-1">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          Within monthly budget ({prop.rent})
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          {prop.distance} from campus commute
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          {prop.roomType || 'Private Room'} matches preference
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Estimated Living Cost</div>
                      <div className="font-bold text-zinc-900 text-sm">{prop.rent}</div>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-sm group-hover:bg-orange-600 transition-colors flex items-center gap-1">
                      View LifeMatch <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
