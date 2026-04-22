import Link from 'next/link';
import Nav from './components/nav';
import Footer from './components/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="max-w-[780px] mx-auto py-[120px] px-10 text-center">
        <div className="font-display text-[180px] text-accent leading-none tracking-[-6px] italic mb-5">404</div>
        <h1 className="font-display text-[56px] leading-none tracking-[-2px] m-0 mb-5 font-normal">
          This page got <span className="italic">automated away.</span>
        </h1>
        <p className="text-[17px] text-ink-soft m-0 mb-9 leading-[1.55]">
          Probably never existed. Maybe I moved it. Either way, let&rsquo;s get you somewhere useful.
        </p>
        <Link href="/" className="inline-block no-underline bg-ink text-bg px-7 py-[14px] rounded-full text-[14px] font-medium mr-2.5">
          Home →
        </Link>
        <Link href="/try-it-yourself" className="inline-block no-underline text-ink px-7 py-[14px] text-[14px] border border-ink rounded-full">
          Try the demo
        </Link>
      </section>
      <Footer />
    </>
  );
}
