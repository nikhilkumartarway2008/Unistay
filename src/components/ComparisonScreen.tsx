import React, { useState } from 'react';
import { 
  ArrowLeft, GitCompare, Sparkles, Check, X, Send, ChevronRight, 
  Shield, DollarSign, Compass, Bookmark, Share2, AlertCircle, Info, CheckCircle2, Award
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';
import { PLACEHOLDER_PROPERTIES } from '../data';

interface ComparisonScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ onNavigate }) => {
  const [selectedProperties, setSelectedProperties] = useState<PropertyItem[]>(PLACEHOLDER_PROPERTIES.slice(0, 3));
  const [activeTab, setActiveTab] = useState<'overview' | 'cost' | 'lifestyle' | 'trust' | 'insights'>('overview');
  const [aiPrompt, setAiPrompt] = useState('Which option fits my budget and distance preferences?');
  const [aiResponse, setAiResponse] = useState(
    'Here’s what I found:\n\n• Option A has a lower estimated living cost.\n• Option B has more complete verification information.\n• Option C is closer to campus.\n\nSome information about food and electricity is unavailable, so confirm those details before booking.'
  );
  const [loading, setLoading] = useState(false);
  const [savedComparison, setSavedComparison] = useState(false);

  const handleRemoveProperty = (id: string) => {
    if (selectedProperties.length <= 1) {
      alert("At least one property must remain in the comparison.");
      return;
    }
    setSelectedProperties(selectedProperties.filter(p => p.id !== id));
  };

