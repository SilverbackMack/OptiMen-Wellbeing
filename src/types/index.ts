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
  author: {
    name: string;
    credentials: string;
    role: string;
  };
  keyTakeaways: string[];
  protocolSteps: string[];
  references: string[];
  featured?: boolean;
  sections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export interface ProductReview {
  id: string;
  name: string;
  brand: string;
  category: 'Wearables' | 'Sleep Tech' | 'Supplements' | 'Recovery' | 'Diagnostics';
  overallScore: number; // out of 10
  priceRange: string;
  verdict: string;
  whoItIsFor: string;
  pros: string[];
  cons: string[];
  evidenceGrade: 'A+' | 'A' | 'A-' | 'B+';
  testedDuration: string;
  specs: { label: string; value: string }[];
  affiliateUrl?: string;
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
