import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Camera, Upload, Shield, Check, AlertCircle } from 'lucide-react';
import { ScreenType } from '../types';

interface MoveInInspectionProps {
  onNavigate: (screen: ScreenType) => void;
}

export const MoveInInspectionScreen: React.FC<MoveInInspectionProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState([
    { category: 'Walls & Paint', status: 'Good', notes: 'Clean condition, no cracks.' },
    { category: 'Furniture (Bed & Desk)', status: 'Good', notes: 'Firm mattress, sturdy study desk.' },
    { category: 'Bathroom & Fixtures', status: 'Good', notes: 'Water heater and taps working properly.' },
    { category: 'Electrical & AC', status: 'Good', notes: 'AC cooling properly, all sockets active.' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('my-stay')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to My Stay</span>
        </button>

        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          Secure Move-In Inspection
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Digital Room Inspection</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Document the condition of your room upon move-in to safeguard your security deposit.</p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-[28px] border border-orange-100 p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900">Inspection Record Successfully Saved</h3>
          <p className="text-xs text-zinc-600 max-w-md mx-auto">
            Your room condition photos and checklist have been securely registered in your tenancy file. Both you and the property owner have access to this record.
          </p>
          <button
            onClick={() => onNavigate('my-stay')}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md"
          >
            Return to My Stay
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-[28px] border border-orange-100 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-bold text-base text-zinc-900">Room Condition Checklist</h3>

            {items.map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-orange-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">{item.category}</span>
                  <select
                    defaultValue={item.status}
                    className="px-3 py-1.5 rounded-xl bg-white border border-orange-200 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Good">Good / Undamaged</option>
                    <option value="Minor Scratch">Minor Wear</option>
                    <option value="Needs Repair">Needs Attention</option>
                  </select>
                </div>
                <input
                  type="text"
                  defaultValue={item.notes}
                  placeholder="Add optional notes or observations..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-orange-200 text-xs font-medium focus:outline-none"
                />
              </div>
            ))}

            <div className="pt-4 border-t border-zinc-100">
              <label className="text-xs font-bold text-zinc-800 block mb-2">Upload Condition Photos:</label>
              <div className="border-2 border-dashed border-orange-200 rounded-2xl p-6 text-center bg-[#FAF8F5] hover:bg-orange-50/50 transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <span className="text-xs font-bold text-zinc-700 block">Click to upload or drag photos here</span>
                <span className="text-[10px] text-zinc-400">PNG, JPG up to 10MB</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-colors"
            >
              Submit Move-In Inspection Record
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
