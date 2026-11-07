import type { Metadata } from 'next';
import { Suspense } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ContactForm from './contact-form';
import { PROMO, currentPrice, formatPrice, promoActive } from '@/lib/offer';

export const revalidate = 3600;

const title = 'Book a 45-Minute AI Tools Call | Developers Decide';
const description =
  'Tell me about your business. A 45-minute call, 3 to 7 AI tools, and 5 hours a week back or your money back. Book a call.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: 'https://devsdecide.com/contact',
    siteName: 'Devs Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: 'https://devsdecide.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[720px] mx-auto w-full px-5 pt-10 sm:pt-16 pb-20">
        <h1 className="font-extrabold text-[clamp(48px,12vw,84px)] leading-[0.92] tracking-[-2.5px] m-0 mb-5 [font-stretch:88%]">
          Book a call
        </h1>
        <p className="text-[19px] sm:text-[21px] leading-[1.5] text-ink-soft m-0 mb-10">
          Tell me a little about your business. I&rsquo;ll reply within a day with a few times for a 45-minute call, in
          person or on Zoom.{' '}
          {promoActive()
            ? `${formatPrice(PROMO.price)} for my first ${PROMO.spots} clients, through ${PROMO.endsLabel}.`
            : `${formatPrice(currentPrice())}, one time.`}{' '}
          5 hours a week back, or your money back.
        </p>
        <Suspense fallback={<div className="h-[560px]" />}>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
