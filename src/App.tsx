import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProgramsView } from './components/ProgramsView';
import { OnlineAdmissionPortal } from './components/OnlineAdmissionPortal';
import { ApplicationTracker } from './components/ApplicationTracker';
import { BedSpacesModule } from './components/BedSpacesModule';
import { StudentPortal } from './components/StudentPortal';
import { DailyReportsView } from './components/DailyReportsView';
import { ContactView } from './components/ContactView';
import { FAQView } from './components/FAQView';
import { PortalLoginView } from './components/PortalLoginView';
import { AccountantFinanceView } from './components/AccountantFinanceView';
import { UserRolesDashboard } from './components/UserRolesDashboard';
import { AdminStaffManagement } from './components/AdminStaffManagement';
import { LecturerResultsEntryView } from './components/LecturerResultsEntryView';
import { Footer } from './components/Footer';
import { BedPaymentExpiryAlertUI } from './components/BedPaymentExpiryAlertUI';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  React.useEffect(() => {
    // Support direct route links (e.g., /apply, /track, /portal, /hostel, /programs, /roles, /finance)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam as any);
      return;
    }
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/apply' || path === '/online-admission') {
      setActiveTab('online_admission');
    } else if (path === '/track' || path === '/application-tracker') {
      setActiveTab('application_tracker');
    } else if (path === '/portal' || path === '/portal/login' || path === '/login') {
      setActiveTab('portal_login');
    } else if (path === '/hostel' || path === '/bed-spaces' || path === '/beds') {
      setActiveTab('bed_spaces');
    } else if (path === '/finance' || path === '/bursar' || path === '/reconcile') {
      setActiveTab('accountant_finance');
    } else if (path === '/roles' || path === '/user-roles' || path === '/privileges') {
      setActiveTab('user_roles');
    } else if (path === '/staff' || path === '/employees' || path === '/workers' || path === '/admin-staff') {
      setActiveTab('admin_staff');
    } else if (path === '/results' || path === '/grades' || path === '/lecturer-results' || path === '/lactures') {
      setActiveTab('lecturer_results');
    } else if (path === '/student-portal' || path === '/resident-pass') {
      setActiveTab('student_resident_pass');
    } else if (path === '/programs' || path === '/faculties') {
      setActiveTab('programs');
    } else if (path === '/about') {
      setActiveTab('about');
    } else if (path === '/faq') {
      setActiveTab('faq');
    } else if (path === '/contact') {
      setActiveTab('contact');
    }
  }, [setActiveTab]);

  return (
    <div className="relative min-h-screen text-slate-900 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Background image FULL BRIGHT at 100% opacity, object-cover full screen behind everything, z-0, NO dark overlay */}
      <img
        src="/nkana-campus.jpg"
        alt="Nkana College Campus Background"
        className="fixed inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
      />

      {/* All content z-10 on top with low-opacity glass so image shows through */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {activeTab === 'portal_login' ? (
          <PortalLoginView />
        ) : (
          <main className={activeTab === 'home' ? 'flex-1 w-full pb-24' : 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24'}>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'about' && <AboutView />}
            {activeTab === 'programs' && <ProgramsView />}
            {activeTab === 'online_admission' && <OnlineAdmissionPortal />}
            {activeTab === 'application_tracker' && <ApplicationTracker />}
            {activeTab === 'bed_spaces' && <BedSpacesModule />}
            {activeTab === 'apply_bed' && <BedSpacesModule initialTab="apply" />}
            {activeTab === 'student_resident_pass' && <StudentPortal />}
            {activeTab === 'daily_reports' && <DailyReportsView />}
            {activeTab === 'accountant_finance' && <AccountantFinanceView />}
            {activeTab === 'user_roles' && <UserRolesDashboard />}
            {activeTab === 'admin_staff' && <AdminStaffManagement />}
            {activeTab === 'lecturer_results' && <LecturerResultsEntryView />}
            {activeTab === 'faq' && <FAQView />}
            {activeTab === 'contact' && <ContactView />}
          </main>
        )}

        {/* Bed Payment Expiry Alert Modal */}
        <BedPaymentExpiryAlertUI />

        {activeTab !== 'portal_login' && <Footer />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
