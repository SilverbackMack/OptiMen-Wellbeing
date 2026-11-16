import React from 'react';
import { ArrowRight } from 'lucide-react';
import { relatedContent } from '../links';
import { articlePath, reviewPath } from '../seo';
import { OpenContent } from './LinkedText';

interface ReadNextProps {
  currentId: string;
  pillar?: string;
  onOpen: OpenContent;
}

/** "Read next" links shown at the end of every article and review. */
export const ReadNext: React.FC<ReadNextProps> = ({ currentId, pillar, onOpen }) => {
  const { articles, reviews } = relatedContent(currentId, pillar);
  if (!articles.length && !reviews.length) return null;

  const items = [
    ...articles.map((a) => ({ key: a.id, label: a.pillarLabel, title: a.title, href: articlePath(a.id), target: { articleId: a.id } })),
    ...reviews.map((r) => ({ key: r.id, label: 'Review', title: r.name, href: reviewPath(r.id), target: { reviewId: r.id } })),
  ];

  return (
    <nav aria-label="Read next" className="space-y-3 pt-6 border-t border-slate-100 text-left">
      <h2 className="text-sm uppercase tracking-wider font-bold text-[#0F172A]">Read next</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              onOpen(item.target);
            }}
            className="group p-4 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-200 rounded-xl transition-colors flex items-start justify-between gap-3"
          >
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#166534]">{item.label}</span>
              <span className="block text-sm font-semibold text-[#0F172A] leading-snug mt-0.5">{item.title}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </nav>
  );
};
