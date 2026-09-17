import React from 'react';
import { Home, Compass, MapPin, Bookmark, User, Sparkles } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenAi: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, onOpenAi }) => {
  if (currentScreen === 'welcome') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-orange-100/80 shadow-lg px-4 py-2 sm:hidden">
      <div className="flex items-center justify-around relative">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'dashboard' ? 'text-orange-600 font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => onNavigate('explore')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'explore' ? 'text-orange-600 font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        <div className="relative -top-5">
          <button
            onClick={onOpenAi}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 hover:scale-105 active:scale-95 transition-transform"
            title="Ask UniStay ✨"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'map' ? 'text-orange-600 font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">Map</span>
        </button>

        <button
          onClick={() => onNavigate('saved')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'saved' || currentScreen === 'comparison' ? 'text-orange-600 font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px]">Saved</span>
        </button>
      </div>
    </nav>
  );
};
