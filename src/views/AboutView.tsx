import React from 'react';
import { ADVISORY_BOARD, HEALTH_IMAGE } from '../data/content';
import { PageType } from '../types';
import { Shield, Award, Stethoscope, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { TrustIndicators } from '../components/TrustIndicators';

interface AboutViewProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <div className="space-y-0 text-left">
      
      {/* 1. HERO */}
      <section className="bg-[#0F172A] text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              About OptiMen Wellbeing
            </p>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A New Standard for Men's Healthspan
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              We bridge the chasm between clinical longevity medicine and the daily realities of ambitious men aged 25–55.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY / MISSION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#166534] font-bold">
                Our Genesis
              </span>

              <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">
                Built for the Demands of Men in Their Prime
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                Between the ages of 25 and 55, men shoulder peak professional responsibility, entrepreneurial risks, and family leadership. Yet this is precisely when traditional medicine leaves men neglected—relying on standard physicals that measure only superficial cholesterol and blood pressure while silent arterial plaque and metabolic resistance develop undetected.
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                OptiMen Wellbeing was founded to replace noise with signal. We reject the extremes of bodybuilding narcissism on one hand and complacent sedentary decline on the other. 
              </p>

              <div className="pt-2 border-l-2 border-[#166534] pl-4 space-y-2">
                <p className="text-sm font-semibold text-[#0F172A]">
                  "Longevity is not about living frail at 95. It is about operating with maximum cognitive drive, physical strength, and emotional composure at 45, 55, and beyond."
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative h-[400px]">
                <img
                  src={HEALTH_IMAGE}
                  alt="OptiMen wellbeing clinical philosophy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. RESEARCH & EVIDENCE FRAMEWORK */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-2">
              Research Principles
            </p>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Evidence Review & Synthesis Framework
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Our guides, protocols, and educational resources are built around peer-reviewed literature and longevity science, structured across dedicated research focus areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ADVISORY_BOARD.map((member, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#166534] font-semibold mt-0.5">
                      {member.credentials}
                    </p>
                    <p className="text-xs text-slate-500">
                      {member.institution}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Scope & Focus
                  </div>
                  <p className="text-xs font-medium text-slate-700">
                    {member.specialty}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EDITORIAL ETHICS & STANDARDS */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl text-left space-y-4 mb-12">
            <span className="text-xs uppercase tracking-widest text-[#166534] font-bold">
              Our Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Editorial Policy & Disclosure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We uphold strict separations between commercial partnerships and clinical analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#166534] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Zero Pay-For-Play</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Brands cannot buy review scores or pay to be placed on our recommended protocols. If a wearable or supplement underperforms in lab testing, we state it plainly.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#166534] flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Human Clinical Evidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We prioritize randomized, placebo-controlled clinical trials conducted in human populations over preliminary rodent or in-vitro hypotheses.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#166534] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Safety & Contraindication Flags</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every protocol lists contraindications, interaction risks, and guidelines for consulting your primary care physician before taking action.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TRUST INDICATORS */}
      <TrustIndicators />

    </div>
  );
};
