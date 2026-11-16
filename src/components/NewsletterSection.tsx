import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Download, ClipboardCheck, Check } from 'lucide-react';
import { EASE } from './Motion';

// MailerLite form: OW website signup (adds to the OW Newsletter group, double opt-in)
// The free download offered with the newsletter (file lives in public/downloads)
export const CHECKLIST_URL = '/downloads/mens-health-mot-checklist.pdf';
export const CHECKLIST_NAME = "The Men's Health MOT Checklist";

const MAILERLITE_SUBSCRIBE_URL = 'https://assets.mailerlite.com/jsonp/2717913/forms/201492304082502919/subscribe';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateNewsletterEmail(emailInput: string): ValidationResult {
  const trimmed = emailInput.trim();

  if (!trimmed) {
    return {
      isValid: false,
      message: 'Please enter your email address to get the checklist.',
    };
  }

  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      message: 'Email address cannot contain spaces.',
    };
  }

  if (!trimmed.includes('@')) {
    return {
      isValid: false,
      message: "Missing '@' symbol. Please provide a complete email address (e.g., name@example.com).",
    };
  }

  const parts = trimmed.split('@');
  if (parts.length > 2) {
    return {
      isValid: false,
      message: "Email address cannot contain multiple '@' symbols.",
    };
  }

  const [username, domain] = parts;

  if (!username) {
    return {
      isValid: false,
      message: "Please enter the username portion before the '@' (e.g., john@domain.com).",
    };
  }

  if (!domain) {
    return {
      isValid: false,
      message: "Please enter a domain after the '@' (e.g., gmail.com or company.com).",
    };
  }

  if (!domain.includes('.')) {
    return {
      isValid: false,
      message: "Domain is missing an extension like .com, .org, or .co (e.g., 'domain.com').",
    };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];

  if (tld.length < 2) {
    return {
      isValid: false,
      message: 'Please provide a valid domain extension with at least 2 letters (e.g., .com, .io).',
    };
  }

  // General standard RFC format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      message: 'Please check the formatting. Ensure there are no special unsupported characters.',
    };
  }

  return { isValid: true, message: '' };
}

