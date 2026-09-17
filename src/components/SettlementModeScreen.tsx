import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowLeft, Sparkles, Home, Shield, MapPin, Users, ShoppingBag } from 'lucide-react';
import { ScreenType } from '../types';

interface SettlementModeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SettlementModeScreen: React.FC<SettlementModeScreenProps> = ({ onNavigate }) => {
  const [checklist, setChecklist] = useState([
    { id: '1', phase: 'BEFORE ARRIVAL', text: 'Accommodation booked & escrow confirmed', completed: true },
    { id: '2', phase: 'BEFORE ARRIVAL', text: 'Digital rental agreement accepted & signed', completed: true },
    { id: '3', phase: 'BEFORE ARRIVAL', text: 'Travel tickets & itinerary planned', completed: false },
    { id: '4', phase: 'BEFORE ARRIVAL', text: 'Important documents (Student ID, ID proofs) prepared', completed: false },
    { id: '5', phase: 'FIRST DAY', text: 'Complete room condition move-in inspection', completed: false },
    { id: '6', phase: 'FIRST DAY', text: 'Confirm Wi-Fi, electricity & utility connections', completed: false },
    { id: '7', phase: 'FIRST DAY', text: 'Save local emergency contacts & owner helpline', completed: false },
    { id: '8', phase: 'FIRST DAY', text: 'Locate campus quad & lecture halls', completed: false },
    { id: '9', phase: 'FIRST WEEK', text: 'Find nearby grocery store & supermarket', completed: false },
    { id: '10', phase: 'FIRST WEEK', text: 'Locate 24/7 pharmacy & healthcare clinic', completed: false },
    { id: '11', phase: 'FIRST WEEK', text: 'Understand public transport / metro route to campus', completed: false },
    { id: '12', phase: 'FIRST WEEK', text: 'Explore student food messes & cafes', completed: false },
    { id: '13', phase: 'FIRST WEEK', text: 'Join university community & clubs', completed: false }
  ]);

  const toggleTask = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

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

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-teal-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
            <Compass className="w-3.5 h-3.5" />
            New to this city? Settlement Mode
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Settle in, not just move in.</h1>
          <p className="text-sm sm:text-base text-teal-100 max-w-xl mb-6">
            Your step-by-step master checklist for before arrival, your first day, and your first week in the university city.
          </p>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-teal-100 font-semibold">Settlement Progress</span>
              <h2 className="text-lg font-bold">{completedCount} of {checklist.length} tasks completed ({progressPercent}%)</h2>
            </div>
            <div className="w-32 bg-white/20 h-3 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8">
        {(['BEFORE ARRIVAL', 'FIRST DAY', 'FIRST WEEK'] as const).map(phase => {
          const phaseTasks = checklist.filter(t => t.phase === phase);
          return (
            <div key={phase} className="bg-white rounded-[28px] p-6 sm:p-8 border border-teal-100 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                <h2 className="font-extrabold text-sm sm:text-base text-zinc-900 tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                  {phase}
                </h2>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  {phaseTasks.filter(t => t.completed).length} / {phaseTasks.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {phaseTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${task.completed ? 'bg-emerald-50/40 border-emerald-200 text-zinc-500' : 'bg-white border-zinc-200 hover:border-teal-300 text-zinc-900'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-zinc-300'}`}>
                      {task.completed && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-800'}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
