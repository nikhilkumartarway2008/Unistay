import React, { useState } from 'react';
import { Shield, Bell, Sparkles, User, LogIn, LogOut } from 'lucide-react';
import { ScreenType, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  currentScreen: ScreenType;
  userRole: UserRole;
  onNavigate: (screen: ScreenType) => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, userRole, onNavigate, onOpenAi }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (currentScreen === 'welcome' || currentScreen === 'role-selection' || currentScreen === 'login' || currentScreen === 'signup') return null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-orange-100/60 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div 
            onClick={() => onNavigate(userRole === 'owner' ? 'owner-dashboard' : 'dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-1.5">
                UniStay <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 capitalize">{user?.role || userRole} View</span>
              </h1>
              <p className="text-xs text-zinc-500 hidden sm:block">Unified Trust & Permanent Account Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('student-life-home')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-100 text-orange-800 text-xs font-bold hover:bg-orange-200 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Student Life OS</span>
            </button>

            <button 
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium shadow-md shadow-orange-500/20 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask UniStay</span> ✨
            </button>

            <button 
              onClick={() => onNavigate('notifications-center')}
              className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-zinc-700 hover:bg-orange-50 transition-colors shadow-xs relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></span>
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-orange-200">
                <div 
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                    {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-bold text-zinc-900 leading-tight">{user.fullName}</div>
                    <div className="text-[10px] text-zinc-500">{user.phoneNumber}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-xl bg-zinc-100 hover:bg-red-50 text-zinc-600 hover:text-red-600 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-orange-200">
                <button
                  onClick={() => onNavigate('role-selection')}
                  className="px-3.5 py-2 rounded-xl bg-white border border-orange-200 text-orange-700 text-xs font-bold hover:bg-orange-50 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-3.5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-xs hidden sm:block"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};
