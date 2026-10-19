import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Smartphone,
  FileDown,
  Building2,
  Search,
  Filter,
  RefreshCw,
  Send,
  ShieldCheck,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const AccountantFinanceView: React.FC = () => {
  const {
    payments,
    expiryAlerts,
    students,
    rooms,
    halls,
    triggerExpiryAlert,
    sendBatchExpiryReminders,
    setActiveTab
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveSection] = useState<'reconciliation' | 'defaulters' | 'analytics'>('reconciliation');
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Financial metrics
  const totalCollectedZMW = payments.reduce((acc, p) => acc + (p.status === 'success' ? p.amountZMW : 0), 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const criticalExpiries = expiryAlerts.filter(a => a.daysRemaining <= 3);

  // Filtered payments
  const filteredPayments = payments.filter(p => {
    const matchSearch =
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMethod = selectedMethod === 'all' || p.method === selectedMethod;
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchSearch && matchMethod && matchStatus;
  });

  const handleVerifyPayment = (id: string, ref: string) => {
    setVerifiedMap(prev => ({ ...prev, [id]: true }));
    setNotificationMsg(`Transaction ${ref} verified and credited to student hostel account.`);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleExportBursarPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 111, 191);
    doc.rect(0, 0, 210, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 14, 12);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('BURSAR & FINANCE DIRECTORATE • OFFICIAL RECONCILIATION AUDIT', 14, 20);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString()} | Officer: Chileshe Mulenga (Senior Bursar)`, 14, 38);
    doc.text(`Total Revenue Audited: K${totalCollectedZMW.toLocaleString()} ZMW | Total Transactions: ${payments.length}`, 14, 45);

    let y = 56;
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y - 5, 182, 8, 'F');
    doc.text('Ref Number', 16, y);
    doc.text('Student', 55, y);
    doc.text('Method', 110, y);
    doc.text('Amount', 150, y);
    doc.text('Status', 175, y);

    y += 8;
    doc.setFont('helvetica', 'normal');
    filteredPayments.slice(0, 20).forEach((p) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(p.reference.substring(0, 16), 16, y);
      doc.text(p.studentName.substring(0, 24), 55, y);
      doc.text(p.method.replace('_', ' ').toUpperCase(), 110, y);
      doc.text(`K${p.amountZMW.toLocaleString()}`, 150, y);
      doc.text(verifiedMap[p.id] ? 'VERIFIED' : p.status.toUpperCase(), 175, y);
      y += 7;
    });

    doc.save(`Nkana_Bursar_Reconciliation_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Role Privilege Notice */}
      <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Active Role: Bursar & Finance Officer
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-[#0F6FBF] border border-sky-200">
                Staff ID: NK-FIN-084
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#0A1931] tracking-tight">
              Bursar Financial Reconciliations & Fee Control
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl">
              Official ledger for Nkana College accommodation fees, MTN/Airtel Mobile Money verification, bed payment renewals, and hostel defaulter tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportBursarPDF}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Audit PDF</span>
            </button>
            <button
              onClick={() => setActiveTab('user_roles')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#0F6FBF]" />
              <span>Roles Dashboard</span>
            </button>
          </div>
        </div>

        {/* Privilege Enforced Box */}
        <div className="mt-4 pt-4 border-t border-amber-100 flex items-start gap-2.5 text-xs text-amber-900 bg-amber-50/70 p-3 rounded-2xl">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Role Privilege Enforced:</span> As an Accountant / Bursar, personal student bed application forms are hidden and excluded from your interface to uphold financial compliance and separation of duties.
          </div>
        </div>
      </div>

      {notificationMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Bed Fees Collected
            </span>
            <span className="text-2xl font-black text-[#0A1931] mt-1 block">
              K{totalCollectedZMW.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> Settled to College Acct
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Mobile Money Channels
            </span>
            <span className="text-2xl font-black text-[#0A1931] mt-1 block">
              4 Active
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              MTN MoMo, Airtel, Zamtel, Card
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0F6FBF] flex items-center justify-center font-bold">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Pending Reconciliations
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {pendingCount} Pending
            </span>
            <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
              Awaiting Bursary validation
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Critical Payment Expiries
            </span>
            <span className="text-2xl font-black text-red-700 mt-1 block">
              {criticalExpiries.length} Defaulters
            </span>
            <span className="text-[11px] text-red-600 font-semibold block mt-0.5">
              ≤ 3 days remaining on bed fee
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          onClick={() => setActiveSection('reconciliation')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'reconciliation'
              ? 'border-[#0F6FBF] text-[#0F6FBF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Ledger & MoMo Reconciliations ({filteredPayments.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('defaulters')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'defaulters'
              ? 'border-[#0F6FBF] text-[#0F6FBF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Bed Payment Expiries & Defaulters ({expiryAlerts.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('analytics')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'analytics'
              ? 'border-[#0F6FBF] text-[#0F6FBF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Revenue by Residential Hall</span>
        </button>
      </div>

      {/* Tab 1: Payments & MoMo Reconciliation */}
      {activeTab === 'reconciliation' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search student, student no. or ref..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F6FBF]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedMethod}
                onChange={e => setSelectedMethod(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
              >
                <option value="all">All Channels</option>
                <option value="mtn_momo">MTN MoMo</option>
                <option value="airtel_money">Airtel Money</option>
                <option value="zamtel_kwacha">Zamtel Kwacha</option>
                <option value="visa_mastercard">Visa / Mastercard</option>
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="success">Successful / Verified</option>
                <option value="pending">Pending Review</option>
                <option value="failed">Failed / Reversed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Receipt / Ref</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Student No.</th>
                  <th className="py-3 px-3">Amount (ZMW)</th>
                  <th className="py-3 px-3">Payment Channel</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Bursary Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPayments.map((p) => {
                  const isVerified = verifiedMap[p.id] || p.status === 'success';
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">
                        {p.reference}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#0A1931]">
                        {p.studentName}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        {p.studentNumber}
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">
                        K{p.amountZMW.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.method === 'mtn_momo'
                            ? 'bg-amber-100 text-amber-900'
                            : p.method === 'airtel_money'
                            ? 'bg-red-100 text-red-900'
                            : p.method === 'zamtel_kwacha'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-sky-100 text-[#0F6FBF]'
                        }`}>
                          {p.method.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {p.timestamp}
                      </td>
                      <td className="py-3 px-3">
                        {isVerified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Reconciled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <Clock className="w-3 h-3" /> Awaiting Check
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {!isVerified ? (
                          <button
                            onClick={() => handleVerifyPayment(p.id, p.reference)}
                            className="px-2.5 py-1 bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white rounded-lg text-[11px] font-bold transition-all active:scale-95"
                          >
                            Verify
                          </button>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400">
                            Audited
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Defaulters & Expiries */}
      {activeTab === 'defaulters' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-[#0A1931]">
                Hostel Bed Fee Expiry & Defaulter Registry
              </h3>
              <p className="text-xs text-slate-500">
                Students with bed space payments nearing 7-day expiration or overdue.
              </p>
            </div>
            <button
              onClick={() => {
                sendBatchExpiryReminders();
                setNotificationMsg(`Bursar SMS reminders broadcasted to all ${expiryAlerts.length} students on defaulter registry.`);
                setTimeout(() => setNotificationMsg(null), 4000);
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Bulk Bursar SMS Reminders</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Student No.</th>
                  <th className="py-3 px-3">Residential Hall</th>
                  <th className="py-3 px-3">Room & Bed</th>
                  <th className="py-3 px-3">Expiry Date</th>
                  <th className="py-3 px-3">Days Left</th>
                  <th className="py-3 px-3">Outstanding (ZMW)</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expiryAlerts.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#0A1931]">
                      {exp.studentName}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {exp.studentNumber}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {exp.hallName}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-semibold">
                      {exp.roomNumber} ({exp.bedNumber})
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {exp.expiryDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        exp.daysRemaining <= 0
                          ? 'bg-red-100 text-red-900'
                          : exp.daysRemaining <= 3
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-yellow-50 text-yellow-800'
                      }`}>
                        {exp.daysRemaining <= 0 ? 'Expired' : `${exp.daysRemaining} Days`}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-black text-slate-900">
                      K{exp.amountDueZMW.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => triggerExpiryAlert(exp.studentId, exp.daysRemaining)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold transition-all"
                      >
                        Bursar Notice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Revenue by Residence Hall */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {halls.map((hall) => {
            const hallRooms = rooms.filter(r => r.hallId === hall.id);
            let occupied = 0;
            let total = 0;
            hallRooms.forEach(r => {
              r.beds.forEach(b => {
                total++;
                if (b.status === 'occupied') occupied++;
              });
            });
            const estimatedRevenue = occupied * 2400;

            return (
              <div key={hall.id} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A1931]">{hall.name}</h4>
                    <span className="text-[11px] text-slate-500 uppercase">{hall.genderAllowed} Residence</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                    K{estimatedRevenue.toLocaleString()} ZMW
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Occupancy Rate</span>
                    <span className="font-bold">{total > 0 ? Math.round((occupied / total) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0F6FBF] h-2 rounded-full transition-all"
                      style={{ width: `${total > 0 ? (occupied / total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-gray-100">
                  <span>Occupied Beds: <strong>{occupied}</strong> / {total}</span>
                  <span>Warden: {hall.wardenName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
