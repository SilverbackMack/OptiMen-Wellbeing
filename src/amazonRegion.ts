import { useEffect, useState } from 'react';

// Sends US visitors to amazon.com instead of amazon.co.uk.
//
// Every Amazon link in src/data/content.ts is written once, for Amazon UK, with
// the UK Associates tag. For visitors in the US we rewrite those links at render
// time to amazon.com with the US Associates tag, keeping the same path and
// search terms. Everyone else (UK and the rest of the world) keeps the UK links.
//
// Country detection, privacy first:
// 1. The browser's time zone decides whether a visitor could be in the US. Only
//    visitors on an American time zone go any further, so UK visitors never
//    trigger a network call.
// 2. For those visitors we ask api.country.is (free, no key, no cookies) for
//    the country of their IP address. It only returns a country code.
// 3. If that call fails or times out, we fall back to the time zone alone.
// Anything unexpected leaves the UK links in place. The result is remembered
// for the browser session, so the lookup happens at most once per visit.
//
// To test, add ?amazon=us or ?amazon=uk to any page URL.

export const AMAZON_UK_TAG = 'insightdigita-21';
export const AMAZON_US_TAG = 'insightdigi0b-20';

export type AmazonRegion = 'uk' | 'us';

const STORAGE_KEY = 'ow-amazon-region';
const GEO_ENDPOINT = 'https://api.country.is/';
const GEO_TIMEOUT_MS = 2500;

// IANA time zones used in the 50 states and DC.
const US_TIME_ZONES = new Set([
  'America/New_York', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello',
  'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac',
  'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay',
  'America/Indiana/Tell_City', 'America/Indiana/Knox', 'America/Chicago', 'America/Menominee',
  'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah',
  'America/Denver', 'America/Boise', 'America/Phoenix', 'America/Los_Angeles', 'America/Anchorage',
  'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat', 'America/Nome',
  'America/Adak', 'Pacific/Honolulu',
  // Old aliases some browsers still report.
  'US/Eastern', 'US/Central', 'US/Mountain', 'US/Pacific', 'US/Alaska', 'US/Hawaii', 'US/Arizona',
  'America/Indianapolis', 'America/Louisville', 'America/Fort_Wayne', 'America/Shiprock',
  'America/Atka', 'Navajo', 'EST5EDT', 'CST6CDT', 'MST7MDT', 'PST8PDT',
]);

function timeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  } catch {
    return '';
  }
}

function readOverride(): AmazonRegion | null {
  try {
    const v = new URLSearchParams(window.location.search).get('amazon')?.toLowerCase();
    return v === 'us' || v === 'uk' ? v : null;
  } catch {
    return null;
  }
}

function readCache(): AmazonRegion | null {
  try {
    const v = window.sessionStorage.getItem(STORAGE_KEY);
    return v === 'us' || v === 'uk' ? v : null;
  } catch {
    return null;
  }
}

function writeCache(region: AmazonRegion): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, region);
  } catch {
    // Private mode or storage blocked: we just look it up again next page.
  }
}

async function lookupCountry(): Promise<string | null> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = setTimeout(() => controller?.abort(), GEO_TIMEOUT_MS);
  try {
    const res = await fetch(GEO_ENDPOINT, {
      signal: controller?.signal,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.country === 'string' ? data.country.toUpperCase() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function detect(): Promise<AmazonRegion> {
  const override = readOverride();
  if (override) return override;

  const cached = readCache();
  if (cached) return cached;

  const tz = timeZone();
  let region: AmazonRegion = 'uk';
  // Only visitors on an American (or Hawaiian) time zone could be in the US.
  if (tz.startsWith('America/') || tz.startsWith('US/') || US_TIME_ZONES.has(tz)) {
    const country = await lookupCountry();
    region = country ? (country === 'US' ? 'us' : 'uk') : US_TIME_ZONES.has(tz) ? 'us' : 'uk';
  }
  writeCache(region);
  return region;
}

let current: AmazonRegion = 'uk';
let pending: Promise<AmazonRegion> | null = null;

/** Detects the visitor's region once per page load. Never rejects. */
export function detectAmazonRegion(): Promise<AmazonRegion> {
  if (!pending) {
    pending = (typeof window === 'undefined' ? Promise.resolve<AmazonRegion>('uk') : detect())
      .catch((): AmazonRegion => 'uk')
      .then((r) => (current = r));
  }
  return pending;
}

/** The visitor's Amazon region. Starts as 'uk' and updates once detection finishes. */
export function useAmazonRegion(): AmazonRegion {
  const [region, setRegion] = useState<AmazonRegion>(current);
  useEffect(() => {
    let live = true;
    detectAmazonRegion().then((r) => {
      if (live) setRegion(r);
    });
    return () => {
      live = false;
    };
  }, []);
  return region;
}

function isAmazonUk(url: URL): boolean {
  return url.hostname === 'amazon.co.uk' || url.hostname.endsWith('.amazon.co.uk');
}

/** Rewrites an Amazon UK link for the given region. Other links pass through untouched. */
export function localiseAmazonUrl(href: string, region: AmazonRegion): string {
  if (region !== 'us') return href;
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (!isAmazonUk(url)) return href;
  url.hostname = 'www.amazon.com';
  url.searchParams.set('tag', AMAZON_US_TAG);
  return url.toString();
}

/** "See it on Amazon UK" reads "See it on Amazon" for US visitors. */
export function localiseAmazonLabel(label: string, region: AmazonRegion): string {
  return region === 'us' ? label.replace(/Amazon UK/g, 'Amazon') : label;
}

/** Returns a function that localises an affiliate link and its button text. */
export function useAffiliateLink() {
  const region = useAmazonRegion();
  return (url: string, label = '') => {
    const href = localiseAmazonUrl(url, region);
    // Only change the wording when the link itself moved to amazon.com.
    return { href, label: href !== url ? localiseAmazonLabel(label, region) : label };
  };
}
