import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  MessageCircle,
  Compass
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
      <div className="bg-white/25 backdrop-blur-[25px] rounded-3xl p-6 sm:p-8 border border-white/30 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-200 bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-md drop-shadow-sm">
          Get in Touch
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mt-2">
          Contact & Visit Nkana College
        </h1>
        <p className="text-xs sm:text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-medium mt-1 max-w-xl">
          We welcome prospective nursing, clinical medicine, environmental health, and education students, parents, and visiting academics to our Nkana East campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information & Office Hours */}
        <div className="space-y-4">
          <div className="bg-white/25 backdrop-blur-[25px] p-6 rounded-2xl border border-white/30 shadow-md space-y-4">
            <h3 className="text-base font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Campus Contact Directory</h3>

            <div className="space-y-3.5 text-xs text-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600/40 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block drop-shadow-sm">Campus Physical Location:</span>
                  <span className="text-white/90 leading-relaxed font-medium">
                    Plot No. 7562, 27th Street, Nkana East, Kitwe, Zambia
                  </span>
                  <span className="text-[11px] text-sky-200 block mt-0.5 font-semibold">
                    (Near Mpelembe Secondary School)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/40 text-emerald-200 flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-white block mb-1 drop-shadow-sm">Phone & WhatsApp Lines:</span>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                      <span><strong>+260 963 072421</strong></span>
                      <a
                        href="https://wa.me/260963072421"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-300 hover:text-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                      <span><strong>+260 973 350816</strong></span>
                      <a
                        href="https://wa.me/260973350816"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-300 hover:text-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                      <span><strong>+260 768 364480</strong></span>
                      <a
                        href="https://wa.me/260768364480"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-300 hover:text-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600/40 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block drop-shadow-sm">Official Inquiries:</span>
                  <span className="text-white/90">admissions@nkanacollege.edu.zm / info@nkanacollege.edu.zm</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600/40 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block drop-shadow-sm">Administration Office Hours:</span>
                  <span className="text-white/90">Monday - Friday: 08:00 - 17:00 CAT | Saturday: 08:30 - 13:00 CAT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden border border-white/30 shadow-xs h-44 relative group">
              <img
                src="/src/assets/images/nkana_college_gate_1790746735611.jpg"
                alt="Nkana College Entrance Gate"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-white text-[11px] font-bold">Main Security Gate</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/30 shadow-xs h-44 relative group">
              <img
                src="/src/assets/images/nkana_campus_main_1790746724657.jpg"
                alt="Nkana College administration entrance"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-white text-[11px] font-bold">Campus Walkway</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white/25 backdrop-blur-[25px] p-6 sm:p-8 rounded-2xl border border-white/30 shadow-md space-y-4">
          <h3 className="text-base font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Send an Academic Inquiry</h3>
          <p className="text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            Have questions about diploma requirements, hostel accommodation, or fee structures? Send our admissions officers a direct inquiry.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-500/25 border border-emerald-300/30 text-white rounded-xl text-center space-y-2 backdrop-blur-md">
              <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto" />
              <h4 className="text-sm font-bold">Message Dispatched Successfully!</h4>
              <p className="text-xs text-white/90">Our admissions desk will contact you via phone or email within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-white block mb-1 drop-shadow-sm">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanessa Mwape"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-hidden backdrop-blur-md"
                />
              </div>

              <div>
                <label className="font-semibold text-white block mb-1 drop-shadow-sm">Mobile Phone (Zambia) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+260 977 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-hidden backdrop-blur-md"
                />
              </div>

              <div>
                <label className="font-semibold text-white block mb-1 drop-shadow-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-hidden backdrop-blur-md"
                />
              </div>

              <div>
                <label className="font-semibold text-white block mb-1 drop-shadow-sm">Inquiry / Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ask about admissions, bed spaces, hostel fees..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-hidden backdrop-blur-md"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
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
