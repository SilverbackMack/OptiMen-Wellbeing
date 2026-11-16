import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, Clock, ExternalLink, HeartPulse, ScanSearch, Moon, Dumbbell, Brain, Pill, Flame,
  Watch, Snowflake, Stethoscope, Zap, Salad, Activity, type LucideIcon,
} from 'lucide-react';
import { Article, ProductReview } from '../types';
import { EASE } from './Motion';

// Cards for lists of guides and reviews. Each card gets a small graphic
// "cover" so lists are visual without needing a photo for every page.

const TOPIC_ICONS: [RegExp, LucideIcon][] = [
  [/prostate|psa|testicle/i, ScanSearch],
  [/sauna|cold/i, Flame],
  [/sleep|3am/i, Moon],
  [/burnout|stress|cortisol|mind/i, Brain],
  [/supplement|creatine|omega/i, Pill],
  [/protein|nutrition|diet/i, Salad],
  [/zone 2|vo2|fitness|strength/i, Dumbbell],
  [/whoop|oura|wearable/i, Watch],
  [/testosterone|erectile/i, Zap],
  [/check|nhs|gp/i, Stethoscope],
  [/heart|apob|cholesterol/i, HeartPulse],
];

function topicIcon(title: string): LucideIcon {
  return TOPIC_ICONS.find(([re]) => re.test(title))?.[1] ?? Activity;
}

const REVIEW_ICONS: Record<ProductReview['category'], LucideIcon> = {
  Wearables: Watch,
  'Sleep Tech': Moon,
  Supplements: Pill,
  Recovery: Snowflake,
  Diagnostics: Stethoscope,
};

const Cover: React.FC<{ icon: LucideIcon; label: string; variant: number; badge?: string }> = ({
  icon: Icon,
  label,
  variant,
  badge,
}) => {
  // A few glow positions so neighbouring cards don't look identical
  const glows = ['85% 10%', '15% 90%', '50% 0%', '90% 90%'];
  return (
    <div
      className="relative h-32 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage: `radial-gradient(70% 90% at ${glows[variant % glows.length]}, rgba(22,101,52,0.75), transparent)`,
      }}
    >
      <div className="glow-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className="absolute -right-3 -bottom-5 w-32 h-32 text-emerald-400/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
      />
      <div className="absolute left-5 bottom-4 flex items-center gap-2.5">
        <span className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-emerald-300">
          <Icon className="w-5 h-5" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-emerald-300">{label}</span>
      </div>
      {badge && (
        <span className="absolute right-4 top-4 text-[10px] uppercase tracking-wider font-bold text-white/90 bg-white/10 border border-white/15 rounded-full px-2.5 py-1">
          {badge}
        </span>
      )}
    </div>
  );
};

const cardMotion = (index: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -40px 0px' },
  transition: { duration: 0.5, delay: (index % 4) * 0.07, ease: EASE },
});

const CARD =
  'group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer flex flex-col text-left transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 hover:border-emerald-600/40';

interface ArticleCardProps {
  article: Article;
  index: number;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, onSelect }) => (
  <motion.article {...cardMotion(index)} onClick={() => onSelect(article)} className={CARD}>
    <Cover icon={topicIcon(article.title)} label={article.pillarLabel} variant={index} />
    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#166534] transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{article.summary}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {article.readTime}
        </span>
        <span className="font-semibold text-[#166534] flex items-center gap-1">
          Read
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  </motion.article>
);

interface ReviewCardProps {
  review: ProductReview;
  index: number;
  onSelect: (review: ProductReview) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, index, onSelect }) => (
  <motion.div {...cardMotion(index)} onClick={() => onSelect(review)} className={CARD}>
    <Cover
      icon={REVIEW_ICONS[review.category]}
      label={review.category}
      variant={index + 1}
      badge={review.overallScore != null ? `${review.overallScore} / 10` : 'Desk review'}
    />
    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#166534] transition-colors leading-snug">
          {review.name}
        </h3>
        <p className="text-xs font-semibold text-slate-500">{review.priceRange}</p>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{review.verdict}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#166534] bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
          Evidence {review.evidenceGrade}
        </span>
        <div className="flex items-center gap-3">
          {review.affiliateUrl && (
            <a
              href={review.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1.5 text-[11px] font-semibold text-white bg-[#0F172A] hover:bg-[#166534] rounded-lg transition-colors inline-flex items-center gap-1"
            >
              <span>{review.affiliateStore ?? 'Amazon'}</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
          )}
          <span className="text-xs font-semibold text-[#166534] flex items-center gap-1">
            Review
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);
