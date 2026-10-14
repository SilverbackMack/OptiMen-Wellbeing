import React from 'react';
import { PageType, Article, ProductReview } from '../types';
import { HERO_IMAGE, PILLARS, ARTICLES, PRODUCT_REVIEWS } from '../data/content';
import { TrustIndicators } from '../components/TrustIndicators';
import { NewsletterSection } from '../components/NewsletterSection';
import { ArrowRight, Activity, Clock, ShieldCheck, ChevronRight, Award, CheckCircle2, ExternalLink } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectReview: (review: ProductReview) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onSelectArticle,
  onSelectReview,
}) => {
  const featuredArticles = ARTICLES.slice(0, 4);
  const featuredReviews = PRODUCT_REVIEWS.slice(0, 3);

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Evidence-Based Men's Performance & Longevity
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight lg:leading-[1.1] text-balance">
                Helping Men Live Stronger, Longer, Better.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Proactive protocols across cardiovascular health, Zone 2 endurance, circadian sleep, and metabolic nutrition. Grounded in clinical medicine—engineered for high-performing professionals, fathers, and leaders aged 25–55.
              </p>



              {/* Trust Subtext */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Peer-Reviewed Citations
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No Sponsored Bias
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Evidence-Based Framework
                </span>
              </div>

            </div>

            {/* Right Column: Hero Visual Carrier */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                <img
                  src={HERO_IMAGE}
                  alt="Healthy, confident man walking along coastal trail representing OptiMen Wellbeing"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Contrast scrim & caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0F172A]/85 backdrop-blur-md rounded-xl border border-slate-700/60 text-left">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                    <span>Target Age: 25–55</span>
                    <span>Longevity Metric</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    "Cardiovascular fitness is the single greatest determinant of healthspan."
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    — Journal of the American College of Cardiology
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. THE FIVE PILLARS (FEATURED CATEGORIES) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left max-w-3xl mb-14">
            <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-2">
              The Five Core Domains
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              A Comprehensive System for Male Healthspan
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              We deconstruct vitality into five interrelated biological pillars. Each domain features vetted protocols designed to compound over decades.
            </p>
          </div>

          {/* 5 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(PILLARS).map((pillar) => (
              <div
                key={pillar.id}
                onClick={() => onNavigate(pillar.id as PageType)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <img
                      src={pillar.image}
                      alt={pillar.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">
                        Pillar
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {pillar.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 text-left space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Biomarkers & Targets:
                      </span>
                      <div className="text-xs text-slate-700 space-y-1">
                        {pillar.keyMetrics.slice(0, 2).map((m, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                            <span className="truncate">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <span className="text-xs font-semibold text-[#166534] group-hover:text-emerald-700 flex items-center gap-1 transition-colors">
                    <span>View Protocols & Guides</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}

            {/* Assessment Quick Callout Box in the grid */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#166534]">
                    Interactive Tool
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-1">
                    Where Should You Start?
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Take the 2-minute clinical self-assessment to identify which of the 5 pillars is your primary bottleneck.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenAssessment}
                  className="w-full py-3 px-4 bg-[#0F172A] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Take Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. ABOUT OPTIMEN (MISSION & EDITORIAL PHILOSOPHY) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <p className="text-xs uppercase tracking-widest text-[#166534] font-bold">
                About OptiMen Wellbeing
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                Why Standard Healthcare Fails Men In Their Prime
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                Conventional medicine is designed for acute disease management—it waits for cardiovascular damage or metabolic dysfunction to manifest before intervening. 
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                At <strong className="text-[#0F172A]">OptiMen Wellbeing</strong>, we reject passive decay. We provide ambitious men—entrepreneurs carrying intense workload, executives balancing careers, and fathers wanting vitality for their families—with preventative screening tools, cardiovascular science, and real-world nutrition protocols.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <h4 className="text-sm font-bold text-[#0F172A]">Decades, Not Weeks</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Zero crash diets or extreme bodybuilder regimens. We optimize for high capacity at 40, 55, 70, and beyond.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <h4 className="text-sm font-bold text-[#0F172A]">Evidence-Grounded Insights</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Synthesized from published clinical trials, lipid guidelines, and metabolic research.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#166534] hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Our Research Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Visual Quote Banner */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6 text-left relative">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  The OptiMen Thesis
                </div>
                
                <blockquote className="text-xl sm:text-2xl font-semibold text-[#0F172A] leading-relaxed">
                  "Men do not deteriorate naturally at 40; they surrender mitochondrial capacity to chronic stress, fragmented sleep, and absent Zone 2 aerobic volume. When you measure the right biomarkers, longevity is engineered."
                </blockquote>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">
                    OM
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">OptiMen Research Synthesis</div>
                    <div className="text-xs text-slate-500">Longevity & Human Performance Principles</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LATEST ARTICLES (EVIDENCE-BASED ADVICE) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-2">
                Clinical Library
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Latest Evidence-Based Articles
              </h2>
            </div>

            <button
              onClick={() => onNavigate('health')}
              className="text-xs font-semibold uppercase tracking-wider text-[#166534] hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-[#166534] font-semibold">{article.pillarLabel}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#166534] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    {article.author.name}
                  </span>
                  <span className="text-xs font-bold text-[#166534] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PRODUCT REVIEWS TEASER */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#166534] font-bold mb-2">
                Trusted Recommendations
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Vetted Hardware & Bio-Tech
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Real laboratory and field testing on wearables, sleep trackers, cold plunges, and third-party certified supplements.
              </p>
            </div>

            <button
              onClick={() => onNavigate('reviews')}
              className="text-xs font-semibold uppercase tracking-wider text-[#166534] hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Explore All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <div
                key={rev.id}
                onClick={() => onSelectReview(rev)}
                className="group bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  
                  {/* Category & Grade */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">
                      {rev.category}
                    </span>
                    <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Grade {rev.evidenceGrade}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#166534] transition-colors">
                      {rev.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rev.testedDuration}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {rev.verdict}
                  </p>

                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-[#0F172A] tabular-nums">
                      {rev.overallScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">/ 10</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rev.affiliateUrl && (
                      <a
                        href={rev.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#0F172A] hover:bg-[#166534] rounded-lg transition-colors inline-flex items-center gap-1 shadow-xs"
                      >
                        <span>Amazon</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    )}
                    <span className="text-xs font-semibold text-[#166534] flex items-center gap-0.5">
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TRUST INDICATORS SECTION */}
      <TrustIndicators />

      {/* 7. NEWSLETTER SIGNUP */}
      <NewsletterSection />

    </div>
  );
};
