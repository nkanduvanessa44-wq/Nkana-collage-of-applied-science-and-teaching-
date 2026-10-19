import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="relative w-full overflow-hidden text-white mt-16 border-t border-[#0B5FFF]/40 shadow-2xl">
      {/* Full-bleed background Nkana building - visible & shining through */}
      <img
        src="/nkana-brick-campus.jpg"
        alt="Nkana College Campus Building"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Royal blue gradient overlay (#0B5FFF to dark navy, NOT black) so building shines through */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B5FFF]/65 via-[#082266]/82 to-[#040C24]/92 z-[1] pointer-events-none" />

      {/* Floating text content directly on photo - NO blurry glass, NO frosted cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Top: "NKANA COLLEGE Of Applied Sciences & Education Plot 7562 Kitwe..." */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                NKANA COLLEGE
              </h3>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Of Applied Sciences &amp; Education
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <MapPin className="w-4 h-4 text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
            <span>Plot 7562 Kitwe, 27th St, Nkana East, Kitwe (near Mpelembe Sec)</span>
          </div>
        </div>

        {/* Floating Columns: Campus & Accreditation, Quick Links, Facebook & WhatsApp Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: College Identification & Accreditation */}
          <div className="space-y-3">
            <h4 className="text-[14px] sm:text-[15px] font-black uppercase tracking-wider text-[#7EC8FF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-sm"></span>
              CAMPUS &amp; ACCREDITATION
            </h4>
            <p className="text-white text-xs sm:text-sm font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Plot 7562 Kitwe, 27th Street, Nkana East, Kitwe, Zambia.
            </p>
            <p className="text-white text-xs sm:text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Ministry of Health, NMCZ, HPCZ &amp; TCZ Accredited.
            </p>
            <p className="text-white/95 text-xs font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Diplomas in Nursing, Midwifery, Clinical Medicine &amp; Education.
            </p>
          </div>

          {/* Column 2: Quick Links (Regular white text with blue arrow on hover) */}
          <div className="space-y-3">
            <h4 className="text-[14px] sm:text-[15px] font-black uppercase tracking-wider text-[#7EC8FF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-sm"></span>
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm font-normal text-white">
              <button
                onClick={() => setActiveTab('home')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>About College</span>
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Programs</span>
              </button>
              <button
                onClick={() => setActiveTab('online_admission')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Online Application</span>
              </button>
              <button
                onClick={() => setActiveTab('application_tracker')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Track Application</span>
              </button>
              <button
                onClick={() => setActiveTab('bed_spaces')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Bed Spaces</span>
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>FAQ &amp; Rules</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="group text-left text-white hover:text-[#7EC8FF] transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Contact</span>
              </button>
              <button
                onClick={() => setActiveTab('portal_login')}
                className="group text-left text-white hover:text-[#7EC8FF] font-semibold flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer col-span-2 sm:col-span-1"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span className="text-[#3A8DFF] font-bold text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
                <span>Portal Login</span>
              </button>
            </div>
          </div>

          {/* Column 3: Contact details with White icons, White labels, Bright Cyan #7EC8FF numbers */}
          <div className="space-y-3">
            <h4 className="text-[14px] sm:text-[15px] font-black uppercase tracking-wider text-[#7EC8FF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-sm"></span>
              FACEBOOK &amp; WHATSAPP CONTACT
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                <a
                  href="https://wa.me/260963072421"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1"
                >
                  <span className="text-white font-normal">WhatsApp:</span>
                  <span className="text-[#7EC8FF] font-bold hover:underline">+260 963 072421</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                <a
                  href="tel:+260768364480"
                  className="transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1"
                >
                  <span className="text-white font-normal">Hotline:</span>
                  <span className="text-[#7EC8FF] font-bold hover:underline">+260 768 364480</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1"
                >
                  <span className="text-white font-normal">Facebook:</span>
                  <span className="text-[#7EC8FF] font-bold hover:underline">Nkana College</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                <a
                  href="mailto:info@nkanacollege.edu.zm"
                  className="transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer flex items-center gap-1"
                >
                  <span className="text-white font-normal">Email:</span>
                  <span className="text-[#7EC8FF] font-bold hover:underline">info@nkanacollege.edu.zm</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom "© Nkana College 2026" */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-white font-black text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            © Nkana College 2026
          </p>
          <p className="text-white font-bold text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Plot 7562, 27th St, Nkana East, Kitwe • Ministry of Health, NMCZ, HPCZ &amp; TCZ Accredited
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
