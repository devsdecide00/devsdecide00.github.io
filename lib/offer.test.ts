import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import {
  OFFER_NAME,
  PROMO,
  contactPriceSentence,
  currentPrice,
  formatPrice,
  foundingFaqAnswer,
  heroFounding,
  pitchPriceDetail,
  priceCardDetail,
  priceLabel,
  promoActive,
  showFoundingFaq,
} from './offer.ts';

const CHICAGO = 'America/Chicago';

function chicagoParts(ms: number) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CHICAGO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(ms));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value;
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
  };
}

const nov30Late = PROMO.ends.getTime() - 1;
const dec1Midnight = PROMO.ends.getTime();
const nov30Noon = Date.parse('2026-11-30T18:00:00.000Z');
const dec1Noon = Date.parse('2026-12-01T18:00:00.000Z');

const scarcity = /founding|november|first 10|deadline|\$1,500|\b1500\b|spots left|limited/i;

test('boundary instants fall on Nov 30 and Dec 1 in America/Chicago', () => {
  const before = chicagoParts(nov30Late);
  assert.equal(before.year, '2026');
  assert.equal(before.month, '11');
  assert.equal(before.day, '30');
  assert.equal(before.hour, '23');
  assert.equal(before.minute, '59');

  const after = chicagoParts(dec1Midnight);
  assert.equal(after.year, '2026');
  assert.equal(after.month, '12');
  assert.equal(after.day, '01');
  assert.equal(after.hour, '00');
  assert.equal(after.minute, '00');

  assert.equal(chicagoParts(nov30Noon).day, '30');
  assert.equal(chicagoParts(nov30Noon).month, '11');
  assert.equal(chicagoParts(dec1Noon).day, '01');
  assert.equal(chicagoParts(dec1Noon).month, '12');
});

test('through Nov 30 Chicago, founding framing and a $500 price', () => {
  for (const now of [nov30Noon, nov30Late]) {
    assert.equal(promoActive(now), true);
    assert.equal(currentPrice(), 500);
    assert.equal(formatPrice(currentPrice()), '$500');
    assert.equal(priceLabel(now), 'Founding price');

    const hero = heroFounding(now);
    assert.ok(hero);
    assert.equal(
      `${hero.lead} ${hero.price} ${hero.rest}`,
      'Founding price: $500 for my first 10 clients, through November 30. Paid when you book.',
    );
    assert.equal(
      priceCardDetail(now),
      'First 10 clients, through November 30. Paid upfront. One time. No subscription.',
    );
    assert.equal(
      contactPriceSentence(now),
      '$500 for my first 10 clients, through November 30, paid before the interview.',
    );
    assert.equal(pitchPriceDetail(now), 'For my first 10 clients, through November 30. Paid upfront.');
    assert.equal(showFoundingFaq(now), true);
    assert.equal(
      foundingFaqAnswer(),
      'My first 10 clients get the founding price in exchange for honest feedback and, if it works, a short case study. The offer ends November 30.',
    );
    assert.doesNotMatch(foundingFaqAnswer(), /1,500|1500|Time-Back|money back/);
  }
});

test('from Dec 1 Chicago, plain $500 and no founding or deadline language', () => {
  for (const now of [dec1Midnight, dec1Noon]) {
    assert.equal(promoActive(now), false);
    assert.equal(currentPrice(), 500);
    assert.equal(formatPrice(currentPrice()), '$500');
    assert.equal(heroFounding(now), null);
    assert.equal(priceLabel(now), OFFER_NAME);
    assert.equal(priceLabel(now), 'AI Tools Assessment');
    assert.equal(priceCardDetail(now), 'Paid upfront. One time. No subscription.');
    assert.doesNotMatch(priceCardDetail(now), scarcity);
    assert.equal(contactPriceSentence(now), '$500, paid before the interview.');
    assert.doesNotMatch(contactPriceSentence(now), scarcity);
    assert.equal(pitchPriceDetail(now), null);
    assert.equal(showFoundingFaq(now), false);
  }
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '.next') return [];
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    if (/\.(tsx|ts)$/.test(name) && !name.endsWith('.test.ts')) return [p];
    return [];
  });
}

test('live source has no leftover old-offer phrases', () => {
  const banned = [
    /you don['’]t pay/i,
    /money back/i,
    /7 hrs/i,
    /7 hours back/i,
    /5 to 10/i,
    /5–10/,
    /5-10 hours/i,
    /set up live/i,
    /before we hang/i,
    /30-day/i,
    /30 days/i,
    /Book a call/,
    /Request a call/,
    /\$1,500/,
    /\b1500\b/,
    /Time-Back/,
    /REGULAR_PRICE/,
    /no charge/i,
    /on the spot/i,
  ];

  const roots = [join(import.meta.dirname, '..', 'app'), join(import.meta.dirname, '..', 'lib')];
  const hits: string[] = [];
  for (const root of roots) {
    for (const file of walk(root)) {
      const text = readFileSync(file, 'utf8');
      for (const pattern of banned) {
        if (pattern.test(text)) hits.push(`${file}: ${pattern}`);
      }
    }
  }
  assert.deepEqual(hits, []);
});
