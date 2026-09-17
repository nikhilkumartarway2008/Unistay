import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, ShieldCheck, CheckCircle2, AlertCircle, FileText, 
  Wrench, CreditCard, ChevronRight, Home, Sparkles, Clock, Check, Download 
} from 'lucide-react';
import { ScreenType, BookingRecord } from '../types';

interface MyStayScreenProps {
  onNavigate: (screen: ScreenType) => void;
  bookings: BookingRecord[];
}

export const MyStayScreen: React.FC<MyStayScreenProps> = ({ onNavigate, bookings }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'current' | 'past'>('current');
  const [checklist, setChecklist] = useState({
    bookingConfirmed: true,
    paymentCompleted: true,
    agreementAccepted: true,
    idVerification: false,
    moveInAppointment: false,
    roomInspection: false
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeBooking = bookings[0] || {
    id: 'BK-8942',
    propertyName: 'Scholar Haven Deluxe PG',
    location: 'North Campus District (Near Gate 4)',
    roomType: 'Private Room with Attached Bath',
    moveInDate: '2026-10-01',
    duration: '1 Academic Semester',
    monthlyRent: 9500,
    securityDeposit: 9500,
    platformFee: 499,
    totalPayableNow: 19499,
    status: 'CONFIRMED',
    paymentStatus: 'Successful',
    agreementStatus: 'Completed',
    createdAt: 'Today'
  };

  const handleDownloadReceiptPdf = () => {
    if (activeBooking.paymentStatus !== 'Successful' && activeBooking.status !== 'CONFIRMED') {
      alert("Payment is not yet confirmed by backend. Receipt download is available only after confirmed payment.");
      return;
    }
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF rent receipt.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>UniStay Official Digital Rent Receipt - ${activeBooking.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .badge { background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .section { margin-bottom: 25px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #fafaf9; padding: 20px; border-radius: 12px; border: 1px solid #fed7aa; }
            .total { font-size: 18px; font-weight: bold; color: #ea580c; margin-top: 15px; }
            .footer { margin-top: 50px; border-top: 1px solid #e7e5e4; padding-top: 20px; font-size: 11px; color: #78716c; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin: 0; color: #ea580c; font-size: 26px;">UniStay</h1>
              <p style="margin: 4px 0 0 0; color: #57534e; font-size: 13px;">Official Student Accommodation Escrow & Rent Receipt</p>
            </div>
            <div class="badge">PAYMENT CONFIRMED ✓</div>
          </div>

          <div class="section">
            <h3>Receipt Reference: REC-${activeBooking.id}</h3>
            <p><strong>Date Issued:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> Confirmed & Secured in Escrow</p>
          </div>

          <div class="section grid">
            <div>
              <p><strong>Student Name:</strong><br/>Authenticated Resident</p>
              <p><strong>Property Name:</strong><br/>${activeBooking.propertyName}</p>
              <p><strong>Location:</strong><br/>${activeBooking.location}</p>
            </div>
            <div>
              <p><strong>Room Tier:</strong><br/>${activeBooking.roomType}</p>
              <p><strong>Move-In Date:</strong><br/>${activeBooking.moveInDate}</p>
              <p><strong>Stay Duration:</strong><br/>${activeBooking.duration}</p>
            </div>
          </div>

          <div class="section" style="background: #fff7ed; padding: 20px; border-radius: 12px; border: 1px solid #ffedd5;">
            <h3 style="margin-top: 0; color: #9a3412;">Payment Breakdown</h3>
            <p>Monthly Rent: ₹${activeBooking.monthlyRent.toLocaleString()}</p>
            <p>Security Deposit (Refundable Escrow): ₹${activeBooking.securityDeposit.toLocaleString()}</p>
            <p>Platform & Verification Fee: ₹${activeBooking.platformFee.toLocaleString()}</p>
            <div class="total">Total Amount Paid: ₹${activeBooking.totalPayableNow.toLocaleString()}</div>
          </div>

          <div class="footer">
            <p>UniStay Platform · Verified Digital Rent Receipt · Automatically generated upon backend payment confirmation</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
            <Home className="w-3.5 h-3.5 text-orange-600" />
            My Stay Hub
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Student Stay & Tenancy</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Manage your active bookings, move-in checklists, digital lease agreements, and rent payments.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-orange-100 pb-4">
        {[
          { id: 'current', label: '🏠 Current Stay' },
          { id: 'upcoming', label: '📅 Upcoming Bookings' },
          { id: 'past', label: '📜 Past Stays' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${activeTab === tab.id ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'current' && (
        <div className="space-y-8">
          
          {/* Active Booking Card */}
          <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              Stay Confirmed & Active
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 mb-2 inline-block">
                  Booking ID: {activeBooking.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-1">{activeBooking.propertyName}</h2>
                <p className="text-xs text-zinc-500">{activeBooking.location}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('maintenance-system')}
                  className="px-4 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs transition-colors border border-orange-200 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-orange-600" />
                  <span>Report Maintenance</span>
                </button>
                <button
                  onClick={() => onNavigate('move-in-inspection')}
                  className="px-4 py-2.5 rounded-2xl bg-white hover:bg-orange-50 text-zinc-700 font-bold text-xs transition-colors border border-orange-200 flex items-center gap-2 shadow-xs"
                >
                  <FileText className="w-4 h-4 text-zinc-600" />
                  <span>Move-in Inspection</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Room Type</span>
                <span className="text-xs font-bold text-zinc-900">{activeBooking.roomType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Move-In Date</span>
                <span className="text-xs font-bold text-zinc-900">{activeBooking.moveInDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Monthly Rent</span>
                <span className="text-xs font-bold text-orange-600">₹{activeBooking.monthlyRent.toLocaleString()} / mo</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Agreement Status</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified & Signed
                </span>
              </div>
            </div>

            {/* Move-In Center Checklist */}
            <div className="bg-white rounded-2xl border border-orange-200/60 p-6">
              <h3 className="font-bold text-sm text-zinc-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                Move-In Checklist & Onboarding
              </h3>
              <p className="text-xs text-zinc-500 mb-6">Complete your verification steps before moving into your room.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'bookingConfirmed', label: 'Booking confirmed by property' },
                  { key: 'paymentCompleted', label: 'Security deposit & advance paid' },
                  { key: 'agreementAccepted', label: 'Digital lease agreement accepted' },
                  { key: 'idVerification', label: 'University student ID verification' },
                  { key: 'moveInAppointment', label: 'Schedule key pickup & arrival slot' },
                  { key: 'roomInspection', label: 'Digital room condition inspection' }
                ].map((item) => {
                  const isChecked = checklist[item.key as keyof typeof checklist];
                  return (
                    <div 
                      key={item.key}
                      onClick={() => toggleChecklist(item.key as any)}
                      className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-colors ${isChecked ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-[#FAF8F5] border-orange-100 text-zinc-700 hover:bg-orange-50/50'}`}
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isChecked ? 'bg-emerald-600 text-white' : 'border border-zinc-300'}`}>
                        {isChecked && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Rent & Financial Summary */}
          <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-zinc-900">Rent & Payments Dashboard</h3>
                <p className="text-xs text-zinc-500">Upcoming dues, receipts, and payment history.</p>
              </div>
              <button
                onClick={() => alert("Simulating rent payment for next month")}
                className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Pay Advance Rent
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Next Rent Due</span>
                <span className="text-base font-bold text-zinc-900">Nov 01, 2026</span>
                <span className="text-xs font-semibold text-orange-600 block mt-1">₹9,500.00</span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Security Deposit Held</span>
                <span className="text-base font-bold text-zinc-900">₹9,500.00</span>
                <span className="text-xs font-semibold text-emerald-600 block mt-1">Secure Escrow ✓</span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Payment Receipts</span>
                <span className="text-base font-bold text-zinc-900">1 Receipt Issued</span>
                <button 
                  onClick={handleDownloadReceiptPdf} 
                  className="text-xs font-bold text-orange-600 block mt-1 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF Receipt ↓
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadReceiptPdf}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900 font-bold text-xs hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-orange-600" />
                <span>Download Official Confirmed Rent Receipt & Escrow Proof</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-8 text-center space-y-4">
          <Calendar className="w-12 h-12 text-orange-400 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-900">No other upcoming bookings</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">You have one active confirmed stay. Explore properties on the map or marketplace to book additional rooms.</p>
          <button
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md"
          >
            Explore Marketplace
          </button>
        </div>
      )}

      {activeTab === 'past' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-8 text-center space-y-4">
          <Clock className="w-12 h-12 text-zinc-300 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-900">No past completed stays</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">Your completed stays and verified student review archives will appear here after checkout.</p>
        </div>
      )}

    </div>
  );
};
