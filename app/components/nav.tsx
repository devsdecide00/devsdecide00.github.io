'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/hvac', label: 'HVAC', id: 'hvac' },
  { href: '/construction', label: 'Construction', id: 'construction' },
  { href: '/staffing', label: 'Staffing', id: 'staffing' },
  { href: '/case-study', label: 'Case study', id: 'case-study' },
  { href: '/try-it-yourself', label: 'Try it', id: 'try-it-yourself' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{ backdropFilter: 'blur(10px)' }}
      className="sticky top-0 z-50 flex items-center justify-between px-10 py-[18px] border-b border-rule bg-[rgba(250,247,242,0.94)]"
    >
      <Link href="/" className="flex items-center gap-3 no-underline text-ink">
        <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center text-bg font-display text-lg italic">
          d
        </div>
        <span className="text-[15px] font-semibold tracking-[-0.2px]">Developers Decide</span>
      </Link>

      <div className="flex items-center gap-6 text-[13.5px]">
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
          return (
            <Link
              key={l.id}
              href={l.href}
              className={`no-underline transition-colors ${active ? 'text-ink font-semibold' : 'text-ink-soft font-normal'}`}
            >
              {l.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="bg-ink text-bg no-underline px-[18px] py-[10px] rounded-full text-[13px] font-medium"
        >
          Book a call
        </Link>
      </div>
    </nav>
  );
}
