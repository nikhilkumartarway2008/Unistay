import React, { useState } from 'react';
import { Sparkles, Send, ArrowLeft, Bot, User, CheckCircle2, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { ScreenType } from '../types';
import { AgentConfirmationModal } from './AgentConfirmationModal';

interface CopilotScreenProps {
  onNavigate: (screen: ScreenType) => void;
  initialPrompt?: string;
}

interface Message {
  sender: 'user' | 'agent';
  text: string;
  time: string;
  isPlan?: boolean;
  planSteps?: { id: string; title: string; approved: boolean }[];
  requiresConfirmation?: boolean;
  confirmationDetails?: { title: string; description: string; impactLevel: 'Low' | 'Medium' | 'High'; details: { label: string; value: string }[] };
}

export const CopilotScreen: React.FC<CopilotScreenProps> = ({ onNavigate, initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: "Hello! I am your UniStay Agent ✨. I understand your authorized context (booking, rent, maintenance, city settlement). How can I assist you today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    impactLevel: 'Low' | 'Medium' | 'High';
    previewDetails: { label: string; value: string }[];
    onConfirm: () => void;
  } | null>(null);

  const handleSend = (e: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryText = customQuery || input;
    if (!queryText.trim()) return;

    const userMsg: Message = { sender: 'user', text: queryText, time: 'Just now' };
    const query = queryText.toLowerCase();
    setInput('');

    let replyText = "I have checked your authorized UniStay data. Everything is operating smoothly.";
    let isPlan = false;
    let planSteps: { id: string; title: string; approved: boolean }[] = [];
    let requiresConfirmation = false;
    let confirmationDetails = undefined;

    if (query.includes('move') || query.includes('prepare') || query.includes('settle')) {
      isPlan = true;
      replyText = "Here is your customized Move-In & Settlement Plan based on your October 1 booking at Scholar Haven:";
      planSteps = [
        { id: '1', title: 'Review and electronically sign lease agreement', approved: true },
        { id: '2', title: 'Complete advance rent & security deposit escrow payment (₹19,000)', approved: false },
        { id: '3', title: 'Schedule room condition move-in inspection', approved: false },
        { id: '4', title: 'Save campus walking route (0.4 km to University Gate 2)', approved: true },
        { id: '5', title: 'Connect with verified laundry provider (Campus Wash & Fold)', approved: false }
      ];
    } else if (query.includes('pay') || query.includes('rent')) {
      requiresConfirmation = true;
      replyText = "You are about to initiate your monthly rent payment of ₹9,500 for Scholar Haven Deluxe PG.";
      confirmationDetails = {
        title: 'Confirm Monthly Rent Payment',
        description: 'This transaction will be secured through UniStay Escrow and released to the verified property owner upon your move-in confirmation.',
        impactLevel: 'High' as const,
        details: [
          { label: 'Property', value: 'Scholar Haven Deluxe PG (Room 204)' },
          { label: 'Amount', value: '₹9,500' },
          { label: 'Payment Method', value: 'UPI / Secure Escrow' },
          { label: 'Due Date', value: 'October 1, 2026' }
        ]
      };
    } else if (query.includes('today') || query.includes('schedule')) {
      replyText = "Today's Briefing: You have Data Structures lecture at 9:00 AM, lunch at 1:00 PM, and library study at 3:00 PM. 2 tasks remain due this week.";
    } else if (query.includes('wifi') || query.includes('maintenance')) {
      replyText = "I can create a maintenance request for you instantly. Would you like me to submit a ticket for Wi-Fi or electrical inspection?";
    } else if (query.includes('compare') || query.includes('options')) {
      replyText = "Comparing your saved options: Scholar Haven (₹9,500, 0.4 km) offers highest study score (4.8/5) and verified escrow protection.";
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          sender: 'agent',
          text: replyText,
          time: 'Just now',
          isPlan,
          planSteps,
          requiresConfirmation,
          confirmationDetails
        }
      ]);
    }, 600);
  };

  const handleConfirmAction = (details: any) => {
    setModalState(null);
    setMessages(prev => [
      ...prev,
      {
        sender: 'agent',
        text: `✅ Action confirmed and successfully executed by UniStay Agent. Transaction receipt generated.`,
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900 flex flex-col justify-between">
      
      <div>
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">UniStay Agent ✨</h1>
              <p className="text-xs text-zinc-400">Autonomous planning, predictive intelligence, and secure action execution.</p>
            </div>
          </div>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {[
            "Help me prepare for moving next week",
            "Pay my rent (₹9,500)",
            "What's happening today?",
            "Compare my saved options",
            "Report Wi-Fi issue"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={(e) => handleSend(any => {}, prompt)}
              className="px-4 py-2 rounded-2xl bg-white text-zinc-700 text-xs font-bold border border-zinc-200 shrink-0 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-xs space-y-6 mb-6 min-h-[350px] max-h-[500px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-amber-400'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-lg p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-[#FAF8F5] text-zinc-800 border border-zinc-200 rounded-tl-none w-full'}`}>
                <p>{msg.text}</p>

                {/* Plan Mode steps */}
                {msg.isPlan && msg.planSteps && (
                  <div className="mt-4 space-y-2.5">
                    {msg.planSteps.map(step => (
                      <div key={step.id} className="bg-white p-3 rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step.approved ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                            {step.approved ? '✓' : '•'}
                          </div>
                          <span className="font-bold text-zinc-900">{step.title}</span>
                        </div>
                        <button
                          onClick={() => {
                            step.approved = !step.approved;
                            setMessages([...messages]);
                          }}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold ${step.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-600 text-white'}`}
                        >
                          {step.approved ? 'Approved' : 'Approve Step'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confirmation Action Card */}
                {msg.requiresConfirmation && msg.confirmationDetails && (
                  <div className="mt-4 bg-white p-4 rounded-xl border border-orange-200 space-y-3">
                    <div className="text-xs font-extrabold text-zinc-900">{msg.confirmationDetails.title}</div>
                    <p className="text-xs text-zinc-600">{msg.confirmationDetails.description}</p>
                    <button
                      onClick={() => setModalState({
                        isOpen: true,
                        title: msg.confirmationDetails!.title,
                        description: msg.confirmationDetails!.description,
                        impactLevel: msg.confirmationDetails!.impactLevel,
                        previewDetails: msg.confirmationDetails!.details,
                        onConfirm: () => handleConfirmAction(msg.confirmationDetails)
                      })}
                      className="w-full py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
                    >
                      Review & Confirm Action
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => handleSend(e, input)} className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-lg flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask UniStay Agent anything about your stay, budget, move-in, or city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 text-xs sm:text-sm outline-none bg-transparent text-zinc-900"
        />
        <button
          type="submit"
          className="p-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Confirmation Modal */}
      {modalState && (
        <AgentConfirmationModal
          isOpen={modalState.isOpen}
          title={modalState.title}
          description={modalState.description}
          impactLevel={modalState.impactLevel}
          previewDetails={modalState.previewDetails}
          onConfirm={modalState.onConfirm}
          onCancel={() => setModalState(null)}
        />
      )}

    </div>
  );
};
