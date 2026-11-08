import type { Metadata } from 'next';
import { Suspense } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ContactForm from './contact-form';
import { contactPriceSentence } from '@/lib/offer';

export const revalidate = 3600;

const title = 'Book Your AI Tools Assessment | Developers Decide';
const description =
  'Book your AI Tools Assessment. $500 paid upfront. A 45-minute interview, a written report and a review call. Full refund if I can\'t find 5 hours a week.';

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
          Book your assessment
        </h1>
        <p className="text-[19px] sm:text-[21px] leading-[1.5] text-ink-soft m-0 mb-10">
          Tell me a little about your business. I&rsquo;ll reply within a day with times for your 45-minute interview, in
          person or on Zoom, and how to pay. {contactPriceSentence()} If I can&rsquo;t find realistic ways to save at
          least 5 hours a week, you get a full refund.
        </p>
        <Suspense fallback={<div className="h-[560px]" />}>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
