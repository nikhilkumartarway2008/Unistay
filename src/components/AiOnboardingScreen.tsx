import React, { useState } from 'react';
import { ScreenType, StudentPreferences, ImportanceLevel } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Shield, CheckCircle2, MapPin, DollarSign, Home, Coffee, Wifi } from 'lucide-react';

interface AiOnboardingProps {
  onNavigate: (screen: ScreenType) => void;
  onSavePreferences: (prefs: StudentPreferences) => void;
}

export const AiOnboardingScreen: React.FC<AiOnboardingProps> = ({ onNavigate, onSavePreferences }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<StudentPreferences>({
    university: 'State University',
    city: 'Campus City',
    locality: 'North Campus',
    moveInDate: '2026-10-01',
    maxBudget: 14000,
    comfortableBudget: 11000,
    moveInBudget: 25000,
    accommodationType: ['PG / Hostel', 'Shared Flat'],
    roomType: 'Private Room',
    maxDistanceKm: 2.0,
    maxTravelTimeMin: 20,
    transportPreference: 'Walking / Bike',
    studyEnvironment: 'Must Have',
    privacyPreference: 'Preferred',
    socialEnvironment: 'Flexible',
    foodPreference: 'Vegetarian Preference with Mess',
    amenities: {
      wifi: 'Must Have',
      ac: 'Preferred',
      washingMachine: 'Preferred',
      attachedBathroom: 'Preferred',
      studyTable: 'Must Have',
      powerBackup: 'Must Have',
      parking: 'Not Important',
      security: 'Must Have',
      laundry: 'Preferred',
      housekeeping: 'Flexible'
    }
  });

  const handleComplete = () => {
    onSavePreferences(preferences);
    onNavigate('ai-matches');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 pb-28">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Student Living Intelligence · Step {step} of 4
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          {step === 1 && "Tell UniStay about your studies & budget"}
          {step === 2 && "Choose your accommodation & distance"}
          {step === 3 && "Study environment, privacy & food"}
          {step === 4 && "Essential amenities & priorities"}
        </h2>
        <p className="text-sm text-zinc-600 max-w-lg mx-auto">
          UniStay uses your living profile to calculate a personalized <strong className="text-orange-600">LifeMatch ✨</strong> score and explain why each stay fits your routine.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-xs space-y-6">
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">University / College Name</label>
              <input
                type="text"
                value={preferences.university}
                onChange={e => setPreferences({ ...preferences, university: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                placeholder="e.g. State University"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Preferred Locality / Area</label>
                <input
                  type="text"
                  value={preferences.locality}
                  onChange={e => setPreferences({ ...preferences, locality: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  placeholder="e.g. North Campus Gate"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Target Move-In Date</label>
                <input
                  type="date"
                  value={preferences.moveInDate}
                  onChange={e => setPreferences({ ...preferences, moveInDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Maximum Monthly Budget (₹)</label>
                <input
                  type="number"
                  value={preferences.maxBudget}
                  onChange={e => setPreferences({ ...preferences, maxBudget: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Comfortable Monthly Budget (₹)</label>
                <input
                  type="number"
                  value={preferences.comfortableBudget}
                  onChange={e => setPreferences({ ...preferences, comfortableBudget: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3">Preferred Accommodation Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['PG / Hostel', 'Flat', 'Shared', 'Near Campus'].map(type => {
                  const selected = preferences.accommodationType.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        if (selected) {
                          setPreferences({ ...preferences, accommodationType: preferences.accommodationType.filter(t => t !== type) });
                        } else {
                          setPreferences({ ...preferences, accommodationType: [...preferences.accommodationType, type] });
                        }
                      }}
                      className={`p-4 rounded-2xl border text-xs font-bold transition-all text-left ${selected ? 'border-orange-500 bg-orange-50/60 text-orange-800 shadow-xs' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3">Room Preference</label>
              <div className="grid grid-cols-2 gap-3">
                {['Private Room', 'Shared Room'].map(room => (
                  <button
                    key={room}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, roomType: room })}
                    className={`p-4 rounded-2xl border text-xs font-bold transition-all text-left ${preferences.roomType === room ? 'border-orange-500 bg-orange-50/60 text-orange-800 shadow-xs' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Max Campus Distance: {preferences.maxDistanceKm} km</label>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.2"
                  value={preferences.maxDistanceKm}
                  onChange={e => setPreferences({ ...preferences, maxDistanceKm: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Max Travel Time: {preferences.maxTravelTimeMin} mins</label>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="5"
                  value={preferences.maxTravelTimeMin}
                  onChange={e => setPreferences({ ...preferences, maxTravelTimeMin: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Study Environment Importance</label>
                <select
                  value={preferences.studyEnvironment}
                  onChange={e => setPreferences({ ...preferences, studyEnvironment: e.target.value as ImportanceLevel })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium bg-white"
                >
                  <option value="Must Have">Must Have (Quiet, dedicated study zones)</option>
                  <option value="Preferred">Preferred</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Not Important">Not Important</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Privacy Preference</label>
                <select
                  value={preferences.privacyPreference}
                  onChange={e => setPreferences({ ...preferences, privacyPreference: e.target.value as ImportanceLevel })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium bg-white"
                >
                  <option value="Must Have">Must Have (High privacy, minimal disturbance)</option>
                  <option value="Preferred">Preferred</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Not Important">Not Important</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Food & Dining Requirement</label>
                <input
                  type="text"
                  value={preferences.foodPreference}
                  onChange={e => setPreferences({ ...preferences, foodPreference: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  placeholder="e.g. Vegetarian Mess included or Self-cooking kitchen"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Essential Amenities Priority</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
              {Object.entries(preferences.amenities).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-2xl border border-zinc-100 bg-[#FAF8F5]">
                  <span className="text-xs font-bold text-zinc-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <select
                    value={val}
                    onChange={e => setPreferences({
                      ...preferences,
                      amenities: { ...preferences.amenities, [key]: e.target.value as ImportanceLevel }
                    })}
                    className="px-2.5 py-1 rounded-xl border border-orange-200 text-xs font-bold bg-white text-orange-700 focus:outline-none"
                  >
                    <option value="Must Have">Must Have</option>
                    <option value="Preferred">Preferred</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Not Important">Not Important</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="pt-6 border-t border-orange-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3 rounded-2xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:opacity-95 flex items-center gap-2"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow-lg shadow-orange-500/25 hover:opacity-95 flex items-center gap-2"
            >
              Generate My LifeMatch ✨ <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
