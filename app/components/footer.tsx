import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="max-w-[680px] mx-auto w-full px-5 pt-16 pb-12 mt-auto">
      <div className="border-t border-rule pt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[15px] text-ink-faint">
        <span>Developers Decide LLC · Hoover, Alabama</span>
        <span className="flex gap-5">
          <a href="mailto:solomon@devsdecide.com" className="text-ink-faint py-2 sm:py-0">Email</a>
          <Link href="/try-it-yourself" className="text-ink-faint py-2 sm:py-0">Sample call</Link>
          <Link href="/case-study" className="text-ink-faint py-2 sm:py-0">Past work</Link>
        </span>
      </div>
    </footer>
  );
}
