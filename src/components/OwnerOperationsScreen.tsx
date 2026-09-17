import React, { useState } from 'react';
import { 
  ArrowLeft, Building2, Users, DollarSign, Wrench, Shield, CheckCircle2, 
  Plus, ChevronRight, BarChart3, FileText, Settings, Sparkles 
} from 'lucide-react';
import { ScreenType, PropertyItem, RoomInventory } from '../types';

interface OwnerOperationsProps {
  onNavigate: (screen: ScreenType) => void;
  properties: PropertyItem[];
}

export const OwnerOperationsScreen: React.FC<OwnerOperationsProps> = ({ onNavigate, properties }) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'tenants' | 'earnings' | 'maintenance'>('rooms');

  const roomInventories: RoomInventory[] = [
    { id: 'RM-101', roomType: 'Private Room with Attached Bath', total: 10, available: 3, occupied: 7, pricePerMonth: 9500, description: 'Fully furnished with study desk & AC' },
    { id: 'RM-102', roomType: 'Shared Twin Room', total: 8, available: 2, occupied: 6, pricePerMonth: 6500, description: 'Budget-friendly dual sharing' },
    { id: 'RM-103', roomType: 'Deluxe Single Studio', total: 5, available: 1, occupied: 4, pricePerMonth: 12000, description: 'Spacious studio with private balcony' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('owner-dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-amber-200 text-zinc-700 text-xs font-semibold hover:bg-amber-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>Back to Owner Dashboard</span>
        </button>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-amber-600" />
          Owner Operations Center
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Property Lifecycle & Operations</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Manage room inventory, tenant occupancies, earnings payouts, and maintenance queues from one dashboard.</p>
      </div>

      {/* Operations Navigation Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'rooms', label: '🛏️ Room Inventory & Occupancy' },
          { id: 'tenants', label: '👥 Tenant Directory' },
          { id: 'earnings', label: '💰 Earnings & Payouts' },
          { id: 'maintenance', label: '🔧 Maintenance Queue' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap ${activeTab === tab.id ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-white text-zinc-700 border-amber-100 hover:bg-amber-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'rooms' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-zinc-900">Room Inventory Breakdown</h3>
            <button
              onClick={() => alert("Adding new room category...")}
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Room Type</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roomInventories.map((room) => (
              <div key={room.id} className="bg-white rounded-[28px] border border-amber-100 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {room.id}
                    </span>
                    <span className="text-xs font-extrabold text-amber-700">₹{room.pricePerMonth.toLocaleString()} / mo</span>
                  </div>

                  <h4 className="text-base font-bold text-zinc-900 mb-1">{room.roomType}</h4>
                  <p className="text-xs text-zinc-500 mb-4">{room.description}</p>

                  <div className="space-y-2 text-xs text-zinc-700 bg-[#FAF8F5] p-3.5 rounded-2xl border border-amber-100 mb-4">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Total Capacity:</span>
                      <span className="font-bold">{room.total} rooms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Occupied:</span>
                      <span className="font-bold text-emerald-700">{room.occupied} occupied</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Available:</span>
                      <span className="font-bold text-amber-700">{room.available} available</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Updating availability for ${room.roomType}`)}
                  className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-colors border border-amber-200"
                >
                  Manage Availability
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tenants' && (
        <div className="bg-white rounded-[28px] border border-amber-100 p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-lg text-zinc-900 mb-4">Active Tenants Directory</h3>
          <div className="space-y-3">
            {[
              { name: 'Rahul Kumar', room: 'Room 302', duration: '1 Semester', rentStatus: 'Paid (Nov)', agreement: 'Signed' },
              { name: 'Priya Sharma', room: 'Room 204', duration: 'Full Academic Year', rentStatus: 'Paid (Nov)', agreement: 'Signed' },
              { name: 'Amit Verma', room: 'Room 101', duration: '1 Semester', rentStatus: 'Pending', agreement: 'Signed' }
            ].map((tenant, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-zinc-900 text-sm block mb-0.5">{tenant.name}</span>
                  <span className="text-zinc-500">{tenant.room} · {tenant.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    {tenant.rentStatus}
                  </span>
                  <button onClick={() => alert("Viewing tenant lease details")} className="text-amber-700 font-bold hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-white rounded-[28px] border border-amber-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-zinc-900">Owner Payouts & Earnings</h3>
              <p className="text-xs text-zinc-500">Secure escrow payouts deposited directly to registered bank accounts.</p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              Next Payout: Oct 01
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Gross Monthly Rent</span>
              <span className="text-xl font-bold text-zinc-900">₹85,500</span>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Platform Service Fee (2%)</span>
              <span className="text-xl font-bold text-orange-600">- ₹1,710</span>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Net Payout Amount</span>
              <span className="text-xl font-bold text-emerald-700">₹83,790</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-[28px] border border-amber-100 p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-lg text-zinc-900 mb-4">Maintenance Management Queue</h3>
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-zinc-900 block mb-0.5">Ticket #MT-104 · Room 302 (Plumbing)</span>
              <p className="text-zinc-500">Bathroom sink faucet leaking slightly during mornings.</p>
            </div>
            <button
              onClick={() => alert("Marking ticket as Resolved")}
              className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Mark Resolved
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
