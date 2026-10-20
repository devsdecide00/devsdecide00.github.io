import type { Metadata } from 'next';
import { Suspense } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ContactForm from './contact-form';
import { PROMO, currentPrice, formatPrice, promoActive } from '@/lib/offer';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Book Your AI Tools Assessment | Developers Decide',
  description: 'One 45-minute conversation. 3 to 7 AI tools you can use right away. 5 hours a week back, or your money back.',
  openGraph: {
    title: 'Book Your AI Tools Assessment | Developers Decide',
    description: 'One 45-minute conversation. 3 to 7 AI tools you can use right away. 5 hours a week back, or your money back.',
    url: 'https://devsdecide.com/contact',
    siteName: 'Developers Decide',
    type: 'website',
  },
  alternates: {
    canonical: 'https://devsdecide.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[680px] mx-auto w-full px-5 pt-14 sm:pt-24">
        <h1 className="font-display text-[clamp(40px,8vw,56px)] leading-[1.08] tracking-[-1.2px] font-normal m-0 mb-6">
          Book a call
        </h1>
        <p className="text-[19px] sm:text-[20px] leading-[1.6] text-ink-soft m-0 mb-10">
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
