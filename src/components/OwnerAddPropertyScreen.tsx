import React, { useState } from 'react';
import { 
  ArrowLeft, Shield, CheckCircle2, ChevronRight, Building2, MapPin, 
  DollarSign, Wifi, Camera, FileText, Check 
} from 'lucide-react';
import { ScreenType, PropertyItem } from '../types';

interface OwnerAddPropertyScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddProperty: (property: PropertyItem) => void;
}

export const OwnerAddPropertyScreen: React.FC<OwnerAddPropertyScreenProps> = ({ onNavigate, onAddProperty }) => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('PG / Hostel');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState('10');
  const [rent, setRent] = useState('14500');
  const [deposit, setDeposit] = useState('15000');
  const [amenities, setAmenities] = useState<string[]>(['Wi-Fi', 'Food / Mess', 'AC', 'Power Backup']);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const newProp: PropertyItem = {
      id: 'prop-' + Date.now(),
      name: `${propertyType} Residence`,
      location: address || 'University Proximity Area',
      matchPercentage: '98% Match',
      rent: `₹${rent} / mo`,
      distance: '0.4 km from campus',
      category: propertyType,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      verified: true,
      saved: false
    };
    onAddProperty(newProp);
    setSubmitted(true);
  };

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter(a => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in bg-[#FAF8F5] min-h-screen">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">Submitted for Verification!</h2>
        <p className="text-xs sm:text-sm text-zinc-600 mb-8 max-w-md mx-auto">
          Your property has been submitted to the UniStay Trust Engine. Our verification team will review your ownership documents and geo-tag within 24 hours.
        </p>
        <button
          onClick={() => onNavigate('owner-dashboard')}
          className="px-8 py-3.5 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
        >
          Return to Owner Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-950">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else onNavigate('owner-dashboard');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-xl">
          Step {step} of 8: Listing Wizard
        </span>
      </div>

      <div className="bg-white rounded-[28px] border border-orange-100/80 p-6 sm:p-10 shadow-xs space-y-6">
        
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">1. Select Property Type</h2>
            <p className="text-xs text-zinc-500">Choose the accommodation format that best describes your listing.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['PG / Hostel', 'Student Flat', 'Shared Room', 'Private Studio'].map((type) => (
                <div 
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${propertyType === type ? 'border-orange-500 bg-orange-50/50' : 'border-zinc-200 bg-[#FAF8F5]'}`}
                >
                  <span className="font-bold text-sm text-zinc-900">{type}</span>
                  {propertyType === type && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">2. Property Location</h2>
            <p className="text-xs text-zinc-500">Enter the exact physical address and proximity details.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Full Street Address</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., 42 University Avenue, Near North Gate"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0 text-orange-600" />
                <span>UniStay will auto-verify geographical coordinates and walking distance to campus during trust audit.</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">3. Rooms & Capacity</h2>
            <p className="text-xs text-zinc-500">Specify total room capacity and available configurations.</p>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Total Rooms Available</label>
              <input 
                type="number" 
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">4. Pricing & Deposit</h2>
            <p className="text-xs text-zinc-500">Transparent pricing ensures trust with students.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Monthly Rent (₹)</label>
                <input 
                  type="text" 
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Security Deposit (₹)</label>
                <input 
                  type="text" 
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">5. Amenities</h2>
            <p className="text-xs text-zinc-500">Select verified amenities included with this listing.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Wi-Fi', 'Food / Mess', 'AC', 'Laundry', 'Parking', 'CCTV Security', 'Power Backup', 'Study Area'].map((item) => {
                const selected = amenities.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs font-bold flex items-center justify-between transition-all ${selected ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-zinc-200 bg-[#FAF8F5] text-zinc-700'}`}
                  >
                    <span>{item}</span>
                    {selected && <Check className="w-4 h-4 text-orange-600" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">6. Photos & Verification Media</h2>
            <p className="text-xs text-zinc-500">Upload unedited photos of bedrooms, common areas, and bathrooms.</p>

            <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 text-center bg-orange-50/40">
              <Camera className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <div className="font-bold text-xs text-zinc-800 mb-1">Click to upload or drag photos here</div>
              <div className="text-[11px] text-zinc-500">Minimum 4 high-resolution images required for Trust Passport.</div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">7. House Rules & Policies</h2>
            <p className="text-xs text-zinc-500">Set clear expectations for student residents.</p>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-orange-500" />
                <span>Curfew / Gate Timing policy specified</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-orange-500" />
                <span>Visitor / Guest policy compliant with university guidelines</span>
              </label>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-6 animate-fade-in text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">8. Ready to Submit</h2>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Your listing is fully configured. Submitting will trigger the UniStay Trust Engine verification protocol.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-200 text-xs text-left max-w-md mx-auto space-y-1">
              <div><strong>Type:</strong> {propertyType}</div>
              <div><strong>Rent:</strong> ₹{rent} / mo</div>
              <div><strong>Address:</strong> {address || '42 University Avenue'}</div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-6 border-t border-zinc-100 flex justify-end">
          {step < 8 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-md hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:opacity-95 transition-opacity"
            >
              Submit for Trust Verification ✨
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
