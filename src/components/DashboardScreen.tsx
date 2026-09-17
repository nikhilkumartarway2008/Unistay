import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Heart, Shield, SlidersHorizontal, ChevronRight, Check, Building2, Users, MessageSquare } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenAi: () => void;
  onSelectProperty: (property: PropertyItem) => void;
  properties: PropertyItem[];
  onUpdateProperty: (property: PropertyItem) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onOpenAi, onSelectProperty, properties, onUpdateProperty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Near Campus');

  const categories = ['PG / Hostel', 'Flat', 'Shared', 'Near Campus'];

  const toggleSave = (prop: PropertyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateProperty({ ...prop, saved: !prop.saved });
  };

  const filteredProperties = properties.filter(p => 
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-28">
      {/* Top Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-500/20">
            YN
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-600 font-semibold">University</div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back 👋</h2>
            <p className="text-sm text-zinc-500">Let’s find a stay that fits your life.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('comparison')}
            className="px-4 py-2.5 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs flex items-center gap-2"
          >
            <span>Compare Properties</span>
            <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-[10px]">3</span>
          </button>
        </div>
      </div>

      {/* Large Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by university, city or area…"
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-orange-200/80 shadow-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
        />
        <button 
          onClick={onOpenAi}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
          title="Ask UniStay AI"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* Quick-access categories */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all shadow-xs ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-white text-zinc-700 border border-orange-100 hover:border-orange-300 hover:bg-orange-50/50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prominent AI Recommendation Card */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg shadow-orange-500/20">
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Student Living Intelligence
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">Find a stay that fits your life</h3>
          <p className="text-sm text-orange-100 mb-6 font-normal leading-relaxed">
            UniStay doesn't choose your home for you. It gives you the intelligence to choose with confidence using LifeMatch ✨.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('ai-onboarding')}
              className="px-6 py-3 rounded-xl bg-white text-orange-700 font-bold text-xs shadow-md hover:bg-orange-50 transition-colors inline-flex items-center gap-2 group"
            >
              <span>Find My Stay ✨</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenAi}
              className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Ask UniStay
            </button>
          </div>
        </div>
      </div>

      {/* Phase 5 Community & Roommate Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div 
          onClick={() => onNavigate('community')}
          className="bg-white rounded-3xl border border-orange-100 p-5 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">UniStay Community</h4>
              <p className="text-xs text-zinc-500">University discussions & student tips</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-orange-500" />
        </div>

        <div 
          onClick={() => onNavigate('roommate-match')}
          className="bg-white rounded-3xl border border-orange-100 p-5 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Roommate Matching</h4>
              <p className="text-xs text-zinc-500">Compatibility-based flatmate search</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      {/* Recommended Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Recommended for you</h3>
          <p className="text-xs text-zinc-500">Verified student accommodations near University</p>
        </div>
        <button 
          onClick={() => onNavigate('explore')}
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">
          <Building2 className="w-12 h-12 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 mb-1">No accommodations found</h3>
          <p className="text-xs text-zinc-500 mb-6 max-w-md mx-auto">
            Properties added by owners will appear here in real time. Switch to Owner mode to publish listings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => {
                onSelectProperty(prop);
                onNavigate('property-details');
              }}
              className="bg-white rounded-3xl border border-orange-100/80 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all cursor-pointer overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                <img
                  src={prop.image}
                  alt={prop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-orange-600 shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {prop.matchPercentage}
                </div>
                <button
                  onClick={(e) => toggleSave(prop, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${prop.saved ? 'bg-orange-500 text-white' : 'bg-white/80 text-zinc-700 hover:bg-white'}`}
                  title="Save property"
                >
                  <Heart className={`w-4 h-4 ${prop.saved ? 'fill-current' : ''}`} />
                </button>
                {prop.verified && (
                  <div className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1">
                    <Shield className="w-3 h-3 text-orange-400" />
                    Verified
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-bold text-base text-zinc-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {prop.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{prop.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Monthly Cost</div>
                    <div className="font-bold text-zinc-900 text-sm">{prop.rent}</div>
                  </div>
                  <div className="text-xs text-zinc-500 font-medium bg-orange-50 px-2.5 py-1 rounded-xl text-orange-700">
                    {prop.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
