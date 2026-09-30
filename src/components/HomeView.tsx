import React from 'react';
import { useApp } from '../context/AppContext';
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
    <div className="space-y-12 pb-16">
      {/* Hero Section: Clean, Background Photo FULLY VISIBLE, No Green Placards! */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-sky-100">
        <div className="relative min-h-[520px] lg:min-h-[600px] flex items-end">
          {/* Main Campus Background Photo - High-fidelity authentic campus photo */}
          <img
            src="/src/assets/images/nkana_actual_campus_1790778970206.jpg"
            alt="Nkana College of Applied Sciences and Education Campus Grounds in Kitwe Zambia"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gentle, subtle gradient at bottom only to keep text readable while picture remains 100% visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>

          {/* Top Tag: Location & Accreditation Pill matching uploaded mobile screenshot */}
          <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap justify-between items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-sky-900 text-xs font-bold shadow-md backdrop-blur-md border border-white/80">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span>Kitwe Teaching Hospital Grounds, Kuomboka Rd, Kitwe, Zambia</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-600/90 text-white text-xs font-bold shadow-md backdrop-blur-md border border-sky-400/40">
              <span>2026/2027 Academic Intake Open</span>
            </span>
          </div>

          {/* Hero Content Overlay (Positioned cleanly at bottom) */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 text-white space-y-5">
            <div className="max-w-3xl space-y-2.5">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-300">
                Ministry of Health & NMCZ Accredited Higher Institution
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
                Nkana College Of Applied Sciences And Education
              </h1>
              <p className="text-sm sm:text-base text-slate-100 font-medium max-w-2xl drop-shadow-sm leading-relaxed">
                Premier training institution for Registered Nursing, Certified Midwifery, Clinical Medicine & Education. Experience state-of-the-art campus facilities and guaranteed residential accommodation.
              </p>
            </div>

            {/* Vertically Stacked & Grid Action Buttons (Formatted precisely per user's mobile layout) */}
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

                {/* Bed Space Management Quick Access */}
                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <Bed className="w-4 h-4 text-slate-950" />
                  <span>Hostel Bed Spaces ({vacantBeds} Vacant)</span>
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
              Life at Nkana College in Kitwe
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Actual photo gallery of our educational infrastructure, clinical wards, residential halls, and libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Actual Campus Grounds & Admin Building */}
          <div className="bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/src/assets/images/nkana_actual_campus_1790778970206.jpg"
                alt="Nkana College of Applied Sciences and Education Main Campus Grounds"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Main Campus Grounds
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Academic & Administrative Complex</h3>
              <p className="text-xs text-slate-500 mt-1">
                Located on Kuomboka Road, Kitwe with modern faculty offices, registry, and landscaped grounds.
              </p>
            </div>
          </div>

          {/* Card 2: Actual Nursing & Clinical Students */}
          <div className="bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/src/assets/images/nkana_clinical_students_1790778996968.jpg"
                alt="Nursing and Healthcare students at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
                Nursing & Midwifery Cohort
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900">Clinical Healthcare Training</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct bedside training and laboratory rotations affiliated with Kitwe Teaching Hospital.
              </p>
            </div>
          </div>

          {/* Card 3: Actual Student Hostel Dormitories */}
          <div className="bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/src/assets/images/nkana_hostel_grounds_1790779008294.jpg"
                alt="Student residential hostel at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
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

          {/* Card 4: Actual Lecture Hall & Computer Library */}
          <div className="bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/src/assets/images/nkana_lecture_hall_1790779019428.jpg"
                alt="Lecture hall and e-library at Nkana College"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10px] font-bold shadow-xs">
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                New Enrollment Portal
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

      {/* Academic Faculties Grid */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Direct Entry Diplomas
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Faculties at Nkana College Of Applied Sciences And Education
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('programs')}
            className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
          >
            <span>View All Programs & Requirements</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Registered Nursing Diploma (RN)', duration: '3 Years Full-Time', council: 'NMCZ Accredited' },
            { title: 'Certified Midwifery Diploma', duration: '2 Years Full-Time', council: 'NMCZ Accredited' },
            { title: 'Clinical Medicine Diploma', duration: '3 Years Full-Time', council: 'HPCZ Accredited' },
            { title: 'Biomedical Laboratory Sciences', duration: '3 Years Full-Time', council: 'HPCZ Accredited' },
            { title: 'Primary Teachers Diploma', duration: '3 Years Full-Time', council: 'TCZ Accredited' },
            { title: 'Higher Diploma in Health Education', duration: '2 Years In-Service', council: 'Postgraduate Directorate' }
          ].map((prog, idx) => (
            <div key={idx} className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 flex justify-between items-center hover:bg-sky-50 transition-colors">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{prog.title}</h4>
                <p className="text-[11px] text-slate-500">{prog.duration} • {prog.council}</p>
              </div>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="px-2 py-1 text-[11px] font-bold text-sky-700 hover:bg-white rounded border border-sky-200"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>

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
            <span>Admissions Bulletin 2027</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            January 2027 Intake & Mid-Year Applications Now Open
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prospective applicants for Registered Nursing, Midwifery, and Clinical Medicine can now complete enrollment online with instant ECZ result validation.
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
