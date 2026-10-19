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
      {/* Student Profile Banner in Glass */}
      <div className="bg-white/25 backdrop-blur-[25px] text-white rounded-2xl p-6 shadow-md border border-white/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/30 text-white flex items-center justify-center font-black text-2xl shadow-sm border border-white/40 backdrop-blur-md">
            {currentStudent.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded border border-white/30 backdrop-blur-md">
                Nkana Resident Scholar
              </span>
              <span className="text-xs text-sky-200 font-mono">
                {currentStudent.studentNumber}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
              {currentStudent.fullName}
            </h1>
            <p className="text-xs text-white/90 drop-shadow-sm font-medium">
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
            className="text-xs bg-white/20 border border-white/30 text-white p-2 rounded-xl focus:outline-hidden backdrop-blur-md"
          >
            {students.slice(0, 8).map(s => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                Resident: {s.fullName} ({s.studentNumber})
              </option>
            ))}
          </select>

          <button
            onClick={() => exportAllocationPass(studentApp.id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
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
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 p-6 shadow-md space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <div>
                <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider drop-shadow-sm">
                  Residential Hall Assignment
                </span>
                <h2 className="text-lg font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mt-0.5">
                  {hall?.name || 'Main Campus Hall'}
                </h2>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md ${
                  currentStudent.checkInStatus === 'checked_in'
                    ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-300/30'
                    : 'bg-amber-500/25 text-amber-200 border border-amber-300/30'
                }`}
              >
                {currentStudent.checkInStatus === 'checked_in' ? '✓ Physical Check-In Verified' : 'Check-In Pending'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                <span className="text-[10px] font-bold text-white/70 uppercase block">Room Number</span>
                <span className="text-lg font-black text-white drop-shadow-sm mt-0.5 block">{room?.roomNumber || 'A-101'}</span>
                <span className="text-[10px] text-white/80">Floor {room?.floor ?? 0}</span>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                <span className="text-[10px] font-bold text-white/70 uppercase block">Allocated Bed</span>
                <span className="text-sm font-extrabold text-sky-200 drop-shadow-sm mt-0.5 block">{bed?.bedNumber || 'Bed 1'}</span>
                <span className="text-[10px] text-white/80">{room?.roomType.replace('_', ' ')}</span>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                <span className="text-[10px] font-bold text-white/70 uppercase block">Issued Room Key</span>
                <span className="text-sm font-mono font-bold text-white drop-shadow-sm mt-0.5 block">
                  {currentStudent.keyNumber || 'At Reception'}
                </span>
                <span className="text-[10px] text-white/80">Signed with Matron</span>
              </div>

              <div
                onClick={() => triggerExpiryAlert(currentStudent.id, daysUntilExpiry)}
                className={`p-3 rounded-xl border cursor-pointer hover:shadow-xs transition-all backdrop-blur-md ${
                  isExpired
                    ? 'bg-red-500/30 border-red-300/40 text-red-100'
                    : isExpiringSoon
                    ? 'bg-amber-500/30 border-amber-300/40 text-amber-100'
                    : 'bg-white/20 border-white/30 text-white'
                }`}
              >
                <span className="text-[10px] font-bold uppercase block opacity-80">Payment Status</span>
                <span className="text-sm font-extrabold mt-0.5 block drop-shadow-sm">
                  {isExpired ? 'OVERDUE' : isExpiringSoon ? `${daysUntilExpiry}d Left (Due)` : 'Cleared'}
                </span>
                <span className="text-[10px] truncate block opacity-80">
                  {isExpiringSoon ? `Due ${currentStudent.bedPaymentExpiryDate}` : 'Term Valid'}
                </span>
              </div>
            </div>

            {/* Room Amenities */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2 drop-shadow-sm">Room & Hall Amenities:</span>
              <div className="flex flex-wrap gap-1.5">
                {room?.amenities.concat(hall?.amenities || []).map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-lg border border-white/30 backdrop-blur-md">
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Roommates Card */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 p-6 shadow-md space-y-3 text-white">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 drop-shadow-sm">
              <Users className="w-4 h-4 text-sky-300" />
              <span>Room Co-Residents (Room {room?.roomNumber})</span>
            </h3>

            {roomMates.length === 0 ? (
              <p className="text-xs text-white/80">No other assigned roommates in this room yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roomMates.map((mate, i) => (
                  <div key={i} className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {mate.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block drop-shadow-sm">{mate.name}</span>
                      <span className="text-[10px] text-white/80">{mate.bedNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Maintenance Request Form */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 p-6 shadow-md space-y-3 text-white">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 drop-shadow-sm">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Report Bed Space or Room Maintenance</span>
            </h3>
            <p className="text-xs text-white/80">
              Submit requests for plumbing, lighting, mattress, or window lock repairs directly to the Hostel Works Department.
            </p>

            {maintenanceSubmitted ? (
              <div className="bg-emerald-500/25 border border-emerald-300/30 text-white p-3 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
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
                  className="w-full text-xs p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-hidden backdrop-blur-md"
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
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
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 p-5 shadow-md space-y-3 text-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200 drop-shadow-sm">
              Hall Duty Administration
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold border border-white/30 backdrop-blur-md">
                W
              </div>
              <div>
                <h4 className="text-sm font-bold text-white drop-shadow-sm">{hall?.wardenName || 'Matron Charity Chilufya'}</h4>
                <p className="text-xs text-white/80">Resident Hall Warden</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-lg border border-white/30 text-xs flex items-center justify-between">
              <span className="text-white/80">Emergency Phone:</span>
              <a href={`tel:${hall?.wardenPhone}`} className="font-bold text-sky-200 hover:underline drop-shadow-sm">
                {hall?.wardenPhone || '+260 977 441 298'}
              </a>
            </div>

            <div className="text-[11px] text-white/80 pt-1">
              Duty hours: 24/7 on-call for medical emergencies, room access, or security alerts.
            </div>
          </div>

          {/* Residence Rules & Regulations */}
          <div className="bg-white/25 backdrop-blur-[25px] rounded-2xl border border-white/30 p-5 space-y-3 text-white shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200 drop-shadow-sm">
              Nkana College Hostel Rules
            </h3>
            <ul className="text-xs text-white/90 space-y-2 list-disc list-inside font-medium">
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
