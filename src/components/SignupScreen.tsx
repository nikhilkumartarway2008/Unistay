import React, { useState } from 'react';
import { Shield, Phone, Lock, User, GraduationCap, Building2, ArrowRight, ArrowLeft, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { ScreenType } from '../types';
import { useAuth } from '../context/AuthContext';

interface SignupScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

const SECURITY_QUESTIONS = [
  "What was your first pet's name?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favorite childhood city?",
  "What was your childhood nickname?"
];

export const SignupScreen: React.FC<SignupScreenProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'OWNER'>('STUDENT');
  const [universityId, setUniversityId] = useState('DU');
  const [cityId, setCityId] = useState('Delhi');
  
  const [securityQuestion, setSecurityQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!securityAnswer.trim()) {
      setError('Please provide an answer to your security question for password recovery.');
      return;
    }

    setLoading(true);
    try {
      await signup(fullName, phoneNumber, password, role, universityId, cityId, securityQuestion, securityAnswer);
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in text-zinc-900">
      
      <div className="max-w-md w-full mx-auto px-4 mb-4">
        <button
          onClick={() => onNavigate('role-selection')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Role Selection</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Shield className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-900">
          Create your UniStay account.
        </h2>
        <p className="mt-2 text-center text-xs text-zinc-600">
          Secure permanent account with recovery security question.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-[32px] border border-orange-100 sm:px-10 space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
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

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
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

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Question Section */}
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900">
                <HelpCircle className="w-4 h-4 text-orange-600" />
                <span>Password Recovery Security Question</span>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Choose a security question. If you forget your password, you will be asked this question to reset it securely.
              </p>
              <div>
                <label className="block text-[10px] font-bold text-zinc-700 uppercase mb-1">Select Question</label>
                <select
                  value={securityQuestion}
                  onChange={e => setSecurityQuestion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-orange-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                >
                  {SECURITY_QUESTIONS.map((q, i) => (
                    <option key={i} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-700 uppercase mb-1">Your Security Answer</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your secret answer"
                  value={securityAnswer}
                  onChange={e => setSecurityAnswer(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-orange-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account & Start'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 text-center">
            <span className="text-xs text-zinc-500">Already have an account? </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-extrabold text-orange-600 hover:text-orange-700 ml-1"
            >
              Login instead
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
