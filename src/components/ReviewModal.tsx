import React from 'react';
import { ProductReview } from '../types';
import { X, Check, AlertCircle, Award, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface ReviewModalProps {
  review: ProductReview | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Independent Lab & Field Assessment</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-[#166534] font-bold">Grade {review.evidenceGrade}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header block with Score */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">
                {review.category} &middot; {review.brand}
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
                {review.name}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                Tested for {review.testedDuration} &middot; Retail: {review.priceRange}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="inline-flex flex-col items-center justify-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                <span className="text-2xl font-black text-[#0F172A] tabular-nums">
                  {review.overallScore}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  out of 10
                </span>
              </div>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              OptiMen Verdict
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {review.verdict}
            </p>
          </div>

          {/* Who it's best for */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Ideal Candidate & Use-Case
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {review.whoItIsFor}
            </p>
          </div>

          {/* Pros & Cons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#166534] mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Key Advantages
              </h4>
              <ul className="space-y-2">
                {review.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-1.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                Considerations
              </h4>
              <ul className="space-y-2">
                {review.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Specifications & Testing Parameters
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              {review.specs.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-3 py-2.5 ${
                    idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                  }`}
                >
                  <span className="font-medium text-slate-600">{item.label}</span>
                  <span className="font-semibold text-slate-900 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Reader Supported &middot; Field Tested
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {review.affiliateUrl && (
              <a
                href={review.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#166534] hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>View on {review.affiliateStore ?? 'Amazon'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
