import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Landmark, Layers, Unlock, Info } from 'lucide-react';
import { ARTICLES } from '../data/content';
import { CountUp, EASE, Eyebrow, Reveal } from './Motion';

const STATS = [
  { icon: BookOpen, count: ARTICLES.length, label: 'Guides', sub: 'Sources listed' },
  { icon: Landmark, value: 'UK', label: 'Guidance first', sub: 'NHS and NICE' },
  { icon: Layers, count: 5, label: 'Pillars', sub: 'One whole picture' },
  { icon: Unlock, value: 'Free', label: 'To read', sub: 'No paywall' },
];

export const TrustIndicators: React.FC = () => {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12 space-y-3">
          <Eyebrow>The OptiMen standard</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Evidence first. Zero gimmicks.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
                className="group bg-white p-6 rounded-2xl border border-slate-200 text-center transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className="w-11 h-11 mx-auto rounded-xl bg-emerald-50 border border-emerald-200/70 text-[#166534] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#166534] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tabular-nums tracking-tight">
                  {stat.count != null ? <CountUp to={stat.count} /> : stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-2">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl mx-auto flex items-start justify-center gap-2.5 text-sm text-slate-600 text-left sm:text-center">
            <Info className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
            <span>
              We're writers and researchers, not doctors. Our guides aren't medically reviewed and our reviews are desk
              reviews, not hands-on tests. Always check with your GP.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};
