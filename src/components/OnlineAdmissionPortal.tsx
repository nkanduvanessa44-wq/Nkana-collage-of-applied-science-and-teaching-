import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  X,
  FileDown,
  Sparkles,
  Search,
  Check,
  Building2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AcademicSubjectResult, UploadedDocument, AdmissionApplication } from '../types';

export const OnlineAdmissionPortal: React.FC = () => {
  const { submitAdmissionApplication, downloadAdmissionOfferLetter, setActiveTab } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step 1: Personal & Contact
  const [fullName, setFullName] = useState('');
  const [nrcNumber, setNrcNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('');
  const [nextOfKinRelation, setNextOfKinRelation] = useState('Parent');

  // Step 2: Academic Program & School Results
  const [programChoice, setProgramChoice] = useState('Registered Nursing Diploma');
  const [intakeSession, setIntakeSession] = useState<'January 2027 Full-Time' | 'July 2026 Mid-Year' | 'Distance Learning'>('January 2027 Full-Time');
  const [previousSchool, setPreviousSchool] = useState('');
  const [completionYear, setCompletionYear] = useState('2024');

  const [results, setResults] = useState<AcademicSubjectResult[]>([
    { subject: 'English Language', grade: 'Two (2)' },
    { subject: 'Mathematics', grade: 'Three (3)' },
    { subject: 'Biology', grade: 'One (1)' },
    { subject: 'Science (Physics/Chemistry)', grade: 'Two (2)' },
    { subject: 'Civic Education', grade: 'Two (2)' }
  ]);

  // Step 3: Document Uploads
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: 'doc-init-1',
      type: 'nrc',
      label: 'National Registration Card (NRC)',
      fileName: 'nrc_certified_copy.pdf',
      fileSize: '1.2 MB',
      uploadedAt: 'Just now'
    },
    {
      id: 'doc-init-2',
      type: 'ecz_results',
      label: 'ECZ Grade 12 Statement of Results',
      fileName: 'ecz_statement_results.pdf',
      fileSize: '2.5 MB',
      uploadedAt: 'Just now'
    }
  ]);

  const [uploadType, setUploadType] = useState<'nrc' | 'ecz_results' | 'passport_photo' | 'medical_report'>('passport_photo');
  const [mockFileName, setMockFileName] = useState('');

  // Step 4: Application Fee Payment (K150)
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard'>('mtn_momo');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedApplication, setCompletedApplication] = useState<AdmissionApplication | null>(null);

  // Handle document upload simulation
  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const labelMap = {
      nrc: 'National Registration Card (NRC)',
      ecz_results: 'ECZ Grade 12 Statement of Results',
      passport_photo: 'Passport Size Photo',
      medical_report: 'Medical Examination Fitness Form'
    };

    const newDoc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      type: uploadType,
      label: labelMap[uploadType],
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB` || '1.1 MB',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDocuments(prev => [...prev.filter(d => d.type !== uploadType), newDoc]);
    setMockFileName(file.name);
  };

  const removeDoc = (type: string) => {
    setDocuments(prev => prev.filter(d => d.type !== type));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nrcNumber || !phone) {
      setValidationError('Please fill in required fields (Full Legal Name, NRC Number, and Phone Number).');
      return;
    }
    setValidationError(null);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previousSchool) {
      setValidationError('Please provide your secondary school details and completion year.');
      return;
    }
    setValidationError(null);
    setStep(3);
  };

  const handleStep3Submit = () => {
    if (documents.length < 2) {
      setValidationError('Please upload at least your certified NRC copy and ECZ Grade 12 Statement of Results.');
      return;
    }
    setValidationError(null);
    setStep(4);
  };

  const handleFinalPaymentAndSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newApp = submitAdmissionApplication({
        fullName,
        nrcNumber,
        dateOfBirth: dob || '2005-05-15',
        gender,
        phone,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
        residentialAddress: address || 'Kitwe, Zambia',
        nextOfKinName: nextOfKinName || 'Parent',
        nextOfKinPhone: nextOfKinPhone || phone,
        nextOfKinRelation,
        programChoice,
        intakeSession,
        previousSchool,
        completionYear,
        results,
        documents,
        applicationFeeZMW: 150,
        paymentStatus: 'paid',
        paymentMethod,
        paymentReference: `${paymentMethod.slice(0, 3).toUpperCase()}-ADM-${Math.floor(100000 + Math.random() * 900000)}`
      });

      setCompletedApplication(newApp);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Introduction */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              New Student Admissions 2026/2027
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Online Admission Application Portal
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Apply for Nursing, Midwifery, Clinical Medicine, Teaching and Science programs at Nkana College Of Applied Sciences And Education.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('application_tracker')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-200 text-xs font-bold text-sky-700 hover:bg-sky-50 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Existing Application →</span>
          </button>
        </div>

        {/* 4 Step Nav */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-slate-100">
          {[
            { num: 1, title: 'Personal Details' },
            { num: 2, title: 'Academic Results' },
            { num: 3, title: 'Document Upload' },
            { num: 4, title: 'Fee Payment (K150)' }
          ].map((s) => {
            const isCompleted = step > s.num || completedApplication !== null;
            const isCurrent = step === s.num && !completedApplication;
            return (
              <div key={s.num} className="text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-sky-600 text-white'
                      : isCurrent
                      ? 'bg-sky-500 text-white ring-4 ring-sky-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : s.num}
                </div>
                <span className={`text-[11px] block mt-1.5 ${isCurrent ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success View */}
      {completedApplication ? (
        <div className="bg-white rounded-2xl border border-sky-200 p-8 shadow-md text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Application & Documents Successfully Submitted
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Welcome to Nkana College, {completedApplication.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
              Your application has been vetted by the Academic Board. Your official provisional admission letter has been generated.
            </p>
          </div>

          {/* Reference Card */}
          <div className="max-w-md mx-auto bg-sky-50/70 border border-sky-200 rounded-xl p-4 text-left space-y-2">
            <div className="flex justify-between items-center border-b border-sky-200 pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Application Reference Number</span>
                <div className="text-base font-black text-sky-950">{completedApplication.applicationNumber}</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-200 text-sky-900 uppercase">
                {completedApplication.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Program:</span>
                <span className="font-bold text-slate-800">{completedApplication.programChoice}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Application Fee:</span>
                <span className="font-bold text-sky-800">K150 (Paid - {completedApplication.paymentReference})</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">National Registration (NRC):</span>
                <span className="font-semibold text-slate-800">{completedApplication.nrcNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Intake:</span>
                <span className="font-semibold text-slate-800">{completedApplication.intakeSession}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              onClick={() => downloadAdmissionOfferLetter(completedApplication.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Admission Letter (PDF)</span>
            </button>

            <button
              onClick={() => setActiveTab('bed_spaces')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>Proceed to Bed Space Allocation Module →</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {validationError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between gap-2 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{validationError}</span>
              </div>
              <button
                onClick={() => setValidationError(null)}
                className="text-red-400 hover:text-red-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 1: Applicant Personal & Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Legal Name (As on NRC) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Limbikani Banda"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">National Registration Card (NRC) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 491028/11/1"
                    value={nrcNumber}
                    onChange={(e) => setNrcNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 font-medium"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Phone (WhatsApp Active) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+260 976 441 902"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="applicant@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Physical Residential Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 482, Riverside, Kitwe, Zambia"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Next of Kin / Parent Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patrick Banda"
                    value={nextOfKinName}
                    onChange={(e) => setNextOfKinName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Next of Kin Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+260 977 882 110"
                    value={nextOfKinPhone}
                    onChange={(e) => setNextOfKinPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>Continue to Academic Program & Results</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Academic Program & ECZ Results */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h2 className="text-base font-bold text-slate-900">
                  Step 2: Desired Program & ECZ Grade 12 Results
                </h2>
                <button type="button" onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Program of Study *</label>
                  <select
                    value={programChoice}
                    onChange={(e) => setProgramChoice(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900"
                  >
                    <option value="Registered Nursing Diploma">Registered Nursing Diploma (RN - 3 Years)</option>
                    <option value="Certified Midwifery Diploma">Certified Midwifery Diploma (2 Years)</option>
                    <option value="Clinical Medicine Diploma">Clinical Medicine Diploma (Clinician - 3 Years)</option>
                    <option value="Biomedical Laboratory Sciences">Biomedical Laboratory Sciences (3 Years)</option>
                    <option value="Primary Teachers Diploma">Primary Teachers Diploma (Education - 3 Years)</option>
                    <option value="Higher Diploma in Health Education">Higher Diploma in Health Education (2 Years)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Intake Session *</label>
                  <select
                    value={intakeSession}
                    onChange={(e) => setIntakeSession(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900"
                  >
                    <option value="January 2027 Full-Time">January 2027 Intake (Full-Time)</option>
                    <option value="July 2026 Mid-Year">July 2026 Intake (Mid-Year)</option>
                    <option value="Distance Learning">Distance Learning / In-Service</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Secondary School Attended *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kitwe Boys Secondary School"
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Year of ECZ Completion *</label>
                  <select
                    value={completionYear}
                    onChange={(e) => setCompletionYear(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021 or earlier</option>
                  </select>
                </div>
              </div>

              {/* Subject Results Grid */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-800">
                    ECZ Grade 12 Statement of Results (5 Minimum Credits Required for Nursing/Clinical):
                  </label>
                  <span className="text-[11px] text-sky-700 font-semibold">Credits: 1 - 6</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {results.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-800">{item.subject}</span>
                      <select
                        value={item.grade}
                        onChange={(e) => {
                          const updated = [...results];
                          updated[idx].grade = e.target.value;
                          setResults(updated);
                        }}
                        className="text-xs py-1 px-2 rounded border border-slate-300 font-bold bg-white text-sky-900"
                      >
                        <option value="One (1)">Grade 1 (Distinction)</option>
                        <option value="Two (2)">Grade 2 (Distinction)</option>
                        <option value="Three (3)">Grade 3 (Merit)</option>
                        <option value="Four (4)">Grade 4 (Credit)</option>
                        <option value="Five (5)">Grade 5 (Credit)</option>
                        <option value="Six (6)">Grade 6 (Credit)</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100">
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>Continue to Document Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Document Upload */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 3: Document Uploads & Verifications
                  </h2>
                  <p className="text-xs text-slate-500">Attach certified copies of your identification and certificates.</p>
                </div>
                <button type="button" onClick={() => setStep(2)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Upload Dropzone */}
              <div className="bg-sky-50/60 border-2 border-dashed border-sky-200 rounded-2xl p-6 text-center space-y-3">
                <Upload className="w-8 h-8 text-sky-600 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Select Document Category & Attach File</h3>
                  <p className="text-xs text-slate-500">PDF, JPG, or PNG formats up to 5 MB per document.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {[
                    { id: 'nrc', label: '1. NRC ID Copy' },
                    { id: 'ecz_results', label: '2. Grade 12 Results' },
                    { id: 'passport_photo', label: '3. Passport Photo' },
                    { id: 'medical_report', label: '4. Medical Form' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setUploadType(t.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        uploadType === t.id
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-sky-50 text-sky-700 font-bold text-xs rounded-xl border border-sky-300 shadow-xs transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Browse & Upload {uploadType.toUpperCase()} Document</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleSimulateUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Uploaded Application Dossier:</span>
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{doc.label}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{doc.fileName} • {doc.fileSize}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-sky-600" /> Uploaded
                      </span>
                      <button
                        onClick={() => removeDoc(doc.type)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={() => setStep(2)} className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleStep3Submit}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>Proceed to Application Fee Payment (K150)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Application Fee Payment (K150) */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 4: Non-Refundable Application Processing Fee
                  </h2>
                  <p className="text-xs text-slate-500">Pay statutory K150 admission processing fee to finalize application submission.</p>
                </div>
                <button type="button" onClick={() => setStep(3)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Invoice Strip */}
              <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-4 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-sky-300 font-bold uppercase">Official Admissions Voucher</span>
                  <h3 className="text-base font-bold">{programChoice}</h3>
                  <p className="text-xs text-slate-300">Applicant: {fullName} • NRC: {nrcNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-300">K150.00</span>
                  <span className="text-[10px] text-slate-300 block">Zambian Kwacha (ZMW)</span>
                </div>
              </div>

              {/* Payment Gateways */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">Select Payment Method:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'mtn_momo', name: 'MTN MoMo', tag: '*303# USSD', icon: Smartphone },
                    { id: 'airtel_money', name: 'Airtel Money', tag: '*778# USSD', icon: Smartphone },
                    { id: 'zamtel_kwacha', name: 'Zamtel Kwacha', tag: '*115# USSD', icon: Smartphone },
                    { id: 'visa_mastercard', name: 'Card Payment', tag: 'Visa / Mastercard', icon: CreditCard }
                  ].map(m => {
                    const isSelected = paymentMethod === m.id;
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                        <div className="text-xs font-bold">{m.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{m.tag}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod !== 'visa_mastercard' ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Mobile Money Account Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0976441902 or +260 976 441 902"
                    defaultValue={phone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-sky-500"
                  />
                  <span className="text-[11px] text-sky-800 block">
                    You will receive a USSD push notification on your mobile to authorize K150 with your secret PIN.
                  </span>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="e.g. LIMBIKANI BANDA"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">16-Digit Card Number</label>
                    <input
                      type="text"
                      placeholder="4123 4567 8901 2345"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={() => setStep(3)} className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalPaymentAndSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authorizing K150 & Submitting Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-sky-200" />
                      <span>Authorize K150 & Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
