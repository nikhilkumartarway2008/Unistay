import React, { useState } from 'react';
import { Shield, Phone, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Forgot password flow states
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<'PHONE' | 'ANSWER'>('PHONE');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(phoneNumber, password);
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'Phone number or password is incorrect.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchSecurityQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/get-security-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: forgotPhone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Account not found.');
      setSecurityQuestion(data.securityQuestion);
      setForgotStep('ANSWER');
    } catch (err: any) {
      setError(err.message || 'Failed to find account.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: forgotPhone, securityAnswer, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed.');
      
      setSuccessMsg(data.message || 'Password reset successfully!');
      setTimeout(() => {
        setIsForgotMode(false);
        setForgotStep('PHONE');
        setForgotPhone('');
        setSecurityAnswer('');
        setNewPassword('');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Incorrect security answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in text-zinc-900">
      
      {/* Back button */}
      <div className="max-w-md w-full mx-auto px-4 mb-4">
        <button
          onClick={() => {
            if (isForgotMode) {
              setIsForgotMode(false);
              setForgotStep('PHONE');
              setError('');
            } else {
              onNavigate('role-selection');
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>{isForgotMode ? 'Back to Login' : 'Back to Role Selection'}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Shield className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-900">
          {isForgotMode ? 'Reset Your Password' : 'Welcome back to UniStay.'}
        </h2>
        <p className="mt-2 text-center text-xs text-zinc-600">
          {isForgotMode ? 'Answer your security question to securely reset password.' : 'Secure multi-device permanent account login.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-[32px] border border-orange-100 sm:px-10 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {!isForgotMode ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Encrypted authentication</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(true);
                    setForgotStep('PHONE');
                    setError('');
                  }}
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Login to UniStay'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div>
              {forgotStep === 'PHONE' ? (
                <form onSubmit={handleFetchSecurityQuestion} className="space-y-4">
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Enter your registered phone number to retrieve your security recovery question.
                  </p>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Enter phone number"
                        value={forgotPhone}
                        onChange={e => setForgotPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{loading ? 'Checking Account...' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900 text-xs font-semibold flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-orange-700 mb-0.5">Security Question:</div>
                      <div>{securityQuestion}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">
                      Your Security Answer
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your security answer"
                      value={securityAnswer}
                      onChange={e => setSecurityAnswer(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{loading ? 'Resetting Password...' : 'Reset Password'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {!isForgotMode && (
            <div className="pt-4 border-t border-zinc-100 text-center">
              <span className="text-xs text-zinc-500">Don't have a UniStay account? </span>
              <button
                onClick={() => onNavigate('signup')}
                className="text-xs font-extrabold text-orange-600 hover:text-orange-700 ml-1"
              >
                Create Account
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
