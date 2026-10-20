type Block = { label: string; size: 1 | 2; admin?: boolean };

// Each admin block is one hour; seven of them add up to the "+7 hrs" sticker.
const week: [string, Block[]][] = [
  ['Mon', [{ label: 'Inbox', size: 1, admin: true }, { label: 'Jobs', size: 2 }, { label: 'Quotes', size: 1, admin: true }]],
  ['Tue', [{ label: 'Crew', size: 1 }, { label: 'Booking', size: 1, admin: true }, { label: 'Jobs', size: 2 }]],
  ['Wed', [{ label: 'Chasing', size: 1, admin: true }, { label: 'Clients', size: 2 }, { label: 'Inbox', size: 1, admin: true }]],
  ['Thu', [{ label: 'Jobs', size: 2 }, { label: 'Notes', size: 1, admin: true }, { label: 'Crew', size: 1 }]],
  ['Fri', [{ label: 'Invoices', size: 1, admin: true }, { label: 'Jobs', size: 2 }, { label: 'Calls', size: 1 }]],
];

const START = 0.9; // seconds before the first block lifts
const STEP = 0.22;

export default function WeekPlanner({ className = '' }: { className?: string }) {
  let n = 0;
  const popDelay = START + 7 * STEP + 0.2;

  return (
    <div className={`relative bg-white border-[3px] border-ink rounded-[22px] shadow-hard-lg p-4 sm:p-5 ${className}`}>
      <div className="font-extrabold text-[20px] tracking-[-0.3px] mb-3 pr-24">Your week</div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {week.map(([day, blocks]) => (
          <div key={day} className="flex flex-col gap-1.5 sm:gap-2">
            <div className="text-[13px] font-bold text-ink-faint text-center">{day}</div>
            {blocks.map((b, i) => {
              const h = b.size === 2 ? 'h-[92px] sm:h-[104px]' : 'h-[42px] sm:h-[48px]';
              const label = 'text-[11px] sm:text-[13px] font-semibold leading-tight';
              if (!b.admin) {
                return (
                  <div key={i} className={`${h} rounded-lg bg-bg-deep border-2 border-ink/10 flex items-center justify-center ${label} text-ink-soft`}>
                    {b.label}
                  </div>
                );
              }
              const delay = START + n++ * STEP;
              return (
                <div key={i} className={`${h} relative`}>
                  <div className={`absolute inset-0 rounded-lg bg-mint border-2 border-ink flex items-center justify-center ${label}`}>
                    Free
                  </div>
                  <div
                    className={`planner-admin absolute inset-0 rounded-lg bg-accent border-2 border-ink flex items-center justify-center ${label}`}
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {b.label}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className="planner-pop absolute -top-10 -right-2 sm:-right-5 bg-sun border-[3px] border-ink rounded-full w-[88px] h-[88px] flex flex-col items-center justify-center leading-none shadow-hard"
        style={{ animationDelay: `${popDelay}s` }}
        aria-label="7 hours back"
      >
        <span className="font-extrabold text-[30px] tracking-[-1px]">+7</span>
        <span className="text-[13px] font-bold mt-0.5">hrs back</span>
      </div>
    </div>
  );
}
