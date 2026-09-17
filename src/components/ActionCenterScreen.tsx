import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, Sparkles, Calendar, CheckCircle2, Clock, ChevronRight, ShieldCheck, FileText } from 'lucide-react';
import { ScreenType } from '../types';

interface ActionCenterScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenAgentWithPrompt?: (prompt: string) => void;
}

export const ActionCenterScreen: React.FC<ActionCenterScreenProps> = ({ onNavigate, onOpenAgentWithPrompt }) => {
  const [activeTab, setActiveTab] = useState<'needs_attention' | 'recommended' | 'upcoming' | 'completed'>('needs_attention');

  const actionsData = {
    needs_attention: [
      {
        id: '1',
        title: 'Monthly Rent Payment Due Soon',
        description: 'Rent of ₹9,500 for Scholar Haven Deluxe PG is scheduled for October 1, 2026.',
        badge: 'Critical',
        badgeColor: 'bg-red-100 text-red-700',
        actionLabel: 'Review & Pay Rent',
        actionType: 'pay_rent',
        prompt: 'Help me review my rent payment'
      },
      {
        id: '2',
        title: 'Rental Agreement Awaiting Acceptance',
        description: 'Your digital lease agreement for Scholar Haven has been drafted and requires your review.',
        badge: 'Important',
        badgeColor: 'bg-amber-100 text-amber-700',
        actionLabel: 'Review Agreement',
        actionType: 'view_agreement',
        prompt: 'Explain my rental agreement'
      },
      {
        id: '3',
        title: 'Move-in Checklist Incomplete',
        description: '2 items remain on your city settlement move-in list: Room condition inspection & Wi-Fi test.',
        badge: 'Important',
        badgeColor: 'bg-amber-100 text-amber-700',
        actionLabel: 'Complete Checklist',
        actionType: 'move_in',
        prompt: 'Show me my move-in checklist'
      }
    ],
    recommended: [
      {
        id: '4',
        title: 'Set Campus Commute Preference',
        description: 'You frequently view properties near University Main Campus. Set a 2 km limit to auto-filter results.',
        badge: 'AI Suggestion',
        badgeColor: 'bg-orange-100 text-orange-700',
        actionLabel: 'Apply Commute Filter',
        actionType: 'filter_commute',
        prompt: 'Help me set up campus commute filters'
      },
      {
        id: '5',
        title: 'Verified Student Service: Laundry Pickup',
        description: 'Save 3 hours a week with Campus Wash & Fold nearby your stay (₹499/mo).',
        badge: 'Service',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        actionLabel: 'Explore Services',
        actionType: 'student_services',
        prompt: 'Find laundry services near me'
      }
    ],
    upcoming: [
      {
        id: '6',
        title: 'University Club Orientation',
        description: 'Tech & Coding Society meet at Student Activity Center on Friday at 4:00 PM.',
        badge: 'Event',
        badgeColor: 'bg-blue-100 text-blue-700',
        actionLabel: 'View Event Details',
        actionType: 'events',
        prompt: 'Show campus events this week'
      },
      {
        id: '7',
        title: 'Quarterly Maintenance Inspection',
        description: 'Standard utility check scheduled for October 15, 2026.',
        badge: 'Maintenance',
        badgeColor: 'bg-zinc-100 text-zinc-700',
        actionLabel: 'View Maintenance',
        actionType: 'maintenance',
        prompt: 'Check maintenance status'
      }
    ],
    completed: [
      {
        id: '8',
        title: 'Scholar Haven Booking Confirmed',
        description: 'Room 204 secure reservation verified with escrow protection.',
        badge: 'Completed',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        actionLabel: 'View Booking',
        actionType: 'booking',
        prompt: 'Check my booking details'
      },
      {
        id: '9',
        title: 'Initial Trust Passport Verified',
        description: 'Owner background check and legal title verified by UniStay Trust Engine.',
        badge: 'Verified',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        actionLabel: 'View Trust Details',
        actionType: 'trust',
        prompt: 'Show trust verification'
      }
    ]
  };

  const currentList = actionsData[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">UniStay Action Center ✨</h1>
              <p className="text-xs text-zinc-400">Proactive intelligence, required tasks, and decision recommendations.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('copilot')}
            className="px-4 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-md"
          >
            Ask UniStay Agent
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[
          { id: 'needs_attention', label: 'Needs Attention', count: actionsData.needs_attention.length },
          { id: 'recommended', label: 'Recommended', count: actionsData.recommended.length },
          { id: 'upcoming', label: 'Upcoming', count: actionsData.upcoming.length },
          { id: 'completed', label: 'Completed', count: actionsData.completed.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-3 rounded-2xl text-left border transition-all ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider opacity-90">{tab.label}</div>
            <div className="text-lg font-black mt-1">{tab.count}</div>
          </button>
        ))}
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {currentList.map(item => (
          <div key={item.id} className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">{item.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
            
            <button
              onClick={() => {
                if (onOpenAgentWithPrompt) {
                  onOpenAgentWithPrompt(item.prompt);
                } else {
                  onNavigate('copilot');
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors shrink-0 shadow-xs"
            >
              <span>{item.actionLabel}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
