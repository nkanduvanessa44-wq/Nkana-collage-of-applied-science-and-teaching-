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
  TrendingUp,
  BarChart3,
  Layers,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  X,
  Check,
  Download
} from 'lucide-react';
import { generateDailyRevenueReportPDF, DailyRevenueReportParams } from '../utils/generateReportsPdf';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export interface MonthlyRevenuePoint {
  month: string;
  fullName: string;
  period: string;
  mtnMomo: number;
  airtelMoney: number;
  bankCard: number;
  total: number;
  target: number;
  cumulative: number;
  occupancyBeds: number;
  collectionRate: number;
  description: string;
}

export const SIX_MONTH_REVENUE_DATA: MonthlyRevenuePoint[] = [
  {
    month: "May '26",
    fullName: 'May 2026',
    period: 'Early Bird & Returning Diplomates',
    mtnMomo: 48200,
    airtelMoney: 26400,
    bankCard: 18500,
    total: 93100,
    target: 90000,
    cumulative: 93100,
    occupancyBeds: 42,
    collectionRate: 94,
    description: 'Pre-registration bed allocations for mid-year terms'
  },
  {
    month: "Jun '26",
    fullName: 'June 2026',
    period: 'Registered Nursing Term Intake',
    mtnMomo: 62400,
    airtelMoney: 34800,
    bankCard: 24000,
    total: 121200,
    target: 115000,
    cumulative: 214300,
    occupancyBeds: 56,
    collectionRate: 96,
    description: 'Florence Nightingale Hall & Main Wing intake'
  },
  {
    month: "Jul '26",
    fullName: 'July 2026',
    period: 'Primary Teachers Diploma Influx',
    mtnMomo: 78600,
    airtelMoney: 41200,
    bankCard: 31400,
    total: 151200,
    target: 145000,
    cumulative: 365500,
    occupancyBeds: 68,
    collectionRate: 97,
    description: 'Dag Hammarskjöld Hall occupancy surge'
  },
  {
    month: "Aug '26",
    fullName: 'August 2026',
    period: 'Biomedical & Clinical Sciences Inflow',
    mtnMomo: 92400,
    airtelMoney: 54600,
    bankCard: 36200,
    total: 183200,
    target: 175000,
    cumulative: 548700,
    occupancyBeds: 81,
    collectionRate: 98,
    description: 'Executive Wing single/double bed reservations'
  },
  {
    month: "Sep '26",
    fullName: 'September 2026',
    period: 'Term 1 Main Intake (Peak Month)',
    mtnMomo: 118500,
    airtelMoney: 68200,
    bankCard: 44500,
    total: 231200,
    target: 220000,
    cumulative: 779900,
    occupancyBeds: 96,
    collectionRate: 95,
    description: 'Highest transaction velocity; all halls near capacity'
  },
  {
    month: "Oct '26",
    fullName: 'October 2026 (MTD)',
    period: 'Late Registrations & Renewals',
    mtnMomo: 96800,
    airtelMoney: 52400,
    bankCard: 38000,
    total: 187200,
    target: 200000,
    cumulative: 967100,
    occupancyBeds: 98,
    collectionRate: 91,
    description: 'Renewals and pending defaulter reconciliations'
  }
];

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
  const [activeTab, setActiveSection] = useState<'reconciliation' | 'trends' | 'defaulters' | 'analytics'>('reconciliation');
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Chart configuration state
  const [chartType, setChartType] = useState<'area' | 'stacked_bar' | 'cumulative'>('area');
  const [selectedMonth, setSelectedMonth] = useState<MonthlyRevenuePoint | null>(SIX_MONTH_REVENUE_DATA[4]); // Sep 2026 default
  const [showChartCard, setShowChartCard] = useState<boolean>(true);

  // Financial metrics
  const totalCollectedZMW = payments.reduce((acc, p) => acc + (p.status === 'success' ? p.amountZMW : 0), 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const criticalExpiries = expiryAlerts.filter(a => a.daysRemaining <= 3);

  // 6-Month Chart Totals
  const sixMonthTotalRevenue = SIX_MONTH_REVENUE_DATA.reduce((acc, curr) => acc + curr.total, 0);
  const sixMonthMomoTotal = SIX_MONTH_REVENUE_DATA.reduce((acc, curr) => acc + curr.mtnMomo, 0);
  const sixMonthAirtelTotal = SIX_MONTH_REVENUE_DATA.reduce((acc, curr) => acc + curr.airtelMoney, 0);
  const sixMonthBankTotal = SIX_MONTH_REVENUE_DATA.reduce((acc, curr) => acc + curr.bankCard, 0);
  const sixMonthAvg = Math.round(sixMonthTotalRevenue / SIX_MONTH_REVENUE_DATA.length);

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

  const [showDailyPdfModal, setShowDailyPdfModal] = useState<boolean>(false);
  const [selectedReportDate, setSelectedReportDate] = useState<string>('2026-09-29');
  const [pdfChannelFilter, setPdfChannelFilter] = useState<string>('all');
  const [pdfStatusFilter, setPdfStatusFilter] = useState<string>('all');
  const [officerName, setOfficerName] = useState<string>('Chileshe Mulenga (Senior Bursar NK-FIN-084)');
  const [auditorName, setAuditorName] = useState<string>('Patricia Mwila (Senior Internal Auditor, CA-Zambia)');
  const [approverName, setApproverName] = useState<string>('Dr. Mwamba Silungwe (College Principal & Registrar)');
  const [auditNotes, setAuditNotes] = useState<string>('All digital hostel fees verified against incoming telecom MoMo aggregator webhooks and Zanaco bank clearing settlements.');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Available distinct dates from payments
  const distinctPaymentDates = Array.from(
    new Set(
      payments.map(p => (p.timestamp.includes(' ') ? p.timestamp.split(' ')[0] : p.timestamp.slice(0, 10)))
    )
  ).sort().reverse();

  // Metrics for currently selected report date in modal
  const modalSelectedPayments = payments.filter(p => {
    const matchDate = selectedReportDate === 'all' || p.timestamp.startsWith(selectedReportDate);
    const matchChannel = pdfChannelFilter === 'all' || p.method === pdfChannelFilter;
    const matchStatus = pdfStatusFilter === 'all' || (pdfStatusFilter === 'success' ? (p.status === 'success' || verifiedMap[p.id]) : p.status === pdfStatusFilter);
    return matchDate && matchChannel && matchStatus;
  });

  const modalTotalZMW = modalSelectedPayments.reduce((acc, p) => acc + ((p.status === 'success' || verifiedMap[p.id]) ? p.amountZMW : 0), 0);
  const modalMomoZMW = modalSelectedPayments.filter(p => p.method === 'mtn_momo').reduce((acc, p) => acc + p.amountZMW, 0);
  const modalAirtelZMW = modalSelectedPayments.filter(p => p.method === 'airtel_money').reduce((acc, p) => acc + p.amountZMW, 0);
  const modalCardZMW = modalSelectedPayments.filter(p => p.method === 'visa_mastercard').reduce((acc, p) => acc + p.amountZMW, 0);

  const handleVerifyPayment = (id: string, ref: string) => {
    setVerifiedMap(prev => ({ ...prev, [id]: true }));
    setNotificationMsg(`Transaction ${ref} verified and credited to student hostel account.`);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleDownloadDailyRevenuePDF = (overrideDate?: string) => {
    setIsGeneratingPdf(true);
    const targetDate = overrideDate !== undefined ? overrideDate : selectedReportDate;
    
    try {
      const fileName = generateDailyRevenueReportPDF({
        reportDate: targetDate,
        displayDateLabel: targetDate === 'all'
          ? 'All Daily Batches (Consolidated)'
          : targetDate,
        payments,
        verifiedMap,
        officerName,
        auditorName,
        approverName,
        filterChannel: pdfChannelFilter,
        filterStatus: pdfStatusFilter,
        additionalNotes: auditNotes
      });

      setNotificationMsg(`Official Daily Revenue Report (${fileName}) generated and downloaded successfully.`);
      setTimeout(() => setNotificationMsg(null), 4500);
      setShowDailyPdfModal(false);
    } catch (err) {
      console.error('Failed to generate daily revenue report PDF:', err);
      setNotificationMsg('Error generating Daily Revenue Report PDF. Please verify your data.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleExportBursarPDF = () => {
    handleDownloadDailyRevenuePDF('all');
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
              onClick={() => setShowDailyPdfModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Daily Revenue PDF</span>
            </button>
            <button
              onClick={() => handleDownloadDailyRevenuePDF('all')}
              title="Instant download consolidated daily revenue audit"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Quick Audit PDF</span>
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

      {/* Daily Revenue Report Configuration & Download Modal */}
      {showDailyPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0A1931] text-white p-5 border-b border-slate-800 relative">
              <div className="h-1 bg-amber-500 absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F6FBF]/30 border border-sky-400/30 flex items-center justify-center text-sky-400">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 block">
                      Directorate of Financial Services • Bursar Office
                    </span>
                    <h3 className="text-lg font-black text-white">
                      Generate Daily Revenue Report (PDF)
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowDailyPdfModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Official institutional PDF document with payment gateway reconciliations (MTN MoMo, Airtel, Bank Card), itemized transaction ledgers, and formal administrative sign-off blocks.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Step 1: Date Selection */}
              <div>
                <label className="text-xs font-bold text-[#0A1931] uppercase tracking-wider block mb-2">
                  1. Select Daily Revenue Audit Date / Batch:
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {distinctPaymentDates.map((dateStr) => {
                    const count = payments.filter(p => p.timestamp.startsWith(dateStr)).length;
                    const sum = payments
                      .filter(p => p.timestamp.startsWith(dateStr) && (p.status === 'success' || verifiedMap[p.id]))
                      .reduce((acc, p) => acc + p.amountZMW, 0);
                    const isSelected = selectedReportDate === dateStr;

                    return (
                      <button
                        key={dateStr}
                        type="button"
                        onClick={() => setSelectedReportDate(dateStr)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${
                          isSelected
                            ? 'bg-sky-50 border-[#0F6FBF] text-[#0F6FBF] ring-2 ring-[#0F6FBF]/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="block font-black">{dateStr}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {count} txns • K{sum.toLocaleString()} ZMW
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setSelectedReportDate('all')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${
                      selectedReportDate === 'all'
                        ? 'bg-sky-50 border-[#0F6FBF] text-[#0F6FBF] ring-2 ring-[#0F6FBF]/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-black">All Daily Batches</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Consolidated Audit Ledger
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Or pick custom calendar date:</span>
                  <input
                    type="date"
                    value={selectedReportDate === 'all' ? '' : selectedReportDate}
                    onChange={(e) => setSelectedReportDate(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#0F6FBF]"
                  />
                </div>
              </div>

              {/* Step 2: Live Summary Metric Ribbon */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Audit Scope Preview ({selectedReportDate === 'all' ? 'All Batches' : selectedReportDate}):
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    K{modalTotalZMW.toLocaleString()} ZMW Total Reconciled
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">TRANSACTIONS</span>
                    <span className="text-base font-black text-slate-900">{modalSelectedPayments.length} records</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-amber-600 block font-bold">MTN MOMO</span>
                    <span className="text-base font-black text-amber-700">K{modalMomoZMW.toLocaleString()}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-rose-600 block font-bold">AIRTEL MONEY</span>
                    <span className="text-base font-black text-rose-700">K{modalAirtelZMW.toLocaleString()}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-sky-600 block font-bold">CARD / VISA</span>
                    <span className="text-base font-black text-sky-700">K{modalCardZMW.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Filter Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Channel Filter:
                  </label>
                  <select
                    value={pdfChannelFilter}
                    onChange={(e) => setPdfChannelFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="all">All Payment Gateways</option>
                    <option value="mtn_momo">MTN Mobile Money Only</option>
                    <option value="airtel_money">Airtel Money Only</option>
                    <option value="visa_mastercard">Visa / Mastercard / POS Only</option>
                    <option value="zamtel_kwacha">Zamtel Kwacha / Cash</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Settlement Status:
                  </label>
                  <select
                    value={pdfStatusFilter}
                    onChange={(e) => setPdfStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="all">All Statuses (Verified & Pending)</option>
                    <option value="success">Verified & Settled Only</option>
                    <option value="pending">Pending Gateway Clearance Only</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Sign-off Particulars */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-[#0A1931] uppercase tracking-wider block">
                  2. Official Institutional Signatories:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">
                      Prepared By (Bursar):
                    </label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">
                      Audited By (Internal Audit):
                    </label>
                    <input
                      type="text"
                      value={auditorName}
                      onChange={(e) => setAuditorName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">
                      Approved By (Principal):
                    </label>
                    <input
                      type="text"
                      value={approverName}
                      onChange={(e) => setApproverName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    Bursar Audit Remarks / Statutory Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[11px] text-slate-500">
                PDF format: A4 Portrait • Official Nkana College Watermark & Seal
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowDailyPdfModal(false)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isGeneratingPdf}
                  onClick={() => handleDownloadDailyRevenuePDF()}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Daily Revenue PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* 6-Month Hostel Revenue Trends Chart Section (Recharts) */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-[#0F6FBF] border border-sky-200 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#0F6FBF]" />
                Hostel Revenue Intelligence • Recharts
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                May 2026 – Oct 2026 (6 Months)
              </span>
            </div>
            <h2 className="text-xl font-black text-[#0A1931] tracking-tight">
              Hostel Revenue Trends & Bursary Inflow
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl">
              Audited month-by-month accommodation fee collections across MTN Mobile Money, Airtel Money, Bank deposits, and term intakes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartType === 'area'
                    ? 'bg-white text-[#0F6FBF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Revenue vs Target
              </button>
              <button
                onClick={() => setChartType('stacked_bar')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartType === 'stacked_bar'
                    ? 'bg-white text-[#0F6FBF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Payment Channels
              </button>
              <button
                onClick={() => setChartType('cumulative')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartType === 'cumulative'
                    ? 'bg-white text-[#0F6FBF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cumulative Curve
              </button>
            </div>

            <button
              onClick={() => setShowChartCard(prev => !prev)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title={showChartCard ? 'Minimize Chart' : 'Expand Chart'}
            >
              {showChartCard ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showChartCard && (
          <>
            {/* 6-Month Metric Summary Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  6-Mo Total Inflow
                </span>
                <span className="text-lg font-black text-[#0A1931] mt-0.5 block">
                  K{sixMonthTotalRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +101% growth (May→Sep)
                </span>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold text-amber-900/80 uppercase tracking-wider block">
                  MTN Mobile Money
                </span>
                <span className="text-lg font-black text-amber-950 mt-0.5 block">
                  K{sixMonthMomoTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-800 font-medium block mt-0.5">
                  51.4% Primary Channel Share
                </span>
              </div>

              <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold text-rose-900/80 uppercase tracking-wider block">
                  Airtel Money
                </span>
                <span className="text-lg font-black text-rose-950 mt-0.5 block">
                  K{sixMonthAirtelTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-rose-800 font-medium block mt-0.5">
                  28.7% Second Channel
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Monthly Run Rate
                </span>
                <span className="text-lg font-black text-slate-800 mt-0.5 block">
                  K{sixMonthAvg.toLocaleString()}
                </span>
                <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">
                  Term 1 Peak: K231.2k (Sep)
                </span>
              </div>
            </div>

            {/* Recharts Canvas */}
            <div className="w-full h-80 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'area' ? (
                  <AreaChart data={SIX_MONTH_REVENUE_DATA} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="totalRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F6FBF" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0F6FBF" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="targetRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `K${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const pt = payload[0].payload as MonthlyRevenuePoint;
                          return (
                            <div className="bg-[#0A1931] text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs min-w-[220px]">
                              <div className="flex justify-between items-center mb-1 pb-1.5 border-b border-slate-700/80">
                                <span className="font-black text-sky-300 text-sm">{pt.fullName}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-bold border border-emerald-600/40">
                                  {pt.collectionRate}% Met
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-300 mb-2 italic">{pt.period}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-slate-100 font-bold">
                                  <span>Total Collected:</span>
                                  <span className="text-sky-300">K{pt.total.toLocaleString()} ZMW</span>
                                </div>
                                <div className="flex justify-between text-slate-300 text-[11px]">
                                  <span>Budget Target:</span>
                                  <span>K{pt.target.toLocaleString()} ZMW</span>
                                </div>
                                <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                                  <span>Occupied Beds:</span>
                                  <span className="text-white font-bold">{pt.occupancyBeds}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                      iconType="circle"
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      name="Actual Collected (ZMW)"
                      stroke="#0F6FBF"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#totalRevenueGradient)"
                      activeDot={{ r: 6, stroke: '#0F6FBF', strokeWidth: 2, fill: '#FFFFFF' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      name="Bursary Budget Target (ZMW)"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#targetRevenueGradient)"
                    />
                  </AreaChart>
                ) : chartType === 'stacked_bar' ? (
                  <BarChart data={SIX_MONTH_REVENUE_DATA} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `K${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const pt = payload[0].payload as MonthlyRevenuePoint;
                          return (
                            <div className="bg-[#0A1931] text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs min-w-[230px]">
                              <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-slate-700">
                                <span className="font-bold text-sky-300">{pt.fullName}</span>
                                <span className="font-black text-white">K{pt.total.toLocaleString()} ZMW</span>
                              </div>
                              <div className="space-y-1 text-[11px]">
                                <div className="flex justify-between text-amber-300">
                                  <span>MTN MoMo:</span>
                                  <span className="font-bold">K{pt.mtnMomo.toLocaleString()} ({Math.round((pt.mtnMomo / pt.total) * 100)}%)</span>
                                </div>
                                <div className="flex justify-between text-rose-300">
                                  <span>Airtel Money:</span>
                                  <span className="font-bold">K{pt.airtelMoney.toLocaleString()} ({Math.round((pt.airtelMoney / pt.total) * 100)}%)</span>
                                </div>
                                <div className="flex justify-between text-sky-200">
                                  <span>Bank Deposit & Card:</span>
                                  <span className="font-bold">K{pt.bankCard.toLocaleString()} ({Math.round((pt.bankCard / pt.total) * 100)}%)</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="circle" />
                    <Bar dataKey="mtnMomo" name="MTN MoMo" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="airtelMoney" name="Airtel Money" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="bankCard" name="Bank & Card" stackId="a" fill="#0F6FBF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={SIX_MONTH_REVENUE_DATA} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `K${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const pt = payload[0].payload as MonthlyRevenuePoint;
                          return (
                            <div className="bg-[#0A1931] text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-xs">
                              <span className="font-bold text-sky-300 block">{pt.fullName}</span>
                              <div className="mt-1">
                                <span className="text-slate-300 block text-[10px]">Cumulative Total To Date:</span>
                                <span className="text-base font-black text-white">K{pt.cumulative.toLocaleString()} ZMW</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="circle" />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      name="Cumulative Hostel Revenue (ZMW)"
                      stroke="#0F6FBF"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#0F6FBF' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Clickable Month Insight Cards */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Click Month for Audited Term Inflow Breakdown:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SIX_MONTH_REVENUE_DATA.map((pt) => {
                  const isSelected = selectedMonth?.month === pt.month;
                  return (
                    <button
                      key={pt.month}
                      onClick={() => setSelectedMonth(pt)}
                      className={`text-left p-3 rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-[#0F6FBF] bg-sky-50/80 shadow-xs ring-1 ring-[#0F6FBF]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-slate-800">{pt.month}</span>
                        <span className="text-[10px] font-bold text-emerald-600">{pt.collectionRate}%</span>
                      </div>
                      <div className="text-sm font-black text-[#0A1931] mt-1">
                        K{(pt.total / 1000).toFixed(1)}k
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {pt.occupancyBeds} beds • {pt.period.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedMonth && (
                <div className="mt-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#0A1931] text-sm">{selectedMonth.fullName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0F6FBF] text-white">
                        {selectedMonth.period}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs mt-0.5">{selectedMonth.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold">
                    <span className="text-amber-800">
                      MTN MoMo: <strong>K{selectedMonth.mtnMomo.toLocaleString()}</strong>
                    </span>
                    <span className="text-rose-800">
                      Airtel: <strong>K{selectedMonth.airtelMoney.toLocaleString()}</strong>
                    </span>
                    <span className="text-sky-800">
                      Bank/Card: <strong>K{selectedMonth.bankCard.toLocaleString()}</strong>
                    </span>
                    <span className="text-[#0A1931]">
                      Total: <strong>K{selectedMonth.total.toLocaleString()} ZMW</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveSection('reconciliation')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'reconciliation'
              ? 'border-[#0F6FBF] text-[#0F6FBF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Ledger & MoMo Reconciliations ({filteredPayments.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('trends')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'trends'
              ? 'border-[#0F6FBF] text-[#0F6FBF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>6-Month Revenue Trends & Forecasting</span>
        </button>

        <button
          onClick={() => setActiveSection('defaulters')}
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
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
          className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
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

              <button
                type="button"
                onClick={() => setShowDailyPdfModal(true)}
                className="px-3 py-2 text-xs rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0F6FBF] border border-sky-200 font-bold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95"
                title="Open Daily Revenue Audit Report Generator"
              >
                <FileDown className="w-3.5 h-3.5 text-[#0F6FBF]" />
                <span>Daily Revenue PDF</span>
              </button>
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

      {/* Tab: 6-Month Revenue Trends & Forecasting (Recharts Analytics) */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Detailed Audited 6-Month Ledger Table */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0A1931] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#0F6FBF]" />
                  6-Month Hostel Fee Reconciliation & Target Variance
                </h3>
                <p className="text-xs text-slate-500">
                  Official audited breakdown of hostel revenue collections against Bursary Directorate targets (May 2026 – Oct 2026).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Total Collected: K{sixMonthTotalRevenue.toLocaleString()} ZMW
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Month</th>
                    <th className="py-3 px-3">Term Intake Period</th>
                    <th className="py-3 px-3">Actual Revenue (ZMW)</th>
                    <th className="py-3 px-3">Budget Target</th>
                    <th className="py-3 px-3">Variance</th>
                    <th className="py-3 px-3">Target Met</th>
                    <th className="py-3 px-3">MTN MoMo</th>
                    <th className="py-3 px-3">Airtel Money</th>
                    <th className="py-3 px-3">Bank/Card</th>
                    <th className="py-3 px-3 text-right">Occupied Beds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {SIX_MONTH_REVENUE_DATA.map((pt) => {
                    const variance = pt.total - pt.target;
                    const isPositive = variance >= 0;
                    return (
                      <tr key={pt.month} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-[#0A1931]">
                          {pt.fullName}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600">
                          {pt.period}
                        </td>
                        <td className="py-3.5 px-3 font-black text-slate-900">
                          K{pt.total.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-slate-500">
                          K{pt.target.toLocaleString()}
                        </td>
                        <td className={`py-3.5 px-3 font-bold ${isPositive ? 'text-emerald-600' : 'text-amber-700'}`}>
                          {isPositive ? `+K${variance.toLocaleString()}` : `-K${Math.abs(variance).toLocaleString()}`}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pt.collectionRate >= 95
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {pt.collectionRate}%
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-amber-800 font-medium">
                          K{pt.mtnMomo.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 text-rose-800 font-medium">
                          K{pt.airtelMoney.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 text-sky-800 font-medium">
                          K{pt.bankCard.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-slate-800 text-right">
                          {pt.occupancyBeds} beds
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forecasting & Channel Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0F6FBF] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0A1931]">Nov 2026 Bursary Forecast</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Projected hostel revenue for November 2026 is estimated at <strong>K195,000 ZMW</strong> based on remaining bed renewals for second term nursing cohorts and late clinical enrollments.
              </p>
              <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 text-[11px] text-[#0F6FBF] font-semibold">
                • Target Capacity: 104 beds (+6 beds net expansion)
                <br />• Projected On-Time Compliance: 93.5%
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0A1931]">Mobile Gateway Dominance</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mobile Money accounts for <strong>80.1%</strong> of all hostel receipts across Nkana College (MTN: 51.4%, Airtel: 28.7%), confirming student preference for instant MoMo push reconciliations.
              </p>
              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60 text-[11px] text-amber-900 font-semibold">
                • Instant MoMo Settlement speed: &lt; 90 seconds
                <br />• Automated Bursary SMS confirmation active
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0A1931]">Auditor Compliance Index</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All 6-month transactions are cross-matched with student matriculation records and Ministry accreditation quotas with 100% voucher reconciliation integrity.
              </p>
              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 text-[11px] text-emerald-900 font-semibold">
                • Zero unallocated hostel suspense balances
                <br />• Full ZRA and TEVETA compliance audit-ready
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Defaulters & Expiries */}
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
