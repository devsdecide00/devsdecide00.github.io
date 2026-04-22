import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Link from 'next/link';

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

const challenges = [
  { title: 'Data inconsistency', desc: "A contact updated in AgilityBlue wouldn't appear in NetSuite. Billing posted in Relativity had to be manually reconciled against sales orders." },
  { title: 'Wasted staff time', desc: 'Every sync cycle pulled people away from higher-value work to do repetitive data entry across three systems.' },
  { title: 'No audit trail', desc: "When numbers didn't match, there was no reliable way to trace what changed, when, or why." },
  { title: 'Error at scale', desc: 'Manual processes at scale mean manual errors at scale — mismatched IDs, duplicates, missed updates.' },
];

const capabilities = [
  ['Automated scheduling', 'Configurable sync jobs run nightly and end-of-month — no manual intervention.'],
  ['Ad-hoc sync', 'Any sync step can be triggered manually from the admin dashboard.'],
  ['Dry-run mode', 'Preview changes before committing to NetSuite; current vs. projected side by side.'],
  ['Real-time log streaming', 'Live log output via Server-Sent Events so operators can watch a sync run.'],
  ['Full audit trail', 'Every entity revision is versioned via Hibernate Envers. No change is invisible.'],
  ['Multi-environment', 'Separate staging and production configs; dev profile runs on stubbed services.'],
  ['Billing type flexibility', 'Sync behavior adapts to billing profiles: monthly spend, fixed fee, others.'],
  ['Selective sync', 'Skip specific contacts, enable/disable steps, configure schedules.'],
];

const stack = [
  ['Backend', ['Java 17 / Spring Boot 3', 'Spring Data JPA', 'Hibernate Envers', 'MapStruct', 'OpenFeign', 'Liquibase', 'MS SQL Server']],
  ['Frontend', ['React 18', 'Material UI v5', 'Server-Sent Events']],
  ['Integrations', ['NetSuite REST API', 'AgilityBlue OData', 'Relativity REST API', 'Custom OAuth / HmacSHA256']],
  ['Infrastructure', ['Docker', 'GitLab CI/CD', 'New Relic APM', 'Multi-stage Docker build']],
] as const;

