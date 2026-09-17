import React from 'react';
import { Shield, GraduationCap, Building2, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ScreenType, UserRole } from '../types';

interface RoleSelectionScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onNavigate, onSelectRole }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-950 flex flex-col justify-center">
      
      <div className="max-w-4xl mx-auto w-full mb-6">
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back</span>
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-4">
          <Shield className="w-4 h-4 text-orange-600" />
          Unified UniStay Platform
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
          Select Your Role & Start Exploring
        </h1>
        <p className="text-sm sm:text-base text-zinc-600">
          Choose your role to instantly experience UniStay without password login required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full mb-12">
        
        {/* Student Card */}
        <div 
          onClick={() => {
            onSelectRole('student');
            onNavigate('dashboard');
          }}
          className="bg-white rounded-[32px] border-2 border-orange-200/80 hover:border-orange-500 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 mb-6 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Student Portal</div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Explore as Student</h3>
            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
              Find a trusted place to live, explore verified stays, compare true living costs, and preview your daily campus life.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs text-zinc-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Trust Passports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> True Living Cost Calculator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Lifestyle & Commute Intelligence</li>
            </ul>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-orange-100 font-bold text-sm text-orange-600 group-hover:translate-x-1 transition-transform">
            <span>Start Using as Student</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Owner Card */}
        <div 
          onClick={() => {
            onSelectRole('owner');
            onNavigate('dashboard');
          }}
          className="bg-white rounded-[32px] border-2 border-orange-200/80 hover:border-orange-500 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md shadow-zinc-900/20 mb-6 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Owner Portal</div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Explore as Property Owner</h3>
            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
              List and manage your property, verify your identity, receive student enquiries, and handle bookings securely.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs text-zinc-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Trust Center & Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Step Property Listing Wizard</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Enquiries, Bookings & Tenant Tracking</li>
            </ul>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-orange-100 font-bold text-sm text-amber-700 group-hover:translate-x-1 transition-transform">
            <span>Start Using as Owner</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

      </div>

    </div>
  );
};

