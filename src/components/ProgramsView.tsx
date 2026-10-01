import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Building2,
  ArrowRight,
  BookOpen,
  Sparkles,
  FileCheck,
  Calendar,
  MapPin,
  Phone,
  MessageCircle
} from 'lucide-react';

export const ProgramsView: React.FC = () => {
  const { setActiveTab } = useApp();

  const programs = [
    {
      title: 'Diploma in Registered Nursing',
      duration: '3 Years Full-Time',
      faculty: 'Department of Nursing Sciences',
      accreditation: 'NMCZ Accredited',
      description: 'Comprehensive clinical bedside and theoretical training preparing students to become certified registered nurses delivering holistic patient and acute community healthcare.',
      requirements: [
        '5 "O" level credits or better',
        'Mandatory credits in English Language, Mathematics, and Biology / Science',
        'Pass the institutional aptitude entrance assessment'
      ],
      careers: ['Registered General Nurse (RN)', 'ICU & Surgical Ward Nurse', 'Community Healthcare Supervisor', 'Hospital Ward In-charge']
    },
    {
      title: 'Diploma in Midwifery',
      duration: '3 Years Full-Time',
      faculty: 'Department of Maternal & Child Health',
      accreditation: 'NMCZ Accredited',
      description: 'Specialized maternal, neonatal, and antenatal healthcare program focusing on safe deliveries, post-natal management, emergency obstetric care, and reproductive health.',
      requirements: [
        '5 "O" level credits or better',
        'Must include English Language, Mathematics, and Biology / Science',
        'Certified medical fitness verification'
      ],
      careers: ['Certified Midwife Specialist', 'Labour Ward In-charge', 'Maternal & Neonatal Healthcare Officer', 'Reproductive Health Practitioner']
    },
    {
      title: 'Diploma in Clinical Medicine / Clinical Officer General',
      duration: '3 Years Full-Time',
      faculty: 'School of Clinical Medicine',
      accreditation: 'HPCZ Accredited',
      description: 'Intensive medical clinician training in pathology, disease diagnosis, patient prescription, minor surgery, emergency medical triage, and clinical hospital rotations.',
      requirements: [
        '5 "O" level credits or better',
        'Credits must include English, Mathematics, Biology, Chemistry & Physics',
        'Pass oral clinical entrance panel interview'
      ],
      careers: ['Clinical Officer General (COG)', 'District Hospital Outpatient Clinician', 'Emergency Medicine In-charge', 'Medical Licentiate Trainee']
    },
    {
      title: 'Environmental Health Technology',
      duration: '3 Years Full-Time',
      faculty: 'Department of Public & Environmental Health',
      accreditation: 'HPCZ & Ministry of Health Accredited',
      description: 'Public health sanitation, environmental hazard epidemiology, occupational safety, disease vector control, food hygiene inspection, and municipal water safety systems.',
      requirements: [
        '5 "O" level credits or better',
        'Credits must include English Language, Mathematics, Biology, and Science/Chemistry',
        'Commitment to environmental disease prevention'
      ],
      careers: ['Environmental Health Officer', 'Public Health Inspector', 'Occupational Safety Technologist', 'Community Water & Sanitation Coordinator']
    },
    {
      title: 'Primary Teachers’ Diploma',
      duration: '3 Years Full-Time / Distance',
      faculty: 'School of Education',
      accreditation: 'Ministry of Education & TCZ Accredited',
      description: 'Comprehensive pedagogical training in early child education, literacy instruction, elementary mathematics, special educational needs, and digital learning methodologies.',
      requirements: [
        '5 "O" level credits or better',
        'Must include English Language and Mathematics',
        'Teaching aptitude recommendation'
      ],
      careers: ['Primary School Educator', 'Curriculum Instruction Officer', 'Educational Administrator', 'Literacy Program Specialist']
    },
    {
      title: 'Secondary Teachers’ Diploma',
      duration: '3 Years Full-Time / Distance',
      faculty: 'School of Education',
      accreditation: 'Ministry of Education & TCZ Accredited',
      description: 'Advanced secondary school teaching diploma in specialized subject majors including Sciences, Mathematics, Languages, Social Sciences, and Civic Education pedagogy.',
      requirements: [
        '5 "O" level credits or better',
        'Credit in teaching major subjects and English Language',
        'Teacher Council vetting'
      ],
      careers: ['Secondary School Teacher', 'Departmental Head of Subject', 'Educational Assessment Officer', 'Private Secondary Academy Instructor']
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner with Authentic Students Imagery */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Academic Catalog & Enrollment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Academic Programs & Diplomas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            Explore government and professional council accredited diplomas in Nursing, Midwifery, Clinical Medicine, and Education, supported by modern clinical laboratories and hospital rotations.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('online_admission')}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Apply Online (2026/2027)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('bed_spaces')}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
            >
              View Available Hostels
            </button>
          </div>
        </div>

        {/* Real photo showcase of students */}
        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden shadow-xs border border-slate-200 shrink-0 relative group">
          <img
            src="/src/assets/images/nkana_medical_students_1790746758786.jpg"
            alt="Medical and Nursing students at Nkana College"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-bold drop-shadow-sm">
              Clinical & Nursing Students
            </span>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programs.map((p, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {p.faculty}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">{p.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                  {p.duration}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {p.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Entry Requirements:</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  {p.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                ✓ {p.accreditation}
              </span>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="text-xs font-bold text-sky-700 hover:text-sky-600 flex items-center gap-1 hover:underline"
              >
                <span>Apply for this Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admissions & Intakes and Contact & Location Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Admissions & Intakes Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sky-700">
            <Calendar className="w-5 h-5" />
            <h3 className="text-base font-extrabold text-slate-900">Admissions & Intakes</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5">
              <span className="font-bold text-sky-900 block text-xs">Academic Intake Schedules:</span>
              <p className="text-slate-700 leading-relaxed">
                • <strong>Main January Intake:</strong> Full admission across all medical, nursing, environmental health, and teaching diplomas.
              </p>
              <p className="text-slate-700 leading-relaxed">
                • <strong>Mid-Year Intake (July/August):</strong> Available for specific health programs like Registered Nursing and Clinical Medicine.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block text-xs">General Entry Benchmark:</span>
              <p className="text-slate-600 leading-relaxed">
                Generally requires <strong>5 "O" level credits</strong> (including English Language, Mathematics, and Science/Biology depending on the specific program).
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('online_admission')}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Start Online Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Contact & Physical Campus Location Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sky-700">
            <MapPin className="w-5 h-5" />
            <h3 className="text-base font-extrabold text-slate-900">Campus Location & Inquiries</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Physical Address:</span>
                <span className="text-slate-700 leading-relaxed">
                  Plot No. 7562, 27th Street, Nkana East, Kitwe, Zambia (near Mpelembe Secondary School)
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <MessageCircle className="w-4 h-4" />
                <span>Direct Phone & WhatsApp Helplines:</span>
              </div>
              <div className="space-y-1 text-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span>Line 1: <strong>+260 963 072421</strong></span>
                  <a href="https://wa.me/260963072421" target="_blank" rel="noreferrer" className="text-[10px] font-sans font-bold text-emerald-700 hover:underline">WhatsApp →</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Line 2: <strong>+260 973 350816</strong></span>
                  <a href="https://wa.me/260973350816" target="_blank" rel="noreferrer" className="text-[10px] font-sans font-bold text-emerald-700 hover:underline">WhatsApp →</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Line 3: <strong>+260 768 364480</strong></span>
                  <a href="https://wa.me/260768364480" target="_blank" rel="noreferrer" className="text-[10px] font-sans font-bold text-emerald-700 hover:underline">WhatsApp →</a>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('contact')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>View Full Contact Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
