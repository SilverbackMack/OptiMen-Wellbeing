import React from 'react';
import { TRUST_STATS } from '../data/content';
import { Shield, Award, BookOpen, Stethoscope } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial statement header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-2">
            The OptiMen Standard
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight text-balance">
            Clinical Rigor, Zero Gimmicks
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Men’s health is inundated with quick fixes, predatory supplements, and aggressive gym cliches. We anchor every recommendation in peer-reviewed science and preventative medicine.
          </p>
        </div>

        {/* 4 Quantitative Rigor Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-2">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Framework Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200/80">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Primary Literature First</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Directly citing human randomized clinical trials and observational cohorts rather than extrapolating rodent studies or marketing claims.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Evidence-Based Synthesis</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Guides and protocols are grounded in established clinical guidelines, published trials, and preventative health literature.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Independent Testing Standards</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We independently test wearables, sleep tech, and third-party certified supplements with verified chain-of-custody purity.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
