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
  testimonial?: Testimonial;
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
      <section className="max-w-[1240px] mx-auto pt-10 sm:pt-[70px] pb-10 px-5 sm:px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">{tag}</div>
        <h1 className="font-display text-[clamp(56px,7vw,104px)] leading-[1.1] tracking-[-2.5px] m-0 mb-10 font-normal max-w-[1100px] pb-[0.15em]">
          {headline} <span className="italic text-accent">{italicHook}</span>
        </h1>
        <p className="text-[19px] text-ink-soft leading-[1.55] m-0 mb-10 max-w-[680px]">{lede}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="no-underline bg-ink text-bg px-[26px] py-[14px] rounded-full text-[14px] font-medium">
            Book a 30-min call →
          </Link>
          <Link href="/try-it-yourself" className="no-underline text-ink px-[26px] py-[14px] border border-rule rounded-full text-[14px]">
            Try the live demo
          </Link>
        </div>
      </section>

      {/* The grind */}
      <section className="bg-bg-deep border-t border-rule py-14 sm:py-20 px-5 sm:px-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The grind</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal max-w-[800px]">
            What&rsquo;s actually eating your week.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <section className="max-w-[1240px] mx-auto py-14 sm:py-20 px-5 sm:px-10">
        <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">The toolkit</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-1.3px] m-0 mb-10 font-normal max-w-[800px]">
          Tools we typically build for {industry.toLowerCase()}.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
      {testimonial && (
        <section className="py-14 sm:py-20 px-5 sm:px-10 bg-ink text-bg">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="text-[12px] tracking-[2px] uppercase text-sun mb-5">Testimonial</div>
            <blockquote className="font-display text-[clamp(32px,4vw,48px)] leading-[1.2] tracking-[-1px] m-0 italic font-normal">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="text-[14px] opacity-60 mt-6">— {testimonial.attribution}</div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto py-14 sm:py-20 px-5 sm:px-10">
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
      <section className="py-16 sm:py-[100px] px-5 sm:px-10 text-center">
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
