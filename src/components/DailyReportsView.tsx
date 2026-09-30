import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  FileDown,
  Calendar,
  Building2,
  Users,
  Bed,
  CheckCircle2,
  Printer,
  ShieldCheck,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export const DailyReportsView: React.FC = () => {
  const {
    halls,
    rooms,
    students,
    alerts,
    payments,
    exportDailyReport,
    exportMovementLog
  } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Calculate live statistics
  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;

  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'occupied') occupiedBeds++;
      else if (b.status === 'vacant') vacantBeds++;
      else if (b.status === 'maintenance') maintenanceBeds++;
    });
  });

  const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Institutional Audit & Compliance
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Official Daily Reports & PDF Documentation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate and export official Nkana College accommodation reports, resident occupancy audits, and security check-in/out logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-sky-600" />
            <span className="font-semibold">Report Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Report 1: Daily Bed Space & Room Occupancy Report */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-sky-300 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
                Daily Administrative Report
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                Bed Space & Room Occupancy Audit Report
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Full institutional summary including hall-by-hall capacity breakdown, occupied vs vacant ratio, maintenance logs, and checked-in student register.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Total Bed Capacity:</span>
                <span className="font-bold">{totalBeds} Beds</span>
              </div>
              <div className="flex justify-between">
                <span>Currently Occupied:</span>
                <span className="font-bold text-sky-800">{occupiedBeds} ({occupancyRate}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Vacant Spaces Ready:</span>
                <span className="font-bold text-sky-600">{vacantBeds} Beds</span>
              </div>
              <div className="flex justify-between">
                <span>Signatures & Verification:</span>
                <span className="font-bold text-slate-900">Hostel Warden & Dean</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => exportDailyReport(selectedDate)}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Generate & Download Occupancy PDF ({selectedDate})</span>
          </button>
        </div>

        {/* Report 2: Check-In & Check-Out Security Movement Audit */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-sky-300 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                Security & Movement Log
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                Student Check-In & Check-Out Audit Log
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Timestamped movement records of students entering or vacating residential halls, key codes issued/surrendered, and room inspection notes.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Logged Alert Events:</span>
                <span className="font-bold">{alerts.length} Activities</span>
              </div>
              <div className="flex justify-between">
                <span>Movement Types:</span>
                <span className="font-bold text-slate-900">Check-In, Check-Out, Maintenance</span>
              </div>
              <div className="flex justify-between">
                <span>Authorized Personnel:</span>
                <span className="font-bold text-slate-900">Matrons & Security Wardens</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Certificate:</span>
                <span className="font-bold text-sky-700">Verified System Generated</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => exportMovementLog(selectedDate)}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4 text-sky-300" />
            <span>Generate & Download Movement PDF ({selectedDate})</span>
          </button>
        </div>
      </div>

      {/* On-screen Live Occupancy Preview Table */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Residential Hall Real-Time Data Preview ({selectedDate})
            </h3>
            <p className="text-xs text-slate-500">Live preview of data that will appear in the official printed PDF report.</p>
          </div>

          <button
            onClick={() => exportDailyReport(selectedDate)}
            className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sky-50/60 text-slate-700 font-bold border-b border-sky-100 uppercase">
              <tr>
                <th className="p-3">Hall Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Rooms</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Occupied</th>
                <th className="p-3">Vacant</th>
                <th className="p-3">Occupancy</th>
                <th className="p-3">Duty Warden</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {halls.map((hall) => {
                const hallRooms = rooms.filter(r => r.hallId === hall.id);
                let hTotal = 0;
                let hOcc = 0;
                let hVac = 0;
                hallRooms.forEach(r => {
                  r.beds.forEach(b => {
                    hTotal++;
                    if (b.status === 'occupied') hOcc++;
                    if (b.status === 'vacant') hVac++;
                  });
                });
                const rate = hTotal > 0 ? ((hOcc / hTotal) * 100).toFixed(0) : '0';

                return (
                  <tr key={hall.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{hall.name}</td>
                    <td className="p-3 font-semibold uppercase">{hall.genderAllowed}</td>
                    <td className="p-3">{hallRooms.length}</td>
                    <td className="p-3 font-semibold">{hTotal} Beds</td>
                    <td className="p-3 font-bold text-sky-800">{hOcc}</td>
                    <td className="p-3 font-bold text-sky-600">{hVac}</td>
                    <td className="p-3">
                      <span className="font-extrabold text-amber-800">{rate}%</span>
                    </td>
                    <td className="p-3 text-slate-500">{hall.wardenName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
