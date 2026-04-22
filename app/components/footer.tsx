import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-rule px-10 pt-12 pb-8 bg-bg">
      <div className="max-w-[1240px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-[14px]">
            <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center text-bg font-display text-lg italic">
              d
            </div>
            <span className="text-[15px] font-semibold">Developers Decide LLC</span>
          </div>
          <p className="text-[13px] text-ink-soft leading-relaxed max-w-[340px]">
            AI automation consulting for small service businesses in Alabama. Hoover, AL.
          </p>
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Industries</div>
          {['HVAC', 'Construction', 'Staffing'].map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="block text-[13px] text-ink-soft no-underline py-1"
            >
              {l}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Resources</div>
          <Link href="/case-study" className="block text-[13px] text-ink-soft no-underline py-1">Case study</Link>
          <Link href="/try-it-yourself" className="block text-[13px] text-ink-soft no-underline py-1">Try it yourself</Link>
        </div>

        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">Contact</div>
          <a href="mailto:solomon@devsdecide.com" className="block text-[13px] text-ink-soft no-underline py-1">
            solomon@devsdecide.com
          </a>
          <Link href="/contact" className="block text-[13px] text-ink-soft no-underline py-1">Book a call</Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-6 border-t border-rule flex justify-between text-[12px] text-ink-faint">
        <span>© 2026 Developers Decide LLC</span>
        <span>Hoover, Alabama</span>
      </div>
    </footer>
  );
}
