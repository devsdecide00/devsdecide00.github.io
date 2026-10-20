import Link from 'next/link';

export const buttonClass =
  'inline-block no-underline bg-accent text-ink font-bold border-[3px] border-ink rounded-full shadow-hard px-7 py-3.5 text-[18px] whitespace-nowrap transition-[transform,box-shadow] duration-100 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none';

export default function Nav() {
  return (
    <nav className="max-w-[1120px] mx-auto w-full flex items-center justify-between px-5 sm:px-8 pt-5 pb-2">
      <Link href="/" className="no-underline text-ink font-extrabold text-[19px] tracking-[-0.3px] py-2">
        Developers Decide
      </Link>
      <Link
        href="/contact"
        className="no-underline bg-accent text-ink font-bold border-[3px] border-ink rounded-full shadow-hard px-4 py-2 text-[15px] active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Book a call
      </Link>
    </nav>
  );
}
