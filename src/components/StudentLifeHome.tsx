import React, { useState } from 'react';
import { 
  Home, GraduationCap, DollarSign, Bus, Wrench, Users, MessageSquare, 
  MapPin, Calendar, Shield, Sparkles, CheckCircle2, ArrowRight, Clock, Bell, Plus, Heart 
} from 'lucide-react';
import { ScreenType, BookingRecord, ExpenseItem } from '../types';

interface StudentLifeHomeProps {
  onNavigate: (screen: ScreenType) => void;
  bookings: BookingRecord[];
  expenses: ExpenseItem[];
}

export const StudentLifeHome: React.FC<StudentLifeHomeProps> = ({ onNavigate, bookings, expenses }) => {
  const activeBooking = bookings[0] || {
    propertyName: 'Scholar Haven Deluxe PG',
    roomType: 'Private Room with Attached Bath',
    moveInDate: '2026-10-01',
    monthlyRent: 9500
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const monthlyBudget = 15000;
  const budgetPercent = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-orange-500/10 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Student Living Operating System (Phase 8)
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Good morning 👋</h1>
            <p className="text-sm sm:text-base text-orange-100 max-w-xl">
              "Don't just find a place. Know where you're going to live, settle in effortlessly, and navigate student life."
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('action-center')}
              className="px-4 py-3 rounded-2xl bg-white/25 backdrop-blur-md text-white font-extrabold text-xs shadow-md hover:bg-white/35 transition-colors flex items-center gap-2 border border-white/30"
            >
              <span>Action Center (3)</span>
            </button>
            <button
              onClick={() => onNavigate('smart-tasks')}
              className="px-4 py-3 rounded-2xl bg-white/25 backdrop-blur-md text-white font-extrabold text-xs shadow-md hover:bg-white/35 transition-colors flex items-center gap-2 border border-white/30"
            >
              <span>Tasks (5)</span>
            </button>
            <button
              onClick={() => onNavigate('copilot')}
              className="px-5 py-3 rounded-2xl bg-zinc-900 text-white font-extrabold text-xs shadow-md hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask UniStay Agent ✨</span>
            </button>
          </div>
        </div>
      </div>

      {/* Signature UniStay Intelligence Panel */}
      <div className="bg-white rounded-[28px] border border-orange-200 p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-0.5">TODAY'S UNISTAY BRIEFING</div>
            <h3 className="font-extrabold text-base text-zinc-900">1 thing needs your attention • 2 upcoming tasks • 1 saved property update</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Rent payment due in 4 days. Wi-Fi status verified. 2 saved events this week.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('decision-support')}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-bold hover:bg-zinc-200 transition-colors"
          >
            Decision Support
          </button>
          <button
            onClick={() => onNavigate('copilot')}
            className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20"
          >
            Ask UniStay ✨
          </button>
        </div>
      </div>

      {/* Quick Access Command Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'My Stay & Lease', icon: Home, screen: 'my-stay', color: 'bg-orange-100 text-orange-700 border-orange-200', desc: 'Checklists & Rent' },
          { label: 'My Day & Schedule', icon: Calendar, screen: 'my-day', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Classes & Gym timeline' },
          { label: 'Campus Hub', icon: GraduationCap, screen: 'campus-intelligence', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'University & Events' },
          { label: 'City Intelligence', icon: MapPin, screen: 'city-intelligence', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Food, Study & Map' },
          { label: 'Money & Budget', icon: DollarSign, screen: 'student-budget', color: 'bg-purple-100 text-purple-700 border-purple-200', desc: 'Expenses & True Cost' },
          { label: 'Student Services', icon: Wrench, screen: 'student-services', color: 'bg-rose-100 text-rose-700 border-rose-200', desc: 'Laundry & Repairs' },
          { label: 'Shared Expenses', icon: Users, screen: 'shared-expenses', color: 'bg-teal-100 text-teal-700 border-teal-200', desc: 'Roommate split bills' },
          { label: 'Community Feed', icon: MessageSquare, screen: 'community', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Student discussions' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(item.screen as ScreenType)}
              className="bg-white rounded-[24px] border border-orange-100/80 p-5 shadow-xs hover:border-orange-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 border ${item.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 mb-0.5">{item.label}</h3>
                <p className="text-[11px] text-zinc-500 leading-snug">{item.desc}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-orange-600">
                <span>Access OS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase 9 Multi-City & Ecosystem Network Section */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[28px] p-6 text-white shadow-lg mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Phase 9 Ecosystem & Multi-City Network
            </div>
            <h3 className="text-lg font-extrabold">Switch Cities, Access Verified Universities & Partner Services</h3>
            <p className="text-xs text-zinc-300">Maintain one unified account across Delhi, Bengaluru, Pune, Hyderabad, and Ranchi.</p>
          </div>
          <button
            onClick={() => onNavigate('moving-city')}
            className="px-5 py-3 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-md shrink-0 flex items-center gap-2"
          >
            <span>I'm Moving to Another City 🚀</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('multi-city-home')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 hover:bg-white/15 transition-all cursor-pointer space-y-1"
          >
            <div className="text-xs font-bold text-orange-400">🌍 Multi-City Network</div>
            <div className="text-sm font-extrabold text-white">Explore 6+ Student Cities</div>
            <p className="text-[11px] text-zinc-300">Switch active city instantly</p>
          </div>

          <div
            onClick={() => onNavigate('university-network')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 hover:bg-white/15 transition-all cursor-pointer space-y-1"
          >
            <div className="text-xs font-bold text-orange-400">🎓 University Network</div>
            <div className="text-sm font-extrabold text-white">Verified Campus Partners</div>
            <p className="text-[11px] text-zinc-300">Christ, DU, PES, BITS & more</p>
          </div>

          <div
            onClick={() => onNavigate('partner-directory')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 hover:bg-white/15 transition-all cursor-pointer space-y-1"
          >
            <div className="text-xs font-bold text-orange-400">🛡️ Trust Passports 2.0</div>
            <div className="text-sm font-extrabold text-white">Verified Service Directory</div>
            <p className="text-[11px] text-zinc-300">Moving, Laundry, Internet & Mess</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-zinc-300">Explore the complete master infrastructure of UniStay</span>
          <button
            onClick={() => onNavigate('super-platform-overview')}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-extrabold hover:bg-orange-700 shadow-md transition-colors"
          >
            Phase 10 Super-Platform Overview ✨
          </button>
        </div>
      </div>


      {/* Smart Personalized Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Widget 1: My Stay & Onboarding Status */}
        <div 
          onClick={() => onNavigate('my-stay')}
          className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Active Tenancy
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Escrow
              </span>
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">{activeBooking.propertyName}</h3>
            <p className="text-xs text-zinc-500 mb-4">{activeBooking.roomType} · Move-in {activeBooking.moveInDate}</p>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">Monthly Rent:</span>
                <span className="font-bold text-orange-600">₹{activeBooking.monthlyRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Move-in Checklist:</span>
                <span className="font-bold text-emerald-700">4 / 6 Completed</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
            Open Tenancy Hub →
          </span>
        </div>

        {/* Widget 2: Monthly Budget & Expense Summary */}
        <div 
          onClick={() => onNavigate('student-budget')}
          className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Monthly Money OS
              </span>
              <span className="text-xs text-zinc-500 font-semibold">{budgetPercent}% spent</span>
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">Budget Tracker</h3>
            <p className="text-xs text-zinc-500 mb-4">₹{totalSpent.toLocaleString()} spent out of ₹{monthlyBudget.toLocaleString()}</p>

            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden mb-4">
              <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${budgetPercent}%` }}></div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-purple-100 text-xs text-purple-900 flex items-center justify-between">
              <span className="font-semibold">True Living Cost Status:</span>
              <span className="font-bold text-emerald-700">On Track ✓</span>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-600 flex items-center gap-1 mt-4">
            Manage Money & Expenses →
          </span>
        </div>

        {/* Widget 3: Quick Settlement & Services */}
        <div 
          onClick={() => onNavigate('settlement-mode')}
          className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Settlement Guide
              </span>
              <span className="text-xs text-zinc-500 font-semibold">New to City?</span>
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">City Settlement Checklist</h3>
            <p className="text-xs text-zinc-500 mb-4">Step-by-step guidance for before arrival, first day, and first week.</p>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-emerald-100 text-xs text-zinc-700 space-y-1 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Accommodation booked & verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digital lease agreement accepted</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            Open Settlement Hub →
          </span>
        </div>

      </div>

    </div>
  );
};
