import React, { useState } from 'react';
import { Shield, Sparkles, Phone, Lock, User, GraduationCap, Building2, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'OWNER'>('STUDENT');
  const [universityId, setUniversityId] = useState('DU');
  const [cityId, setCityId] = useState('Delhi');
  
  // OTP flow state
  const [step, setStep] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setStep('OTP');
      } else {
        setError(data.error || 'Failed to send OTP.');
      }
    } catch (err: any) {
      setError('Network error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode !== '123456') {
      setError('Invalid OTP code. Use test OTP: 123456');
      return;
    }
    setError('');
    setStep('CREDENTIALS');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(phoneNumber, password);
        onClose();
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        if (!fullName.trim()) {
          throw new Error('Full name is required.');
        }
        await signup(fullName, phoneNumber, password, role, universityId, cityId);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F5] rounded-[32px] border border-orange-200/60 shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center shadow-xs transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-white relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-3 border border-orange-500/30">
            <Shield className="w-3.5 h-3.5" />
            UniStay Permanent Account System
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isLogin ? "Welcome back to UniStay." : "Find your place. Know your stay."}
          </h2>
          <p className="text-xs text-zinc-300 mt-1">
            {isLogin ? "Login with phone number & password to access your persistent data." : "Create your permanent UniStay account across all devices."}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5 bg-white">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {step === 'OTP' ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-base text-zinc-900">Verify Phone Number</h3>
                <p className="text-xs text-zinc-500 mt-1">Enter the 6-digit verification code sent to {phoneNumber}</p>
                <p className="text-[11px] font-bold text-orange-600 mt-1">(Development Mode: Use code 123456)</p>
              </div>

              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                className="w-full text-center tracking-widest text-xl font-bold py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Verify OTP & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        required
                        placeholder="Nikhil Kumar"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Account Role</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('STUDENT')}
                        className={`py-2.5 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${role === 'STUDENT' ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20' : 'bg-zinc-50 text-zinc-700 border-zinc-200'}`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Student</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('OWNER')}
                        className={`py-2.5 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${role === 'OWNER' ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20' : 'bg-zinc-50 text-zinc-700 border-zinc-200'}`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Owner</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Phone Number (Indian Number)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? 'Please wait...' : (isLogin ? 'Login to UniStay' : 'Create Account & Start')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 text-center border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-extrabold text-orange-600 hover:text-orange-700"
                >
                  {isLogin ? "Create account" : "Login instead"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
