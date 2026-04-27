'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/hvac', label: 'HVAC', id: 'hvac' },
  { href: '/construction', label: 'Construction', id: 'construction' },
  { href: '/staffing', label: 'Staffing', id: 'staffing' },
  { href: '/case-study', label: 'Case study', id: 'case-study' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{ backdropFilter: 'blur(10px)' }}
        className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 py-[18px] border-b border-rule bg-[rgba(250,247,242,0.94)]"
      >
        <Link href="/" className="flex items-center gap-3 no-underline text-ink" onClick={() => setOpen(false)}>
          <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center text-bg font-display text-lg italic">
            d
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.2px]">Developers Decide</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-[13.5px]">
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

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-ink origin-center transition-transform duration-200 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-ink origin-center transition-transform duration-200 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden sticky top-[57px] z-40 border-b border-rule px-5 pt-3 pb-5 bg-[rgba(250,247,242,0.97)]"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block no-underline py-3 border-b border-rule text-[17px] ${active ? 'text-ink font-semibold' : 'text-ink-soft'}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center no-underline bg-ink text-bg py-3 rounded-full text-[14px] font-medium"
          >
            Book a call →
          </Link>
        </div>
      )}
    </>
  );
}
