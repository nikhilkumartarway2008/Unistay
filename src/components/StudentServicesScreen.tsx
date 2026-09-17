import React, { useState } from 'react';
import { Wrench, Sparkles, Shield, Star, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface StudentServicesScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const StudentServicesScreen: React.FC<StudentServicesScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingService, setBookingService] = useState<any | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const servicesList = [
    { id: '1', name: 'Campus Wash & Fold Laundry', category: 'Laundry', rating: 4.8, price: '₹499 / month (30kg)', verified: true, provider: 'QuickWash Student Logistics', responseRate: '98%' },
    { id: '2', name: 'Deep Room Cleaning Service', category: 'Cleaning', rating: 4.7, price: '₹349 per session', verified: true, provider: 'SparkleClean PG Care', responseRate: '95%' },
    { id: '3', name: 'Hostel Luggage & Move-In Transport', category: 'Moving', rating: 4.9, price: '₹750 per trip', verified: true, provider: 'SafeMove UniTransport', responseRate: '99%' },
    { id: '4', name: 'High-Speed Wi-Fi Router Setup & Support', category: 'Internet', rating: 4.6, price: '₹599 installation', verified: true, provider: 'NetLink Campus', responseRate: '92%' },
    { id: '5', name: 'Emergency Electrical & Plumbing Repair', category: 'Repairs', rating: 4.9, price: '₹199 visit fee', verified: true, provider: 'FixIt Pro Services', responseRate: '100%' },
    { id: '6', name: 'Notes Printing & Stationery Delivery', category: 'Printing', rating: 4.8, price: '₹2 per page', verified: true, provider: 'PrintHub Campus', responseRate: '97%' }
  ];

  const filteredServices = selectedCategory === 'All' ? servicesList : servicesList.filter(s => s.category === selectedCategory);

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingService(null);
    }, 2000);
  };

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
      <div className="bg-gradient-to-r from-rose-600 to-pink-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-rose-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
            <Wrench className="w-3.5 h-3.5" />
            Student Services Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Reliable help, right at your doorstep.</h1>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl">
            Verified student service providers for laundry, cleaning, moving, repairs, printing, and internet setup with transparent pricing.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {['All', 'Laundry', 'Cleaning', 'Moving', 'Internet', 'Repairs', 'Printing'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${selectedCategory === cat ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white rounded-[28px] p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {service.category}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  ⭐ {service.rating}
                </span>
              </div>

              <h3 className="font-bold text-base text-zinc-900 mb-1">{service.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">By {service.provider} · {service.responseRate} response rate</p>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-rose-100 text-xs flex justify-between items-center mb-6">
                <span className="text-zinc-600 font-medium">Transparent Price:</span>
                <span className="font-bold text-rose-600">{service.price}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Trust Passport Verified
              </span>
              <button
                onClick={() => setBookingService(service)}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-rose-700 transition-colors"
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100">
            {bookedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Service Booked Successfully!</h3>
                <p className="text-xs text-zinc-500">Provider {bookingService.provider} has confirmed your request.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-zinc-900 mb-1">Request Service</h3>
                <p className="text-xs text-zinc-500 mb-6">{bookingService.name} · {bookingService.price}</p>

                <form onSubmit={handleBookingConfirm} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Preferred Date & Time</label>
                    <input
                      type="text"
                      required
                      defaultValue="Tomorrow, 10:00 AM"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Hostel Room / Address</label>
                    <input
                      type="text"
                      required
                      defaultValue="Scholar Haven PG, Room 204"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setBookingService(null)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
