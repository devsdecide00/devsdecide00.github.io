import type { Metadata } from 'next';
import VerticalTemplate from '../components/vertical-template';

export const metadata: Metadata = {
  title: 'AI Automation for Construction Companies in Alabama | Developers Decide',
  description: 'Bid prep, sub coordination, and owner updates automated for Alabama construction firms. Flat-rate, month-to-month. Based in Hoover, AL.',
  openGraph: {
    title: 'AI Automation for Construction Companies in Alabama | Developers Decide',
    description: 'Bid prep, sub coordination, and owner updates automated for Alabama construction firms.',
    url: 'https://devsdecide.com/construction',
    siteName: 'Developers Decide',
    type: 'website',
  },
  alternates: {
    canonical: 'https://devsdecide.com/construction',
  },
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
