import React, { useState } from 'react';
import { ProductReview, PageType } from '../types';
import { PRODUCT_REVIEWS } from '../data/content';
import { ShieldCheck, Check, AlertCircle, ChevronRight, Award, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { TrustIndicators } from '../components/TrustIndicators';

interface ReviewsViewProps {
  onSelectReview: (review: ProductReview) => void;
  onNavigate: (page: PageType) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onSelectReview, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Wearables', 'Sleep Tech', 'Supplements', 'Recovery'];

  const filteredReviews = selectedCategory === 'All'
    ? PRODUCT_REVIEWS
    : PRODUCT_REVIEWS.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-0 text-left">
      
      {/* 1. HERO */}
      <section className="bg-[#0F172A] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Independent Hardware & Compound Testing
            </p>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Product Reviews & Trusted Gear
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              We separate clinical utility from silicon valley marketing hype. Tested in high-performance routines for 6 to 14 months before rating.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                100% Conflict-of-Interest Disclosed
              </span>
              <span>&middot;</span>
              <span>Third-Party Lab Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REVIEWS DIRECTORY & FILTER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Functional Category Filter (Segmented control) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 mb-10">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Vetted Longevity Equipment ({filteredReviews.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated on sensor precision, clinical evidence, durability, and daily compliance.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                onClick={() => onSelectReview(rev)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category and Grade badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {rev.category} &middot; {rev.brand}
                    </span>
                    <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Evidence Grade {rev.evidenceGrade}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#166534] transition-colors">
                      {rev.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{rev.priceRange}</span>
                      <span>&middot;</span>
                      <span>{rev.testedDuration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {rev.verdict}
                  </p>

                  {/* Highlights teaser */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 block">Top Strength:</span>
                    <p className="text-slate-600 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#166534] shrink-0 mt-0.5" />
                      <span>{rev.pros[0]}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#0F172A] tabular-nums">
                      {rev.overallScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">/ 10</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rev.affiliateUrl && (
                      <a
                        href={rev.affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#0F172A] hover:bg-[#166534] rounded-lg transition-colors inline-flex items-center gap-1 shadow-xs"
                      >
                        <span>{rev.affiliateStore ?? 'Amazon'}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    )}
                    <span className="text-xs font-semibold text-[#166534] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Analysis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. TESTING RIGOR & METHODOLOGY */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="text-xs uppercase tracking-widest text-[#166534] font-bold">
              The Testing Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              How OptiMen Tests Gear & Supplements
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never publish unboxing reviews. Before any product receives an OptiMen rating, it goes through our 3-stage validation process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider">01. Minimum Duration</span>
              <h3 className="text-base font-bold text-[#0F172A]">6+ Months Field Wear</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Biometric wearables and sleep monitors must be worn across varying training intensities, travel, and recovery states to test algorithm drift.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider">02. Laboratory Purity</span>
              <h3 className="text-base font-bold text-[#0F172A]">Certificate of Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supplements must possess NSF for Sport, Informed-Choice, or IFOS certifications verifying zero heavy metals, micro-toxins, or unlisted compounds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider">03. Clinical Utility</span>
              <h3 className="text-base font-bold text-[#0F172A]">Actionable Data Only</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If a device generates vanity numbers without changing user behavior or autonomic recovery, its score reflects that limitation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TRUST STATS */}
      <TrustIndicators />

    </div>
  );
};
