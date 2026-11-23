// The site's only icon set: Lucide paths (ISC license), one stroke weight. See STYLE.md.
type Props = { size?: 16 | 20 | 24; className?: string };

function Icon({ size = 24, className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowDown = (p: Props) => (
  <Icon {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Icon>
);
export const Check = (p: Props) => (
  <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>
);
export const Plus = (p: Props) => (
  <Icon {...p}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>
);
export const RotateCcw = (p: Props) => (
  <Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Icon>
);
