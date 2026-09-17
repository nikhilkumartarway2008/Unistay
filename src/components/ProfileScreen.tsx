import React, { useState } from 'react';
import { User, Shield, Sparkles, Settings, Bell, HelpCircle, ArrowLeft, Building2, GraduationCap, Wrench, FileText, Lock, LogOut, Download, Trash2, CheckCircle2, Phone } from 'lucide-react';
import { ScreenType } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const handleExportData = async () => {
    try {
      const res = await fetch('/api/auth/session', {
        headers: { Authorization: `Bearer ${localStorage.getItem('unistay_token')}` }
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unistay_account_data_${user?.phoneNumber || 'export'}.json`;
      a.click();
      setExportMessage('Account data exported successfully.');
    } catch (err) {
      setExportMessage('Failed to export data.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your UniStay account? This action is permanent.")) {
      await logout();
      onNavigate('dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        {isAuthenticated && user && (
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs mb-8">
        {isAuthenticated && user ? (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-orange-500/20">
              {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
                <Shield className="w-3.5 h-3.5 text-orange-600" />
                Verified {user.role} Account & Trust Passport
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">{user.fullName}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-600" /> {user.phoneNumber}</span>
                <span>•</span>
                <span className="capitalize">University: {user.universityId || 'DU'}</span>
                <span>•</span>
                <span className="capitalize">City: {user.cityId || 'Delhi'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Not Logged In</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Login or create your permanent UniStay account to sync your preferences, saved properties, and bookings across all devices.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">Ecosystem Hub & Quick Navigation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        
        <div 
          onClick={() => onNavigate('my-stay')}
          className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">My Stay & Tenancy Hub</h4>
              <p className="text-xs text-zinc-500">Checklists, lease, and rent dues</p>
            </div>
          </div>
          <span className="text-xs font-bold text-orange-600">Access →</span>
        </div>

        <div 
          onClick={() => onNavigate('university-connect')}
          className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">University Connect</h4>
              <p className="text-xs text-zinc-500">Campus directory & housing</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600">Explore →</span>
        </div>

        <div 
          onClick={() => onNavigate('owner-operations')}
          className="bg-white rounded-3xl border border-amber-100 p-6 shadow-xs hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Owner Operations Center</h4>
              <p className="text-xs text-zinc-500">Inventory, tenants & payouts</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600">Manage →</span>
        </div>

        <div 
          onClick={() => onNavigate('admin-control-center')}
          className="bg-white rounded-3xl border border-red-100 p-6 shadow-xs hover:border-red-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Admin Control Center</h4>
              <p className="text-xs text-zinc-500">Audit logs & verification</p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-600">Review →</span>
        </div>

      </div>

      {isAuthenticated && user && (
        <div className="bg-white rounded-[28px] border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Account & Security Management</h3>
          
          {exportMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              {exportMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleExportData}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left hover:bg-zinc-100 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-zinc-900">Download My Account Data</div>
                <div className="text-[11px] text-zinc-500">Export profile, preferences, bookings & history (JSON)</div>
              </div>
              <Download className="w-4 h-4 text-zinc-600" />
            </button>

            <button
              onClick={handleDeleteAccount}
              className="p-4 rounded-2xl bg-red-50 border border-red-200 text-left hover:bg-red-100 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-red-700">Delete Account</div>
                <div className="text-[11px] text-red-500">Permanently close account and remove personal data</div>
              </div>
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
