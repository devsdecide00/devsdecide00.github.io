# Port Design Handoff to Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Babel+CDN React prototype in `design_handoff_devsdecide_site/` into a production Next.js App Router site with Tailwind CSS and server-side Claude API routes.

**Architecture:** Shared layout components (Nav, Footer) wrap each page. Interactive AI features (hero demo, chat) call a `/api/ai` server route that proxies to Anthropic — no API key ever hits the browser. The contact form POSTs to `/api/contact` which stores the submission server-side and redirects to `/thank-you`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Anthropic SDK (`@anthropic-ai/sdk`), next/font (Instrument Serif + Inter)

---

## File Map

**Create:**
- `app/components/nav.tsx` — sticky nav with logo, links, active state
- `app/components/footer.tsx` — 4-column footer
- `app/components/vertical-template.tsx` — shared template for HVAC/Construction/Staffing
- `app/page.tsx` — home page (Hero, Process, FeaturedWork, Gallery, Pricing, CTA)
- `app/case-study/page.tsx` — case study page
- `app/hvac/page.tsx` — HVAC vertical (uses VerticalTemplate)
- `app/construction/page.tsx` — Construction vertical
- `app/staffing/page.tsx` — Staffing vertical
- `app/contact/page.tsx` — contact form
- `app/thank-you/page.tsx` — thank-you confirmation
- `app/try-it-yourself/page.tsx` — chat demo
- `app/not-found.tsx` — 404 page
- `app/api/ai/route.ts` — server-side Claude proxy (streaming)
- `app/api/contact/route.ts` — contact form handler (write to file / log)

**Modify:**
- `app/layout.tsx` — already done (fonts, metadata, bg-bg text-ink classes)
- `app/globals.css` — already done (design tokens)
- `.env.local` — add `ANTHROPIC_API_KEY`

---

## Task 1: Install Anthropic SDK

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install**

```bash
npm install @anthropic-ai/sdk
```

Expected output: `added N packages`

- [ ] **Step 2: Create `.env.local`**

Create `/Users/solomon/code/website/devsdecide00.github.io/.env.local` with:

```
ANTHROPIC_API_KEY=sk-ant-...
```

