import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const NkanaMobileAppHero: React.FC = () => {
  const { setActiveTab, isLoggedIn, setIsLoggedIn } = useApp();

  return (
    <section className="relative w-full sm:max-w-[460px] mx-auto min-h-[calc(100vh-56px)] sm:min-h-[820px] aspect-[9/16] sm:rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between select-none">
      {/* BACKGROUND: Edge-to-edge ultra sharp photo of Nkana College brick building (red brick 2-storey with white pillars, yellow roof, paved courtyard, blue sky) - no blur, immersive, covers entire screen top to bottom. Bright daylight. */}
      <img
        src="/nkana-brick-campus.jpg"
        alt="Nkana College red brick 2-storey building with white pillars, yellow roof, paved courtyard, and bright blue sky"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
      />

      {/* NO duplicate header! Top blue bar is only in Navbar.tsx. Zero second college title bars. */}

      {/* MAIN FLOATING CONTENT ON BUILDING: NO frosted glass, NO blurry gray cards, NO translucent pills, NO gray bubbles. */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-8 px-5 sm:px-6">
        
        {/* Top spacing ensuring clock tower and upper campus architecture stay clearly visible */}
        <div className="pt-2 sm:pt-4" />

        {/* LOGGED-IN STATE vs LOGGED-OUT STATE */}
        {isLoggedIn ? (
          /* ONLY SHOWN AFTER LOGIN: Welcome Vanessa Mwape + action buttons */
          <div className="space-y-5 text-center my-auto w-full max-w-sm mx-auto">
            {/* Text with strong black drop shadow + subtle dark scrim behind for readability */}
            <div className="bg-black/35 py-3 px-4 rounded-2xl shadow-lg border border-white/10">
              <p className="text-white font-black text-sm sm:text-base leading-snug tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Welcome back, Vanessa Mwape | Student Resident - NK/RN/2026/0142
              </p>
            </div>

            {/* Action buttons - Full width stacked */}
            <div className="space-y-3 w-full pt-1">
              {/* Solid royal blue button full width: "Open Student Desk →" */}
              <button
                onClick={() => setActiveTab('student_resident_pass')}
                style={{ backgroundColor: '#0B5FFF' }}
                className="w-full py-4 px-6 rounded-xl text-white font-extrabold text-sm sm:text-base shadow-xl shadow-black/30 hover:bg-[#0950db] active:scale-[0.98] transition-all text-center tracking-wide cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Open Student Desk</span>
                <span className="text-base font-bold">→</span>
              </button>

              {/* Solid white button with blue text and shield icon, full width, more visible, no transparent outline */}
              <button
                onClick={() => setActiveTab('user_roles')}
                className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base bg-white text-[#0B5FFF] hover:bg-slate-100 active:scale-[0.98] transition-all text-center tracking-wide shadow-xl shadow-black/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#0B5FFF]" />
                <span>Roles Dashboard</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED-OUT STATE: No Vanessa Mwape, no VM - Clean Login CTA */
          <div className="space-y-4 my-auto text-center py-6 max-w-sm mx-auto w-full">
            {/* Centered white floating text */}
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)]">
              Welcome Back
            </h2>

            {/* ONE big solid royal blue button "LOGIN" */}
            <button
              onClick={() => {
                setIsLoggedIn(true);
              }}
              style={{ backgroundColor: '#0B5FFF' }}
              className="w-full py-4 px-8 rounded-xl text-white font-black text-lg sm:text-xl shadow-2xl shadow-black/40 hover:bg-[#0950db] active:scale-95 transition-all tracking-wider uppercase block cursor-pointer"
            >
              LOGIN
            </button>

            {/* Small white text below button */}
            <p
              onClick={() => setActiveTab('portal_login')}
              className="text-white text-xs sm:text-sm font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] cursor-pointer hover:underline"
            >
              Student • Lecturer • Staff Portal
            </p>
          </div>
        )}

        {/* CLEAN BOTTOM - Address & Accreditation with increased bottom padding so not cut by phone navigation */}
        <div className="space-y-1.5 pt-6 pb-6 sm:pb-4 text-center">
          <p className="text-white text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] flex items-center justify-center gap-1.5">
            <span>📍</span> Plot 7562, 27th St, Nkana East, Kitwe
          </p>
          <p className="text-white text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            Ministry of Health, NMCZ, HPCZ &amp; TCZ Accredited.
          </p>
        </div>
      </div>
    </section>
  );
};
export default NkanaMobileAppHero;
