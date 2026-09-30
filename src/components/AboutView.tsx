import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Award,
  CheckCircle2,
  Users,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Hero Banner with Clean Light Overlay */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-100 shadow-md">
        <div className="relative h-72 sm:h-80 flex items-end">
          <img
            src="/src/assets/images/nkana_actual_campus_1790778970206.jpg"
            alt="Nkana College of Applied Sciences and Education Campus Grounds in Kitwe"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent"></div>

          <div className="relative z-10 p-6 sm:p-8 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-400/40">
              Institutional Heritage & Excellence
            </span>
            <h1 className="text-2xl sm:text-4xl font-black mt-2">
              About Nkana College Of Applied Sciences And Education
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl mt-1">
              Established in Kitwe, Copperbelt Province, Zambia, training compassionate healthcare professionals, registered nurses, and dedicated educators.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">National Accreditation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fully registered and accredited by the <strong>Nursing and Midwifery Council of Zambia (NMCZ)</strong>, the <strong>Health Professions Council of Zambia (HPCZ)</strong>, and the <strong>Teaching Council of Zambia (TCZ)</strong>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To be a benchmark African centre of excellence in applied health sciences, clinical research, patient-centered care, and modern teacher education.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Student-First Community</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Over 1,200 active scholars across on-campus residential hostels, modern simulation wards, and state-of-the-art diagnostic laboratories.
          </p>
        </div>
      </div>

      {/* Principal's Address & Campus Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-sm">
        <div className="space-y-4">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Principal's Desk
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcoming Future Healthcare & Education Leaders
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "At Nkana College of Applied Sciences and Education, we believe that education is not merely the transmission of facts, but the ignition of dedication and integrity. Our students learn side by side with experienced hospital clinicians and senior educators, gaining the practical confidence needed to serve in urban hospitals and rural clinics across Zambia."
          </p>

          <div className="pt-2">
            <span className="font-extrabold text-sm text-slate-900 block">Dr. Mwamba Silungwe (PhD, MSc)</span>
            <span className="text-xs text-slate-500">Principal & Academic Secretary</span>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => setActiveTab('programs')}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Explore Academic Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('bed_spaces')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
            >
              Hostel Accommodation
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <img
            src="/src/assets/images/nkana_clinical_students_1790778996968.jpg"
            alt="Nursing and Healthcare students at Nkana College"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
