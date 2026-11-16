import { HERO_IMAGE, HEALTH_IMAGE, FITNESS_IMAGE, SLEEP_IMAGE, NUTRITION_IMAGE } from './content';
import mindset from '../assets/images/photos/mindset.jpg';
import gp from '../assets/images/photos/gp.jpg';
import bloodpressure from '../assets/images/photos/bloodpressure.jpg';
import bloodtest from '../assets/images/photos/bloodtest.jpg';
import strength from '../assets/images/photos/strength.jpg';
import running from '../assets/images/photos/running.jpg';
import wearable from '../assets/images/photos/wearable.jpg';
import burnout from '../assets/images/photos/burnout.jpg';
import salmon from '../assets/images/photos/salmon.jpg';
import capsules from '../assets/images/photos/capsules.jpg';
import cold from '../assets/images/photos/cold.jpg';
import sauna from '../assets/images/photos/sauna.jpg';
import family from '../assets/images/photos/family.jpg';
import couple from '../assets/images/photos/couple.jpg';

// Photos for guides and reviews.
// The photos in assets/images/photos come from Unsplash (unsplash.com) and are
// free to use under the Unsplash License (no credit required). Source pages:
//   mindset        unsplash.com/photos/QzGPZuj5fYM
//   gp             unsplash.com/photos/7-l5EL7YHI4
//   bloodpressure  unsplash.com/photos/bzj1U0udLnM
//   bloodtest      unsplash.com/photos/KWb_41kG0GE
//   strength       unsplash.com/photos/RcKnkaNmomg
//   running        unsplash.com/photos/mQVWb7kUoOE
//   wearable       unsplash.com/photos/BR8MqYyOPiU
//   burnout        unsplash.com/photos/xQ93cUceb74
//   salmon         unsplash.com/photos/mmnKI8kMxpc
//   capsules       unsplash.com/photos/Q4eWnth5S74
//   cold           unsplash.com/photos/0LqPBkgFTWo
//   sauna          unsplash.com/photos/EXR5hlu6Sag
//   family         unsplash.com/photos/VQqFflok0gE
//   couple         unsplash.com/photos/L33y1h7Cwvg

export const MINDSET_IMAGE = mindset;

// One photo per guide or review. To give a new guide a photo, add its id here;
// anything not listed falls back to its section's photo.
const BY_ID: Record<string, string> = {
  // Guides
  'nhs-health-check-at-40': gp,
  'psa-test-uk': bloodtest,
  'whoop-vs-oura-men-over-40': wearable,
  'health-checks-for-men': gp,
  'sauna-benefits-for-men': sauna,
  'best-supplements-for-men-over-40': capsules,
  'why-do-i-wake-up-at-3am': SLEEP_IMAGE,
  'is-creatine-safe-men-over-40': strength,
  'signs-of-burnout-in-men': burnout,
  'erectile-dysfunction-causes': couple,
  'enlarged-prostate-symptoms-treatment': HEALTH_IMAGE,
  'how-to-check-your-testicles': HERO_IMAGE,
  'low-testosterone-symptoms-after-40': strength,
  'prostate-health-what-every-man-should-know': bloodtest,
  'complete-guide-to-mens-wellbeing': family,
  '10-daily-habits-improve-mens-health': running,
  'apob-vs-ldl-heart-health': bloodpressure,
  'zone-2-aerobic-engine-guide': running,
  'deep-sleep-testosterone-link': SLEEP_IMAGE,
  'protein-distribution-muscle-longevity': salmon,
  'allostatic-load-cortisol-management': mindset,
  'vo2-max-longevity-correlation': FITNESS_IMAGE,

  // Reviews
  'home-sauna-options-review': sauna,
  'prostavive-review': capsules,
  'whoop-5-review': wearable,
  'oura-ring-5-review': SLEEP_IMAGE,
  'creatine-monohydrate-creapure': strength,
  'cold-plunge-tub-review': cold,
  'omega-3-high-epa-dha': salmon,
};

const BY_SECTION: Record<string, string> = {
  health: HEALTH_IMAGE,
  fitness: FITNESS_IMAGE,
  nutrition: NUTRITION_IMAGE,
  sleep: SLEEP_IMAGE,
  mindset,
  Wearables: wearable,
  'Sleep Tech': SLEEP_IMAGE,
  Supplements: capsules,
  Recovery: cold,
  Diagnostics: bloodtest,
};

/** The photo for a guide or review, by its id, falling back to its section or category. */
export function photoFor(id: string, section: string): string {
  return BY_ID[id] ?? BY_SECTION[section] ?? HERO_IMAGE;
}
