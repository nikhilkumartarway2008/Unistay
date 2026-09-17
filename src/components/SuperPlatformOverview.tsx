import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Building2, GraduationCap, Compass, CheckCircle2, HeartHandshake, Globe, Cpu, ChevronRight } from 'lucide-react';
import { ScreenType } from '../types';

interface SuperPlatformOverviewProps {
  onNavigate: (screen: ScreenType) => void;
  currentCity: string;
}

export const SuperPlatformOverview: React.FC<SuperPlatformOverviewProps> = ({ onNavigate, currentCity }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Life Home</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold border border-orange-200">
          <Sparkles className="w-3.5 h-3.5" />
          Phase 10: The UniStay Super-Platform ✨
        </div>
      </div>

      {/* Hero Master Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-[32px] p-8 sm:p-12 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#f97316_1.5px,transparent_1.5px)] bg-[size:20px_20px]" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-extrabold border border-orange-500/30">
            <span>THE TRUSTED DIGITAL INFRASTRUCTURE FOR STUDENT LIVING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Don't just find a place.<br />Know where you're going to live.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            UniStay connects students, universities, accommodation owners, service providers, cities, and AI into one unified, production-ready ecosystem across India.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-extrabold hover:bg-orange-700 shadow-lg shadow-orange-600/30 flex items-center gap-2"
            >
              <span>Explore Stays ({currentCity})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('multi-city-home')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md text-white text-xs font-extrabold hover:bg-white/20 border border-white/20 flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-orange-400" />
              <span>Multi-City Network</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10 Phases of Evolution Grid */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-zinc-900">UniStay Master Architecture (Phases 1 - 10)</h2>
            <p className="text-xs text-zinc-500">Every module working together as an integrated super-platform.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">Phase 1 & 2</span>
              <ShieldCheck className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">Marketplace & Trust Verification</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Verified properties, owner identity checks, transparent pricing, and Trust Passports.</p>
            <button onClick={() => onNavigate('explore')} className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View Marketplace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">Phase 3 & 4</span>
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">AI LifeMatch & True Living Cost</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Algorithmic lifestyle compatibility matching, true living cost calculators, and life previews.</p>
            <button onClick={() => onNavigate('ai-matches')} className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View AI Matches</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">Phase 5 & 6</span>
              <HeartHandshake className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">Community, Bookings & My Stay</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Roommate matching, digital lease agreements, secure escrow payments, and maintenance tracker.</p>
            <button onClick={() => onNavigate('my-stay')} className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View My Stay Workspace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">Phase 7 & 8</span>
              <Cpu className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">Student Life OS & AI Agent</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Daily schedule, budget intelligence, campus insights, action center, and autonomous AI assistant.</p>
            <button onClick={() => onNavigate('student-life-home')} className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View Student Life OS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">Phase 9</span>
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">Multi-City & Partner Network</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Cross-city accounts, university partner network, service provider network, and relocation wizards.</p>
            <button onClick={() => onNavigate('multi-city-home')} className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View Multi-City Network</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">Phase 10</span>
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900">The Super-Platform Master OS</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">Unified global architecture, automated workflows, enterprise analytics, and complete lifecycle infrastructure.</p>
            <button onClick={() => onNavigate('admin-control-center')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>View Admin Control Center</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Final Brand Message Banner */}
      <div className="bg-white rounded-[28px] p-8 border border-zinc-200 shadow-xs text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
          "UniStay doesn't choose your life for you. It gives you the trust, information, intelligence, and tools to build it."
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
          Find your home. Understand your city. Connect with your campus. Live your student life.
        </p>
      </div>

    </div>
  );
};
