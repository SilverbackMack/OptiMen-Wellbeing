import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

// MailerLite form: OW website signup (adds to the OW Newsletter group, double opt-in)
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
      message: 'Please enter your email address to receive the weekly dispatch.',
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

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error) {
      const check = validateNewsletterEmail(val);
      if (check.isValid) {
        setError('');
      }
    }
  };

  const handleBlur = () => {
    if (email.trim().length > 0) {
      setIsTouched(true);
      const check = validateNewsletterEmail(email);
      if (!check.isValid) {
        setError(check.message);
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
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
    } catch {
      setError("Sorry, we couldn't reach our mailing list just now. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setError('');
    setIsTouched(false);
    setSubmitted(false);
  };

  return (
    <section className="bg-[#0F172A] text-white py-16 sm:py-20 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle background ambient element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">
          The Weekly OptiMen Dispatch
        </p>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
          Evidence-Based Longevity in Your Inbox
        </h2>

        <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
          Every Sunday: 1 clinical study deconstructed, 1 actionable longevity protocol, and vetted gear recommendations. No marketing spam, no dogmatic trends.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-lg mx-auto space-y-4">
            
            {/* Input Row */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className={`w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                    error ? 'text-rose-400' : 'text-slate-400'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email address..."
                    aria-label="Email address for weekly dispatch"
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-email-error" : undefined}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-800/90 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none transition-all border ${
                      error
                        ? 'border-rose-500 focus:border-rose-400 ring-2 ring-rose-500/20'
                        : 'border-slate-700 focus:border-emerald-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 bg-[#166534] hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
                >
                  {sending ? 'Subscribing…' : 'Get The Dispatch'}
                </button>
              </div>

              {/* Error feedback banner */}
              {error && (
                <div
                  id="newsletter-email-error"
                  role="alert"
                  className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-left flex items-start gap-2.5 text-xs text-rose-200 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{error}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Spam &middot; One-Click Unsubscribe
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto">
              By subscribing you agree to receive the OptiMen Wellbeing newsletter, which may include affiliate recommendations. We'll email you a link to confirm, and you can unsubscribe at any time.
            </p>

          </form>
        ) : (
          <div className="mt-8 p-6 bg-slate-800/90 border border-emerald-500/40 rounded-2xl max-w-lg mx-auto text-left space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Nearly there: check your inbox
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We've sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to complete your subscription. If you can't see it within a few minutes, check your spam or promotions folder.
                </p>
              </div>
            </div>

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

      </div>
    </section>
  );
};