// Signup state shared by the full-width section and the compact card
function useNewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error && validateNewsletterEmail(val).isValid) setError('');
  };

  const handleBlur = () => {
    if (email.trim().length > 0) {
      const check = validateNewsletterEmail(email);
      setError(check.isValid ? '' : check.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateNewsletterEmail(email);
    if (!check.isValid) {
      setError(check.message);
      return;
    }

    setError('');
    setSending(true);
    try {
      const body = new URLSearchParams({
        'fields[email]': email.trim(),
        'ml-submit': '1',
        anticsrf: 'true',
      });
      // MailerLite doesn't allow reading the reply from another site, so a
      // completed request is treated as success; MailerLite then emails a confirmation link.
      await fetch(MAILERLITE_SUBSCRIBE_URL, { method: 'POST', mode: 'no-cors', body });
      setSubmitted(true);
      // Visitor stats: count signups so we can see which pages convert
      const gc = (window as any).goatcounter;
      if (gc && typeof gc.count === 'function') {
        gc.count({ path: 'newsletter-signup', title: 'Newsletter signup', event: true });
      }
    } catch {
      setError("Sorry, we couldn't reach our mailing list just now. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setError('');
    setSubmitted(false);
  };

  return { email, submitted, sending, error, handleInputChange, handleBlur, handleSubmit, handleReset };
}

const CONSENT_TEXT =
  "By subscribing you agree to receive the OptiMen Wellbeing newsletter, which may include affiliate recommendations. We'll email you a link to confirm, and you can unsubscribe at any time.";

// The picture of the checklist beside the signup form. Rows tick themselves off.
const CHECKLIST_PREVIEW = ['Blood pressure', 'NHS Health Check', 'Cholesterol', 'Prostate (PSA)', 'Bowel screening'];

const ChecklistPreview: React.FC = () => (
  <motion.div
    aria-hidden="true"
    className="relative w-64 sm:w-72 mx-auto"
    initial={{ opacity: 0, y: 40, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: 4 }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    <div className="absolute inset-0 translate-x-4 translate-y-4 -rotate-6 rounded-2xl bg-slate-700/60 border border-slate-600" />
    <div className="relative rounded-2xl bg-white text-[#0F172A] overflow-hidden shadow-2xl shadow-black/40">
      <div className="bg-[#0F172A] px-5 py-4 border-b-4 border-emerald-400">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400">OptiMen Wellbeing</p>
        <p className="text-base font-extrabold text-white leading-tight mt-1">The Men's Health MOT Checklist</p>
      </div>
      <ul className="px-5 py-4 space-y-3">
        {CHECKLIST_PREVIEW.map((row, i) => (
          <li key={row} className="flex items-center gap-3 text-sm font-semibold">
            <span className="w-5 h-5 rounded-md border-2 border-[#166534] flex items-center justify-center shrink-0">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.25, type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Check className="w-3.5 h-3.5 text-[#166534]" strokeWidth={4} />
              </motion.span>
            </span>
            {row}
          </li>
        ))}
      </ul>
      <div className="px-5 pb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>2 pages &middot; PDF</span>
        <span className="text-[#166534] bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">Free</span>
      </div>
    </div>
  </motion.div>
);

export const NewsletterSection: React.FC = () => {
  const { email, submitted, sending, error, handleInputChange, handleBlur, handleSubmit, handleReset } = useNewsletterSignup();

  return (
    <section id="checklist" className="bg-[#0F172A] text-white py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] bg-[#166534]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="glow-grid absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-3">Free download</p>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance leading-[1.05]">
            Get the Free Men's Health MOT Checklist
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-md mx-auto lg:mx-0">
            Every check worth having, and what's free on the NHS. Two pages.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-lg mx-auto lg:mx-0 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail
                      className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        error ? 'text-rose-400' : 'text-slate-400'
                      }`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Your email address"
                      aria-label="Email address for the free checklist and newsletter"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'newsletter-email-error' : undefined}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/90 rounded-full text-white placeholder-slate-400 text-sm focus:outline-none transition-all border ${
                        error
                          ? 'border-rose-500 focus:border-rose-400 ring-2 ring-rose-500/20'
                          : 'border-slate-700 focus:border-emerald-400'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-[#0F172A] text-sm font-bold rounded-full transition-all cursor-pointer active:scale-95 whitespace-nowrap shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                  >
                    {sending ? 'Sending…' : 'Get the checklist'}
                  </button>
                </div>

                {error && (
                  <div
                    id="newsletter-email-error"
                    role="alert"
                    className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-left flex items-start gap-2.5 text-xs text-rose-200"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{error}</span>
                  </div>
                )}
              </div>

              <p className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No spam. Unsubscribe in one click.
              </p>

              <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">{CONSENT_TEXT}</p>
            </form>
          ) : (
            <div className="mt-8 p-6 bg-slate-800/90 border border-emerald-500/40 rounded-2xl max-w-lg mx-auto lg:mx-0 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your checklist is ready</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We've also sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to start getting the newsletter. If you can't see it within a few minutes, check your spam or promotions folder.
                  </p>
                </div>
              </div>

              <a
                href={CHECKLIST_URL}
                target="_blank"
                rel="noopener"
                className="w-full px-5 py-3 bg-[#166534] hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download {CHECKLIST_NAME} (PDF)</span>
              </a>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 cursor-pointer font-medium transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sign up with another email address</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <ChecklistPreview />
      </div>
    </section>
  );
};

/** Compact signup card for the end of articles and reviews. */
export const ChecklistSignup: React.FC = () => {
  const { email, submitted, sending, error, handleInputChange, handleBlur, handleSubmit } = useNewsletterSignup();

  return (
    <aside className="bg-[#0F172A] text-white p-5 sm:p-6 rounded-xl text-left space-y-4" aria-label="Free checklist signup">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 shrink-0">
          <ClipboardCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">Free download</p>
          <h2 className="text-lg font-extrabold tracking-tight leading-snug">{CHECKLIST_NAME}</h2>
          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            Two pages: the health checks worth having at every age, what's free on the NHS and how to ask for each. Join our newsletter and download it straight away.
          </p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter your email address..."
              aria-label="Email address for the free checklist and newsletter"
              aria-invalid={!!error}
              className={`flex-1 min-w-0 px-4 py-2.5 bg-slate-800/90 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none border ${
                error ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-500'
              }`}
            />
            <button
              type="submit"
              disabled={sending}
              className="px-5 py-2.5 bg-[#166534] hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {sending ? 'Sending…' : 'Get the Checklist'}
            </button>
          </div>
          {error && (
            <p role="alert" className="text-xs text-rose-300 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </p>
          )}
          <p className="text-[11px] text-slate-400 leading-relaxed">{CONSENT_TEXT}</p>
        </form>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Your checklist is ready. We've also sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to start getting the newsletter.
            </span>
          </p>
          <a
            href={CHECKLIST_URL}
            target="_blank"
            rel="noopener"
            className="px-5 py-2.5 bg-[#166534] hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download the checklist (PDF)</span>
          </a>
        </div>
      )}
    </aside>
  );
};
