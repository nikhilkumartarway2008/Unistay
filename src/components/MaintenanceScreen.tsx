import React, { useState } from 'react';
import { ArrowLeft, Wrench, Plus, CheckCircle2, AlertCircle, Clock, Send, Shield } from 'lucide-react';
import { ScreenType, MaintenanceRecord } from '../types';

interface MaintenanceScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<'Electricity' | 'Water' | 'Wi-Fi' | 'Plumbing' | 'Furniture' | 'Cleaning' | 'Appliance' | 'Other'>('Plumbing');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Emergency'>('Medium');
  const [description, setDescription] = useState('');

  const [tickets, setTickets] = useState<MaintenanceRecord[]>([
    {
      id: 'MT-104',
      propertyId: 'prop-1',
      propertyName: 'Scholar Haven Deluxe PG',
      roomNumber: 'Room 302',
      category: 'Plumbing',
      description: 'Bathroom sink faucet leaking slightly during mornings.',
      priority: 'Medium',
      status: 'In Progress',
      reportedTime: 'Yesterday, 4:30 PM',
      studentName: 'You'
    },
    {
      id: 'MT-101',
      propertyId: 'prop-1',
      propertyName: 'Scholar Haven Deluxe PG',
      roomNumber: 'Room 302',
      category: 'Wi-Fi',
      description: 'Study floor router signal intermittent during peak hours.',
      priority: 'Low',
      status: 'Resolved',
      reportedTime: '3 days ago',
      studentName: 'You'
    }
  ]);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please enter a description of the issue.");
      return;
    }

    const newTicket: MaintenanceRecord = {
      id: `MT-${Math.floor(100 + Math.random() * 900)}`,
      propertyId: 'prop-1',
      propertyName: 'Scholar Haven Deluxe PG',
      roomNumber: 'Room 302',
      category,
      description,
      priority,
      status: 'Submitted',
      reportedTime: 'Just now',
      studentName: 'You'
    };

    setTickets([newTicket, ...tickets]);
    setDescription('');
    setModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('my-stay')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to My Stay</span>
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Ticket</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Maintenance & Support Center</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Report plumbing, electrical, Wi-Fi, or furnishing issues and track resolution status in real-time.</p>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-[28px] border border-orange-100/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
                  {ticket.category}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                  ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400">{ticket.reportedTime}</span>
            </div>

            <h3 className="text-base font-bold text-zinc-900 mb-1">Ticket #{ticket.id} · {ticket.roomNumber}</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">{ticket.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-xs text-zinc-500">
              <span className="font-semibold text-zinc-700">Priority: <span className="text-orange-600">{ticket.priority}</span></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Owner Notified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Raise Ticket Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-fade-in border border-orange-100">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Report Maintenance Issue</h3>
            <p className="text-xs text-zinc-500 mb-6">Provide details so the property management team can dispatch support quickly.</p>

            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Wi-Fi">Wi-Fi</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Appliance">Appliance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Priority:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Issue Description:</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue clearly (e.g. kitchen geyser not heating)..."
                  className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-zinc-100 text-zinc-700 font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
