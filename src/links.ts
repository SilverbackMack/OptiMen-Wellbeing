import { ARTICLES, PRODUCT_REVIEWS } from './data/content';
import { Article, ProductReview } from './types';
import { articlePath, reviewPath } from './seo';

// Links between pages. Used by the app and by scripts/prerender.mjs, so
// visitors and search engines see the same "read next" and in-text links.

// Hand-picked "read next" choices (article or review ids). Anything not listed
// here falls back to other articles in the same section.
const RELATED: Record<string, string[]> = {
  'health-checks-for-men': ['nhs-health-check-at-40', 'psa-test-uk', 'how-to-check-your-testicles', 'prostate-health-what-every-man-should-know'],
  'nhs-health-check-at-40': ['health-checks-for-men', 'apob-vs-ldl-heart-health', 'psa-test-uk'],
  'psa-test-uk': ['prostate-health-what-every-man-should-know', 'enlarged-prostate-symptoms-treatment', 'health-checks-for-men'],
  'whoop-vs-oura-men-over-40': ['whoop-5-review', 'oura-ring-5-review', 'why-do-i-wake-up-at-3am', 'zone-2-aerobic-engine-guide'],
  'sauna-benefits-for-men': ['home-sauna-options-review', 'cold-plunge-tub-review', 'zone-2-aerobic-engine-guide'],
  'best-supplements-for-men-over-40': ['creatine-monohydrate-creapure', 'omega-3-high-epa-dha', 'is-creatine-safe-men-over-40', 'black-friday-mens-health-deals-2026'],
  'why-do-i-wake-up-at-3am': ['deep-sleep-testosterone-link', 'allostatic-load-cortisol-management', 'oura-ring-5-review'],
  'is-creatine-safe-men-over-40': ['creatine-monohydrate-creapure', 'protein-distribution-muscle-longevity', 'best-supplements-for-men-over-40', 'black-friday-mens-health-deals-2026'],
  'black-friday-mens-health-deals-2026': ['best-supplements-for-men-over-40', 'creatine-monohydrate-creapure', 'whoop-vs-oura-men-over-40', 'nhs-health-check-at-40'],
  'signs-of-burnout-in-men': ['allostatic-load-cortisol-management', 'why-do-i-wake-up-at-3am', 'health-checks-for-men'],
  'erectile-dysfunction-causes': ['low-testosterone-symptoms-after-40', 'health-checks-for-men', 'apob-vs-ldl-heart-health'],
  'enlarged-prostate-symptoms-treatment': ['prostate-health-what-every-man-should-know', 'psa-test-uk', 'prostavive-review'],
  'how-to-check-your-testicles': ['health-checks-for-men', 'prostate-health-what-every-man-should-know', 'psa-test-uk'],
  'low-testosterone-symptoms-after-40': ['deep-sleep-testosterone-link', 'erectile-dysfunction-causes', 'protein-distribution-muscle-longevity'],
  'prostate-health-what-every-man-should-know': ['psa-test-uk', 'enlarged-prostate-symptoms-treatment', 'prostavive-review'],
  'complete-guide-to-mens-wellbeing': ['10-daily-habits-improve-mens-health', 'health-checks-for-men', 'zone-2-aerobic-engine-guide'],
  '10-daily-habits-improve-mens-health': ['complete-guide-to-mens-wellbeing', 'protein-distribution-muscle-longevity', 'why-do-i-wake-up-at-3am'],
  'apob-vs-ldl-heart-health': ['nhs-health-check-at-40', 'health-checks-for-men', 'omega-3-high-epa-dha'],
  'zone-2-aerobic-engine-guide': ['vo2-max-longevity-correlation', 'whoop-vs-oura-men-over-40', 'whoop-5-review'],
  'deep-sleep-testosterone-link': ['low-testosterone-symptoms-after-40', 'why-do-i-wake-up-at-3am', 'oura-ring-5-review'],
  'protein-distribution-muscle-longevity': ['is-creatine-safe-men-over-40', 'creatine-monohydrate-creapure', 'best-supplements-for-men-over-40'],
  'allostatic-load-cortisol-management': ['signs-of-burnout-in-men', 'why-do-i-wake-up-at-3am', 'sauna-benefits-for-men'],
  'vo2-max-longevity-correlation': ['zone-2-aerobic-engine-guide', 'whoop-5-review', 'whoop-vs-oura-men-over-40'],

  'home-sauna-options-review': ['sauna-benefits-for-men', 'cold-plunge-tub-review'],
  'prostavive-review': ['prostate-health-what-every-man-should-know', 'enlarged-prostate-symptoms-treatment', 'psa-test-uk'],
  'whoop-5-review': ['whoop-vs-oura-men-over-40', 'oura-ring-5-review', 'zone-2-aerobic-engine-guide'],
  'oura-ring-5-review': ['whoop-vs-oura-men-over-40', 'whoop-5-review', 'why-do-i-wake-up-at-3am'],
  'creatine-monohydrate-creapure': ['is-creatine-safe-men-over-40', 'protein-distribution-muscle-longevity', 'best-supplements-for-men-over-40'],
  'cold-plunge-tub-review': ['sauna-benefits-for-men', 'home-sauna-options-review', 'allostatic-load-cortisol-management'],
  'omega-3-high-epa-dha': ['apob-vs-ldl-heart-health', 'best-supplements-for-men-over-40', 'creatine-monohydrate-creapure'],
  'best-beard-trimmers-hair-clippers-uk': ['black-friday-mens-health-deals-2026', 'health-checks-for-men', 'how-to-check-your-testicles', '10-daily-habits-improve-mens-health'],
};

