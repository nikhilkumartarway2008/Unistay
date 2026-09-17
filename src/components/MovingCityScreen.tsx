import React, { useState } from 'react';
import { ArrowLeft, Compass, Sparkles, MapPin, Calendar, DollarSign, GraduationCap, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface MovingCityScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectCity: (cityName: string) => void;
}

export const MovingCityScreen: React.FC<MovingCityScreenProps> = ({ onNavigate, onSelectCity }) => {
  const [destinationCity, setDestinationCity] = useState('Delhi');
  const [university, setUniversity] = useState('Delhi University (North Campus)');
  const [moveInDate, setMoveInDate] = useState('2026-10-01');
  const [budget, setBudget] = useState('12000');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('multi-city-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Multi-City Network</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">Cross-City Relocation (Phase 9)</div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">I'm Moving to Another City 🚀</h1>
            <p className="text-xs text-zinc-400 mt-1">Configure your destination city, university, move-in date, and budget to generate an instant settlement plan.</p>
          </div>
        </div>
      </div>

      {!isGenerated ? (
        <form onSubmit={handleGeneratePlan} className="bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Destination City</label>
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-sm outline-none bg-white font-bold text-zinc-900"
              >
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Ranchi">Ranchi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">University / College</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-sm outline-none font-bold text-zinc-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Target Move-in Date</label>
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-sm outline-none font-bold text-zinc-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Monthly Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-sm outline-none font-bold text-zinc-900"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-orange-600 text-white text-sm font-extrabold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Cross-City Settlement Plan ✨</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-emerald-50 border border-emerald-200 rounded-[28px] p-6 text-emerald-900 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Relocation Plan Generated</div>
              <h3 className="text-lg font-extrabold">Moving to {destinationCity} for {university}</h3>
              <p className="text-xs text-emerald-800">Your preferences, verification status, and past reviews have been linked to your new city profile.</p>
            </div>
            <button
              onClick={() => {
                onSelectCity(destinationCity);
                onNavigate('student-life-home');
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shrink-0"
            >
              Activate {destinationCity} Mode 🚀
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-zinc-900">Recommended Stays in {destinationCity}</h4>
              <p className="text-xs text-zinc-600">Filtered for budget ≤ ₹{Number(budget).toLocaleString()} & campus proximity.</p>
              <button
                onClick={() => {
                  onSelectCity(destinationCity);
                  onNavigate('explore');
                }}
                className="w-full py-3 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md hover:bg-orange-700 transition-colors"
              >
                Explore Verified Properties in {destinationCity}
              </button>
            </div>

            <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-zinc-900">First-Week Settlement Checklist</h4>
              <ul className="space-y-2 text-xs text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verify move-in inspection guidelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Save university route & metro transit card</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Connect with verified student laundry & moving partners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
