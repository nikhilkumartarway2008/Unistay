import React, { useState } from 'react';
import { Users, DollarSign, Plus, ArrowLeft, CheckCircle2, Home } from 'lucide-react';
import { ScreenType } from '../types';

interface SharedExpensesScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SharedExpensesScreen: React.FC<SharedExpensesScreenProps> = ({ onNavigate }) => {
  const [splitBills, setSplitBills] = useState([
    { id: '1', title: 'High-Speed Wi-Fi Monthly Bill', paidBy: 'Aarav Sharma', amount: 1200, splitBetween: 'Aarav & You (Equal)', date: 'Oct 01, 2026' },
    { id: '2', title: 'Electricity Bill September', paidBy: 'You', amount: 1850, splitBetween: 'Aarav & You (Equal)', date: 'Sep 28, 2026' },
    { id: '3', title: 'Groceries & Cleaning Supplies', paidBy: 'Aarav Sharma', amount: 940, splitBetween: 'Aarav & You (Equal)', date: 'Sep 25, 2026' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [paidBy, setPaidBy] = useState('You');

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const newBill = {
      id: Date.now().toString(),
      title: newTitle,
      paidBy: paidBy,
      amount: parseFloat(newAmount),
      splitBetween: 'Roommates (Equal)',
      date: new Date().toLocaleDateString()
    };
    setSplitBills([newBill, ...splitBills]);
    setNewTitle('');
    setNewAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('student-life-home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-4 py-2 rounded-2xl border border-zinc-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-teal-600 px-4 py-2.5 rounded-2xl shadow-md hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Split Bill</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-teal-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
            <Users className="w-3.5 h-3.5" />
            Household Space & Split Expenses
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Roommate Shared Expenses</h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
            Keep shared bills transparent. Track rent, electricity, Wi-Fi, and shared purchases without money transfer complications.
          </p>
        </div>
      </div>

      {/* Split Bills List */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-teal-100 shadow-xs mb-8">
        <h2 className="font-extrabold text-base text-zinc-900 mb-4">Household Shared Bills</h2>

        <div className="space-y-3">
          {splitBills.map(bill => (
            <div key={bill.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">{bill.title}</h3>
                  <p className="text-[11px] text-zinc-500">Paid by {bill.paidBy} · {bill.splitBetween} · {bill.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm text-teal-700">₹{bill.amount.toLocaleString()}</span>
                <span className="text-[10px] block text-emerald-600 font-semibold">Balanced ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Bill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-teal-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Add Shared Household Bill</h3>
            <p className="text-xs text-zinc-500 mb-6">Record who paid and split evenly with your roommates.</p>

            <form onSubmit={handleAddBill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Bill Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grocery Supermarket run"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="1200"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Paid By</label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="You">You</option>
                  <option value="Aarav Sharma">Aarav Sharma</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-colors"
                >
                  Add Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
