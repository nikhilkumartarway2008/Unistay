import React, { useState } from 'react';
import { Search, Shield, Heart, MapPin, Sparkles, SlidersHorizontal, ChevronRight, Building2 } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: PropertyItem) => void;
  properties: PropertyItem[];
  onUpdateProperty: (property: PropertyItem) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate, onSelectProperty, properties, onUpdateProperty }) => {
  const [query, setQuery] = useState('');

  const toggleSave = (prop: PropertyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateProperty({ ...prop, saved: !prop.saved });
  };

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.location.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-28">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Explore Accommodations</h2>
        <p className="text-sm text-zinc-500">Discover verified student housing near your university with transparent cost intelligence</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by university, area, or room type..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-orange-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-sm"
        />
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">
          <Building2 className="w-12 h-12 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 mb-1">No accommodations listed yet</h3>
          <p className="text-xs text-zinc-500 mb-6 max-w-md mx-auto">
            Properties added by owners will appear here instantly in real time. Switch to Owner mode to add your first property listing.
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
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-orange-600 shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {prop.matchPercentage}
                </div>
                <button
                  onClick={(e) => toggleSave(prop, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${prop.saved ? 'bg-orange-500 text-white' : 'bg-white/80 text-zinc-700 hover:bg-white'}`}
                >
                  <Heart className={`w-4 h-4 ${prop.saved ? 'fill-current' : ''}`} />
                </button>
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
                    <div className="text-[10px] text-zinc-400 uppercase">Monthly Cost</div>
                    <div className="font-bold text-zinc-900 text-sm">{prop.rent}</div>
                  </div>
                  <div className="text-xs text-orange-700 font-medium bg-orange-50 px-2.5 py-1 rounded-xl">
                    {prop.category}
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
