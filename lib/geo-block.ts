/**
 * States where website-tracking wiretap suits (CIPA and similar all-party-consent
 * laws) are being filed. Visitors from these states get a 451 instead of the site.
 */
export const BLOCKED_US_REGIONS = new Set(['CA', 'PA', 'MA', 'FL', 'WA', 'MD']);

// Googlebot and most crawlers come from California IPs. Blocking them would drop
// the site from search and break link previews.
const CRAWLER_UA = /googlebot|google-inspectiontool|bingbot|duckduckbot|applebot|slackbot|linkedinbot|facebookexternalhit|twitterbot/i;

export function isGeoBlocked(country: string | null, region: string | null, userAgent: string | null): boolean {
  if (country !== 'US' || !region) return false;
  if (!BLOCKED_US_REGIONS.has(region.toUpperCase())) return false;
  return !CRAWLER_UA.test(userAgent ?? '');
}

export const GEO_BLOCKED_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Not available in your state | Developers Decide</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#fffaf0;color:#1a1a1a;padding:16px}main{max-width:520px}h1{font-size:32px;margin:0 0 12px}p{font-size:18px;line-height:1.5;margin:0}</style>
</head><body><main><h1>Not available in your state</h1>
<p>Developers Decide serves businesses in Alabama, and this site isn&rsquo;t available where you are.</p></main></body></html>`;
