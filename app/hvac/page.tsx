import type { Metadata } from 'next';
import VerticalTemplate from '../components/vertical-template';

export const metadata: Metadata = {
  title: 'AI Automation for HVAC Companies in Alabama | Developers Decide',
  description: 'Dispatching, intake, quotes, and follow-up automated for Alabama HVAC businesses. Flat-rate, month-to-month. Based in Hoover, AL.',
  openGraph: {
    title: 'AI Automation for HVAC Companies in Alabama | Developers Decide',
    description: 'Dispatching, intake, quotes, and follow-up automated for Alabama HVAC businesses. Flat-rate, month-to-month.',
    url: 'https://devsdecide.com/hvac',
    siteName: 'Developers Decide',
    type: 'website',
  },
  twitter: {
    title: 'AI Automation for HVAC Companies in Alabama | Developers Decide',
    description: 'Dispatching, intake, quotes, and follow-up automated for Alabama HVAC businesses. Flat-rate, month-to-month.',
  },
  alternates: {
    canonical: 'https://devsdecide.com/hvac',
  },
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
        { name: 'QuoteDraft', desc: "Tech dictates site notes; a polished quote with line items and photos lands in the customer's inbox before the truck pulls away.", impact: '45 min → 4 min per quote' },
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
