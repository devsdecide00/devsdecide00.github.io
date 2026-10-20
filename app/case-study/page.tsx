import type { Metadata } from 'next';
import Link from 'next/link';
import Nav, { buttonClass } from '../components/nav';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: 'Legal Billing Integration Case Study | Developers Decide',
  description: 'How we built Conduit — a custom integration platform automating billing sync across NetSuite, AgilityBlue, and Relativity for a legal services firm.',
  openGraph: {
    title: 'Automating Legal Billing Across Three Enterprise Systems | Developers Decide',
    description: 'How we built Conduit — a custom integration platform replacing manual data entry across NetSuite, AgilityBlue, and Relativity.',
    url: 'https://devsdecide.com/case-study',
    siteName: 'Developers Decide',
    type: 'website',
  },
  alternates: {
    canonical: 'https://devsdecide.com/case-study',
  },
};

const facts = [
  ['Industry', 'Legal services'],
  ['Systems', 'NetSuite, AgilityBlue, Relativity'],
  ['Built with', 'Spring Boot and React'],
  ['Result', 'Manual sync fully automated'],
];

const problems = [
  ['Data drifted apart', 'A contact updated in AgilityBlue wouldn’t appear in NetSuite. Billing in Relativity had to be reconciled by hand.'],
  ['Staff time disappeared', 'Every sync cycle pulled people off real work to copy data between three systems.'],
  ['Nothing was traceable', 'When numbers didn’t match, there was no reliable way to see what changed, when, or why.'],
];

const capabilities = [
  'Nightly and month-end sync',
  'On-demand sync from a dashboard',
  'Dry run before anything is written',
  'Live logs while a sync runs',
  'Full audit history of every change',
  'Staging and production environments',
  'Rules per billing type',
  'Skip contacts or steps as needed',
];

const stack = [
  'Java 17', 'Spring Boot 3', 'Hibernate Envers', 'MS SQL Server', 'React 18', 'Material UI',
  'NetSuite REST', 'AgilityBlue OData', 'Relativity REST', 'Docker', 'GitLab CI/CD', 'New Relic',
];

const wrap = 'max-w-[1120px] mx-auto px-5 sm:px-8';
const h2 = 'font-extrabold text-[clamp(34px,6vw,52px)] leading-[0.98] tracking-[-1.3px] m-0';

export default function CaseStudyPage() {
  return (
    <>
      <Nav />

      <section className={`${wrap} pt-10 sm:pt-16 pb-16 sm:pb-20`}>
        <p className="text-[18px] font-bold text-accent-deep m-0 mb-4">Past work: a legal services firm</p>
        <h1 className="font-extrabold text-[clamp(44px,10vw,88px)] leading-[0.92] tracking-[-2.5px] m-0 mb-6 max-w-[900px] [font-stretch:88%]">
          Three billing systems that finally talk to each other.
        </h1>
        <p className="text-[19px] sm:text-[21px] leading-[1.5] text-ink-soft m-0 mb-10 max-w-[640px]">
          A custom integration that replaced manual data entry across NetSuite, AgilityBlue and Relativity with
          automated, auditable syncing.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 m-0">
          {facts.map(([k, v]) => (
            <div key={k} className="bg-bg-deep border-[3px] border-ink rounded-2xl p-5">
              <dt className="text-[15px] font-bold text-ink-faint mb-1">{k}</dt>
              <dd className="m-0 text-[19px] font-bold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-bg-deep border-y-[3px] border-ink">
        <div className={`${wrap} py-16 sm:py-20`}>
          <h2 className={`${h2} mb-10`}>The problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map(([t, d]) => (
              <div key={t}>
                <h3 className="font-extrabold text-[24px] leading-tight tracking-[-0.4px] m-0 mb-2">{t}</h3>
                <p className="text-[18px] leading-[1.5] text-ink-soft m-0">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} py-16 sm:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className={`${h2} mb-6`}>What we built</h2>
            <p className="text-[18px] sm:text-[19px] leading-[1.55] text-ink-soft m-0 mb-4">
              Conduit is a Spring Boot service with a React dashboard that sits between all three platforms. On a
              schedule, or on demand, it pulls, transforms and writes records, keeping a complete history of every
              change.
            </p>
            <p className="text-[18px] sm:text-[19px] leading-[1.55] text-ink-soft m-0">
              For billing, it applies the firm&rsquo;s rules before writing anything, and a dry-run mode shows exactly
              what will change in NetSuite first.
            </p>
          </div>
          <div className="bg-white border-[3px] border-ink rounded-[22px] shadow-hard-lg p-6 sm:p-8">
            <h3 className="font-extrabold text-[22px] m-0 mb-4">What it does</h3>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <li key={c} className="bg-mint border-2 border-ink rounded-full px-3.5 py-1.5 text-[15px] font-semibold">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className={`${wrap} py-16 sm:py-24`}>
          <p className="font-extrabold text-[clamp(30px,6vw,52px)] leading-[1.05] tracking-[-1px] m-0 mb-6 max-w-[900px]">
            Every record Conduit moves today used to be moved by a person, by hand.
          </p>
          <p className="text-[18px] leading-[1.55] text-white/80 m-0 max-w-[640px]">
            Faster billing cycles, fewer discrepancies, and an ops team working in one dashboard instead of copying data
            between three systems.
          </p>
          <ul className="list-none m-0 p-0 mt-10 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="border-2 border-white/40 rounded-full px-3 py-1 text-[14px] text-white/85">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} py-16 sm:py-24`}>
        <h2 className={`${h2} mb-5 max-w-[760px]`}>Most businesses don&rsquo;t need a custom build.</h2>
        <p className="text-[19px] leading-[1.5] text-ink-soft m-0 mb-8 max-w-[600px]">
          They need the right off-the-shelf tools, set up well. That&rsquo;s what the 45-minute assessment finds.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClass}>
            Book a call
          </Link>
          <Link href="/" className="inline-block no-underline text-ink font-bold text-[18px] px-2 py-3.5 underline decoration-accent decoration-[3px] underline-offset-4">
            How the assessment works
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
