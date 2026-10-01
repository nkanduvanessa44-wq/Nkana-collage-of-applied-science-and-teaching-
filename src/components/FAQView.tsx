import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Bed,
  CreditCard,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  Building2,
  ArrowRight,
  Sparkles,
  FileText,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export type FAQCategory = 'all' | 'allocation' | 'payment' | 'rules' | 'checkin';

interface FAQItem {
  id: string;
  category: 'allocation' | 'payment' | 'rules' | 'checkin';
  question: string;
  answer: string;
  badge?: string;
  action?: {
    label: string;
    tab: string;
  };
}

const FAQ_DATA: FAQItem[] = [
  // Room Allocation
  {
    id: 'alloc-1',
    category: 'allocation',
    question: 'How are hostel rooms and bed spaces allocated to students?',
    answer: 'Hostel bed spaces are allocated on a first-come, first-served basis through the online Nkana College portal upon confirmation of academic admission. Students must have an active admission registration or student ID (e.g. NK/2027/XXXX). Priority is given to Year 1 students, clinical trainees with early morning hospital shifts, and students traveling from outside the Copperbelt Province.',
    badge: 'Allocation',
    action: {
      label: 'Browse Vacant Bed Spaces',
      tab: 'bed_spaces'
    }
  },
  {
    id: 'alloc-2',
    category: 'allocation',
    question: 'Can I choose my preferred roommate or room type?',
    answer: 'Yes. During your online bed space application, you can indicate room preferences (Double Shared or 4-Bed Shared Dormitory) and enter the student number or name of a preferred roommate. The Dean of Students office will honor mutual roommate requests subject to room availability in Dag Hammarskjöld Hall (Males) or Florence Nightingale / Mama Julia Chikamoneka Halls (Females).',
    badge: 'Room Selection',
    action: {
      label: 'Apply For Bed Space',
      tab: 'apply_bed'
    }
  },
  {
    id: 'alloc-3',
    category: 'allocation',
    question: 'What is the procedure if I need to change rooms or report maintenance?',
    answer: 'Room swap requests must be lodged within the first 14 days of the term via the Resident Portal or directly at the Hostel Warden Desk. For maintenance (plumbing, electrical fixtures, window screens, or mattress replacement), submit an instant work order ticket through your Resident Portal; emergency repairs are addressed within 24 hours.',
    badge: 'Maintenance',
    action: {
      label: 'Resident Portal',
      tab: 'student_resident_pass'
    }
  },
  {
    id: 'alloc-4',
    category: 'allocation',
    question: 'Are distance learning and in-service students eligible for on-campus accommodation?',
    answer: 'Yes. Dedicated residential blocks are reserved for in-service teachers and distance nursing scholars during the 2-to-3 week intensive residential contact sessions. Short-stay vouchers can be booked directly from the bed space portal.',
    badge: 'Distance Scholars'
  },

  // Payment Deadlines
  {
    id: 'pay-1',
    category: 'payment',
    question: 'What are the accommodation fees and accepted payment methods?',
    answer: 'Hostel accommodation fees range from K3,200 to K4,800 per term depending on room capacity (4-bed shared, double shared, or executive en-suite). Payments are accepted via official College Bank Accounts (Zanaco, Atlas Mara), mobile money (MTN MoMo, Airtel Money merchant codes), or card payments at the Campus Bursar Desk. Always preserve your bank deposit slip or transaction reference.',
    badge: 'Fees & Bank Info',
    action: {
      label: 'View Payment Details',
      tab: 'bed_spaces'
    }
  },
  {
    id: 'pay-2',
    category: 'payment',
    question: 'What are the payment deadlines, and what happens if I miss the due date?',
    answer: 'Full accommodation payment or a minimum approved 60% installment must be settled at least 7 days before official campus reporting dates. The automated portal sends warning notices at 14, 7, and 3 days remaining. Unpaid provisional allocations past the grace deadline are automatically cancelled and offered to waitlisted candidates.',
    badge: 'Strict Deadlines'
  },
  {
    id: 'pay-3',
    category: 'payment',
    question: 'How do I download my official Accommodation Pass and Payment Voucher?',
    answer: 'Once payment has been processed or verified by the accounts office, log in to the Resident Portal or Application Tracker. You will see an option to download your cryptographically stamped PDF Bed Space Allocation Pass & Payment Voucher, which must be presented to the hostel matron upon arrival.',
    badge: 'PDF Voucher',
    action: {
      label: 'Resident Portal Pass',
      tab: 'student_resident_pass'
    }
  },
  {
    id: 'pay-4',
    category: 'payment',
    question: 'Is accommodation refundable if I defer my study program?',
    answer: 'If written notification of study deferment or withdrawal is submitted to the Registrar and Directorate of Student Affairs before the official start of term, accommodation fees are 90% refundable (with 10% retained as administrative processing fee). Cancellations after the second week of classes are non-refundable.',
    badge: 'Refund Policy'
  },

  // Hostel Rules & Conduct
  {
    id: 'rules-1',
    category: 'rules',
    question: 'What are the campus and hostel gate curfew hours?',
    answer: 'To guarantee resident safety and security, hostel perimeter gates lock at 21:00 Hours CAT on Sunday through Thursday, and at 22:00 Hours CAT on Friday and Saturday. Students returning late due to approved hospital clinical shifts must present their official Nkana College Clinical ID to security for logging.',
    badge: 'Curfew Hours'
  },
  {
    id: 'rules-2',
    category: 'rules',
    question: 'What is the visitor policy for resident rooms?',
    answer: 'Day visitors (including fellow students from different halls) are welcomed in hostel communal gardens and reception common lounges between 10:00 Hours and 18:00 Hours CAT. Visitors of the opposite sex are strictly prohibited from entering residential corridors and bedrooms. Unauthorized overnight guests incur disciplinary fines.',
    badge: 'Visitor Guidelines'
  },
  {
    id: 'rules-3',
    category: 'rules',
    question: 'What electrical appliances are allowed inside hostel bedrooms?',
    answer: 'Laptops, mobile phone chargers, table lamps, and small medical diagnostic equipment are permitted. High-wattage heating appliances such as electric hotplates, coil immersion heaters, and large refrigerators are strictly forbidden in bedrooms due to electrical load limits and fire prevention regulations. Dedicated student kitchenettes are provided on each floor.',
    badge: 'Fire Safety'
  },
  {
    id: 'rules-4',
    category: 'rules',
    question: 'What are the rules regarding noise levels and study environment?',
    answer: 'Nkana College fosters an environment of clinical and academic rigor. Strict "Quiet Study Hours" are observed daily from 20:00 Hours to 06:00 Hours CAT. Playing loud music, noisy congregating in stairwells, or disruptive conduct during quiet hours is subject to disciplinary citation by Hall Matrons.',
    badge: 'Quiet Hours'
  },

  // Check-In / Check-Out
  {
    id: 'check-1',
    category: 'checkin',
    question: 'What documents must I present during physical hostel check-in?',
    answer: 'When reporting to the Matron/Warden desk: (1) Official Printed Bed Space Allocation Pass / Voucher, (2) National Registration Card (NRC) or Passport, (3) College Admission Offer Letter, (4) Proof of Medical Fitness / Vaccination, and (5) Proof of tuition and accommodation payment.',
    badge: 'Check-In Checklist',
    action: {
      label: 'Download Pass PDF',
      tab: 'student_resident_pass'
    }
  },
  {
    id: 'check-2',
    category: 'checkin',
    question: 'How do I officially check out at the end of the semester?',
    answer: 'Prior to leaving, the student must notify the floor supervisor for a room inventory inspection. All furniture, mattress covers, and fixtures must be verified intact. Room keys must be surrendered to the Security / Warden desk. Clearance is logged digitally into the institutional system.',
    badge: 'Key Surrender'
  }
];

