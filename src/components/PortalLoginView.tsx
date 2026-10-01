import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const PortalLoginView: React.FC = () => {
  const { currentRole, setCurrentRole, setActiveTab, students } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'student');

  const handleEnterPortal = () => {
    setCurrentRole(selectedRole);
    if (selectedRole === 'student') {
      setActiveTab('student_resident_pass');
    } else if (selectedRole === 'staff') {
      setActiveTab('daily_reports');
    } else {
      setActiveTab('bed_spaces');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Back to Public Site */}
      <button
        onClick={() => setActiveTab('home')}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Website</span>
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900 p-8 text-white text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
            Nkana College Of Applied Sciences And Education
          </span>
          <h1 className="text-2xl font-black mt-1">Authorized Portal Access</h1>
          <p className="text-xs text-slate-200 mt-1 max-w-md mx-auto">
            Secure authentication checkpoint for Student Residents, Matron/Desk Staff, and Hostel Administration.
          </p>
        </div>

        {/* Role Selection */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Select Portal Account Role:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Student Role (Default) */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                  selectedRole === 'student'
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedRole === 'student' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {selectedRole === 'student' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  )}
                </div>
                <strong className="block text-sm font-bold text-slate-900">Student</strong>
                <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                  Resident digital voucher & room status
                </span>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-sky-800">
                  Default Access
                </span>
              </button>

              {/* Staff Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('staff')}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                  selectedRole === 'staff'
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedRole === 'staff' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  {selectedRole === 'staff' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  )}
                </div>
                <strong className="block text-sm font-bold text-slate-900">Staff</strong>
                <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                  Matron desk, check-in log, daily reports
                </span>
              </button>

              {/* Admin Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                  selectedRole === 'admin'
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedRole === 'admin' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  {selectedRole === 'admin' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  )}
                </div>
                <strong className="block text-sm font-bold text-slate-900">Admin</strong>
                <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                  Dean / Warden allocation & audit control
                </span>
              </button>
            </div>
          </div>

          {/* Role details box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>Active Role Verification:</span>
            </div>
            <p>
              {selectedRole === 'student' && `Logged in as student resident (${students[0]?.fullName} • ${students[0]?.studentNumber}). View allocation voucher and renew bed fees.`}
              {selectedRole === 'staff' && 'Logged in as Hostel Staff / Matron. Verify physical check-ins, issue room keys, and download daily roll-call reports.'}
              {selectedRole === 'admin' && 'Logged in as Directorate of Student Housing Administrator. Full room allocation override, payment reconciliations, and expiry broadcast management.'}
            </p>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleEnterPortal}
            className="w-full py-3.5 px-6 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-sm shadow-md shadow-sky-700/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to {selectedRole === 'student' ? 'Student Resident Portal' : selectedRole === 'staff' ? 'Staff Desk & Reports' : 'Admin Control Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
