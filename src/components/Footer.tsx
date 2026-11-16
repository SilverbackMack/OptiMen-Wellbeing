import React from 'react';
import { ArrowUpRight, Activity } from 'lucide-react';
import { PageType } from '../types';
import { PILLAR_META, PILLAR_ORDER } from '../data/pillarMeta';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

const MORE: { label: string; page: PageType }[] = [
  { label: 'Reviews', page: 'reviews' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAssessment }) => {
  const go = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-white font-bold text-base">
                <span className="text-emerald-400 font-extrabold text-sm tracking-tighter">O</span>M
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                OptiMen<span className="text-emerald-400 font-semibold text-sm ml-1">Wellbeing</span>
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Stronger. Longer. <span className="text-emerald-400">Better.</span>
            </p>
            <button
              onClick={onOpenAssessment}
              className="group inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-emerald-400 hover:text-[#0F172A] border border-white/15 hover:border-emerald-400 text-white rounded-full text-sm font-bold transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              Take the 2-minute quiz
            </button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-4">Pillars</h4>
              <ul className="space-y-2.5">
                {PILLAR_ORDER.map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => go(id)}
                      className="group text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      {PILLAR_META[id].short}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-4">More</h4>
              <ul className="space-y-2.5">
                {MORE.map(({ label, page }) => (
                  <li key={page}>
                    <button
                      onClick={() => go(page)}
                      className="group text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      {label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Small print */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400 font-semibold">Not medical advice.</strong> OptiMen Wellbeing is for general
            information only. We are not doctors and our content is not medically reviewed. Speak to your GP before
            changing your exercise, diet, medicines or supplements.
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Affiliate links.</strong> Some links on OptiMen Wellbeing are
            affiliate links, which means we may earn a commission if you buy through them, at no extra cost to you. As an
            Amazon Associate I earn from qualifying purchases. We do not accept payment to change a review.
          </p>
        </div>
        <p className="pt-6 text-xs text-slate-500">&copy; {new Date().getFullYear()} OptiMen Wellbeing. All rights reserved.</p>
      </div>
    </footer>
  );
};
