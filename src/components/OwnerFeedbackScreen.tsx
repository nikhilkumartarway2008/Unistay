import React, { useState } from 'react';
import { 
  ArrowLeft, MessageSquare, Shield, Sparkles, Building2, CheckCircle2, 
  AlertCircle, ChevronRight, Send, Check 
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';

interface OwnerFeedbackScreenProps {
  onNavigate: (screen: ScreenType) => void;
  properties: PropertyItem[];
}

export const OwnerFeedbackScreen: React.FC<OwnerFeedbackScreenProps> = ({ onNavigate, properties }) => {
  const [selectedPropId, setSelectedPropId] = useState<string>(properties[0]?.id || 'prop-1');
  const [responseInput, setResponseInput] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseInput.trim()) return;
    setSuccessMsg(true);
    setResponseInput('');
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('owner-dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-amber-200 text-zinc-700 text-xs font-semibold hover:bg-amber-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>Back to Owner Dashboard</span>
        </button>

        <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
          Owner Response Center
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Student Feedback & Q&A</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Manage student reviews, respond to questions, and keep your property information updated.</p>
      </div>

      {/* Common Concerns Summary */}
      <div className="bg-white rounded-[28px] border border-amber-100 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-lg text-zinc-900">What students are asking and saying</h3>
        </div>
        <p className="text-xs text-zinc-500 mb-6">Aggregated feedback trends across your active properties.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
            <div className="text-xs font-bold text-amber-800 mb-1">Frequently Asked</div>
            <div className="text-sm font-bold text-zinc-900">Wi-Fi & Electricity Billing</div>
            <p className="text-[11px] text-zinc-500 mt-1">12 students inquired this month.</p>
          </div>
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
            <div className="text-xs font-bold text-emerald-800 mb-1">Top Positive Mention</div>
            <div className="text-sm font-bold text-zinc-900">Cleanliness & Owner Support</div>
            <p className="text-[11px] text-zinc-500 mt-1">Mentioned in 14 verified reviews.</p>
          </div>
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
            <div className="text-xs font-bold text-blue-800 mb-1">Trust Passport</div>
            <div className="text-sm font-bold text-zinc-900">Fully Active & Verified</div>
            <p className="text-[11px] text-zinc-500 mt-1">All audit criteria met.</p>
          </div>
        </div>
      </div>

      {/* Student Review & Question Queue */}
      <div className="bg-white rounded-[28px] border border-amber-100 p-6 sm:p-8 shadow-xs mb-8">
        <h3 className="font-bold text-lg text-zinc-900 mb-4">Recent Student Questions & Reviews</h3>

        <div className="space-y-4">
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-amber-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Pending Response</span>
              <span className="text-[11px] text-zinc-400">2 hours ago</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-zinc-900">"Is the electricity sub-meter billed separately or included in maintenance?"</p>
            <p className="text-xs text-zinc-500">— Asked by Rahul K. (Prospective Student)</p>

            <form onSubmit={handleSendResponse} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={responseInput}
                onChange={(e) => setResponseInput(e.target.value)}
                placeholder="Type your official owner response..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-200 text-xs font-medium focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Respond</span>
              </button>
            </form>

            {successMsg && (
              <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 animate-fade-in pt-1">
                <CheckCircle2 className="w-4 h-4" /> Response submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
