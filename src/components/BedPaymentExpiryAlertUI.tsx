import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Bell,
  Clock,
  CheckCircle2,
  X,
  CreditCard,
  Smartphone,
  ShieldAlert,
  Send,
  FileDown,
  Building2,
  Bed,
  User,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { generateBedPaymentReceiptPDF } from '../utils/generateReportsPdf';
import { PaymentTransaction } from '../types';

export const BedPaymentExpiryAlertUI: React.FC = () => {
  const {
    activeExpiryPopup,
    dismissExpiryPopup,
    acknowledgeExpiryAlert,
    renewBedPayment,
    triggerExpiryAlert,
    sendBatchExpiryReminders,
    expiryAlerts,
    expiryReminderLogs,
    students,
    rooms,
    halls
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard'>('mtn_momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{ transaction: PaymentTransaction; nextExpiry: string } | null>(null);
  const [showSmsPreview, setShowSmsPreview] = useState(false);
  const [floatingPanelOpen, setFloatingPanelOpen] = useState(false);

  // Custom trigger state in floating panel
  const [selectedSimStudentId, setSelectedSimStudentId] = useState(students[0]?.id || 'std-1');
  const [simDays, setSimDays] = useState(3);
  const [bulkSentCount, setBulkSentCount] = useState<number | null>(null);

  // When activeExpiryPopup opens, sync phone number
  React.useEffect(() => {
    if (activeExpiryPopup) {
      setPhoneNumber(activeExpiryPopup.phone || '+260 977 123 456');
      setPaymentSuccessData(null);
      setIsProcessing(false);
      setShowSmsPreview(false);
    }
  }, [activeExpiryPopup]);

  const handleProcessRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExpiryPopup) return;

    setIsProcessing(true);
    setTimeout(() => {
      const student = students.find(s => s.id === activeExpiryPopup.studentId);
      const res = renewBedPayment(activeExpiryPopup.studentId, paymentMethod, activeExpiryPopup.amountDueZMW);
      setIsProcessing(false);
      if (res.success && student) {
        // Calculate the next expiry date string (approx 90 days ahead)
        const d = new Date('2026-09-30');
        d.setDate(d.getDate() + 90);
        const nextExp = d.toISOString().split('T')[0];
        setPaymentSuccessData({
          transaction: res.transaction,
          nextExpiry: nextExp
        });
      }
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    if (!paymentSuccessData || !activeExpiryPopup) return;
    const student = students.find(s => s.id === activeExpiryPopup.studentId);
    if (student) {
      generateBedPaymentReceiptPDF(paymentSuccessData.transaction, student, paymentSuccessData.nextExpiry);
    }
  };

  const handleBroadcastReminders = () => {
    const count = sendBatchExpiryReminders();
    setBulkSentCount(count);
    setTimeout(() => setBulkSentCount(null), 4000);
  };

  const criticalOrExpiredCount = expiryAlerts.filter(a => a.daysRemaining <= 3).length;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. HIGH-IMPACT MODAL / ALERT UI: Triggers on Near Expiry Notification     */}
      {/* ========================================================================= */}
      {activeExpiryPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            {/* Header with High-Visibility Emergency / Alert Styling */}
            <div
              className={`p-6 text-white relative ${
                activeExpiryPopup.urgency === 'expired'
                  ? 'bg-gradient-to-r from-red-700 via-rose-700 to-red-900'
                  : activeExpiryPopup.urgency === 'critical'
                  ? 'bg-gradient-to-r from-amber-600 via-red-600 to-rose-700'
                  : 'bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900'
              }`}
            >
              {/* Dismiss button */}
              <button
                onClick={dismissExpiryPopup}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Dismiss Alert"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30 shadow-inner">
                  {activeExpiryPopup.urgency === 'expired' ? (
                    <ShieldAlert className="w-8 h-8 text-amber-200 animate-bounce" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-300 animate-pulse" />
                  )}
                </div>

                <div className="space-y-1 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-white text-slate-900 shadow-xs">
                      {activeExpiryPopup.urgency === 'expired'
                        ? '🚨 BED ALLOCATION EXPIRED'
                        : activeExpiryPopup.urgency === 'critical'
                        ? '⚠️ URGENT PAYMENT ALERT'
                        : '⏰ PAYMENT EXPIRY NOTICE'}
                    </span>
                    <span className="text-xs text-sky-100 font-mono">
                      Ref: NOTIF-EXP-{activeExpiryPopup.studentId.slice(-4).toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeExpiryPopup.daysRemaining <= 0
                      ? 'Student Bed Space Allocation Expired!'
                      : activeExpiryPopup.daysRemaining === 1
                      ? 'Bed Payment Expiring Tomorrow!'
                      : `Bed Space Payment Nearing Expiry (${activeExpiryPopup.daysRemaining} Days Left)`}
                  </h2>

                  <p className="text-xs text-sky-100/90 leading-relaxed">
                    Nkana College Hostel Directorate • Bed space fees must be renewed to safeguard room residency.
                  </p>
                </div>
              </div>

              {/* Countdown Strip */}
              <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>
                    Expiry Due Date:{' '}
                    <strong>
                      {activeExpiryPopup.expiryDate} (
                      {activeExpiryPopup.daysRemaining <= 0
                        ? 'OVERDUE'
                        : `${activeExpiryPopup.daysRemaining} days remaining`}
                      )
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold">
                    Fee Due: K{activeExpiryPopup.amountDueZMW.toLocaleString()} ZMW
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {paymentSuccessData ? (
                /* Payment Success State */
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Bed Space Renewal Succeeded!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                      Payment of <strong>K{paymentSuccessData.transaction.amountZMW.toLocaleString()} ZMW</strong> has been processed via{' '}
                      <span className="uppercase font-bold">{paymentSuccessData.transaction.method.replace('_', ' ')}</span>.
                      The allocation for <strong>{activeExpiryPopup.studentName}</strong> is now verified and renewed until{' '}
                      <strong>{paymentSuccessData.nextExpiry}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Receipt Number:</span>
                      <span className="font-bold text-slate-900">{paymentSuccessData.transaction.receiptNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction Ref:</span>
                      <span className="font-bold text-sky-700">{paymentSuccessData.transaction.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Next Expiry Date:</span>
                      <span className="font-bold text-emerald-700">{paymentSuccessData.nextExpiry} (+90 Days)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="w-full sm:w-auto px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Official PDF Receipt</span>
                    </button>
                    <button
                      onClick={() => {
                        acknowledgeExpiryAlert(activeExpiryPopup.id);
                        dismissExpiryPopup();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                    >
                      Done & Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Student & Hostel Room Dossier Card */}
                  <div className="bg-slate-50 border border-sky-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-700 text-white flex items-center justify-center font-bold text-sm">
                          {activeExpiryPopup.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">
                            {activeExpiryPopup.studentName}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {activeExpiryPopup.studentNumber} • NRC: {activeExpiryPopup.nrcNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Bed Fee Rate</span>
                        <span className="text-sm font-black text-slate-900">
                          K{activeExpiryPopup.amountDueZMW.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Hostel Hall</span>
                        <span className="font-bold text-slate-900 text-[11px] truncate block">
                          {activeExpiryPopup.hallName}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Room & Bed</span>
                        <span className="font-bold text-sky-800 text-[11px] block">
                          Room {activeExpiryPopup.roomNumber} ({activeExpiryPopup.bedNumber})
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Student Mobile</span>
                        <span className="font-mono text-slate-700 text-[11px] block">
                          {activeExpiryPopup.phone}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>College Hostel Policy:</strong> Unsettled bed spaces beyond the 72-hour grace period will be automatically forfeited and re-allocated to approved waiting list applicants.
                      </span>
                    </p>
                  </div>

                  {/* Simulated Mobile SMS Delivery Card */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowSmsPreview(!showSmsPreview)}
                      className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 transition-colors"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>
                        {showSmsPreview ? 'Hide Automated SMS Dispatch Preview' : 'View Automated SMS Dispatch Sent to Student Phone'}
                      </span>
                      {showSmsPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showSmsPreview && (
                      <div className="mt-2.5 p-3.5 bg-slate-900 text-sky-100 rounded-2xl border border-slate-800 text-xs space-y-2 animate-in fade-in duration-200">
                        <div className="flex justify-between items-center text-[10px] text-sky-300 font-mono border-b border-slate-800 pb-1.5">
                          <span>SMS Gateway: +260 212 298 000 (NKANA_COLL)</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Delivered
                          </span>
                        </div>
                        <p className="leading-relaxed font-sans text-white text-xs">
                          "Dear {activeExpiryPopup.studentName} ({activeExpiryPopup.studentNumber}), your bed space fee of K{activeExpiryPopup.amountDueZMW.toLocaleString()} for Room {activeExpiryPopup.roomNumber} ({activeExpiryPopup.hallName}) expires on {activeExpiryPopup.expiryDate} ({activeExpiryPopup.daysRemaining} days left). Please renew via MTN MoMo / Airtel Money on the student portal to prevent bed re-allocation. Nkana College Accommodation Directorate."
                        </p>
                        <div className="text-[10px] text-slate-400 text-right">
                          Timestamp: {activeExpiryPopup.timestamp} CAT
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Immediate Bed Fee Settlement Form */}
                  <form onSubmit={handleProcessRenewal} className="space-y-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block mb-2">
                        Select Instant Renewal Gateway (90-Day Extension):
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'mtn_momo', label: 'MTN MoMo', icon: '🟡', dial: '*303#' },
                          { id: 'airtel_money', label: 'Airtel Money', icon: '🔴', dial: '*778#' },
                          { id: 'zamtel_kwacha', label: 'Zamtel Kwacha', icon: '🟢', dial: '*344#' },
                          { id: 'visa_mastercard', label: 'Bank Card', icon: '💳', dial: 'Online' }
                        ].map(m => (
                          <button
                            type="button"
                            key={m.id}
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              paymentMethod === m.id
                                ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="text-base block">{m.icon}</span>
                            <span className="text-xs font-bold text-slate-900 block mt-1">{m.label}</span>
                            <span className="text-[10px] text-slate-400">{m.dial}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Settlement Mobile / Account Mask:
                        </label>
                        <input
                          type="text"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+260 97X XXX XXX"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Amount Due (Next Term):
                        </label>
                        <input
                          type="text"
                          disabled
                          value={`K${activeExpiryPopup.amountDueZMW.toLocaleString()}.00 ZMW`}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-800 font-bold font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          acknowledgeExpiryAlert(activeExpiryPopup.id);
                          dismissExpiryPopup();
                        }}
                        className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        Acknowledge & Close
                      </button>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-2.5 bg-gradient-to-r from-sky-700 to-sky-900 hover:from-sky-800 hover:to-slate-900 text-white rounded-xl text-xs font-extrabold shadow-md shadow-sky-800/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Contacting MoMo Gateway...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            <span>Renew Bed Space (K{activeExpiryPopup.amountDueZMW.toLocaleString()})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PERSISTENT FLOATING TRIGGER & SIMULATOR WIDGET (Bottom Right)          */}
      {/* Allows the reviewer to test mock notifications at any time from any view  */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Floating Panel Popup */}
        {floatingPanelOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sky-200 p-4 animate-in slide-in-from-bottom-3 duration-200 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">
                    Mock Bed Expiry Alert Simulator
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Trigger alert UIs & simulated mobile notices
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFloatingPanelOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Quick Test Scenarios:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerExpiryAlert('std-1', 3)}
                  className="w-full text-left p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium transition-colors flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-xs">⚠️ Vanessa Mwape</strong>
                    <span className="text-[10px] text-amber-700">Expires in 3 Days (Critical Notice)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-200 font-bold text-[10px]">Test 3d</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerExpiryAlert('std-11', 0)}
                  className="w-full text-left p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 font-medium transition-colors flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-xs">🚨 Emmanuel Bwalya</strong>
                    <span className="text-[10px] text-rose-700">Expires Today (Final Warning)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-200 font-bold text-[10px]">Test 0d</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerExpiryAlert('std-12', -2)}
                  className="w-full text-left p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-900 font-medium transition-colors flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-xs">⛔ Kelvin Chanda</strong>
                    <span className="text-[10px] text-red-700">Expired 2 Days Ago (Overdue)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-200 font-bold text-[10px]">Overdue</span>
                </button>
              </div>
            </div>

            {/* Custom Student Selector */}
            <div className="border-t border-slate-100 pt-2.5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Custom Alert Trigger:
              </span>
              <div className="flex gap-2">
                <select
                  value={selectedSimStudentId}
                  onChange={(e) => setSelectedSimStudentId(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-xl border border-slate-200 bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.studentNumber})
                    </option>
                  ))}
                </select>

                <select
                  value={simDays}
                  onChange={(e) => setSimDays(Number(e.target.value))}
                  className="w-24 text-xs p-2 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value={1}>1 Day Left</option>
                  <option value={3}>3 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days</option>
                  <option value={0}>Today (0d)</option>
                  <option value={-1}>Overdue</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => triggerExpiryAlert(selectedSimStudentId, simDays)}
                className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trigger Alert UI For Student</span>
              </button>
            </div>

            {/* Batch Broadcast SMS */}
            <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBroadcastReminders}
                className="text-xs text-sky-800 font-bold hover:underline flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Bulk Expiry SMS Reminders</span>
              </button>

              {bulkSentCount !== null && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  ✓ {bulkSentCount} SMS Dispatched
                </span>
              )}
            </div>
          </div>
        )}

        {/* Floating Pill Toggle Button */}
        <button
          onClick={() => setFloatingPanelOpen(!floatingPanelOpen)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all border ${
            criticalOrExpiredCount > 0
              ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-400 animate-pulse'
              : 'bg-sky-900 hover:bg-sky-950 text-white border-sky-700'
          }`}
        >
          <div className="relative">
            <Bell className="w-4 h-4" />
            {expiryAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </div>
          <span className="text-xs font-extrabold tracking-tight">
            Bed Expiry Monitor ({expiryAlerts.length} Expiring)
          </span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">
            Mock Trigger
          </span>
        </button>
      </div>
    </>
  );
};
