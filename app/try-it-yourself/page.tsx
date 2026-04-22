import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ChatUI from './chat-ui';

export const metadata: Metadata = {
  title: 'Try a Practice Discovery Call | Developers Decide',
  description: 'Play the business owner. The AI plays the consultant. Pick a scenario — HVAC, staffing, construction — and see what gets surfaced in 5 minutes.',
  openGraph: {
    title: 'Try a Practice Discovery Call | Developers Decide',
    description: 'Play the business owner. The AI plays the consultant. Pick a scenario and see what automation gets surfaced.',
    url: 'https://devsdecide.com/try-it-yourself',
    siteName: 'Developers Decide',
    type: 'website',
  },
};

export default function TryItYourselfPage() {
  return (
    <>
      <Nav />
      <ChatUI />
      <Footer />
    </>
  );
}
