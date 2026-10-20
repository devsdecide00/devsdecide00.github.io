import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

// Shows public/solomon.jpg when it exists; until then, a pumpkin initial badge.
const exists = fs.existsSync(path.join(process.cwd(), 'public', 'solomon.jpg'));

export default function Portrait({ className = 'w-24 h-24' }: { className?: string }) {
  if (!exists) {
    return (
      <div
        aria-hidden
        className={`${className} rounded-full bg-accent border-[3px] border-ink flex items-center justify-center font-extrabold text-ink text-[40px] shrink-0`}
      >
        S
      </div>
    );
  }
  return (
    <Image
      src="/solomon.jpg"
      alt="Solomon"
      width={480}
      height={480}
      priority
      className={`${className} rounded-full object-cover border-[3px] border-ink shrink-0`}
    />
  );
}
