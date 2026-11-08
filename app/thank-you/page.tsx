import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ThankYouContent from './thank-you-content';

export const metadata: Metadata = {
  title: 'Message Received | Developers Decide',
  description: 'Your request is in. Expect a reply within one business day with times for your assessment interview.',
  openGraph: {
    title: 'Message Received | Developers Decide',
    description: 'Your request is in. Expect a reply within one business day with times for your assessment interview.',
    url: 'https://devsdecide.com/thank-you',
    siteName: 'Devs Decide',
    type: 'website',
  },
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <ThankYouContent />
      <Footer />
    </>
  );
}
