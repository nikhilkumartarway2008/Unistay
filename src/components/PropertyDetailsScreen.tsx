import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Share2, Shield, CheckCircle2, ChevronRight, 
  Calculator, Compass, MessageSquare, AlertTriangle, CreditCard, 
  Sparkles, Info, MapPin, Wifi, Utensils, Droplets, Zap, Car, 
  Check, HelpCircle, Building2, UserCheck, FileCheck, Award, RefreshCw
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';

interface PropertyDetailsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  property: PropertyItem | null;
}

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({ onNavigate, property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(property?.saved || false);
  const [whyMatchOpen, setWhyMatchOpen] = useState(true);
  const [verificationHistoryOpen, setVerificationHistoryOpen] = useState(false);
  const [costBreakdownOpen, setCostBreakdownOpen] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const images = [
    property?.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleAskAi = (question: string) => {
    setAiQuery(question);
    if (question.includes('budget')) {
      setAiResponse("Based on your preferences, this stay aligns with your estimated target range. However, extra utilities like electricity are billed separately.");
    } else if (question.includes('verify')) {
      setAiResponse("UniStay has verified the owner identity, property address, and legal rental agreements. Amenities require owner confirmation.");
    } else if (question.includes('monthly')) {
      setAiResponse("Estimated monthly living cost is ₹— including rent, food, electricity, and transport. Verified costs and estimates are separated.");
    } else {
      setAiResponse("I don't have verified information about that yet. Always review booking terms before confirming.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Top Navigation & Actions */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200/80 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-2xl border transition-all shadow-xs ${isSaved ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-zinc-700 border-orange-200/80 hover:bg-orange-50'}`}
            title="Save Property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => alert("Share link copied to clipboard")}
            className="p-2.5 rounded-2xl bg-white border border-orange-200/80 text-zinc-700 hover:bg-orange-50 transition-all shadow-xs"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. TOP PROPERTY IMAGE AREA (approx 35-40% visual prominence) */}
      <div className="mb-8">
        <div className="relative h-72 sm:h-[400px] rounded-[28px] overflow-hidden shadow-md bg-zinc-200 mb-3 border border-orange-100">
          <img
            src={images[activeImageIndex]}
            alt="Property Gallery"
            className="w-full h-full object-cover transition-all duration-300"
          />
          
          {/* Verified Badge Overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs font-bold text-zinc-900 flex items-center gap-2 shadow-md border border-orange-100">
            <span className="text-base">🛡️</span>
            <span>Verified UniStay Stay</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-medium text-white">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`h-20 sm:h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${activeImageIndex === idx ? 'border-orange-500 ring-2 ring-orange-500/20 scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. PROPERTY HEADER & MATCH CARD */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {property?.name || 'Property Name'}
            </h1>
            <p className="text-sm text-zinc-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{property?.location || 'Location'} • {property?.distance || '— km from campus'}</span>
            </p>
          </div>

          <div className="text-left sm:text-right bg-orange-50/70 p-4 rounded-2xl border border-orange-100">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Monthly Cost</div>
            <div className="text-2xl font-bold text-orange-600">{property?.rent || '₹— / month'}</div>
            <div className="text-[11px] text-zinc-500">Transparent breakdown below</div>
          </div>
        </div>

        {/* Match Percentage */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-100" />
              <span className="text-lg font-bold">{property?.matchPercentage || '—% Lifestyle Match'}</span>
            </div>
            <button 
              onClick={() => setWhyMatchOpen(!whyMatchOpen)}
              className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-colors"
            >
              {whyMatchOpen ? 'Hide details' : 'Why this matches you'}
            </button>
          </div>
          <p className="text-xs text-orange-100">Based on your preferences and daily student routine</p>

          {whyMatchOpen && (
            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span>Budget aligned</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span>Campus distance</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span>Quiet study setup</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span>Food preference</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span>Private / Shared</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. TRUST PASSPORT — HERO FEATURE */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">UniStay Trust Passport 🛡️</h3>
              <p className="text-xs text-zinc-500">Know what has actually been checked.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-100 text-orange-800">
            Last verified: —
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {/* OWNER */}
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Owner</div>
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-900">Identity verified</span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Verified</span>
            </div>
          </div>

          {/* PROPERTY */}
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Property</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Address verified',
                'Rental information verified',
                'Amenities verified',
                'Photos verified',
                'Availability verified'
              ].map((label, i) => (
                <div key={i} className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-900">{label}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* COMMUNITY */}
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Community</div>
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-900">Student experience available</span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Verified</span>
            </div>
          </div>
        </div>

        {/* 4. VERIFICATION HISTORY */}
        <div className="pt-6 border-t border-zinc-100">
          <button 
            onClick={() => setVerificationHistoryOpen(!verificationHistoryOpen)}
            className="w-full flex items-center justify-between font-bold text-sm text-zinc-900 mb-2"
          >
            <span>Verification history</span>
            <span className="text-xs text-orange-600">{verificationHistoryOpen ? 'Hide' : 'View timeline'}</span>
          </button>

          {verificationHistoryOpen && (
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-orange-200 mt-4 pl-2">
              <div className="relative flex items-center gap-4 pl-8">
                <div className="absolute left-1.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-200"></div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Verification completed</div>
                  <div className="text-[11px] text-zinc-500">On-site audit and document check finalized</div>
                </div>
              </div>
              <div className="relative flex items-center gap-4 pl-8">
                <div className="absolute left-1.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-200"></div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Property information checked</div>
                  <div className="text-[11px] text-zinc-500">Amenities and room inventory audited</div>
                </div>
              </div>
              <div className="relative flex items-center gap-4 pl-8">
                <div className="absolute left-1.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-200"></div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Listing information updated</div>
                  <div className="text-[11px] text-zinc-500">Pricing and rules verified with owner</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. TRUE LIVING COST */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">What will I actually spend?</h3>
              <p className="text-xs text-zinc-500">Transparent financial breakdown</p>
            </div>
          </div>
          <button 
            onClick={() => alert("Some costs may vary. Verified costs and estimated costs are clearly separated.")}
            className="p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
            title="Cost Info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Rent</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">VERIFIED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Food</span>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded">ESTIMATED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Electricity</span>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded">ESTIMATED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Transport</span>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded">ESTIMATED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Laundry</span>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded">ESTIMATED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">Maintenance</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">VERIFIED</span>
            </div>
            <span className="font-bold text-zinc-900">₹—</span>
          </div>
        </div>

        <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500 font-medium">Estimated monthly living cost</div>
            <div className="text-xl font-bold text-orange-600">₹—</div>
          </div>
          <button 
            onClick={() => onNavigate('living-cost')}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            <span>Full Breakdown</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5.5 ROOM TYPES SECTION */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Available Room Types</h3>
            <p className="text-xs text-zinc-500">Choose from owner-listed room configurations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(property?.roomTypes && property.roomTypes.length > 0 ? property.roomTypes : [
            { name: 'Single Occupancy Room', rent: 16000, capacity: '1 Person', description: 'Private furnished room with attached washroom & study desk.' },
            { name: 'Double Sharing Room', rent: 11000, capacity: '2 Persons', description: 'Spacious twin sharing room with individual wardrobes.' }
          ]).map((rt, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-orange-100 hover:border-orange-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-zinc-900">{rt.name}</span>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-xl">{rt.capacity}</span>
                </div>
                <div className="text-lg font-bold text-orange-600 mb-2">₹{rt.rent.toLocaleString()} <span className="text-xs font-normal text-zinc-500">/ mo</span></div>
                <p className="text-xs text-zinc-600 mb-4">{rt.description}</p>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Select & Book This Room</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. LIFE PREVIEW */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Preview Your Life</h3>
              <p className="text-xs text-zinc-500">See how this stay fits into your everyday routine.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">🎓 College</div>
            <div className="font-bold text-zinc-900">— km</div>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">🚶 Commute</div>
            <div className="font-bold text-zinc-900">— min</div>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">📚 Study environment</div>
            <div className="font-bold text-zinc-900">Not enough data</div>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">🍱 Food</div>
            <div className="font-bold text-zinc-900">Unknown</div>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">📶 Internet</div>
            <div className="font-bold text-emerald-700">Verified</div>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-orange-100">
            <div className="text-zinc-400 font-medium mb-1">🛒 Essentials</div>
            <div className="font-bold text-zinc-900">— km</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('life-preview')}
          className="w-full py-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span>Preview My Day</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7. VERIFIED STUDENT EXPERIENCES */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Student experiences</h3>
              <p className="text-xs text-zinc-500">Verified peer reviews across key student categories</p>
            </div>
          </div>
        </div>

        <div className="text-center py-8 bg-[#FAF8F5] rounded-2xl border border-orange-100 mb-6">
          <p className="text-sm font-medium text-zinc-600">No verified student experiences yet.</p>
          <p className="text-xs text-zinc-400 mt-1">Be the first student to review after staying here.</p>
        </div>

        <button
          onClick={() => onNavigate('reviews')}
          className="w-full py-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span>See all experiences</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 8. RED FLAGS / THINGS TO KNOW */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Before you book</h3>
            <p className="text-xs text-zinc-500">Transparent facts and items requiring confirmation</p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 mb-1">
              <span>✓ VERIFIED</span>
            </div>
            <p className="text-xs text-emerald-900">Information that UniStay has physically checked and confirmed.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-800 mb-1">
              <span>⚠ NEEDS ATTENTION</span>
            </div>
            <p className="text-xs text-amber-900">No major issues currently reported. Always review the booking terms before confirming.</p>
          </div>
        </div>
      </div>

      {/* 9. AMENITIES */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Amenities & Facilities</h3>
        <p className="text-xs text-zinc-500 mb-6">Distinguishing owner claims from UniStay verifications.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: 'Wi-Fi', state: 'Verified', icon: Wifi },
            { name: 'Food', state: 'Unknown', icon: Utensils },
            { name: 'Laundry', state: 'Available', icon: RefreshCw },
            { name: 'AC', state: 'Verified', icon: Zap },
            { name: 'Parking', state: 'Available', icon: Car },
            { name: 'Power backup', state: 'Verified', icon: Zap },
            { name: 'CCTV', state: 'Verified', icon: Shield },
            { name: 'Housekeeping', state: 'Available', icon: CheckCircle2 },
            { name: 'Study area', state: 'Verified', icon: Compass },
            { name: 'Water', state: 'Verified', icon: Droplets }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <IconComp className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-semibold text-zinc-800">{item.name}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${item.state === 'Verified' ? 'bg-emerald-100 text-emerald-800' : item.state === 'Available' ? 'bg-orange-100 text-orange-800' : 'bg-zinc-100 text-zinc-600'}`}>
                  {item.state === 'Verified' ? '✓ Verified' : item.state === 'Available' ? '○ Available' : '? Unknown'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 10. MAP / LOCATION */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Location & Neighborhood</h3>
              <p className="text-xs text-zinc-500">Property, university & nearby essentials</p>
            </div>
          </div>
        </div>

        <div className="h-44 rounded-2xl bg-zinc-100 border border-orange-100 mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="text-center p-4">
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2 animate-bounce" />
            <div className="text-xs font-bold text-zinc-800">Location Map</div>
            <div className="text-[11px] text-zinc-500">Precise student neighborhood mapping</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('map')}
          className="w-full py-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span>Explore Student Area</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 14. TRUST-FIRST PHILOSOPHY BANNER */}
      <div className="bg-orange-50/70 border border-orange-200/80 rounded-[28px] p-6 text-center mb-8">
        <p className="text-xs font-semibold text-orange-900 mb-1">“Don't just see the room. Know what you're choosing.”</p>
        <p className="text-[11px] text-zinc-600">Here is everything we know • Here is what we verified • Here is what we estimate • Now YOU decide.</p>
      </div>

      {/* 11. AI PROPERTY ASSISTANT FLOATING BUTTON & MODAL */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask UniStay</span>
        </button>
      </div>

      {aiAssistantOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-orange-100 animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900">Ask UniStay ✨</h4>
              </div>
              <button 
                onClick={() => setAiAssistantOpen(false)}
                className="text-xs text-zinc-400 hover:text-zinc-700 font-bold p-2"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-zinc-500 mb-4">Select a question or ask anything about this property:</p>

            <div className="space-y-2 mb-4">
              {[
                "Is this within my budget?",
                "What should I verify before booking?",
                "How much could I spend monthly?",
                "How does this compare with my saved stays?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskAi(q)}
                  className="w-full text-left p-3 rounded-2xl bg-[#FAF8F5] hover:bg-orange-50 border border-orange-100 text-xs text-zinc-800 font-medium transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {aiResponse && (
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 leading-relaxed">
                <div className="font-bold mb-1 text-orange-700">UniStay AI Assistant:</div>
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 12. STICKY BOTTOM BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 p-4 z-30 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-semibold uppercase">Estimated monthly cost</div>
            <div className="text-lg font-bold text-orange-600">{property?.rent || '₹—'}</div>
          </div>
          
          <button
            onClick={() => onNavigate('booking')}
            className="flex-1 max-w-xs py-3.5 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <span>Book / Continue</span>
            <CreditCard className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
