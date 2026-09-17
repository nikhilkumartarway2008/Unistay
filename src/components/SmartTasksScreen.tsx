import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Plus, Filter, Calendar, Sparkles, AlertCircle } from 'lucide-react';
import { ScreenType, SmartTask } from '../types';

interface SmartTasksScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SmartTasksScreen: React.FC<SmartTasksScreenProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<SmartTask[]>([
    {
      id: '1',
      userId: 'user_1',
      source: 'Agreement',
      title: 'Review Rental Agreement & Sign Lease',
      description: 'Review Scholar Haven lease terms including 11-month lock-in and notice period.',
      priority: 'High',
      status: 'To do',
      dueAt: 'Oct 01, 2026',
      createdAt: '2026-09-15'
    },
    {
      id: '2',
      userId: 'user_1',
      source: 'Move-in',
      title: 'Complete Room Condition Move-in Inspection',
      description: 'Take photos of walls, fixtures, and test AC & Wi-Fi upon arrival.',
      priority: 'High',
      status: 'To do',
      dueAt: 'Oct 01, 2026',
      createdAt: '2026-09-15'
    },
    {
      id: '3',
      userId: 'user_1',
      source: 'Rent',
      title: 'Pay Security Deposit & First Month Rent',
      description: '₹9,500 rent + ₹9,500 deposit secured via escrow.',
      priority: 'Critical',
      status: 'To do',
      dueAt: 'Sep 25, 2026',
      createdAt: '2026-09-14'
    },
    {
      id: '4',
      userId: 'user_1',
      source: 'University',
      title: 'Pick up University ID & Transit Pass',
      description: 'Visit administration block with admission confirmation letter.',
      priority: 'Medium',
      status: 'In progress',
      dueAt: 'Sep 28, 2026',
      createdAt: '2026-09-12'
    },
    {
      id: '5',
      userId: 'user_1',
      source: 'Booking',
      title: 'Confirm Room 204 Reservation',
      description: 'Scholar Haven Deluxe PG booking requested.',
      priority: 'High',
      status: 'Completed',
      dueAt: 'Sep 15, 2026',
      createdAt: '2026-09-10'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSource, setFilterSource] = useState<string>('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [newDueAt, setNewDueAt] = useState('Oct 05, 2026');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: SmartTask = {
      id: Date.now().toString(),
      userId: 'user_1',
      source: 'User',
      title: newTitle,
      description: newDescription || 'Student-created task',
      priority: newPriority,
      status: 'To do',
      dueAt: newDueAt,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setIsAdding(false);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'To do' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const filteredTasks = tasks.filter(t => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (filterSource !== 'All' && t.source !== filterSource) return false;
    return true;
  });

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
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-[32px] p-6 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Personal Task Engine ✨</h1>
            <p className="text-xs text-zinc-400">Smart tasks generated from bookings, agreements, rent, and your daily schedule.</p>
          </div>
        </div>
      </div>

      {/* Add Task Form Modal / Expansion */}
      {isAdding && (
        <form onSubmit={handleAddTask} className="bg-white rounded-[28px] p-6 border border-zinc-200 shadow-lg mb-6 space-y-4 animate-fade-in">
          <h3 className="text-sm font-extrabold text-zinc-900">Create New Student Task</h3>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Task Title</label>
            <input
              type="text"
              placeholder="e.g. Buy study desk lamp"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Description</label>
            <input
              type="text"
              placeholder="Optional details or location"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Due Date</label>
              <input
                type="text"
                value={newDueAt}
                onChange={(e) => setNewDueAt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md hover:bg-orange-700"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
          <Filter className="w-4 h-4 text-orange-600" />
          <span>Status:</span>
        </div>
        {['All', 'To do', 'In progress', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === status
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {status}
          </button>
        ))}

        <div className="h-4 w-[1px] bg-zinc-200 mx-2 hidden sm:block" />

        <div className="text-xs font-bold text-zinc-600">Source:</div>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold outline-none bg-white text-zinc-700"
        >
          <option value="All">All Sources</option>
          <option value="Booking">Booking</option>
          <option value="Move-in">Move-in</option>
          <option value="Agreement">Agreement</option>
          <option value="Rent">Rent</option>
          <option value="University">University</option>
          <option value="User">Custom User</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-[28px] p-8 text-center border border-zinc-200 text-zinc-500 text-xs font-bold">
            No tasks found matching the filter.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTaskStatus(task.id)}
              className={`bg-white rounded-[24px] p-5 border transition-all cursor-pointer flex items-start gap-4 shadow-xs ${
                task.status === 'Completed' ? 'border-emerald-200 bg-emerald-50/20 opacity-75' : 'border-zinc-200 hover:border-orange-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                task.status === 'Completed'
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-zinc-300 bg-white text-transparent'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700">
                      {task.source}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      task.priority === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {task.dueAt}</span>
                  </div>
                </div>
                <h4 className={`text-sm sm:text-base font-extrabold ${task.status === 'Completed' ? 'line-through text-zinc-500' : 'text-zinc-900'}`}>
                  {task.title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{task.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
