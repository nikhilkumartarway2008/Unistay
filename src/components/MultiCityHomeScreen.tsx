import React, { useState } from 'react';
import { ArrowLeft, Building2, MapPin, Sparkles, Compass, ShieldCheck, Search, ChevronRight, GraduationCap, ArrowRight } from 'lucide-react';
import { ScreenType, CityItem } from '../types';

interface MultiCityHomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentCity: string;
  onSelectCity: (cityName: string) => void;
}

export const MultiCityHomeScreen: React.FC<MultiCityHomeScreenProps> = ({
  onNavigate,
  currentCity,
  onSelectCity
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const cities: CityItem[] = [
    {
      id: '1',
      name: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      popularAreas: ['Koramangala', 'Indiranagar', 'BTM Layout', 'HSR Layout', 'Whitefield'],
      universitiesCount: 14,
      propertiesCount: 1840,
      averageRent: 11500,
      description: 'Silicon Valley of India with vibrant student hubs and tech co-living spaces.',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '2',
      name: 'Delhi',
      state: 'Delhi NCR',
      country: 'India',
      popularAreas: ['North Campus', 'South Campus', 'Greater Kailash', 'Lajpat Nagar'],
      universitiesCount: 22,
      propertiesCount: 2450,
      averageRent: 9800,
      description: 'Historic academic capital with legendary university life and budget PGs.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '3',
      name: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      popularAreas: ['Kothrud', 'Viman Nagar', 'Hinjewadi', 'Shivajinagar'],
      universitiesCount: 18,
      propertiesCount: 1520,
      averageRent: 9200,
      description: 'The Oxford of the East, known for pleasant weather and thriving student communities.',
      image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a566?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '4',
      name: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      popularAreas: ['Gachibowli', 'Madhapur', 'Ameerpet', 'Kukatpally'],
      universitiesCount: 12,
      propertiesCount: 1310,
      averageRent: 9500,
      description: 'Dynamic tech & educational hub offering modern student living infrastructure.',
      image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a566?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '5',
      name: 'Ranchi',
      state: 'Jharkhand',
      country: 'India',
      popularAreas: ['Lalpur', 'Bariatu', 'Doranda', 'Kanke Road'],
      universitiesCount: 6,
      propertiesCount: 420,
      averageRent: 7500,
      description: 'Serene academic city with affordable student stays and close-knit campuses.',
      image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '6',
      name: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      popularAreas: ['Andheri', 'Bandra', 'Powai', 'Churchgate'],
      universitiesCount: 19,
      propertiesCount: 1680,
      averageRent: 14500,
      description: 'The financial powerhouse with dynamic student life and excellent transit.',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredCities = cities.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('moving-city')}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-md flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>I'm Moving to Another City 🚀</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            UniStay Multi-City Network (Phase 9)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Explore Student Cities Across India</h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            One unified student account. Switch cities instantly while preserving your preferences, verification status, saved stays, and reviews.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2">
              <span className="text-orange-400">Current City:</span>
              <span>{currentCity}</span>
            </div>
            <button
              onClick={() => onNavigate('city-intelligence-hub')}
              className="px-4 py-2 rounded-2xl bg-white text-zinc-900 text-xs font-bold hover:bg-orange-50 transition-colors shadow-xs"
            >
              View City Intelligence Hub 📊
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs mb-8 flex items-center gap-3">
        <Search className="w-5 h-5 text-zinc-400 ml-2" />
        <input
          type="text"
          placeholder="Search by city name or state (e.g., Bengaluru, Delhi, Pune)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm outline-none bg-transparent text-zinc-900"
        />
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map(city => {
          const isCurrent = city.name.toLowerCase() === currentCity.toLowerCase();
          return (
            <div
              key={city.id}
              className={`bg-white rounded-[28px] border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                isCurrent ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {isCurrent && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Current City
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">{city.name}</h3>
                      <p className="text-xs text-zinc-200">{city.state}, {city.country}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-300">Avg Rent</div>
                      <div className="text-sm font-extrabold text-orange-400">₹{city.averageRent.toLocaleString()}/mo</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-zinc-600 leading-relaxed">{city.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <GraduationCap className="w-4 h-4 text-orange-600" />
                      <span>{city.universitiesCount} Universities</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <Building2 className="w-4 h-4 text-orange-600" />
                      <span>{city.propertiesCount} Stays</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Popular Student Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {city.popularAreas.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-bold">
                          {area}
                        </span>
                      ))}
                      {city.popularAreas.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 text-[10px] font-bold">
                          +{city.popularAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onSelectCity(city.name);
                    onNavigate('student-life-home');
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md'
                      : 'bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-600/20'
                  }`}
                >
                  <span>{isCurrent ? 'Active City Dashboard' : `Switch to ${city.name}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
