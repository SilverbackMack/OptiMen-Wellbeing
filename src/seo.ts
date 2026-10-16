import { PageType } from './types';

// Shared by the app (page titles while browsing) and scripts/prerender.mjs
// (static HTML that search engines read).

export const SITE_URL = 'https://optimenwellbeing.com';
export const SITE_NAME = 'OptiMen Wellbeing';

export const PAGE_PATHS: Record<PageType, string> = {
  home: '/',
  about: '/about',
  health: '/health',
  fitness: '/fitness',
  nutrition: '/nutrition',
  sleep: '/sleep',
  mindset: '/mindset',
  reviews: '/reviews',
  contact: '/contact',
};

export const PAGE_META: Record<PageType, { title: string; description: string }> = {
  home: {
    title: 'OptiMen Wellbeing — Helping Men Live Stronger, Longer, Better',
    description:
      'Evidence-based guidance, protocols and honest product reviews across health, fitness, nutrition, sleep and mindset for men aged 25–55.',
  },
  about: {
    title: 'About OptiMen Wellbeing',
    description:
      'Who we are, how we research and review, and why OptiMen Wellbeing exists to help men live stronger, longer, better lives.',
  },
  health: {
    title: "Men's Health & Longevity | OptiMen Wellbeing",
    description:
      "Evidence-based men's health guides: prostate health, heart health, hormones, blood tests and preventative care for men 25–55.",
  },
  fitness: {
    title: 'Functional Fitness for Men | OptiMen Wellbeing',
    description:
      'Strength, Zone 2 cardio and VO2 max guides for men who want lasting fitness and a longer healthspan.',
  },
  nutrition: {
    title: 'Nutrition for Men | OptiMen Wellbeing',
    description:
      'Practical nutrition for men: protein, blood sugar, healthy eating habits and evidence-based supplement advice.',
  },
  sleep: {
    title: 'Sleep & Recovery for Men | OptiMen Wellbeing',
    description:
      'How to sleep deeper and recover better: circadian rhythm, deep sleep and testosterone, and recovery habits for men.',
  },
  mindset: {
    title: 'Mindset & Resilience for Men | OptiMen Wellbeing',
    description:
      'Stress, focus and emotional resilience for busy men: practical, evidence-based tools for a calmer, clearer mind.',
  },
  reviews: {
    title: "Honest Product Reviews for Men's Health | OptiMen Wellbeing",
    description:
      'Independent, evidence-graded reviews of supplements, wearables, sleep tech and recovery gear for men.',
  },
  contact: {
    title: 'Contact OptiMen Wellbeing',
    description:
      'Get in touch with OptiMen Wellbeing: reader questions to hello@optimenwellbeing.com, brand partnerships to partners@optimenwellbeing.com.',
  },
};

export const articlePath = (id: string) => `/articles/${id}`;
export const reviewPath = (id: string) => `/reviews/${id}`;

export type Route =
  | { page: PageType; articleId?: undefined; reviewId?: undefined }
  | { page: PageType; articleId: string; reviewId?: undefined }
  | { page: PageType; reviewId: string; articleId?: undefined };

export function parsePath(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const article = clean.match(/^\/articles\/([^/]+)$/);
  if (article) return { page: 'home', articleId: decodeURIComponent(article[1]) };
  const review = clean.match(/^\/reviews\/([^/]+)$/);
  if (review) return { page: 'reviews', reviewId: decodeURIComponent(review[1]) };
  const page = (Object.keys(PAGE_PATHS) as PageType[]).find((p) => PAGE_PATHS[p] === clean);
  return { page: page ?? 'home' };
}
