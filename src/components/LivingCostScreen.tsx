import React, { useState } from 'react';
import { 
  ArrowLeft, Calculator, ShieldCheck, ChevronRight, PieChart, TrendingUp, 
  Sparkles, Info, CheckCircle2, AlertCircle, Sliders, DollarSign, RefreshCw, 
  Building, User, Compass, HelpCircle, ArrowRight, Shield, Clock, Calendar
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface LivingCostScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedProperty: PropertyItem | null;
}

export const LivingCostScreen: React.FC<LivingCostScreenProps> = ({ onNavigate, selectedProperty }) => {
  const property = selectedProperty || PLACEHOLDER_PROPERTIES[0];
  
  const [costFilter, setCostFilter] = useState<'all' | 'verified' | 'estimated'>('all');

  // Lifestyle assumptions state
  const [foodChoice, setFoodChoice] = useState<'Cook' | 'Mess' | 'Outside'>('Mess');
  const [transportChoice, setTransportChoice] = useState<'Walk' | 'Public Transport' | 'Auto/Cab'>('Public Transport');
  const [roomChoice, setRoomChoice] = useState<'Shared' | 'Single'>('Shared');
  const [laundryChoice, setLaundryChoice] = useState<'Self' | 'Service'>('Service');
  const [userBudget, setUserBudget] = useState<string>('12000');
  const [activeExplainItem, setActiveExplainItem] = useState<string | null>(null);

  // AI Assistant state
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  // Base numeric calculations
  const baseRent = property.rentNumeric || 11500;
  const foodCost = foodChoice === 'Cook' ? 1800 : foodChoice === 'Mess' ? 2500 : 4500;
  const electricityCost = 900;
  const internetCost = 400;
  const laundryCost = laundryChoice === 'Self' ? 200 : 600;
  const maintenanceCost = 500;
  const transportCost = transportChoice === 'Walk' ? 100 : transportChoice === 'Public Transport' ? 800 : 2200;

  const totalMonthlyCost = baseRent + foodCost + electricityCost + internetCost + laundryCost + maintenanceCost + transportCost;

  // One-time costs
  const securityDeposit = baseRent;
  const agreementFee = 500;
  const movingCost = 400;
  const totalMoveInCost = baseRent + securityDeposit + agreementFee + movingCost;

  // Cost confidence calculation
  const getCostConfidence = () => {
    return {
      level: 'High Confidence',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Rent, internet, and maintenance are verified by UniStay. Food and transport are calculated estimates based on student averages.'
    };
  };

  const confidence = getCostConfidence();

  // Cost items array with statuses
  const costItems = [
    { 
      category: 'Rent', 
      amount: `₹${baseRent.toLocaleString()}`, 
      status: 'VERIFIED', 
      icon: '🏠', 
      desc: 'Base monthly accommodation fee confirmed by physical property audit.',
      source: 'UniStay Audit (Updated 12 days ago)'
    },
    { 
      category: 'Food', 
      amount: `₹${foodCost.toLocaleString()}`, 
      status: 'ESTIMATED', 
      icon: '🍱', 
      desc: `Calculated based on your '${foodChoice}' preference.`,
      source: 'Student Lifestyle Survey'
    },
    { 
      category: 'Electricity', 
      amount: `₹${electricityCost.toLocaleString()}`, 
      status: 'ESTIMATED', 
      icon: '⚡', 
      desc: 'Metered consumption estimate for lighting, fan, and standard plug use.',
      source: 'Owner Provided Sub-meter Estimate'
    },
    { 
      category: 'Internet', 
      amount: `₹${internetCost.toLocaleString()}`, 
      status: 'OWNER PROVIDED', 
      icon: '🌐', 
      desc: 'High-speed Wi-Fi included or subsidized by property.',
      source: 'Owner Agreement'
    },
    { 
      category: 'Laundry', 
      amount: `₹${laundryCost.toLocaleString()}`, 
      status: 'ESTIMATED', 
      icon: '🧺', 
      desc: `Based on your '${laundryChoice}' laundry preference.`,
      source: 'Local Service Rate Card'
    },
    { 
      category: 'Maintenance', 
      amount: `₹${maintenanceCost.toLocaleString()}`, 
      status: 'VERIFIED', 
      icon: '🛠️', 
      desc: 'Common area upkeep, waste disposal, and security staff.',
      source: 'Verified Property Terms'
    },
    { 
      category: 'Transport', 
      amount: `₹${transportCost.toLocaleString()}`, 
      status: 'ESTIMATED', 
      icon: '🚌', 
      desc: `Estimated campus commute via '${transportChoice}' (${property.distance}).`,
      source: 'Campus Proximity Engine'
    },
  ];

  const handleAskAi = (question: string) => {
    if (question.includes('spend')) {
      setAiAnswer(`Based on verified rent (₹${baseRent.toLocaleString()}) and estimated living expenses, your total monthly cost is estimated at ₹${totalMonthlyCost.toLocaleString()}/month.`);
    } else if (question.includes('hidden')) {
      setAiAnswer("Hidden costs typically include electricity sub-metering overages, security deposit deductions upon exit, and one-time agreement registration fees.");
    } else if (question.includes('budget')) {
      const budgetNum = Number(userBudget) || 12000;
      if (totalMonthlyCost <= budgetNum) {
        setAiAnswer(`Yes! At ₹${totalMonthlyCost.toLocaleString()}/month, this stay is within your stated budget of ₹${budgetNum.toLocaleString()}/month.`);
      } else {
        setAiAnswer(`At ₹${totalMonthlyCost.toLocaleString()}/month, this stay exceeds your stated budget of ₹${budgetNum.toLocaleString()}/month by ₹${(totalMonthlyCost - budgetNum).toLocaleString()}/month.`);
      }
    } else if (question.includes('missing')) {
      setAiAnswer("All major living cost categories are accounted for. Confirm electricity meter reading rates with the owner before signing.");
    } else {
      setAiAnswer("UniStay separates verified costs from estimates so you can make an informed financial decision.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* 1. HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('property-details')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Property</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100/80 text-orange-900 text-xs font-bold border border-orange-200">
            <Calculator className="w-3.5 h-3.5 text-orange-600" />
            Financial Intelligence
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">True Living Cost</h1>
          <span className="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-0.5 rounded-full">
            {property.name}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500">"What's my life actually going to look like if I live here?" Don't just see the rent.</p>
      </div>

      {/* 19. REAL COST VS RENT HIGHLIGHT */}
      <div className="bg-white rounded-[28px] border-2 border-orange-300 p-6 sm:p-8 shadow-md mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> UniStay Differentiator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-1">Rent isn't the whole cost.</h2>
            <p className="text-xs text-zinc-500">See the full financial picture before committing your student budget.</p>
          </div>
          <div className="flex items-center gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-orange-200 shrink-0">
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Monthly Rent</div>
              <div className="text-lg font-bold text-zinc-900">₹{baseRent.toLocaleString()}</div>
            </div>
            <div className="text-orange-500 font-bold text-xl">+</div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Estimated Utilities</div>
              <div className="text-lg font-bold text-orange-600">₹{(totalMonthlyCost - baseRent).toLocaleString()}</div>
            </div>
            <div className="text-orange-500 font-bold text-xl">=</div>
            <div>
              <div className="text-[10px] text-orange-700 uppercase font-bold">Total Living Cost</div>
              <div className="text-xl font-extrabold text-orange-700">₹{totalMonthlyCost.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN COST CARD */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-[28px] p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold mb-3 border border-orange-500/30">
              <span>What will I actually spend?</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-orange-400 mb-2 tracking-tight">
              ₹{totalMonthlyCost.toLocaleString()} <span className="text-sm font-normal text-zinc-400">/ month</span>
            </div>
            <div className="text-sm font-semibold text-zinc-200 mb-1">Estimated monthly living cost</div>
            <p className="text-xs text-zinc-400">Based on verified rent and interactive lifestyle assumptions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col justify-center min-w-[240px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">Cost Confidence</span>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${confidence.badgeClass}`}>
                {confidence.level}
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed mb-2">
              {confidence.description}
            </p>
            <div className="text-[10px] text-zinc-400 italic">Do NOT imply guaranteed fixed prices.</div>
          </div>
        </div>
      </div>

      {/* 4. VERIFIED VS ESTIMATED FILTERS */}
      <div className="bg-white rounded-[24px] p-2 border border-orange-100 mb-6 flex items-center justify-center gap-2 shadow-xs max-w-md mx-auto">
        <button
          onClick={() => setCostFilter('all')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${costFilter === 'all' ? 'bg-orange-500 text-white shadow-xs' : 'text-zinc-600 hover:bg-orange-50'}`}
        >
          All Costs
        </button>
        <button
          onClick={() => setCostFilter('verified')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${costFilter === 'verified' ? 'bg-emerald-600 text-white shadow-xs' : 'text-zinc-600 hover:bg-emerald-50'}`}
        >
          ✓ Verified / Owner
        </button>
        <button
          onClick={() => setCostFilter('estimated')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${costFilter === 'estimated' ? 'bg-amber-600 text-white shadow-xs' : 'text-zinc-600 hover:bg-amber-50'}`}
        >
          ≈ Estimated
        </button>
      </div>

      {/* 3. COST BREAKDOWN UI */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Detailed Cost Breakdown</h3>
            <p className="text-xs text-zinc-500">Click any item to inspect how the amount was determined.</p>
          </div>
          <span className="text-xs font-semibold text-zinc-500 bg-[#FAF8F5] px-3 py-1 rounded-xl border border-orange-100">
            7 Cost Items
          </span>
        </div>

        <div className="space-y-3">
          {costItems
            .filter(item => {
              if (costFilter === 'verified') return item.status === 'VERIFIED' || item.status === 'OWNER PROVIDED';
              if (costFilter === 'estimated') return item.status === 'ESTIMATED';
              return true;
            })
            .map((item, idx) => {
              const isExpanded = activeExplainItem === item.category;
              return (
                <div key={idx} className="bg-[#FAF8F5] rounded-2xl border border-orange-100/80 overflow-hidden transition-all">
                  <div 
                    onClick={() => setActiveExplainItem(isExpanded ? null : item.category)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                          <span>{item.category}</span>
                          <span className="text-[10px] text-zinc-400 font-normal">({item.source})</span>
                        </div>
                        <div className="text-[11px] text-zinc-500">{item.desc}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div className="text-sm font-bold text-zinc-900">{item.amount}</div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${
                        item.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'OWNER PROVIDED' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'ESTIMATED' ? 'bg-amber-100 text-amber-800' :
                        'bg-zinc-200 text-zinc-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 bg-white border-t border-orange-100 text-xs text-zinc-700 animate-fade-in flex items-center justify-between">
                      <div>
                        <span className="font-bold text-orange-800">Source Verification: </span>
                        {item.source} — Calculated based on verified baseline data and your selected lifestyle preferences.
                      </div>
                      <span className="text-[10px] text-zinc-400">Updated recently</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* 4. ONE-TIME COSTS & 5. FIRST-MONTH COST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* One-Time Costs */}
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">One-Time Move-In Costs</h3>
            <p className="text-xs text-zinc-500 mb-4">Initial deposits and registration fees.</p>

            <div className="space-y-2.5 mb-6">
              {[
                { label: 'Security deposit (Refundable)', amount: `₹${securityDeposit.toLocaleString()}`, status: 'VERIFIED' },
                { label: 'Rental agreement charges', amount: `₹${agreementFee.toLocaleString()}`, status: 'ESTIMATED' },
                { label: 'Moving & transport cost', amount: `₹${movingCost.toLocaleString()}`, status: 'ESTIMATED' },
                { label: 'Maintenance deposit', amount: 'Not provided', status: 'NOT PROVIDED' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-3 rounded-xl border border-orange-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex items-center justify-between">
            <span className="text-xs font-bold text-orange-900">Total initial move-in amount:</span>
            <span className="text-base font-extrabold text-orange-700">₹{(baseRent + securityDeposit + agreementFee + movingCost).toLocaleString()}</span>
          </div>
        </div>

        {/* First-Month Cost Calculation */}
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold mb-2">
              <Calculator className="w-3 h-3" /> Move-in Calculation
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">How much money do I need to move in?</h3>
            <p className="text-xs text-zinc-500 mb-4">Formula: First Month Rent + Security Deposit + One-Time Charges.</p>

            <div className="space-y-2 text-xs text-zinc-700 mb-6 bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100">
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span>First Month Rent</span>
                <span className="font-bold">₹{baseRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span>Security Deposit</span>
                <span className="font-bold">₹{securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span>Agreement & Moving</span>
                <span className="font-bold">₹{(agreementFee + movingCost).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-orange-700 pt-1">
                <span>Estimated Move-In Total</span>
                <span>₹{totalMoveInCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 italic">Never hide deposits inside monthly rent. Verified transparently.</p>
        </div>

      </div>

      {/* 7. LIFESTYLE COST CONTROLS */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Customize Your Lifestyle Assumptions</h3>
            <p className="text-xs text-zinc-500">Change assumptions to instantly recalculate estimated monthly expenses.</p>
          </div>
          <Sliders className="w-6 h-6 text-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Food Control */}
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-2">Food & Dining:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Cook', 'Mess', 'Outside'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFoodChoice(opt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${foodChoice === opt ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-[#FAF8F5] text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Transport Control */}
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-2">Campus Commute:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Walk', 'Public Transport', 'Auto/Cab'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTransportChoice(opt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${transportChoice === opt ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-[#FAF8F5] text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Room Choice */}
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-2">Room Occupancy:</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Shared', 'Single'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRoomChoice(opt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${roomChoice === opt ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-[#FAF8F5] text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Laundry Choice */}
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-2">Laundry Service:</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Self', 'Service'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLaundryChoice(opt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${laundryChoice === opt ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-[#FAF8F5] text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-orange-900 font-bold">Recalculated Monthly Estimate</div>
            <div className="text-xl font-extrabold text-orange-600">₹{totalMonthlyCost.toLocaleString()} / month</div>
          </div>
          <span className="text-[11px] font-bold text-orange-800 bg-white px-3 py-1.5 rounded-xl border border-orange-200">
            Live Updated
          </span>
        </div>
      </div>

      {/* 6. BUDGET CHECK & 9. COST OVER TIME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Budget Check */}
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Budget Check</h3>
            <p className="text-xs text-zinc-500 mb-4">Connected with your Student Living Profile.</p>

            <div className="mb-4">
              <label className="text-xs font-bold text-zinc-700 block mb-1">Your target monthly budget (₹):</label>
              <input
                type="number"
                value={userBudget}
                onChange={(e) => setUserBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className={`p-4 rounded-2xl border text-xs ${
              totalMonthlyCost <= (Number(userBudget) || 12000) ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold mb-0.5">
                {totalMonthlyCost <= (Number(userBudget) || 12000) ? '✓ Within your stated budget' : `⚠ Above your stated budget by ₹${(totalMonthlyCost - (Number(userBudget) || 12000)).toLocaleString()}/month`}
              </div>
              <p className="text-[11px] opacity-90">UniStay provides objective intelligence. You make the final decision.</p>
            </div>
          </div>
        </div>

        {/* Cost Over Time */}
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Cost Over Time Projections</h3>
            <p className="text-xs text-zinc-500 mb-4">Estimated expenditure across university terms.</p>

            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-orange-100">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">3 Months</div>
                <div className="text-xs font-extrabold text-zinc-900 mt-1">₹{(totalMonthlyCost * 3).toLocaleString()}</div>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-orange-100">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">6 Months</div>
                <div className="text-xs font-extrabold text-zinc-900 mt-1">₹{(totalMonthlyCost * 6).toLocaleString()}</div>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-orange-100">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">12 Months</div>
                <div className="text-xs font-extrabold text-orange-600 mt-1">₹{(totalMonthlyCost * 12).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 italic">Based on current estimates and assumptions. Prices are not guaranteed for future periods.</div>
        </div>

      </div>

      {/* 18. AI LIFE ASSISTANT SECTION */}
      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Ask UniStay ✨ (Financial Assistant)</h3>
            <p className="text-xs text-zinc-500">Ask deterministic questions regarding true living costs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {[
            "How much will I spend here?",
            "What are the hidden costs I should check?",
            "Is this within my budget?",
            "What information is missing?"
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskAi(q)}
              className="text-left p-3 rounded-2xl bg-[#FAF8F5] hover:bg-orange-50 border border-orange-100 text-xs text-zinc-800 font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {aiAnswer && (
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 leading-relaxed animate-fade-in">
            <div className="font-bold mb-1 text-orange-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>UniStay Assistant:</span>
            </div>
            {aiAnswer}
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION STICKY */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 p-4 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('property-details')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Back to Property</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('life-preview')}
              className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md shadow-orange-500/20 flex items-center gap-2"
            >
              <span>Next: Preview Your Life ✨</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
