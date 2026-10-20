import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:justify-between gap-4 text-[16px]">
        <span className="text-white/70">Developers Decide LLC, Hoover, Alabama</span>
        <span className="flex gap-6">
          <a href="mailto:solomon@devsdecide.com" className="text-white no-underline hover:underline py-1">Email</a>
          <Link href="/case-study" className="text-white no-underline hover:underline py-1">Past work</Link>
        </span>
      </div>
    </footer>
  );
}
