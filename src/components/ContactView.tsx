import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          Get in Touch
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Contact & Visit Nkana College
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
          We welcome prospective nursing, clinical, and education students, parents, and visiting academics to our Kitwe campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information & Office Hours */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Campus Contact Directory</h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Campus Physical Location:</span>
                  <span>Plot 1208, Nkana Campus, Kitwe, Copperbelt Province, Republic of Zambia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Admissions & Registrar:</span>
                  <span>+260 977 441 298 / +260 966 820 114</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Official Inquiries:</span>
                  <span>admissions@nkanacollege.edu.zm / info@nkanacollege.edu.zm</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Administration Office Hours:</span>
                  <span>Monday - Friday: 08:00 - 17:00 CAT | Saturday: 08:30 - 13:00 CAT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-56">
            <img
              src="/src/assets/images/nkana_campus_main_1790746724657.jpg"
              alt="Nkana College administration entrance"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Send an Academic Inquiry</h3>
          <p className="text-xs text-slate-500">
            Have questions about diploma requirements, hostel accommodation, or fee structures? Send our admissions officers a direct inquiry.
          </p>

          {submitted ? (
            <div className="p-6 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-sky-600 mx-auto" />
              <h4 className="text-sm font-bold">Message Dispatched Successfully!</h4>
              <p className="text-xs text-slate-600">Our Kitwe admissions desk will contact you via phone or email within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanessa Mwape"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mobile Phone (Zambia) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+260 977 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inquiry / Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ask about admissions, bed spaces, hostel fees..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Admissions Office</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
