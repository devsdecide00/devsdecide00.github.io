import type { Metadata, Viewport } from 'next';
import QRCode from 'qrcode';
import Deck from './deck';
import Portrait from '../components/portrait';
import { PROMO, REGULAR_PRICE, formatPrice, promoActive } from '@/lib/offer';

export const metadata: Metadata = {
  title: 'Get 5–10 Hours Back | Developers Decide',
  description: 'One 45-minute conversation. 3 to 7 AI tools you can use right away. 5 hours a week back, or your money back.',
  robots: { index: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  viewportFit: 'cover',
};

export const revalidate = 3600;

const BOOK_URL = 'https://devsdecide.com/contact';

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-[100dvh] snap-start snap-always">
      <div className="h-full max-w-[860px] mx-auto flex flex-col justify-end pl-6 pr-12 sm:px-16 pt-16 pb-[max(112px,calc(env(safe-area-inset-bottom)+96px))]">
        {children}
      </div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(44px,12.5vw,104px)] leading-[1.04] tracking-[-1.5px] font-normal m-0 text-balance">
      {children}
    </h2>
  );
}

export default async function PitchPage() {
  const promo = promoActive();
  const qr = await QRCode.toString(BOOK_URL, {
    type: 'svg',
    margin: 0,
    color: { dark: '#161616', light: '#00000000' },
  });

  return (
    <Deck>
      <Slide>
        <Portrait className="w-28 h-28 mb-10" />
        <Line>I&rsquo;m Solomon. I&nbsp;help owners get their week&nbsp;back.</Line>
      </Slide>
      <Slide>
        <Line>Most owners I meet are the bottleneck in their own business.</Line>
      </Slide>
      <Slide>
        <Line>We sit down for 45 minutes. I find what&rsquo;s eating your week.</Line>
      </Slide>
      <Slide>
        <Line>We set up your first AI tool before we hang up. You leave with 3&nbsp;to&nbsp;7&nbsp;more.</Line>
      </Slide>
      <Slide>
        <Line>5 hours a week back by day 30, or every dollar back.</Line>
      </Slide>
      <Slide>
        <Line>
          {promo
            ? `${formatPrice(PROMO.price)} for my first ${PROMO.spots} clients. Then ${formatPrice(REGULAR_PRICE)}.`
            : `${formatPrice(REGULAR_PRICE)}, one time.`}
        </Line>
      </Slide>
      <Slide>
        <Line>Know an owner who&rsquo;s stretched thin? I&rsquo;d love an intro.</Line>
      </Slide>
      <Slide>
        <div className="w-[min(64vw,280px)] mb-10" dangerouslySetInnerHTML={{ __html: qr }} />
        <Line>Scan to book a time.</Line>
        <p className="text-[20px] text-ink-faint m-0 mt-5">solomon@devsdecide.com</p>
      </Slide>
    </Deck>
  );
}
