import type { Metadata } from 'next';
import Nav from './components/nav';
import Footer from './components/footer';
import HeroDemo from './components/hero-demo';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://devsdecide.com/',
  },
};

const processSteps = [
  { n: '01', t: 'Diagnose', d: 'A 30-minute call. Tell me about a typical Tuesday. I listen for what is repeated.' },
  { n: '02', t: 'Scope', d: 'One specific tool. Fixed price, two-week timeline, written in plain English.' },
  { n: '03', t: 'Build', d: 'I build against your real data and train your team until they own it.' },
  { n: '04', t: 'Stay', d: 'Monthly retainer. Fix breakages, find the next bottleneck, compound savings.' },
];

const gallery = [
  { tag: 'HVAC · Birmingham', name: 'IntakeRelay', blurb: 'Customer texts triaged, urgent ones routed to the on-call tech, routine ones auto-replied with scheduling link.', stat: '14 hrs/wk' },
  { tag: 'Cleaning · Huntsville', name: 'CrewShuffle', blurb: 'Staff shift swaps reconciled from Slack into the master schedule. Client confirmations automatic. Zero owner involvement.', stat: '$3.4k/mo' },
  { tag: 'Bookkeeping · Hoover', name: 'DocChaser', blurb: 'Document requests and follow-ups tuned to how each client responds. Month-end went from 5 days to 2.', stat: '3× capacity' },
  { tag: 'Property Mgmt · Mobile', name: 'FixTriage', blurb: 'Maintenance requests triaged by severity, dispatched to the right vendor, tenants updated automatically.', stat: '22 hrs/wk' },
  { tag: 'Staffing · Montgomery', name: 'FitCheck', blurb: 'Candidates scored against open roles with reasoning. Top 5 surface with interview notes pre-drafted.', stat: '+31% placement' },
  { tag: 'Construction · Tuscaloosa', name: 'BidBuilder', blurb: 'Plans in, materials list generated, subs queried for pricing, draft bid on your desk in an hour.', stat: '8 hrs → 45 min' },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '1,500',
    desc: 'One bottleneck, one tool, fast.',
    features: ['Bottleneck discovery call', 'One AI tool built & deployed', 'Team training session', '30-day support window', 'Monthly check-in'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '2,500',
    desc: 'Systematic monthly savings compounding.',
    features: ['Everything in Starter', 'Up to 3 active AI tools', 'Ongoing iteration', 'Unlimited support', 'Bi-weekly strategy calls', 'Priority response'],
    featured: true,
  },
  {
    name: 'Custom',
    price: null,
    desc: 'Multi-location or complex integrations.',
    features: ['Everything in Growth', 'Unlimited tools & scope', 'Dedicated Slack channel', 'Custom dashboards', 'On-site training'],
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <HeroDemo />

      {/* Process */}
      <section className="bg-bg-deep border-t border-rule py-16 sm:py-[100px] px-5 sm:px-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-[60px] gap-6 lg:gap-10">
            <div>
              <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">How it works</div>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.8px] m-0 font-normal max-w-[700px]">
                From the demo above to a tool your team{' '}
                <span className="italic text-accent">actually uses.</span>
              </h2>
            </div>
            <p className="text-[16px] text-ink-soft leading-relaxed m-0 max-w-[340px]">
              Four steps, two weeks to your first deployed tool, no slide decks anywhere.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-[26px] border border-rule">
                <div className="flex justify-between items-center mb-5">
                  <div className="w-10 h-10 rounded-[10px] bg-accent text-white flex items-center justify-center font-display text-lg italic">
                    {s.n}
                  </div>
                  <div className="text-[11px] text-ink-faint tracking-[1px]">STEP {i + 1}/4</div>
                </div>
                <h3 className="font-display text-[28px] tracking-[-0.7px] m-0 mb-[10px] font-normal">{s.t}</h3>
                <p className="text-[13px] text-ink-soft leading-[1.55] m-0">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case study */}
      <section className="max-w-[1240px] mx-auto py-16 sm:py-[100px] px-5 sm:px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Featured engagement</div>
        <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.8px] m-0 mb-10 font-normal max-w-[900px]">
          Not all automation is <span className="italic">small.</span>
        </h2>
        <Link
          href="/case-study"
          className="block no-underline bg-ink text-bg rounded-[20px] p-7 sm:p-12 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-[60px] items-center transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div>
            <div className="text-[11px] tracking-[2px] uppercase text-sun mb-4">Case study · Legal services firm</div>
            <h3 className="font-display text-[48px] leading-none tracking-[-1.5px] m-0 mb-5 font-normal">
              Automating billing sync across{' '}
              <span className="italic text-sun">three enterprise systems.</span>
            </h3>
            <p className="text-[16px] leading-[1.55] m-0 mb-6 opacity-85">
              NetSuite · AgilityBlue · Relativity. We built <em>Conduit</em> — a custom integration platform that
              replaced manual data entry with automated, auditable, real-time sync.
            </p>
            <span className="inline-block bg-sun text-ink px-[22px] py-3 rounded-full text-[14px] font-medium">
              Read the full case study →
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            {[
              ['Manual data entry', 'Replaced across 3 systems'],
              ['Billing cycles', 'Faster, auditable end-to-end'],
              ['Audit trail', 'Every entity revision versioned'],
              ['Dry-run mode', 'Preview changes before commit'],
            ].map(([k, v], i) => (
              <div key={i} className={`py-[14px] ${i < 3 ? 'border-b border-white/10' : ''}`}>
                <div className="text-[11px] tracking-[1.5px] uppercase opacity-50">{k}</div>
                <div className="font-display text-lg mt-1 italic text-sun">{v}</div>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* Gallery */}
      <section className="max-w-[1240px] mx-auto pb-16 sm:pb-[100px] px-5 sm:px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Smaller builds</div>
        <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-none tracking-[-1.8px] m-0 mb-10 font-normal max-w-[900px]">
          A few tools <span className="italic">already running</span> across Alabama.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((w, i) => (
            <div key={i} className="bg-white rounded-2xl p-[26px] border border-rule flex flex-col min-h-[240px]">
              <div className="text-[10px] tracking-[1.5px] uppercase text-ink-faint mb-[14px]">{w.tag}</div>
              <div className="font-display text-[26px] tracking-[-0.5px] mb-[10px] italic">{w.name}</div>
              <p className="text-[13px] text-ink-soft leading-[1.55] m-0 mb-5 flex-1">{w.blurb}</p>
              <div className="flex items-center justify-between pt-4 border-t border-rule">
                <div className="text-[11px] text-ink-faint">Value delivered</div>
                <div className="font-display text-[20px] text-accent italic">{w.stat}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-[100px] px-5 sm:px-10 bg-bg-deep border-t border-rule">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Pricing</div>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.8px] m-0 mb-4 font-normal">
              Flat. Simple. <span className="italic">Cancel anytime.</span>
            </h2>
            <p className="text-[16px] text-ink-soft m-0">Month-to-month. No setup fees. No year-long contracts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
            {pricingTiers.map((p, i) => (
              <div
                key={i}
                className={`rounded-[20px] p-8 relative ${
                  p.featured
                    ? 'bg-ink text-bg md:-translate-y-2 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.3)]'
                    : 'bg-white text-ink border border-rule'
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sun text-ink text-[11px] font-semibold px-[14px] py-[5px] rounded-full tracking-[0.5px]">
                    MOST PICKED
                  </div>
                )}
                <div className="font-display text-[28px] tracking-[-0.5px] mb-[14px] italic">{p.name}</div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  {p.price ? (
                    <>
                      <span className="text-[20px] opacity-60">$</span>
                      <span className="font-display text-[60px] tracking-[-2px] leading-none">{p.price}</span>
                      <span className="text-[14px] opacity-60">/mo</span>
                    </>
                  ) : (
                    <span className="font-display italic text-[36px] tracking-[-1px]">Let&rsquo;s talk</span>
                  )}
                </div>
                <p className={`text-[14px] m-0 mt-3 mb-6 leading-[1.5] ${p.featured ? 'opacity-75' : 'text-ink-soft'}`}>
                  {p.desc}
                </p>
                <div className={`border-t pt-[18px] mb-6 ${p.featured ? 'border-white/10' : 'border-rule'}`}>
                  {p.features.map((f, j) => (
                    <div
                      key={j}
                      className={`text-[13px] py-1.5 flex gap-2.5 ${p.featured ? 'opacity-80' : 'text-ink-soft'}`}
                    >
                      <span className={p.featured ? 'text-sun' : 'text-accent'}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?plan=${p.name}`}
                  className={`block text-center no-underline w-full py-[14px] rounded-full text-[14px] font-medium ${
                    p.featured
                      ? 'bg-sun text-ink'
                      : 'bg-transparent text-ink border border-ink'
                  }`}
                >
                  {p.price ? 'Get started' : 'Contact'} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-[120px] px-5 sm:px-10 text-center max-w-[900px] mx-auto">
        <h2 className="font-display text-[clamp(56px,8vw,112px)] leading-[1.05] tracking-[-3px] m-0 mb-7 font-normal">
          Or skip the demo.<br />
          <span className="italic text-accent">Just talk to me.</span>
        </h2>
        <p className="text-[18px] text-ink-soft m-0 mb-9 leading-[1.5]">
          30 minutes. No pitch deck. If there&rsquo;s nothing worth automating, I&rsquo;ll tell you.
        </p>
        <Link
          href="/contact"
          className="inline-block no-underline bg-ink text-bg px-8 py-4 rounded-full text-[15px] font-medium"
        >
          Book a call →
        </Link>
        <div className="text-[13px] text-ink-faint mt-4">
          Or write → solomon@devsdecide.com
        </div>
      </section>

      <Footer />
    </>
  );
}
