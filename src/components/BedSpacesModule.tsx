import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DormStatusDashboard } from './DormStatusDashboard';
import { ApplicationPortal } from './ApplicationPortal';
import { AdminBedSpaceManagement } from './AdminBedSpaceManagement';
import { DailyReportsView } from './DailyReportsView';
import { AccountantFinanceView } from './AccountantFinanceView';
import { UserRolesDashboard } from './UserRolesDashboard';
import { StudentPortal } from './StudentPortal';
import { hasPrivilege, getRoleProfile } from '../data/rolesData';
import {
  Activity,
  Bed,
  ShieldCheck,
  FileDown,
  DollarSign,
  GraduationCap,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';

interface BedSpacesModuleProps {
  initialTab?: 'dashboard' | 'apply' | 'admin' | 'reports' | 'finance' | 'roles' | 'pass';
}

export const BedSpacesModule: React.FC<BedSpacesModuleProps> = ({ initialTab }) => {
  const { currentRole, rooms, expiryAlerts, setActiveTab } = useApp();
  const roleProfile = getRoleProfile(currentRole);
  const canApply = hasPrivilege(currentRole, 'canApplyForBed');

  // Determine default tab based on role privileges
  const defaultTab = initialTab
    ? (initialTab === 'apply' && !canApply ? (currentRole === 'accountant' ? 'finance' : 'dashboard') : initialTab)
    : (currentRole === 'accountant' ? 'finance' : 'dashboard');

  const [moduleTab, setModuleTab] = useState<'dashboard' | 'apply' | 'admin' | 'reports' | 'finance' | 'roles' | 'pass'>(defaultTab);

  React.useEffect(() => {
    if (initialTab) {
      if (initialTab === 'apply' && !canApply) {
        setModuleTab(currentRole === 'accountant' ? 'finance' : 'dashboard');
      } else {
        setModuleTab(initialTab);
      }
    }
  }, [initialTab, canApply, currentRole]);

  // If role switches to accountant while on apply tab, reroute immediately
  React.useEffect(() => {
    if (!canApply && moduleTab === 'apply') {
      setModuleTab(currentRole === 'accountant' ? 'finance' : 'dashboard');
    }
  }, [currentRole, canApply, moduleTab]);

  let totalBeds = 0;
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  return (
    <div className="space-y-6">
      {/* Module Sub-Header */}
      <div className="bg-white rounded-3xl border border-sky-100 p-4 sm:p-5 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0F6FBF] text-white flex items-center justify-center font-bold shadow-xs">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#0A1931]">
                Bed Space & Hostel Management Module
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleProfile.badgeColor}`}>
                {roleProfile.shortLabel} View
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Nkana College of Applied Sciences & Education • {vacantBeds} Vacant Bed Spaces Available
            </p>
          </div>
        </div>

        {/* Dynamic Role-Based Sub-tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
          {/* Live Availability Grid - Available to all roles */}
          <button
            onClick={() => setModuleTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              moduleTab === 'dashboard'
                ? 'bg-[#0F6FBF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Availability Grid</span>
          </button>

          {/* Apply For Bed Space - ONLY SHOWN TO ROLES WITH canApplyForBed (Students/Applicants).
              CRUCIALLY HIDDEN FROM ACCOUNTANT, STAFF, ETC. */}
          {canApply && (
            <button
              onClick={() => setModuleTab('apply')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                moduleTab === 'apply'
                  ? 'bg-[#0F6FBF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bed className="w-3.5 h-3.5" />
              <span>Apply For Bed Space</span>
            </button>
          )}

          {/* Student Pass - Student role */}
          {currentRole === 'student' && (
            <button
              onClick={() => setModuleTab('pass')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                moduleTab === 'pass'
                  ? 'bg-[#0F6FBF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>My Resident Pass</span>
            </button>
          )}

          {/* Accountant Finance & Reconciliation - Available to Accountant and Admin */}
          {(currentRole === 'accountant' || currentRole === 'admin') && (
            <button
              onClick={() => setModuleTab('finance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                moduleTab === 'finance'
                  ? 'bg-[#0F6FBF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Bursar Reconciliations</span>
            </button>
          )}

          {/* Warden Desk & RBAC - Available to Staff and Admin */}
          {(currentRole === 'staff' || currentRole === 'admin') && (
            <button
              onClick={() => setModuleTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                moduleTab === 'admin'
                  ? 'bg-[#0F6FBF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Warden Desk & Roll-Call</span>
              {expiryAlerts.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                  moduleTab === 'admin' ? 'bg-amber-400 text-amber-950' : 'bg-amber-200 text-amber-900'
                }`}>
                  {expiryAlerts.length}
                </span>
              )}
            </button>
          )}

          {/* Daily Reports - Available to Staff, Accountant, and Admin */}
          {(currentRole === 'staff' || currentRole === 'accountant' || currentRole === 'admin') && (
            <button
              onClick={() => setModuleTab('reports')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                moduleTab === 'reports'
                  ? 'bg-[#0F6FBF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Daily PDF Reports</span>
            </button>
          )}

          {/* Roles Dashboard Tab - Quick access for all staff/admin */}
          <button
            onClick={() => setModuleTab('roles')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              moduleTab === 'roles'
                ? 'bg-[#0F6FBF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>User Roles Dashboard</span>
          </button>
        </div>
      </div>

      {/* Role Segregation Notice Banner for Accountant */}
      {currentRole === 'accountant' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Privilege Filter Enforced:</span> You are viewing the accommodation system under the <strong>Bursar & Finance Officer</strong> role. "Apply For Bed Space" has been automatically hidden from your navigation. You have full access to fee reconciliations, payment settlements, and roll-call reports.
            </div>
          </div>
          <button
            onClick={() => setActiveTab('user_roles')}
            className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-[11px] font-bold text-amber-900 shrink-0 transition-colors"
          >
            Manage Privileges
          </button>
        </div>
      )}

      {/* Module Content */}
      <div>
        {moduleTab === 'dashboard' && <DormStatusDashboard />}
        {moduleTab === 'apply' && canApply && <ApplicationPortal />}
        {moduleTab === 'apply' && !canApply && (
          <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1931]">Access Restricted</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applying for hostel bed space is restricted to student accounts. The {roleProfile.title} role does not submit personal room applications.
            </p>
            <button
              onClick={() => setModuleTab(currentRole === 'accountant' ? 'finance' : 'dashboard')}
              className="px-4 py-2 bg-[#0F6FBF] text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
            >
              <span>Return to {currentRole === 'accountant' ? 'Finance Reconciliations' : 'Availability Grid'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {moduleTab === 'finance' && <AccountantFinanceView />}
        {moduleTab === 'admin' && <AdminBedSpaceManagement />}
        {moduleTab === 'reports' && <DailyReportsView />}
        {moduleTab === 'roles' && <UserRolesDashboard />}
        {moduleTab === 'pass' && <StudentPortal />}
      </div>
    </div>
  );
};
