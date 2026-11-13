import type { Metadata } from 'next';
import Link from 'next/link';
import Nav, { buttonClass } from './components/nav';
import BookCallLink from './components/book-call-link';
import Footer from './components/footer';
import Portrait from './components/portrait';
import WeekPlanner from './components/week-planner';
import Stamp from './components/stamp';
import ToolExamples from './components/tool-examples';
import {
  currentPrice,
  formatPrice,
  foundingFaqAnswer,
  heroFounding,
  priceCardDetail,
  priceLabel,
  showFoundingFaq,
} from '@/lib/offer';

const title = 'Get 5 Hours a Week Back | Developers Decide';
const description =
  'A paid AI Tools Assessment for small businesses. A 45-minute interview, a written report with 3 to 7 tools, and a review call. Full refund if I can\'t find 5 hours a week.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: 'https://devsdecide.com/',
  },
  openGraph: {
    title,
    description,
    url: 'https://devsdecide.com',
    siteName: 'Devs Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const revalidate = 3600;

const steps = [
  ['Talk for 45 minutes', 'Tell me how the business runs. I ask about the work that repeats and where your week goes.'],
  [
    'Get your report',
    'A written report with 3 to 7 off-the-shelf tools picked for your bottlenecks. What each costs, how much effort setup takes, the time you could get back, and a quick-start plan.',
  ],
  ['Go over it together', 'A review call to walk through the report and answer questions. Then you start with the quick-start plan.'],
];

const included = ['45-minute interview', 'Written report', '3 to 7 tool picks', 'Costs and setup effort', 'Quick-start plan', 'Review call'];

const h2 = 'font-extrabold text-[clamp(36px,7vw,60px)] leading-[0.98] tracking-[-1.5px] m-0';
const wrap = 'max-w-[1120px] mx-auto px-5 sm:px-8';

export default function HomePage() {
  const price = formatPrice(currentPrice());
  const founding = heroFounding();
  const faqs = [
    {
      q: 'What kind of tools?',
      a: 'Off-the-shelf software you can sign up for today: AI assistants, meeting note-takers, inbox and scheduling tools, quoting tools, simple automations between apps you already use. Off-the-shelf only. Custom software is a separate project.',
    },
    {
      q: 'Do I need to be technical?',
      a: 'No. Every tool in the report comes with plain setup steps written for a busy owner. If you’d rather I set them up for you, that’s priced separately and quoted after the report.',
    },
    { q: 'Do the tool companies pay you?', a: 'No. I recommend what fits, including free options when they’re good enough.' },
    ...(showFoundingFaq()
      ? [
          {
            q: 'Why the founding price?',
            a: foundingFaqAnswer(),
          },
        ]
      : []),
    {
      q: 'When do I pay?',
      a: `When you book, before the interview. If I can’t find realistic ways to save at least 5 hours a week, I refund the full ${price}.`,
    },
    {
      q: 'Is setup included?',
      a: `No. The ${price} covers the interview, the written report and the review call. If you want help setting tools up, I’ll quote it after the report.`,
    },
    { q: 'In person or remote?', a: 'Either. I’m in Hoover and happy to come to you anywhere around Birmingham. Otherwise, Zoom.' },
  ];

  return (
    <>
      <Nav />
      <main>

      {/* Hero: the planner is the star */}
      <section className={`${wrap} pt-10 sm:pt-16 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center`}>
        <div>
          <h1 className="font-extrabold text-[clamp(52px,14vw,104px)] leading-[0.9] tracking-[-3px] m-0 mb-6 [font-stretch:88%]">
            Get 5&nbsp;hours of your week back.
          </h1>
          <p className="text-[20px] sm:text-[22px] leading-[1.45] text-ink-soft m-0 mb-8 max-w-[500px]">
            A paid 45-minute assessment. A written report with AI tools you can use this week. If I can&rsquo;t find
            realistic ways to save at least 5 hours a week, you get a full refund.
          </p>
          <BookCallLink location="home_hero" className={buttonClass}>
            Book your assessment
          </BookCallLink>
          {founding && (
            <p className="text-[16px] text-ink-soft mt-5 mb-0">
              {founding.lead} <strong className="text-ink">{founding.price}</strong> {founding.rest}
            </p>
          )}
        </div>
        <WeekPlanner className="mx-1 sm:mx-0" />
      </section>

      {/* What the tools do */}
      <section className={`${wrap} pb-20 sm:pb-28`}>
        <h2 className={`${h2} mb-4`}>What the tools actually do</h2>
        <p className="text-[19px] sm:text-[20px] leading-[1.5] text-ink-soft m-0 mb-10 max-w-[620px]">
          A few of the kinds of tools I recommend. Your report depends on where your week actually goes.
        </p>
        <ToolExamples />
      </section>

      {/* How it works */}
      <section className="bg-bg-deep border-y-[3px] border-ink">
        <div className={`${wrap} py-20 sm:py-24`}>
          <h2 className={`${h2} mb-12`}>How it works</h2>
          <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex md:flex-col gap-5">
                <span className="w-14 h-14 shrink-0 rounded-full bg-white border-[3px] border-ink flex items-center justify-center font-extrabold text-[26px]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-extrabold text-[26px] sm:text-[28px] leading-tight tracking-[-0.5px] m-0 mb-2">{t}</h3>
                  <p className="text-[18px] leading-[1.5] text-ink-soft m-0">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-ink text-white">
        <div className={`${wrap} py-20 sm:py-28 flex flex-col md:flex-row md:items-center gap-10 md:gap-16`}>
          <Stamp id="stamp-home" className="w-[min(52vw,220px)] h-[min(52vw,220px)]" />
          <div>
            <h2 className={`${h2} mb-6`}>No 5 hours, full refund.</h2>
            <p className="text-[19px] sm:text-[21px] leading-[1.55] text-white/85 m-0 max-w-[560px]">
              You pay {price} when you book. If the assessment can&rsquo;t find realistic ways to save at least 5 hours
              a week, I refund the full {price}. You keep the report either way.
            </p>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="max-w-[760px] relative bg-white border-[3px] border-ink rounded-[22px] shadow-hard-lg grid grid-cols-1 sm:grid-cols-[auto_1fr]">
          <div className="p-7 sm:p-9 bg-sun rounded-t-[19px] sm:rounded-tr-none sm:rounded-l-[19px] border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-dashed border-ink">
            <div className="font-bold text-[17px] mb-1">{priceLabel()}</div>
            <div className="font-extrabold text-[72px] leading-none tracking-[-2px]">{price}</div>
            <div className="text-[16px] mt-2 max-w-[240px]">{priceCardDetail()}</div>
          </div>
          <div className="p-7 sm:p-9">
            <div className="font-extrabold text-[22px] mb-4">What you get</div>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2 mb-4">
              {included.map((x) => (
                <li key={x} className="bg-mint border-2 border-ink rounded-full px-3.5 py-1.5 text-[15px] font-semibold">
                  {x}
                </li>
              ))}
            </ul>
            <p className="text-[16px] leading-[1.45] text-ink-soft m-0 mb-7">
              Want me to set the tools up for you? That&rsquo;s separate, quoted after the report.
            </p>
            <BookCallLink location="home_pricing" className={buttonClass}>
              Book your assessment
            </BookCallLink>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={`${wrap} pb-20 sm:pb-24`}>
        <div className="max-w-[760px] flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center">
          <Portrait className="w-24 h-24 sm:w-28 sm:h-28" />
          <div>
            <h2 className="font-extrabold text-[30px] sm:text-[36px] leading-tight tracking-[-0.8px] m-0 mb-3">Hi, I&rsquo;m Solomon.</h2>
            <p className="text-[18px] sm:text-[19px] leading-[1.55] text-ink-soft m-0">
              I&rsquo;m a software developer in Hoover. I&rsquo;ve built custom systems for businesses, like{' '}
              <Link href="/case-study" className="text-ink font-semibold underline decoration-accent decoration-[3px] underline-offset-4">
                a billing integration for a legal services firm
              </Link>
              . Most small businesses don&rsquo;t need that. They need the right off-the-shelf tools and a clear plan to start.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} pb-20 sm:pb-28`}>
        <div className="max-w-[760px]">
          <h2 className={`${h2} mb-8`}>Questions</h2>
          {faqs.map((f) => (
            <details key={f.q} className="group border-b-[3px] border-ink first:border-t-[3px]">
              <summary className="flex justify-between items-center gap-6 cursor-pointer list-none py-5 font-bold text-[20px] sm:text-[22px] tracking-[-0.3px]">
                {f.q}
                <span className="w-9 h-9 rounded-full bg-accent border-2 border-ink flex items-center justify-center text-[22px] leading-none shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-[18px] leading-[1.55] text-ink-soft m-0 pb-6 max-w-[640px]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="bg-accent border-t-[3px] border-ink">
        <div className={`${wrap} py-20 sm:py-28`}>
          <h2 className="font-extrabold text-[clamp(44px,11vw,96px)] leading-[0.92] tracking-[-2.5px] m-0 mb-6 max-w-[800px] [font-stretch:88%]">
            Let&rsquo;s find your 5&nbsp;hours.
          </h2>
          <p className="text-[19px] sm:text-[21px] leading-[1.5] m-0 mb-8 max-w-[520px]">
            Tell me a little about your business. I&rsquo;ll reply within a day with times for your interview and how to pay.
          </p>
          <BookCallLink
            location="home_closing"
            className="inline-block no-underline bg-white text-ink font-bold border-[3px] border-ink rounded-full shadow-hard px-7 py-3.5 text-[18px] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Book your assessment
          </BookCallLink>
          <p className="text-[17px] mt-6 mb-0">
            Or email{' '}
            <a href="mailto:solomon@devsdecide.com" className="text-ink font-semibold">
              solomon@devsdecide.com
            </a>
          </p>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
