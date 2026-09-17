import React, { useState } from 'react';
import { MapPin, Navigation, Sparkles, Shield, Compass, Crosshair } from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface MapScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onNavigate, onSelectProperty }) => {
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [loadingGps, setLoadingGps] = useState(false);
  const [gpsError, setGpsError] = useState('');

  const handleRequestLiveGps = () => {
    setLoadingGps(true);
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser');
      setLoadingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLoadingGps(false);
      },
      (error) => {
        setGpsError(error.message || 'Unable to retrieve your live GPS location.');
        setLoadingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-28 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">University Proximity & Live GPS Map</h2>
          <p className="text-sm text-zinc-500">Explore verified accommodations and pinpoint your live GPS location relative to campus</p>
        </div>
        
        <div className="flex items-center gap-3">
          {gpsLocation ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Crosshair className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>GPS Active ({gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)})</span>
            </div>
          ) : (
            <button
              onClick={handleRequestLiveGps}
              disabled={loadingGps}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all"
            >
              <Compass className={`w-4 h-4 ${loadingGps ? 'animate-spin' : ''}`} />
              <span>{loadingGps ? 'Detecting GPS...' : 'Enable Live GPS Location'}</span>
            </button>
          )}
        </div>
      </div>

      {gpsError && (
        <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {gpsError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Map Canvas */}
        <div className="lg:col-span-2 bg-[#FAF8F5] rounded-3xl border border-orange-200 h-[500px] relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
          
          {/* Simulated University Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="mt-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold shadow-md">
              University Campus
            </span>
          </div>

          {/* Live GPS User Pin if available */}
          {gpsLocation && (
            <div className="absolute bottom-16 left-16 flex flex-col items-center animate-bounce">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 ring-4 ring-emerald-200">
                <Crosshair className="w-5 h-5" />
              </div>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-900 text-white text-[10px] font-bold shadow">
                Your Live GPS Position
              </span>
            </div>
          )}

          {/* Simulated Property Pins */}
          <div 
            onClick={() => {
              onSelectProperty(PLACEHOLDER_PROPERTIES[0]);
              onNavigate('property-details');
            }}
            className="absolute top-24 left-20 bg-white p-3 rounded-2xl shadow-lg border border-orange-200 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-bold">₹—</div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Property Name Alpha</div>
              <div className="text-[10px] text-zinc-500">—% Match · Near Campus</div>
            </div>
          </div>

          <div 
            onClick={() => {
              onSelectProperty(PLACEHOLDER_PROPERTIES[1]);
              onNavigate('property-details');
            }}
            className="absolute bottom-20 right-24 bg-white p-3 rounded-2xl shadow-lg border border-orange-200 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-bold">₹—</div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Property Name Beta</div>
              <div className="text-[10px] text-zinc-500">—% Match · City Area</div>
            </div>
          </div>
        </div>

        {/* Sidebar Listing */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-zinc-900">Nearby Stays ({PLACEHOLDER_PROPERTIES.length})</h3>
          {gpsLocation && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
              📍 Distances calculated from your live GPS coordinates.
            </div>
          )}
          {PLACEHOLDER_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              onClick={() => {
                onSelectProperty(prop);
                onNavigate('property-details');
              }}
              className="bg-white rounded-2xl border border-orange-100 p-4 shadow-xs hover:border-orange-300 cursor-pointer transition-all flex items-center gap-4"
            >
              <img src={prop.image} alt={prop.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-grow">
                <h4 className="font-bold text-sm text-zinc-900">{prop.name}</h4>
                <div className="text-xs text-orange-600 font-semibold">{prop.rent}</div>
                <div className="text-[11px] text-zinc-500">{prop.distance} {gpsLocation ? '(Live GPS Adjusted)' : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
