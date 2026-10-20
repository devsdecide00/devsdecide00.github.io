import Link from 'next/link';
import Nav, { buttonClass } from './components/nav';
import Footer from './components/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="max-w-[720px] mx-auto w-full pt-12 sm:pt-20 pb-20 px-5">
        <div className="inline-block bg-sun border-[3px] border-ink rounded-full px-5 py-2 font-extrabold text-[22px] rotate-[-4deg] mb-8">
          404
        </div>
        <h1 className="font-extrabold text-[clamp(48px,12vw,84px)] leading-[0.92] tracking-[-2.5px] m-0 mb-6 [font-stretch:88%]">
          This page got automated away.
        </h1>
        <p className="text-[19px] sm:text-[21px] leading-[1.5] text-ink-soft m-0 mb-10">
          It may have moved or never existed. The homepage has everything.
        </p>
        <Link href="/" className={buttonClass}>
          Go to the homepage
        </Link>
      </section>
      <Footer />
    </>
  );
}
