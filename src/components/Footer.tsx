import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Share2,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Section 1: College Identification & Accreditation */}
          <div className="space-y-3">
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
              Plot 7562 Kitwe, 27th Street, Nkana East, Kitwe, Zambia (near Mpelembe Secondary School).
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-300 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Accredited by MoH, NMCZ, HPCZ & TCZ</span>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-slate-400">
              <button onClick={() => setActiveTab('home')} className="text-left hover:text-sky-300 transition-colors">
                Home
              </button>
              <button onClick={() => setActiveTab('about')} className="text-left hover:text-sky-300 transition-colors">
                About College
              </button>
              <button onClick={() => setActiveTab('programs')} className="text-left hover:text-sky-300 transition-colors">
                Programs
              </button>
              <button onClick={() => setActiveTab('online_admission')} className="text-left hover:text-sky-300 transition-colors">
                Online Application
              </button>
              <button onClick={() => setActiveTab('application_tracker')} className="text-left hover:text-sky-300 transition-colors">
                Track Application
              </button>
              <button onClick={() => setActiveTab('bed_spaces')} className="text-left hover:text-sky-300 transition-colors">
                Bed Spaces
              </button>
              <button onClick={() => setActiveTab('faq')} className="text-left hover:text-sky-300 transition-colors">
                FAQ & Rules
              </button>
              <button onClick={() => setActiveTab('contact')} className="text-left hover:text-sky-300 transition-colors">
                Contact
              </button>
              <button onClick={() => setActiveTab('portal_login')} className="text-left hover:text-sky-300 font-bold text-sky-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Portal Login</span>
              </button>
            </div>
          </div>

          {/* Section 3: Facebook / WhatsApp Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Facebook & WhatsApp Contact</h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/260963072421"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors font-semibold"
                >
                  WhatsApp: +260 963 072421 / +260 973 350816
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hotline: +260 768 364480</span>
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-300 transition-colors font-semibold"
                >
                  Facebook: Nkana College of Applied Sciences & Education
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>info@nkanacollege.edu.zm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Simple Copyright Bar per Requirement 7 */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-400 text-xs">
          <p>© Nkana College 2026 • Plot 7562 Kitwe</p>
          <p className="text-[11px] text-slate-400">
            Accredited by MoH, NMCZ, HPCZ & TCZ • Admissions & Student Hostel Portal
          </p>
        </div>
      </div>
    </footer>
  );
};
