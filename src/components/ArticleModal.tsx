import React from 'react';
import { Article } from '../types';
import { X, Clock, Calendar, CheckCircle2, Bookmark, ShieldCheck, ExternalLink } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
            <ShieldCheck className="w-4 h-4" />
            <span>Evidence-Based Protocol</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata: Unboxed Text with typographic separators */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-[#166534] font-semibold">{article.pillarLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {article.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {article.summary}
            </p>
          </div>

          {/* Author Block */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
              OM
            </div>
            <div>
              <div className="text-sm font-bold text-[#0F172A]">{article.author.name}</div>
              <div className="text-xs text-slate-600 font-medium">{article.author.credentials}</div>
              <div className="text-xs text-[#166534] mt-0.5">{article.author.role}</div>
            </div>
          </div>

          {/* Full Article Content Sections */}
          {article.sections && article.sections.length > 0 && (
            <div className="space-y-6 pt-2 border-t border-slate-100">
              {article.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3 text-left">
                  <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">
                    {section.heading}
                  </h3>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm text-slate-700 leading-relaxed font-normal">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 pl-2 pt-1">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Key Clinical Takeaways */}
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider font-bold text-[#0F172A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
              Core Clinical Takeaways
            </h2>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concrete Action Protocol */}
          <div className="bg-emerald-50/60 p-6 rounded-xl border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#166534]">
              <Bookmark className="w-4 h-4" />
              Actionable Longevity Protocol
            </div>
            <div className="space-y-3">
              {article.protocolSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#166534] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Citations & References */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Peer-Reviewed References & Clinical Trials
            </h3>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside font-mono">
              {article.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-sans text-slate-700">{ref}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 rounded-b-2xl flex items-center justify-between">
          <span className="text-xs text-slate-500">
            OptiMen Medical Library &middot; Educational Use Only
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
