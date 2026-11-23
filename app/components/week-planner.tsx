type Block = { label: string; size: 1 | 2; admin?: boolean };

// Highlighted blocks are admin work in an example week. They are not a client result.
const week: [string, Block[]][] = [
  ['Mon', [{ label: 'Inbox', size: 1, admin: true }, { label: 'Jobs', size: 2 }, { label: 'Quotes', size: 1, admin: true }]],
  ['Tue', [{ label: 'Crew', size: 1 }, { label: 'Booking', size: 1, admin: true }, { label: 'Jobs', size: 2 }]],
  ['Wed', [{ label: 'Chasing', size: 1, admin: true }, { label: 'Clients', size: 2 }, { label: 'Inbox', size: 1, admin: true }]],
  ['Thu', [{ label: 'Jobs', size: 2 }, { label: 'Notes', size: 1, admin: true }, { label: 'Crew', size: 1 }]],
  ['Fri', [{ label: 'Invoices', size: 1, admin: true }, { label: 'Jobs', size: 2 }, { label: 'Calls', size: 1 }]],
];

const START = 0.9; // seconds before the first block lifts
const STEP = 0.3;

export default function WeekPlanner({ className = '' }: { className?: string }) {
  let n = 0;

  return (
    <div className={`relative bg-white border-[3px] border-ink rounded-card shadow-hard-lg p-4 sm:p-6 ${className}`}>
      <div className="font-extrabold text-title mb-4">An example week</div>

      <div className="grid grid-cols-5 gap-2 sm:gap-2">
        {week.map(([day, blocks]) => (
          <div key={day} className="flex flex-col gap-2 sm:gap-2">
            <div className="text-caption font-bold text-ink-faint text-center">{day}</div>
            {blocks.map((b, i) => {
              const h = b.size === 2 ? 'h-[92px] sm:h-[104px]' : 'h-[42px] sm:h-[48px]';
              const label = 'text-micro sm:text-caption font-semibold';
              if (!b.admin) {
                return (
                  <div key={i} className={`${h} rounded-control bg-bg-deep border-2 border-ink/10 flex items-center justify-center ${label} text-ink-soft`}>
                    {b.label}
                  </div>
                );
              }
              const delay = START + n++ * STEP;
              return (
                <div key={i} className={`${h} relative`}>
                  <div className={`absolute inset-0 rounded-control bg-mint border-2 border-ink flex items-center justify-center ${label}`}>
                    Free
                  </div>
                  <div
                    className={`planner-admin absolute inset-0 rounded-control bg-accent border-2 border-ink flex items-center justify-center ${label}`}
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
    </div>
  );
}
