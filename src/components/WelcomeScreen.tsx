import React from 'react';
import { Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-zinc-950 text-white">
      {/* Background Image with warm gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=2000&q=85" 
          alt="Student Accommodation" 
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/30 to-amber-950/20 mix-blend-overlay"></div>
      </div>

      {/* Header bar */}
      <div className="relative z-10 p-6 sm:p-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">UniStay</span>
        </div>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 transition-colors"
        >
          Continue as Guest
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center sm:text-left w-full my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Student-Living Intelligence Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
          Your next chapter starts with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">right stay</span>.
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 mb-10 max-w-2xl font-normal leading-relaxed">
          Find trusted student accommodation that fits your budget, lifestyle and campus.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group transition-all"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all"
          >
            Continue as Guest
          </button>
        </div>

        {/* Subtle Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Verified stays</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Transparent costs</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Student-first</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 text-center text-xs text-zinc-500">
        You are moving somewhere new, and UniStay will help you feel confident.
      </div>
    </div>
  );
};
