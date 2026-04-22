import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ThankYouContent from './thank-you-content';

export const metadata: Metadata = {
  title: 'Message Received | Developers Decide',
  description: 'Your inquiry is in. Expect a reply within one business day with a few times for a 30-minute call.',
  openGraph: {
    title: 'Message Received | Developers Decide',
    description: 'Your inquiry is in. Expect a reply within one business day.',
    url: 'https://devsdecide.com/thank-you',
    siteName: 'Developers Decide',
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
