import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Lock, Check, 
  Building2, Calendar, FileText, Download, Shield 
} from 'lucide-react';
import { ScreenType, PropertyItem, BookingRecord } from '../types';

interface BookingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  property: PropertyItem | null;
  onAddBooking: (booking: BookingRecord) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({ onNavigate, property, onAddBooking }) => {
  const [step, setStep] = useState<'configure' | 'summary' | 'agreement' | 'payment' | 'confirmed'>('configure');
  const [roomType, setRoomType] = useState('Private Room with Attached Bath');
  const [moveInDate, setMoveInDate] = useState('2026-10-01');
  const [stayDuration, setStayDuration] = useState('1 Academic Semester');
  const [bookingType, setBookingType] = useState<'request' | 'instant'>('instant');
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<BookingRecord | null>(null);

  const monthlyRent = property?.rent || 9500;
  const securityDeposit = monthlyRent; // equal to 1 month rent
  const platformFee = 499;
  const totalPayableNow = monthlyRent + securityDeposit + platformFee;

  const handleProceedToSummary = () => {
    setStep('summary');
  };

  const handleProceedToAgreement = () => {
    setStep('agreement');
  };

  const handleAcceptAgreement = () => {
    if (!agreementAccepted) {
      alert("Please review and accept the digital rental agreement terms.");
      return;
    }
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      const newBooking: BookingRecord = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyId: property?.id || 'prop-1',
        propertyName: property?.name || 'Scholar Haven Deluxe PG',
        location: property?.location || 'North Campus District',
        roomType,
        moveInDate,
        duration: stayDuration,
        monthlyRent,
        securityDeposit,
        platformFee,
        totalPayableNow,
        status: 'CONFIRMED',
        paymentStatus: 'Successful',
        agreementStatus: 'Completed',
        createdAt: new Date().toLocaleDateString()
      };
      setReceiptData(newBooking);
      onAddBooking(newBooking);
      setStep('confirmed');
    }, 1500);
  };

  const handleDownloadPdf = () => {
    if (!receiptData) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF receipt.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>UniStay Official Booking Receipt & Lease Agreement - ${receiptData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .badge { background: #ffedd5; color: #c2410c; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .section { margin-bottom: 25px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #fafaf9; padding: 20px; border-radius: 12px; }
            .total { font-size: 18px; font-weight: bold; color: #ea580c; margin-top: 15px; }
            .footer { margin-top: 50px; border-top: 1px solid #e7e5e4; padding-top: 20px; font-size: 11px; color: #78716c; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin: 0; color: #ea580c; font-size: 26px;">UniStay</h1>
              <p style="margin: 4px 0 0 0; color: #57534e; font-size: 13px;">Official Student Housing Trust & Lease Agreement</p>
            </div>
            <div class="badge">CONFIRMED & ESCROW SECURED</div>
          </div>

          <div class="section">
            <h3>Booking Reference: ${receiptData.id}</h3>
            <p><strong>Date Issued:</strong> ${receiptData.createdAt}</p>
          </div>

          <div class="section grid">
            <div>
              <p><strong>Property Name:</strong><br/>${receiptData.propertyName}</p>
              <p><strong>Location:</strong><br/>${receiptData.location}</p>
              <p><strong>Room Type:</strong><br/>${receiptData.roomType}</p>
            </div>
            <div>
              <p><strong>Move-In Date:</strong><br/>${receiptData.moveInDate}</p>
              <p><strong>Stay Duration:</strong><br/>${receiptData.duration}</p>
              <p><strong>Payment Status:</strong><br/>${receiptData.paymentStatus} (Escrow Protected)</p>
            </div>
          </div>

          <div class="section" style="background: #fff7ed; padding: 20px; border-radius: 12px; border: 1px solid #ffedd5;">
            <h3 style="margin-top: 0; color: #9a3412;">Financial Summary</h3>
            <p>Monthly Rent: ₹${receiptData.monthlyRent.toLocaleString()}</p>
            <p>Security Deposit (Refundable Escrow): ₹${receiptData.securityDeposit.toLocaleString()}</p>
            <p>Platform & Verification Fee: ₹${receiptData.platformFee.toLocaleString()}</p>
            <div class="total">Total Paid: ₹${receiptData.totalPayableNow.toLocaleString()}</div>
          </div>

          <div class="section">
            <h3>Digital Rental Agreement Terms Summary</h3>
            <p style="font-size: 12px; color: #57534e; line-height: 1.5;">
              This document confirms that the student has successfully entered into a verified residential agreement governed by UniStay Student Housing Trust Layer. All escrow funds are protected until verified move-in inspection. Quiet hours (10 PM - 7 AM) and standard housing code apply.
            </p>
          </div>

          <div class="footer">
            <p>UniStay Platform · Verified Digital Signature & Escrow Receipt · Generated securely on ${new Date().toLocaleString()}</p>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (step === 'configure') onNavigate('property-details');
            else if (step === 'summary') setStep('configure');
            else if (step === 'agreement') setStep('summary');
            else if (step === 'payment') setStep('agreement');
            else onNavigate('my-stay');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs text-zinc-600 bg-white px-3.5 py-1.5 rounded-full border border-orange-100 font-semibold shadow-xs">
          <Lock className="w-3.5 h-3.5 text-orange-500" />
          <span>Secure Student Living Booking Flow</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-orange-100 shadow-xs">
        {[
          { id: 'configure', label: '1. Room & Date' },
          { id: 'summary', label: '2. Cost Breakdown' },
          { id: 'agreement', label: '3. Digital Lease' },
          { id: 'payment', label: '4. Secure Escrow' },
          { id: 'confirmed', label: '5. PDF Receipt' }
        ].map((s, i) => (
          <div key={s.id} className={`flex items-center gap-2 text-xs font-bold ${step === s.id ? 'text-orange-600' : 'text-zinc-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step === s.id ? 'bg-orange-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
              {i + 1}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {step === 'configure' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Configure Your Stay</h2>
            <p className="text-xs text-zinc-500">{property?.name || 'Scholar Haven Deluxe PG'} · {property?.location || 'North Campus'}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-700 uppercase mb-1.5">Select Room Tier</label>
              <select 
                value={roomType}
                onChange={e => setRoomType(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-orange-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-orange-500"
              >
                <option value="Private Room with Attached Bath">Private Room with Attached Bath (₹{monthlyRent.toLocaleString()}/mo)</option>
                <option value="Double Sharing Deluxe">Double Sharing Deluxe (₹{Math.round(monthlyRent * 0.75).toLocaleString()}/mo)</option>
                <option value="Single Studio Suite">Single Studio Suite (₹{Math.round(monthlyRent * 1.3).toLocaleString()}/mo)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-zinc-700 uppercase mb-1.5">Move-In Date</label>
                <input 
                  type="date"
                  value={moveInDate}
                  onChange={e => setMoveInDate(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-orange-200 text-xs font-medium text-zinc-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-zinc-700 uppercase mb-1.5">Stay Duration</label>
                <select
                  value={stayDuration}
                  onChange={e => setStayDuration(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-orange-200 text-xs font-medium text-zinc-900 focus:outline-none"
                >
                  <option value="1 Academic Semester">1 Academic Semester</option>
                  <option value="Full Academic Year">Full Academic Year</option>
                  <option value="Month-to-Month Flexible">Month-to-Month Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-700 uppercase mb-1.5">Booking Preference</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBookingType('instant')}
                  className={`p-4 rounded-2xl border text-left transition-all ${bookingType === 'instant' ? 'border-orange-500 bg-orange-50/50 shadow-xs' : 'border-zinc-200 bg-white'}`}
                >
                  <div className="font-bold text-xs text-zinc-900">⚡ Instant Booking</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Secure room immediately with escrow.</div>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('request')}
                  className={`p-4 rounded-2xl border text-left transition-all ${bookingType === 'request' ? 'border-orange-500 bg-orange-50/50 shadow-xs' : 'border-zinc-200 bg-white'}`}
                >
                  <div className="font-bold text-xs text-zinc-900">💬 Request Owner Approval</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Send verification request first.</div>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToSummary}
            className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-colors"
          >
            Review True Living Cost & Summary →
          </button>
        </div>
      )}

      {step === 'summary' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Cost Breakdown & Escrow Protection</h2>
            <p className="text-xs text-zinc-500">Transparent student pricing with zero hidden brokerage.</p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-orange-100 space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-zinc-600">Monthly Rent ({roomType})</span>
              <span className="font-bold text-zinc-900">₹{monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-zinc-600">Refundable Security Deposit (Escrow)</span>
              <span className="font-bold text-zinc-900">₹{securityDeposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-zinc-600">UniStay Trust & Verification Fee</span>
              <span className="font-bold text-zinc-900">₹{platformFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 text-sm font-extrabold text-orange-600">
              <span>Total Payable Now (Escrow Secured)</span>
              <span>₹{totalPayableNow.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <p>Your money is held in a secure escrow account and is only released to the owner after you successfully move in and verify room condition.</p>
          </div>

          <button
            onClick={handleProceedToAgreement}
            className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-colors"
          >
            Proceed to Digital Rental Agreement →
          </button>
        </div>
      )}

      {step === 'agreement' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Digital Rental Agreement</h2>
            <p className="text-xs text-zinc-500">Review terms, house rules, maintenance responsibilities, and notice periods.</p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-orange-100 text-xs text-zinc-700 space-y-4 max-h-64 overflow-y-auto">
            <div>
              <strong className="text-zinc-900 block mb-1">1. Tenancy Duration & Rent</strong>
              <p>The student agrees to occupy {roomType} at {property?.name || 'Property'} for {stayDuration} starting {moveInDate} at ₹{monthlyRent.toLocaleString()} per month.</p>
            </div>
            <div>
              <strong className="text-zinc-900 block mb-1">2. Security Deposit & Refund</strong>
              <p>A refundable deposit of ₹{securityDeposit.toLocaleString()} is held in secure escrow and returned within 3 working days after checkout inspection.</p>
            </div>
            <div>
              <strong className="text-zinc-900 block mb-1">3. House Rules & Quiet Hours</strong>
              <p>Quiet hours are maintained from 10 PM to 7 AM. Smoking and unauthorized guests are strictly prohibited.</p>
            </div>
            <div>
              <strong className="text-zinc-900 block mb-1">4. Maintenance Responsibilities</strong>
              <p>Property management is responsible for electrical and plumbing repairs within 24 hours of ticket submission.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="agree"
              checked={agreementAccepted}
              onChange={(e) => setAgreementAccepted(e.target.checked)}
              className="w-4 h-4 accent-orange-500 rounded"
            />
            <label htmlFor="agree" className="text-xs font-semibold text-zinc-800 cursor-pointer">
              I accept the digital rental agreement and prototype e-signature terms.
            </label>
          </div>

          <button
            onClick={handleAcceptAgreement}
            className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-colors"
          >
            Accept Agreement & Proceed to Payment →
          </button>
        </div>
      )}

      {step === 'payment' && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Secure Escrow Payment</h2>
            <p className="text-xs text-zinc-500">Simulated payment gateway with test card integration.</p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-orange-100 space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-600">Total Escrow Amount</span>
              <span className="font-extrabold text-orange-600 text-base">₹{totalPayableNow.toLocaleString()}</span>
            </div>
            <div className="space-y-3 pt-2">
              <input
                type="text"
                placeholder="Card Number (e.g. 4242 •••• •••• 4242)"
                defaultValue="4242 4242 4242 4242"
                className="w-full p-3.5 rounded-xl bg-white border border-orange-200 text-xs font-mono focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  defaultValue="12/28"
                  className="w-full p-3.5 rounded-xl bg-white border border-orange-200 text-xs font-mono focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  defaultValue="888"
                  className="w-full p-3.5 rounded-xl bg-white border border-orange-200 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleExecutePayment}
            disabled={paymentProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
          >
            {paymentProcessing ? (
              <span>Processing Secure Escrow Payment...</span>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹{totalPayableNow.toLocaleString()} & Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      )}

      {step === 'confirmed' && receiptData && (
        <div className="bg-white rounded-[28px] border border-orange-100 p-8 text-center space-y-6 shadow-xs animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <Check className="w-10 h-10" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Booking Confirmed & Secured in Escrow
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Welcome to your new home!</h2>
            <p className="text-xs text-zinc-600 max-w-md mx-auto">
              Booking ID: <strong className="text-zinc-900">{receiptData.id}</strong> · Transaction ID: <strong className="text-zinc-900">TXN-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-orange-100 max-w-md mx-auto text-left space-y-2 text-xs text-zinc-700">
            <div><strong className="text-zinc-900">Property:</strong> {receiptData.propertyName}</div>
            <div><strong className="text-zinc-900">Room Type:</strong> {receiptData.roomType}</div>
            <div><strong className="text-zinc-900">Move-In Date:</strong> {receiptData.moveInDate}</div>
            <div><strong className="text-zinc-900">Total Paid:</strong> ₹{receiptData.totalPayableNow.toLocaleString()} (Escrow Secured)</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 font-bold text-xs hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-orange-600" />
              <span>Download Official PDF Receipt & Lease</span>
            </button>
            <button
              onClick={() => onNavigate('my-stay')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-md hover:bg-orange-600 transition-colors"
            >
              Go to My Stay Hub →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
