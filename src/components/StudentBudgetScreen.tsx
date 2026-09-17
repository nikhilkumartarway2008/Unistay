import React, { useState } from 'react';
import { DollarSign, Plus, ArrowLeft, TrendingUp, AlertCircle, PieChart, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScreenType, ExpenseItem } from '../types';

interface StudentBudgetScreenProps {
  onNavigate: (screen: ScreenType) => void;
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
}

export const StudentBudgetScreen: React.FC<StudentBudgetScreenProps> = ({ onNavigate, expenses, setExpenses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<'Rent' | 'Food' | 'Transport' | 'Laundry' | 'Shopping' | 'Study' | 'Entertainment' | 'Other'>('Food');

  const monthlyBudget = 15000;
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const estimatedLivingCost = 13500;
  const difference = totalSpent - estimatedLivingCost;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      amount: parseFloat(newAmount),
      date: new Date().toLocaleDateString(),
      type: 'Variable'
    };
    setExpenses([newItem, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
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
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-purple-600 px-4 py-2.5 rounded-2xl shadow-md hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* Hero Budget Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-purple-600/10 mb-8 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/35">
              <DollarSign className="w-3.5 h-3.5" />
              Student Money Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">Monthly Budget OS</h1>
            <p className="text-xs text-purple-100">Private, secure expense tracking and True Living Cost intelligence.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="text-xs text-purple-200 font-semibold block mb-1">Total Spent This Month</span>
            <span className="text-2xl sm:text-3xl font-extrabold">₹{totalSpent.toLocaleString()}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="text-xs text-purple-200 font-semibold block mb-1">Estimated Living Cost</span>
            <span className="text-2xl sm:text-3xl font-extrabold">₹{estimatedLivingCost.toLocaleString()}</span>
            <span className={`text-[10px] font-bold block mt-1 ${difference <= 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
              {difference <= 0 ? `₹${Math.abs(difference)} under estimate` : `₹${difference} over estimate`}
            </span>
          </div>
        </div>
      </div>

      {/* Budget Alert Notification */}
      {totalSpent > monthlyBudget * 0.8 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-center gap-3 text-amber-900 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Budget Alert: You've reached {Math.round((totalSpent / monthlyBudget) * 100)}% of your monthly budget limit (₹{monthlyBudget.toLocaleString()}). Never shamed, strictly private.</span>
        </div>
      )}

      {/* Expense Records List */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-purple-100 shadow-xs mb-8">
        <h2 className="font-extrabold text-base text-zinc-900 mb-4">Recent Recorded Expenses</h2>

        {expenses.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center">No expenses recorded yet. Click "Record Expense" to add one.</p>
        ) : (
          <div className="space-y-3">
            {expenses.map(exp => (
              <div key={exp.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-[#FAF8F5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    {exp.category[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">{exp.title}</h3>
                    <p className="text-[11px] text-zinc-500">{exp.category} · {exp.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-purple-700">₹{exp.amount.toLocaleString()}</span>
                  <span className="text-[10px] block text-zinc-400 font-medium">{exp.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Record Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Record New Expense</h3>
            <p className="text-xs text-zinc-500 mb-6">All expense data is strictly private and used only for your budget OS.</p>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grocery Supermarket run"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                >
                  <option value="Rent">Rent</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Laundry">Laundry</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Study">Study</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
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
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-colors"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
