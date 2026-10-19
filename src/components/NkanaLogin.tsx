import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ROLE_PROFILES } from '../data/rolesData';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  DollarSign,
  UserCheck,
  FileText
} from 'lucide-react';

export default function NkanaLogin() {
  const { setCurrentRole, setActiveTab, students, setIsLoggedIn } = useApp();
  const [identifier, setIdentifier] = useState('2026/NK/RN/042');
  const [password, setPassword] = useState('••••••••••');
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggedIn(true);
    const cleanId = identifier.trim().toLowerCase();

    // Check if logging in as staff/lecturer/admin based on input, or default to student
    if (cleanId.includes('lec') || cleanId.includes('lecturer')) {
      setCurrentRole('lecturer');
      setLoginMessage('Signed in as Academic Lecturer (Dr. Mwila Chanda)');
      setTimeout(() => setActiveTab('lecturer_results'), 600);
    } else if (cleanId.includes('acc') || cleanId.includes('bursar') || cleanId.includes('finance')) {
      setCurrentRole('accountant');
      setLoginMessage('Signed in as Bursar & Accountant (Chileshe Mulenga)');
      setTimeout(() => setActiveTab('accountant_finance'), 600);
    } else if (cleanId.includes('admin') || cleanId.includes('dean')) {
      setCurrentRole('admin');
      setLoginMessage('Signed in as Dean of Students & HR Admin (Dr. Bwalya Kangwa)');
      setTimeout(() => setActiveTab('admin_staff'), 600);
    } else if (cleanId.includes('staff') || cleanId.includes('matron') || cleanId.includes('warden')) {
      setCurrentRole('staff');
      setLoginMessage('Signed in as Hostel Warden / Matron (Mrs. Grace Phiri)');
      setTimeout(() => setActiveTab('daily_reports'), 600);
    } else if (cleanId.includes('admissions')) {
      setCurrentRole('admissions');
      setLoginMessage('Signed in as Admissions Officer');
      setTimeout(() => setActiveTab('online_admission'), 600);
    } else {
      // Default student resident sign in
      setCurrentRole('student');
      setLoginMessage(`Welcome back, ${students[0]?.fullName || 'Chola Mwape'}! Accessing student portal...`);
      setTimeout(() => setActiveTab('student_resident_pass'), 600);
    }
  };

  const handleQuickPersonaSelect = (role: UserRole) => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    if (role === 'student') {
      setIdentifier('2026/NK/RN/042');
      setActiveTab('student_resident_pass');
    } else if (role === 'lecturer') {
      setIdentifier('lecturer@nkanacollege.edu.zm');
      setActiveTab('lecturer_results');
    } else if (role === 'accountant') {
      setIdentifier('bursar@nkanacollege.edu.zm');
      setActiveTab('accountant_finance');
    } else if (role === 'admin') {
      setIdentifier('dean.admin@nkanacollege.edu.zm');
      setActiveTab('admin_staff');
    } else if (role === 'staff') {
      setIdentifier('warden@nkanacollege.edu.zm');
      setActiveTab('daily_reports');
    } else {
      setIdentifier('admissions@nkanacollege.edu.zm');
      setActiveTab('online_admission');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background photo showing through - KEY */}
      <img
        src="/nkana-campus.jpg"
        alt="Nkana College Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>

      {/* Top Floating Utility Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => setActiveTab('home')}
          className="px-4 py-2 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/60 text-blue-900 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to College Website</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowRolesDropdown(!showRolesDropdown)}
            className="px-4 py-2 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/60 text-blue-900 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Select Staff / Faculty Role</span>
          </button>

          {showRolesDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 p-2 space-y-1 text-xs z-30 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 font-bold text-slate-700 border-b border-slate-100 flex items-center justify-between">
                <span>Select Portal Persona:</span>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">1-Click</span>
              </div>
              <button
                onClick={() => handleQuickPersonaSelect('student')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-xs font-bold">Student Resident</div>
                  <div className="text-[10px] text-slate-500">Hostel Pass & Bed Application</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickPersonaSelect('lecturer')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-teal-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <BookOpen className="w-4 h-4 text-teal-600" />
                <div>
                  <div className="text-xs font-bold">Academic Lecturer</div>
                  <div className="text-[10px] text-slate-500">Student Results Entry (CA, OSCE, Exam)</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickPersonaSelect('accountant')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <DollarSign className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="text-xs font-bold">Bursar / Accountant</div>
                  <div className="text-[10px] text-slate-500">MoMo Reconciliations & Audits</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickPersonaSelect('admin')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-indigo-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="text-xs font-bold">Dean / HR Admin</div>
                  <div className="text-[10px] text-slate-500">Staff Control & Results Approval</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickPersonaSelect('staff')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <UserCheck className="w-4 h-4 text-slate-600" />
                <div>
                  <div className="text-xs font-bold">Hostel Staff / Warden</div>
                  <div className="text-[10px] text-slate-500">Physical Check-in & Key Issuance</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <img
          src="/nkana-logo.png"
          alt="Nkana College Logo"
          className="w-32 h-32 rounded-full shadow-xl border-4 border-white/30 object-cover bg-white"
        />
        <h1 className="text-blue-800 font-bold text-xl mt-4 drop-shadow-sm">Nkana College</h1>
        <p className="text-blue-700 text-sm">Secure student portal</p>

        {/* Login notification badge */}
        {loginMessage && (
          <div className="mt-4 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{loginMessage}</span>
          </div>
        )}

        {/* GLASS INPUTS - Background shows through */}
        <form onSubmit={handleSignIn} className="w-full max-w-sm mt-8 space-y-4">
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Student ID / Email"
            className="w-full px-5 py-4 rounded-2xl
            bg-white/40 backdrop-blur-xl border border-white/50
            placeholder:text-gray-600/80 text-gray-800 font-medium
            shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]
            focus:bg-white/60 focus:outline-none transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-5 py-4 rounded-2xl
            bg-white/40 backdrop-blur-xl border border-white/50
            placeholder:text-gray-600/80 text-gray-800
            shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]
            focus:bg-white/60 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-2xl
            bg-white/50 backdrop-blur-xl border border-white/60
            text-blue-800 font-bold text-lg
            shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_20px_rgba(0,0,0,0.1)]
            hover:bg-white/70 active:scale-[0.99] transition-all cursor-pointer"
          >
            Sign in
          </button>

          <p
            onClick={() => {
              setShowForgotModal(true);
              setForgotSent(false);
            }}
            className="text-center text-blue-700 text-sm mt-4 cursor-pointer hover:underline font-medium"
          >
            Forgot Password?
          </p>

          {/* Quick Demo Pre-fill Pill */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIdentifier('2026/NK/RN/042');
                setPassword('••••••••••');
              }}
              className="text-[11px] font-bold text-blue-900/80 hover:text-blue-950 bg-white/40 hover:bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Auto-fill Demo Student Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/80 p-6 rounded-3xl max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Reset Student Portal Password</h3>
            <p className="text-xs text-slate-600">
              Enter your student email address or Student Registration ID to receive a secure password reset link.
            </p>

            {forgotSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold">
                ✓ Reset instructions dispatched to your registered address!
              </div>
            ) : (
              <input
                type="text"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Student ID (e.g. 2026/NK/RN/042)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Send Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { NkanaLogin };
