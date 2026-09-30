import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DormStatusDashboard } from './DormStatusDashboard';
import { ApplicationPortal } from './ApplicationPortal';
import { AdminBedSpaceManagement } from './AdminBedSpaceManagement';
import { DailyReportsView } from './DailyReportsView';
import {
  Activity,
  Bed,
  ShieldCheck,
  FileDown,
  Building2,
  Users
} from 'lucide-react';

interface BedSpacesModuleProps {
  initialTab?: 'dashboard' | 'apply' | 'admin' | 'reports';
}

export const BedSpacesModule: React.FC<BedSpacesModuleProps> = ({ initialTab }) => {
  const { currentRole, rooms, expiryAlerts } = useApp();
  const [moduleTab, setModuleTab] = useState<'dashboard' | 'apply' | 'admin' | 'reports'>(initialTab || 'dashboard');

  React.useEffect(() => {
    if (initialTab) {
      setModuleTab(initialTab);
    }
  }, [initialTab]);

  let totalBeds = 0;
  let vacantBeds = 0;
  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'vacant') vacantBeds++;
    });
  });

  return (
    <div className="space-y-6">
      {/* Module Sub-Header */}
      <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Bed Space Management & Dormitory Control Module
            </h2>
            <p className="text-xs text-slate-500">
              Nkana College of Applied Sciences & Education • {vacantBeds} Vacant Bed Spaces Open
            </p>
          </div>
        </div>

        {/* Module Sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setModuleTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              moduleTab === 'dashboard'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Live Availability Grid</span>
          </button>

          <button
            onClick={() => setModuleTab('apply')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              moduleTab === 'apply'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Apply For Bed Space</span>
          </button>

          <button
            onClick={() => setModuleTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              moduleTab === 'admin'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Warden Desk & RBAC</span>
            {expiryAlerts.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                moduleTab === 'admin' ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {expiryAlerts.length} Expiries
              </span>
            )}
          </button>

          <button
            onClick={() => setModuleTab('reports')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              moduleTab === 'reports'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Daily PDF Reports</span>
          </button>
        </div>
      </div>

      {/* Module Content */}
      <div>
        {moduleTab === 'dashboard' && <DormStatusDashboard />}
        {moduleTab === 'apply' && <ApplicationPortal />}
        {moduleTab === 'admin' && <AdminBedSpaceManagement />}
        {moduleTab === 'reports' && <DailyReportsView />}
      </div>
    </div>
  );
};
