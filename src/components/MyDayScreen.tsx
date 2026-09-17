import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2, BookOpen, Dumbbell, Briefcase, Sparkles, ArrowLeft } from 'lucide-react';
import { ScreenType } from '../types';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: 'Class' | 'Study' | 'Gym' | 'Work' | 'Events' | 'Appointments' | 'Other';
  location: string;
  completed: boolean;
}

interface MyDayScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const MyDayScreen: React.FC<MyDayScreenProps> = ({ onNavigate }) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: '1', time: '08:00 AM', title: 'Leave Accommodation & Commute', category: 'Other', location: 'To Campus', completed: true },
    { id: '2', time: '09:00 AM', title: 'Data Structures & Algorithms Lecture', category: 'Class', location: 'Tech Block Room 302', completed: true },
    { id: '3', time: '01:00 PM', title: 'Campus Cafeteria Lunch with Study Group', category: 'Events', location: 'North Quad', completed: false },
    { id: '4', time: '03:00 PM', title: 'Library Study & Research', category: 'Study', location: 'University Library 2nd Floor', completed: false },
    { id: '5', time: '05:30 PM', title: 'Fitness Workout', category: 'Gym', location: 'Campus Fitness Center', completed: false },
    { id: '6', time: '08:00 PM', title: 'Return & Dinner at Accommodation', category: 'Other', location: 'Scholar Haven', completed: false }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Class' | 'Study' | 'Gym' | 'Work' | 'Events' | 'Appointments' | 'Other'>('Class');
  const [newLocation, setNewLocation] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: newTime,
      title: newTitle,
      category: newCategory,
      location: newLocation || 'Campus',
      completed: false
    };
    setSchedule([...schedule, newItem]);
    setNewTitle('');
    setNewLocation('');
    setIsModalOpen(false);
  };

  const toggleComplete = (id: string) => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-orange-600 px-4 py-2.5 rounded-2xl shadow-md hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-orange-100 shadow-xs mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">My Day & Timeline</h1>
            <p className="text-xs text-zinc-500">Your personalized schedule for today. The system does not invent your routine.</p>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div 
            key={item.id}
            className={`bg-white rounded-[24px] p-5 border transition-all flex items-center justify-between gap-4 shadow-xs ${item.completed ? 'border-emerald-200 bg-emerald-50/30 opacity-75' : 'border-zinc-200 hover:border-orange-300'}`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleComplete(item.id)}
                className={`w-6 h-6 rounded-full mt-0.5 flex items-center justify-center border transition-colors ${item.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-zinc-300 hover:border-orange-500'}`}
              >
                {item.completed && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                    {item.time}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <h3 className={`font-bold text-sm sm:text-base ${item.completed ? 'line-through text-zinc-400' : 'text-zinc-900'}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">📍 {item.location}</p>
              </div>
            </div>

            <span className="text-xs text-zinc-400 font-medium">#{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Add Activity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Add Activity to My Day</h3>
            <p className="text-xs text-zinc-500 mb-6">Manually record your class, study session, gym routine, or appointment.</p>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Time (e.g. 02:00 PM)</label>
                <input
                  type="text"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Physics Lab & Experiments"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                >
                  <option value="Class">Class</option>
                  <option value="Study">Study</option>
                  <option value="Gym">Gym</option>
                  <option value="Work">Work</option>
                  <option value="Events">Events</option>
                  <option value="Appointments">Appointments</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Science Block Room 104"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-colors"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
