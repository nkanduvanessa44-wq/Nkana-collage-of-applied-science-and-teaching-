import React from 'react';
import { useApp } from '../context/AppContext';
import { Programs } from './Programs';
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
  DoorOpen
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    rooms,
    halls,
    exportDailyReport,
    setSelectedHallId
  } = useApp();

  let totalBeds = 0;
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section: Clean, Background Photo FULLY VISIBLE, No Green Placards! */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-sky-100">
        <div className="relative min-h-[520px] lg:min-h-[600px] flex items-end">
          {/* Main Campus Background Photo - High-fidelity authentic campus photo */}
          <img
            src="/src/assets/images/nkana_actual_campus_1790778970206.jpg"
            alt="Nkana College of Applied Sciences and Education Campus Grounds"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Uniform dark overlay behind the text for maximum contrast and legibility */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Hero Content Overlay (Positioned cleanly at bottom, leaving the campus building visible through the contrast scrim) */}
          <div className="relative z-10 w-full p-5 sm:p-10 lg:p-12 text-white space-y-4">
            {/* Campus Location & Accreditation Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold shadow-xs backdrop-blur-md border border-white/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Plot 7562, 27th St, Nkana East, Kitwe (near Mpelembe Sec)</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-md border border-white/30 shadow-xs">
                Ministry of Health, NMCZ, HPCZ & TCZ Accredited
              </span>
            </div>

            <div className="max-w-3xl space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
                <span>Nkana College Of Applied </span>
                <span
                  style={{
                    color: '#FF8C00',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 18px rgba(255, 140, 0, 0.45)'
                  }}
                  className="font-black drop-shadow-md"
                >
                  Sciences And Education
                </span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-white font-medium max-w-2xl drop-shadow-sm leading-relaxed">
                Premier training institution offering Diplomas in Registered Nursing, Midwifery, Clinical Medicine (Clinical Officer General), Environmental Health Technology, and Primary & Secondary Education.
              </p>
            </div>

            {/* Vertically Stacked & Grid Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('online_admission')}
                  className="px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition-all active:scale-95 flex items-center gap-2.5"
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                  <span>Apply Online</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => setActiveTab('application_tracker')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-sky-900 font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>Track Application</span>
                </button>

                <button
                  onClick={() => setActiveTab('student_resident_pass')}
                  className="px-6 py-3.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-white font-bold text-sm border border-sky-400/40 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-sky-300" />
                  <span>Student Portal</span>
                </button>

                {/* Bed Space Management Quick Access (Requirement 2 Fix) */}
                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="px-6 py-3.5 rounded-xl bg-[#FF8C00] hover:bg-[#e67e00] text-white font-extrabold text-sm flex items-center gap-2.5 shadow-lg shadow-orange-950/25 active:scale-95 transition-all"
                >
                  <Bed className="w-5 h-5 text-white" />
                  <span>Hostel Bed Spaces</span>
                  <span className="bg-white text-[#FF8C00] text-xs px-2.5 py-0.5 rounded-full font-black shadow-xs">
                    {vacantBeds > 0 ? `${vacantBeds} Vacant` : 'Check Availability'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Gallery Showcase (Visible Pictures, Light Blue & White Cards) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-sky-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Campus Facilities & Infrastructure
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Life at Nkana College
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Actual photo gallery of our educational infrastructure, clinical wards, residential halls, and libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card 1: Actual College Entrance Gate (with blur background & descriptive alt text) */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_college_gate_1790746735611.jpg"
                alt="Nkana College Official Entrance Gate at Plot 7562, 27th Street Nkana East Kitwe"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-xl pointer-events-none"></div>
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs backdrop-blur-xs">
                Campus Security Entrance
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Official Campus Gate</h3>
              <p className="text-xs text-slate-500 mt-1">
                Secured 24/7 access control point with gated perimeter and visitor registration desk.
              </p>
            </div>
          </div>

          {/* Card 2: Actual Nursing & Clinical Students */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_clinical_students_1790778996968.jpg"
                alt="Registered Nursing and Healthcare trainee cohort practicing clinical protocols at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Nursing & Healthcare Cohort
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Clinical Healthcare Training</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct bedside training and laboratory rotations affiliated with certified teaching medical facilities.
              </p>
            </div>
          </div>

          {/* Card 3: Actual Medical Students Group */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_medical_students_1790746758786.jpg"
                alt="Clinical Officer General medical scholars during campus lectures at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Medical & Clinical Scholars
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Clinical Officer General</h3>
              <p className="text-xs text-slate-500 mt-1">
                Hands-on practical medical instruction in diagnosis, patient care, and emergency triage.
              </p>
            </div>
          </div>

          {/* Card 4: Actual Library & Research Study Hall */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_students_library_1790746747471.jpg"
                alt="Nkana College Academic Library and research reading hall with students"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Academic Library
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Research & Study Center</h3>
              <p className="text-xs text-slate-500 mt-1">
                Extensive catalog of medical textbooks, quiet study cubicles, and Wi-Fi research tables.
              </p>
            </div>
          </div>

          {/* Card 5: Actual Student Hostel Dormitories */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_hostel_grounds_1790779008294.jpg"
                alt="Nkana College On-Campus Student Residential Halls and Hostel Courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                On-Campus Hostels
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Student Residential Halls</h3>
              <p className="text-xs text-slate-500 mt-1">
                4 designated hostel halls with solar water heating, high-speed Wi-Fi, and 24/7 matron security.
              </p>
            </div>
          </div>

          {/* Card 6: Actual Dormitory Complex */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_dormitory_hostel_1790746770090.jpg"
                alt="Nkana College Spacious Residential Dormitory Block and living quarters"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Residential Dormitories
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Spacious Resident Wings</h3>
              <p className="text-xs text-slate-500 mt-1">
                Well-ventilated single, double, and quad rooms equipped with individual study desks and wardrobes.
              </p>
            </div>
          </div>

          {/* Card 7: Actual Lecture Hall & Computer Library */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="h-[220px] overflow-hidden relative rounded-xl bg-slate-900">
              <img
                src="/src/assets/images/nkana_lecture_hall_1790779019428.jpg"
                alt="Nkana College Modern Lecture Theaters and audio-visual instructional room"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Lecture Hall & E-Library
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Modern Lecture Theaters</h3>
              <p className="text-xs text-slate-500 mt-1">
                Spacious audio-visual lecture rooms and high-speed digital research terminals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two Modules Feature Strip: 1. Bed Space Module | 2. Online Admission Module */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {/* Module 1: Bed Space Management Module */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-sm space-y-4 hover:border-sky-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
              <Bed className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Accommodation System
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Bed Space Management Module
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Complete platform for tracking room occupancy and student details, managing vacant bed spaces, processing student bed space applications, and real-time monitoring of dorm availability for administrators.
              </p>
            </div>

            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Real-time visual room floorplan & interactive bed grid</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Automated student check-in and check-out alert notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Mobile money (MTN MoMo, Airtel, Zamtel) & Card payments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Role-based access control (RBAC) securing student NRCs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Export daily reports & occupancy documentation to PDF</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('bed_spaces')}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Open Dorm Dashboard</span>
            </button>
            <button
              onClick={() => exportDailyReport()}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-700" />
              <span>Daily PDF Report</span>
            </button>
          </div>
        </div>

        {/* Module 2: Online Admission Portal for New Students */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-sm space-y-4 hover:border-sky-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E6F0FF] text-[#0F6FBF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full shadow-2xs">
                New Student Admissions 2026/2027
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Online Student Admissions Portal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Apply online for January 2027 or Mid-Year intake. Fast document uploads, instant ECZ grade entry, and mobile application fee payment.
              </p>
            </div>

            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span><strong>Document Upload:</strong> NRC copy, ECZ Statement of Results, photo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span><strong>Application Fee:</strong> K150 payment via MoMo or Card</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span><strong>Application Tracking:</strong> Check review status via Reference #</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span><strong>Offer Letter:</strong> Instant PDF admission letter download upon vetting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Seamless priority bridge to Hostel Bed Space reservation</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
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
              <span>Track Application</span>
            </button>
          </div>
        </div>
      </section>

      {/* Academic Faculties Grid & Program Directory */}
      <Programs />

      {/* Residential Halls & Live Dorm Availability Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-sky-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Student Accommodation & Hostels
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              On-Campus Residential Halls
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('bed_spaces')}
            className="text-xs font-bold text-sky-700 hover:text-sky-600 flex items-center gap-1 hover:underline"
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
                className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={hall.image}
                      alt={hall.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/95 text-sky-900 shadow-xs border border-white">
                        {hall.code}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-sky-900/90 text-white backdrop-blur-xs">
                        {hall.genderAllowed === 'female' ? 'Female Wing' : hall.genderAllowed === 'male' ? 'Male Wing' : 'Mixed Wings'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{hall.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{hall.description}</p>
                    </div>

                    {/* Vacancy Meter */}
                    <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-slate-500 block">Available Bed Spaces:</span>
                        <strong className="text-xs font-black text-sky-800">
                          {hallVacantBeds} Vacant Spaces
                        </strong>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-mono">
                        {hallTotalBeds - hallVacantBeds} / {hallTotalBeds} Occupied
                      </span>
                    </div>

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1">
                      {hall.amenities.slice(0, 3).map((amenity, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedHallId(hall.id);
                      setActiveTab('bed_spaces');
                    }}
                    className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold text-center transition-all shadow-xs"
                  >
                    View Room Layout
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHallId(hall.id);
                      setActiveTab('apply_bed');
                    }}
                    className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold text-center border border-sky-200 transition-all"
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
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase">
            <Calendar className="w-4 h-4" />
            <span>Admissions & Intakes</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Main January & July/August Mid-Year Intakes
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Main intakes in January across all programs. Mid-year intakes (July/August) available for Nursing and Clinical Medicine. Requires 5 "O" level credits (English, Math, Science/Biology).
          </p>
          <button
            onClick={() => setActiveTab('online_admission')}
            className="text-xs font-bold text-sky-700 hover:underline pt-1 inline-flex items-center gap-1"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notice 2 */}
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase">
            <Bed className="w-4 h-4" />
            <span>Hostel Check-In Protocol</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Automated Check-In / Check-Out Stations
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students allocated rooms can pick up room keys at the Matron / Warden Desk. Real-time alerts are logged automatically into college administrative records.
          </p>
          <button
            onClick={() => setActiveTab('student_resident_pass')}
            className="text-xs font-bold text-sky-700 hover:underline pt-1 inline-flex items-center gap-1"
          >
            <span>View Resident Pass</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notice 3 */}
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Campus Security & Safety</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            24/7 Monitored Residential Security
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Perimeter wall with gated access control, dedicated security officers, backup solar lighting, and continuous pressurized borehole drinking water.
          </p>
          <button
            onClick={() => setActiveTab('contact')}
            className="text-xs font-bold text-sky-700 hover:underline pt-1 inline-flex items-center gap-1"
          >
            <span>Campus Map & Contacts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>
    </div>
  );
};
