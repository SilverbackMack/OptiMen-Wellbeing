import React, { useState } from 'react';
import { Mail, Clock, MessageSquare, ShieldCheck, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ageRange: '35-44',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = 'Please provide a brief message of at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-0 text-left">
      
      {/* 1. HERO */}
      <section className="bg-[#0F172A] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Direct Inquiries
            </p>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Get in Touch with OptiMen
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Have a question about a clinical protocol, research paper, hardware evaluation, or corporate longevity briefing? Our editorial and scientific panel is here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & INFO SPLIT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 space-y-6">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      All inquiries are reviewed directly by our editorial and medical team.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Sterling"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#166534]"
                      />
                      {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@example.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#166534]"
                      />
                      {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Age Range & Topic Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Your Age Bracket
                      </label>
                      <select
                        value={formData.ageRange}
                        onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#166534]"
                      >
                        <option value="25-34">25–34 Years</option>
                        <option value="35-44">35–44 Years</option>
                        <option value="45-55">45–55 Years</option>
                        <option value="55+">55+ Years</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Subject / Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#166534]"
                      >
                        <option value="general">Protocol Clarification</option>
                        <option value="biomarkers">Blood Biomarker Screening Questions</option>
                        <option value="reviews">Product / Hardware Testing Feedback</option>
                        <option value="corporate">Executive / Corporate Longevity Briefings</option>
                        <option value="press">Press & Media Advisory</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your question, feedback, or specific research inquiry..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#166534]"
                    />
                    {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0F172A] hover:bg-[#166534] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Submit Inquiry</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Strict confidentiality. Zero marketing disclosure.</span>
                  </div>

                </form>
              ) : (
                <div className="bg-slate-50 p-10 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#166534] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. An OptiMen team member will review your inquiry and respond to <strong className="text-slate-900">{formData.email}</strong> within 24 to 48 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', ageRange: '35-44', subject: 'general', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              )}
            </div>

            {/* Right: Direct Information & Commitments */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#166534]">
                  <Clock className="w-4 h-4" />
                  Editorial Standards & Response Times
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  Direct Human Support
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We reply to every constructive inquiry within 24–48 hours. Questions and protocol feedback are reviewed directly by our editorial research team for educational clarification.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <Mail className="w-4 h-4 text-[#166534]" />
                  Direct Channels
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block">Contact Email:</span>
                    <a
                      href="mailto:info@optimenwellbeing.com"
                      className="text-slate-600 hover:text-[#166534] font-mono transition-colors"
                    >
                      info@optimenwellbeing.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                <strong className="text-[#166534] block mb-1">Clinical Note:</strong>
                If you are experiencing acute chest pain, shortness of breath, or an urgent medical crisis, immediately contact local emergency services. OptiMen provides healthspan education and cannot triage acute emergencies.
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
