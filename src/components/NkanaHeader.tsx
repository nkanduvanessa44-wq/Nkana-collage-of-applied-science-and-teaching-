import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getRoleProfile } from '../data/rolesData';
import {
  Bell,
  Lock,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
  LogIn,
  LogOut,
  CreditCard,
  Bed
} from 'lucide-react';

// NkanaHeader.jsx - iPhone Liquid Glass
export default function NkanaHeader() {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    alerts,
    markAlertAsRead,
    clearAllAlerts,
    expiryAlerts,
    triggerExpiryAlert
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleProfile = getRoleProfile(currentRole);
  const unreadAlerts = alerts.filter(a => !a.read);
  const notificationCount = unreadAlerts.length;
  const urgentExpiries = expiryAlerts.filter(a => a.daysRemaining <= 7);

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

    return [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'programs', label: 'Programs' },
      { id: 'online_admission', label: 'Online Application' },
      { id: 'application_tracker', label: 'Track Application' },
      { id: 'bed_spaces', label: 'Hostel Bed Spaces' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' }
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50
      mx-2.5 mt-2 p-2.5
      bg-[#0f172a]/30
      backdrop-blur-[28px] backdrop-saturate-[180%]
      border border-white/15
      rounded-[24px]
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_10px_40px_-10px_rgba(0,0,0,0.6)]
      flex items-center justify-between relative">

      {/* Left - Logo + College Name */}
      <div
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-600/50
          backdrop-blur-md border border-white/20
          flex items-center justify-center
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
          </svg>
        </div>
        <div className="leading-tight">
          <h1 className="text-[12px] font-black text-white tracking-wider">NKANA COLLEGE</h1>
          <p className="text-[9px] font-bold text-orange-400 tracking-wide">OF APPLIED SCIENCES AND EDUCATION</p>
        </div>
      </div>

      {/* Center - Desktop Nav Links */}
      <nav className="hidden xl:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white/20 text-white shadow-xs backdrop-blur-md border border-white/20 font-bold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right - Icons glass */}
      <div className="flex items-center gap-2">
        {/* Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/15
              flex items-center justify-center hover:bg-white/15 transition-colors"
            title="Notifications & Movement Logs"
            aria-label="Notifications"
          >
            <span className="text-white text-sm">🔔</span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full shadow"></span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] sm:w-96 bg-[#0f172a]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 py-3 z-50 animate-in fade-in slide-in-from-top-2 text-xs text-white">
              <div className="px-4 pb-2 border-b border-white/10 flex justify-between items-center">
                <span className="font-bold text-white text-xs">Hostel Movement & Alerts</span>
                {notificationCount > 0 && (
                  <button
                    onClick={clearAllAlerts}
                    className="text-xs text-sky-400 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {urgentExpiries.length > 0 && (
                <div className="p-3 bg-amber-500/20 border-b border-amber-400/30 space-y-2">
                  <div className="flex items-center justify-between text-amber-300 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Bed Expiry Notices ({urgentExpiries.length})</span>
                    </span>
                  </div>
                  {urgentExpiries.slice(0, 2).map((exp, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setShowNotifications(false);
                        triggerExpiryAlert(exp.studentId, exp.daysRemaining);
                      }}
                      className="bg-white/10 p-2 rounded-xl border border-white/10 hover:bg-white/15 cursor-pointer transition-all flex items-center justify-between gap-2"
                    >
                      <div className="truncate text-left">
                        <span className="text-xs font-bold text-white block truncate">{exp.studentName} ({exp.roomNumber})</span>
                        <span className="text-[10px] text-amber-300 block">Expires in {exp.daysRemaining} days (K{exp.amountDueZMW})</span>
                      </div>
                      <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-bold shrink-0">View</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="max-h-72 overflow-y-auto divide-y divide-white/10">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No recent alerts or movements.
                  </div>
                ) : (
                  alerts.slice(0, 5).map((alert, index) => (
                    <div
                      key={index}
                      onClick={() => markAlertAsRead(alert.id)}
                      className={`p-3 text-xs hover:bg-white/10 cursor-pointer transition-colors ${!alert.read ? 'bg-sky-500/15' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white">{alert.studentName}</span>
                        <span className="text-[10px] text-slate-400">{alert.timestamp.split(' ')[1] || alert.timestamp}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5">{alert.hallName} • Room {alert.roomNumber} ({alert.bedNumber})</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lock / Roles Portal Button */}
        <button
          onClick={() => setActiveTab(currentRole === 'student' ? 'portal_login' : 'user_roles')}
          className="w-9 h-9 rounded-full
            bg-blue-500/90 backdrop-blur-md
            border border-white/20
            flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:bg-blue-500 transition-colors"
          title={`Active Persona: ${roleProfile.title} (${roleProfile.defaultUserName})`}
          aria-label="Portal Login"
        >
          <span className="text-white text-sm">🔒</span>
        </button>

        {/* Menu Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 rounded-full
            bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors xl:hidden"
          aria-label="Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-white" />
          ) : (
            <span className="text-white">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 mt-2 p-3 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/15 rounded-[22px] shadow-2xl space-y-1 z-50 text-white animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive ? 'bg-white/20 text-white font-bold border border-white/20' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 mt-2 border-t border-white/10 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('user_roles');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/15"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>User Roles Dashboard ({roleProfile.shortLabel})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
