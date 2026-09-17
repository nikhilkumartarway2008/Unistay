import React, { useState } from 'react';
import { MapPin, Layers, Compass, Filter, ArrowLeft, Search, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface StudentMap2ScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const StudentMap2Screen: React.FC<StudentMap2ScreenProps> = ({ onNavigate }) => {
  const [radius, setRadius] = useState<'Nearby' | '1 km' | '2 km' | '5 km'>('1 km');
  const [activeLayers, setActiveLayers] = useState<string[]>(['Accommodation', 'Campus', 'Food', 'Pharmacy']);

  const layersList = [
    'Accommodation', 'Campus', 'Food', 'Grocery', 'Pharmacy', 'Hospital', 'Transport', 'Study', 'Gym', 'Laundry', 'ATMs', 'Stationery'
  ];

  const toggleLayer = (layer: string) => {
    if (activeLayers.includes(layer)) {
      setActiveLayers(activeLayers.filter(l => l !== layer));
    } else {
      setActiveLayers([...activeLayers, layer]);
    }
  };

  const mapPins = [
    { name: 'Central University Campus', type: 'Campus', distance: '0.0 km', coords: { x: '50%', y: '50%' } },
    { name: 'Scholar Haven PG', type: 'Accommodation', distance: '0.3 km', coords: { x: '35%', y: '40%' } },
    { name: 'Campus Mess & Tiffin', type: 'Food', distance: '0.1 km', coords: { x: '55%', y: '45%' } },
    { name: 'CityCare Pharmacy', type: 'Pharmacy', distance: '0.8 km', coords: { x: '70%', y: '30%' } },
    { name: 'University Library', type: 'Study', distance: '0.2 km', coords: { x: '45%', y: '60%' } },
    { name: 'FitPulse Gym', type: 'Gym', distance: '0.7 km', coords: { x: '25%', y: '70%' } },
    { name: 'Metro Station', type: 'Transport', distance: '0.5 km', coords: { x: '80%', y: '65%' } }
  ];

  const filteredPins = mapPins.filter(pin => activeLayers.includes(pin.type));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('city-intelligence')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to City Intelligence</span>
        </button>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-zinc-200 shadow-xs">
          <span className="text-xs font-bold text-zinc-500">Radius:</span>
          {(['Nearby', '1 km', '2 km', '5 km'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${radius === r ? 'bg-orange-600 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Layers Filter */}
        <div className="bg-white rounded-[28px] p-6 border border-orange-100 shadow-xs lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-orange-600" />
            <h2 className="font-bold text-sm text-zinc-900">Map Layers</h2>
          </div>
          <p className="text-xs text-zinc-500 mb-4">Select categories to display on the intelligent student map.</p>

          <div className="space-y-2">
            {layersList.map(layer => {
              const active = activeLayers.includes(layer);
              return (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all border ${active ? 'bg-orange-50 border-orange-200 text-orange-900' : 'bg-white border-zinc-100 text-zinc-600 hover:bg-zinc-50'}`}
                >
                  <span>{layer}</span>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${active ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-300'}`}>
                    {active && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Simulation Stage */}
        <div className="bg-white rounded-[32px] p-6 border border-orange-100 shadow-lg lg:col-span-3 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[#F4F1EA] opacity-65 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-orange-300 absolute"></div>
            <div className="w-[400px] h-[400px] rounded-full border-2 border-dashed border-orange-400 absolute"></div>
            <div className="w-[200px] h-[200px] rounded-full border-2 border-dashed border-orange-500 absolute"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Student Map 2.0 ({radius})
              </span>
              <h1 className="text-xl font-extrabold text-zinc-900 mt-1">Campus Vicinity & Essentials</h1>
            </div>
            <span className="text-xs font-semibold text-zinc-500 bg-white/80 px-3 py-1.5 rounded-xl border border-zinc-200">
              {filteredPins.length} locations active on map
            </span>
          </div>

          {/* Map Pins Simulation */}
          <div className="relative w-full h-[380px] my-auto flex items-center justify-center">
            {filteredPins.map((pin, idx) => (
              <div
                key={idx}
                className="absolute group cursor-pointer transition-transform hover:scale-110"
                style={{ left: pin.coords.x, top: pin.coords.y }}
              >
                <div className="bg-zinc-900 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-xl flex items-center gap-1.5 border border-zinc-700 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{pin.name}</span>
                  <span className="text-[9px] text-orange-300 font-normal">({pin.distance})</span>
                </div>
                <div className="w-3 h-3 bg-orange-600 rounded-full mx-auto mt-1 ring-4 ring-orange-200 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>📍 Center: Central University Campus</span>
            <span>Click any marker for directions & details</span>
          </div>

        </div>

      </div>

    </div>
  );
};
