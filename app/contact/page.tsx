import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Book a Call | Developers Decide',
  description: '30 minutes, no pitch. Tell me about a typical Tuesday — I listen for what\'s worth automating. Serving Alabama small businesses.',
  openGraph: {
    title: 'Book a Call | Developers Decide',
    description: '30 minutes, no pitch. Tell me about a typical Tuesday — I listen for what\'s worth automating.',
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
      <section className="max-w-[1080px] mx-auto pt-[70px] pb-[100px] px-10 grid grid-cols-[1fr_1.2fr] gap-20">
        <div>
          <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Book a call</div>
          <h1 className="font-display text-[72px] leading-[1.05] tracking-[-2.5px] m-0 mb-7 font-normal">
            Thirty minutes. <span className="italic text-accent">No pitch.</span>
          </h1>
          <p className="text-[17px] text-ink-soft leading-[1.6] m-0 mb-9">
            Tell me about a typical Tuesday at your business. I listen for what&rsquo;s repeated. If there&rsquo;s
            nothing worth automating, I&rsquo;ll tell you.
          </p>
          <div className="bg-bg-deep rounded-[14px] p-[22px] mb-5">
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Direct</div>
            <div className="text-[15px] text-ink mb-1.5">solomon@devsdecide.com</div>
            <div className="text-[13px] text-ink-soft">Hoover, Alabama · replies within one business day</div>
          </div>
          <div className="bg-bg-deep rounded-[14px] p-[22px]">
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">What to expect</div>
            {['30 min Zoom or phone', 'I ask questions, you answer', 'You get a one-pager the next day', 'No follow-up spam, ever'].map(
              (x) => (
                <div key={x} className="text-[13px] py-[5px] text-ink-soft flex gap-2.5">
                  <span className="text-accent">◆</span>
                  {x}
                </div>
              )
            )}
          </div>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </>
  );
}
