import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  Bed,
  FileDown,
  CheckCircle2,
  Clock,
  Key,
  ShieldCheck,
  Phone,
  AlertTriangle,
  User,
  Users,
  CreditCard,
  Sparkles,
  Bell
} from 'lucide-react';
import { maskNRC } from '../utils/securityAndSync';

export const StudentPortal: React.FC = () => {
  const {
    students,
    rooms,
    halls,
    currentStudent,
    setCurrentStudent,
    currentRole,
    exportAllocationPass,
    setActiveTab,
    applications,
    triggerExpiryAlert,
    calculateDaysRemaining
  } = useApp();

  const [maintenanceSubmitted, setMaintenanceSubmitted] = useState(false);
  const [maintenanceText, setMaintenanceText] = useState('');

  const room = rooms.find(r => r.id === currentStudent.roomId);
  const hall = halls.find(h => h.id === currentStudent.hallId);
  const bed = room?.beds.find(b => b.id === currentStudent.bedSpaceId);

  // Expiry calculation for current student
  const daysUntilExpiry = calculateDaysRemaining(currentStudent.bedPaymentExpiryDate);
  const isExpiringSoon = daysUntilExpiry <= 7;
  const isExpired = daysUntilExpiry <= 0;
  const isCritical = daysUntilExpiry <= 3 && !isExpired;

  // Find co-residents / roommates in the same room
  const roomMates = room?.beds
    .filter(b => b.id !== currentStudent.bedSpaceId && b.status === 'occupied')
    .map(b => ({
      bedNumber: b.bedNumber,
      name: b.currentStudentName || 'Registered Student'
    })) || [];

  const handleMaintenanceReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceText.trim()) return;
    setMaintenanceSubmitted(true);
    setTimeout(() => {
      setMaintenanceText('');
      setMaintenanceSubmitted(false);
    }, 3000);
  };

  const studentApp = applications.find(a => a.studentNumber === currentStudent.studentNumber) || {
    id: `app-gen-${currentStudent.id}`,
    applicationNumber: `APP-NK-2026-${currentStudent.id.slice(-4)}`,
    studentName: currentStudent.fullName,
    studentNumber: currentStudent.studentNumber,
    nrcNumber: currentStudent.nrcNumber,
    gender: currentStudent.gender,
    email: currentStudent.email,
    phone: currentStudent.phone,
    program: currentStudent.program,
    yearOfStudy: currentStudent.yearOfStudy,
    preferredHallId: currentStudent.hallId || 'hall-1',
    preferredRoomType: 'double',
    status: 'allocated' as const,
    paymentStatus: 'paid' as const,
    paymentReference: 'MOMO-NK-892104',
    amountPaidZMW: 2400,
    submittedAt: currentStudent.checkInDate || '2026-09-15',
    allocatedHallName: hall?.name,
    allocatedRoomNumber: room?.roomNumber,
    allocatedBedNumber: bed?.bedNumber || 'Bed 1'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Student Profile Banner in Light Blue / Sky */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-sky-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white text-sky-900 flex items-center justify-center font-black text-2xl shadow-sm">
            {currentStudent.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-widest bg-sky-800 px-2 py-0.5 rounded border border-sky-700">
                Nkana Resident Scholar
              </span>
              <span className="text-xs text-sky-200 font-mono">
                {currentStudent.studentNumber}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              {currentStudent.fullName}
            </h1>
            <p className="text-xs text-sky-100">
              {currentStudent.program} • {currentStudent.yearOfStudy}
            </p>
          </div>
        </div>

        {/* Demo Student Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            value={currentStudent.id}
            onChange={(e) => {
              const selected = students.find(s => s.id === e.target.value);
              if (selected) setCurrentStudent(selected);
            }}
            className="text-xs bg-sky-950 border border-sky-700 text-white p-2 rounded-xl focus:outline-hidden"
          >
            {students.slice(0, 8).map(s => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                Resident: {s.fullName} ({s.studentNumber})
              </option>
            ))}
          </select>

          <button
            onClick={() => exportAllocationPass(studentApp.id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Room Pass (PDF)</span>
          </button>
        </div>
      </div>

      {/* Bed Space Payment Expiry Alert Notice Banner (Triggered when nearing expiry or expired) */}
      {isExpiringSoon ? (
        <div
          className={`rounded-2xl p-5 border shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            isExpired
              ? 'bg-red-50 border-red-200 text-red-950'
              : isCritical
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-sky-50 border-sky-200 text-sky-950'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                isExpired
                  ? 'bg-red-600 text-white animate-bounce'
                  : isCritical
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-sky-600 text-white'
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isExpired
                      ? 'bg-red-600 text-white'
                      : isCritical
                      ? 'bg-amber-600 text-white'
                      : 'bg-sky-700 text-white'
                  }`}
                >
                  {isExpired ? 'BED ALLOCATION OVERDUE' : isCritical ? 'URGENT: EXPIRING SOON' : 'UPCOMING PAYMENT DUE'}
                </span>
                <span className="text-xs font-mono font-bold">
                  {isExpired
                    ? `Expired on ${currentStudent.bedPaymentExpiryDate}`
                    : `Due: ${currentStudent.bedPaymentExpiryDate} (${daysUntilExpiry} days left)`}
                </span>
              </div>
              <h3 className="text-base font-extrabold mt-1">
                {isExpired
                  ? 'Bed space payment has expired! Allocation at risk of cancellation.'
                  : `Your bed space accommodation fee is due in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}.`}
              </h3>
              <p className="text-xs opacity-90 mt-0.5">
                Outstanding fee of <strong>K{(currentStudent.bedFeeZMW || 2400).toLocaleString()} ZMW</strong> for Room {room?.roomNumber} ({hall?.name}). Renew immediately via Mobile Money to maintain occupancy rights.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => triggerExpiryAlert(currentStudent.id, daysUntilExpiry)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-2 ${
                isExpired
                  ? 'bg-red-700 hover:bg-red-800'
                  : isCritical
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-sky-700 hover:bg-sky-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Renew & Settle Fee (Alert UI)</span>
            </button>
            <button
              onClick={() => triggerExpiryAlert(currentStudent.id, daysUntilExpiry)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-white/80 hover:bg-white text-slate-800 border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              title="Test notification trigger"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Trigger Alert Notice</span>
            </button>
          </div>
        </div>
      ) : (
        /* Status Banner when payment is in good standing */
        <div className="bg-emerald-50/80 border border-emerald-200 text-emerald-950 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-emerald-900">
                Bed Space Fee Active & Valid
              </h4>
              <p className="text-[11px] text-emerald-800">
                Residency active until <strong>{currentStudent.bedPaymentExpiryDate || 'Term End'}</strong> ({daysUntilExpiry} days remaining).
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerExpiryAlert(currentStudent.id, 2, 'Simulated Expiry Warning (Reviewer Demo)')}
            className="text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Simulate Expiry Notice</span>
          </button>
        </div>
      )}

      {/* Main Grid: Allocation Details & Roommates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 cols): Allocation Status & Housing Slip */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Allocation Card */}
          <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Residential Hall Assignment
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  {hall?.name || 'Main Campus Hall'}
                </h2>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  currentStudent.checkInStatus === 'checked_in'
                    ? 'bg-sky-100 text-sky-800 border border-sky-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {currentStudent.checkInStatus === 'checked_in' ? '✓ Physical Check-In Verified' : 'Check-In Pending'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Room Number</span>
                <span className="text-lg font-black text-slate-900 mt-0.5 block">{room?.roomNumber || 'A-101'}</span>
                <span className="text-[10px] text-slate-500">Floor {room?.floor ?? 0}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Allocated Bed</span>
                <span className="text-sm font-extrabold text-sky-700 mt-0.5 block">{bed?.bedNumber || 'Bed 1'}</span>
                <span className="text-[10px] text-slate-500">{room?.roomType.replace('_', ' ')}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Issued Room Key</span>
                <span className="text-sm font-mono font-bold text-slate-900 mt-0.5 block">
                  {currentStudent.keyNumber || 'At Reception'}
                </span>
                <span className="text-[10px] text-slate-500">Signed with Matron</span>
              </div>

              <div
                onClick={() => triggerExpiryAlert(currentStudent.id, daysUntilExpiry)}
                className={`p-3 rounded-xl border cursor-pointer hover:shadow-xs transition-all ${
                  isExpired
                    ? 'bg-red-50 border-red-200'
                    : isExpiringSoon
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Status</span>
                <span
                  className={`text-sm font-extrabold mt-0.5 block ${
                    isExpired
                      ? 'text-red-700'
                      : isExpiringSoon
                      ? 'text-amber-700'
                      : 'text-sky-700'
                  }`}
                >
                  {isExpired ? 'OVERDUE' : isExpiringSoon ? `${daysUntilExpiry}d Left (Due)` : 'Cleared'}
                </span>
                <span className="text-[10px] text-slate-500 truncate block">
                  {isExpiringSoon ? `Due ${currentStudent.bedPaymentExpiryDate}` : 'Term Valid'}
                </span>
              </div>
            </div>

            {/* Room Amenities */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 block mb-2">Room & Hall Amenities:</span>
              <div className="flex flex-wrap gap-1.5">
                {room?.amenities.concat(hall?.amenities || []).map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Roommates Card */}
          <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Room Co-Residents (Room {room?.roomNumber})</span>
            </h3>

            {roomMates.length === 0 ? (
              <p className="text-xs text-slate-500">No other assigned roommates in this room yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roomMates.map((mate, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {mate.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{mate.name}</span>
                      <span className="text-[10px] text-slate-500">{mate.bedNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Maintenance Request Form */}
          <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Report Bed Space or Room Maintenance</span>
            </h3>
            <p className="text-xs text-slate-500">
              Submit requests for plumbing, lighting, mattress, or window lock repairs directly to the Hostel Works Department.
            </p>

            {maintenanceSubmitted ? (
              <div className="bg-sky-50 border border-sky-200 text-sky-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Maintenance request logged! Ticket #MT-2026-081 created. Duty repairman dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleMaintenanceReport} className="space-y-3">
                <textarea
                  rows={2}
                  required
                  placeholder="Describe the issue (e.g. Fluorescent tube flickering in Room A-101; bed frame bolt loose)..."
                  value={maintenanceText}
                  onChange={(e) => setMaintenanceText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-xs transition-all"
                >
                  Submit Maintenance Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Warden Contact & College Hostel Regulations */}
        <div className="space-y-5">
          {/* Hostel Warden Contacts */}
          <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hall Duty Administration
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                W
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{hall?.wardenName || 'Matron Charity Chilufya'}</h4>
                <p className="text-xs text-slate-500">Resident Hall Warden</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs flex items-center justify-between">
              <span className="text-slate-600">Emergency Phone:</span>
              <a href={`tel:${hall?.wardenPhone}`} className="font-bold text-sky-800 hover:underline">
                {hall?.wardenPhone || '+260 977 441 298'}
              </a>
            </div>

            <div className="text-[11px] text-slate-500 pt-1">
              Duty hours: 24/7 on-call for medical emergencies, room access, or security alerts.
            </div>
          </div>

          {/* Residence Rules & Regulations */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Nkana College Hostel Rules
            </h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li><strong>Curfew Hours:</strong> Main hostel gates close promptly at 22:00 hours daily.</li>
              <li><strong>Quiet Hours:</strong> Mandatory silent study hours between 21:00 and 06:00.</li>
              <li><strong>Cooking Appliances:</strong> Designated kitchenettes only. High-wattage coils prohibited in rooms.</li>
              <li><strong>Visitors:</strong> Guests must register at matron desk and exit by 18:00.</li>
              <li><strong>Room Keys:</strong> Loss of room key attracts a K150 replacement cylinder charge.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