interface FAQViewProps {
  isEmbedded?: boolean;
}

export const FAQView: React.FC<FAQViewProps> = ({ isEmbedded = false }) => {
  const { setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [expandedId, setExpandedId] = useState<string | null>('alloc-1');

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-8 ${isEmbedded ? '' : 'pb-16'}`}>
      {/* Header Banner - Only show full hero if not embedded */}
      {!isEmbedded ? (
        <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-sky-800/40 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/10 backdrop-blur-md">
              <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
              <span>Student Support & Advisory Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Frequently Asked <span className="text-sky-400">Questions </span>
              <span className="text-orange-400">& HelpDesk</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              Find transparent answers regarding hostel room allocation protocols, payment deadlines, key collection, and campus residency conduct regulations.
            </p>
          </div>
        </section>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>Student Knowledge Base</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Hostel Allocation, Fees & Rules <span className="text-sky-600">FAQ</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Clear guidelines on accommodation booking, bursar payment deadlines, and student residential conduct.
          </p>
        </div>
      )}

      {/* Search and Category Filter Strip */}
      <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search keywords (e.g. deadline, roommate, cooking, curfew, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>All Questions</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {FAQ_DATA.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('allocation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'allocation'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Room Allocation</span>
          </button>

          <button
            onClick={() => setSelectedCategory('payment')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'payment'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment & Deadlines</span>
          </button>

          <button
            onClick={() => setSelectedCategory('rules')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'rules'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Hostel Rules & Curfew</span>
          </button>

          <button
            onClick={() => setSelectedCategory('checkin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'checkin'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check-In Protocol</span>
          </button>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl border border-slate-200">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try searching with alternative keywords or contact our admissions and hostel warden desk directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold hover:bg-sky-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-sky-300 shadow-md ring-1 ring-sky-100'
                    : 'border-slate-200 hover:border-sky-200 hover:shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {faq.badge && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                          {faq.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-slate-400 capitalize">
                        {faq.category === 'rules'
                          ? 'Conduct & Curfew'
                          : faq.category === 'payment'
                          ? 'Bursar & Deadlines'
                          : faq.category === 'allocation'
                          ? 'Room Booking'
                          : 'Check-In Desk'}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isExpanded
                        ? 'bg-sky-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.answer}
                    </p>

                    {faq.action && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setActiveTab(faq.action!.tab)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs transition-colors"
                        >
                          <span>{faq.action.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                        </button>
                        <span className="text-[10px] text-slate-400">Direct Portal Link</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Summary Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-xs">
            <Bed className="w-4 h-4 text-sky-600" />
            <span>Room Allocation</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">Digital First-Come Basis</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Reserve through our online bed management module upon receiving your provisional admission letter.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>Deadlines & Grace Period</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">7-Day Expiry Notice</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Unpaid bed spaces automatically trigger alerts and are released to waitlisted students 7 days before opening.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>Campus Security & Curfew</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">21:00 Hours Weekday Gates</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Secured gated perimeter at Plot 7562, 27th St, Nkana East with 24/7 security logging and clinical pass exceptions.
          </p>
        </div>
      </div>

      {/* Direct Contact & WhatsApp HelpDesk Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Still Have Questions?
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Speak Directly with Admissions & Hostel Wardens
            </h3>
            <p className="text-xs text-slate-500 max-w-xl">
              Our student affairs and hostel accommodation officers are on standby to assist prospective and continuing students.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Visit Campus Contact View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Admissions Desk</span>
              <a href="tel:+260963072421" className="text-xs font-bold text-slate-900 hover:text-sky-600">
                +260 963 072421
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">WhatsApp Support</span>
              <a
                href="https://wa.me/260973350816"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                +260 973 350816
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Hostel Matron Desk</span>
              <a href="tel:+260768364480" className="text-xs font-bold text-slate-900 hover:text-sky-600">
                +260 768 364480
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
