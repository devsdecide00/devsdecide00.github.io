'use client';

import { useEffect, useRef } from 'react';

// Full-screen, swipeable slides. Native scroll-snap handles touch; arrow keys and space handle laptops.
export default function Deck({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const i = Math.round(el.scrollTop / el.clientHeight);
      const next = ['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key);
      const prev = ['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key);
      if (!next && !prev) return;
      e.preventDefault();
      el.scrollTo({ top: (next ? i + 1 : i - 1) * el.clientHeight, behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 overflow-y-auto snap-y snap-mandatory overscroll-none scroll-smooth [scrollbar-width:none]">
      {children}
    </div>
  );
}
