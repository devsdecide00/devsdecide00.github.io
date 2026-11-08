// Single source of truth for the AI Tools Assessment.
// The price stays $500. promoActive() only hides founding wording after
// November 30, 2026 (midnight America/Chicago). It does not change the price.

export const OFFER_NAME = 'AI Tools Assessment';

export const PROMO = {
  price: 500,
  spots: 10,
  endsLabel: 'November 30',
  // Dec 1, 2026 00:00 America/Chicago (CST, UTC-6).
  ends: new Date('2026-12-01T06:00:00Z'),
};

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;

export const promoActive = (now = Date.now()) => now < PROMO.ends.getTime();

/** Dollars charged for the assessment, before and after the founding deadline. */
export const currentPrice = () => PROMO.price;

const priced = () => formatPrice(currentPrice());

export function heroFounding(now = Date.now()) {
  if (!promoActive(now)) return null;
  return {
    lead: 'Founding price:',
    price: priced(),
    rest: `for my first ${PROMO.spots} clients, through ${PROMO.endsLabel}. Paid when you book.`,
  };
}

export function priceLabel(now = Date.now()) {
  return promoActive(now) ? 'Founding price' : OFFER_NAME;
}

export function priceCardDetail(now = Date.now()) {
  const terms = 'Paid upfront. One time. No subscription.';
  if (!promoActive(now)) return terms;
  return `First ${PROMO.spots} clients, through ${PROMO.endsLabel}. ${terms}`;
}

export function contactPriceSentence(now = Date.now()) {
  if (!promoActive(now)) return `${priced()}, paid before the interview.`;
  return `${priced()} for my first ${PROMO.spots} clients, through ${PROMO.endsLabel}, paid before the interview.`;
}

export function pitchPriceDetail(now = Date.now()) {
  if (!promoActive(now)) return null;
  return `For my first ${PROMO.spots} clients, through ${PROMO.endsLabel}. Paid upfront.`;
}

export function showFoundingFaq(now = Date.now()) {
  return promoActive(now);
}

export function foundingFaqAnswer() {
  return `My first ${PROMO.spots} clients get the founding price in exchange for honest feedback and, if it works, a short case study. The offer ends ${PROMO.endsLabel}.`;
}
