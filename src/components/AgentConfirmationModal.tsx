import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface AgentConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  impactLevel: 'Low' | 'Medium' | 'High';
  previewDetails: { label: string; value: string }[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const AgentConfirmationModal: React.FC<AgentConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  impactLevel,
  previewDetails,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200">
        
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            impactLevel === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 mb-1">
              Impact Level: {impactLevel}
            </div>
            <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">{title}</h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Action Preview */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-zinc-200 mb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">What will happen:</div>
          <div className="space-y-2">
            {previewDetails.map((detail, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-zinc-600">{detail.label}</span>
                <span className="font-bold text-zinc-900">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-2xl border border-zinc-200 text-zinc-700 text-xs sm:text-sm font-bold hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 text-white text-xs sm:text-sm font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Request</span>
          </button>
        </div>

      </div>
    </div>
  );
};
