import React, { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle2, Shield, Calendar, CreditCard, Wrench, MessageSquare, Check } from 'lucide-react';
import { ScreenType, NotificationRecord } from '../types';

interface NotificationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([
    {
      id: 'notif-1',
      title: 'Booking Confirmed!',
      message: 'Your stay at Scholar Haven Deluxe PG has been confirmed. View move-in checklist in My Stay.',
      category: 'Booking',
      time: '10 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Payment Receipt Generated',
      message: 'Security deposit and advance rent payment of ₹19,499 was successfully processed via secure escrow.',
      category: 'Payment',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Maintenance Update',
      message: 'Your maintenance ticket #MT-104 for plumbing has been marked as In Progress by the owner.',
      category: 'Maintenance',
      time: 'Yesterday',
      read: true
    },
    {
      id: 'notif-4',
      title: 'Digital Lease Accepted',
      message: 'Rental agreement rules, rent terms, and notice period successfully signed.',
      category: 'Agreement',
      time: '2 days ago',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs transition-colors border border-orange-200"
        >
          Mark all as read
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Notification Center</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Real-time updates regarding bookings, payments, lease agreements, and maintenance tickets.</p>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`bg-white rounded-[24px] border p-5 shadow-xs flex items-start gap-4 transition-all ${notif.read ? 'border-orange-100 opacity-80' : 'border-orange-300 ring-1 ring-orange-500/20 bg-orange-50/10'}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              notif.category === 'Booking' ? 'bg-orange-100 text-orange-700' :
              notif.category === 'Payment' ? 'bg-emerald-100 text-emerald-700' :
              notif.category === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {notif.category === 'Booking' && <Calendar className="w-5 h-5" />}
              {notif.category === 'Payment' && <CreditCard className="w-5 h-5" />}
              {notif.category === 'Maintenance' && <Wrench className="w-5 h-5" />}
              {notif.category === 'Agreement' && <Shield className="w-5 h-5" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-zinc-900">{notif.title}</span>
                <span className="text-[11px] text-zinc-400">{notif.time}</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