(User must fill in actual key — get from https://console.anthropic.com)

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add anthropic sdk"
```

---

## Task 2: Shared Nav Component

**Files:**
- Create: `app/components/nav.tsx`

- [ ] **Step 1: Create component**

Create `app/components/nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/hvac', label: 'HVAC', id: 'hvac' },
  { href: '/construction', label: 'Construction', id: 'construction' },
  { href: '/staffing', label: 'Staffing', id: 'staffing' },
  { href: '/case-study', label: 'Case study', id: 'case-study' },
  { href: '/try-it-yourself', label: 'Try it', id: 'try-it-yourself' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{ backdropFilter: 'blur(10px)' }}
      className="sticky top-0 z-50 flex items-center justify-between px-10 py-[18px] border-b border-rule bg-[rgba(250,247,242,0.94)]"
    >
      <Link href="/" className="flex items-center gap-3 no-underline text-ink">
        <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center text-bg font-display text-lg italic">
          d
        </div>
        <span className="text-[15px] font-semibold tracking-[-0.2px]">Developers Decide</span>
      </Link>

      <div className="flex items-center gap-6 text-[13.5px]">
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
          return (
            <Link
              key={l.id}
              href={l.href}
              className={`no-underline transition-colors ${active ? 'text-ink font-semibold' : 'text-ink-soft font-normal'}`}
            >
              {l.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="bg-ink text-bg no-underline px-[18px] py-[10px] rounded-full text-[13px] font-medium"
        >
          Book a call
        </Link>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓"
```

Expected: no errors, `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add app/components/nav.tsx
git commit -m "feat: add site nav component"
```

---

## Task 3: Shared Footer Component

**Files:**
- Create: `app/components/footer.tsx`

- [ ] **Step 1: Create component**

Create `app/components/footer.tsx`:

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-rule px-10 pt-12 pb-8 bg-bg">
      <div className="max-w-[1240px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-[14px]">
            <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center text-bg font-display text-lg italic">
              d
            </div>
            <span className="text-[15px] font-semibold">Developers Decide LLC</span>
          </div>
          <p className="text-[13px] text-ink-soft leading-relaxed max-w-[340px]">
            AI automation consulting for small service businesses in Alabama. Hoover, AL.
          </p>
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Industries</div>
          {['HVAC', 'Construction', 'Staffing'].map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="block text-[13px] text-ink-soft no-underline py-1"
            >
              {l}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Resources</div>
          <Link href="/case-study" className="block text-[13px] text-ink-soft no-underline py-1">Case study</Link>
          <Link href="/try-it-yourself" className="block text-[13px] text-ink-soft no-underline py-1">Try it yourself</Link>
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Contact</div>
          <a href="mailto:solomon@devsdecide.com" className="block text-[13px] text-ink-soft no-underline py-1">
            solomon@devsdecide.com
          </a>
          <Link href="/contact" className="block text-[13px] text-ink-soft no-underline py-1">Book a call</Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-6 border-t border-rule flex justify-between text-[12px] text-ink-faint">
        <span>© 2026 Developers Decide LLC</span>
        <span>Hoover, Alabama</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓"
```

- [ ] **Step 3: Commit**

```bash
git add app/components/footer.tsx
git commit -m "feat: add site footer component"
```

---

## Task 4: Claude API Route

**Files:**
- Create: `app/api/ai/route.ts`

- [ ] **Step 1: Create route**

Create `app/api/ai/route.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { prompt, messages } = await req.json();

  if (messages) {
    // Multi-turn chat (try-it-yourself)
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: messages[0]?.role === 'system' ? messages[0].content : undefined,
      messages: messages.filter((m: { role: string }) => m.role !== 'system'),
    });
    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ text });
  }

  // Single-turn (hero demo)
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return NextResponse.json({ text });
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓"
```

- [ ] **Step 3: Commit**

```bash
git add app/api/ai/route.ts
git commit -m "feat: add server-side claude api route"
```

---

## Task 5: Home Page

**Files:**
- Modify: `app/page.tsx`

This is the largest page. It has 6 sections: Hero (with live AI demo), Process, FeaturedWork, Gallery, Pricing, CTA.

- [ ] **Step 1: Write the full home page**

Replace `app/page.tsx` with:

```tsx
import Nav from './components/nav';
import Footer from './components/footer';
import HeroDemo from './components/hero-demo';
import Link from 'next/link';

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
      <section className="bg-bg-deep border-t border-rule py-[100px] px-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex justify-between items-end mb-[60px] gap-10 flex-wrap">
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
          <div className="grid grid-cols-4 gap-5">
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
      <section className="max-w-[1240px] mx-auto py-[100px] px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Featured engagement</div>
        <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.8px] m-0 mb-10 font-normal max-w-[900px]">
          Not all automation is <span className="italic">small.</span>
        </h2>
        <Link
          href="/case-study"
          className="block no-underline bg-ink text-bg rounded-[20px] p-12 grid grid-cols-[1.3fr_1fr] gap-[60px] items-center transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div>
            <div className="text-[11px] tracking-[2px] uppercase text-sun mb-4">Case study · Legal services firm</div>
            <h3 className="font-display text-[48px] leading-none tracking-[-1.5px] m-0 mb-5 font-normal">
              Automating billing sync across{' '}
              <span className="italic text-sun">three enterprise systems.</span>
            </h3>
            <p className="text-[16px] leading-[1.55] m-0 mb-6 opacity-85">
              NetSuite · AgilityBlue · Relativity. We built <em>Avalon</em> — a custom integration platform that
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
      <section className="max-w-[1240px] mx-auto pb-[100px] px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Smaller builds</div>
        <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-none tracking-[-1.8px] m-0 mb-10 font-normal max-w-[900px]">
          A few tools <span className="italic">already running</span> across Alabama.
        </h2>
        <div className="grid grid-cols-3 gap-5">
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
      <section className="py-[100px] px-10 bg-bg-deep border-t border-rule">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Pricing</div>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.8px] m-0 mb-4 font-normal">
              Flat. Simple. <span className="italic">Cancel anytime.</span>
            </h2>
            <p className="text-[16px] text-ink-soft m-0">Month-to-month. No setup fees. No year-long contracts.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-w-[1100px] mx-auto">
            {pricingTiers.map((p, i) => (
              <div
                key={i}
                className={`rounded-[20px] p-8 relative ${
                  p.featured
                    ? 'bg-ink text-bg -translate-y-2 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.3)]'
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
                  href="/contact"
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
      <section className="py-[120px] px-10 text-center max-w-[900px] mx-auto">
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home page layout (hero placeholder)"
```

---

## Task 6: Hero Demo Component (Interactive AI)

The hero has client-side state and calls the `/api/ai` route. It must be a `'use client'` component.

**Files:**
- Create: `app/components/hero-demo.tsx`

- [ ] **Step 1: Create component**

Create `app/components/hero-demo.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Plan {
  tool_name: string;
  one_liner: string;
  steps: string[];
  time_saved: string;
  monthly_value: string;
  first_week: string;
}

const industries = ['HVAC', 'Cleaning', 'Bookkeeping', 'Property Mgmt', 'Staffing', 'Construction'];

const presets: Record<string, string[]> = {
  HVAC: ['Customers texting the owner at all hours', 'Scheduling conflicts between techs', 'Quote generation takes 45min each'],
  Cleaning: ['Missed weekly client follow-ups', 'Staff shift swaps over text', 'Onboarding new accounts takes forever'],
  Bookkeeping: ['Client document chasing', 'Month-end report compilation', 'Answering same tax questions over and over'],
  'Property Mgmt': ['Maintenance request triage', 'Tenant screening back-and-forth', 'Rent collection reminders'],
  Staffing: ['Candidate screening volume', 'Client timesheet reconciliation', 'Placement follow-up lapses'],
  Construction: ['Bid compilation from specs', 'Subcontractor scheduling', 'Progress reporting to owners'],
};

export default function HeroDemo() {
  const [industry, setIndustry] = useState('HVAC');
  const [bottleneck, setBottleneck] = useState(presets['HVAC'][0]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);

  const runDemo = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const prompt = `You are an AI automation consultant for small service businesses. A ${industry} business owner says their bottleneck is: "${bottleneck}". Respond with a JSON object only, no prose, no markdown, with these keys: tool_name (short punchy name, e.g. "IntakeRelay"), one_liner (one sentence describing the tool), steps (array of exactly 3 short strings, each a step the tool performs), time_saved (string like "~12 hrs/week"), monthly_value (string like "$3,400/mo"), first_week (string: what happens in week 1 of deployment). Be specific to ${industry}.`;
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const match = data.text?.match(/\{[\s\S]*\}/);
      if (match) setPlan(JSON.parse(match[0]));
    } catch {
      setPlan({
        tool_name: 'DemoUnavailable',
        one_liner: 'Live demo offline right now — book a call and I will sketch this for your business.',
        steps: ['Listen to the specific grind', 'Prototype against real data', 'Deploy and train your team'],
        time_saved: '~10 hrs/wk',
        monthly_value: '$2,800/mo',
        first_week: 'Scoped proposal within 48 hours.',
      });
    }
    setLoading(false);
  };

  return (
    <section className="max-w-[1240px] mx-auto py-[70px] px-10 pb-20">
      <div className="inline-flex items-center gap-2 bg-accent-soft px-[14px] py-[7px] rounded-full text-[12px] text-accent font-medium mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[ddpulse_2s_infinite]" />
        Live demo · no signup · powered by Claude
      </div>

      <h1 className="font-display text-[clamp(56px,7vw,104px)] leading-[1.1] tracking-[-2.5px] m-0 mb-9 font-normal max-w-[1100px] pb-[0.15em]">
        Don&rsquo;t take my word for it.<br />
        <span className="italic text-accent">Watch AI solve</span> your bottleneck in 10 seconds.
      </h1>

      <p className="text-[19px] text-ink-soft leading-[1.55] m-0 mb-12 max-w-[620px]">
        Pick your industry, tell me what&rsquo;s grinding, and an AI will sketch a custom automation right here.
        If it looks promising, we&rsquo;ll build the real one together.
      </p>

      <div className="bg-white border border-rule rounded-[20px] p-8 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.12),0_8px_20px_-8px_rgba(26,24,20,0.06)]">
        <div className="grid grid-cols-2 gap-10">
          {/* Left: controls */}
          <div>
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">01 · Industry</div>
            <div className="flex flex-wrap gap-1.5 mb-7">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => { setIndustry(ind); setBottleneck(presets[ind][0]); setPlan(null); }}
                  className={`px-[14px] py-2 rounded-full text-[13px] cursor-pointer font-[inherit] border transition-colors ${
                    industry === ind
                      ? 'bg-ink text-bg border-ink'
                      : 'bg-transparent text-ink-soft border-rule'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">02 · The bottleneck</div>
            <textarea
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              className="w-full bg-bg border border-rule rounded-[10px] p-[14px] font-[inherit] text-[15px] text-ink resize-none outline-none min-h-[90px] leading-[1.5]"
            />
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {presets[industry].map((p) => (
                <button
                  key={p}
                  onClick={() => { setBottleneck(p); setPlan(null); }}
                  className="bg-transparent text-ink-faint border border-dashed border-rule px-2.5 py-[5px] rounded-md text-[11px] cursor-pointer font-[inherit]"
                >
                  {p.length > 40 ? p.slice(0, 40) + '…' : p}
                </button>
              ))}
            </div>

            <button
              onClick={runDemo}
              disabled={loading}
              className="mt-6 w-full bg-accent text-white border-none py-4 rounded-xl font-[inherit] text-[15px] font-semibold cursor-pointer tracking-[0.2px] disabled:cursor-wait"
            >
              {loading ? 'Analyzing bottleneck…' : 'Generate automation plan →'}
            </button>
          </div>

          {/* Right: result */}
          <div className="bg-bg rounded-[14px] p-7 border border-rule min-h-[380px] flex flex-col">
            {!plan && !loading && (
              <div className="text-ink-faint text-[14px] m-auto text-center max-w-[240px]">
                <div className="font-display italic text-[28px] text-ink mb-3">Waiting on you.</div>
                Pick an industry, describe what&rsquo;s eating the week, hit generate.
              </div>
            )}

            {loading && (
              <div className="m-auto text-center">
                <div className="flex gap-1.5 justify-center mb-[14px]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent"
                      style={{ animation: `ddbounce 1.2s ease infinite ${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <div className="text-[13px] text-ink-faint">Sketching your tool…</div>
              </div>
            )}

            {plan && (
              <div>
                <div className="text-[11px] tracking-[1.5px] uppercase text-accent mb-2.5">Proposed tool</div>
                <div className="font-display text-[34px] tracking-[-1px] mb-1.5 italic">{plan.tool_name}</div>
                <div className="text-[14px] text-ink-soft mb-5 leading-[1.5]">{plan.one_liner}</div>

                <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">What it does</div>
                {plan.steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 py-2 text-[13px] ${i < plan.steps.length - 1 ? 'border-b border-rule' : ''}`}
                  >
                    <span className="text-accent font-semibold">0{i + 1}</span>
                    <span className="text-ink leading-[1.5]">{s}</span>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-dashed border-rule">
                  <div className="bg-white p-[14px] rounded-[10px]">
                    <div className="text-[10px] tracking-[1.2px] text-ink-faint uppercase">Time saved</div>
                    <div className="font-display text-[22px] text-accent mt-1">{plan.time_saved}</div>
                  </div>
                  <div className="bg-white p-[14px] rounded-[10px]">
                    <div className="text-[10px] tracking-[1.2px] text-ink-faint uppercase">Monthly value</div>
                    <div className="font-display text-[22px] text-accent mt-1">{plan.monthly_value}</div>
                  </div>
                </div>

                <div className="mt-[18px] p-[14px] bg-accent-soft rounded-[10px] text-[12px] text-accent leading-[1.5]">
                  <strong>Week 1:</strong> {plan.first_week}
                </div>

                <Link
                  href="/contact"
                  className="block text-center no-underline mt-4 w-full bg-ink text-bg py-[13px] rounded-[10px] font-[inherit] text-[14px] font-medium"
                >
                  Book a call to build the real one →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-9 text-[13px] text-ink-faint flex-wrap">
        <div>◆ 47 tools deployed across Alabama</div>
        <div>◆ $180k median annual recovery</div>
        <div>◆ Month-to-month · cancel anytime</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add keyframe animations to globals.css**

Edit `app/globals.css` — append these keyframes:

```css
@keyframes ddpulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes ddbounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
  40% { transform: translateY(-8px); opacity: 1; }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add app/components/hero-demo.tsx app/globals.css
git commit -m "feat: add interactive hero demo component"
```

---

## Task 7: Vertical Template + HVAC / Construction / Staffing Pages

**Files:**
- Create: `app/components/vertical-template.tsx`
- Create: `app/hvac/page.tsx`
- Create: `app/construction/page.tsx`
- Create: `app/staffing/page.tsx`

- [ ] **Step 1: Create vertical-template.tsx**

Create `app/components/vertical-template.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from './nav';
import Footer from './footer';

interface Bottleneck {
  title: string;
  desc: string;
}

interface Tool {
  name: string;
  desc: string;
  impact: string;
}

interface Testimonial {
  quote: string;
  attribution: string;
}

interface Faq {
  q: string;
  a: string;
}

interface VerticalTemplateProps {
  tag: string;
  headline: string;
  italicHook: string;
  lede: string;
  industry: string;
  bottlenecks: Bottleneck[];
  tools: Tool[];
  testimonial: Testimonial;
  faqs: Faq[];
}

export default function VerticalTemplate({
  tag,
  headline,
  italicHook,
  lede,
  industry,
  bottlenecks,
  tools,
  testimonial,
  faqs,
}: VerticalTemplateProps) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1240px] mx-auto pt-[70px] pb-10 px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">{tag}</div>
        <h1 className="font-display text-[clamp(56px,7vw,104px)] leading-[1.1] tracking-[-2.5px] m-0 mb-10 font-normal max-w-[1100px] pb-[0.15em]">
          {headline} <span className="italic text-accent">{italicHook}</span>
        </h1>
        <p className="text-[19px] text-ink-soft leading-[1.55] m-0 mb-10 max-w-[680px]">{lede}</p>
        <div className="flex gap-3">
          <Link href="/contact" className="no-underline bg-ink text-bg px-[26px] py-[14px] rounded-full text-[14px] font-medium">
            Book a 30-min call →
          </Link>
          <Link href="/try-it-yourself" className="no-underline text-ink px-[26px] py-[14px] border border-rule rounded-full text-[14px]">
            Try the live demo
          </Link>
        </div>
      </section>

      {/* The grind */}
      <section className="bg-bg-deep border-t border-rule py-20 px-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The grind</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal max-w-[800px]">
            What&rsquo;s actually eating your week.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {bottlenecks.map((b, i) => (
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

      {/* The toolkit */}
      <section className="max-w-[1240px] mx-auto py-20 px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The toolkit</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal max-w-[800px]">
          Tools we typically build for {industry.toLowerCase()}.
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {tools.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-rule flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center font-display text-[22px] italic shrink-0">
                {t.name[0]}
              </div>
              <div>
                <div className="font-display text-[26px] tracking-[-0.5px] mb-2 italic">{t.name}</div>
                <div className="text-[14px] text-ink-soft leading-[1.55] mb-3">{t.desc}</div>
                <div className="text-[12px] text-accent font-medium">◆ {t.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-10 bg-ink text-bg">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="text-[12px] tracking-[2px] uppercase text-sun mb-5">[PLACEHOLDER] Testimonial</div>
          <blockquote className="font-display text-[clamp(32px,4vw,48px)] leading-[1.2] tracking-[-1px] m-0 italic font-normal">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="text-[14px] opacity-60 mt-6">— {testimonial.attribution}</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto py-20 px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Common questions</div>
        <h2 className="font-display text-[48px] leading-none tracking-[-1.5px] m-0 mb-8 font-normal">Before you book.</h2>
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-rule py-5">
            <button
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              className="w-full text-left bg-transparent border-none p-0 cursor-pointer flex justify-between items-center font-[inherit] text-ink text-[17px] font-medium"
            >
              {f.q}
              <span className="text-accent text-[22px] font-display">{openFaq === i ? '−' : '+'}</span>
            </button>
            {openFaq === i && (
              <div className="text-[15px] text-ink-soft leading-[1.6] mt-3 max-w-[700px]">{f.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="py-[100px] px-10 text-center">
        <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-2.5px] m-0 mb-7 font-normal">
          Ready to stop doing this <span className="italic text-accent">by hand?</span>
        </h2>
        <Link
          href="/contact"
          className="inline-block no-underline bg-ink text-bg px-[30px] py-[15px] rounded-full text-[14px] font-medium mt-[14px]"
        >
          Book a call →
        </Link>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create app/hvac/page.tsx**

Create `app/hvac/page.tsx`:

```tsx
import VerticalTemplate from '../components/vertical-template';

export const metadata = {
  title: 'AI Automation for HVAC Companies | Developers Decide',
  description: 'Dispatching, intake, quotes, and follow-up automated for Alabama HVAC businesses.',
};

export default function HVACPage() {
  return (
    <VerticalTemplate
      industry="HVAC"
      tag="HVAC · Alabama"
      headline="Your techs fix HVAC."
      italicHook="Let AI fix the rest."
      lede="Dispatching, intake, quotes, follow-up — the non-wrench work that eats your evenings and Saturdays. We automate it so your crew stays on the trucks and you get your weekends back."
      bottlenecks={[
        { title: 'Customer texts at 9pm', desc: "Emergency or can-wait? Owner decides every time, on the phone, from the couch." },
        { title: 'Dispatch chaos', desc: "Three techs, seven service calls, changing priorities. Done on a whiteboard that's always wrong." },
        { title: 'Quote turnaround', desc: "Site visit → office → spreadsheet → PDF → email. Forty-five minutes, customer ghosts." },
      ]}
      tools={[
        { name: 'IntakeRelay', desc: 'Texts triaged by urgency, routine requests auto-replied with a booking link, urgent ones paged to the on-call tech.', impact: '14 hrs/week saved' },
        { name: 'DispatchCompass', desc: "Given today's calls and tech locations, generates an optimal route and updates customers automatically as ETAs shift.", impact: '2 extra calls/day per truck' },
        { name: 'QuoteDraft', desc: 'Tech dictates site notes; a polished quote with line items and photos lands in the customer\'s inbox before the truck pulls away.', impact: '45 min → 4 min per quote' },
        { name: 'FollowLoop', desc: 'Post-service check-ins, review requests, seasonal maintenance reminders — handled without touching the CRM.', impact: '3× review volume' },
      ]}
      testimonial={{ quote: "We stopped losing jobs because we stopped losing hours. My wife actually asked if I got a new job because I was home for dinner.", attribution: '[PLACEHOLDER] Owner · HVAC company · Birmingham metro' }}
      faqs={[
        { q: 'Does this replace my dispatcher?', a: 'No. It makes one dispatcher do the work of three, and takes the after-hours triage off whoever is drawing the short straw. You keep the human who knows the customers.' },
        { q: 'What about ServiceTitan / Housecall Pro?', a: 'We integrate with whatever you use. The automation sits alongside your existing CRM — nobody has to learn a new tool or migrate data.' },
        { q: 'How long until something is actually running?', a: 'First tool deployed in two weeks. You pick which bottleneck hurts the most; we start there.' },
        { q: "What if my team hates it?", a: "We train them until they own it. If it's not saving hours within 30 days, cancel the retainer — no hard feelings, we keep building." },
      ]}
    />
  );
}
```

- [ ] **Step 3: Create app/construction/page.tsx**

Create `app/construction/page.tsx`:

```tsx
import VerticalTemplate from '../components/vertical-template';

export const metadata = {
  title: 'AI Automation for Construction Companies | Developers Decide',
  description: 'Bid prep, sub coordination, and owner updates automated for Alabama construction firms.',
};

export default function ConstructionPage() {
  return (
    <VerticalTemplate
      industry="Construction"
      tag="Construction · Alabama"
      headline="Build more."
      italicHook="Bid less."
      lede="Bid prep, sub coordination, progress updates to owners — the paperwork that shouldn't cost you a job you could have won. We automate the office so you can stay on the site."
      bottlenecks={[
        { title: 'Bid compilation', desc: 'Plans in. Materials list by hand. Sub pricing by phone. Eight hours for something the owner will change tomorrow.' },
        { title: 'Sub scheduling', desc: 'Sixteen trades, a weather forecast, a tight sequence. Done in texts and prayer.' },
        { title: 'Owner updates', desc: 'Weekly progress reports. Photos, punch list, next-week plan. Always late because the PM is actually managing.' },
      ]}
      tools={[
        { name: 'BidBuilder', desc: 'Upload a plan PDF. Out the other side: materials takeoff, sub RFQ emails sent, consolidated bid draft for your review.', impact: '8 hrs → 45 min per bid' },
        { name: 'TradeFlow', desc: "Generates a sub schedule from the project plan, re-sequences on weather/delays, texts each sub only when their window changes.", impact: '22 fewer hours/mo in texts' },
        { name: 'OwnerWeekly', desc: "PM dictates a 3-minute voice note. Owner gets a polished PDF with photos, progress %, and next week's plan by Friday noon.", impact: '100% on-time reporting' },
        { name: 'ChangeCatch', desc: 'Watches plan revisions, flags scope changes, drafts the change-order with dollar impact before the owner asks.', impact: '+$8k/mo captured' },
      ]}
      testimonial={{ quote: "We were leaving money on the table every time an owner changed scope. Now the change order is already drafted when we bring it up. Closes the conversation.", attribution: '[PLACEHOLDER] GC · Mid-size commercial firm · Tuscaloosa' }}
      faqs={[
        { q: 'Do you integrate with Procore / Buildertrend?', a: 'Yes. The automations read and write to whatever project management system you already run. No migration, no new logins for your team.' },
        { q: 'Will this work for residential too?', a: 'The same tools scale down. Smaller projects, same bottlenecks — bid prep, sub scheduling, customer updates.' },
        { q: 'What about drawings and PDFs with weird formatting?', a: 'AI reads messy plans, spec sheets, and marked-up PDFs reliably. It surfaces ambiguity instead of guessing — you approve before anything goes out.' },
        { q: 'Can I start with just one tool?', a: "That's the recommended path. Pick the worst bottleneck, prove it in two weeks, then expand." },
      ]}
    />
  );
}
```

- [ ] **Step 4: Create app/staffing/page.tsx**

Create `app/staffing/page.tsx`:

```tsx
import VerticalTemplate from '../components/vertical-template';

export const metadata = {
  title: 'AI Automation for Staffing Agencies | Developers Decide',
  description: 'Résumé screening, interview scheduling, and timesheet reconciliation automated for Alabama staffing firms.',
};

export default function StaffingPage() {
  return (
    <VerticalTemplate
      industry="Staffing"
      tag="Staffing · Alabama"
      headline="More placements."
      italicHook="Less résumé triage."
      lede="Screening, interview coordination, timesheet reconciliation, placement follow-up. The work that keeps your recruiters from recruiting. We automate the busywork so your team closes more."
      bottlenecks={[
        { title: 'Résumé volume', desc: 'Two hundred applicants for one role. Three seconds per résumé or eight hours of life.' },
        { title: 'Interview scheduling', desc: 'Candidate, hiring manager, two coordinators. Fifteen emails to settle one 30-minute slot.' },
        { title: 'Timesheet wrangling', desc: "End of week: candidates, clients, approvals, back-and-forth over hours that don't match." },
      ]}
      tools={[
        { name: 'FitCheck', desc: 'Candidates scored against the open role with reasoning — not keywords. Top 5 surface with pre-drafted interview questions specific to each résumé.', impact: '+31% placement rate' },
        { name: 'SlotBroker', desc: 'Books interview slots across candidate, hiring manager, and coordinator automatically. Reschedules itself when cancellations happen.', impact: '15 emails → 0' },
        { name: 'TimeReconcile', desc: 'Pulls timesheets, flags mismatches between candidate and client submissions, drafts the clarifying email you\'d write anyway.', impact: 'Friday night → Friday 3pm' },
        { name: 'PlacementPulse', desc: '30-60-90 check-ins with every placement. Surfaces flight risks, celebrates wins, gives you language for the next conversation.', impact: '2× retention at 90 days' },
      ]}
      testimonial={{ quote: "My recruiters spent half their time on résumé triage. Now they spend it on the phone with candidates. Our placement count doubled in a quarter.", attribution: '[PLACEHOLDER] Ops director · Staffing firm · Montgomery' }}
      faqs={[
        { q: 'Will this work with Bullhorn / JobDiva?', a: 'Yes. Automations read and write to your existing ATS. Recruiters stay in the tool they know.' },
        { q: 'How do you prevent bias in candidate scoring?', a: "Every score comes with explicit reasoning tied to the job description. Recruiters see the why and can override — AI surfaces candidates, it doesn't decide for you." },
        { q: 'What about compliance and data privacy?', a: "Candidate data stays in your systems. We don't train on your data, don't retain it, don't share it. Happy to sign DPAs." },
        { q: 'Can this handle specialty placement?', a: 'Nursing, trades, executive — the narrower the role, the better AI scoring does against bad keyword matches.' },
      ]}
    />
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

Expected: routes for `/hvac`, `/construction`, `/staffing` appear

- [ ] **Step 6: Commit**

```bash
git add app/components/vertical-template.tsx app/hvac/page.tsx app/construction/page.tsx app/staffing/page.tsx
git commit -m "feat: add vertical template and HVAC/Construction/Staffing pages"
```

---

## Task 8: Case Study Page

**Files:**
- Create: `app/case-study/page.tsx`

- [ ] **Step 1: Create page**

Create `app/case-study/page.tsx`:

```tsx
import Nav from '../components/nav';
import Footer from '../components/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Legal Billing Integration Case Study | Developers Decide',
  description: 'How we built Avalon — a custom integration platform automating billing sync across NetSuite, AgilityBlue, and Relativity for a legal services firm.',
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
          We built <span className="italic text-accent">Avalon.</span>
        </h2>
        <div className="bg-ink text-bg rounded-[20px] p-12 grid grid-cols-[1.3fr_1fr] gap-[60px] items-center">
          <div>
            <div className="text-[11px] tracking-[2px] uppercase text-sun mb-4">Custom integration platform</div>
            <p className="text-[17px] leading-[1.6] m-0 mb-5 opacity-90">
              A Spring Boot service with a React admin dashboard that serves as the connective tissue between all
              three platforms. On a configurable schedule — nightly, end-of-month, or on demand — Avalon pulls,
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
            What Avalon actually does, <span className="italic">every night.</span>
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
            &ldquo;Every data point that Avalon now moves automatically used to require a person to move it by
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

- [ ] **Step 3: Commit**

```bash
git add app/case-study/page.tsx
git commit -m "feat: add case study page"
```

---

## Task 9: Contact Page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create API route**

Create `app/api/contact/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Log submission server-side (replace with email/CRM in production)
  console.log('[Contact form]', JSON.stringify(body));
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Create contact page**

Create `app/contact/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/nav';
import Footer from '../components/footer';

const industries = ['HVAC', 'Cleaning', 'Bookkeeping', 'Property Mgmt', 'Staffing', 'Construction', 'Other'];
const budgets = ['Starter · $1,500/mo', 'Growth · $2,500/mo', "Custom · let's scope it", 'Just exploring'];

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    industry: 'HVAC',
    bottleneck: '',
    budget: 'Starter · $1,500/mo',
  });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    // Store locally for thank-you page to read
    try { localStorage.setItem('dd_last_inquiry', JSON.stringify(form)); } catch {}
    router.push('/thank-you');
  };

  const inputClass = 'w-full bg-bg border border-rule rounded-[10px] px-[14px] py-3 font-[inherit] text-[15px] text-ink outline-none';
  const labelClass = 'block text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2';

  return (
    <>
      <Nav />
      <section className="max-w-[1080px] mx-auto pt-[70px] pb-[100px] px-10 grid grid-cols-[1fr_1.2fr] gap-20">
        {/* Left info */}
        <div>
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Book a call</div>
          <h1 className="font-display text-[72px] leading-[1.05] tracking-[-2.5px] m-0 mb-7 font-normal">
            Thirty minutes. <span className="italic text-accent">No pitch.</span>
          </h1>
          <p className="text-[17px] text-ink-soft leading-[1.6] m-0 mb-9">
            Tell me about a typical Tuesday at your business. I listen for what&rsquo;s repeated. If there&rsquo;s
            nothing worth automating, I&rsquo;ll tell you.
          </p>
          <div className="bg-bg-deep rounded-[14px] p-[22px] mb-5">
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Direct</div>
            <div className="text-[15px] text-ink mb-1.5">solomon@devsdecide.com</div>
            <div className="text-[13px] text-ink-soft">Hoover, Alabama · replies within one business day</div>
          </div>
          <div className="bg-bg-deep rounded-[14px] p-[22px]">
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">What to expect</div>
            {['30 min Zoom or phone', 'I ask questions, you answer', 'You get a one-pager the next day', 'No follow-up spam, ever'].map(
              (x) => (
                <div key={x} className="text-[13px] py-[5px] text-ink-soft flex gap-2.5">
                  <span className="text-accent">◆</span>
                  {x}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right form */}
        <form
          onSubmit={onSubmit}
          className="bg-white border border-rule rounded-[20px] p-9"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Your name</label>
              <input required value={form.name} onChange={(e) => upd('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input required value={form.company} onChange={(e) => upd('company', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>Email</label>
            <input required type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} className={inputClass} />
          </div>

          <div className="mb-4">
            <label className={labelClass}>Industry</label>
            <div className="flex flex-wrap gap-1.5">
              {industries.map((ind) => (
                <button
                  type="button"
                  key={ind}
                  onClick={() => upd('industry', ind)}
                  className={`px-[13px] py-[7px] rounded-full text-[12px] cursor-pointer font-[inherit] border ${
                    form.industry === ind ? 'bg-ink text-bg border-ink' : 'bg-transparent text-ink-soft border-rule'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>What&rsquo;s grinding?</label>
            <textarea
              value={form.bottleneck}
              onChange={(e) => upd('bottleneck', e.target.value)}
              placeholder="The most repetitive, soul-crushing part of your week…"
              className={`${inputClass} min-h-[120px] resize-y leading-[1.5]`}
            />
          </div>

          <div className="mb-7">
            <label className={labelClass}>Rough budget</label>
            <div className="flex flex-col gap-1.5">
              {budgets.map((b) => (
                <label
                  key={b}
                  className={`flex items-center gap-2.5 text-[13px] px-3 py-2 border rounded-lg cursor-pointer ${
                    form.budget === b ? 'border-ink bg-bg' : 'border-rule bg-white'
                  }`}
                >
                  <input type="radio" checked={form.budget === b} onChange={() => upd('budget', b)} />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white border-none py-4 rounded-xl font-[inherit] text-[15px] font-semibold cursor-pointer"
          >
            Send it →
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx app/api/contact/route.ts
git commit -m "feat: add contact page and form handler"
```

---

## Task 10: Thank-You Page

**Files:**
- Create: `app/thank-you/page.tsx`

- [ ] **Step 1: Create page**

Create `app/thank-you/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import Footer from '../components/footer';

interface Inquiry {
  name: string;
  company: string;
  industry: string;
  budget: string;
}

export default function ThankYouPage() {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dd_last_inquiry');
      if (raw) setInquiry(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <>
      <Nav />
      <section className="max-w-[820px] mx-auto py-[120px] px-10 text-center">
        <div className="inline-block px-[18px] py-2 rounded-full bg-accent-soft text-accent text-[12px] tracking-[1.5px] uppercase mb-7">
          Received ✓
        </div>
        <h1 className="font-display text-[clamp(56px,8vw,104px)] leading-[1.05] tracking-[-3px] m-0 mb-7 font-normal">
          Got it{inquiry?.name ? `, ${inquiry.name.split(' ')[0]}` : ''}.{' '}
          <span className="italic text-accent">Now I listen.</span>
        </h1>
        <p className="text-[18px] text-ink-soft mx-auto mb-10 leading-[1.55] max-w-[580px]">
          You&rsquo;ll hear from me within one business day — usually faster. I&rsquo;ll propose a few times for a
          30-minute call.
        </p>

        {inquiry && (
          <div className="bg-white border border-rule rounded-[14px] p-6 text-left max-w-[520px] mx-auto mb-10">
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">What I received</div>
            {([['Company', inquiry.company], ['Industry', inquiry.industry], ['Budget', inquiry.budget]] as const).map(
              ([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-rule text-[13px]">
                  <span className="text-ink-faint">{k}</span>
                  <span className="text-ink">{v}</span>
                </div>
              )
            )}
          </div>
        )}

        <Link href="/try-it-yourself" className="inline-block no-underline bg-ink text-bg px-[30px] py-[15px] rounded-full text-[14px] font-medium mr-3">
          Try the live demo →
        </Link>
        <Link href="/" className="inline-block no-underline text-ink px-[30px] py-[15px] text-[14px]">
          ← Back home
        </Link>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

- [ ] **Step 3: Commit**

```bash
git add app/thank-you/page.tsx
git commit -m "feat: add thank-you page"
```

---

## Task 11: Try-It-Yourself Page

**Files:**
- Create: `app/try-it-yourself/page.tsx`

- [ ] **Step 1: Create page**

Create `app/try-it-yourself/page.tsx`:

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import Footer from '../components/footer';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const scenarios = [
  'HVAC dispatcher drowning in texts',
  'Cleaning company juggling shift swaps',
  'Bookkeeper chasing docs',
  'Property mgr triaging maintenance',
  'Staffing agency screening candidates',
  'Construction bid compilation',
];

const personas = ['Owner-operator', 'Ops director', 'Office manager', 'Finance lead'];

export default function TryItYourselfPage() {
  const [scenario, setScenario] = useState(scenarios[0]);
  const [persona, setPersona] = useState(personas[0]);
  const [convo, setConvo] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convo, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next: Message[] = [...convo, { role: 'user', text: input }];
    setConvo(next);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = `You are Solomon, an AI automation consultant at Developers Decide LLC in Hoover Alabama. You're on a discovery call with a ${persona} at a business matching this scenario: "${scenario}". Your style: warm, specific, ask one pointed question at a time, never pitch, never list bullets, no bold. Max 3 sentences per reply. Goal: surface the single most repetitive bottleneck in their week, then propose a concrete AI tool name with a one-line description.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...next.map((m) => ({ role: m.role, content: m.text })),
      ];

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      setConvo([...next, { role: 'assistant', text: data.text?.trim() ?? '' }]);
    } catch {
      setConvo([...next, { role: 'assistant', text: "Hmm, connection hiccup. Tell me this though — what was the last thing that made you wish a robot could just handle it?" }]);
    }
    setLoading(false);
  };

  const reset = () => setConvo([]);

  return (
    <>
      <Nav />
      <section className="max-w-[1240px] mx-auto py-14 px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Try it yourself · live</div>
        <h1 className="font-display text-[clamp(48px,6vw,88px)] leading-[1.05] tracking-[-2.5px] m-0 mb-6 font-normal max-w-[1000px]">
          A <span className="italic text-accent">practice discovery call</span>, run by AI.
        </h1>
        <p className="text-[17px] text-ink-soft leading-[1.6] m-0 mb-10 max-w-[680px]">
          Pick a scenario and a persona. You play the business owner; the AI plays me. When it names a tool, book a
          real call and we&rsquo;ll build the real one.
        </p>

        <div className="grid grid-cols-[1fr_2fr] gap-8 items-start">
          {/* Left controls */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">Scenario</div>
              <div className="flex flex-col gap-1.5">
                {scenarios.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setScenario(s); reset(); }}
                    className={`text-left px-[14px] py-2.5 rounded-[10px] text-[13px] cursor-pointer font-[inherit] border ${
                      scenario === s ? 'bg-ink text-bg border-ink' : 'bg-white text-ink-soft border-rule'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">You are</div>
              <div className="flex flex-wrap gap-1.5">
                {personas.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPersona(p); reset(); }}
                    className={`px-[13px] py-[7px] rounded-full text-[12px] cursor-pointer font-[inherit] border ${
                      persona === p ? 'bg-ink text-bg border-ink' : 'bg-transparent text-ink-soft border-rule'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="bg-transparent text-ink-faint border border-dashed border-rule py-2.5 rounded-lg text-[12px] cursor-pointer font-[inherit]"
            >
              ↻ Reset conversation
            </button>
          </div>

          {/* Right chat */}
          <div className="bg-white border border-rule rounded-[20px] p-6 min-h-[560px] flex flex-col shadow-[0_20px_40px_-20px_rgba(26,24,20,0.1)]">
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-[14px] min-h-[400px] max-h-[500px]">
              {convo.length === 0 && (
                <div className="text-ink-faint text-[14px] m-auto text-center max-w-[320px]">
                  <div className="font-display italic text-[28px] text-ink mb-3">Start talking.</div>
                  Say anything. &ldquo;Hey, we&rsquo;re drowning in X&rdquo; works fine.
                </div>
              )}
              {convo.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-[14px] text-[14px] leading-[1.5] ${
                      m.role === 'user' ? 'bg-accent text-white' : 'bg-bg text-ink'
                    }`}
                  >
                    <div className="text-[10px] tracking-[1.2px] uppercase opacity-60 mb-1">
                      {m.role === 'user' ? 'You' : 'Solomon (AI)'}
                    </div>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 px-4 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-ink-faint"
                      style={{ animation: `ddbounce 1.2s ease infinite ${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2.5 mt-[18px] pt-[18px] border-t border-rule"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your side of the conversation…"
                className="flex-1 bg-bg border border-rule rounded-[10px] px-[14px] py-3 font-[inherit] text-[14px] outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-ink text-bg border-none px-5 rounded-[10px] font-[inherit] text-[14px] font-medium cursor-pointer disabled:cursor-wait"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-[60px] p-10 bg-bg-deep rounded-2xl">
          <div className="font-display text-[36px] tracking-[-1px] m-0 mb-3 font-normal">
            Done practicing?{' '}
            <span className="italic text-accent">Let&rsquo;s do the real one.</span>
          </div>
          <Link
            href="/contact"
            className="inline-block no-underline bg-ink text-bg px-7 py-[14px] rounded-full text-[14px] font-medium mt-2"
          >
            Book a call →
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error|✓|Route"
```

- [ ] **Step 3: Commit**

```bash
git add app/try-it-yourself/page.tsx
git commit -m "feat: add try-it-yourself chat page"
```

---

## Task 12: 404 Page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create not-found page**

Create `app/not-found.tsx`:

```tsx
import Link from 'next/link';
import Nav from './components/nav';
import Footer from './components/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="max-w-[780px] mx-auto py-[120px] px-10 text-center">
        <div className="font-display text-[180px] text-accent leading-none tracking-[-6px] italic mb-5">404</div>
        <h1 className="font-display text-[56px] leading-none tracking-[-2px] m-0 mb-5 font-normal">
          This page got <span className="italic">automated away.</span>
        </h1>
        <p className="text-[17px] text-ink-soft m-0 mb-9 leading-[1.55]">
          Probably never existed. Maybe I moved it. Either way, let&rsquo;s get you somewhere useful.
        </p>
        <Link href="/" className="inline-block no-underline bg-ink text-bg px-7 py-[14px] rounded-full text-[14px] font-medium mr-2.5">
          Home →
        </Link>
        <Link href="/try-it-yourself" className="inline-block no-underline text-ink px-7 py-[14px] text-[14px] border border-ink rounded-full">
          Try the demo
        </Link>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify full build**

```bash
npm run build 2>&1 | tail -30
```

Expected: all routes listed, 0 errors

- [ ] **Step 3: Final commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add 404 page"
```

---

## Task 13: Smoke Test Dev Server

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visit each route and verify**

Open browser and check:
- `/` — home page loads, hero demo card visible
- `/hvac` — vertical page loads
- `/construction` — vertical page loads
- `/staffing` — vertical page loads
- `/case-study` — case study loads
- `/contact` — form renders
- `/thank-you` — confirmation page (without inquiry data yet, headline still shows)
- `/try-it-yourself` — chat UI renders
- `/nonexistent` — 404 page shows

- [ ] **Step 3: Test hero AI demo**

Add `ANTHROPIC_API_KEY` to `.env.local`, restart dev server, click "Generate automation plan →". Verify the plan card populates.

- [ ] **Step 4: Test contact form flow**

Submit the contact form → should redirect to `/thank-you` with the submitted data echoed back.

- [ ] **Step 5: Test try-it-yourself chat**

Select a scenario, type a message, verify the AI responds.

- [ ] **Step 6: Commit .env.local to .gitignore check**

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` is listed (it already is from the scaffold)

---

## Task 14: Update .gitignore and Add Sitemap

**Files:**
- Modify: `.gitignore`
- Create: `app/sitemap.ts`
- Create: `public/robots.txt`

- [ ] **Step 1: Add sitemap**

Create `app/sitemap.ts`:

```ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://devsdecide.com';
  const routes = ['', '/hvac', '/construction', '/staffing', '/case-study', '/contact', '/try-it-yourself'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Add robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://devsdecide.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts public/robots.txt
git commit -m "feat: add sitemap and robots.txt"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Nav with logo + links + active state | Task 2 |
| Footer 4-column | Task 3 |
| Claude API server route | Task 4 |
| Hero with AI demo (industry chips, bottleneck, plan card) | Task 6 |
| Process 4-step grid | Task 5 |
| Featured case study band | Task 5 |
| Gallery 6 cards | Task 5 |
| Pricing 3 tiers, featured card | Task 5 |
| Final CTA | Task 5 |
| Case study all sections | Task 8 |
| HVAC vertical | Task 7 |
| Construction vertical | Task 7 |
| Staffing vertical | Task 7 |
| Contact form | Task 9 |
| Thank-you page with echoed data | Task 10 |
| Try-it-yourself multi-turn chat | Task 11 |
| 404 page | Task 12 |
| ddpulse + ddbounce animations | Task 6 |
| Sitemap + robots.txt | Task 14 |
| SEO metadata per page | Tasks 7, 8, 9 (layout handles home) |
