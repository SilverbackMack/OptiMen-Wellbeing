import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShieldCheck, BookOpen, FlaskConical, PoundSterling, Eye } from 'lucide-react';
import { ProductReview, PageType } from '../types';
import { PRODUCT_REVIEWS } from '../data/content';
import { TrustIndicators } from '../components/TrustIndicators';
import { NewsletterSection } from '../components/NewsletterSection';
import { ReviewCard } from '../components/Cards';
import { Eyebrow, FlowDiagram, PageHero, Reveal } from '../components/Motion';

interface ReviewsViewProps {
  onSelectReview: (review: ProductReview) => void;
  onNavigate: (page: PageType) => void;
}

const CATEGORIES = ['All', 'Wearables', 'Sleep Tech', 'Supplements', 'Recovery'];

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onSelectReview }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredReviews =
    selectedCategory === 'All' ? PRODUCT_REVIEWS : PRODUCT_REVIEWS.filter((r) => r.category === selectedCategory);

  return (
    <div className="text-left">
      {/* 1. BANNER */}
      <PageHero eyebrow="Reviews" title="Honest reviews." line="Desk reviews, not hands-on tests. We say so every time.">
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { icon: ShieldCheck, text: 'Affiliate links disclosed' },
            { icon: PoundSterling, text: 'UK prices' },
            { icon: Eye, text: 'Who should skip it' },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5"
            >
              <Icon className="w-3.5 h-3.5 text-emerald-300" />
              {text}
            </span>
          ))}
        </div>
      </PageHero>

      {/* 2. REVIEWS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start sm:justify-center mb-10 overflow-x-auto -mx-4 px-4">
            <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-slate-600 hover:text-[#0F172A]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="review-filter"
                        className="absolute inset-0 bg-[#0F172A] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredReviews.map((rev, i) => (
                <ReviewCard key={rev.id} review={rev} index={i} onSelect={onSelectReview} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. HOW WE REVIEW */}
      <section className="relative py-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="glow-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <Eyebrow dark>How we review</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Three checks. No pretending.</h2>
          </Reveal>
          <FlowDiagram
            dark
            steps={[
              { icon: BookOpen, title: 'The evidence', text: 'Studies, NHS and NICE.' },
              { icon: FlaskConical, title: 'Independent tests', text: 'By others. Always named.' },
              { icon: PoundSterling, title: 'Real-world value', text: 'UK prices and cheaper options.' },
            ]}
          />
        </div>
      </section>

      {/* 4. TRUST */}
      <TrustIndicators />

      {/* 5. FREE CHECKLIST */}
      <NewsletterSection />
    </div>
  );
};