export default function CaseStudyPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1240px] mx-auto pt-[70px] pb-10 px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Case study · Legal services firm</div>
        <h1 className="font-display text-[clamp(56px,7vw,104px)] leading-[1.1] tracking-[-2.5px] m-0 mb-10 font-normal max-w-[1100px] pb-[0.15em]">
          Automating legal billing sync across{' '}
          <span className="italic text-accent">NetSuite, AgilityBlue, and Relativity.</span>
        </h1>
        <p className="text-[19px] text-ink-soft leading-[1.55] m-0 mb-10 max-w-[680px]">
          How we built a custom enterprise integration platform that replaced manual data entry across three legal
          tech systems with fully automated, auditable, real-time syncing.
        </p>
        <div className="grid grid-cols-4 gap-0 pt-7 border-t border-rule">
          {[['Industry', 'Legal services'], ['Systems', '3 enterprise platforms'], ['Stack', 'Spring Boot · React'], ['Outcome', 'Fully automated']].map(
            ([k, v], i) => (
              <div
                key={i}
                className={`pr-5 ${i < 3 ? 'border-r border-rule' : ''} ${i > 0 ? 'pl-5' : ''}`}
              >
                <div className="text-[10px] tracking-[1.5px] uppercase text-ink-faint mb-2">{k}</div>
                <div className="font-display text-[22px] tracking-[-0.4px] text-ink italic">{v}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* The challenge */}
      <section className="bg-bg-deep border-t border-rule py-20 px-10 mt-[60px]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The challenge</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-5 font-normal max-w-[860px]">
            Three best-in-class systems. <span className="italic">None of them talking.</span>
          </h2>
          <p className="text-[17px] text-ink-soft leading-[1.6] m-0 mb-10 max-w-[760px]">
            Our client is a legal services firm running <strong className="text-ink">AgilityBlue</strong> for matter
            management, <strong className="text-ink">NetSuite</strong> for ERP, and{' '}
            <strong className="text-ink">Relativity</strong> for e-discovery. Each is purpose-built and excellent for
            its domain — but keeping them in sync was a human job, and it compounded.
          </p>
          <div className="grid grid-cols-4 gap-5">
            {challenges.map((b, i) => (
              <div key={i} className="bg-white rounded-[14px] p-6 border border-rule">
                <div className="font-display text-[44px] text-accent leading-none italic mb-[10px]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-[15px] text-ink font-medium mb-2">{b.title}</div>
                <div className="text-[13px] text-ink-soft leading-[1.55]">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The solution */}
      <section className="max-w-[1240px] mx-auto py-[100px] px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The solution</div>
        <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-1.8px] m-0 mb-10 font-normal max-w-[900px]">
          We built <span className="italic text-accent">Conduit.</span>
        </h2>
        <div className="bg-ink text-bg rounded-[20px] p-12 grid grid-cols-[1.3fr_1fr] gap-[60px] items-center">
          <div>
            <div className="text-[11px] tracking-[2px] uppercase text-sun mb-4">Custom integration platform</div>
            <p className="text-[17px] leading-[1.6] m-0 mb-5 opacity-90">
              A Spring Boot service with a React admin dashboard that serves as the connective tissue between all
              three platforms. On a configurable schedule — nightly, end-of-month, or on demand — Conduit pulls,
              transforms, and writes records with a complete audit history of every change.
            </p>
            <p className="text-[17px] leading-[1.6] m-0 opacity-90">
              For billing workflows, it applies business logic before writing anything: billing totals, MSA plan
              amounts, over/under variances, line item changes. A{' '}
              <strong className="text-sun">dry-run mode</strong> lets operators preview exactly what will change in
              NetSuite — no surprises, no rollbacks.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <div className="text-[11px] tracking-[2px] uppercase opacity-50 mb-4">Data domains covered</div>
            {['Clients & contacts', 'Matters & billing profiles', 'Billing entries', 'Monthly spend orders', 'Employees'].map(
              (d, i) => (
                <div
                  key={i}
                  className={`py-3 flex items-center gap-3 ${i < 4 ? 'border-b border-white/10' : ''}`}
                >
                  <span className="text-sun font-display italic text-[16px]">0{i + 1}</span>
                  <span className="text-[14px]">{d}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Key capabilities */}
      <section className="bg-bg-deep border-t border-rule py-20 px-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Key capabilities</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal max-w-[800px]">
            What Conduit actually does, <span className="italic">every night.</span>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {capabilities.map(([name, desc], i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-rule flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center font-display text-[22px] italic shrink-0">
                  {name[0]}
                </div>
                <div>
                  <div className="font-display text-[24px] tracking-[-0.5px] mb-2 italic">{name}</div>
                  <div className="text-[14px] text-ink-soft leading-[1.55]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-[100px] px-10 bg-ink text-bg">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="text-[12px] tracking-[2px] uppercase text-sun mb-6">The outcome</div>
          <blockquote className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.2] tracking-[-1px] m-0 italic font-normal">
            &ldquo;Every data point that Conduit now moves automatically used to require a person to move it by
            hand.&rdquo;
          </blockquote>
          <p className="text-[16px] leading-[1.6] opacity-75 mt-8 mx-auto max-w-[640px]">
            Client records, matter updates, billing entries, monthly spend calculations, sales order line items — all
            of it was manual. Today, it runs on a schedule. The ops team interacts with a clean admin dashboard
            instead of logging into three systems to copy data between them.
          </p>
          <p className="text-[16px] leading-[1.6] opacity-75 mt-4 mx-auto max-w-[640px]">
            The result: faster billing cycles, fewer discrepancies, and staff time redirected from data entry to
            actual work.
          </p>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-[1240px] mx-auto py-[100px] px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Tech stack</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal">
          What it&rsquo;s built on.
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {stack.map(([k, items]) => (
            <div key={k} className="bg-white border border-rule rounded-2xl p-6">
              <div className="font-display text-[22px] tracking-[-0.4px] text-ink italic mb-4">{k}</div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="bg-bg border border-rule px-2.5 py-1.5 rounded-md text-[11px] text-ink">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-10 text-center">
        <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-2.5px] m-0 mb-5 font-normal max-w-[900px] mx-auto">
          Have a similar <span className="italic text-accent">integration challenge?</span>
        </h2>
        <p className="text-[17px] text-ink-soft mx-auto mb-8 leading-[1.55] max-w-[640px]">
          If your team is managing data across multiple enterprise systems and relying on manual processes to keep
          them in sync, we can help. We build custom integrations that fit your exact workflows — not a generic
          connector.
        </p>
        <Link href="/contact" className="inline-block no-underline bg-ink text-bg px-[30px] py-[15px] rounded-full text-[14px] font-medium">
          Get in touch →
        </Link>
      </section>

      <Footer />
    </>
  );
}
