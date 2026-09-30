import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Phone, Mail, MapPin, ShieldCheck, FileText, Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-sky-900/50 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: College Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-black text-white block">NKANA COLLEGE</span>
                <span className="text-[10px] text-sky-400 font-bold">Of Applied Sciences & Education</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier institution dedicated to educating registered nurses, certified midwives, clinical officers, laboratory technicians, and primary teachers.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-sky-400 font-semibold pt-1">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>AES-256 Encrypted Database & Real-Time Sync</span>
            </div>
          </div>

          {/* Column 2: Fast Website Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus Portals</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-sky-300 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-sky-300 transition-colors">
                  About Nkana College
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('programs')} className="hover:text-sky-300 transition-colors">
                  Academic Programs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('online_admission')} className="hover:text-sky-300 transition-colors">
                  Online Admission & Document Upload
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('application_tracker')} className="hover:text-sky-300 transition-colors">
                  Application Status Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Bed Space Management Module */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bed Space Module</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('bed_spaces')} className="hover:text-sky-300 transition-colors">
                  Live Dorm Availability Grid
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bed_spaces')} className="hover:text-sky-300 transition-colors">
                  Bed Space Application & Payment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('student_resident_pass')} className="hover:text-sky-300 transition-colors">
                  Student Resident Voucher Pass
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bed_spaces')} className="hover:text-sky-300 transition-colors">
                  Hostel Administration & Warden Station
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('daily_reports')} className="hover:text-sky-300 transition-colors">
                  Daily PDF Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Security */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kitwe Campus Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>P.O. Box 21992, Kitwe, Copperbelt Province, Republic of Zambia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Admissions: +260 977 441 298</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hostel Warden Desk: +260 966 820 114</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>admissions@nkanacollege.edu.zm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Nkana College Of Applied Sciences And Education. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Payment Security: MTN MoMo • Airtel Money • Zamtel • Visa/Mastercard</span>
            <span>Accredited Tertiary Institution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
