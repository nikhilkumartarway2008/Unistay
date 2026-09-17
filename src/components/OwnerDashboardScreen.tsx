import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, DollarSign, Shield, Plus, Sparkles, 
  ArrowRight, CheckCircle2, AlertCircle, Clock, ChevronRight, FileText, BarChart3, Settings, MessageSquare
} from 'lucide-react';
import { ScreenType, UserRole, PropertyItem } from '../types';

interface OwnerDashboardProps {
  onNavigate: (screen: ScreenType) => void;
  properties: PropertyItem[];
  onDeleteProperty: (id: string) => void;
  onUpdateProperty: (property: PropertyItem) => void;
  enquiries: any[];
}

export const OwnerDashboardScreen: React.FC<OwnerDashboardProps> = ({ onNavigate, properties, onDeleteProperty, onUpdateProperty, enquiries }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'enquiries' | 'bookings' | 'trust' | 'earnings'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-950">
      
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-8 rounded-[28px] border border-orange-100/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-100 text-amber-800">
              🏠 Owner Portal
            </span>
            <span className="text-xs font-medium text-zinc-500">Verified Partner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Welcome back 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage your properties, review student enquiries, and track your occupancy.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigate('owner-feedback')}
            className="px-4 py-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs transition-colors flex items-center gap-2 border border-orange-200"
          >
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <span>Student Feedback & Q&A</span>
          </button>
          <button
            onClick={() => onNavigate('owner-ai')}
            className="px-4 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition-colors flex items-center gap-2 border border-amber-200"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Owner AI Intelligence</span>
          </button>
          <button
            onClick={() => onNavigate('owner-add-property')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* Owner Navigation Sub-Bar */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
        {[
          { id: 'overview', label: '📊 Dashboard Overview' },
          { id: 'properties', label: '🏢 My Properties' },
          { id: 'enquiries', label: '📥 Student Enquiries' },
          { id: 'bookings', label: '📅 Bookings' },
          { id: 'trust', label: '🛡️ Trust Center' },
          { id: 'earnings', label: '💰 Earnings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active Properties</span>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-1">2</div>
              <div className="text-[11px] text-emerald-600 font-semibold">✓ Fully Verified</div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Student Enquiries</span>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-1">14</div>
              <div className="text-[11px] text-orange-600 font-semibold">3 pending response</div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Occupancy Rate</span>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-1">88%</div>
              <div className="text-[11px] text-emerald-600 font-semibold">+6% vs last term</div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Earnings</span>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-1">₹1,42,000</div>
              <div className="text-[11px] text-zinc-500 font-medium">Demo simulated data</div>
            </div>
          </div>

          {/* AI Owner Insights Card */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-[28px] p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">✨ Owner AI Intelligence</h3>
                <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                  Your listing for <span className="text-orange-300 font-semibold">Alpha Student Residence</span> has received 42 views this week. Students are frequently asking about high-speed Wi-Fi and study desk availability.
                </p>
              </div>
            </div>
            <button
              onClick={() => alert("Owner AI Assistant triggered: Generating optimization recommendations.")}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              Optimize Listing
            </button>
          </div>

          {/* Properties Quick Overview */}
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Your Properties</h3>
                <p className="text-xs text-zinc-500">Manage rooms, pricing, and verification status.</p>
              </div>
              <button
                onClick={() => setActiveTab('properties')}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.length === 0 ? (
                <p className="text-xs text-zinc-500 col-span-2">No properties added yet. Click 'Add New Property' above to publish your first listing.</p>
              ) : (
                properties.map((p) => (
                  <div key={p.id} className="bg-[#FAF8F5] rounded-2xl p-5 border border-orange-100 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">✓ Verified</span>
                        <span className="text-[10px] text-zinc-500 font-medium">{p.category}</span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900">{p.name}</h4>
                      <div className="text-xs text-zinc-500">{p.location} · <span className="font-bold text-orange-600">{p.rent}</span></div>
                    </div>
                    <button
                      onClick={() => setActiveTab('properties')}
                      className="p-2.5 rounded-xl bg-white border border-orange-200 text-zinc-700 hover:bg-orange-50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* PROPERTIES TAB */}
      {activeTab === 'properties' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Property Management</h3>
                <p className="text-xs text-zinc-500">Update availability, room capacity, and pricing.</p>
              </div>
              <button
                onClick={() => onNavigate('owner-add-property')}
                className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
              >
                + Add Property
              </button>
            </div>

            <div className="space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-orange-300 mx-auto mb-3" />
                  <h4 className="font-bold text-sm text-zinc-900 mb-1">No properties listed yet</h4>
                  <p className="text-xs text-zinc-500 mb-4">Add your first accommodation to start receiving student matches and bookings.</p>
                  <button
                    onClick={() => onNavigate('owner-add-property')}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
                  >
                    Add Property Now
                  </button>
                </div>
              ) : (
                properties.map((prop) => (
                  <div key={prop.id} className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">✓ Trust Passport Verified</span>
                        <span className="text-[10px] text-zinc-500">{prop.category}</span>
                      </div>
                      <h4 className="font-bold base text-zinc-900">{prop.name}</h4>
                      <p className="text-xs text-zinc-500">{prop.location} · Rent: <strong className="text-orange-600">{prop.rent}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newRent = prompt("Enter updated monthly rent (e.g. ₹15,000 / mo):", prop.rent);
                          if (newRent) {
                            onUpdateProperty({ ...prop, rent: newRent });
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-bold hover:bg-orange-50"
                      >
                        Edit Pricing
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${prop.name}?`)) {
                            onDeleteProperty(prop.id);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Student Enquiries</h3>
            <p className="text-xs text-zinc-500 mb-6">Review student requirements, budgets, and schedule property visits.</p>

            <div className="space-y-4">
              {[
                { student: 'Verified Student A', university: 'State University', budget: '₹15,000 / mo', pref: 'Single Room · Vegetarian Mess', date: '2 hours ago' },
                { student: 'Verified Student B', university: 'Institute of Tech', budget: '₹18,000 / mo', pref: 'Shared Flat · High-Speed Wi-Fi', date: 'Yesterday' }
              ].map((enq, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded inline-block">{enq.date}</div>
                    <h4 className="font-bold text-sm text-zinc-900">{enq.student} ({enq.university})</h4>
                    <p className="text-xs text-zinc-600">Budget: <strong className="text-zinc-900">{enq.budget}</strong> · {enq.pref}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => alert("Opening secure chat with student")}
                      className="px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-bold hover:bg-orange-50"
                    >
                      Message
                    </button>
                    <button 
                      onClick={() => alert("Schedule visit confirmed")}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600"
                    >
                      Schedule Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Booking Requests</h3>
            <p className="text-xs text-zinc-500 mb-6">Review and confirm student digital booking agreements.</p>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready for Approval</span>
                <h4 className="font-bold text-sm text-zinc-900 mt-1">Single Room at Alpha Student Residence</h4>
                <p className="text-xs text-zinc-500">Student ID: #STU-8821 · Move-in: Oct 1, 2026</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert("Booking request accepted.")} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">Accept</button>
                <button onClick={() => alert("Booking declined.")} className="px-4 py-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 text-xs font-bold hover:bg-zinc-100">Decline</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRUST CENTER TAB */}
      {activeTab === 'trust' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Owner Trust Center</h3>
                <p className="text-xs text-zinc-500">Maintain verified status to build student trust.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { item: 'Government Identity & PAN / Tax ID', status: 'Verified' },
                { item: 'Property Ownership Deed / Authorization', status: 'Verified' },
                { item: 'Bank Account & Payout Details', status: 'Verified' },
                { item: 'Physical Address Geo-Tagging', status: 'Verified' }
              ].map((t, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800">{t.item}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">✓ {t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EARNINGS TAB */}
      {activeTab === 'earnings' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-900 mb-1">Earnings & Payouts</h3>
            <p className="text-xs text-zinc-500 mb-6">Simulated financial transactions and rent collections.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100">
                <div className="text-xs font-semibold text-zinc-500 mb-1">Received (This Month)</div>
                <div className="text-2xl font-extrabold text-zinc-900">₹1,42,000</div>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100">
                <div className="text-xs font-semibold text-zinc-500 mb-1">Pending Clearance</div>
                <div className="text-2xl font-extrabold text-amber-600">₹18,000</div>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100">
                <div className="text-xs font-semibold text-zinc-500 mb-1">Next Payout</div>
                <div className="text-2xl font-extrabold text-zinc-900">Sept 20, 2026</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
