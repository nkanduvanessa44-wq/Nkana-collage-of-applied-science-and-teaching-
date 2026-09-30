import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Bell,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  FileText,
  Bed,
  Activity,
  CheckCircle2,
  LogOut,
  LogIn,
  AlertTriangle,
  Menu,
  X,
  CreditCard,
  Phone,
  Mail,
  Search,
  BookOpen,
  Info,
  MapPin
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
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

  const unreadAlerts = alerts.filter(a => !a.read);
  const urgentExpiries = expiryAlerts.filter(a => a.daysRemaining <= 7);

  // Quick stats
  let totalBeds = 0;
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About College' },
    { id: 'programs', label: 'Programs' },
    { id: 'online_admission', label: 'Online Application' },
    { id: 'application_tracker', label: 'Track Application' },
    { id: 'bed_spaces', label: 'Bed Spaces & Hostels', badge: `${vacantBeds} Vacant` },
    { id: 'student_resident_pass', label: 'Resident Portal' },
    { id: 'daily_reports', label: 'Daily Reports' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sky-100 shadow-xs">
      {/* Top Institutional Utility Strip (Light Blue / Navy Accent) */}
      <div className="bg-sky-900 text-sky-50 text-[11px] px-4 py-1.5 border-b border-sky-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-sky-200">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Kitwe Teaching Hospital Grounds, Kuomboka Rd, Kitwe, Zambia</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.2 rounded-full bg-sky-700/80 text-sky-100 text-[10px] font-bold border border-sky-600">
              2026/2027 Intake Open
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1 text-sky-200 text-[11px]">
              <Phone className="w-3 h-3 text-sky-300" />
              <span>+260 977 441 298</span>
            </span>

            <span className="hidden sm:inline-block text-sky-300">
              Bed Vacancy: <strong>{vacantBeds} Spaces Open</strong>
            </span>

            {/* Quick RBAC Role Badge */}
            <div className="flex items-center gap-1.5 bg-sky-800/80 px-2 py-0.5 rounded border border-sky-700 text-[10px]">
              <span className="text-sky-300">Role:</span>
              <span className="font-bold text-white capitalize">{currentRole}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Website Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                  NKANA COLLEGE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                  Official Portal
                </span>
              </div>
              <p className="text-xs font-semibold text-sky-700">
                Of Applied Sciences And Education
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Notifications & RBAC Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                title="Check-In/Check-Out Live Alerts"
              >
                <Bell className="w-5 h-5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-sky-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>

              {/* Notification Slide Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sky-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-sky-600" />
                      <span className="font-bold text-slate-900 text-xs">Hostel Movement & Alerts</span>
                    </div>
                    {unreadAlerts.length > 0 && (
                      <button
                        onClick={clearAllAlerts}
                        className="text-xs text-sky-600 hover:underline font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* High-Priority Bed Payment Expiry Notice Section */}
                  {urgentExpiries.length > 0 && (
                    <div className="p-3 bg-amber-50/70 border-b border-amber-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Bed Payment Expiry Warnings ({urgentExpiries.length})</span>
                        </span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                          Urgent
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {urgentExpiries.slice(0, 2).map(exp => (
                          <div
                            key={exp.id}
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
                            <span className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold shrink-0">
                              View Alert UI
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {alerts.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No recent alerts or movements.
                      </div>
                    ) : (
                      alerts.slice(0, 6).map((alert) => (
                        <div
                          key={alert.id}
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
                            !alert.read ? 'bg-sky-50/60' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 font-bold">
                              {alert.type === 'check_in' && (
                                <span className="inline-flex items-center gap-1 text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded text-[10px]">
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
                                <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded text-[10px] animate-pulse">
                                  <AlertTriangle className="w-3 h-3" /> Expiry Notice
                                </span>
                              )}
                              {alert.type === 'allocation' && (
                                <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded text-[10px]">
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
                          {alert.notes && (
                            <p className="text-slate-500 text-[11px] mt-0.5 italic">
                              "{alert.notes}"
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveTab('daily_reports');
                      }}
                      className="text-xs text-sky-700 font-bold hover:underline"
                    >
                      Export Full Movement PDF Log →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher (RBAC) in Light Blue & White */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'admin'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Warden / Dean / Full Admin Role"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
              <button
                onClick={() => setCurrentRole('staff')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'staff'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hostel Matron / Security Check-in Desk"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Staff</span>
              </button>
              <button
                onClick={() => setCurrentRole('student')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'student'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Student Resident View"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-200 space-y-1 bg-white">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-100 text-sky-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
