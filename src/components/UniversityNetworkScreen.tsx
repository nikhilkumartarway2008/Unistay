import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Sparkles, ShieldCheck, MapPin, Building2, Search, CheckCircle2 } from 'lucide-react';
import { ScreenType, UniversityItem } from '../types';

interface UniversityNetworkScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const UniversityNetworkScreen: React.FC<UniversityNetworkScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const universities: UniversityItem[] = [
    {
      id: '1',
      name: 'Christ University',
      cityId: 'bengaluru',
      cityName: 'Bengaluru',
      campusLocation: 'Hosur Road, Koramangala',
      verifiedPartner: true,
      studentsCount: '25,000+ Students',
      accommodationResources: 'Official University Approved PG Network & Housing Cell'
    },
    {
      id: '2',
      name: 'Delhi University (North Campus)',
      cityId: 'delhi',
      cityName: 'Delhi',
      campusLocation: 'Maurice Nagar, Delhi',
      verifiedPartner: true,
      studentsCount: '70,000+ Students',
      accommodationResources: 'DU Student Welfare Housing Registry & Verified Hostels'
    },
    {
      id: '3',
      name: 'PES University',
      cityId: 'bengaluru',
      cityName: 'Bengaluru',
      campusLocation: '100 Feet Ring Road, BTM Layout',
      verifiedPartner: true,
      studentsCount: '15,000+ Students',
      accommodationResources: 'Campus Accommodation Partner & Escrow Housing'
    },
    {
      id: '4',
      name: 'BITS Pilani (Off-campus / Pune)',
      cityId: 'pune',
      cityName: 'Pune',
      campusLocation: 'Hinjewadi Tech Park Area',
      verifiedPartner: true,
      studentsCount: '10,000+ Students',
      accommodationResources: 'UniStay Official Verified Living Partner'
    },
    {
      id: '5',
      name: 'Ranchi University',
      cityId: 'ranchi',
      cityName: 'Ranchi',
      campusLocation: 'Lalpur, Ranchi',
      verifiedPartner: true,
      studentsCount: '35,000+ Students',
      accommodationResources: 'Student Accommodation Cell & Welfare Desk'
    }
  ];

  const filteredUniversities = universities.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">University Network (Phase 9)</div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">UniStay University Network & Campus Partners</h1>
            <p className="text-xs text-zinc-400 mt-1">Official institutional profiles, campus housing resources, and verified student communities.</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs mb-6 flex items-center gap-3">
        <Search className="w-5 h-5 text-zinc-400 ml-2" />
        <input
          type="text"
          placeholder="Search by university name or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm outline-none bg-transparent text-zinc-900"
        />
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUniversities.map(uni => (
          <div key={uni.id} className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 mb-1">
                    {uni.cityName}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-zinc-900">{uni.name}</h3>
                </div>
                {uni.verifiedPartner && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Partner</span>
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{uni.campusLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{uni.studentsCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{uni.accommodationResources}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700">Official Housing Directory Active</span>
              <button
                onClick={() => onNavigate('explore')}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors shadow-xs"
              >
                View Nearby Stays
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
