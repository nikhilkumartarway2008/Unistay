import React, { useState } from 'react';
import { 
  ArrowLeft, Users, Sparkles, Shield, Check, Heart, MessageSquare, 
  AlertCircle, Sliders, ChevronRight, Compass, Filter, Lock
} from 'lucide-react';
import { ScreenType, RoommateProfile } from '../types';

interface RoommateScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RoommateScreen: React.FC<RoommateScreenProps> = ({ onNavigate }) => {
  const [studyFilter, setStudyFilter] = useState<string>('all');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [requestModalProfile, setRequestModalProfile] = useState<RoommateProfile | null>(null);

  const roommateProfiles: RoommateProfile[] = [
    {
      id: 'rm-1',
      name: 'Aarav Sharma',
      university: 'Tech University · CS Major',
      studySchedule: 'Usually studies at night',
      sleepSchedule: 'Late sleeper',
      noisePreference: 'Prefers quiet',
      cleanliness: 'Very important',
      budget: '₹8,000 – ₹10,000',
      compatibilityScore: 94,
      bio: 'Final year CS student looking for a clean, quiet flatmate near North Campus. Focused on coding and academics.',
      verified: true
    },
    {
      id: 'rm-2',
      name: 'Priya Verma',
      university: 'Management Institute · MBA',
      studySchedule: 'Early morning riser',
      sleepSchedule: 'Standard sleeper (11 PM)',
      noisePreference: 'Moderate',
      cleanliness: 'Standard',
      budget: '₹9,000 – ₹12,000',
      compatibilityScore: 88,
      bio: 'MBA student seeking a shared flat near campus. Appreciates a tidy kitchen and respectful quiet hours.',
      verified: true
    },
    {
      id: 'rm-3',
      name: 'Rohan Mehta',
      university: 'Design College · B.Des',
      studySchedule: 'Flexible schedule',
      sleepSchedule: 'Night owl',
      noisePreference: 'Creative & active',
      cleanliness: 'Important',
      budget: '₹10,000 – ₹14,000',
      compatibilityScore: 82,
      bio: 'Design major working on studio projects. Looking for a chilled-out roommate who respects creative spaces.',
      verified: true
    }
  ];

  const handleConnect = (profile: RoommateProfile) => {
    setRequestModalProfile(profile);
  };

  const confirmConnection = () => {
    if (requestModalProfile) {
      setConnectedIds([...connectedIds, requestModalProfile.id]);
      setRequestModalProfile(null);
      alert(`Connection request sent to ${requestModalProfile.name}. Once accepted, a secure limited chat will open.`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
            <Users className="w-3.5 h-3.5 text-orange-600" />
            Compatibility Engine
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Find a Compatible Roommate</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Compatibility-based roommate matching. Connect safely without exposing private contact info.</p>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-orange-50/80 border border-orange-200 rounded-[24px] p-5 mb-8 flex items-start gap-4">
        <Shield className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div className="text-xs text-orange-950 leading-relaxed">
          <span className="font-bold">Privacy & Safety Reminder: </span>
          Phone numbers and emails are never shared automatically. Both students must accept a connection request before initiating secure in-platform chat.
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {roommateProfiles.map((profile) => {
          const isConnected = connectedIds.includes(profile.id);
          return (
            <div key={profile.id} className="bg-white rounded-[28px] border border-orange-100/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {profile.compatibilityScore}% Compatibility
                  </span>
                  {profile.verified && (
                    <span className="text-[10px] font-semibold text-zinc-500 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-600" /> Verified Student
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-900 mb-0.5">{profile.name}</h3>
                <p className="text-xs text-orange-600 font-semibold mb-3">{profile.university}</p>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4 bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
                  "{profile.bio}"
                </p>

                <div className="space-y-2 text-xs text-zinc-700 mb-6 border-t border-zinc-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Study Habit:</span>
                    <span className="font-semibold">{profile.studySchedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Sleep Schedule:</span>
                    <span className="font-semibold">{profile.sleepSchedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Noise Tolerance:</span>
                    <span className="font-semibold">{profile.noisePreference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Cleanliness:</span>
                    <span className="font-semibold">{profile.cleanliness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Budget:</span>
                    <span className="font-semibold text-orange-700">{profile.budget}</span>
                  </div>
                </div>
              </div>

              <div>
                {isConnected ? (
                  <div className="w-full py-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                    Connection Requested ✓
                  </div>
                ) : (
                  <button
                    onClick={() => handleConnect(profile)}
                    className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm shadow-orange-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Connect Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection Modal */}
      {requestModalProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl animate-fade-in border border-orange-100">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Send Connection Request</h3>
            <p className="text-xs text-zinc-600 mb-6">
              You are sending a connection request to <strong className="text-zinc-900">{requestModalProfile.name}</strong>. Your personal contact number and email remain private.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 mb-6 text-xs text-zinc-700 space-y-1">
              <div><strong className="text-zinc-900">Compatibility:</strong> {requestModalProfile.compatibilityScore}% match</div>
              <div><strong className="text-zinc-900">University:</strong> {requestModalProfile.university}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setRequestModalProfile(null)}
                className="flex-1 py-3 rounded-2xl bg-zinc-100 text-zinc-700 font-bold text-xs hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmConnection}
                className="flex-1 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
