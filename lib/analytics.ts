/**
 * Typed GA4 helpers. Calls no-op when `gtag` is missing or throws, so a
 * blocked or not-yet-loaded tag never breaks the page.
 *
 * `generate_lead` fires once, from a successful contact submit. Navigate only
 * inside the completion callback so the client transition to /thank-you does
 * not drop the hit. Do not also fire it on /thank-you.
 */

const EVENT_TIMEOUT_MS = 2000;
const PARAM_MAX = 100;

export const CTA_LOCATIONS = [
  'nav',
  'home_hero',
  'home_pricing',
  'home_closing',
  'case_study_built',
  'case_study_closing',
  'pitch',
  'try_it_yourself',
] as const;

export type CtaLocation = (typeof CTA_LOCATIONS)[number];

export type LeadParams = {
  industry: string;
  team_size: string;
};

type Gtag = (command: 'event', eventName: string, params?: Record<string, unknown>) => void;

type AnalyticsWindow = Window & {
  gtag?: Gtag;
  google_tag_manager?: unknown;
};

function analyticsWindow(): AnalyticsWindow | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const host = globalThis as typeof globalThis & { window?: AnalyticsWindow };
  return host.window ?? undefined;
}

function clip(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, PARAM_MAX);
}

/** Drop the value if it contains an email address. Never send names, emails, or messages. */
function nonPii(value: string): string | undefined {
  const cleaned = clip(value);
  if (!cleaned) return undefined;
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(cleaned)) return undefined;
  return cleaned;
}

function getGtag(win: AnalyticsWindow): Gtag | undefined {
  return typeof win.gtag === 'function' ? win.gtag : undefined;
}

function trackEvent(eventName: 'cta_click', params: Record<string, string | undefined>): void {
  const win = analyticsWindow();
  const gtag = win ? getGtag(win) : undefined;
  if (!gtag) return;

  const payload: Record<string, string> = { transport_type: 'beacon' };
  for (const [key, value] of Object.entries(params)) {
    if (value) payload[key] = value;
  }

  try {
    gtag('event', eventName, payload);
  } catch {
    // A blocked or broken gtag must not break the click.
  }
}

export function trackCtaClick(ctaText: string, ctaLocation: CtaLocation): void {
  const win = analyticsWindow();
  const pagePath = win?.location?.pathname;
  trackEvent('cta_click', {
    cta_text: nonPii(ctaText),
    cta_location: ctaLocation,
    page_path: pagePath ? clip(pagePath) : undefined,
  });
}

function once(fn: () => void): () => void {
  let called = false;
  return () => {
    if (called) return;
    called = true;
    fn();
  };
}

export function trackGenerateLead(params: LeadParams, onComplete: () => void): void {
  const finish = once(onComplete);
  const win = analyticsWindow();
  const gtag = win ? getGtag(win) : undefined;

  if (!win || !gtag) {
    finish();
    return;
  }

  const eventParams: Record<string, unknown> = { transport_type: 'beacon' };
  const industry = nonPii(params.industry);
  const teamSize = nonPii(params.team_size);
  if (industry) eventParams.industry = industry;
  if (teamSize) eventParams.team_size = teamSize;

  // The inline snippet defines gtag before gtag.js runs. Until the library is
  // active it only queues, and event_callback never fires. Queue and move on.
  if (!win.google_tag_manager) {
    try {
      gtag('event', 'generate_lead', eventParams);
    } catch {
      // ignore
    }
    finish();
    return;
  }

  let safety = 0;
  const done = () => {
    if (safety) win.clearTimeout(safety);
    finish();
  };

  try {
    safety = win.setTimeout(done, EVENT_TIMEOUT_MS + 500);
    gtag('event', 'generate_lead', {
      ...eventParams,
      event_timeout: EVENT_TIMEOUT_MS,
      event_callback: done,
    });
  } catch {
    done();
  }
}
