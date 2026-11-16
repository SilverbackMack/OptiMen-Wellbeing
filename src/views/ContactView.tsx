import React, { useState } from 'react';
import { NewsletterSection } from '../components/NewsletterSection';
import { Mail, Handshake, CheckCircle2, Send, Siren } from 'lucide-react';
import { PageHero, Reveal } from '../components/Motion';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please add your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please add a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = 'Please write at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const HELLO_EMAIL = 'hello@optimenwellbeing.com';
  const PARTNERS_EMAIL = 'partners@optimenwellbeing.com';
  const SUBJECT_LABELS: Record<string, string> = {
    general: 'General question',
    guides: 'Feedback on a guide',
    reviews: 'Feedback on a review',
    partnerships: 'Partnerships and affiliates',
    press: 'Press',
  };
  const recipientFor = (subject: string) =>
    ['partnerships', 'corporate', 'press'].includes(subject) ? PARTNERS_EMAIL : HELLO_EMAIL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const label = SUBJECT_LABELS[formData.subject] ?? 'Website enquiry';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:${recipientFor(formData.subject)}?subject=${encodeURIComponent(`OptiMen enquiry: ${label}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const field =
    'w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-emerald-600/15 transition';

  return (
    <div className="text-left">
      {/* 1. BANNER */}
      <PageHero eyebrow="Contact" title="Say hello." line="Questions, corrections or partnerships. We read every message." />

      {/* 2. FORM AND EMAIL ADDRESSES */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-5">
                <h2 className="text-2xl font-extrabold text-[#0F172A]">Send a message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 block">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={field}
                    />
                    {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 block">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={field}
                    />
                    {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-topic" className="text-xs font-semibold text-slate-700 block">Topic</label>
                  <select
                    id="contact-topic"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={field}
                  >
                    {Object.entries(SUBJECT_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 block">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={field}
                  />
                  {errors.message && <p className="text-xs text-rose-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="group w-full py-4 px-6 bg-[#0F172A] hover:bg-[#166534] text-white text-sm font-bold rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Send message</span>
                </button>
                <p className="text-xs text-slate-500 text-center">Opens your email app with the message ready to send.</p>
              </form>
            ) : (
              <div className="bg-slate-50 p-10 rounded-3xl border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#166534] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">Almost done</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your email app should have opened with your message ready to send. Just press send. If nothing opened, email{' '}
                  <a href={`mailto:${recipientFor(formData.subject)}`} className="text-[#166534] font-semibold underline">{recipientFor(formData.subject)}</a>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'general', message: '' });
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white rounded-full text-sm font-semibold hover:bg-[#166534] transition-colors cursor-pointer"
                >
                  Send another
                </button>
              </div>
            )}
          </Reveal>

          <div className="lg:col-span-5 space-y-4">
            {[
              { icon: Mail, label: 'Readers', email: HELLO_EMAIL },
              { icon: Handshake, label: 'Partners and press', email: PARTNERS_EMAIL },
            ].map(({ icon: Icon, label, email }, i) => (
              <Reveal key={email} delay={0.1 + i * 0.1}>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-600/40"
                >
                  <span className="w-12 h-12 rounded-xl bg-[#0F172A] text-emerald-400 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#166534] group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider font-bold text-slate-500">{label}</span>
                    <span className="block text-sm sm:text-base font-bold text-[#0F172A] truncate">{email}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="flex items-start gap-4 rounded-2xl bg-rose-50 border border-rose-200 p-5">
                <span className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Siren className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-base font-bold text-rose-900">Emergency? Call 999.</p>
                  <p className="text-sm text-rose-900/80 mt-0.5">We can't give personal medical advice. For that, see your GP or call NHS 111.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FREE CHECKLIST */}
      <NewsletterSection />
    </div>
  );
};
