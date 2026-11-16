import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star } from 'lucide-react';
import { PillarId, Article, ProductReview, PageType } from '../types';
import { PILLARS, ARTICLES, PRODUCT_REVIEWS } from '../data/content';
import { PILLAR_META } from '../data/pillarMeta';
import { NewsletterSection } from '../components/NewsletterSection';
import { ArticleCard, ReviewCard } from '../components/Cards';
import { EASE, Eyebrow, PageHero, Reveal } from '../components/Motion';

interface PillarViewProps {
  pillarId: PillarId;
  onNavigate: (page: PageType) => void;
  onSelectArticle: (article: Article) => void;
  onSelectReview: (review: ProductReview) => void;
  onOpenAssessment: () => void;
}

export const PillarView: React.FC<PillarViewProps> = ({ pillarId, onSelectArticle, onSelectReview }) => {
  const id: PillarId = PILLARS[pillarId] ? pillarId : 'health';
  const pillar = PILLARS[id];
  const meta = PILLAR_META[id];
  const pillarArticles = ARTICLES.filter((a) => a.pillar === id);
  const relevantReviews = PRODUCT_REVIEWS.filter((r) => {
    if (id === 'sleep') return r.category === 'Sleep Tech' || r.category === 'Wearables';
    if (id === 'fitness') return r.category === 'Wearables' || r.category === 'Recovery';
    if (id === 'nutrition') return r.category === 'Supplements';
    if (id === 'health') return r.category === 'Diagnostics' || r.category === 'Wearables' || r.category === 'Supplements';
    return true;
  }).slice(0, 3);

  return (
    <div className="text-left">
      {/* 1. BANNER */}
      <PageHero key={id} eyebrow="OptiMen pillar" title={pillar.name} line={meta.line} image={meta.image} imageAlt={pillar.name}>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            {pillarArticles.length} {pillarArticles.length === 1 ? 'guide' : 'guides'}
          </span>
          {relevantReviews.length > 0 && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
              <Star className="w-3.5 h-3.5 text-emerald-300" />
              {relevantReviews.length} {relevantReviews.length === 1 ? 'review' : 'reviews'}
            </span>
          )}
        </div>
      </PageHero>

      {/* 2. AT A GLANCE: what to watch, where to start */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <Reveal className="space-y-3 mb-8">
              <Eyebrow>Watch</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">What to keep an eye on</h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {meta.track.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors duration-300 hover:bg-[#0F172A] hover:border-[#0F172A]"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#166534] flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-[#0F172A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#0F172A] transition-colors group-hover:text-white">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <Reveal className="space-y-3 mb-8">
              <Eyebrow>Do</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Where to start</h2>
            </Reveal>
            <ol className="relative space-y-4">
              <motion.span
                aria-hidden="true"
                className="absolute left-5 top-5 bottom-5 w-px bg-emerald-600/30 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              {meta.steps.map((step, idx) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.45, delay: 0.1 + idx * 0.12, ease: EASE }}
                  className="relative flex items-center gap-4"
                >
                  <span className="relative w-10 h-10 shrink-0 rounded-full bg-[#166534] text-white text-sm font-extrabold flex items-center justify-center ring-4 ring-white">
                    {idx + 1}
                  </span>
                  <span className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm sm:text-base font-semibold text-[#0F172A]">
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. GUIDES */}
      <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="space-y-3 mb-10">
            <Eyebrow>Read</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">Guides</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillarArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} onSelect={onSelectArticle} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. REVIEWS */}
      {relevantReviews.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="space-y-3 mb-10">
              <Eyebrow>Buy smart</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">Reviews</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantReviews.map((rev, i) => (
                <ReviewCard key={rev.id} review={rev} index={i} onSelect={onSelectReview} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. FREE CHECKLIST */}
      <NewsletterSection />
    </div>
  );
};
