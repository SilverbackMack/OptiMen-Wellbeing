import React from 'react';
import { REGIONAL, REVIEW_PRICES } from '../data/regional';
import { ProductReview } from '../types';

/** "In the US / In the UK" box for guides where advice differs by country. */
export const RegionalNote: React.FC<{ id: string }> = ({ id }) => {
  const note = REGIONAL[id];
  if (!note) return null;
  const columns = [
    { key: 'us', label: 'In the US', points: note.us },
    { key: 'uk', label: 'In the UK', points: note.uk },
  ];
  return (
    <section aria-label="Advice by country" className="rounded-2xl border border-slate-200 overflow-hidden">
      <h2 className="px-5 py-3 bg-[#0F172A] text-white text-sm font-bold tracking-wide">Where you live matters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {columns.map((c) => (
          <div key={c.key} className="p-5 space-y-2.5">
            <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[#166534]">{c.label}</h3>
            <ul className="space-y-2">
              {c.points.map((p) => (
                <li key={p} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

/** Price text for a review, with US and UK prices where they differ. */
export function reviewPrice(review: ProductReview): string {
  const p = REVIEW_PRICES[review.id];
  return p ? `US ${p.us} · UK ${p.uk}` : review.priceRange;
}
