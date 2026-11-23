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
      <main className="max-w-[720px] mx-auto w-full px-4 pt-12 sm:pt-16 pb-16">
        <h1 className="font-extrabold text-display m-0 mb-6 [font-stretch:88%]">
          Book your assessment
        </h1>
        <p className="text-lead text-ink-soft m-0 mb-8">
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
