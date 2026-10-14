import React from 'react';
import { PageType } from '../types';
import { ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-white font-bold text-base">
                <span className="text-emerald-400 font-extrabold text-sm tracking-tighter">O</span>M
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                OptiMen<span className="text-emerald-400 font-semibold text-sm ml-1">Wellbeing</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-300 max-w-sm font-medium leading-relaxed">
              Helping Men Live Stronger, Longer, Better.
            </p>
            
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Evidence-based performance medicine, mitochondrial health, and practical lifestyle protocols engineered for men aged 25–55. Designed for professionals, entrepreneurs, and fathers committed to lifelong vitality.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Evidence-Based
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <HeartPulse className="w-4 h-4 text-emerald-400" />
                Peer-Reviewed Science
              </span>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              The Five Pillars
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('health')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Men's Health & Longevity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fitness')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Functional Fitness & Zone 2
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nutrition')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Metabolic Nutrition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sleep')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sleep & Recovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mindset')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Mindset & Stress Resilience
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Explore & Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Product & Tech Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssessment}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Longevity Assessment</span>
                  <span className="text-[10px] bg-emerald-950 px-1.5 py-0.2 border border-emerald-800 rounded">2 Min</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Research & Evidence Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Our Standard
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every protocol and recommendation is evaluated against peer-reviewed clinical literature. We do not accept payment to alter review scores or health recommendations.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Conflict-of-Interest Disclosed
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-slate-400 font-medium">Medical Disclaimer:</strong> The content provided on OptiMen Wellbeing is strictly for educational, informational, and lifestyle optimization purposes. It is not intended as medical advice, diagnosis, or personalized treatment. Consult a licensed physician prior to initiating any new exercise protocol, diet regimen, biomarker testing, or supplement schedule.
          </p>
          <div className="text-slate-400 whitespace-nowrap">
            &copy; {new Date().getFullYear()} OptiMen Wellbeing. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
