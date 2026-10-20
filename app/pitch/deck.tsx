'use client';

import { Children, useEffect, useRef, useState } from 'react';

// Full-screen, swipeable slides. Native scroll-snap handles touch; arrows/space/tap handle laptops.
export default function Deck({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = Children.count(children);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = Math.max(0, Math.min(count - 1, i));
    el.scrollTo({ top: n * el.clientHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setCurrent(Math.round(el.scrollTop / el.clientHeight));
    const onKey = (e: KeyboardEvent) => {
      const i = Math.round(el.scrollTop / el.clientHeight);
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        el.scrollTo({ top: (i + 1) * el.clientHeight, behavior: 'smooth' });
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        el.scrollTo({ top: (i - 1) * el.clientHeight, behavior: 'smooth' });
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-bg text-ink">
      <div ref={ref} className="h-full overflow-y-auto snap-y snap-mandatory overscroll-none [scrollbar-width:none]">
        {children}
      </div>

      <div className="fixed inset-x-0 top-[max(20px,env(safe-area-inset-top))] z-10 pointer-events-none">
        <div className="max-w-[860px] mx-auto pl-6 pr-12 sm:px-16 text-[17px] text-ink-faint">Solomon · devsdecide.com</div>
      </div>

      {/* Progress */}
      <div aria-hidden className="pointer-events-none fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`block w-1 rounded-full transition-all duration-300 ${i === current ? 'h-5 bg-ink' : 'h-1 bg-ink-faint/40'}`}
          />
        ))}
      </div>

      {/* Next */}
      {current < count - 1 && (
        <div className="fixed inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] z-10 pointer-events-none">
          <div className="max-w-[860px] mx-auto px-6 sm:px-16">
            <button
              onClick={() => go(current + 1)}
              aria-label="Next slide"
              className={`pointer-events-auto w-12 h-12 rounded-full bg-transparent border border-rule text-ink-faint text-lg cursor-pointer motion-reduce:animate-none ${current === 0 ? 'animate-bounce' : ''}`}
            >
              ↓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
