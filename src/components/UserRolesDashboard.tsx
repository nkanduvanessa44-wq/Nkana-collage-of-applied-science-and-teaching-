import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ROLE_PROFILES,
  PRIVILEGE_DEFINITIONS,
  getRoleProfile
} from '../data/rolesData';
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  DollarSign,
  Building2,
  Lock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  Info,
  Users,
  Key,
  FileText,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export const UserRolesDashboard: React.FC = () => {
  const { currentRole, setCurrentRole, setActiveTab, students } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'student');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const activeProfile = getRoleProfile(currentRole);
  const selectedProfile = getRoleProfile(selectedRole);

  const handleSwitchRole = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentRole(role);
    const prof = getRoleProfile(role);
    setFeedbackMsg(`Active portal session switched to: ${prof.title} (${prof.defaultUserName})`);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleLaunchRoleWorkspace = () => {
    if (currentRole === 'accountant') {
      setActiveTab('accountant_finance');
    } else if (currentRole === 'student') {
      setActiveTab('student_resident_pass');
    } else if (currentRole === 'lecturer') {
      setActiveTab('lecturer_results');
    } else if (currentRole === 'staff') {
      setActiveTab('daily_reports');
    } else if (currentRole === 'admissions') {
      setActiveTab('online_admission');
    } else {
      setActiveTab('admin_staff');
    }
  };

  const roleList: UserRole[] = ['student', 'lecturer', 'accountant', 'staff', 'admin', 'admissions'];

  const filteredPrivileges = filterCategory === 'all'
    ? PRIVILEGE_DEFINITIONS
    : PRIVILEGE_DEFINITIONS.filter(p => p.category === filterCategory);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F0FF] text-[#0F6FBF] border border-[#BFDBFE]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nkana College Role-Based Access Control (RBAC)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A1931] tracking-tight">
              User Roles & Privileges Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Enforce role privileges across student accommodation, bursary reconciliation, warden desks, and administration. Every role sees only their authorized portal tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleLaunchRoleWorkspace}
              className="px-5 py-3 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#0F6FBF]/20 transition-all active:scale-95"
            >
              <span>Open {activeProfile.shortLabel} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Active Session Pill Bar */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F6FBF] text-white flex items-center justify-center font-bold text-base shadow-xs">
              {currentRole === 'student' ? <GraduationCap className="w-5 h-5" /> : currentRole === 'lecturer' ? <BookOpen className="w-5 h-5" /> : currentRole === 'accountant' ? <DollarSign className="w-5 h-5" /> : currentRole === 'staff' ? <UserCheck className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#0A1931]">
                  Current Persona: {activeProfile.defaultUserName}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${activeProfile.badgeColor}`}>
                  {activeProfile.title}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {activeProfile.department} • ID: {activeProfile.staffOrStudentId}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('admin_staff')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#0F6FBF]" />
              <span>Admin Staff Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('lecturer_results')}
              className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              <span>Student Results Entry</span>
            </button>
          </div>
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Role Switcher Cards Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-[#0A1931]">
              Switch Active User Role & Test Privileges
            </h2>
            <p className="text-xs text-slate-500">
              Select an account role below to immediately preview and test what that role sees across the portal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {roleList.map((role) => {
            const prof = ROLE_PROFILES[role];
            const isActive = currentRole === role;

            return (
              <div
                key={role}
                onClick={() => handleSwitchRole(role)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isActive
                    ? 'border-[#0F6FBF] bg-[#E6F0FF]/40 shadow-sm ring-1 ring-[#0F6FBF]'
                    : 'border-gray-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isActive ? 'bg-[#0F6FBF] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {role === 'student' && <GraduationCap className="w-4 h-4" />}
                      {role === 'lecturer' && <BookOpen className="w-4 h-4" />}
                      {role === 'accountant' && <DollarSign className="w-4 h-4" />}
                      {role === 'staff' && <UserCheck className="w-4 h-4" />}
                      {role === 'admin' && <ShieldCheck className="w-4 h-4" />}
                      {role === 'admissions' && <FileText className="w-4 h-4" />}
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F6FBF] bg-white px-2 py-0.5 rounded-full border border-sky-200">
                        <CheckCircle2 className="w-3 h-3 text-[#0F6FBF]" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        Click to activate
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#0A1931]">{prof.title}</h3>
                  <span className="text-[11px] font-medium text-slate-600 block mt-0.5 truncate">
                    {prof.defaultUserName}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {prof.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Key Highlight:
                  </div>
                  {role === 'accountant' && (
                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-1 rounded block border border-amber-200">
                      🚫 "Apply for bed space" hidden
                    </span>
                  )}
                  {role === 'lecturer' && (
                    <span className="text-[11px] font-semibold text-teal-900 bg-teal-50 px-2 py-1 rounded block border border-teal-200">
                      ✓ Student Results Entry
                    </span>
                  )}
                  {role === 'student' && (
                    <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-1 rounded block border border-emerald-200">
                      ✓ Bed application enabled
                    </span>
                  )}
                  {role === 'staff' && (
                    <span className="text-[11px] font-semibold text-indigo-900 bg-indigo-50 px-2 py-1 rounded block border border-indigo-200">
                      ✓ Physical check-in desk
                    </span>
                  )}
                  {role === 'admin' && (
                    <span className="text-[11px] font-semibold text-sky-900 bg-sky-50 px-2 py-1 rounded block border border-sky-200">
                      ✓ Full HR & Allocation
                    </span>
                  )}
                  {role === 'admissions' && (
                    <span className="text-[11px] font-semibold text-purple-900 bg-purple-50 px-2 py-1 rounded block border border-purple-200">
                      ✓ ECZ document review
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Privileges Matrix */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0A1931]">
              Privileges & Access Control Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Clear breakdown of authorized vs restricted permissions for each user role at Nkana College.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Category:</span>
            {['all', 'Accommodation', 'Finance & Bursar', 'Welfare & Roll-Call', 'Academics & Faculty', 'Administrative Control'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? 'bg-[#0F6FBF] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Privileges' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-slate-50/80 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 w-1/4">Privilege / Capability</th>
                <th className="py-3 px-2 text-center">Student</th>
                <th className="py-3 px-2 text-center bg-teal-50/50 text-teal-950">Lecturer</th>
                <th className="py-3 px-2 text-center bg-amber-50/50 text-amber-950">Accountant</th>
                <th className="py-3 px-2 text-center">Hostel Staff</th>
                <th className="py-3 px-2 text-center">Hostel Admin</th>
                <th className="py-3 px-2 text-center">Admissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrivileges.map((item) => {
                const isBedApply = item.key === 'canApplyForBed';

                return (
                  <tr key={item.key} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0A1931] flex items-center gap-2">
                        <span>{item.label}</span>
                        {isBedApply && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                            Requested Fix
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {item.description}
                      </span>
                    </td>

                    {/* Student */}
                    <td className="py-3.5 px-2 text-center">
                      {ROLE_PROFILES.student.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                          <XCircle className="w-3 h-3 text-slate-400" /> Restricted
                        </span>
                      )}
                    </td>

                    {/* Lecturer */}
                    <td className="py-3.5 px-2 text-center bg-teal-50/30">
                      {ROLE_PROFILES.lecturer.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                          <XCircle className="w-3 h-3 text-slate-400" /> Restricted
                        </span>
                      )}
                    </td>

                    {/* Accountant */}
                    <td className="py-3.5 px-2 text-center bg-amber-50/30">
                      {ROLE_PROFILES.accountant.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isBedApply
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          <Lock className="w-3 h-3" /> {isBedApply ? 'Excluded' : 'Restricted'}
                        </span>
                      )}
                    </td>

                    {/* Staff */}
                    <td className="py-3.5 px-2 text-center">
                      {ROLE_PROFILES.staff.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                          <XCircle className="w-3 h-3 text-slate-400" /> Restricted
                        </span>
                      )}
                    </td>

                    {/* Admin */}
                    <td className="py-3.5 px-2 text-center">
                      {ROLE_PROFILES.admin.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                          <XCircle className="w-3 h-3 text-slate-400" /> Restricted
                        </span>
                      )}
                    </td>

                    {/* Admissions */}
                    <td className="py-3.5 px-2 text-center">
                      {ROLE_PROFILES.admissions.privileges[item.key] ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                          <XCircle className="w-3 h-3 text-slate-400" /> Restricted
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Guidance Note */}
      <div className="bg-[#E6F0FF] rounded-3xl p-6 border border-[#BFDBFE] flex items-start gap-4 text-xs text-[#0A1931]">
        <div className="w-9 h-9 rounded-xl bg-[#0F6FBF] text-white flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-[#0A1931]">
            Nkana College IT Compliance & Segregation of Duties
          </h4>
          <p className="text-slate-600 leading-relaxed">
            In accordance with higher education administrative audit guidelines, non-student accounts (Bursar, Hostel Matrons, Administrators) are segregated from personal bed space applicant queues. The Bursary Department maintains read/write access to payment settlement ledgers and defaulter notifications without contaminating the applicant roster.
          </p>
        </div>
      </div>
    </div>
  );
};
