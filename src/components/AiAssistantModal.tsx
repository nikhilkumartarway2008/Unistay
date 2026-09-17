import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, Shield, Building2 } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [userRole, setUserRole] = useState<'STUDENT' | 'OWNER' | 'ADMIN'>('STUDENT');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am UniStay Student AI ✨. How can I help you find, verify, or compare student accommodation today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('unistay_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.role) {
          setUserRole(u.role);
          if (u.role === 'OWNER') {
            setMessages([
              {
                role: 'assistant',
                text: 'Hello! I am UniStay Owner AI 🏢. How can I help you track rooms, manage availability, review enquiries, or optimize your property operations today?'
              }
            ]);
          } else if (u.role === 'ADMIN') {
            setMessages([
              {
                role: 'assistant',
                text: 'Hello! I am UniStay Admin AI 🛡️. Ready to assist with verification queues, platform metrics, and system operations.'
              }
            ]);
          }
        }
      }
    } catch (e) {}
  }, [isOpen]);

  const suggestionChips = userRole === 'OWNER' ? [
    'Show vacant rooms & occupancy',
    'Which properties need verification?',
    'Show pending bookings & enquiries',
    'Update property rent or availability',
    'Show maintenance requests'
  ] : userRole === 'ADMIN' ? [
    'Show platform verification queue',
    'Review pending property listings',
    'Check system health & audit logs',
    'View platform analytics'
  ] : [
    'Find a PG near my university.',
    'Compare these properties.',
    'What will my monthly cost be?',
    'What should I check before booking?',
    'Find something suitable for my lifestyle.'
  ];

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text: promptText }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('unistay_token') || '';
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ prompt: promptText, context: `UniStay role-based ${userRole} intelligence` })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', text: data.reply || 'UniStay AI is here to assist you.' }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, I encountered an error connecting to UniStay AI. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[650px] shadow-2xl flex flex-col overflow-hidden border border-orange-100">
        {/* Header */}
        <div className={`p-4 sm:p-5 text-white flex items-center justify-between ${userRole === 'OWNER' ? 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-orange-900' : userRole === 'ADMIN' ? 'bg-gradient-to-r from-slate-900 via-zinc-900 to-zinc-800' : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              {userRole === 'OWNER' ? <Building2 className="w-5 h-5 text-orange-400 animate-pulse" /> : userRole === 'ADMIN' ? <Shield className="w-5 h-5 text-amber-400 animate-pulse" /> : <Sparkles className="w-5 h-5 text-white animate-pulse" />}
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                {userRole === 'OWNER' ? 'UniStay Owner AI 🏢' : userRole === 'ADMIN' ? 'UniStay Admin AI 🛡️' : 'UniStay Student AI ✨'} 
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">{userRole} Workspace</span>
              </h3>
              <p className="text-xs text-orange-100">
                {userRole === 'OWNER' ? 'AI Property Operations Manager' : userRole === 'ADMIN' ? 'Platform Operations Assistant' : 'Personal Student Living Advisor'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-[#FAF8F5] border-b border-orange-100 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 text-zinc-700 text-xs font-medium border border-orange-200/80 whitespace-nowrap shadow-xs transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-zinc-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-orange-500 text-white' : 'bg-gradient-to-tr from-zinc-900 to-zinc-800 text-orange-400'}`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-zinc-800 border border-orange-100 shadow-xs rounded-tl-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-zinc-900 text-orange-400 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-3xl text-xs text-zinc-500 border border-orange-100 shadow-xs">
                UniStay AI is processing authorized data...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-orange-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={userRole === 'OWNER' ? 'Ask about rooms, occupancy, maintenance, or pricing...' : userRole === 'ADMIN' ? 'Ask about verification queue or system health...' : 'Ask anything about student stays, costs, or lifestyle...'}
              className="flex-grow px-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-orange-200 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
