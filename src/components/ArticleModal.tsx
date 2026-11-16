import React, { useEffect, useRef } from 'react';
import { Article } from '../types';
import { X, Clock, Calendar, CheckCircle2, Bookmark, ShieldCheck, ExternalLink } from 'lucide-react';
import { createLinker } from '../links';
import { photoFor } from '../data/photos';
import { LinkedText, OpenContent } from './LinkedText';
import { ReadNext } from './ReadNext';
import { ChecklistSignup } from './NewsletterSection';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpen: OpenContent; // open another article or review from a link
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onOpen }) => {
  const scroller = useRef<HTMLDivElement>(null);

  // Start at the top when a link swaps one article for another
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [article?.id]);

  if (!article) return null;

  // Turns mentions of our other guides into links (each guide linked once)
  const link = createLinker(article.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        ref={scroller}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
            <ShieldCheck className="w-4 h-4" />
            <span>Evidence-Based Guide</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo */}
        <div className="relative h-48 sm:h-64 overflow-hidden bg-[#0F172A]">
          <img
            src={photoFor(article.id, article.pillar)}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent" />
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
                      <LinkedText pieces={link(p)} onOpen={onOpen} />
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 pl-2 pt-1">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-2 shrink-0" />
                          <span><LinkedText pieces={link(bullet)} onOpen={onOpen} /></span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.cta && (
                    <a
                      href={section.cta.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="px-4 py-2.5 text-sm font-semibold text-white bg-[#166534] hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{section.cta.label}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {article.affiliateCta && (
            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-100 space-y-3 text-left">
              <a
                href={article.affiliateCta.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-4 py-2.5 text-sm font-semibold text-white bg-[#166534] hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>{article.affiliateCta.label}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              {article.affiliateCta.note && (
                <p className="text-xs text-slate-600 leading-relaxed">{article.affiliateCta.note}</p>
              )}
            </div>
          )}

          {/* Key Clinical Takeaways */}
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider font-bold text-[#0F172A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
              Key Takeaways
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

          {/* Free checklist signup and where to go next */}
          <ChecklistSignup />
          <ReadNext currentId={article.id} pillar={article.pillar} onOpen={onOpen} />

          {/* Evidence Citations & References */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              References & Sources
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
            OptiMen Wellbeing &middot; Educational Use Only
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
