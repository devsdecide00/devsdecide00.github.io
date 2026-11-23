import Link from 'next/link';
import BookCallLink from './book-call-link';

export const buttonClass =
  'inline-block no-underline bg-accent text-ink font-bold border-[3px] border-ink rounded-full shadow-hard px-6 py-4 text-body whitespace-nowrap transition-[transform,box-shadow] duration-100 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none';

export default function Nav() {
  return (
    <nav className="max-w-[1120px] mx-auto w-full flex items-center justify-between px-4 sm:px-8 pt-6 pb-2">
      <Link href="/" className="no-underline text-ink font-extrabold text-body py-2">
        Developers Decide
      </Link>
      <BookCallLink
        location="nav"
        className="no-underline bg-accent text-ink font-bold border-[3px] border-ink rounded-full shadow-hard px-4 py-2 text-small active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Book assessment
      </BookCallLink>
    </nav>
  );
}
