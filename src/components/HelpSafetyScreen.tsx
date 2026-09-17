import React, { useState } from 'react';
import { ArrowLeft, Shield, HelpCircle, BookOpen, Lock, CheckCircle2, Search } from 'lucide-react';
import { ScreenType } from '../types';

interface HelpSafetyScreenProps {
  onNavigate: (screen: ScreenType) => void;
  mode: 'help' | 'safety';
}

export const HelpSafetyScreen: React.FC<HelpSafetyScreenProps> = ({ onNavigate, mode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    { q: 'How does the Trust Passport verification work?', a: 'Every property undergoes physical audit, KYC verification of the owner, and verification of electricity sub-meters and student reviews.' },
    { q: 'What is included in the booking summary?', a: 'Monthly rent, refundable security deposit, one-time charges, and platform service fees with zero hidden costs.' },
    { q: 'How do I report a maintenance issue?', a: 'Navigate to "My Stay" -> "Maintenance" and submit a ticket with category, priority, and optional photos.' },
    { q: 'Are digital lease agreements legally binding?', a: 'Digital agreements on UniStay provide transparent terms, rules, and notice periods registered securely between student and owner.' }
  ];

  const safetyGuidelines = [
    { title: 'Before Booking', desc: 'Always review the Trust Passport badge and verify the accommodation type and refund policy.' },
    { title: 'Secure Payments', desc: 'Never transfer money outside the UniStay secure escrow payment system. All transactions are protected.' },
    { title: 'Roommate Safety', desc: 'Use our compatibility engine and connect securely without exposing private phone numbers until mutual consent.' },
    { title: 'Property Visits', desc: 'Schedule verified visits through the platform and check electricity meters and water availability.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${mode === 'safety' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' : 'bg-orange-100 text-orange-900 border-orange-200'}`}>
          {mode === 'safety' ? <Shield className="w-3.5 h-3.5 text-emerald-600" /> : <HelpCircle className="w-3.5 h-3.5 text-orange-600" />}
          {mode === 'safety' ? 'UniStay Safety Center' : 'UniStay Help Center'}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">
          {mode === 'safety' ? 'Student Safety & Trust Guidelines' : 'Help & Support Center'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          {mode === 'safety' ? 'Our commitment to secure student living, transparent verification, and safe housing.' : 'Find answers to common questions regarding bookings, payments, and student living.'}
        </p>
      </div>

      {mode === 'safety' ? (
        <div className="space-y-4">
          {safetyGuidelines.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] border border-orange-100 p-6 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-[24px] p-2 border border-orange-100 mb-6 flex items-center gap-3 px-4 shadow-xs">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g. rent payment, booking)..."
              className="w-full py-2.5 text-xs text-zinc-800 bg-transparent focus:outline-none"
            />
          </div>

          {helpTopics.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] border border-orange-100 p-6 shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-zinc-900">{item.q}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
