// Rubber-stamp seal for the guarantee. `id` keeps the SVG path unique per page.
export default function Stamp({ id, className = 'w-40 h-40' }: { id: string; className?: string }) {
  return (
    <div className={`relative rotate-[-10deg] shrink-0 ${className}`} role="img" aria-label="5 hours back or your money back">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="96" className="fill-sun stroke-ink" strokeWidth="5" />
        <circle cx="100" cy="100" r="62" fill="none" className="stroke-ink" strokeWidth="3" />
        <defs>
          <path id={id} d="M100,100 m-77,0 a77,77 0 1,1 154,0 a77,77 0 1,1 -154,0" />
        </defs>
        <text className="fill-ink" style={{ fontSize: 17, fontWeight: 800, letterSpacing: 1.5 }}>
          <textPath href={`#${id}`}>5 hours back or your money back ✦ 5 hours back ✦</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-ink">
        <span className="font-extrabold text-[clamp(28px,9vw,44px)] tracking-[-1px]">100%</span>
        <span className="font-bold text-[clamp(12px,3.5vw,16px)] mt-1">refund</span>
      </div>
    </div>
  );
}
