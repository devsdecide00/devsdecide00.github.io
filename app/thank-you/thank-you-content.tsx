'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Inquiry {
  name: string;
  company: string;
  industry: string;
  teamSize: string;
}

export default function ThankYouContent() {
  const [inquiry] = useState<Inquiry | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('dd_last_inquiry');
      return raw ? JSON.parse(raw) as Inquiry : null;
    } catch {
      return null;
    }
  });

  return (
    <section className="max-w-[720px] mx-auto w-full pt-12 sm:pt-20 pb-20 px-5">
      <div className="w-16 h-16 rounded-full bg-mint border-[3px] border-ink flex items-center justify-center text-[30px] font-extrabold mb-8 rotate-[-6deg]">
        ✓
      </div>
      <h1 className="font-extrabold text-[clamp(48px,12vw,84px)] leading-[0.92] tracking-[-2.5px] m-0 mb-6 [font-stretch:88%]">
        Got it{inquiry?.name ? `, ${inquiry.name.split(' ')[0]}` : ''}.
      </h1>
      <p className="text-[19px] sm:text-[21px] leading-[1.5] text-ink-soft m-0 mb-10 max-w-[560px]">
        You&rsquo;ll hear from me within one business day, usually sooner, with a few times for your 45-minute call.
      </p>

      {inquiry && (
        <dl className="bg-bg-deep border-[3px] border-ink rounded-[22px] p-6 m-0 mb-10 max-w-[520px]">
          <div className="font-extrabold text-[20px] mb-3">What I received</div>
          {([['Company', inquiry.company || '—'], ['Business', inquiry.industry], ['Team size', inquiry.teamSize]] as const).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2 border-b-2 border-ink/10 last:border-b-0 text-[17px]">
              <dt className="text-ink-faint">{k}</dt>
              <dd className="m-0 font-semibold text-right">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      <Link href="/" className="inline-block no-underline text-ink font-bold text-[18px] underline decoration-accent decoration-[3px] underline-offset-4">
        Back to the homepage
      </Link>
    </section>
  );
}
