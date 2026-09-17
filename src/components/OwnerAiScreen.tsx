import React from 'react';
import { ScreenType, PropertyItem } from '../types';
import { Sparkles, ArrowLeft, Shield, Building2, CheckCircle2, AlertCircle, BarChart3, Users, ChevronRight } from 'lucide-react';

interface OwnerAiScreenProps {
  onNavigate: (screen: ScreenType) => void;
  properties: PropertyItem[];
}

export const OwnerAiScreen: React.FC<OwnerAiScreenProps> = ({ onNavigate, properties }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => onNavigate('owner-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Owner Dashboard
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Owner Property Intelligence ✨</h1>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">AI Analytics Active</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Real-time insights on student search behavior, listing health, and Trust Passport verification.</p>
        </div>

        <button
          onClick={() => alert("Owner AI Assistant: Based on student demand in your locality, adding verified Wi-Fi and a study desk increases booking conversion by 42%.")}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Ask Owner AI ✨
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-zinc-500 uppercase">Listing Health</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs">94% Optimal</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 mb-1">{properties.length} Active Listings</div>
          <p className="text-xs text-zinc-500">All properties meet UniStay trust verification standards.</p>
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-zinc-500 uppercase">Student Demand</span>
            <span className="p-2 rounded-xl bg-orange-50 text-orange-700 font-bold text-xs">High Surge</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 mb-1">142 Matches / Week</div>
          <p className="text-xs text-zinc-500">Students frequently searching within 1.5 km radius.</p>
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-zinc-500 uppercase">Missing Information</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs">Low Risk</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 mb-1">0 Critical Gaps</div>
          <p className="text-xs text-zinc-500">All utilities & rental breakdowns are fully documented.</p>
        </div>
      </div>

      {/* Common Student Requirements Section */}
      <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-lg text-zinc-900">What students in your area are looking for right now</h3>
        </div>
        <p className="text-xs text-zinc-600 mb-6">Aggregated from verified student search preferences across campus regions.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'High-Speed Wi-Fi', demand: '94% of students', badge: 'Must Have' },
            { title: 'Dedicated Study Desk', demand: '88% of students', badge: 'Must Have' },
            { title: 'In-Premise Laundry', demand: '79% of students', badge: 'Preferred' },
            { title: 'Attached Bathroom', demand: '72% of students', badge: 'Preferred' }
          ].map((req, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded">{req.badge}</span>
                <span className="text-xs text-zinc-500">{req.demand}</span>
              </div>
              <h4 className="font-bold text-sm text-zinc-900">{req.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Property Intelligence List */}
      <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-xs">
        <h3 className="font-bold text-lg text-zinc-900 mb-4">Your Property Match Diagnostics</h3>
        {properties.length === 0 ? (
          <p className="text-xs text-zinc-500">No properties added yet. Add a property to view detailed AI intelligence and student match insights.</p>
        ) : (
          <div className="space-y-4">
            {properties.map(prop => (
              <div key={prop.id} className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">✓ Trust Passport Active</span>
                    <span className="text-[10px] text-zinc-500 font-medium">{prop.category}</span>
                  </div>
                  <h4 className="font-bold text-base text-zinc-900">{prop.name}</h4>
                  <p className="text-xs text-zinc-500">{prop.location} · Rent: <strong className="text-amber-700">{prop.rent}</strong></p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Match Conversion</div>
                    <div className="text-sm font-bold text-emerald-600">High (95%)</div>
                  </div>
                  <button
                    onClick={() => alert(`AI Insight for ${prop.name}: Listing is fully optimized. 14 students viewed this property today.`)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600"
                  >
                    View Insights ✨
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
