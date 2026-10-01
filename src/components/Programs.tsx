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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4">
        <div className="space-y-1.5">
          <div className="bg-[#E6F0FF] text-[#0F6FBF] text-[11px] font-bold tracking-widest uppercase rounded-full px-3 py-1 w-fit">
            DIRECT ENTRY DIPLOMAS
          </div>
          <h2 className="text-xl font-bold text-[#0A1931]">
            Faculties at <span className="text-[#0F6FBF]">Nkana College</span>
          </h2>
        </div>
        <button
          onClick={() => setActiveTab('programs')}
          className="text-[#0F6FBF] hover:underline underline-offset-4 font-semibold text-sm flex items-center shrink-0"
        >
          <span>View All Programs & Requirements</span>
          <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
        </button>
      </div>

      {/* Group 1: School of Health Sciences */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#E6F0FF] text-[#0F6FBF] flex items-center justify-center font-bold text-sm shrink-0">
            +
          </div>
          <h3 className="text-base font-bold text-[#0A1931]">School of Health Sciences</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {healthPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-[15px] font-semibold text-[#0A1931] leading-snug">
                    {prog.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium shrink-0">
                    ● {prog.council}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500">
                  {prog.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white rounded-full px-4 py-1.5 text-sm font-semibold transition-all active:scale-95 shrink-0"
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
          <div className="w-6 h-6 rounded-lg bg-[#E6F0FF] text-[#0F6FBF] flex items-center justify-center font-bold text-sm shrink-0">
            <GraduationCap className="w-3.5 h-3.5 text-[#0F6FBF]" />
          </div>
          <h3 className="text-base font-bold text-[#0A1931]">School of Education</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {educationPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-[15px] font-semibold text-[#0A1931] leading-snug">
                    {prog.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium shrink-0">
                    ● {prog.council}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500">
                  {prog.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white rounded-full px-4 py-1.5 text-sm font-semibold transition-all active:scale-95 shrink-0"
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
