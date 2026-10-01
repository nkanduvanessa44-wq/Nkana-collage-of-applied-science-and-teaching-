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
import { Footer } from './components/Footer';
import { BedPaymentExpiryAlertUI } from './components/BedPaymentExpiryAlertUI';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col font-sans antialiased">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'programs' && <ProgramsView />}
        {activeTab === 'online_admission' && <OnlineAdmissionPortal />}
        {activeTab === 'application_tracker' && <ApplicationTracker />}
        {activeTab === 'bed_spaces' && <BedSpacesModule />}
        {activeTab === 'apply_bed' && <BedSpacesModule initialTab="apply" />}
        {activeTab === 'student_resident_pass' && <StudentPortal />}
        {activeTab === 'daily_reports' && <DailyReportsView />}
        {activeTab === 'faq' && <FAQView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'portal_login' && <PortalLoginView />}
      </main>

      {/* Bed Payment Expiry Alert Modal */}
      <BedPaymentExpiryAlertUI />

      <Footer />
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
