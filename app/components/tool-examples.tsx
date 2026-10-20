// Three common kinds of tools, each with a tiny drawing of the tool doing the work.
// These are examples of categories, not client results.

const card = 'bg-white border-[3px] border-ink rounded-[22px] shadow-hard overflow-hidden flex flex-col';
const scene = 'h-[190px] border-b-[3px] border-ink p-5 flex flex-col justify-center gap-2.5';
const bubble = 'bg-white border-2 border-ink rounded-2xl px-3.5 py-2 text-[14px] leading-snug max-w-[88%]';

function EmailScene() {
  return (
    <div className={`${scene} bg-accent-soft`}>
      <div className={bubble}>
        <span className="font-bold">New quote request</span>
        <br />
        &ldquo;How much to replace a 3-ton unit?&rdquo;
      </div>
      <div className={`${bubble} self-end bg-mint`}>
        <span className="font-bold">Draft ready</span>: &ldquo;Thanks, Dana! Most 3-ton replacements run&hellip;&rdquo;
      </div>
    </div>
  );
}

function NotesScene() {
  return (
    <div className={`${scene} bg-mint`}>
      <div className="bg-white border-2 border-ink rounded-2xl p-3.5 text-[14px]">
        <div className="font-bold mb-1.5">Call with Miller Plumbing</div>
        {['Send revised estimate', 'Book site visit Thu', 'Follow-up email sent'].map((t, i) => (
          <div key={t} className="flex items-center gap-2 py-0.5">
            <span className={`w-4 h-4 rounded border-2 border-ink shrink-0 ${i === 2 ? 'bg-accent' : ''}`} />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingScene() {
  return (
    <div className={`${scene} bg-sun`}>
      <div className={bubble}>&ldquo;When can someone come out?&rdquo;</div>
      <div className="self-end flex gap-1.5">
        {['Tue 9am', 'Wed 1pm', 'Thu 3pm'].map((t, i) => (
          <span
            key={t}
            className={`border-2 border-ink rounded-full px-2.5 py-1 text-[13px] font-bold ${i === 1 ? 'bg-ink text-white' : 'bg-white'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const examples = [
  { scene: <EmailScene />, title: 'Replies drafted for you', body: 'An assistant in your inbox writes the first draft of quote replies and routine answers. You read it and hit send.' },
  { scene: <NotesScene />, title: 'Notes after every call', body: 'A note-taker listens to calls and meetings, then hands you the summary, the to-dos and the follow-up email.' },
  { scene: <BookingScene />, title: 'Customers book themselves', body: 'A booking link that knows your calendar. No more texting back and forth to find a time.' },
];

export default function ToolExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {examples.map((e) => (
        <div key={e.title} className={card}>
          {e.scene}
          <div className="p-5 sm:p-6">
            <h3 className="font-extrabold text-[23px] leading-tight tracking-[-0.4px] m-0 mb-2">{e.title}</h3>
            <p className="text-[17px] leading-[1.5] text-ink-soft m-0">{e.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
