import type { Metadata, Viewport } from 'next';
import QRCode from 'qrcode';
import Deck from './deck';
import Portrait from '../components/portrait';
import WeekPlanner from '../components/week-planner';
import Stamp from '../components/stamp';
import { PROMO, REGULAR_PRICE, formatPrice, promoActive } from '@/lib/offer';

export const metadata: Metadata = {
  title: 'Get 5–10 Hours Back | Developers Decide',
  description: 'One 45-minute conversation. 3 to 7 AI tools you can use right away. 5 hours a week back, or your money back.',
  robots: { index: false },
};

export const viewport: Viewport = {
  themeColor: '#24123a',
  viewportFit: 'cover',
};

export const revalidate = 3600;

const BOOK_URL = 'https://devsdecide.com/contact';

const tones = {
  white: 'bg-white text-ink',
  pumpkin: 'bg-accent text-ink',
  plum: 'bg-ink text-white',
  butter: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
};

type Tone = keyof typeof tones;

const big = 'font-extrabold text-[clamp(52px,14.5vw,120px)] leading-[0.92] tracking-[-2.5px] m-0 [font-stretch:88%] text-balance';
const sub = 'text-[21px] sm:text-[26px] leading-[1.35] m-0 mt-5 opacity-85 max-w-[560px]';

export default async function PitchPage() {
  const promo = promoActive();
  const qr = await QRCode.toString(BOOK_URL, {
    type: 'svg',
    margin: 0,
    color: { dark: '#24123a', light: '#00000000' },
  });

  const slides: [Tone, React.ReactNode][] = [
    [
      'white',
      <>
        <Portrait className="w-28 h-28 mb-8" />
        <h1 className={big}>Hi, I&rsquo;m Solomon.</h1>
        <p className={sub}>I help small business owners get 5 to 10 hours of their week back with AI.</p>
      </>,
    ],
    [
      'pumpkin',
      <>
        <div className="flex flex-wrap gap-2 mb-8 max-w-[520px]">
          {['Inbox', 'Quotes', 'Booking', 'Follow-ups', 'Invoices', 'Same questions again'].map((t, i) => (
            <span
              key={t}
              className="bg-white border-[3px] border-ink rounded-full px-4 py-2 text-[18px] font-bold"
              style={{ transform: `rotate(${[-4, 3, -2, 5, -3, 2][i]}deg)` }}
            >
              {t}
            </span>
          ))}
        </div>
        <h2 className={big}>Most owners are the bottleneck.</h2>
      </>,
    ],
    [
      'white',
      <>
        <WeekPlanner className="mb-10 max-w-[480px]" />
        <h2 className={big}>45 minutes. I find the hours.</h2>
      </>,
    ],
    [
      'butter',
      <>
        <h2 className={big}>Your first AI tool is set up before we hang&nbsp;up.</h2>
        <p className={sub}>Then a shortlist of 3 to 7 more you can start this week. Nothing custom.</p>
      </>,
    ],
    [
      'plum',
      <>
        <Stamp id="stamp-pitch" className="w-[min(50vw,220px)] h-[min(50vw,220px)] mb-10" />
        <h2 className={big}>No 5 hours, no charge.</h2>
        <p className={sub}>Not saving 5 hours a week by day 30? Every dollar back.</p>
      </>,
    ],
    [
      'mint',
      <>
        <div className="font-bold text-[22px] mb-2">{promo ? 'Fall founding price' : 'One time'}</div>
        <div className="font-extrabold text-[clamp(96px,32vw,220px)] leading-[0.85] tracking-[-5px] [font-stretch:85%]">
          {formatPrice(promo ? PROMO.price : REGULAR_PRICE)}
        </div>
        {promo && (
          <p className={sub}>
            For my first {PROMO.spots} owners, through {PROMO.endsLabel}. Then {formatPrice(REGULAR_PRICE)}.
          </p>
        )}
      </>,
    ],
    [
      'pumpkin',
      <>
        <h2 className={big}>Know an owner who&rsquo;s stretched thin?</h2>
        <p className={sub}>I&rsquo;d love an intro.</p>
      </>,
    ],
    [
      'plum',
      <>
        <div
          className="bg-white rounded-[22px] border-[3px] border-white p-5 w-[min(62vw,260px)] mb-10"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <h2 className={big}>Scan to book a call.</h2>
        <p className={sub}>solomon@devsdecide.com</p>
      </>,
    ],
  ];

  return (
    <Deck>
      {slides.map(([tone, content], i) => (
        <section key={i} id={`s${i}`} className={`h-[100dvh] snap-start snap-always ${tones[tone]}`}>
          <div className="h-full max-w-[860px] mx-auto flex flex-col px-6 sm:px-14 pt-[max(20px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
            <div className="flex justify-between items-center text-[16px] font-bold opacity-70 py-2">
              <span>Developers Decide</span>
              <span>
                {i + 1}/{slides.length}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">{content}</div>
            {i < slides.length - 1 && (
              <a
                href={`#s${i + 1}`}
                aria-label="Next slide"
                className="self-start w-14 h-14 rounded-full border-[3px] border-current flex items-center justify-center no-underline text-current text-[24px] font-bold"
              >
                ↓
              </a>
            )}
          </div>
        </section>
      ))}
    </Deck>
  );
}
