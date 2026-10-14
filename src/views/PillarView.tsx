import React from 'react';
import { PillarId, Article, ProductReview, PageType } from '../types';
import { PILLARS, ARTICLES, PRODUCT_REVIEWS } from '../data/content';
import { NewsletterSection } from '../components/NewsletterSection';
import { Clock, ShieldCheck, CheckCircle2, ChevronRight, Activity, ArrowRight, Bookmark } from 'lucide-react';

interface PillarViewProps {
  pillarId: PillarId;
  onNavigate: (page: PageType) => void;
  onSelectArticle: (article: Article) => void;
  onSelectReview: (review: ProductReview) => void;
  onOpenAssessment: () => void;
}

export const PillarView: React.FC<PillarViewProps> = ({
  pillarId,
  onNavigate,
  onSelectArticle,
  onSelectReview,
  onOpenAssessment,
}) => {
  const pillar = PILLARS[pillarId] || PILLARS.health;
  const pillarArticles = ARTICLES.filter((a) => a.pillar === pillarId);
  const relevantReviews = PRODUCT_REVIEWS.filter((r) => {
    if (pillarId === 'sleep') return r.category === 'Sleep Tech' || r.category === 'Wearables';
    if (pillarId === 'fitness') return r.category === 'Wearables' || r.category === 'Recovery';
    if (pillarId === 'nutrition') return r.category === 'Supplements';
    if (pillarId === 'health') return r.category === 'Diagnostics' || r.category === 'Wearables' || r.category === 'Supplements';
    return true;
  });

  return (
    <div className="space-y-0 text-left">
      
      {/* 1. PILLAR HERO BANNER */}
      <section className="bg-[#0F172A] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                OptiMen Core Pillar
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {pillar.name}
              </h1>

              <p className="text-lg text-emerald-300/90 font-medium leading-relaxed">
                {pillar.tagline}
              </p>

              <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {pillar.description}
              </p>


            </div>

            {/* Pillar Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl relative h-[320px] sm:h-[380px] bg-slate-900">
                <img
                  src={pillar.image}
                  alt={pillar.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0F172A]/80 backdrop-blur-md rounded-xl border border-slate-700/60 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-0.5">Clinical Protocol Anchor</span>
                  Verified against multi-year longevity cohort standards.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BIOMARKERS & PROTOCOL SYSTEM */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Key Biomarkers Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-1">
                  Primary Quantitative Markers
                </p>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  What We Measure & Track
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Moving past vague feelings into objective laboratory metrics.
                </p>
              </div>

              <div className="space-y-3">
                {pillar.keyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-slate-800">
                      {metric}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Target Benchmark
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence-Based Protocol Highlights */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-1">
                  Actionable Architecture
                </p>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  Core Implementation Protocols
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Daily and weekly behavioral routines that compound over 30+ years.
                </p>
              </div>

              <div className="space-y-3">
                {pillar.protocolHighlights.map((proto, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#166534] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                      {proto}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. ARTICLES IN THIS PILLAR */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-1">
              Educational Guides
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              In-Depth Clinical Breakdowns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillarArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-[#166534] font-semibold">{article.pillarLabel}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] hover:text-[#166534] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{article.author.name}</span>
                  <span className="font-semibold text-[#166534] flex items-center gap-0.5">
                    Read Guide &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. RELEVANT HARDWARE & TECH */}
      {relevantReviews.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-1">
                Gear & Laboratory Tests
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Recommended Tools for {pillar.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantReviews.slice(0, 2).map((rev) => (
                <div
                  key={rev.id}
                  onClick={() => onSelectReview(rev)}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-500 uppercase">{rev.brand}</span>
                      <span className="font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Score: {rev.overallScore}/10
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {rev.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.verdict}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#166534]">
                    <span>View Specifications & Clinical Grade</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. NEWSLETTER INTEGRATION */}
      <NewsletterSection />

    </div>
  );
};
