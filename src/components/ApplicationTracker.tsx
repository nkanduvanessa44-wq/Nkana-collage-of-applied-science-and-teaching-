import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  FileDown,
  Building2,
  GraduationCap,
  FileText,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const {
    admissionApplications,
    downloadAdmissionOfferLetter,
    setActiveTab,
    setSelectedHallId
  } = useApp();

  const [searchRef, setSearchRef] = useState('NK-ADM-2026-0891');
  const [matchedApp, setMatchedApp] = useState(
    admissionApplications.find(a => a.applicationNumber === 'NK-ADM-2026-0891') || admissionApplications[0]
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchRef.trim().toLowerCase();
    const found = admissionApplications.find(
      a => a.applicationNumber.toLowerCase().includes(query) ||
           a.nrcNumber.toLowerCase().includes(query) ||
           a.fullName.toLowerCase().includes(query)
    );
    setMatchedApp(found || null as any);
    setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Admissions Tracking Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Track Admission Application Status
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your official Application Reference Number (e.g. NK-ADM-2026-0891) or your National Registration Card (NRC).
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="Enter Application Ref (e.g. NK-ADM-2026-0891) or NRC..."
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all shrink-0 flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track Dossier Status</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 pt-1">
          <span>Try demo references:</span>
          <button
            onClick={() => {
              setSearchRef('NK-ADM-2026-0891');
              setMatchedApp(admissionApplications.find(a => a.applicationNumber === 'NK-ADM-2026-0891') || null as any);
            }}
            className="font-bold text-sky-700 underline"
          >
            NK-ADM-2026-0891 (Admitted)
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setSearchRef('NK-ADM-2026-0914');
              setMatchedApp(admissionApplications.find(a => a.applicationNumber === 'NK-ADM-2026-0914') || null as any);
            }}
            className="font-bold text-sky-700 underline"
          >
            NK-ADM-2026-0914 (Under Review)
          </button>
        </div>
      </div>

      {/* Results View */}
      {hasSearched && matchedApp ? (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-6 animate-in fade-in">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Application Dossier #{matchedApp.applicationNumber}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">
                {matchedApp.fullName}
              </h2>
              <p className="text-xs text-sky-800 font-semibold mt-0.5">
                {matchedApp.programChoice} • {matchedApp.intakeSession}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                  matchedApp.status === 'admitted'
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : matchedApp.status === 'under_review'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                Status: {matchedApp.status.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">Submitted on {matchedApp.submittedAt}</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Admissions Vetting Milestones:</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {[
                { title: '1. Application & K150 Fee', done: true, desc: `Paid (${matchedApp.paymentReference})` },
                { title: '2. Document Verification', done: true, desc: `${matchedApp.documents.length} verified attachments` },
                { title: '3. Academic Board Review', done: matchedApp.status === 'admitted', desc: matchedApp.status === 'admitted' ? 'Qualified & Admitted' : 'Under Review' },
                { title: '4. Bed Space Eligibility', done: matchedApp.status === 'admitted', desc: matchedApp.status === 'admitted' ? 'Hostel Booking Open' : 'Pending Admission' }
              ].map((stepItem, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs ${
                    stepItem.done
                      ? 'bg-sky-50/60 border-sky-300 text-sky-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {stepItem.done ? (
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>{stepItem.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{stepItem.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviewer Note */}
          {matchedApp.reviewerRemarks && (
            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs">
              <span className="font-bold text-sky-950 block mb-0.5">Academic Admissions Board Evaluation:</span>
              <p className="text-slate-700 italic">"{matchedApp.reviewerRemarks}"</p>
            </div>
          )}

          {/* Actions: Download Admission Letter & Apply for Bed Space */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {matchedApp.status === 'admitted' && (
              <>
                <button
                  onClick={() => downloadAdmissionOfferLetter(matchedApp.id)}
                  className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Official Admission Letter (PDF)</span>
                </button>

                <button
                  onClick={() => setActiveTab('bed_spaces')}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Apply for On-Campus Bed Space →</span>
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('online_admission')}
              className="text-xs text-sky-700 hover:underline font-semibold ml-auto"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : hasSearched && !matchedApp ? (
        <div className="p-10 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No application found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We could not find an application matching "{searchRef}". Please check the reference or submit a new application.
          </p>
          <button
            onClick={() => setActiveTab('online_admission')}
            className="mt-3 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold"
          >
            Start New Application
          </button>
        </div>
      ) : null}
    </div>
  );
};
