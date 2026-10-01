import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  Bed
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    alerts,
    markAlertAsRead,
    clearAllAlerts,
    rooms,
    expiryAlerts,
    triggerExpiryAlert
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'online_admission', label: 'Online Application' },
    { id: 'application_tracker', label: 'Track Application' },
    { id: 'bed_spaces', label: 'Bed Spaces (Check Availability)', badge: vacantBeds > 0 ? `${vacantBeds} Vacant` : undefined },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm px-3 py-2.5 sm:px-4 sm:py-3 flex justify-between items-center relative">
      {/* 2. LEFT - LOGO */}
      <div
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
      >
        <div className="w-9 h-9 bg-[#0F6FBF] rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-[13px] sm:text-[15px] text-[#0A1931]">
            NKANA COLLEGE
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#EA580C] font-medium uppercase tracking-wide mt-1 leading-none">
            OF APPLIED SCIENCES AND EDUCATION
          </span>
        </div>
      </div>

      {/* CENTER - NAVIGATION (Clean UNZA/CBU 2-Color Architecture) */}
      <nav className="hidden xl:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#E6F0FF] text-[#0F6FBF]'
                  : 'text-slate-600 hover:text-[#0F6FBF] hover:bg-gray-50'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. RIGHT - 3 icons same size on mobile (< 768px) */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Bell - same 36x36 */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center relative transition-colors shrink-0"
            title="Hostel Movement & Alerts"
            aria-label="Hostel Movement & Alerts"
          >
            <Bell className="w-[18px] h-[18px] text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#0F6FBF] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notification Slide Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
              <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#0F6FBF]" />
                  <span className="font-bold text-[#0A1931] text-xs">Hostel Movement & Alerts</span>
                </div>
                {notificationCount > 0 && (
                  <button
                    onClick={clearAllAlerts}
                    className="text-xs text-[#0F6FBF] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* High-Priority Bed Payment Expiry Notice Section */}
              {urgentExpiries.length > 0 && (
                <div className="p-3 bg-amber-50/80 border-b border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Bed Payment Expiry ({urgentExpiries.length})</span>
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
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
                        className="bg-white p-2 rounded-xl border border-amber-300 hover:border-amber-400 cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {exp.studentName} ({exp.roomNumber})
                          </span>
                          <span className="text-[10px] text-amber-800 font-medium block">
                            {exp.daysRemaining <= 0
                              ? 'Allocation Expired'
                              : `Expires in ${exp.daysRemaining} days (K${exp.amountDueZMW})`}
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-[#EA580C] hover:bg-[#d94e07] text-white rounded-lg text-[10px] font-bold shrink-0">
                          View
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
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
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                        !alert.read ? 'bg-[#E6F0FF]/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          {alert.type === 'check_in' && (
                            <span className="inline-flex items-center gap-1 text-[#0F6FBF] bg-[#E6F0FF] px-1.5 py-0.5 rounded text-[10px]">
                              <LogIn className="w-3 h-3" /> Check-In
                            </span>
                          )}
                          {alert.type === 'check_out' && (
                            <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-1.5 py-0.5 rounded text-[10px]">
                              <LogOut className="w-3 h-3" /> Check-Out
                            </span>
                          )}
                          {alert.type === 'payment' && (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px]">
                              <CreditCard className="w-3 h-3" /> Payment
                            </span>
                          )}
                          {alert.type === 'payment_expiry' && (
                            <span className="inline-flex items-center gap-1 text-[#EA580C] bg-orange-100 px-1.5 py-0.5 rounded text-[10px]">
                              <AlertTriangle className="w-3 h-3" /> Expiry
                            </span>
                          )}
                          {alert.type === 'allocation' && (
                            <span className="inline-flex items-center gap-1 text-[#0F6FBF] bg-[#E6F0FF] px-1.5 py-0.5 rounded text-[10px]">
                              <Bed className="w-3 h-3" /> Bed Space
                            </span>
                          )}
                          <span className="text-slate-900">{alert.studentName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {alert.timestamp.split(' ')[1] || alert.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        {alert.hallName} • Room {alert.roomNumber} ({alert.bedNumber})
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Portal Login - icon only on mobile, same 36x36 */}
        <button
          onClick={() => setActiveTab('portal_login')}
          className="w-9 h-9 rounded-full bg-[#0F6FBF] hover:bg-[#0c5a9c] flex items-center justify-center text-white md:w-auto md:px-4 md:py-2 md:rounded-full md:gap-2 shadow-xs transition-all active:scale-95 shrink-0"
          title="Portal Login"
          aria-label="Portal Login"
        >
          <Lock className="w-[18px] h-[18px] md:w-4 md:h-4 text-white shrink-0" />
          <span className="hidden md:inline text-sm font-semibold whitespace-nowrap">Portal Login</span>
        </button>

        {/* Hamburger menu - same 36x36 */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-[18px] h-[18px] text-gray-700" />
          ) : (
            <Menu className="w-[18px] h-[18px] text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 py-3 px-4 border-b border-gray-100 space-y-1 bg-white shadow-lg animate-in slide-in-from-top-2 z-50">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#E6F0FF] text-[#0F6FBF] font-bold'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setActiveTab('portal_login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#0F6FBF] text-white hover:bg-[#0c5a9c] transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Open Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const PublicNavbar = Navbar;
