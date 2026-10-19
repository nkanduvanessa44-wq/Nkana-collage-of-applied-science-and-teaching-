import React, { useState } from 'react';
import NkanaLogin from './NkanaLogin';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ROLE_PROFILES, getRoleProfile } from '../data/rolesData';
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  FileText,
  SlidersHorizontal,
  Info,
  BookOpen,
  Users,
  LogIn
} from 'lucide-react';

export const PortalLoginView: React.FC = () => {
  const { currentRole, setCurrentRole, setActiveTab, students, setIsLoggedIn } = useApp();
  const [viewMode, setViewMode] = useState<'glass_login' | 'rbac_matrix'>('glass_login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'student');

  if (viewMode === 'glass_login') {
    return <NkanaLogin />;
  }

  const handleEnterPortal = () => {
    setIsLoggedIn(true);
    setCurrentRole(selectedRole);
    if (selectedRole === 'student') {
      setActiveTab('student_resident_pass');
    } else if (selectedRole === 'lecturer') {
      setActiveTab('lecturer_results');
    } else if (selectedRole === 'accountant') {
      setActiveTab('accountant_finance');
    } else if (selectedRole === 'staff') {
      setActiveTab('daily_reports');
    } else if (selectedRole === 'admissions') {
      setActiveTab('online_admission');
    } else {
      setActiveTab('admin_staff');
    }
  };

  const roles: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; badge: string; restrictionNote: string }[] = [
    {
      role: 'student',
      title: 'Student Resident',
      subtitle: 'Resident digital pass, room status & bed fee renewal',
      icon: <GraduationCap className="w-5 h-5" />,
      badge: 'Default Access',
      restrictionNote: 'Allowed: Apply for bed, view pass, track status. Restricted: Staff admin.'
    },
    {
      role: 'lecturer',
      title: 'Academic Lecturer / Faculty',
      subtitle: 'Student marks entry (CA /40, OSCE /20, Exam /40) & gradebook',
      icon: <BookOpen className="w-5 h-5" />,
      badge: 'Academic Faculty',
      restrictionNote: 'Allowed: Student Results Entry, course curricula. Restricted: Bed application, bursar.'
    },
    {
      role: 'accountant',
      title: 'Accountant / Bursar',
      subtitle: 'Fee reconciliation, MTN/Airtel MoMo audits & defaulters',
      icon: <DollarSign className="w-5 h-5" />,
      badge: 'Finance Directorate',
      restrictionNote: 'Allowed: MoMo reconciliation, fee audits, defaulters. 🚫 Bed application hidden.'
    },
    {
      role: 'staff',
      title: 'Hostel Staff / Matron',
      subtitle: 'Warden roll-call, physical key issuance & daily reports',
      icon: <UserCheck className="w-5 h-5" />,
      badge: 'Hall Custody',
      restrictionNote: 'Allowed: Check-in/out, key issuance, daily PDF reports. Restricted: Accounting.'
    },
    {
      role: 'admin',
      title: 'Dean of Students / Admin',
      subtitle: 'Staff & HR control (add/delete/retire/on live), results approval & allocations',
      icon: <ShieldCheck className="w-5 h-5" />,
      badge: 'Executive Oversight',
      restrictionNote: 'Allowed: Full staff management, results approval, bed allocation overrides, user roles.'
    },
    {
      role: 'admissions',
      title: 'Admissions Officer',
      subtitle: 'Academic intake applications, ECZ results & offer letters',
      icon: <FileText className="w-5 h-5" />,
      badge: 'Registry',
      restrictionNote: 'Allowed: Direct Entry application review, ECZ verification.'
    }
  ];

  const activeMeta = roles.find(r => r.role === selectedRole) || roles[0];

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4 space-y-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setViewMode('glass_login')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0F6FBF] hover:text-[#0c5a9c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Switch to Liquid Glass Student Login</span>
        </button>

        <button
          onClick={() => setActiveTab('user_roles')}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#E6F0FF] text-[#0F6FBF] px-3 py-1.5 rounded-xl border border-[#BFDBFE] hover:bg-[#d8e8fc] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>View Roles & Privileges Dashboard</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F6FBF] via-sky-800 to-[#0A1931] p-6 sm:p-8 text-white text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-inner">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
            Nkana College Of Applied Sciences And Education
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Authorized Portal Access</h1>
          <p className="text-xs text-sky-100/90 mt-1.5 max-w-md mx-auto leading-relaxed">
            Role-Based Access Control checkpoint. Choose your authorized account role below to load your personalized workspace.
          </p>
        </div>

        {/* Role Selection */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Portal Account Role:
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                6 Active Personas Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {roles.map((r) => {
                const isSelected = selectedRole === r.role;

                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0F6FBF] bg-[#E6F0FF]/40 shadow-xs ring-1 ring-[#0F6FBF]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                          isSelected ? 'bg-[#0F6FBF] text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {r.icon}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#0F6FBF]" />
                        )}
                      </div>

                      <strong className="block text-sm font-bold text-[#0A1931]">{r.title}</strong>
                      <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug line-clamp-2">
                        {r.subtitle}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                        isSelected ? 'bg-[#0F6FBF] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {r.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privilege details box */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0A1931]">
              <Lock className="w-4 h-4 text-[#0F6FBF]" />
              <span>Privilege Summary for {activeMeta.title}:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {selectedRole === 'student' && `Logged in as registered resident (${students[0]?.fullName} • ${students[0]?.studentNumber}). You can apply for accommodation, view your allocated room pass, and pay bed fees.`}
              {selectedRole === 'lecturer' && 'Logged in as Academic Lecturer (Dr. Mwila Chanda). You can input and update continuous assessment, clinical OSCE practicum, and final examination marks for your assigned courses.'}
              {selectedRole === 'accountant' && 'Logged in as Bursar & Finance Officer (Chileshe Mulenga). You can reconcile MTN/Airtel MoMo payments, audit revenue, and issue defaulter notices. Personal bed application forms are excluded from your interface.'}
              {selectedRole === 'staff' && 'Logged in as Hostel Staff / Duty Matron (Mrs. Grace Phiri). You can verify physical roll-calls, check students in/out, assign physical keys, and export daily reports.'}
              {selectedRole === 'admin' && 'Logged in as Dean of Students & Housing Administrator (Dr. Bwalya Kangwa). You have complete authority over allocations, approvals, user roles, and campus bed policies.'}
              {selectedRole === 'admissions' && 'Logged in as Admissions Registrar (Kelvin Musonda). You can review incoming direct entry applications for Health Sciences and Education.'}
            </p>
            <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-[#0F6FBF] font-semibold">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>{activeMeta.restrictionNote}</span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleEnterPortal}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-extrabold text-sm shadow-md shadow-[#0F6FBF]/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Proceed to {activeMeta.title} Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalLoginView;
