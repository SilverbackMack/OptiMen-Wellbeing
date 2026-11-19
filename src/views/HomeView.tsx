import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Activity, BookOpen, Landmark, FileText, ClipboardCheck, ChevronDown } from 'lucide-react';
import { PageType, Article, ProductReview } from '../types';
import { HERO_IMAGE, ARTICLES, PRODUCT_REVIEWS } from '../data/content';
import { TrustIndicators } from '../components/TrustIndicators';
import { NewsletterSection } from '../components/NewsletterSection';
import { PillarWheel } from '../components/PillarWheel';
import { ArticleCard, ReviewCard } from '../components/Cards';
import { EASE, Eyebrow, FlowDiagram, Reveal } from '../components/Motion';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectReview: (review: ProductReview) => void;
}

const TOPICS = [
  'Heart health', 'Prostate', 'Testosterone', 'Sleep', 'Zone 2 cardio', 'Strength',
  'Protein', 'Stress', 'Burnout', 'Health checks', 'Supplements', 'Wearables',
];

const HEADLINE = ['Stronger.', 'Longer.', 'Better.'];

export const scrollToChecklist = () => {
  document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onSelectArticle,
  onSelectReview,
}) => {
  const featuredArticles = ARTICLES.slice(0, 4);
  const featuredReviews = PRODUCT_REVIEWS.slice(0, 3);
  const reduce = useReducedMotion();
  // Black Friday banner: shows once the guide is live (23 Nov) until Cyber Monday (30 Nov), UK time.
  const todayUK = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
  const blackFriday = todayUK <= '2026-11-30' ? ARTICLES.find((a) => a.id === 'black-friday-mens-health-deals-2026') : undefined;

  return (
    <div>
      {/* 1. HERO */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden min-h-[640px] lg:min-h-[calc(100vh-4.5rem)] flex items-center">
        <motion.img
          src={HERO_IMAGE}
          alt="Man walking along a coastal trail at sunrise"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-[32%_center] sm:object-center"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-7">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <Eyebrow dark>Men's health, made simple</Eyebrow>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
              <span className="sr-only">Helping men live </span>
              {HEADLINE.map((word, i) => (
                <span key={word} className="block overflow-hidden pb-2">
                  <motion.span
                    className={`block ${i === 2 ? 'text-glow' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-200 max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            >
              Plain-English health guides for men, 25 to 55. US and UK.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            >
              <button
                onClick={onOpenAssessment}
                className="group px-6 py-4 bg-emerald-400 hover:bg-emerald-300 text-[#0F172A] rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_40px_rgba(52,211,153,0.35)]"
              >
                <Activity className="w-4 h-4" />
                <span>Take the 2-minute quiz</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToChecklist}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4 text-emerald-300" />
                <span>Free health checklist</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Heartbeat line */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="absolute bottom-3 sm:bottom-10 left-0 w-full h-10 sm:h-16 opacity-70 pointer-events-none"
        >
          <motion.path
            d="M0 40 H380 L400 40 L415 18 L432 62 L448 6 L466 70 L482 40 H700 L718 40 L730 24 L744 56 L758 14 L774 64 L788 40 H1200"
            fill="none"
            stroke="#34D399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}
          />
        </svg>

        <motion.div
          aria-hidden="true"
          className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {blackFriday && (
        <button
          onClick={() => onSelectArticle(blackFriday)}
          className="group w-full bg-amber-400 text-[#0F172A] py-3 px-4 cursor-pointer hover:bg-amber-300 transition-colors"
        >
          <span className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-bold">
            <span className="uppercase tracking-[0.15em]">Black Friday</span>
            <span className="font-semibold">The men's health kit actually worth buying, and what to skip</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      )}

      {/* 2. TOPIC STRIP */}
      <div className="bg-[#166534] text-white overflow-hidden py-3.5" aria-hidden="true">
        <div className="marquee">
          {[...TOPICS, ...TOPICS].map((topic, i) => (
            <span key={i} className="flex items-center gap-6 pl-6 text-sm font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
              {topic}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            </span>
          ))}
        </div>
      </div>

      {/* 3. THE FIVE PILLARS */}
      <section className="relative bg-[#0F172A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="glow-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <Eyebrow dark>Five pillars</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">One healthy life.</h2>
            <p className="text-base text-slate-400">Pick a pillar to explore.</p>
          </Reveal>
          <Reveal>
            <PillarWheel onNavigate={onNavigate} />
          </Reveal>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 space-y-3">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">Evidence in. Hype out.</h2>
          </Reveal>
          <FlowDiagram
            steps={[
              { icon: BookOpen, title: 'We read the research', text: 'Published studies, sources listed.' },
              { icon: Landmark, title: 'We check official advice', text: 'US and UK, side by side.' },
              { icon: FileText, title: 'You get the short version', text: 'Clear steps. No jargon.' },
            ]}
          />
          <Reveal className="text-center mt-12" delay={0.3}>
            <button
              onClick={() => onNavigate('about')}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#166534] hover:text-emerald-800 cursor-pointer"
            >
              About us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* 5. LATEST GUIDES */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4 mb-10">
            <div className="space-y-3">
              <Eyebrow>Fresh reading</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">Latest guides</h2>
            </div>
            <button
              onClick={() => onNavigate('health')}
              className="group text-sm font-bold text-[#166534] hover:text-emerald-800 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              All guides
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} onSelect={onSelectArticle} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4 mb-10">
            <div className="space-y-3">
              <Eyebrow>Worth your money?</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">Honest reviews</h2>
              <p className="text-sm text-slate-500">Desk reviews. US and UK prices. Who should skip it.</p>
            </div>
            <button
              onClick={() => onNavigate('reviews')}
              className="group text-sm font-bold text-[#166534] hover:text-emerald-800 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              All reviews
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev, i) => (
              <ReviewCard key={rev.id} review={rev} index={i} onSelect={onSelectReview} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST */}
      <TrustIndicators />

      {/* 8. FREE CHECKLIST */}
      <NewsletterSection />
    </div>
  );
};
