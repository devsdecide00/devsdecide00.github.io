import assert from 'node:assert/strict';
import test from 'node:test';
import { isGeoBlocked } from './geo-block.ts';

const chrome = 'Mozilla/5.0 (Macintosh) Chrome/130.0';

test('blocks listed US states', () => {
  for (const region of ['CA', 'PA', 'MA', 'FL', 'WA', 'MD', 'ca']) {
    assert.equal(isGeoBlocked('US', region, chrome), true, region);
  }
});

test('allows other states, other countries, and missing geo', () => {
  assert.equal(isGeoBlocked('US', 'AL', chrome), false);
  assert.equal(isGeoBlocked('CA', 'ON', chrome), false); // Canada, Ontario
  assert.equal(isGeoBlocked(null, null, chrome), false);
  assert.equal(isGeoBlocked('US', null, chrome), false);
});

test('lets search and preview crawlers through', () => {
  const googlebot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
  assert.equal(isGeoBlocked('US', 'CA', googlebot), false);
  assert.equal(isGeoBlocked('US', 'CA', 'LinkedInBot/1.0'), false);
});
