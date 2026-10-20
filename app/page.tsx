import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from './components/nav';
import Footer from './components/footer';
import Portrait from './components/portrait';
import { PROMO, REGULAR_PRICE, currentPrice, formatPrice, promoActive } from '@/lib/offer';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://devsdecide.com/',
  },
};

export const revalidate = 3600;

const faqs = [
  {
    q: 'What kind of tools?',
    a: 'Off-the-shelf software you can sign up for today: AI assistants, meeting note-takers, inbox and scheduling tools, quoting tools, simple automations between apps you already use. Nothing custom.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. We set up the first tool together on the call. The rest come with setup notes written for a busy owner.',
  },
  {
    q: 'Do the tool companies pay you?',
    a: 'No. I recommend what fits, including free options when they’re good enough.',
  },
  {
    q: 'Why the founding price?',
    a: `My first ${PROMO.spots} clients get a steep discount in exchange for honest feedback and, if it works, a short case study. After ${PROMO.endsLabel} it goes to ${formatPrice(REGULAR_PRICE)}.`,
  },
  {
    q: 'In person or remote?',
    a: 'Either. I’m in Hoover and happy to come to you anywhere around Birmingham. Otherwise, Zoom.',
  },
];

const h2 = 'font-display text-[28px] sm:text-[32px] leading-tight tracking-[-0.4px] font-normal m-0 mb-4';
const p = 'text-[19px] sm:text-[20px] leading-[1.6] text-ink-soft m-0 mb-5';
const button =
  'inline-block no-underline bg-accent text-white px-7 py-4 rounded-lg text-[18px] whitespace-nowrap hover:bg-accent-deep transition-colors';

export default function HomePage() {
  const promo = promoActive();
  const price = formatPrice(currentPrice());

  return (
    <>
      <Nav />

      <main className="max-w-[680px] mx-auto w-full px-5">
        <section className="pt-14 sm:pt-24 pb-16">
          <Portrait />
          <h1 className="font-display text-[clamp(40px,8vw,60px)] leading-[1.08] tracking-[-1.2px] font-normal m-0 mb-8 text-balance">
            I&rsquo;ll find you 5&nbsp;hours a week in one conversation, or you don&rsquo;t&nbsp;pay.
          </h1>
          <p className={p}>
            I&rsquo;m Solomon. I help owners of small businesses around Birmingham, usually 2 to 20 people, who are
            still the bottleneck. We sit down for 45 minutes, I find what&rsquo;s eating your week, and you leave with
            a short list of AI tools you can start using right away. Nothing custom. Nothing that takes months.
          </p>
          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 mt-8">
            <Link href="/contact" className={`${button} text-center`}>
              Book a call
            </Link>
            {promo && (
              <span className="text-[16px] text-ink-faint">
                {formatPrice(PROMO.price)} for my first {PROMO.spots} clients, through {PROMO.endsLabel}
              </span>
            )}
          </div>
        </section>

        <section className="py-10">
          <h2 className={h2}>How it works</h2>
          <ol className="m-0 pl-5 text-[19px] sm:text-[20px] leading-[1.6] text-ink-soft marker:text-ink-faint">
            <li className="mb-4">
              <span className="text-ink">A 45-minute conversation.</span> I ask how the business actually runs and
              listen for the work that repeats. Before we hang up, we set up your first tool together.
            </li>
            <li className="mb-4">
              <span className="text-ink">A written assessment.</span> Within a few days: 3 to 7 tools matched to your
              bottlenecks, what each costs, how long setup takes, and how many hours it saves.
            </li>
            <li>
              <span className="text-ink">A plan and a check-in.</span> A 4-day plan to get the quick wins in, a call to
              walk through it, and a check-in at 30 days to count the hours.
            </li>
          </ol>
        </section>

        <section className="pt-14 pb-10">
          <h2 className={h2}>My guarantee</h2>
          <p className="font-display text-[23px] sm:text-[26px] leading-[1.5] text-ink m-0">
            If I can&rsquo;t find at least 5 hours a week, I refund you on the spot. If you follow the plan and
            aren&rsquo;t saving 5 hours a week by our 30-day check-in, I refund you then. You keep the report either
            way. The worst case is you lose 45 minutes.
          </p>
        </section>

        <section className="py-10">
          <h2 className={h2}>Price</h2>
          <p className={p}>
            {promo ? (
              <>
                <span className="text-ink">{price}</span> for my first {PROMO.spots} clients, through {PROMO.endsLabel}.
                After that it&rsquo;s {formatPrice(REGULAR_PRICE)}.
              </>
            ) : (
              <>
                <span className="text-ink">{price}</span>, one time.
              </>
            )}{' '}
            That covers the call, the first tool set up live, the written assessment, the plan, the review call, and
            the 30-day check-in. No subscription.
          </p>
          <Link href="/contact" className={`${button} mt-3`}>
            Book a call
          </Link>
        </section>

        <section className="py-10">
          <h2 className={h2}>About me</h2>
          <p className={p}>
            I&rsquo;m a software developer in Hoover. I&rsquo;ve built custom systems for businesses, like{' '}
            <Link href="/case-study" className="text-accent">
              a billing integration for a legal services firm
            </Link>
            . Most small businesses don&rsquo;t need that. They need the right off-the-shelf tools, set up well. That&rsquo;s
            what this is.
          </p>
        </section>

        <section className="py-10">
          <h2 className={h2}>Questions</h2>
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex justify-between items-center gap-6 cursor-pointer list-none py-4 text-[19px] sm:text-[20px] text-ink">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="text-[18px] leading-[1.6] text-ink-soft m-0 pb-5">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="py-10">
          <p className={p}>
            The easiest way to start is to tell me a little about your business. I&rsquo;ll reply within a day with
            a few times that work. Or email me at{' '}
            <a href="mailto:solomon@devsdecide.com" className="text-accent">
              solomon@devsdecide.com
            </a>
            .
          </p>
          <Link href="/contact" className={button}>
            Book a call
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
