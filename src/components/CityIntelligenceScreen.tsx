import React, { useState } from 'react';
import { MapPin, Search, Compass, Store, Utensils, Bus, HeartPulse, ShoppingCart, BookOpen, Dumbbell, Sparkles, ArrowLeft, Shield } from 'lucide-react';
import { ScreenType } from '../types';

interface CityIntelligenceScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CityIntelligenceScreen: React.FC<CityIntelligenceScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cityCategories = [
    { id: 'Accommodation', label: 'Accommodation', icon: Store, count: 42, desc: 'Verified student PGs & flats' },
    { id: 'Food', label: 'Food & Mess', icon: Utensils, count: 28, desc: 'Student messes, tiffin & cafes' },
    { id: 'Transport', label: 'Transport', icon: Bus, count: 14, desc: 'Metro stations, bus stops & rentals' },
    { id: 'Healthcare', label: 'Healthcare', icon: HeartPulse, count: 9, desc: 'Hospitals & 24/7 pharmacies' },
    { id: 'Groceries', label: 'Groceries', icon: ShoppingCart, count: 18, desc: 'Supermarkets & daily essentials' },
    { id: 'Study', label: 'Study Spaces', icon: BookOpen, count: 12, desc: 'Libraries & quiet cafes' },
    { id: 'Gyms', label: 'Gyms', icon: Dumbbell, count: 8, desc: 'Student-friendly fitness centers' }
  ];

  const cityLocations = [
    { name: 'Scholar Haven PG', category: 'Accommodation', rating: 4.8, distance: '0.3 km from campus', area: 'North Campus', verified: true, price: '₹9,500/mo' },
    { name: 'Campus Central Mess & Tiffin', category: 'Food', rating: 4.6, distance: '0.1 km from campus', area: 'North Campus', verified: true, price: '₹3,200/mo' },
    { name: 'Metro Station Gate 2', category: 'Transport', rating: 4.5, distance: '0.5 km away', area: 'North Campus', verified: true, price: 'Free transit' },
    { name: 'CityCare 24/7 Pharmacy', category: 'Healthcare', rating: 4.9, distance: '0.8 km away', area: 'Civil Lines', verified: true, price: 'Open 24 hrs' },
    { name: 'FreshMart Supermarket', category: 'Groceries', rating: 4.7, distance: '0.4 km away', area: 'North Campus', verified: true, price: 'Student discount 5%' },
    { name: 'Central University Library', category: 'Study', rating: 4.9, distance: '0.2 km from campus', area: 'Campus Quad', verified: true, price: 'Free for students' },
    { name: 'FitPulse Student Gym', category: 'Gyms', rating: 4.4, distance: '0.7 km away', area: 'North Campus', verified: true, price: '₹1,200/mo' }
  ];

  const filteredLocations = cityLocations.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>

        <button
          onClick={() => onNavigate('student-map-2')}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 px-4 py-2.5 rounded-2xl shadow-md hover:bg-emerald-700 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span>Open Intelligent Student Map 2.0</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
            <Compass className="w-3.5 h-3.5" />
            Student City Intelligence
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Settle into your new city</h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mb-6">
            Reliable local business data, verified student essentials, food, study spaces, and transport hubs. Never invented businesses.
          </p>

          <div className="relative max-w-lg">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search food, study, pharmacy, groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-zinc-900 text-xs font-medium placeholder-zinc-400 shadow-lg outline-none"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${selectedCategory === 'All' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
        >
          All Essentials ({cityLocations.length})
        </button>
        {cityCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
          >
            <span>{cat.label}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${selectedCategory === cat.id ? 'bg-emerald-700 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((item, idx) => (
          <div key={idx} className="bg-white rounded-[28px] p-6 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  ⭐ {item.rating}
                </span>
              </div>

              <h3 className="font-bold text-base text-zinc-900 mb-1">{item.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">{item.area} · {item.distance}</p>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-emerald-100 text-xs flex justify-between items-center mb-4">
                <span className="text-zinc-600 font-medium">Pricing / Access:</span>
                <span className="font-bold text-emerald-700">{item.price}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Verified Data
              </span>
              <button 
                onClick={() => onNavigate('student-map-2')}
                className="text-xs font-bold text-zinc-900 hover:text-emerald-600 transition-colors"
              >
                View on Map →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
