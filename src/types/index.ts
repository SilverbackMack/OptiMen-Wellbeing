export type PageType = 
  | 'home' 
  | 'about' 
  | 'health' 
  | 'fitness' 
  | 'nutrition' 
  | 'sleep' 
  | 'mindset' 
  | 'reviews' 
  | 'contact';

export type PillarId = 'health' | 'fitness' | 'nutrition' | 'sleep' | 'mindset';

export interface PillarInfo {
  id: PillarId;
  name: string;
  tagline: string;
  description: string;
  keyMetrics: string[];
  protocolHighlights: string[];
  image: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  summary: string;
  pillar: PillarId;
  pillarLabel: string;
  readTime: string;
  publishedDate: string;
  publishOn?: string; // YYYY-MM-DD; hidden until this date
  author: {
    name: string;
    credentials: string;
    role: string;
  };
  keyTakeaways: string[];
  protocolSteps: string[];
  references: string[];
  featured?: boolean;
  affiliateCta?: {
    url: string;
    label: string;
    note?: string;
  };
  sections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    cta?: { url: string; label: string }; // optional affiliate button under this section
  }[];
}

export interface ProductReview {
  id: string;
  name: string;
  brand: string;
  category: 'Wearables' | 'Sleep Tech' | 'Supplements' | 'Recovery' | 'Diagnostics' | 'Grooming';
  headline?: string; // page heading, if it shouldn't be "<name> Review"
  metaTitle?: string; // search result title, defaults to "<name> Review | OptiMen Wellbeing"
  metaDescription?: string; // search result description, defaults to the verdict
  updatedDate?: string; // YYYY-MM-DD, shown as "Updated" and used in structured data
  overallScore?: number; // out of 10; omitted for multi-product comparisons
  priceRange: string;
  verdict: string;
  whoItIsFor: string;
  pros: string[];
  cons: string[];
  evidenceGrade?: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C'; // strength of the evidence that this kind of product helps; omit for non-health products
  comparison?: { columns: string[]; rows: string[][] }; // side-by-side table, first column is the product
  faqs?: { question: string; answer: string }[]; // shown as an FAQ and marked up for Google
  testedDuration: string; // shown as-is under the name, e.g. "Desk review, not hands-on tested"
  specs: { label: string; value: string }[];
  affiliateUrl?: string;
  affiliateStore?: string; // button label, defaults to Amazon
  affiliateNote?: string;
  sections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    cta?: { url: string; label: string }; // optional affiliate button under this section
    // Optional product photo under the heading. Use only images Amazon provides for
    // affiliate use (SiteStripe "Image" links or PA-API), served from Amazon, not copied.
    image?: { src: string; alt: string; href?: string };
  }[];
}

export interface AdvisoryBoardMember {
  name: string;
  credentials: string;
  specialty: string;
  institution: string;
  bio: string;
}

export interface AssessmentQuestion {
  id: number;
  pillar: PillarId;
  question: string;
  options: {
    label: string;
    score: number; // 1-4
    insight: string;
  }[];
}
