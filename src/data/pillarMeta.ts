import {
  Activity, HeartPulse, Droplets, Ruler, ScanSearch, Flame, Timer, Dumbbell, Gauge, Hand,
  Apple, Beef, Wheat, Wine, Moon, BedDouble, Clock, Sun, Brain, Smile, Target, Coffee,
  type LucideIcon,
} from 'lucide-react';
import { PillarId } from '../types';
import { PILLARS } from './content';
import { MINDSET_IMAGE } from './photos';

// Short, visual summaries of each section, used by the page designs.
// The longer descriptions stay in content.ts for search engines.
export interface PillarMeta {
  short: string; // one-word label
  line: string; // one-line promise
  icon: LucideIcon;
  image: string;
  track: { label: string; icon: LucideIcon }[]; // what to keep an eye on
  steps: string[]; // where to start
}

export const PILLAR_ORDER: PillarId[] = ['health', 'fitness', 'nutrition', 'sleep', 'mindset'];

export const PILLAR_META: Record<PillarId, PillarMeta> = {
  health: {
    short: 'Health',
    line: 'Know your numbers. Catch things early.',
    icon: Activity,
    image: PILLARS.health.image,
    track: [
      { label: 'Blood pressure', icon: HeartPulse },
      { label: 'Cholesterol', icon: Droplets },
      { label: 'Waist size', icon: Ruler },
      { label: 'Prostate (PSA)', icon: ScanSearch },
    ],
    steps: ['Book your free NHS Health Check', 'Write your numbers down', 'Check your testicles monthly', 'See your GP early'],
  },
  fitness: {
    short: 'Fitness',
    line: 'Build a body that lasts.',
    icon: Flame,
    image: PILLARS.fitness.image,
    track: [
      { label: 'Weekly cardio minutes', icon: Timer },
      { label: 'Strength sessions', icon: Dumbbell },
      { label: 'VO2 max', icon: Gauge },
      { label: 'Grip strength', icon: Hand },
    ],
    steps: ['Move most days', '150 minutes of cardio a week', 'Lift twice a week', 'Rest and recover'],
  },
  nutrition: {
    short: 'Nutrition',
    line: 'Eat for energy, muscle and heart.',
    icon: Apple,
    image: PILLARS.nutrition.image,
    track: [
      { label: 'Protein', icon: Beef },
      { label: 'Fibre', icon: Wheat },
      { label: 'Waist size', icon: Ruler },
      { label: 'Alcohol units', icon: Wine },
    ],
    steps: ['Protein with every meal', 'Five a day, minimum', 'Oily fish once a week', 'Under 14 units a week'],
  },
  sleep: {
    short: 'Sleep',
    line: 'Recovery happens overnight.',
    icon: Moon,
    image: PILLARS.sleep.image,
    track: [
      { label: 'Hours slept', icon: BedDouble },
      { label: 'Regular bedtime', icon: Clock },
      { label: 'Resting heart rate', icon: HeartPulse },
      { label: 'Morning energy', icon: Sun },
    ],
    steps: ['Same bedtime every night', 'Get morning daylight', 'No caffeine after lunch', 'Keep the bedroom cool and dark'],
  },
  mindset: {
    short: 'Mindset',
    line: 'Stay steady under pressure.',
    icon: Brain,
    image: MINDSET_IMAGE,
    track: [
      { label: 'Stress', icon: Gauge },
      { label: 'Mood', icon: Smile },
      { label: 'Focus', icon: Target },
      { label: 'Downtime', icon: Coffee },
    ],
    steps: ['Spot the warning signs', 'Slow your breathing daily', 'Protect your downtime', 'Talk to someone'],
  },
};
