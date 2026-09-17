import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, MapPin, Building2, Shield, Search, Sparkles, ChevronRight } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface UniversityConnectProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const UniversityConnectScreen: React.FC<UniversityConnectProps> = ({ onNavigate, onSelectProperty }) => {
  const [selectedUniversity, setSelectedUniversity] = useState('Tech University (North Campus)');

  const universities = [
    { name: 'Tech University (North Campus)', city: 'Delhi / NCR', propertiesCount: 42, verifiedCount: 38 },
    { name: 'Management Institute (South Campus)', city: 'Mumbai', propertiesCount: 29, verifiedCount: 27 },
    { name: 'Design College & Tech Academy', city: 'Bangalore', propertiesCount: 35, verifiedCount: 34 }
  ];

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

        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
          University Connect
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">University Accommodation Directory</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Discover verified student housing verified and partnered around your university campus.</p>
      </div>

      {/* University Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {universities.map((uni, idx) => {
          const isSelected = selectedUniversity === uni.name;
          return (
            <div 
              key={idx}
              onClick={() => setSelectedUniversity(uni.name)}
              className={`bg-white rounded-[28px] border p-6 shadow-xs cursor-pointer transition-all ${isSelected ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/20' : 'border-orange-100 hover:border-orange-300'}`}
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 mb-1">{uni.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">{uni.city}</p>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-semibold">{uni.propertiesCount} verified listings</span>
                <span className="text-emerald-700 font-bold">{uni.verifiedCount} Trust Passport ✓</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Participating Accommodations Near University */}
      <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs">
        <h3 className="font-bold text-lg text-zinc-900 mb-2">Accommodations Near {selectedUniversity}</h3>
        <p className="text-xs text-zinc-500 mb-6">Filtered for walking distance and direct campus shuttle accessibility.</p>

        <div className="space-y-4">
          {PLACEHOLDER_PROPERTIES.map((prop) => (
            <div 
              key={prop.id}
              onClick={() => {
                onSelectProperty(prop);
                onNavigate('property-details');
              }}
              className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 hover:border-orange-300 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img src={prop.image} alt={prop.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 mb-1 inline-block">
                    Trust Passport Verified ✓
                  </span>
                  <h4 className="font-bold text-base text-zinc-900">{prop.name}</h4>
                  <p className="text-xs text-zinc-500">{prop.location} · 5 mins to campus</p>
                </div>
              </div>

              <div className="text-right sm:text-left flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Monthly Rent</span>
                  <span className="text-base font-extrabold text-orange-600">₹{prop.rent.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
