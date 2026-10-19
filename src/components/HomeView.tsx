import React from 'react';
import { useApp } from '../context/AppContext';
import { Programs } from './Programs';
import { NkanaMobileAppHero } from './NkanaMobileAppHero';
import { UserRole } from '../types';
import { getRoleProfile, ROLE_PROFILES } from '../data/rolesData';
import {
  Building2,
  Bed,
  Activity,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileDown,
  Sparkles,
  Users,
  Smartphone,
  Calendar,
  Award,
  GraduationCap,
  Upload,
  Search,
  BookOpen,
  FileCheck,
  DoorOpen,
  DollarSign,
  AlertTriangle,
  Lock,
  UserPlus
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    rooms,
    halls,
    exportDailyReport,
    setSelectedHallId,
    currentRole,
    setCurrentRole,
    staffMembers,
    studentResults
  } = useApp();

  let totalBeds = 0;
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  const roleProfile = getRoleProfile(currentRole);

  const roleList: UserRole[] = ['student', 'lecturer', 'accountant', 'staff', 'admin', 'admissions'];

  return (
    <div className="w-full pb-24">
      {/* Clean Modern Mobile App Hero Screen for Nkana College, Vertical 9:16, Full-Bleed */}
      <NkanaMobileAppHero />

      {/* Campus Content Sections (Life at Nkana, Infrastructure, Dorms) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8">

      {/* Campus Gallery Showcase (Visible Pictures, Light Blue & White Cards) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-white/20 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Campus Facilities & Infrastructure
            </span>
            <h2 className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-tight">
              Life at Nkana College
            </h2>
          </div>
          <p className="text-xs text-white/90 font-medium max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            Actual photo gallery of our educational infrastructure, clinical wards, residential halls, and libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card 1: Actual College Entrance Gate */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_college_gate_1790746735611.jpg"
                alt="Nkana College Official Entrance Gate at Plot 7562, 27th Street Nkana East Kitwe"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Campus Security Entrance
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Official Campus Gate</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Secured 24/7 access control point with gated perimeter and visitor registration desk.
              </p>
            </div>
          </div>

          {/* Card 2: Actual Nursing & Clinical Students */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_clinical_students_1790778996968.jpg"
                alt="Registered Nursing and Healthcare trainee cohort practicing clinical protocols at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Nursing & Healthcare Cohort
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Clinical Healthcare Training</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Direct bedside training and laboratory rotations affiliated with certified teaching medical facilities.
              </p>
            </div>
          </div>

          {/* Card 3: Actual Medical Students Group */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_medical_students_1790746758786.jpg"
                alt="Clinical Officer General medical scholars during campus lectures at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Medical & Clinical Scholars
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Clinical Officer General</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Hands-on practical medical instruction in diagnosis, patient care, and emergency triage.
              </p>
            </div>
          </div>

          {/* Card 4: Actual Library & Research Study Hall */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_students_library_1790746747471.jpg"
                alt="Nkana College Academic Library and research reading hall with students"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Academic Library
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Research & Study Center</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Extensive catalog of medical textbooks, quiet study cubicles, and Wi-Fi research tables.
              </p>
            </div>
          </div>

          {/* Card 5: Actual Student Hostel Dormitories */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_hostel_grounds_1790779008294.jpg"
                alt="Nkana College On-Campus Student Residential Halls and Hostel Courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                On-Campus Hostels
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Student Residential Halls</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                4 designated hostel halls with solar water heating, high-speed Wi-Fi, and 24/7 matron security.
              </p>
            </div>
          </div>

          {/* Card 6: Actual Dormitory Complex */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_dormitory_hostel_1790746770090.jpg"
                alt="Nkana College Spacious Residential Dormitory Block and living quarters"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Residential Dormitories
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Spacious Resident Wings</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Well-ventilated single, double, and quad rooms equipped with individual study desks and wardrobes.
              </p>
            </div>
          </div>

          {/* Card 7: Actual Lecture Hall & Computer Library */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl overflow-hidden border border-white/30 shadow-md hover:bg-white/35 transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900/40">
              <img
                src="/src/assets/images/nkana_lecture_hall_1790779019428.jpg"
                alt="Nkana College Modern Lecture Theaters and audio-visual instructional room"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/40">
                Lecture Hall & E-Library
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Modern Lecture Theaters</h3>
              <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-1 font-medium">
                Spacious audio-visual lecture rooms and high-speed digital research terminals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two Modules Feature Strip: Role-Based Segregation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {/* 1. ACCOUNTANT MODULES: Bursar Reconciliations + Room Occupancy Audit (No personal Apply!) */}
        {currentRole === 'accountant' && (
          <>
            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/30 text-amber-200 border border-amber-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-300/30 backdrop-blur-md">
                    Bursar Directorate
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Fee Reconciliations & Payment Gateway
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Verify and reconcile mobile money deposits (MTN MoMo, Airtel Money, Zamtel) and bank settlements. Generate official receipt vouchers for audited accounts.
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Real-time MoMo transaction status & automated Kwacha ledger</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Defaulter tracking with auto-calculated days to allocation expiry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Export financial audit ledger and receipt reconciliations</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('accountant_finance')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Open Bursar Reconciliations</span>
                </button>
                <button
                  onClick={() => exportDailyReport()}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-amber-300" />
                  <span>Financial Audit PDF</span>
                </button>
              </div>
            </div>

            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 border border-sky-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <Bed className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider bg-sky-500/25 px-2.5 py-0.5 rounded-full border border-sky-300/30 backdrop-blur-md">
                    Hostel Auditor View
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Live Bed Space & Occupancy Grid
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Audit real-time hostel bed occupancy across all 4 halls. Inspect student allocations and fee balances without application privileges.
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Real-time color-coded room status (Vacant, Occupied, Reserved)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Filter by hall: Main Campus, Annex, Clinical, Teachers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Instant room balance audit for Bursar clearance verification</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Open Bed Space Live Grid</span>
                </button>
                <button
                  onClick={() => setActiveTab('user_roles')}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  <span>Privilege Policy</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* 2. LECTURER MODULES: Student Results Entry & Academic Curriculum */}
        {currentRole === 'lecturer' && (
          <>
            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/30 text-teal-200 border border-teal-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider bg-teal-500/25 px-2.5 py-0.5 rounded-full border border-teal-300/30 backdrop-blur-md">
                    Faculty Assessment Desk
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Student Results Entry & Gradebook
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Enter and update continuous assessment (CA /40), clinical practicum / OSCE (/20), and final semester examinations (/40) for nursing, clinical medicine, and education trainees.
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>Instant automatic calculation of total score (/100) and letter grades (A+ to F)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>NMCZ/HPCZ distinction, merit, credit, and supplementary grading bands</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>Batch save marks and submit course grade sheet for Senate endorsement</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('lecturer_results')}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Student Results Entry</span>
                </button>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-teal-300" />
                  <span>Course Curriculum</span>
                </button>
              </div>
            </div>

            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 border border-sky-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider bg-sky-500/25 px-2.5 py-0.5 rounded-full border border-sky-300/30 backdrop-blur-md">
                    Faculty Programs
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Schools of Health Sciences & Education
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Review accredited syllabus, curriculum outlines, and clinical internship guidelines for diploma courses.
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Registered Nursing & Midwifery (NMCZ Accredited)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Clinical Medicine & Environmental Health (HPCZ Accredited)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Primary & Secondary Teaching Diplomas (TCZ Accredited)</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('programs')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>View All Programs & Requirements</span>
                </button>
                <button
                  onClick={() => exportDailyReport()}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-sky-300" />
                  <span>Export Department Report</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* 3. ADMIN MODULES: Staff Management (Add/Delete/Retire/On Live) + Academic Governance */}
        {currentRole === 'admin' && (
          <>
            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 border border-sky-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider bg-sky-500/25 px-2.5 py-0.5 rounded-full border border-sky-300/30 backdrop-blur-md">
                    Executive Administration
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Staff & Personnel Control (HR Management)
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Manage institutional employee roster: add lecturers and other workers, delete records, and update employment status (Active / On Live, On Leave, Retired, Contract).
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Add new academic lecturers and non-teaching workers with NRC and qualifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Set status: Active / On Duty, On Leave (with date picker), and Retired</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Delete staff records with confirmation and export official HR Roster PDF</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('admin_staff')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Open Staff & HR Control ({staffMembers.length} Staff)</span>
                </button>
                <button
                  onClick={() => setActiveTab('user_roles')}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  <span>Manage Roles</span>
                </button>
              </div>
            </div>

            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/30 text-teal-200 border border-teal-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider bg-teal-500/25 px-2.5 py-0.5 rounded-full border border-teal-300/30 backdrop-blur-md">
                    Academic Governance
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Student Results Approval & Allocations
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Review and endorse continuous assessment and final examination scores submitted by lecturers. Override hostel allocations and manage bed reservations.
                  </p>
                </div>
                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>Approve course grades for Nursing, Midwifery, and Clinical Medicine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>Dean authorization for room key allocations and student welfare</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    <span>Comprehensive institutional oversight across finance and academics</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('lecturer_results')}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Review Student Results</span>
                </button>
                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <Bed className="w-3.5 h-3.5 text-teal-300" />
                  <span>Bed Space Allocations</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* 4. DEFAULT / STUDENT / ADMISSIONS MODULES */}
        {currentRole !== 'accountant' && currentRole !== 'lecturer' && currentRole !== 'admin' && (
          <>
            {/* Module 1: Bed Space Management Module */}
            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 border border-sky-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <Bed className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider bg-sky-500/25 px-2.5 py-0.5 rounded-full border border-sky-300/30 backdrop-blur-md">
                    Accommodation System
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Bed Space Management Module
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Complete platform for tracking room occupancy and student details, managing vacant bed spaces, processing student bed space applications, and real-time monitoring of dorm availability for administrators.
                  </p>
                </div>

                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Real-time visual room floorplan & interactive bed grid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Automated student check-in and check-out alert notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Mobile money (MTN MoMo, Airtel, Zamtel) & Card payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Role-based access control (RBAC) securing student NRCs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Export daily reports & occupancy documentation to PDF</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Open Dorm Dashboard</span>
                </button>
                <button
                  onClick={() => exportDailyReport()}
                  className="px-4 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-sky-300" />
                  <span>Daily PDF Report</span>
                </button>
              </div>
            </div>

            {/* Module 2: Online Admission Portal for New Students */}
            <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg space-y-4 hover:bg-white/35 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 border border-sky-300/30 flex items-center justify-center shadow-xs backdrop-blur-md">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-2xs">
                    New Student Admissions 2026/2027
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
                    Online Student Admissions Portal
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed mt-1">
                    Apply online for January 2027 or Mid-Year intake. Fast document uploads, instant ECZ grade entry, and mobile application fee payment.
                  </p>
                </div>

                <ul className="text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span><strong>Document Upload:</strong> NRC copy, ECZ Statement of Results, photo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span><strong>Application Fee:</strong> K150 payment via MoMo or Card</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span><strong>Application Tracking:</strong> Check review status via Reference #</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span><strong>Offer Letter:</strong> Instant PDF admission letter download upon vetting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <span>Seamless priority bridge to Hostel Bed Space reservation</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('online_admission')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Start Online Application</span>
                </button>
                <button
                  onClick={() => setActiveTab('application_tracker')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-sky-700" />
                  <span>Track Status</span>
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Academic Faculties Grid & Program Directory */}
      <Programs />

      {/* Residential Halls & Live Dorm Availability Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-white/20 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Student Accommodation & Hostels
            </span>
            <h2 className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-tight">
              On-Campus Residential Halls
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('bed_spaces')}
            className="text-xs font-bold text-sky-200 hover:text-white flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:underline"
          >
            <span>Open Interactive Dorm Availability Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {halls.map((hall) => {
            const hallRooms = rooms.filter(r => r.hallId === hall.id);
            let hallTotalBeds = 0;
            let hallVacantBeds = 0;
            hallRooms.forEach(r => {
              r.beds.forEach(b => {
                hallTotalBeds++;
                if (b.status === 'vacant') hallVacantBeds++;
              });
            });

            return (
              <div
                key={hall.id}
                className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 shadow-lg overflow-hidden flex flex-col justify-between hover:bg-white/35 transition-all group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-slate-900/40">
                    <img
                      src={hall.image}
                      alt={hall.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/30 text-white backdrop-blur-md shadow-xs border border-white/40">
                        {hall.code}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-sky-900/80 text-white backdrop-blur-xs">
                        {hall.genderAllowed === 'female' ? 'Female Wing' : hall.genderAllowed === 'male' ? 'Male Wing' : 'Mixed Wings'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div>
                      <h3 className="text-base font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{hall.name}</h3>
                      <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium line-clamp-2 mt-0.5">{hall.description}</p>
                    </div>

                    {/* Vacancy Meter */}
                    <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-white/80 block">Available Bed Spaces:</span>
                        <strong className="text-xs font-black text-sky-200 drop-shadow-sm">
                          {hallVacantBeds} Vacant Spaces
                        </strong>
                      </div>
                      <span className="text-[11px] font-bold text-white/90 font-mono">
                        {hallTotalBeds - hallVacantBeds} / {hallTotalBeds} Occupied
                      </span>
                    </div>

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1">
                      {hall.amenities.slice(0, 3).map((amenity, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white border border-white/30 backdrop-blur-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/20 mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedHallId(hall.id);
                      setActiveTab('bed_spaces');
                    }}
                    className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold text-center transition-all shadow-md"
                  >
                    View Room Layout
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHallId(hall.id);
                      setActiveTab('apply_bed');
                    }}
                    className="px-3 py-2 bg-white/25 hover:bg-white/35 text-white rounded-xl text-xs font-bold text-center border border-white/30 backdrop-blur-md transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* College Bulletins & Student Welfare Guarantee Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notice 1 */}
        <div className="p-5 rounded-2xl bg-white/25 backdrop-blur-[25px] border border-white/30 shadow-lg space-y-2 text-white">
          <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase drop-shadow-sm">
            <Calendar className="w-4 h-4" />
            <span>Admissions & Intakes</span>
          </div>
          <h4 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Main January & July/August Mid-Year Intakes
          </h4>
          <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed">
            Main intakes in January across all programs. Mid-year intakes (July/August) available for Nursing and Clinical Medicine. Requires 5 "O" level credits (English, Math, Science/Biology).
          </p>
          <button
            onClick={() => setActiveTab('online_admission')}
            className="text-xs font-bold text-sky-300 hover:text-white hover:underline pt-1 inline-flex items-center gap-1 drop-shadow-sm"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notice 2 */}
        <div className="p-5 rounded-2xl bg-white/25 backdrop-blur-[25px] border border-white/30 shadow-lg space-y-2 text-white">
          <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase drop-shadow-sm">
            <Bed className="w-4 h-4" />
            <span>Hostel Check-In Protocol</span>
          </div>
          <h4 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Automated Check-In / Check-Out Stations
          </h4>
          <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed">
            Students allocated rooms can pick up room keys at the Matron / Warden Desk. Real-time alerts are logged automatically into college administrative records.
          </p>
          <button
            onClick={() => setActiveTab('student_resident_pass')}
            className="text-xs font-bold text-sky-300 hover:text-white hover:underline pt-1 inline-flex items-center gap-1 drop-shadow-sm"
          >
            <span>View Resident Pass</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notice 3 */}
        <div className="p-5 rounded-2xl bg-white/25 backdrop-blur-[25px] border border-white/30 shadow-lg space-y-2 text-white">
          <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase drop-shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Campus Security & Safety</span>
          </div>
          <h4 className="text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            24/7 Monitored Residential Security
          </h4>
          <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium leading-relaxed">
            Perimeter wall with gated access control, dedicated security officers, backup solar lighting, and continuous pressurized borehole drinking water.
          </p>
          <button
            onClick={() => setActiveTab('contact')}
            className="text-xs font-bold text-sky-300 hover:text-white hover:underline pt-1 inline-flex items-center gap-1 drop-shadow-sm"
          >
            <span>Campus Map & Contacts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>
      </div>
    </div>
  );
};
