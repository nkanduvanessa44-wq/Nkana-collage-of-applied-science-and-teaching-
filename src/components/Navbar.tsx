import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getRoleProfile } from '../data/rolesData';
import {
  Building2,
  Bell,
  Lock,
  Menu,
  X,
  LogIn,
  LogOut,
  CreditCard,
  AlertTriangle,
  Bed,
  ShieldCheck,
  DollarSign,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    alerts,
    markAlertAsRead,
    clearAllAlerts,
    rooms,
    expiryAlerts,
    triggerExpiryAlert,
    isLoggedIn,
    setIsLoggedIn
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleProfile = getRoleProfile(currentRole);

  // Unread alerts count - default 0 for public demo
  const unreadAlerts = alerts.filter(a => !a.read);
  const notificationCount = unreadAlerts.length;
  const urgentExpiries = expiryAlerts.filter(a => a.daysRemaining <= 7);

  // Quick stats
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  // Dynamic Navigation Items Based on User Privileges
  // Accountant sees Bursar tools, not bed application!
  // Lecturer sees Student Results Entry & Academic tools!
  // Admin sees Staff HR Control, Results Endorsement, Bed Space & Finance!
  const getNavItems = () => {
    if (currentRole === 'accountant') {
      return [
        { id: 'home', label: 'Home' },
        { id: 'accountant_finance', label: 'Bursar Reconciliations' },
        { id: 'bed_spaces', label: 'Bed Spaces (Live Grid)' },
        { id: 'daily_reports', label: 'Daily Reports' },
        { id: 'user_roles', label: 'User Roles & Privileges' },
        { id: 'contact', label: 'Contact' }
      ];
    }
    if (currentRole === 'lecturer') {
      return [
        { id: 'home', label: 'Home' },
        { id: 'lecturer_results', label: 'Student Results Entry' },
        { id: 'programs', label: 'Academic Programs' },
        { id: 'daily_reports', label: 'Daily Reports' },
        { id: 'user_roles', label: 'User Roles & Privileges' },
        { id: 'contact', label: 'Contact' }
      ];
    }
    if (currentRole === 'staff') {
      return [
        { id: 'home', label: 'Home' },
        { id: 'bed_spaces', label: 'Warden Desk & Roll-Call' },
        { id: 'daily_reports', label: 'Daily PDF Reports' },
        { id: 'user_roles', label: 'User Roles & Privileges' },
        { id: 'contact', label: 'Contact' }
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'home', label: 'Home' },
        { id: 'admin_staff', label: 'Staff & HR Control' },
        { id: 'lecturer_results', label: 'Results Approval' },
        { id: 'bed_spaces', label: 'Bed Space Allocations' },
        { id: 'accountant_finance', label: 'Bursar Finance' },
        { id: 'user_roles', label: 'User Roles & Privileges' }
      ];
    }
    if (currentRole === 'admissions') {
      return [
        { id: 'home', label: 'Home' },
        { id: 'online_admission', label: 'Admissions Desk' },
        { id: 'application_tracker', label: 'Track Application' },
        { id: 'programs', label: 'Programs' },
        { id: 'user_roles', label: 'User Roles & Privileges' },
        { id: 'contact', label: 'Contact' }
      ];
    }

    // Default Public / Student Resident View
    return [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'programs', label: 'Programs' },
      { id: 'online_admission', label: 'Online Application' },
      { id: 'application_tracker', label: 'Track Application' },
      { id: 'bed_spaces', label: 'Bed Spaces (Check Availability)', badge: vacantBeds > 0 ? `${vacantBeds} Vacant` : undefined },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' }
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Solid dark blue header bar full width edge-to-edge */}
      <header className="w-full bg-[#0A193F] text-white sticky top-0 z-50 shadow-md border-b border-[#142B66]">
        <div className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left - College Logo & Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0B5FFF] flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs sm:text-sm md:text-base font-black text-white tracking-wide uppercase leading-tight select-none">
                NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION
              </h1>
            </div>
          </div>

          {/* CENTER - NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B5FFF] text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-[#142B66]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-black rounded-full bg-orange-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right - Notifications & Actions */}
          <div className="flex items-center gap-2">
            {/* Bell Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#142B66] hover:bg-[#1a3885] flex items-center justify-center text-white transition-colors relative cursor-pointer"
                title="Hostel Movement & Alerts"
                aria-label="Hostel Movement & Alerts"
              >
                <Bell className="w-4 h-4 text-white" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full shadow"></span>
                )}
              </button>

              {/* Notification Slide Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] sm:w-96 bg-[#0A193F] rounded-xl shadow-2xl border border-[#1a3885] py-3 z-50 text-xs text-white">
                  <div className="px-4 pb-2 border-b border-[#142B66] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-white">🔔</span>
                      <span className="font-bold text-white text-xs">Hostel Movement & Alerts</span>
                    </div>
                    {notificationCount > 0 && (
                      <button
                        onClick={clearAllAlerts}
                        className="text-xs text-sky-400 hover:underline font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* High-Priority Bed Payment Expiry Notice Section */}
                  {urgentExpiries.length > 0 && (
                    <div className="p-3 bg-amber-600/30 border-b border-amber-500/40 space-y-2">
                      <div className="flex items-center justify-between text-amber-200 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Bed Payment Expiry ({urgentExpiries.length})</span>
                        </span>
                        <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">
                          Notice
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {urgentExpiries.slice(0, 2).map((exp, idx) => (
                          <div
                            key={`${exp.id || 'exp'}-${idx}`}
                            onClick={() => {
                              setShowNotifications(false);
                              triggerExpiryAlert(exp.studentId, exp.daysRemaining);
                            }}
                            className="bg-[#0e214f] p-2 rounded-lg border border-[#1e428e] hover:bg-[#152e69] cursor-pointer transition-all flex items-center justify-between gap-2"
                          >
                            <div className="truncate">
                              <span className="text-xs font-bold text-white block truncate">
                                {exp.studentName} ({exp.roomNumber})
                              </span>
                              <span className="text-[10px] text-amber-300 font-medium block">
                                {exp.daysRemaining <= 0
                                  ? 'Allocation Expired'
                                  : `Expires in ${exp.daysRemaining} days (K${exp.amountDueZMW})`}
                              </span>
                            </div>
                            <span className="px-2 py-1 bg-[#0B5FFF] hover:bg-blue-600 text-white rounded-md text-[10px] font-bold shrink-0">
                              View
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#142B66]">
                    {alerts.length === 0 ? (
                      <div className="p-6 text-center text-slate-300 text-xs">
                        No recent alerts or movements.
                      </div>
                    ) : (
                      alerts.slice(0, 6).map((alert, index) => (
                        <div
                          key={`${alert.id || 'alert'}-${index}`}
                          onClick={() => {
                            markAlertAsRead(alert.id);
                            if (alert.type === 'payment_expiry') {
                              setShowNotifications(false);
                              const matchingStudent = expiryAlerts.find(e => e.studentName === alert.studentName);
                              if (matchingStudent) {
                                triggerExpiryAlert(matchingStudent.studentId, matchingStudent.daysRemaining);
                              }
                            }
                          }}
                          className={`p-3 text-xs hover:bg-[#142B66] cursor-pointer transition-colors ${
                            !alert.read ? 'bg-[#0e245a]' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 font-bold">
                              {alert.type === 'check_in' && (
                                <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded text-[10px]">
                                  <LogIn className="w-3 h-3" /> Check-In
                                </span>
                              )}
                              {alert.type === 'check_out' && (
                                <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded text-[10px]">
                                  <LogOut className="w-3 h-3" /> Check-Out
                                </span>
                              )}
                              {alert.type === 'payment' && (
                                <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded text-[10px]">
                                  <CreditCard className="w-3 h-3" /> Payment
                                </span>
                              )}
                              {alert.type === 'payment_expiry' && (
                                <span className="inline-flex items-center gap-1 text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded text-[10px]">
                                  <AlertTriangle className="w-3 h-3" /> Expiry
                                </span>
                              )}
                              {alert.type === 'allocation' && (
                                <span className="inline-flex items-center gap-1 text-sky-300 bg-sky-500/20 px-1.5 py-0.5 rounded text-[10px]">
                                  <Bed className="w-3 h-3" /> Bed Space
                                </span>
                              )}
                              <span className="text-white">{alert.studentName}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {alert.timestamp.split(' ')[1] || alert.timestamp}
                            </span>
                          </div>
                          <p className="text-slate-300 mt-1">
                            {alert.hallName} • Room {alert.roomNumber} ({alert.bedNumber})
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Corner Button: Login when logged-out, Profile "VM" when logged-in */}
            {!isLoggedIn ? (
              <button
                onClick={() => setActiveTab('portal_login')}
                className="px-3.5 py-1.5 rounded-lg bg-[#0B5FFF] hover:bg-[#0950db] text-white text-xs font-black transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B5FFF] hover:bg-[#0950db] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md border-2 border-white transition-all cursor-pointer select-none"
                  title="Profile: Vanessa Mwape (VM)"
                  aria-label="Profile Vanessa Mwape"
                >
                  VM
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0A193F] border border-[#142B66] rounded-xl shadow-2xl py-2 z-50 text-xs text-white animate-in fade-in slide-in-from-top-2">
                    <div className="px-3.5 py-2 border-b border-[#142B66]">
                      <p className="font-extrabold text-white text-sm">Vanessa Mwape</p>
                      <p className="text-sky-300 text-[11px] font-semibold">Student Resident • 2026</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('student_resident_pass');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#142B66] font-bold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Open Student Desk</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('user_roles');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#142B66] font-bold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      <span>Roles Dashboard</span>
                    </button>
                    <div className="border-t border-[#142B66] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-rose-300 hover:bg-[#142B66] font-bold transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#142B66] hover:bg-[#1a3885] flex items-center justify-center text-white xl:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden w-full py-3 px-4 bg-[#0A193F] border-t border-[#142B66] space-y-1 shadow-2xl animate-in slide-in-from-top-2 text-white">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0B5FFF] text-white'
                      : 'text-slate-200 hover:bg-[#142B66]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-orange-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 mt-2 border-t border-[#142B66] space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#142B66]/60 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-[#0B5FFF] text-white font-black text-xs flex items-center justify-center border border-white">
                      VM
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">Vanessa Mwape</span>
                      <span className="text-[10px] text-sky-300 leading-tight">Active: Student Resident</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('student_resident_pass');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-[#0B5FFF] text-white hover:bg-[#0950db] transition-colors cursor-pointer"
                  >
                    <span>Open Student Desk</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('user_roles');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold border border-white text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Roles Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-900/60 text-rose-200 hover:bg-rose-900 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('portal_login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-black bg-[#0B5FFF] hover:bg-[#0950db] text-white transition-colors shadow-sm cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Portal Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const PublicNavbar = Navbar;
export const NkanaHeader = Navbar;
export default Navbar;
