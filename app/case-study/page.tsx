import type { Metadata } from 'next';
import Link from 'next/link';
import Nav, { buttonClass } from '../components/nav';
import BookCallLink from '../components/book-call-link';
import Footer from '../components/footer';

const title = 'Legal Billing Case Study | Developers Decide';
const description =
  'Manual billing sync across NetSuite, AgilityBlue, and Relativity, fully automated. Most businesses don\'t need a custom build. They need the right tools and a plan.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: 'https://devsdecide.com/case-study',
    siteName: 'Devs Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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

const wrap = 'max-w-page mx-auto px-4 sm:px-8';
const h2 = 'font-extrabold text-h2 m-0';

export default function CaseStudyPage() {
  return (
    <>
      <Nav />
      <main>

      <section className={`${wrap} pt-12 sm:pt-16 pb-16 sm:pb-16`}>
        <p className="text-body font-bold text-accent-deep m-0 mb-4">Past work: a legal services firm</p>
        <h1 className="font-extrabold text-display m-0 mb-6 max-w-headline [font-stretch:88%]">
          Three billing systems that finally talk to each other.
        </h1>
        <p className="text-lead text-ink-soft m-0 mb-8 max-w-measure">
          A custom integration that replaced manual data entry across NetSuite, AgilityBlue and Relativity with
          automated, auditable syncing.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-0">
          {facts.map(([k, v]) => (
            <div key={k} className="bg-bg-deep border-[3px] border-ink rounded-card p-6">
              <dt className="text-small font-bold text-ink-faint mb-1">{k}</dt>
              <dd className="m-0 text-body font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-bg-deep border-y-[3px] border-ink">
        <div className={`${wrap} py-16 sm:py-24`}>
          <h2 className={`${h2} mb-8`}>The problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map(([t, d]) => (
              <div key={t}>
                <h3 className="font-extrabold text-title m-0 mb-2">{t}</h3>
                <p className="text-body text-ink-soft m-0">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} py-16 sm:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className={`${h2} mb-4`}>What we built</h2>
            <p className="text-body text-ink-soft m-0 mb-4">
              Conduit is a Spring Boot service with a React dashboard that sits between all three platforms. On a
              schedule, or on demand, it pulls, transforms and writes records, keeping a complete history of every
              change.
            </p>
            <p className="text-body text-ink-soft m-0">
              For billing, it applies the firm&rsquo;s rules before writing anything, and a dry-run mode shows exactly
              what will change in NetSuite first.
            </p>
          </div>
          <div className="bg-white border-[3px] border-ink rounded-card shadow-hard-lg p-6 sm:p-8">
            <h3 className="font-extrabold text-title m-0 mb-4">What it does</h3>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <li key={c} className="bg-mint border-2 border-ink rounded-full px-4 py-2 text-small font-semibold">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-12">
          <BookCallLink location="case_study_built" className={buttonClass}>
            Book your assessment
          </BookCallLink>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className={`${wrap} py-16 sm:py-24`}>
          <p className="font-extrabold text-h2 m-0 mb-4 max-w-headline">
            Every record Conduit moves today used to be moved by a person, by hand.
          </p>
          <p className="text-body text-white/80 m-0 max-w-measure">
            Faster billing cycles, fewer discrepancies, and an ops team working in one dashboard instead of copying data
            between three systems.
          </p>
          <ul className="list-none m-0 p-0 mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="border-2 border-white/40 rounded-full px-4 py-1 text-caption text-white/85">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} py-16 sm:py-24`}>
        <h2 className={`${h2} mb-4 max-w-column`}>Most businesses don&rsquo;t need a custom build.</h2>
        <p className="text-body text-ink-soft m-0 mb-8 max-w-measure">
          They need the right off-the-shelf tools and a plan to start. That&rsquo;s what the AI Tools Assessment finds.
        </p>
        <div className="flex flex-wrap gap-4">
          <BookCallLink location="case_study_closing" className={buttonClass}>
            Book your assessment
          </BookCallLink>
          <Link href="/" className="inline-block no-underline text-ink font-bold text-body px-2 py-4 underline decoration-accent decoration-[3px] underline-offset-4">
            How the assessment works
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
