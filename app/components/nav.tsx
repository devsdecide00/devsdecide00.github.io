import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="max-w-[680px] mx-auto w-full flex items-center justify-between px-5 pt-6 pb-2">
      <Link href="/" className="no-underline text-ink text-[17px] py-2">
        Solomon <span className="text-ink-faint">· Developers Decide</span>
      </Link>
      <Link href="/contact" className="no-underline text-accent text-[17px] py-2 underline-offset-4 hover:underline">
        Book a call
      </Link>
    </nav>
  );
}
