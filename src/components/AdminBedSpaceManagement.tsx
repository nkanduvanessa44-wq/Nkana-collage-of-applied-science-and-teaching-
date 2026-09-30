import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Users,
  Bed,
  CheckCircle2,
  XCircle,
  FileDown,
  Lock,
  UserCheck,
  DoorOpen,
  AlertTriangle,
  Search,
  Filter,
  CreditCard,
  Key,
  Database,
  ArrowRight,
  RefreshCw,
  Eye,
  EyeOff,
  X,
  Bell,
  Smartphone
} from 'lucide-react';
import { BedApplication, Student, Room, BedSpace } from '../types';
import { maskNRC, maskPhone } from '../utils/securityAndSync';

export const AdminBedSpaceManagement: React.FC = () => {
  const {
    currentRole,
    applications,
    rooms,
    halls,
    students,
    payments,
    allocateBedSpace,
    rejectApplication,
    checkInStudent,
    checkOutStudent,
    updateBedStatus,
    exportDailyReport,
    exportMovementLog,
    exportAllocationPass,
    expiryAlerts,
    triggerExpiryAlert,
    calculateDaysRemaining,
    sendBatchExpiryReminders,
    expiryReminderLogs,
    renewBedPayment
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'checkin_desk' | 'room_manager' | 'payments' | 'expiry_alerts' | 'security_rbac'>('applications');
  const [selectedAppForAllocation, setSelectedAppForAllocation] = useState<BedApplication | null>(null);
  const [targetRoomId, setTargetRoomId] = useState('');
  const [targetBedId, setTargetBedId] = useState('');

  // Bed payment expiry batch message feedback
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  // Check-In / Out Desk State
  const [studentSearch, setStudentSearch] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [deskNotes, setDeskNotes] = useState('');
  const [deskFeedback, setDeskFeedback] = useState<string | null>(null);

  // Security test
  const [revealSensitiveData, setRevealSensitiveData] = useState(false);

  // Filter pending applications
  const pendingApps = applications.filter(a => a.status === 'pending');
  const processedApps = applications.filter(a => a.status !== 'pending');

  // Rooms available for allocation modal
  const allocationCandidateRooms = selectedAppForAllocation
    ? rooms.filter(r => {
        const hall = halls.find(h => h.id === r.hallId);
        return hall && (hall.genderAllowed === selectedAppForAllocation.gender || hall.genderAllowed === 'mixed');
      })
    : [];

  const [allocationError, setAllocationError] = useState<string | null>(null);

  const handleOpenAllocationModal = (app: BedApplication) => {
    setSelectedAppForAllocation(app);
    setAllocationError(null);
    const firstEligibleRoom = rooms.find(r => {
      const hall = halls.find(h => h.id === r.hallId);
      const isGenderMatch = hall && (hall.genderAllowed === app.gender || hall.genderAllowed === 'mixed');
      const hasVacant = r.beds.some(b => b.status === 'vacant');
      return isGenderMatch && hasVacant;
    });

    if (firstEligibleRoom) {
      setTargetRoomId(firstEligibleRoom.id);
      const vacantBed = firstEligibleRoom.beds.find(b => b.status === 'vacant');
      setTargetBedId(vacantBed?.id || '');
    }
  };

  const handleConfirmAllocation = () => {
    if (!selectedAppForAllocation || !targetRoomId || !targetBedId) {
      setAllocationError('Please select a target room and vacant bed space.');
      return;
    }
    const success = allocateBedSpace(
      selectedAppForAllocation.id,
      targetRoomId,
      targetBedId,
      'Dean of Student Affairs'
    );
    if (success) {
      setSelectedAppForAllocation(null);
      setAllocationError(null);
    } else {
      setAllocationError('Failed to allocate: this bed space may already be occupied or reserved.');
    }
  };

  const handleDeskCheckIn = (student: Student) => {
    const key = keyInput.trim() || `${student.roomId || 'A101'}-KEY-1`;
    checkInStudent(student.id, key, 'Warden Desk', deskNotes);
    setDeskFeedback(`Check-In confirmed for ${student.fullName}. Key #${key} issued.`);
    setKeyInput('');
    setDeskNotes('');
    setTimeout(() => setDeskFeedback(null), 3500);
  };

  const handleDeskCheckOut = (student: Student) => {
    checkOutStudent(student.id, 'Warden Desk', deskNotes || 'Official exit inspection cleared.');
    setDeskFeedback(`Check-Out processed for ${student.fullName}. Bed space has been freed.`);
    setDeskNotes('');
    setTimeout(() => setDeskFeedback(null), 3500);
  };

  // Student search for Check-In Desk
  const filteredStudents = students.filter(s => {
    if (!studentSearch.trim()) return true;
    const q = studentSearch.toLowerCase();
    return s.fullName.toLowerCase().includes(q) || s.studentNumber.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Admin Header in Light Blue / Sky */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-6 rounded-2xl border border-sky-800 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-sky-500 text-white">
              Hostel Administration & Warden Station
            </span>
            <span className="text-xs text-sky-200 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active Role: {currentRole.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Bed Space Allocation & Security Management
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Authorize applications, manage physical room allocations, execute student check-ins/check-outs, and monitor encrypted database integrity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportDailyReport()}
            className="flex items-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white shadow-xs transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Daily Occupancy PDF</span>
          </button>
          <button
            onClick={() => exportMovementLog()}
            className="flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white border border-white/20 transition-all"
          >
            <FileDown className="w-4 h-4 text-sky-300" />
            <span>Export Movement Log PDF</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-sky-100">
        {[
          { id: 'applications', label: 'Bed Space Applications', count: pendingApps.length, icon: Bed },
          { id: 'expiry_alerts', label: 'Payment Expiry & Alerts', count: expiryAlerts.length, icon: AlertTriangle },
          { id: 'checkin_desk', label: 'Check-In & Check-Out Desk', icon: DoorOpen },
          { id: 'room_manager', label: 'Room & Maintenance Master', icon: Building2 },
          { id: 'payments', label: 'Payment Gateway Logs', count: payments.length, icon: CreditCard },
          { id: 'security_rbac', label: 'Security & Encrypted DB (RBAC)', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-white text-sky-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: Applications Management */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-slate-900">
              Pending Bed Space Applications ({pendingApps.length})
            </h2>
            <span className="text-xs text-slate-500">
              Paid applications awaiting physical room assignment
            </span>
          </div>

          {pendingApps.length === 0 ? (
            <div className="p-10 bg-white rounded-xl border border-sky-100 text-center">
              <CheckCircle2 className="w-10 h-10 text-sky-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">All applications processed</h3>
              <p className="text-xs text-slate-500 mt-0.5">There are no pending student applications requiring allocation.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingApps.map((app) => (
                <div key={app.id} className="bg-white rounded-xl border border-sky-100 p-4 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">{app.applicationNumber}</span>
                      <h4 className="text-sm font-extrabold text-slate-900">{app.studentName}</h4>
                      <p className="text-xs text-slate-600">{app.program} • {app.yearOfStudy}</p>
                    </div>

                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                      PAID (K{app.amountPaidZMW?.toLocaleString()})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Student ID:</span>
                      <span className="font-semibold">{app.studentNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Gender / Hall:</span>
                      <span className="font-semibold capitalize">{app.gender} • {halls.find(h => h.id === app.preferredHallId)?.code}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Contact Phone:</span>
                      <span className="font-semibold">{app.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Payment Ref:</span>
                      <span className="font-mono text-sky-800 font-bold">{app.paymentReference || 'VERIFIED'}</span>
                    </div>
                  </div>

                  {app.specialRequests && (
                    <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                      Request: "{app.specialRequests}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenAllocationModal(app)}
                      className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Bed className="w-3.5 h-3.5 text-white" />
                      <span>Assign Room & Bed Space</span>
                    </button>

                    <button
                      onClick={() => {
                        const reason = prompt('Reason for rejection:');
                        if (reason) rejectApplication(app.id, reason);
                      }}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg text-xs font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Processed Applications History */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Recently Allocated & Approved Students</h3>
            <div className="bg-white rounded-xl border border-sky-100 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-sky-50/60 p-3 font-bold text-slate-600 border-b border-sky-100">
                <span className="col-span-3">Student Name & ID</span>
                <span className="col-span-3">Program</span>
                <span className="col-span-3">Allocated Bed Space</span>
                <span className="col-span-3 text-right">Actions</span>
              </div>
              <div className="divide-y divide-slate-100">
                {processedApps.map(app => (
                  <div key={app.id} className="grid grid-cols-12 p-3 items-center hover:bg-slate-50">
                    <div className="col-span-3">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-400">{app.studentNumber}</div>
                    </div>
                    <div className="col-span-3 text-slate-600">
                      {app.program}
                    </div>
                    <div className="col-span-3 font-semibold text-sky-900">
                      {app.allocatedRoomNumber ? `${app.allocatedHallName} - Room ${app.allocatedRoomNumber} (${app.allocatedBedNumber})` : 'Allocated'}
                    </div>
                    <div className="col-span-3 text-right">
                      <button
                        onClick={() => exportAllocationPass(app.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-sky-700 hover:bg-sky-50 rounded border border-sky-200"
                      >
                        PDF Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Check-In & Check-Out Desk */}
      {activeSubTab === 'checkin_desk' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-sky-600" />
                <span>Hostel Physical Check-In & Key Issuance Station</span>
              </h2>
              <p className="text-xs text-slate-500">
                Conduct physical verification, issue keys, inspect room conditions, and record formal student departures.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search student or ID..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {deskFeedback && (
            <div className="bg-sky-50 border border-sky-200 text-sky-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{deskFeedback}</span>
            </div>
          )}

          {/* Student resident list */}
          <div className="space-y-3">
            {filteredStudents.slice(0, 10).map((student) => {
              const isCheckedIn = student.checkInStatus === 'checked_in';
              const room = rooms.find(r => r.id === student.roomId);
              const hall = halls.find(h => h.id === student.hallId);
              const bed = room?.beds.find(b => b.id === student.bedSpaceId);

              return (
                <div
                  key={student.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-3 transition-colors ${
                    isCheckedIn ? 'bg-white border-slate-200' : 'bg-sky-50/40 border-sky-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{student.fullName}</span>
                      <span className="text-xs font-mono text-slate-500">({student.studentNumber})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCheckedIn
                            ? 'bg-sky-100 text-sky-800 border border-sky-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isCheckedIn ? '✓ Resident Checked In' : 'Pending Physical Check-In'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                      <span>Hall: <strong>{hall?.name || 'Assigned'}</strong></span>
                      <span>Room: <strong>{room?.roomNumber || '-'} ({bed?.bedNumber || 'Bed 1'})</strong></span>
                      <span>Program: <strong>{student.program}</strong></span>
                      {student.keyNumber && (
                        <span className="text-sky-800">Key Code: <strong>{student.keyNumber}</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                    {!isCheckedIn ? (
                      <button
                        onClick={() => handleDeskCheckIn(student)}
                        className="w-full md:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Issue Key & Check-In</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeskCheckOut(student)}
                        className="w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <DoorOpen className="w-3.5 h-3.5" />
                        <span>Formal Check-Out</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Room & Maintenance Master */}
      {activeSubTab === 'room_manager' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Hostel Room Master & Maintenance Toggles</h2>
              <p className="text-xs text-slate-500">Toggle bed status between Vacant and Under Maintenance.</p>
            </div>
            <button
              onClick={() => exportDailyReport()}
              className="text-xs text-sky-700 font-bold hover:underline"
            >
              Export Inventory Report →
            </button>
          </div>

          <div className="space-y-4">
            {rooms.slice(0, 8).map(room => {
              const hall = halls.find(h => h.id === room.hallId);
              return (
                <div key={room.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      {room.roomNumber} ({hall?.name})
                    </span>
                    <span className="text-xs text-slate-500">
                      Floor {room.floor} • K{room.pricePerTermZMW.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {room.beds.map(bed => {
                      const isMaint = bed.status === 'maintenance';
                      const isOcc = bed.status === 'occupied';
                      return (
                        <div key={bed.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                          <div>
                            <span className="font-bold block">{bed.bedNumber}</span>
                            <span className="text-[11px] text-slate-500 capitalize">{bed.status}</span>
                          </div>
                          {!isOcc && (
                            <button
                              onClick={() => updateBedStatus(bed.id, isMaint ? 'vacant' : 'maintenance')}
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                isMaint ? 'bg-sky-100 text-sky-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isMaint ? 'Set Vacant' : 'Maintenance'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: Payment Gateway Logs */}
      {activeSubTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Electronic Accommodation Fee Transactions</h2>
              <p className="text-xs text-slate-500">Live transaction logs from MTN MoMo, Airtel Money, Zamtel & Cards.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Collected:</span>
              <span className="text-sm font-black text-sky-800 block">
                K{payments.reduce((acc, p) => acc + p.amountZMW, 0).toLocaleString()} ZMW
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-sky-50/60 text-slate-600 uppercase font-bold border-b border-sky-100">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Amount (ZMW)</th>
                  <th className="p-3">Account / Phone</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map(pay => (
                  <tr key={pay.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{pay.reference}</td>
                    <td className="p-3 font-semibold text-slate-800">{pay.studentName} ({pay.studentNumber})</td>
                    <td className="p-3 uppercase font-bold text-slate-600">{pay.method.replace('_', ' ')}</td>
                    <td className="p-3 font-extrabold text-sky-700">K{pay.amountZMW.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-500">{pay.accountOrPhoneMask}</td>
                    <td className="p-3 text-slate-400">{pay.timestamp}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[10px]">
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 5: Security & Encrypted DB (RBAC) */}
      {activeSubTab === 'security_rbac' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-600" />
                <span>Role-Based Access Control (RBAC) & Database Encryption Status</span>
              </h2>
              <p className="text-xs text-slate-500">
                Securing confidential student health records, NRCs, and emergency contacts.
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
              AES-256 GCM ENCRYPTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Cryptographic Engine</span>
              <h4 className="text-sm font-bold text-slate-900">Web Crypto AES-GCM 256</h4>
              <p className="text-xs text-slate-500">
                Student NRC and emergency health notes are encrypted client-side prior to storage.
              </p>
              <div className="text-[11px] text-sky-700 font-semibold pt-1">
                ✓ Hardware Acceleration Active
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Real-Time Sync Protocol</span>
              <h4 className="text-sm font-bold text-slate-900">BroadcastChannel & Storage Bus</h4>
              <p className="text-xs text-slate-500">
                Any bed space booked, check-in performed, or payment completed updates all campus terminals instantly.
              </p>
              <div className="text-[11px] text-sky-700 font-semibold pt-1">
                ✓ Zero-Latency Cross-Device Bus
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Role-Based Security Policy</span>
              <h4 className="text-sm font-bold text-slate-900">Active Role: {currentRole.toUpperCase()}</h4>
              <p className="text-xs text-slate-500">
                {currentRole === 'admin'
                  ? 'Full administrative authority: View unmasked NRC, reallocate rooms, approve fee waivers.'
                  : currentRole === 'staff'
                  ? 'Hostel matron authority: Execute check-in/out, report damages. Sensitive NRCs are masked.'
                  : 'Student resident view: Restricted to personal allocation voucher and payment status.'}
              </p>
            </div>
          </div>

          {/* Masked vs Unmasked Security Demo */}
          <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-sky-950">
                  Live RBAC Data Masking Preview ({currentRole.toUpperCase()} View)
                </h4>
                <p className="text-[11px] text-sky-800">
                  Demonstration of how sensitive student National Registration Card (NRC) and phone numbers are protected.
                </p>
              </div>

              {currentRole === 'admin' && (
                <button
                  onClick={() => setRevealSensitiveData(!revealSensitiveData)}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  {revealSensitiveData ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{revealSensitiveData ? 'Mask Data' : 'Reveal Raw NRC'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {students.slice(0, 3).map(st => (
                <div key={st.id} className="p-2.5 bg-white rounded border border-sky-200">
                  <span className="font-bold text-slate-900 block">{st.fullName}</span>
                  <span className="text-slate-500 text-[10px]">NRC: </span>
                  <span className="font-mono font-bold text-slate-800">
                    {maskNRC(st.nrcNumber, currentRole === 'admin' && revealSensitiveData)}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Phone: {maskPhone(st.phone, currentRole === 'admin' && revealSensitiveData)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: Bed Payment Expiry & Mock Notification Center */}
      {activeSubTab === 'expiry_alerts' && (
        <div className="space-y-6">
          {/* Header & KPI Summary Cards */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h2 className="text-base font-extrabold text-slate-900">
                  Bed Space Payment Expiry & Alert Notification Center
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated monitoring of student accommodation fee tenures, countdown warnings, and SMS reminder broadcasts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const count = sendBatchExpiryReminders();
                  setBatchSuccessMsg(`Dispatched ${count} automated expiry SMS reminders to resident scholars.`);
                  setTimeout(() => setBatchSuccessMsg(null), 4000);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Send Batch Expiry Reminders</span>
              </button>
            </div>
          </div>

          {batchSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{batchSuccessMsg}</span>
              </div>
              <button onClick={() => setBatchSuccessMsg(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Residents Monitored
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {students.filter(s => s.checkInStatus === 'checked_in').length}
              </span>
              <span className="text-[10px] text-slate-500">Boarding across 4 hostel halls</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs bg-amber-50/30">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                Due Within 7 Days
              </span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">
                {expiryAlerts.length}
              </span>
              <span className="text-[10px] text-amber-700">Under automated watch</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-2xs bg-rose-50/30">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                Critical (≤ 3 Days)
              </span>
              <span className="text-2xl font-black text-rose-900 mt-1 block">
                {expiryAlerts.filter(a => a.daysRemaining <= 3 && a.daysRemaining > 0).length}
              </span>
              <span className="text-[10px] text-rose-700">Immediate action required</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-red-300 shadow-2xs bg-red-50/40">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                Overdue / Expired
              </span>
              <span className="text-2xl font-black text-red-900 mt-1 block">
                {expiryAlerts.filter(a => a.daysRemaining <= 0).length}
              </span>
              <span className="text-[10px] text-red-700">Pending bed repossession</span>
            </div>
          </div>

          {/* Resident Tenure & Expiry Control Table */}
          <div className="bg-white rounded-2xl border border-sky-100 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Resident Scholar Accommodation Tenure Roster
                </h3>
                <p className="text-[11px] text-slate-500">
                  Click "Trigger Alert UI" on any student to test notification alerts
                </p>
              </div>
              <span className="text-xs font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-bold">
                Today: 30 Sep 2026
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <th className="py-3 px-4">Student & ID</th>
                    <th className="py-3 px-4">Hostel & Space</th>
                    <th className="py-3 px-4">Term Fee</th>
                    <th className="py-3 px-4">Payment Expiry</th>
                    <th className="py-3 px-4">Days Left</th>
                    <th className="py-3 px-4">Urgency Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students
                    .filter(s => s.checkInStatus === 'checked_in')
                    .map(student => {
                      const room = rooms.find(r => r.id === student.roomId);
                      const hall = halls.find(h => h.id === student.hallId);
                      const days = calculateDaysRemaining(student.bedPaymentExpiryDate);
                      const isExp = days <= 0;
                      const isCrit = days > 0 && days <= 3;
                      const isWarn = days > 3 && days <= 7;

                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isExp ? 'bg-red-50/40' : isCrit ? 'bg-amber-50/30' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="font-extrabold text-slate-900">{student.fullName}</div>
                            <div className="text-[10px] font-mono text-slate-500">{student.studentNumber}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800 block truncate max-w-[180px]">
                              {hall?.name || 'Main Hall'}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Room {room?.roomNumber || 'A-101'} • {student.bedSpaceId || 'Bed Space'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            K{(student.bedFeeZMW || 2400).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">
                            {student.bedPaymentExpiryDate || '2026-10-05'}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                isExp
                                  ? 'bg-red-600 text-white'
                                  : isCrit
                                  ? 'bg-amber-500 text-white'
                                  : isWarn
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {isExp ? 'OVERDUE' : `${days} Days Left`}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {isExp ? (
                              <span className="text-[11px] font-extrabold text-red-700 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                Forfeiture Warning
                              </span>
                            ) : isCrit ? (
                              <span className="text-[11px] font-extrabold text-amber-700 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                Critical (Final Notice)
                              </span>
                            ) : isWarn ? (
                              <span className="text-[11px] font-bold text-amber-800">
                                Expiring Soon
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-emerald-700">
                                Active (Paid)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => triggerExpiryAlert(student.id, days)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-2xs ${
                                  isCrit || isExp
                                    ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                                    : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
                                }`}
                                title="Open Alert UI Modal"
                              >
                                <Bell className="w-3.5 h-3.5" />
                                <span>Trigger Alert UI</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  renewBedPayment(student.id);
                                }}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title="Instant Bed Space Renewal"
                              >
                                <span>Renew</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mock Automated SMS Dispatch Logs */}
          <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-sky-100 text-sky-800 font-bold">
                  <Smartphone className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Simulated Student SMS Notification Logs
                </h3>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Gateway: Connected (Copperbelt SMS Node)
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {expiryReminderLogs.slice(0, 5).map(log => (
                <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{log.studentName}</span>
                      <span className="text-slate-400 font-mono text-[10px]">({log.phone})</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold uppercase">
                        ✓ {log.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      "{log.message}"
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {log.sentAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Allocation Room Picker Modal */}
      {selectedAppForAllocation && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sky-100 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <span className="text-[10px] font-bold text-sky-700 uppercase bg-sky-100 px-2 py-0.5 rounded">
                Allocation Wizard
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Assign Bed Space for {selectedAppForAllocation.studentName}
              </h3>
              <p className="text-xs text-slate-500">
                Gender: {selectedAppForAllocation.gender.toUpperCase()} • Program: {selectedAppForAllocation.program}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Room:</label>
                <select
                  value={targetRoomId}
                  onChange={(e) => {
                    setTargetRoomId(e.target.value);
                    const rm = rooms.find(r => r.id === e.target.value);
                    const vacant = rm?.beds.find(b => b.status === 'vacant');
                    setTargetBedId(vacant?.id || '');
                  }}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-semibold"
                >
                  {allocationCandidateRooms.map(r => {
                    const hall = halls.find(h => h.id === r.hallId);
                    const vacantCount = r.beds.filter(b => b.status === 'vacant').length;
                    return (
                      <option key={r.id} value={r.id} disabled={vacantCount === 0}>
                        {hall?.name} — Room {r.roomNumber} ({vacantCount} vacant beds)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Bed Space:</label>
                <select
                  value={targetBedId}
                  onChange={(e) => setTargetBedId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-semibold"
                >
                  {rooms.find(r => r.id === targetRoomId)?.beds.map(b => (
                    <option key={b.id} value={b.id} disabled={b.status === 'occupied'}>
                      {b.bedNumber} ({b.status.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {allocationError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{allocationError}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedAppForAllocation(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAllocation}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
