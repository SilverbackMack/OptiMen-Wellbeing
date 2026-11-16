import React from 'react';
import { motion } from 'motion/react';
import {
  Check, X, HeartPulse, Moon, Dumbbell, Apple, BookOpen, Landmark, FileText, ListChecks,
  BadgePoundSterling, Users, ShieldAlert, ArrowRight, Activity,
} from 'lucide-react';
import { HEALTH_IMAGE, FITNESS_IMAGE } from '../data/content';
import { PageType } from '../types';
import { TrustIndicators } from '../components/TrustIndicators';
import { NewsletterSection } from '../components/NewsletterSection';
import { EASE, Eyebrow, FlowDiagram, PageHero, Reveal } from '../components/Motion';

interface AboutViewProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

const WE_ARE = ['Writers and researchers', 'UK guidance first', 'Sources on every guide', 'Free to read'];
const WE_ARE_NOT = ['Doctors', 'Medically reviewed', 'Hands-on product testers', 'A replacement for your GP'];

const FOCUS: { icon: typeof HeartPulse; title: string; line: string; page: PageType }[] = [
  { icon: HeartPulse, title: 'Heart and health checks', line: 'Screening and early warning signs', page: 'health' },
  { icon: Moon, title: 'Sleep', line: 'Deeper rest, better days', page: 'sleep' },
  { icon: Dumbbell, title: 'Fitness', line: 'Cardio, strength and staying mobile', page: 'fitness' },
  { icon: Apple, title: 'Nutrition', line: 'Food, protein and supplements', page: 'nutrition' },
];

const PRINCIPLES = [
  { icon: BadgePoundSterling, title: "Verdicts aren't for sale", line: 'Brands cannot pay to change a review.' },
  { icon: Users, title: 'Human studies first', line: 'Not animal studies or marketing claims.' },
  { icon: ShieldAlert, title: 'Risks flagged', line: 'We say when to see your GP.' },
];

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <div className="text-left">
      {/* 1. BANNER */}
      <PageHero
        eyebrow="About us"
        title={<>Men's health, minus the hype.</>}
        line="Plain-English guides for UK men aged 25 to 55."
        image={HEALTH_IMAGE}
      />

      {/* 2. WHY */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="space-y-5">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.05]">
              Less noise. More signal.
            </h2>
            <p className="text-lg text-slate-600 max-w-md">
              Men's health advice is full of quick fixes. We read the evidence and give you the short version.
            </p>
            <blockquote className="border-l-4 border-emerald-400 pl-5 text-lg font-semibold text-[#0F172A] max-w-md">
              Strong, sharp and steady at 45, 55 and beyond.
            </blockquote>
          </Reveal>

          <div className="relative h-[380px] sm:h-[440px]">
            <motion.img
              src={FITNESS_IMAGE}
              alt="Man running on a woodland trail"
              referrerPolicy="no-referrer"
              className="absolute right-0 top-0 w-[78%] h-[78%] object-cover rounded-3xl shadow-xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <motion.img
              src={HEALTH_IMAGE}
              alt="Man at a desk with a notebook"
              referrerPolicy="no-referrer"
              className="absolute left-0 bottom-0 w-[52%] h-[52%] object-cover rounded-3xl shadow-2xl border-4 border-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            />
            <div className="float-slow absolute right-4 bottom-6 bg-[#0F172A] text-white rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-3xl font-extrabold leading-none text-emerald-400">25–55</p>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-300 mt-1">Who we write for</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE ARE AND AREN'T */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 space-y-3">
            <Eyebrow>Straight with you</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">What we are. And aren't.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal className="rounded-3xl bg-[#0F172A] text-white p-8">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-emerald-400 mb-6">We are</h3>
              <ul className="space-y-4">
                {WE_ARE.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-base font-semibold"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: EASE }}
                  >
                    <span className="w-7 h-7 rounded-full bg-emerald-400 text-[#0F172A] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="rounded-3xl bg-white border border-slate-200 p-8">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-slate-500 mb-6">We are not</h3>
              <ul className="space-y-4">
                {WE_ARE_NOT.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-base font-semibold text-[#0F172A]"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: EASE }}
                  >
                    <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                      <X className="w-4 h-4" strokeWidth={3} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. HOW A GUIDE GETS MADE */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <Eyebrow>Our method</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">How a guide gets made</h2>
          </Reveal>
          <FlowDiagram
            steps={[
              { icon: BookOpen, title: 'Read the research' },
              { icon: Landmark, title: 'Check UK guidance' },
              { icon: FileText, title: 'Write it plainly' },
              { icon: ListChecks, title: 'List every source' },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {PRINCIPLES.map(({ icon: Icon, title, line }, i) => (
              <Reveal key={title} delay={i * 0.1} className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                <span className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/70 text-[#166534] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE COVER */}
      <section className="relative py-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="glow-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 space-y-3">
            <Eyebrow dark>What we cover</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Four areas we follow closely</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FOCUS.map(({ icon: Icon, title, line, page }, i) => (
              <motion.button
                key={title}
                type="button"
                onClick={() => onNavigate(page)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group text-left rounded-2xl bg-slate-800/60 border border-slate-700 p-5 sm:p-6 cursor-pointer transition-colors duration-300 hover:border-emerald-400/60 hover:bg-slate-800"
              >
                <span className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-5 transition-colors group-hover:bg-emerald-400 group-hover:text-[#0F172A]">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="text-base sm:text-lg font-bold">{title}</h3>
                <p className="text-sm text-slate-400 mt-1">{line}</p>
              </motion.button>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <button
              onClick={onOpenAssessment}
              className="group inline-flex items-center gap-2 px-6 py-4 bg-emerald-400 hover:bg-emerald-300 text-[#0F172A] rounded-full text-sm font-bold transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              Not sure where to start? Take the quiz
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* 6. TRUST */}
      <TrustIndicators />

      {/* 7. FREE CHECKLIST */}
      <NewsletterSection />
    </div>
  );
};
