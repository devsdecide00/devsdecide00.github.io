'use client';

import { trackCtaClick } from '@/lib/analytics';

export default function PitchBookQr({ svg }: { svg: string }) {
  return (
    <a
      href="/contact"
      aria-label="Scan to book your assessment"
      onClick={() => trackCtaClick('Scan to book your assessment', 'pitch')}
      className="block no-underline text-inherit bg-white rounded-[22px] border-[3px] border-white p-5 w-[min(62vw,260px)] mb-10"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
