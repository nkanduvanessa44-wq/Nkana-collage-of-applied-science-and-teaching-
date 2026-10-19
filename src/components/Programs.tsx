import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const Programs: React.FC = () => {
  const { setActiveTab } = useApp();

  const healthPrograms = [
    {
      title: 'Registered Nursing Diploma (RN)',
      subtitle: '3 Years Full-Time • Ministry of Health',
      council: 'NMCZ'
    },
    {
      title: 'Certified Midwifery Diploma',
      subtitle: '2 Years Full-Time • Maternal Care',
      council: 'NMCZ'
    },
    {
      title: 'Clinical Medicine Diploma (COG)',
      subtitle: '3 Years Full-Time • General Medicine',
      council: 'HPCZ'
    },
    {
      title: 'Biomedical Laboratory Sciences',
      subtitle: '3 Years Full-Time • Diagnostics',
      council: 'HPCZ'
    }
  ];

  const educationPrograms = [
    {
      title: 'Primary Teachers Diploma',
      subtitle: '3 Years Full-Time / Distance • Early Childhood & Primary',
      council: 'TCZ'
    },
    {
      title: 'Secondary Teachers Diploma',
      subtitle: '3 Years Full-Time / Distance • Mathematics & Sciences',
      council: 'TCZ'
    }
  ];

  return (
    <section className="pt-6 pb-24 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/20 pb-4">
        <div className="space-y-1.5">
          <div className="bg-white/20 text-sky-200 border border-white/30 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase rounded-full px-3 py-1 w-fit drop-shadow-sm">
            DIRECT ENTRY DIPLOMAS
          </div>
          <h2 className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Faculties at <span className="text-orange-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Nkana College</span>
          </h2>
        </div>
        <button
          onClick={() => setActiveTab('programs')}
          className="text-sky-200 hover:text-white font-bold text-sm flex items-center shrink-0 drop-shadow-sm hover:underline"
        >
          <span>View All Programs & Requirements</span>
          <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
        </button>
      </div>

      {/* Group 1: School of Health Sciences */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-600/50 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white/30 backdrop-blur-md">
            +
          </div>
          <h3 className="text-base font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">School of Health Sciences</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {healthPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white/25 backdrop-blur-[25px] border border-white/30 rounded-2xl p-4 shadow-md hover:bg-white/35 transition-all flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-[15px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] leading-snug">
                    {prog.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-200 bg-emerald-500/25 border border-emerald-300/30 backdrop-blur-md px-2 py-0.5 rounded-full font-bold shrink-0">
                    ● {prog.council}
                  </span>
                </div>
                <p className="text-[12px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium">
                  {prog.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="bg-sky-600 hover:bg-sky-500 text-white rounded-full px-5 py-2 text-sm font-extrabold shadow-md transition-all active:scale-95 shrink-0"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Group 2: School of Education */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-600/50 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white/30 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-base font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">School of Education</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {educationPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white/25 backdrop-blur-[25px] border border-white/30 rounded-2xl p-4 shadow-md hover:bg-white/35 transition-all flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-[15px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] leading-snug">
                    {prog.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-200 bg-emerald-500/25 border border-emerald-300/30 backdrop-blur-md px-2 py-0.5 rounded-full font-bold shrink-0">
                    ● {prog.council}
                  </span>
                </div>
                <p className="text-[12px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium">
                  {prog.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="bg-sky-600 hover:bg-sky-500 text-white rounded-full px-5 py-2 text-sm font-extrabold shadow-md transition-all active:scale-95 shrink-0"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
