import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, DollarSign, Shield, Plus, Sparkles, 
  ArrowRight, CheckCircle2, AlertCircle, Clock, ChevronRight, FileText, BarChart3, Settings, MessageSquare,
  Home, Wrench, CreditCard, Bell, LogOut, Check, ArrowLeft, Trash2, Edit3, Eye, Search, Filter, ShieldCheck, Star
} from 'lucide-react';
import { PropertyItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface OwnerWorkspaceProps {
  properties: PropertyItem[];
  onAddProperty: (prop: PropertyItem) => void;
  onUpdateProperty: (prop: PropertyItem) => void;
  onDeleteProperty: (id: string) => void;
}

export const OwnerWorkspace: React.FC<OwnerWorkspaceProps> = ({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty
}) => {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<'dashboard' | 'properties' | 'tenants' | 'bookings' | 'maintenance' | 'calendar' | 'payments' | 'messages' | 'analytics' | 'ai' | 'settings'>('dashboard');
  
  // Managing selected property for detailed "Manage" view
  const [managingProperty, setManagingProperty] = useState<PropertyItem | null>(null);
  const [managingTab, setManagingTab] = useState<'overview' | 'rooms' | 'tenants' | 'bookings' | 'payments' | 'maintenance' | 'photos' | 'info' | 'analytics' | 'reviews'>('overview');

  // List Property Wizard State
  const [isListingWizardOpen, setIsListingWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [propertyType, setPropertyType] = useState<'PG / Hostel' | 'Flat' | 'Shared' | 'Near Campus'>('PG / Hostel');
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [totalRooms, setTotalRooms] = useState('12');
  const [availableRooms, setAvailableRooms] = useState('3');
  const [monthlyRent, setMonthlyRent] = useState('14500');
  const [securityDeposit, setSecurityDeposit] = useState('15000');
  const [occupancyType, setOccupancyType] = useState('Double Sharing');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-speed Wi-Fi', 'AC', 'Power Backup', 'Attached Bathroom', 'Laundry', 'Security 24/7'
  ]);
  const [propertyImages, setPropertyImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Filter properties owned by this owner (or all if none tagged, or tagged by user.id)
  const ownerProperties = properties.filter(p => !p.ownerId || p.ownerId === user?.id);

  // Statistics calculation
  const totalPropertiesCount = ownerProperties.length || 2;
  const activeTenantsCount = 38;
  const monthlyRevenue = '₹5,48,000';
  const pendingRequestsCount = 5;

  // Recent Activity mock data
  const [recentActivities, setRecentActivities] = useState([
    { id: 'act-1', type: 'booking', title: 'New Booking Request', desc: 'Aarav Sharma requested Double Sharing at Zenith Hub', time: '12 mins ago', icon: Calendar },
    { id: 'act-2', type: 'payment', title: 'Rent Payment Received', desc: '₹14,500 received via UPI for Room 204', time: '2 hours ago', icon: DollarSign },
    { id: 'act-3', type: 'maintenance', title: 'Maintenance Request', desc: 'AC cooling check requested by Room 302', time: '5 hours ago', icon: Wrench },
    { id: 'act-4', type: 'tenant', title: 'New Tenant Checked In', desc: 'Ananya Iyer assigned to Room 101', time: '1 day ago', icon: Users }
  ]);

  // AI Owner Assistant state
  const [aiQuery, setAiQuery] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'owner' | 'ai'; text: string }>>([
    { sender: 'ai', text: `Hello ${user?.fullName || 'Owner'}! I am your UniStay Owner AI. Ask me about your property occupancy, pending bookings, revenue, or listing optimization.` }
  ]);

  const handlePublishProperty = () => {
    const newProp: PropertyItem = {
      id: 'prop-' + Date.now(),
      name: propertyName || 'New Student Residence',
      location: propertyAddress || 'University District, Main Campus',
      matchPercentage: '98% Match',
      rent: `₹${monthlyRent} / mo`,
      rentNumeric: Number(monthlyRent),
      distance: '0.4 km',
      distanceKm: 0.4,
      category: propertyType,
      image: propertyImages[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      images: propertyImages,
      verified: true,
      saved: false,
      amenitiesList: selectedAmenities,
      roomType: occupancyType,
      roomTypes: [
        { name: occupancyType, rent: Number(monthlyRent), capacity: occupancyType, description: propertyDescription || 'Modern furnished student accommodation.' }
      ],
      studyScore: '9.5 / 10',
      privacyScore: '9.0 / 10',
      foodAvailable: selectedAmenities.includes('Food / Mess'),
      ownerId: user?.id || 'owner-default'
    };

    onAddProperty(newProp);
    setIsListingWizardOpen(false);
    setWizardStep(1);
    setPropertyName('');
    setPropertyAddress('');
    setPropertyDescription('');
    setRecentActivities(prev => [
      { id: 'act-' + Date.now(), type: 'property', title: 'Property Published', desc: `Successfully listed "${newProp.name}"`, time: 'Just now', icon: Building2 },
      ...prev
    ]);
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const q = aiQuery.trim();
    setAiMessages(prev => [...prev, { sender: 'owner', text: q }]);
    setAiQuery('');

    setTimeout(() => {
      let reply = "Based on your current portfolio data, all active properties are performing well with 88% average occupancy.";
      const lower = q.toLowerCase();
      if (lower.includes('vacant') || lower.includes('rooms')) {
        reply = "You currently have 3 rooms vacant across your properties (2 in Zenith Hub, 1 in Scholar's Den).";
      } else if (lower.includes('booking') || lower.includes('request')) {
        reply = "You have 5 pending booking requests waiting for your approval. Aarav Sharma's request is top priority.";
      } else if (lower.includes('revenue') || lower.includes('earn')) {
        reply = "Your projected monthly rental revenue is ₹5,48,000 with 94% collection efficiency this term.";
      } else if (lower.includes('occupancy') || lower.includes('highest')) {
        reply = "Zenith Student Living Hub has the highest occupancy at 95%, followed by Scholar's Den at 88%.";
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-sky-50/30 backdrop-blur-3xl text-zinc-950 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 glass-sidebar text-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-600 flex items-center justify-center text-white font-black shadow-lg">
                U
              </div>
              <div>
                <span className="text-white font-bold tracking-tight text-base block">UniStay</span>
                <span className="text-[11px] text-blue-500 font-semibold uppercase tracking-wider">Property Management</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'properties', label: 'My Properties', icon: Building2 },
              { id: 'tenants', label: 'Tenants', icon: Users },
              { id: 'bookings', label: 'Booking Requests', icon: Calendar, badge: pendingRequestsCount },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'ai', label: 'UniStay AI', icon: Sparkles, highlight: true },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id as any);
                    setManagingProperty(null);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' : 'hover:bg-zinc-800/60 text-zinc-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-sky-500' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Owner Profile Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-600/40 text-blue-500 font-bold flex items-center justify-center text-xs">
              {user?.fullName?.charAt(0) || 'O'}
            </div>
            <div className="overflow-hidden">
              <span className="text-white text-xs font-bold block truncate">{user?.fullName || 'Property Owner'}</span>
              <span className="text-[10px] text-zinc-400 block truncate">{user?.phoneNumber || 'Verified Partner'}</span>
            </div>
          </div>
          <button
            onClick={() => logout()}
            title="Sign Out"
            className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="glass-header px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-blue-50 text-orange-700 border border-blue-200">
              🏢 Owner Portal
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">Role: Property Owner & Manager</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsListingWizardOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:opacity-95 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ List Your Property</span>
            </button>
          </div>
        </header>

        {/* VIEW: PROPERTY DETAILED MANAGEMENT */}
        {managingProperty ? (
          <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fade-in">
            <div className="flex items-center justify-between glass-panel p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setManagingProperty(null)}
                  className="p-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700">Active Listing</span>
                    <span className="text-xs text-zinc-500">{managingProperty.category}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900">{managingProperty.name}</h1>
                  <p className="text-xs text-zinc-500">{managingProperty.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-blue-700">{managingProperty.rent}</span>
              </div>
            </div>

            {/* Management Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar border-b border-zinc-200">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'rooms', label: 'Rooms & Availability' },
                { id: 'tenants', label: 'Tenants' },
                { id: 'bookings', label: 'Booking Requests' },
                { id: 'payments', label: 'Payments' },
                { id: 'maintenance', label: 'Maintenance' },
                { id: 'photos', label: 'Photos' },
                { id: 'info', label: 'Property Information' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setManagingTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${managingTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-zinc-600 hover:bg-blue-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Management Tab Content */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              {managingTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-zinc-900">Property Management Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                      <span className="text-xs font-semibold text-zinc-500 block mb-1">Occupancy Status</span>
                      <span className="text-2xl font-extrabold text-zinc-900">8 / 10 Occupied</span>
                      <span className="text-[11px] text-emerald-600 mt-1 block">2 rooms available</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-sky-50/60 border border-amber-100">
                      <span className="text-xs font-semibold text-zinc-500 block mb-1">Monthly Collection</span>
                      <span className="text-2xl font-extrabold text-zinc-900">₹1,16,000</span>
                      <span className="text-[11px] text-emerald-600 mt-1 block">96% collected on time</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <span className="text-xs font-semibold text-zinc-500 block mb-1">Pending Maintenance</span>
                      <span className="text-2xl font-extrabold text-zinc-900">1 Request</span>
                      <span className="text-[11px] text-blue-700 mt-1 block">AC filter check</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Amenities Included</h4>
                    <div className="flex flex-wrap gap-2">
                      {managingProperty.amenitiesList?.map((am, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-medium">
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {managingTab === 'rooms' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-zinc-900">Rooms & Availability Configuration</h3>
                    <button onClick={() => alert("Add room type feature")} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
                      + Add Room Variant
                    </button>
                  </div>
                  <div className="space-y-3">
                    {managingProperty.roomTypes?.map((rt, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-zinc-200 flex items-center justify-between bg-zinc-50/50">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900">{rt.name}</h4>
                          <p className="text-xs text-zinc-500">{rt.description} • Capacity: {rt.capacity}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-blue-700 text-sm">₹{rt.rent.toLocaleString()} / mo</span>
                          <span className="block text-[10px] text-emerald-600 font-semibold">Available</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {managingTab === 'tenants' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Active Tenants (Students)</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Aarav Sharma', room: 'Room 101', course: 'B.Tech CSE, Christ University', phone: '+91 98765 43210', status: 'Rent Paid' },
                      { name: 'Ananya Iyer', room: 'Room 204', course: 'B.Com, Mount Carmel', phone: '+91 91234 56789', status: 'Rent Paid' }
                    ].map((t, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-zinc-900">{t.name} ({t.room})</h4>
                            <p className="text-[11px] text-zinc-500">{t.course} • {t.phone}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {managingTab === 'bookings' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Pending Booking Requests</h3>
                  <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900">Rohan Verma requested Double Sharing</h4>
                      <p className="text-[11px] text-zinc-500">Requested move-in: Oct 1, 2026 • Verified Student ID</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert("Booking approved!")} className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">Approve</button>
                      <button onClick={() => alert("Booking declined")} className="px-3.5 py-1.5 rounded-xl bg-zinc-200 text-zinc-700 text-xs font-bold">Decline</button>
                    </div>
                  </div>
                </div>
              )}

              {managingTab === 'payments' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Payment Ledger & Receipts</h3>
                  <p className="text-xs text-zinc-500">All transactions are processed securely through UniStay Settlement Engine.</p>
                  <div className="p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-zinc-900 block">September Rent - Aarav Sharma</span>
                      <span className="text-[11px] text-zinc-500">Paid on Sept 1, 2026 via UPI</span>
                    </div>
                    <span className="font-extrabold text-emerald-600 text-xs">₹14,500 (Success)</span>
                  </div>
                </div>
              )}

              {managingTab === 'maintenance' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Maintenance & Repair Tickets</h3>
                  <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-zinc-900 block">AC Filter Cleaning - Room 302</span>
                      <span className="text-[11px] text-zinc-500">Reported 5 hours ago by student</span>
                    </div>
                    <button onClick={() => alert("Marked as resolved")} className="px-3 py-1 rounded-xl bg-amber-600 text-white text-xs font-bold">Resolve Ticket</button>
                  </div>
                </div>
              )}

              {managingTab === 'photos' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Property Photos & Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {managingProperty.images?.map((img, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video border border-zinc-200">
                        <img src={img} alt="Property" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {managingTab === 'analytics' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Occupancy & Revenue Analytics</h3>
                  <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center">
                    <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-bold text-sm text-zinc-900">98% View-to-Booking Conversion Rate</h4>
                    <p className="text-xs text-zinc-500 mt-1">This property ranks in the top 5% of student residences in this area.</p>
                  </div>
                </div>
              )}

              {managingTab === 'reviews' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Student Reviews & Ratings</h3>
                  <div className="p-4 rounded-2xl border border-zinc-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sky-600 font-bold">★ 4.9 / 5.0</span>
                      <span className="text-xs text-zinc-500">Based on 24 verified student reviews</span>
                    </div>
                    <p className="text-xs text-zinc-600">"Extremely clean rooms with reliable high-speed Wi-Fi and study environment." — Aarav S.</p>
                  </div>
                </div>
              )}

              {managingTab === 'info' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-zinc-900">Property Details & Address</h3>
                  <div className="space-y-2 text-xs">
                    <p><strong>Name:</strong> {managingProperty.name}</p>
                    <p><strong>Location:</strong> {managingProperty.location}</p>
                    <p><strong>Category:</strong> {managingProperty.category}</p>
                    <p><strong>Rent:</strong> {managingProperty.rent}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : activeNav === 'dashboard' ? (
          
          /* DASHBOARD OVERVIEW VIEW */
          <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
            
            {/* Welcome Greeting */}
            <div className="glass-panel rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-blue-100 text-orange-800 mb-2 inline-block">
                  Dashboard Overview
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                  Welcome back, {user?.fullName || 'Owner'}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Here's what's happening with your properties today.
                </p>
              </div>
              <button
                onClick={() => setIsListingWizardOpen(true)}
                className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ List Your Property</span>
              </button>
            </div>

            {/* Top Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Properties</span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 mb-1">{totalPropertiesCount}</div>
                <div className="text-xs text-emerald-600 font-semibold">✓ 100% Verified Portfolio</div>
              </div>

              <div className="glass-panel p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active Tenants</span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 mb-1">{activeTenantsCount}</div>
                <div className="text-xs text-emerald-600 font-semibold">+4 this month</div>
              </div>

              <div className="glass-panel p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Revenue</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 mb-1">{monthlyRevenue}</div>
                <div className="text-xs text-emerald-600 font-semibold">96% collection rate</div>
              </div>

              <div className="glass-panel p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Pending Requests</span>
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-amber-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 mb-1">{pendingRequestsCount}</div>
                <div className="text-xs text-blue-700 font-semibold">Action required</div>
              </div>
            </div>

            {/* QUICK ACTIONS PANEL */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: '+ List Property', action: () => setIsListingWizardOpen(true), icon: Plus },
                  { label: 'Booking Requests', action: () => setActiveNav('bookings'), icon: Calendar },
                  { label: 'Manage Tenants', action: () => setActiveNav('tenants'), icon: Users },
                  { label: 'View Payments', action: () => setActiveNav('payments'), icon: CreditCard },
                  { label: 'Maintenance', action: () => setActiveNav('maintenance'), icon: Wrench },
                  { label: 'Generate Report', action: () => alert("Financial & Occupancy report generated successfully!"), icon: FileText }
                ].map((qa, i) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={i}
                      onClick={qa.action}
                      className="p-4 rounded-2xl bg-zinc-50 hover:bg-blue-50 border border-zinc-200 hover:border-blue-200 text-left transition-all group flex flex-col justify-between gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800">{qa.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MY PROPERTIES SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">My Properties</h3>
                  <p className="text-xs text-zinc-500">All properties managed under your owner account.</p>
                </div>
                <button
                  onClick={() => setIsListingWizardOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ List Your Property</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownerProperties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-zinc-100">
                        <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                          Active Status
                        </span>
                        <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-semibold">
                          {prop.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-base text-zinc-900">{prop.name}</h4>
                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                          📍 {prop.location}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-xs font-medium text-zinc-600 border-t border-zinc-100">
                          <span>Rent: <strong className="text-blue-700">{prop.rent}</strong></span>
                          <span>Occupancy: <strong>8/10</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setManagingProperty(prop)}
                        className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors text-center"
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => setManagingProperty(prop)}
                        className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-100 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onDeleteProperty(prop.id)}
                        className="p-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY SECTION */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map(act => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex items-start gap-4 pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-zinc-900">{act.title}</h4>
                          <span className="text-[10px] text-zinc-400">{act.time}</span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-0.5">{act.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : activeNav === 'ai' ? (
          
          /* OWNER AI VIEW */
          <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-6 animate-fade-in flex flex-col h-[calc(100vh-80px)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">UniStay Owner AI</h1>
                <p className="text-xs text-zinc-500">Your intelligent property management co-pilot for occupancy, revenue, and tenant insights.</p>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-3xl border border-zinc-200 p-6 flex flex-col justify-between shadow-xs overflow-hidden">
              <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${msg.sender === 'owner' ? 'bg-blue-600 text-white font-medium rounded-br-xs' : 'bg-zinc-100 text-zinc-800 rounded-bl-xs'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAiSend} className="mt-4 pt-4 border-t border-zinc-200 flex gap-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask e.g. 'How many rooms are vacant?' or 'Show my pending booking requests'"
                  className="flex-1 px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                />
                <button type="submit" className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-colors">
                  Ask AI
                </button>
              </form>
            </div>
          </div>
        ) : (
          
          /* GENERIC PLACEHOLDER FOR OTHER NAV TABS */
          <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fade-in">
            <div className="glass-panel p-8 rounded-3xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 capitalize">{activeNav} Management</h2>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Manage your {activeNav} securely across your verified properties with real-time database synchronization.
              </p>
              <button onClick={() => setActiveNav('dashboard')} className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">
                Return to Dashboard Overview
              </button>
            </div>
          </div>
        )}

      </main>

      {/* LIST YOUR PROPERTY WIZARD MODAL */}
      {isListingWizardOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-scale-up space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step {wizardStep} of 6</span>
                <h2 className="text-xl font-bold text-zinc-900">List Your Property</h2>
              </div>
              <button onClick={() => setIsListingWizardOpen(false)} className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500">
                ✕
              </button>
            </div>

            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-zinc-800">1. Property Information</h3>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Property Name</label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="e.g. Zenith Student Living Hub"
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="PG / Hostel">PG / Hostel</option>
                    <option value="Flat">1BHK / 2BHK Flat</option>
                    <option value="Shared">Shared Co-Living</option>
                    <option value="Near Campus">Near Campus Residency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Address & University Proximity</label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    placeholder="e.g. Koramangala 4th Block, Bengaluru (0.4 km from Christ University)"
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Description</label>
                  <textarea
                    value={propertyDescription}
                    onChange={(e) => setPropertyDescription(e.target.value)}
                    placeholder="Describe student amenities, quiet study environment, and security..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-zinc-800">2. Rooms & Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Monthly Rent (₹)</label>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Security Deposit (₹)</label>
                    <input
                      type="number"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Total Rooms</label>
                    <input
                      type="number"
                      value={totalRooms}
                      onChange={(e) => setTotalRooms(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Available Rooms</label>
                    <input
                      type="number"
                      value={availableRooms}
                      onChange={(e) => setAvailableRooms(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-zinc-800">3. Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'High-speed Wi-Fi', 'AC', 'Power Backup', 'Attached Bathroom', 'Laundry', 
                    'Security 24/7', 'Food / Mess', 'Study Table', 'Gym & Recreation', 'Parking'
                  ].map(amenity => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => {
                          if (isSelected) setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                          else setSelectedAmenities([...selectedAmenities, amenity]);
                        }}
                        className={`p-3 rounded-2xl text-xs font-bold text-left border transition-all ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-blue-50'}`}
                      >
                        {isSelected ? '✓ ' : '+ '} {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-zinc-800">4. Property Images</h3>
                <p className="text-xs text-zinc-500">Add high-resolution photos of rooms, study areas, and common facilities.</p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-xs"
                  />
                  <button
                    onClick={() => {
                      if (customImageUrl.trim()) {
                        setPropertyImages([...propertyImages, customImageUrl.trim()]);
                        setCustomImageUrl('');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Add Image
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {propertyImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-zinc-800">5. Rules & Student Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">House Rules</label>
                    <textarea defaultValue="Quiet hours after 10 PM. No unauthorized overnight guests. Clean common kitchen after use." rows={3} className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Preferred Student Profile</label>
                    <input type="text" defaultValue="Undergraduate & Postgraduate Students" className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-xs" />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 6 && (
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-zinc-900">Ready to Publish</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Your property listing is ready. Once published, it will be instantly indexed in the student property discovery system with real-time verification badge.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              {wizardStep > 1 ? (
                <button
                  onClick={() => setWizardStep(wizardStep - 1)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-100"
                >
                  Back
                </button>
              ) : <div />}

              {wizardStep < 6 ? (
                <button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePublishProperty}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold shadow-lg shadow-blue-600/20 hover:opacity-95"
                >
                  Publish Property
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
