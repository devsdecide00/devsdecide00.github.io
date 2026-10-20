import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

// Renders public/solomon.jpg when it exists; renders nothing until a real photo is added.
const exists = fs.existsSync(path.join(process.cwd(), 'public', 'solomon.jpg'));

export default function Portrait({ className = 'w-24 h-24 mb-8' }: { className?: string }) {
  if (!exists) return null;
  return (
    <Image
      src="/solomon.jpg"
      alt="Solomon"
      width={480}
      height={480}
      priority
      className={`${className} rounded-full object-cover`}
    />
  );
}
