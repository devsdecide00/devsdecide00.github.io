// Single source of truth for the assessment offer.
export const OFFER_NAME = 'The Time-Back Audit';
export const REGULAR_PRICE = 1500;

// Promo turns itself off after `ends`; pages using it revalidate hourly.
export const PROMO = {
  label: 'Fall Founding Offer',
  price: 500,
  spots: 10,
  endsLabel: 'November 30',
  ends: new Date('2026-12-01T06:00:00Z'), // midnight Central
};

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;
export const promoActive = () => Date.now() < PROMO.ends.getTime();
export const currentPrice = () => (promoActive() ? PROMO.price : REGULAR_PRICE);