export interface RelatedContent {
  articles: Article[];
  reviews: ProductReview[];
}

/** Up to `max` published pages to suggest at the end of an article or review. */
export function relatedContent(id: string, pillar?: string, max = 4): RelatedContent {
  const articles: Article[] = [];
  const reviews: ProductReview[] = [];
  const count = () => articles.length + reviews.length;

  for (const rid of RELATED[id] ?? []) {
    if (count() >= max) break;
    const a = ARTICLES.find((x) => x.id === rid);
    if (a) articles.push(a);
    const r = PRODUCT_REVIEWS.find((x) => x.id === rid);
    if (r) reviews.push(r);
  }
  // Top up from the same section so every page has somewhere to go next
  // (also covers hand-picked articles that are scheduled but not yet live).
  for (const a of ARTICLES) {
    if (count() >= (pillar ? Math.min(max, 3) : 2)) break;
    if (a.id === id || articles.includes(a)) continue;
    if (!pillar || a.pillar === pillar) articles.push(a);
  }
  return { articles, reviews };
}

export type TextPiece = string | { text: string; href: string; articleId?: string; reviewId?: string };

interface Target {
  phrase: string; // lower case
  href: string;
  articleId?: string;
  reviewId?: string;
}

const MIN_PHRASE = 15;

// Other ways our articles refer to each other, beyond the exact title
const ALIASES: Record<string, string[]> = {
  'zone-2-aerobic-engine-guide': ['guide to Zone 2 training', 'Zone 2 training guide'],
  'apob-vs-ldl-heart-health': ['guide to ApoB'],
  'whoop-vs-oura-men-over-40': ['comparison of WHOOP and Oura'],
  'prostate-health-what-every-man-should-know': ['Prostate Health guide'],
  'health-checks-for-men': ['guide to the health checks for men'],
  'allostatic-load-cortisol-management': ['Our stress guide'],
  'erectile-dysfunction-causes': ['guide to erectile dysfunction'],
};

function buildTargets(): Target[] {
  const targets: Target[] = [];
  const add = (phrase: string, t: Omit<Target, 'phrase'>) => {
    const p = phrase.trim().toLowerCase();
    if (p.length >= MIN_PHRASE && !targets.some((x) => x.phrase === p)) targets.push({ phrase: p, ...t });
  };
  for (const a of ARTICLES) {
    const t = { href: articlePath(a.id), articleId: a.id };
    add(a.title, t);
    add(a.title.split(':')[0], t); // "Signs of Burnout in Men: How to..." -> "Signs of Burnout in Men"
    if (a.title.includes('?')) add(a.title.split('?')[0] + '?', t); // "Why Do I Wake Up at 3am?"
    for (const alias of ALIASES[a.id] ?? []) targets.push({ phrase: alias.toLowerCase(), ...t });
  }
  for (const r of PRODUCT_REVIEWS) {
    add(r.name, { href: reviewPath(r.id), reviewId: r.id });
  }
  return targets.sort((a, b) => b.phrase.length - a.phrase.length);
}

let cachedTargets: Target[] | null = null;
const isWordChar = (c: string | undefined) => !!c && /[a-z0-9]/i.test(c);

/**
 * Turns mentions of other articles and reviews into links, e.g. "Our guide
 * 'How to Check Your Testicles' walks you through it". Each page is linked at
 * most once per linker, so make one linker per article or review page.
 */
export function createLinker(selfId: string) {
  const targets = (cachedTargets ??= buildTargets()).filter((t) => (t.articleId ?? t.reviewId) !== selfId);
  const used = new Set<string>();

  return (text: string): TextPiece[] => {
    const lower = text.toLowerCase();
    const found: { start: number; end: number; target: Target }[] = [];

    for (const target of targets) {
      if (used.has(target.href)) continue;
      let from = 0;
      while (from < lower.length) {
        const start = lower.indexOf(target.phrase, from);
        if (start === -1) break;
        const end = start + target.phrase.length;
        const wholeWords = !isWordChar(lower[start - 1]) && !isWordChar(lower[end]);
        const overlaps = found.some((f) => start < f.end && end > f.start);
        if (wholeWords && !overlaps) {
          found.push({ start, end, target });
          used.add(target.href);
          break;
        }
        from = start + 1;
      }
    }

    if (!found.length) return [text];
    found.sort((a, b) => a.start - b.start);
    const pieces: TextPiece[] = [];
    let pos = 0;
    for (const f of found) {
      if (f.start > pos) pieces.push(text.slice(pos, f.start));
      pieces.push({ text: text.slice(f.start, f.end), href: f.target.href, articleId: f.target.articleId, reviewId: f.target.reviewId });
      pos = f.end;
    }
    if (pos < text.length) pieces.push(text.slice(pos));
    return pieces;
  };
}