  const handleAskAi = (question: string) => {
    setAiPrompt(question);
    setLoading(true);
    setTimeout(() => {
      if (question.includes('budget')) {
        setAiResponse("Option A and B align with moderate budget estimations, while Option C has higher rent due to prime campus proximity. Review utility add-ons for each stay.");
      } else if (question.includes('campus')) {
        setAiResponse("Option C is the closest to campus (— km), reducing daily commute time. Option A and B offer balanced distance with quieter surroundings.");
      } else if (question.includes('verify')) {
        setAiResponse("Options A and B have fully verified Trust Passports for owner identity and rental terms. Option C requires confirmation on electricity billing sub-meters.");
      } else if (question.includes('differences')) {
        setAiResponse("The primary differences lie in monthly rent, campus distance, and food availability. Option A emphasizes study environment, whereas Option B highlights community spaces.");
      } else {
        setAiResponse("I don't have enough verified information to calculate this accurately. Always review booking terms before confirming.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-950">
      
      {/* 1. HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200/80 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setSavedComparison(true);
              setTimeout(() => setSavedComparison(false), 3000);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-orange-200/80 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-all shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5 text-orange-600" />
            <span>{savedComparison ? 'Saved!' : 'Save Comparison'}</span>
          </button>
          <button
            onClick={() => alert("Comparison link copied to clipboard")}
            className="p-2.5 rounded-2xl bg-white border border-orange-200/80 text-zinc-700 hover:bg-orange-50 transition-all shadow-xs"
            title="Share Comparison"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">Compare your stays</h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-orange-100 text-orange-800">
            Decision Intelligence
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500">Understand the differences before you decide. Compare with clarity, choose with confidence.</p>
      </div>

      {/* 2. SELECTED STAYS (Horizontally scrollable cards) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Selected Stays ({selectedProperties.length}/3)</h3>
          <button 
            onClick={() => alert("Add stay functionality connects to explore search")}
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            + Add stay
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {selectedProperties.map((prop, idx) => (
            <div key={prop.id || idx} className="bg-white rounded-[24px] border border-orange-100/80 p-4 shadow-xs relative flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-200 shrink-0">
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {prop.matchPercentage} Match
                  </span>
                  <button 
                    onClick={() => handleRemoveProperty(prop.id)}
                    className="text-zinc-400 hover:text-red-500 p-1"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-bold text-xs text-zinc-900 truncate">{prop.name}</h4>
                <div className="text-[11px] text-zinc-500 truncate mb-1">{prop.location}</div>
                <div className="text-xs font-bold text-orange-600">{prop.rent}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs for Mobile/Desktop */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
        {[
          { id: 'overview', label: '📊 Overview & Summary' },
          { id: 'cost', label: '💰 True Living Cost' },
          { id: 'lifestyle', label: '🚶 Lifestyle & Commute' },
          { id: 'trust', label: '🛡️ Trust & Verification' },
          { id: 'insights', label: '✨ AI Insights' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. QUICK SUMMARY CARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Your comparison summary</h3>
            <p className="text-xs text-zinc-500 mb-6">Major decision factors across your selected properties. We never declare universal winners.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: '💰 Cost alignment', status: 'Fits your preference' },
                { label: '🎓 Campus proximity', status: 'Partially fits' },
                { label: '📚 Study environment', status: 'Fits your preference' },
                { label: '🛡️ Verification status', status: 'Verified' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100">
                  <div className="text-xs font-bold text-zinc-800 mb-1">{item.label}</div>
                  <div className="text-[11px] font-semibold text-orange-700 bg-orange-100/70 px-2 py-1 rounded-lg inline-block">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. SIDE-BY-SIDE COMPARISON TABLE */}
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs overflow-x-auto">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Side-by-Side Comparison</h3>
            <p className="text-xs text-zinc-500 mb-6">Detailed parameters verified by UniStay and estimated from market data.</p>

            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-orange-100 bg-[#FAF8F5]">
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider w-1/4">Category</th>
                  {selectedProperties.map((p, idx) => (
                    <th key={idx} className="p-4 text-sm font-bold text-zinc-900 w-1/4 border-l border-orange-100">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Monthly Rent</td>
                  {selectedProperties.map((p, idx) => (
                    <td key={idx} className="p-4 text-zinc-900 font-bold border-l border-zinc-100">
                      {p.rent} <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Estimated Living Cost</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-zinc-900 font-bold border-l border-zinc-100">
                      ₹— <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">≈ Estimated</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Security Deposit</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-zinc-800 border-l border-zinc-100">₹—</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Campus Distance</td>
                  {selectedProperties.map((p, idx) => (
                    <td key={idx} className="p-4 text-zinc-800 border-l border-zinc-100">{p.distance}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Food Convenience</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-zinc-800 border-l border-zinc-100">Available / Mess</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Wi-Fi & Internet</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-zinc-800 border-l border-zinc-100">High Speed (Verified)</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Study Environment</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-zinc-800 border-l border-zinc-100">Quiet Zone / Desk</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-700 bg-orange-50/40">Verification Status</td>
                  {selectedProperties.map((_, idx) => (
                    <td key={idx} className="p-4 text-emerald-700 font-semibold border-l border-zinc-100">✓ Trust Passport Active</td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* 5. LEGEND */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-6 text-xs text-zinc-600">
              <span className="font-bold text-zinc-900">Legend:</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">✓</span> Verified</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-700 font-bold">≈</span> Estimated</span>
              <span className="flex items-center gap-1.5"><span className="text-zinc-400 font-bold">?</span> Not available</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. TRUE LIVING COST COMPARISON */}
      {activeTab === 'cost' && (
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">What could each stay actually cost?</h3>
            <p className="text-xs text-zinc-500">Transparent comparison of recurring monthly financial commitments.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {selectedProperties.map((prop, idx) => (
              <div key={idx} className="bg-[#FAF8F5] rounded-2xl p-5 border border-orange-100">
                <h4 className="font-bold text-sm text-zinc-900 mb-4 pb-2 border-b border-orange-200">{prop.name}</h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between"><span className="text-zinc-500">Rent</span><span className="font-bold">₹— (Verified)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Food</span><span className="font-bold">₹— (Estimated)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Electricity</span><span className="font-bold">₹— (Estimated)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Transport</span><span className="font-bold">₹— (Estimated)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Laundry</span><span className="font-bold">₹— (Estimated)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Maintenance</span><span className="font-bold">₹— (Verified)</span></div>
                </div>
                <div className="mt-4 pt-3 border-t border-orange-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-800">Total Estimate</span>
                  <span className="text-base font-extrabold text-orange-600">₹—</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. LIFESTYLE COMPARISON */}
      {activeTab === 'lifestyle' && (
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Beyond the rent</h3>
            <p className="text-xs text-zinc-500">Evaluating daily routines, commute times, and study environments.</p>
          </div>

          <div className="space-y-4">
            {[
              { category: '🎓 Campus Access & Commute', desc: 'Walking distance vs. transit requirement' },
              { category: '📚 Study Environment', desc: 'Quiet zones, desks, and Wi-Fi reliability' },
              { category: '🍱 Food Convenience', desc: 'Mess availability, kitchen access, and nearby dining' },
              { category: '🔐 Privacy & Security', desc: 'Access control, CCTV, and room sharing policy' }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-xs text-zinc-900 mb-1">{item.category}</h4>
                <p className="text-[11px] text-zinc-500 mb-3">{item.desc}</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {selectedProperties.map((p, pIdx) => (
                    <div key={pIdx} className="bg-white p-3 rounded-xl border border-orange-100">
                      <span className="font-bold block text-zinc-900 mb-1">{p.name}</span>
                      <span className="text-orange-600 font-semibold">Matched to preferences</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. WHAT SHOULD I CHECK? & TRUST */}
      {activeTab === 'trust' && (
        <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Before you decide</h3>
            <p className="text-xs text-zinc-500">Smart checklist generated from missing or important property details.</p>
          </div>

          <div className="space-y-3">
            {[
              "Confirm electricity billing sub-meter rates with the owner",
              "Verify advance security deposit return conditions in agreement",
              "Confirm current room availability dates",
              "Check mess meal timings and weekend schedule",
              "Review cancellation and notice period terms"
            ].map((check, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800">□ {check}</span>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-lg">Recommended</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('property-details')}
              className="py-3 px-6 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Open Trust Passport</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 9 & 12. AI DECISION ASSISTANT & SUMMARY */}
      {activeTab === 'insights' && (
        <div className="space-y-8 animate-fade-in">
          {/* AI Decision Assistant */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-[28px] p-6 sm:p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ask UniStay ✨</h3>
                <p className="text-xs text-zinc-400">Want help understanding the trade-offs?</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Which fits my budget?",
                "Which is closer to campus?",
                "What should I verify?",
                "What are the biggest differences?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskAi(q)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-zinc-200 font-medium transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 mb-6 text-xs text-orange-100 leading-relaxed whitespace-pre-line">
              <div className="font-bold mb-2 text-orange-300">UniStay Trade-Off Analysis:</div>
              {aiResponse}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask about trade-offs, budget, or distance..."
                className="flex-grow px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => handleAskAi(aiPrompt)}
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                <span>{loading ? 'Analyzing...' : 'Ask AI'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">✨ Your UniStay Summary</h3>
            <p className="text-xs text-zinc-500 mb-6">Synthesized comparison across your selected properties.</p>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-orange-100">
                <div className="font-bold text-zinc-900 mb-1">What stands out</div>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>Option A offers balanced proximity to campus with moderate living costs.</li>
                  <li>Option B provides comprehensive verification and student reviews.</li>
                  <li>Option C minimizes travel time with prime location.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="font-bold text-amber-900 mb-1">What needs confirmation</div>
                <p className="text-amber-800">Electricity sub-metering terms and exact move-in dates should be confirmed directly with the property owner.</p>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-zinc-500 italic">
              "Compare with clarity. Choose with confidence."
            </div>
          </div>
        </div>
      )}

      {/* 13. STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 p-4 z-30 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => {
              setSavedComparison(true);
              setTimeout(() => setSavedComparison(false), 3000);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-bold hover:bg-orange-50 transition-colors shadow-xs"
          >
            <Bookmark className="w-4 h-4 text-orange-600" />
            <span>{savedComparison ? 'Saved!' : 'Save'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="py-3 px-5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors"
            >
              Continue Exploring
            </button>
            <button
              onClick={() => onNavigate('property-details')}
              className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md shadow-orange-500/20 flex items-center gap-2"
            >
              <span>View Selected Stay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
