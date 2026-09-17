import React, { useState } from 'react';
import { ArrowLeft, Shield, Users, Building2, CheckCircle2, AlertCircle, FileText, BarChart3, Settings, Database, Lock } from 'lucide-react';
import { ScreenType, AuditLogRecord } from '../types';

interface AdminControlCenterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminControlCenterScreen: React.FC<AdminControlCenterProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'audit' | 'system'>('overview');

  const auditLogs: AuditLogRecord[] = [
    {
      id: 'LOG-8812',
      adminName: 'Admin Sarah (Trust & Safety)',
      action: 'Property Trust Passport Approved',
      target: 'Scholar Haven Deluxe PG',
      reason: 'All KYCs, utility bills, and electricity meters verified successfully.',
      timestamp: '2026-09-17 11:20 AM',
      previousState: 'PENDING_VERIFICATION',
      newState: 'VERIFIED_TRUST_PASSPORT'
    },
    {
      id: 'LOG-8811',
      adminName: 'Admin Alex (Moderation)',
      action: 'Community Post Reviewed',
      target: 'Post #post-2 (Transport Tips)',
      reason: 'Routine content moderation check. Complies with student guidelines.',
      timestamp: '2026-09-17 09:15 AM',
      previousState: 'FLAGGED_REVIEW',
      newState: 'PUBLISHED'
    },
    {
      id: 'LOG-8810',
      adminName: 'Admin System',
      action: 'Payment Escrow Reconciliation',
      target: 'Batch #PAY-2026-09',
      reason: 'Automated settlement check completed with zero discrepancies.',
      timestamp: '2026-09-17 04:00 AM',
      previousState: 'PROCESSING',
      newState: 'SETTLED'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-red-200 text-zinc-700 text-xs font-semibold hover:bg-red-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Exit Admin Mode</span>
        </button>

        <span className="px-3.5 py-1.5 rounded-full bg-red-100 text-red-900 text-xs font-bold border border-red-200 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-red-600" />
          UniStay Admin Control Center
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">Platform Administration & Audit Logs</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Secure oversight, verification approvals, dispute resolution, and immutable audit logs.</p>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: '📊 Platform Overview' },
          { id: 'properties', label: '🏢 Property & Trust Moderation' },
          { id: 'audit', label: '🔒 Immutable Audit Logs' },
          { id: 'system', label: '⚙️ System Health & Security' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap ${activeTab === tab.id ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-white text-zinc-700 border-red-100 hover:bg-red-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Active Students</span>
              <span className="text-2xl font-bold text-zinc-900">4,280</span>
              <span className="text-xs font-semibold text-emerald-600 block mt-1">+12% this month</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Verified Properties</span>
              <span className="text-2xl font-bold text-zinc-900">184</span>
              <span className="text-xs font-semibold text-emerald-600 block mt-1">100% Trust Audited</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Monthly Booking Volume</span>
              <span className="text-2xl font-bold text-red-600">₹42.5 Lakhs</span>
              <span className="text-xs font-semibold text-emerald-600 block mt-1">Secure Escrow</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">System Health</span>
              <span className="text-2xl font-bold text-emerald-600">99.98%</span>
              <span className="text-xs font-semibold text-zinc-500 block mt-1">All services normal</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-[28px] border border-red-100 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-zinc-900">admin_audit_logs</h3>
              <p className="text-xs text-zinc-500">Immutable chronological audit trail for all administrative actions and security overrides.</p>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200">
              Encrypted Log Stream
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="bg-[#FAF8F5] p-5 rounded-2xl border border-red-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{log.action}</span>
                  <span className="text-zinc-400">{log.timestamp}</span>
                </div>
                <p className="text-zinc-600"><strong className="text-zinc-800">Target:</strong> {log.target} · <strong className="text-zinc-800">Admin:</strong> {log.adminName}</p>
                <p className="text-zinc-500 italic">"{log.reason}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 text-[11px]">
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">From: {log.previousState}</span>
                  <span>→</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">To: {log.newState}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'properties' && (
        <div className="bg-white rounded-[28px] border border-red-100 p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-lg text-zinc-900 mb-2">Pending Trust Passport Verifications</h3>
          <p className="text-xs text-zinc-500 mb-6">Review owner documents, utility bills, and sub-meter certifications.</p>
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-red-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-zinc-900 block mb-0.5">Greenview Student Residence (South Campus)</span>
              <span className="text-zinc-500">Submitted by Owner · 3 documents pending audit</span>
            </div>
            <button
              onClick={() => alert("Trust Passport approved successfully!")}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
            >
              Verify & Approve
            </button>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="bg-white rounded-[28px] border border-red-100 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-lg text-zinc-900 mb-2">System Health & Security Monitoring</h3>
          <p className="text-xs text-zinc-500 mb-6">Database connection pooling, rate limits, and API latency metrics.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-red-100 space-y-1">
              <span className="font-bold text-zinc-900 block">Database Latency</span>
              <span className="text-emerald-600 font-bold">12ms (Optimal)</span>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-red-100 space-y-1">
              <span className="font-bold text-zinc-900 block">API Gateway Security</span>
              <span className="text-emerald-600 font-bold">JWT + Role RBAC Active</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
