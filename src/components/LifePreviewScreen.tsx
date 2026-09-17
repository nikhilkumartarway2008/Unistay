import React, { useState } from 'react';
import { 
  ArrowLeft, Compass, Sun, BookOpen, Utensils, Moon, Home, Sparkles, 
  ChevronRight, Wifi, Shield, MapPin, Coffee, Clock, Navigation, 
  CheckCircle2, AlertCircle, ShoppingBag, Pill, Bus, Dumbbell, ArrowRight
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface LifePreviewScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedProperty: PropertyItem | null;
}

export const LifePreviewScreen: React.FC<LifePreviewScreenProps> = ({ onNavigate, selectedProperty }) => {
  const property = selectedProperty || PLACEHOLDER_PROPERTIES[0];
  const [campusDays, setCampusDays] = useState<number>(5);
  const [mapRadius, setMapRadius] = useState<'1km' | '2km' | '5km'>('2km');

  // Commute calculation
  const distanceVal = property.distanceKm || 0.8;
  const roundTripMin = Math.round(distanceVal * 18); // e.g. 0.8km -> ~15-20 min round trip
  const monthlyCommuteHours = Math.round((roundTripMin * campusDays * 4) / 60);
  const yearlyCommuteHours = monthlyCommuteHours * 10; // 10 academic months

  const timelineSteps = [
    { time: '7:00 AM', title: 'Wake up & Morning Routine', desc: `Fresh morning atmosphere at ${property.name} with natural sunlight.`, icon: Sun },
    { time: '8:00 AM', title: 'Leave Accommodation', desc: `Commute via public transport or walking (${property.distance} from campus).`, icon: Compass },
    { time: '8:25 AM', title: 'Reach University Campus', desc: 'Seamless arrival at university gates for morning lectures.', icon: MapPin },
    { time: '1:00 PM', title: 'Lunch & Student Cafes', desc: 'Dining at campus cafeterias or nearby student eateries.', icon: Utensils },
    { time: '5:00 PM', title: 'Leave Campus', desc: 'Return journey back to your student residence.', icon: Compass },
    { time: '5:30 PM', title: 'Return Home & Relax', desc: 'Unwind in your verified student living room.', icon: Home },
    { time: '7:00 PM', title: 'Study Session', desc: 'Focused study hours with high-speed Wi-Fi and quiet environment.', icon: BookOpen },
    { time: '10:30 PM', title: 'Rest & Sleep', desc: 'Quiet hours and secure resting environment.', icon: Moon }
  ];

  const nearbyPlaces = [
    { category: 'Grocery', name: 'Campus Fresh Supermarket', distance: '0.3 km', icon: ShoppingBag, verified: true },
    { category: 'Pharmacy', name: 'University Health Pharmacy', distance: '0.4 km', icon: Pill, verified: true },
    { category: 'Food', name: 'Scholar Dining & Cafes', distance: '0.2 km', icon: Utensils, verified: true },
    { category: 'Transport', name: 'North Gate Bus Stop', distance: '0.1 km', icon: Bus, verified: true },
    { category: 'Gym', name: 'FitLife Student Gym', distance: '0.9 km', icon: Dumbbell, verified: false },
    { category: 'Study', name: 'Central Campus Library', distance: '0.8 km', icon: BookOpen, verified: true },
  ];

  const categoryIndicators = [
    { label: 'Campus Access', status: 'Strong', desc: `${property.distance} distance from campus` },
    { label: 'Study Environment', status: 'Strong', desc: 'Quiet zone with verified Wi-Fi & study desk' },
    { label: 'Food Convenience', status: 'Moderate', desc: 'Mess facility & nearby cafes' },
    { label: 'Transport', status: 'Strong', desc: 'Frequent bus and walking routes' },
    { label: 'Privacy', status: 'High Privacy', desc: 'Private room configuration' },
    { label: 'Trust Information', status: 'High Completeness', desc: 'Verified Trust Passport active' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('living-cost')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Living Cost</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            Signature Feature
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-[28px] p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              UniStay Life Intelligence
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Preview Your Life</h1>
            <p className="text-sm text-orange-100 max-w-lg">
              "Don't just see the room. Preview the life." Understand what everyday living will actually feel like at {property.name}.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/20 text-center min-w-[200px]">
            <div className="text-xs text-orange-100 uppercase tracking-wider mb-1">Lifestyle Compatibility</div>
            <div className="text-3xl font-extrabold text-white">{property.matchPercentage}</div>
          </div>
        </div>
      </div>

      {/* 12. COMMUTE INTELLIGENCE & 13. TIME COST */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Commute Intelligence & Time Cost</h3>
            <p className="text-xs text-zinc-500">Calculate how much time you will spend traveling based on your weekly schedule.</p>
          </div>
          <Clock className="w-6 h-6 text-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 text-center">
            <div className="text-[11px] font-bold text-zinc-400 uppercase">Campus Distance</div>
            <div className="text-2xl font-bold text-zinc-900 mt-1">{property.distance}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Short proximity route</div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 text-center">
            <div className="text-[11px] font-bold text-zinc-400 uppercase">Daily Round Trip</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">≈ {roundTripMin} mins</div>
            <div className="text-[11px] text-zinc-500 mt-1">Estimated travel duration</div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 text-center">
            <div className="text-[11px] font-bold text-zinc-400 uppercase">Monthly Time Spent</div>
            <div className="text-2xl font-extrabold text-zinc-900 mt-1">≈ {monthlyCommuteHours} hours</div>
            <div className="text-[11px] text-zinc-500 mt-1">≈ {yearlyCommuteHours} hours / academic year</div>
          </div>
        </div>

        {/* Adjust Campus Days */}
        <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-orange-900 mb-0.5">Your Campus Schedule:</div>
            <p className="text-[11px] text-orange-800">Adjust how many days per week you attend classes on campus.</p>
          </div>
          <div className="flex items-center gap-2">
            {[3, 4, 5, 6].map(days => (
              <button
                key={days}
                onClick={() => setCampusDays(days)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${campusDays === days ? 'bg-orange-500 text-white shadow-xs' : 'bg-white text-zinc-700 border border-orange-200'}`}
              >
                {days} days/wk
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 11. DAILY LIFE TIMELINE */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Your Daily Life Timeline</h3>
            <p className="text-xs text-zinc-500">Example weekday routine based on your selected campus schedule.</p>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-orange-200">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex items-start gap-4 pl-14">
                <div className="absolute left-3 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm text-xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-zinc-900">{step.title}</h4>
                    <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">{step.time}</span>
                  </div>
                  <p className="text-xs text-zinc-600">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 14. DAILY LIFE SCORE & CATEGORY INDICATORS */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <h3 className="text-xl font-bold text-zinc-900 mb-1">Category-Level Indicators</h3>
        <p className="text-xs text-zinc-500 mb-6">Objective indicators based on available verification data. No arbitrary universal scores.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryIndicators.map((ind, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900">{ind.label}</span>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{ind.status}</span>
              </div>
              <p className="text-[11px] text-zinc-500">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 15 & 16. NEARBY ESSENTIALS & STUDENT LIFE MAP */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Nearby Student Essentials</h3>
            <p className="text-xs text-zinc-500">Verified locations surrounding {property.name}.</p>
          </div>

          <div className="flex items-center gap-1.5">
            {(['1km', '2km', '5km'] as const).map(rad => (
              <button
                key={rad}
                onClick={() => setMapRadius(rad)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mapRadius === rad ? 'bg-orange-500 text-white shadow-xs' : 'bg-[#FAF8F5] text-zinc-700 border border-orange-200'}`}
              >
                Within {rad}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {nearbyPlaces.map((place, idx) => {
            const Icon = place.icon;
            return (
              <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900">{place.name}</h4>
                    <span className="text-[10px] text-zinc-500">{place.category} · {place.distance}</span>
                  </div>
                </div>
                {place.verified && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">✓ Verified</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 17. LIFE PREVIEW INSIGHT GENERATED FROM REAL DATA */}
      <div className="bg-orange-50/80 border border-orange-200 rounded-[28px] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-orange-600" />
          <h3 className="font-bold text-lg text-orange-950">Your Life Preview Summary</h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          "This stay keeps your campus commute relatively short ({property.distance}) and has several daily essentials nearby. The main unknown is the actual monthly electricity cost, which depends on personal AC usage."
        </p>
      </div>

      {/* BOTTOM STICKY NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 p-4 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('living-cost')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Back to Living Cost</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('comparison')}
              className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md shadow-orange-500/20 flex items-center gap-2"
            >
              <span>Next: Compare Stays ✨</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
