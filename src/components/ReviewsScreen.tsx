import React from 'react';
import { ArrowLeft, MessageSquare, ShieldCheck, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { ScreenType } from '../types';
import { PLACEHOLDER_REVIEWS } from '../data';

interface ReviewsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ReviewsScreen: React.FC<ReviewsScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-28">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('property-details')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Property</span>
        </button>

        <button
          onClick={() => onNavigate('transparency')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-sm"
        >
          <span>Next: Red Flags & Transparency</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">Verified student experiences</h2>
            <p className="text-xs text-zinc-500">Authentic, university-verified accommodation feedback with zero sponsored bias</p>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {PLACEHOLDER_REVIEWS.map((rev) => (
          <div key={rev.id} className="bg-white rounded-3xl border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-zinc-900">{rev.author}</h4>
                  <p className="text-xs text-zinc-500">{rev.role} · {rev.date}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified stay
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {Object.entries(rev.scores).map(([key, val], idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-3 rounded-2xl border border-orange-100/60">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="font-bold text-xs text-emerald-700 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {val}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed italic">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
