'use client';

import Link from 'next/link';
import { trackCtaClick, type CtaLocation } from '@/lib/analytics';

type BookCallLinkProps = {
  location: CtaLocation;
  className?: string;
  children?: React.ReactNode;
  ctaText?: string;
};

export default function BookCallLink({
  location,
  className,
  children = 'Book a call',
  ctaText,
}: BookCallLinkProps) {
  const label = ctaText ?? (typeof children === 'string' ? children : 'Book a call');

  return (
    <Link href="/contact" className={className} onClick={() => trackCtaClick(label, location)}>
      {children}
    </Link>
  );
}
