'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Inquiry {
  name: string;
  company: string;
  industry: string;
  budget: string;
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
  );
}
