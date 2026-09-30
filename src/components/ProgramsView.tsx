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
  FileCheck
} from 'lucide-react';

export const ProgramsView: React.FC = () => {
  const { setActiveTab } = useApp();

  const programs = [
    {
      title: 'Registered Nursing Diploma (RN)',
      duration: '3 Years Full-Time',
      faculty: 'School of Nursing & Midwifery',
      accreditation: 'NMCZ Accredited',
      description: 'Comprehensive clinical and theoretical training preparing students to become registered nurses capable of delivering acute and community healthcare.',
      requirements: ['Grade 12 ECZ Certificate or equivalent with 5 credits or better', 'Credits must include English Language, Mathematics, and Biology / Science', 'Pass the institutional aptitude entrance interview'],
      careers: ['Registered General Nurse (RGN)', 'Surgical & ICU Staff Nurse', 'Community Health Supervisor', 'International Healthcare Specialist']
    },
    {
      title: 'Certified Midwifery Diploma',
      duration: '2 Years Full-Time / 1 Year Post-Basic',
      faculty: 'Department of Maternal & Neonatal Health',
      accreditation: 'NMCZ Accredited',
      description: 'Specialized maternal, neonatal, and antenatal health management focusing on safe deliveries, family planning, and maternal morbidity reduction.',
      requirements: ['Grade 12 Certificate with 5 credits including English & Biology', 'Enrolled nursing background or direct entry high school leaver'],
      careers: ['Hospital Midwife', 'Maternity Ward Charge Nurse', 'Reproductive Health Practitioner', 'UN/NGO Health Coordinator']
    },
    {
      title: 'Clinical Medicine Diploma',
      duration: '3 Years Full-Time',
      faculty: 'School of Clinical Medicine',
      accreditation: 'HPCZ Accredited',
      description: 'Intensive medical training in patient diagnosis, emergency medicine, primary surgical procedures, pharmacology, and patient management.',
      requirements: ['5 O-level credits including English, Mathematics, Biology, Chemistry & Physics', 'Age 18+ with police and medical clearance'],
      careers: ['Clinical Officer General', 'Hospital Outpatient In-charge', 'District Health Medical Licentiate', 'Public Health Clinician']
    },
    {
      title: 'Biomedical Laboratory Sciences',
      duration: '3 Years Full-Time',
      faculty: 'Department of Diagnostic Sciences',
      accreditation: 'HPCZ Accredited',
      description: 'Rigorous laboratory diagnostic training in hematology, clinical microbiology, biochemistry, histopathology, and parasitology.',
      requirements: ['5 credits in English, Math, Biology, Chemistry & Physics', 'High attention to laboratory detail'],
      careers: ['Biomedical Laboratory Technologist', 'Blood Transfusion Specialist', 'Clinical Research Analyst', 'Quality Control Officer']
    },
    {
      title: 'Primary Teachers Diploma (Education)',
      duration: '3 Years Full-Time / Distance',
      faculty: 'School of Teacher Education',
      accreditation: 'Ministry of Education & TCZ Accredited',
      description: 'Innovative pedagogical training in primary curriculum instruction, child psychology, special educational needs, and ICT in education.',
      requirements: ['Grade 12 certificate with 5 credits including English Language'],
      careers: ['Primary School Educator', 'Curriculum Development Officer', 'Educational Administrator', 'Private Academy Tutor']
    },
    {
      title: 'Higher Diploma in Health Education',
      duration: '2 Years In-Service',
      faculty: 'Continuous Professional Development (CPD)',
      accreditation: 'Postgraduate Directorate',
      description: 'Advanced curriculum design, healthcare pedagogy, clinical mentorship, and institutional leadership for practicing clinicians and nurse tutors.',
      requirements: ['Recognized diploma in any health science discipline', 'Minimum 2 years post-registration working experience'],
      careers: ['Clinical Nurse Instructor', 'Health Training Institute Lecturer', 'In-service Hospital Coordinator', 'Health Inspector']
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Academic Catalog & Enrollment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Academic Programs & Diplomas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore world-class diplomas accredited by the Nursing & Midwifery Council of Zambia, HPCZ, and the Ministry of Education.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('online_admission')}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0"
        >
          <span>Apply Online (2026/2027)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programs.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
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
    </div>
  );
};
