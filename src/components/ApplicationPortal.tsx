import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bed,
  Building2,
  CreditCard,
  Smartphone,
  CheckCircle2,
  FileDown,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Lock,
  Clock,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BedApplication, Gender, RoomType } from '../types';

export const ApplicationPortal: React.FC = () => {
  const {
    halls,
    rooms,
    submitBedApplication,
    processPayment,
    exportAllocationPass,
    setActiveTab
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [nrcNumber, setNrcNumber] = useState('');
  const [gender, setGender] = useState<Gender>('female');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('Registered Nursing Diploma');
  const [yearOfStudy, setYearOfStudy] = useState('Year 1');

  // Accommodation Preferences
  const [preferredHallId, setPreferredHallId] = useState(halls[0]?.id || 'hall-1');
  const [preferredRoomType, setPreferredRoomType] = useState<RoomType>('double');
  const [selectedBedId, setSelectedBedId] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard'>('mtn_momo');
  const [momoPhone, setMomoPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [createdApplication, setCreatedApplication] = useState<BedApplication | null>(null);

  // Filter halls by gender compatibility
  const eligibleHalls = halls.filter(h => h.genderAllowed === gender || h.genderAllowed === 'mixed');

  // Rooms in selected hall with vacant beds
  const candidateRooms = rooms.filter(r => r.hallId === preferredHallId && r.status !== 'maintenance');
  const candidateBeds: { roomNumber: string; roomType: string; price: number; bedId: string; bedNumber: string }[] = [];
  candidateRooms.forEach(room => {
    room.beds.forEach(bed => {
      if (bed.status === 'vacant') {
        candidateBeds.push({
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          price: room.pricePerTermZMW,
          bedId: bed.id,
          bedNumber: bed.bedNumber
        });
      }
    });
  });

  const [formError, setFormError] = useState<string | null>(null);

  // Selected bed pricing
  const currentBedInfo = candidateBeds.find(b => b.bedId === selectedBedId) || candidateBeds[0];
  const feeAmountZMW = currentBedInfo ? currentBedInfo.price : 2400;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentNumber || !nrcNumber || !phone) {
      setFormError('Please fill in all required student details (Full Name, Student ID, NRC Number, and Phone Number).');
      return;
    }
    setFormError(null);
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedBedId && candidateBeds.length > 0) {
      setSelectedBedId(candidateBeds[0].bedId);
    }
    setStep(3);
  };

  const handleConfirmAndPay = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      // 1. Submit Application
      const newApp = submitBedApplication({
        studentName,
        studentNumber,
        nrcNumber,
        gender,
        email,
        phone,
        program,
        yearOfStudy,
        preferredHallId,
        preferredRoomType,
        selectedBedSpaceId: selectedBedId || (candidateBeds[0]?.bedId),
        specialRequests,
        amountPaidZMW: feeAmountZMW,
        paymentStatus: 'paid'
      });

      // 2. Process Payment Record
      const accountMask = paymentMethod === 'visa_mastercard'
        ? `**** **** **** ${cardNumber.slice(-4) || '8821'}`
        : momoPhone || phone;

      processPayment({
        applicationId: newApp.id,
        studentName,
        studentNumber,
        amountZMW: feeAmountZMW,
        method: paymentMethod,
        accountOrPhoneMask: accountMask,
        description: `Term 1 Hostel Accommodation Fee - ${halls.find(h => h.id === preferredHallId)?.name}`
      });

      setCreatedApplication(newApp);
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setStep(4);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Hostel Accommodation 2026/2027
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Student Bed Space Application & Payment
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure your residential hostel bed space with real-time selection and instant payment via Mobile Money or Card.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            <span>256-Bit Encrypted Portal</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-slate-100">
          {[
            { num: 1, title: 'Student Info' },
            { num: 2, title: 'Hall & Bed Space' },
            { num: 3, title: 'Fee Payment' },
            { num: 4, title: 'Confirmation' }
          ].map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
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
                <span
                  className={`text-[11px] block mt-1.5 font-medium ${
                    isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Student Information */}
      {step === 1 && (
        <form onSubmit={handleNextStep1} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-600" />
              <span>Step 1: Student Particulars & Academic Details</span>
            </h2>
            <p className="text-xs text-slate-500">Provide official identity and college program details.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Full Name (As on NRC) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vanessa Mwape"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                College Student ID Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NK/RN/2026/0492"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                National Registration Card (NRC) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 492817/11/1"
                value={nrcNumber}
                onChange={(e) => setNrcNumber(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Stored with AES-256 cryptographic protection</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Gender * (Dictates Hall Wing)
              </label>
              <select
                value={gender}
                onChange={(e) => {
                  const g = e.target.value as Gender;
                  setGender(g);
                  if (g === 'male') setPreferredHallId('hall-3');
                  else setPreferredHallId('hall-1');
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
              >
                <option value="female">Female Student (Female Wings)</option>
                <option value="male">Male Student (Male Wings)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +260 977 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                College Faculty & Program *
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
              >
                <option value="Registered Nursing Diploma">Registered Nursing Diploma (RN)</option>
                <option value="Certified Midwifery Diploma">Certified Midwifery Diploma</option>
                <option value="Clinical Medicine Diploma">Clinical Medicine Diploma (Clinician)</option>
                <option value="Biomedical Laboratory Sciences">Biomedical Laboratory Sciences</option>
                <option value="Primary Teachers Diploma">Primary Teachers Diploma (Education)</option>
                <option value="Higher Diploma in Health Education">Higher Diploma in Health Education</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Year of Study *
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
              >
                <option value="Year 1">Year 1 (Freshman Intake)</option>
                <option value="Year 2">Year 2 (Continuing Scholar)</option>
                <option value="Year 3">Year 3 (Clinical Practicum)</option>
                <option value="Year 4">Year 4 (Finalist)</option>
              </select>
            </div>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{formError}</span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Continue to Hall & Bed Space Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Hostel Hall & Vacant Bed Space Selector */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>Step 2: Choose Residential Hall & Vacant Bed Space</span>
              </h2>
              <p className="text-xs text-slate-500">
                Filtered by gender ({gender.toUpperCase()}) with live vacant inventory.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Hall Selection Cards */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Select Residential Hall:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {eligibleHalls.map((hall) => {
                const isSelected = preferredHallId === hall.id;
                const hallRooms = rooms.filter(r => r.hallId === hall.id);
                const vacantCount = hallRooms.reduce(
                  (acc, r) => acc + r.beds.filter(b => b.status === 'vacant').length,
                  0
                );

                return (
                  <div
                    key={hall.id}
                    onClick={() => {
                      setPreferredHallId(hall.id);
                      setSelectedBedId('');
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                          {hall.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{hall.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{hall.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-sky-700 block">
                          {vacantCount} Vacant
                        </span>
                        <span className="text-[10px] text-slate-400">Available Beds</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Warden: {hall.wardenName}</span>
                      <span className="text-sky-700 font-semibold">{isSelected ? '✓ Selected' : 'Select'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Vacant Bed Spaces Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700">
                Choose Specific Bed Space in Selected Hall:
              </label>
              <span className="text-xs text-sky-700 font-semibold">
                {candidateBeds.length} vacant beds ready
              </span>
            </div>

            {candidateBeds.length === 0 ? (
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-amber-900">No vacant beds currently in this hall</h4>
                <p className="text-xs text-amber-800 mt-0.5">Please choose an alternative hall or check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1">
                {candidateBeds.map((bed) => {
                  const isBedSelected = selectedBedId === bed.bedId;
                  return (
                    <div
                      key={bed.bedId}
                      onClick={() => setSelectedBedId(bed.bedId)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        isBedSelected
                          ? 'border-sky-600 bg-sky-600 text-white shadow-md'
                          : 'border-slate-200 hover:border-sky-400 bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="text-xs font-extrabold">Room {bed.roomNumber}</div>
                      <div className={`text-[11px] font-medium mt-0.5 ${isBedSelected ? 'text-sky-100' : 'text-slate-600'}`}>
                        {bed.bedNumber}
                      </div>
                      <div className={`text-xs font-black mt-1 ${isBedSelected ? 'text-white' : 'text-sky-700'}`}>
                        K{bed.price.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Special Medical or Accessibility Requests (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Lower bunk required due to knee injury; quiet study wing; ground floor preference."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
            >
              ← Back
            </button>

            <button
              onClick={handleNextStep2}
              disabled={candidateBeds.length === 0}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Proceed to Payment (K{feeAmountZMW.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Integrated Mobile Money & Card Payment */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>Step 3: Bed Space Fee Payment & Instant Allocation</span>
              </h2>
              <p className="text-xs text-slate-500">
                Official payment gateway supporting Zambian Mobile Money & International Cards.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Fee Summary Box */}
          <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[10px] text-sky-300 font-bold uppercase">Official Allocation Invoice</span>
              <h3 className="text-base font-bold">{halls.find(h => h.id === preferredHallId)?.name}</h3>
              <p className="text-xs text-slate-300">
                Selected Bed: {currentBedInfo?.roomNumber} ({currentBedInfo?.bedNumber}) • {studentName} ({studentNumber})
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">K{feeAmountZMW.toLocaleString()}</span>
              <span className="text-xs text-slate-300 block">Zambian Kwacha (ZMW)</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Select Secure Payment Gateway:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'mtn_momo', name: 'MTN MoMo', tag: '*303# USSD', icon: Smartphone },
                { id: 'airtel_money', name: 'Airtel Money', tag: '*778# USSD', icon: Smartphone },
                { id: 'zamtel_kwacha', name: 'Zamtel Kwacha', tag: '*115# USSD', icon: Smartphone },
                { id: 'visa_mastercard', name: 'Visa / Mastercard', tag: '3D Secure Card', icon: CreditCard }
              ].map((method) => {
                const isChosen = paymentMethod === method.id;
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                      isChosen
                        ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                    <div className="text-xs font-bold">{method.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{method.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Money Details Form */}
          {paymentMethod !== 'visa_mastercard' ? (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-900">
                  {paymentMethod === 'mtn_momo' ? 'MTN Mobile Money Prompt' : paymentMethod === 'airtel_money' ? 'Airtel Money Push PIN' : 'Zamtel Kwacha Mobile Payment'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enter your registered Zambian mobile number. A prompt will be triggered to approve K{feeAmountZMW.toLocaleString()}.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Mobile Money Account Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0977123456 or +260 977 123 456"
                  defaultValue={phone}
                  onChange={(e) => setMomoPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>

              <div className="text-[11px] text-sky-800 bg-sky-50 p-2.5 rounded-lg border border-sky-200 flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-sky-600" />
                <span>You will enter your 4-digit Secret Mobile Money PIN to authorize the payment.</span>
              </div>
            </div>
          ) : (
            /* Credit / Debit Card Form */
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-900">Debit / Credit Card Details (Visa & Mastercard)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Cardholder Name (As on card)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VANESSA MWAPE"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Card Number (16 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4123 4567 8901 2345"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="08/28"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    CVV / CVC (3 Digits)
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
            >
              ← Back
            </button>

            <button
              onClick={handleConfirmAndPay}
              disabled={isProcessingPayment}
              className="px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-60"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-white" />
                  <span>Authorize K{feeAmountZMW.toLocaleString()} Payment</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Success & Official Allocation Pass Voucher */}
      {step === 4 && createdApplication && (
        <div className="bg-white rounded-2xl border border-sky-200 p-8 shadow-md text-center space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Bed Space Reserved & Paid
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Congratulations, {createdApplication.studentName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              Your bed space has been secured and synchronized across Nkana College systems. Your official room voucher is generated below.
            </p>
          </div>

          {/* Allocation Ticket Voucher */}
          <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-sky-300 rounded-2xl p-5 text-left space-y-3">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Application Reference</span>
                <div className="text-sm font-black text-slate-900">{createdApplication.applicationNumber}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                  PAID (K{createdApplication.amountPaidZMW?.toLocaleString()})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Student:</span>
                <span className="font-semibold text-slate-800">{createdApplication.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Student ID:</span>
                <span className="font-semibold text-slate-800">{createdApplication.studentNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Residential Hall:</span>
                <span className="font-bold text-sky-950">{halls.find(h => h.id === createdApplication.preferredHallId)?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Assigned Space:</span>
                <span className="font-bold text-sky-950">{currentBedInfo?.roomNumber} ({currentBedInfo?.bedNumber})</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              Payment Ref: <strong className="text-slate-800">{createdApplication.paymentReference || 'MOMO-NK-VERIFIED'}</strong>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              onClick={() => exportAllocationPass(createdApplication.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>Download Official Allocation PDF Voucher</span>
            </button>

            <button
              onClick={() => setActiveTab('bed_spaces')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
            >
              View in Live Dorm Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
