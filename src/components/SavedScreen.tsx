import React, { useState } from 'react';
import { Bookmark, Heart, MapPin, Sparkles, Shield } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface SavedScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({ onNavigate, onSelectProperty }) => {
  const [properties, setProperties] = useState<PropertyItem[]>(PLACEHOLDER_PROPERTIES.filter(p => p.saved));

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-28">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Saved Accommodations</h2>
        <p className="text-sm text-zinc-500">Your shortlisted student stays and trust passports</p>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">
          <Bookmark className="w-12 h-12 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 mb-1">No saved properties yet</h3>
          <p className="text-xs text-zinc-500 mb-6">Explore and tap the heart icon on any stay to save it here.</p>
          <button
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-xs shadow-md"
          >
            Explore Accommodations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop) => (
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
                  onClick={(e) => toggleSave(prop.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-orange-500 text-white hover:opacity-90"
                >
                  <Heart className="w-4 h-4 fill-current" />
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('comparison');
                    }}
                    className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-xl font-semibold hover:bg-orange-100 transition-colors"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
