import React, { useState } from 'react';
import { GraduationCap, Calendar, Users, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface CampusIntelligenceScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CampusIntelligenceScreen: React.FC<CampusIntelligenceScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'clubs'>('events');

  const eventsList = [
    { id: '1', title: 'Annual Tech Hackathon 2026', date: 'Oct 15, 2026', category: 'Hackathon', organizer: 'Dept of Computer Science', location: 'Main Auditorium', attendees: 240 },
    { id: '2', title: 'Cultural Music Fest Auditions', date: 'Oct 18, 2026', category: 'Cultural', organizer: 'Student Arts Club', location: 'Open Air Theatre', attendees: 120 },
    { id: '3', title: 'AI & Future of Work Seminar', date: 'Oct 22, 2026', category: 'Seminar', organizer: 'Innovation Cell', location: 'Lecture Hall 4', attendees: 95 },
    { id: '4', title: 'Inter-College Basketball Championship', date: 'Oct 25, 2026', category: 'Sports', organizer: 'Sports Council', location: 'University Sports Complex', attendees: 300 }
  ];

  const clubsList = [
    { id: '1', name: 'Coders & Hackers Club', category: 'Technical', members: 450, description: 'Building open-source apps, AI models, and weekly coding workshops.' },
    { id: '2', name: 'University Symphony & Music', category: 'Music & Arts', members: 180, description: 'Jam sessions, acoustic nights, and annual concert performances.' },
    { id: '3', name: 'Entrepreneurship & Startup Cell', category: 'Business', members: 320, description: 'Pitch decks, founder meetups, and angel investor mentoring.' },
    { id: '4', name: 'Adventurers & Trekking Society', category: 'Sports & Outdoors', members: 210, description: 'Weekend nature treks, mountaineering camps, and cycling expeditions.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-blue-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
            <GraduationCap className="w-3.5 h-3.5" />
            Campus Intelligence & Community
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Connect with your university ecosystem.</h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl">
            Official university events, technical & cultural clubs, hackathons, seminars, and student societies.
          </p>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'events' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>University Events ({eventsList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'clubs' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
        >
          <Users className="w-4 h-4" />
          <span>Clubs & Societies ({clubsList.length})</span>
        </button>
      </div>

      {/* Events View */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {eventsList.map(ev => (
            <div key={ev.id} className="bg-white rounded-[28px] p-6 border border-blue-100 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {ev.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-500">{ev.date}</span>
                </div>

                <h3 className="font-bold text-base text-zinc-900 mb-1">{ev.title}</h3>
                <p className="text-xs text-zinc-500 mb-4">Organized by {ev.organizer} · 📍 {ev.location}</p>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-blue-100 text-xs flex justify-between items-center mb-4">
                  <span className="text-zinc-600 font-medium">Interested Students:</span>
                  <span className="font-bold text-blue-700">{ev.attendees} attending</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600">Verified Event</span>
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                  Interested / RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clubs View */}
      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clubsList.map(club => (
            <div key={club.id} className="bg-white rounded-[28px] p-6 border border-blue-100 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    {club.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-500">{club.members} members</span>
                </div>

                <h3 className="font-bold text-base text-zinc-900 mb-2">{club.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">{club.description}</p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600">Active Society</span>
                <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-colors">
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
