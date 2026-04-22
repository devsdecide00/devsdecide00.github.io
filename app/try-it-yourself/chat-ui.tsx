'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Turnstile } from '@marsidev/react-turnstile';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const scenarios = [
  'HVAC dispatcher drowning in texts',
  'Cleaning company juggling shift swaps',
  'Bookkeeper chasing docs',
  'Property mgr triaging maintenance',
  'Staffing agency screening candidates',
  'Construction bid compilation',
];

const personas = ['Owner-operator', 'Ops director', 'Office manager', 'Finance lead'];

export default function ChatUI() {
  const [scenario, setScenario] = useState(scenarios[0]);
  const [persona, setPersona] = useState(personas[0]);
  const [convo, setConvo] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cfToken, setCfToken] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (convo.length > 0 || loading) {
      const el = scrollContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [convo, loading]);

  const autoStart = async (token: string, sc: string, pe: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          scenario: sc,
          persona: pe,
          cfToken: token,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setConvo([{ role: 'assistant', text: data.text?.trim() ?? '' }]);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (cfToken && !startedRef.current) {
      startedRef.current = true;
      autoStart(cfToken, scenario, persona);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfToken]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next: Message[] = [...convo, { role: 'user', text: input }];
    setConvo(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          scenario,
          persona,
          cfToken,
          messages: next.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      if (res.status === 429) {
        const data = await res.json();
        setConvo([...next, { role: 'assistant', text: data.message ?? 'Too many messages — give it a minute before sending again.' }]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setConvo([
          ...next,
          { role: 'assistant', text: data?.message ?? 'Please complete the anti-bot check before using the live demo.' },
        ]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setConvo([...next, { role: 'assistant', text: data.text?.trim() ?? '' }]);
    } catch {
      setConvo([...next, { role: 'assistant', text: "Hmm, connection hiccup. Tell me this though — what was the last thing that made you wish a robot could just handle it?" }]);
    }
    setLoading(false);
  };

  const reset = (sc?: string | React.MouseEvent, pe?: string) => {
    const scStr = typeof sc === 'string' ? sc : undefined;
    setConvo([]);
    if (cfToken) autoStart(cfToken, scStr ?? scenario, pe ?? persona);
  };

  return (
    <section className="max-w-[1240px] mx-auto py-14 px-10">
      <div className="text-[12px] tracking-[2px] uppercase text-accent mb-4">Try it yourself · live</div>
      <h1 className="font-display text-[clamp(48px,6vw,88px)] leading-[1.05] tracking-[-2.5px] m-0 mb-6 font-normal max-w-[1000px]">
        A <span className="italic text-accent">practice discovery call</span>, run by AI.
      </h1>
      <p className="text-[17px] text-ink-soft leading-[1.6] m-0 mb-10 max-w-[680px]">
        Pick a scenario and a persona. You play the business owner; the AI plays me. When it names a tool, book a
        real call and we&rsquo;ll build the real one.
      </p>

      <div className="grid grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">Scenario</div>
            <div className="flex flex-col gap-1.5">
              {scenarios.map((s) => (
                <button
                  key={s}
                  onClick={() => { setScenario(s); reset(s, persona); }}
                  className={`text-left px-[14px] py-2.5 rounded-[10px] text-[13px] cursor-pointer font-[inherit] border ${
                    scenario === s ? 'bg-ink text-bg border-ink' : 'bg-white text-ink-soft border-rule'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">You are</div>
            <div className="flex flex-wrap gap-1.5">
              {personas.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPersona(p); reset(scenario, p); }}
                  className={`px-[13px] py-[7px] rounded-full text-[12px] cursor-pointer font-[inherit] border ${
                    persona === p ? 'bg-ink text-bg border-ink' : 'bg-transparent text-ink-soft border-rule'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            className="bg-transparent text-ink-faint border border-dashed border-rule py-2.5 rounded-lg text-[12px] cursor-pointer font-[inherit]"
          >
            ↻ Reset conversation
          </button>

          <div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              options={{ action: 'ai_chat' }}
              onSuccess={(token) => setCfToken(token)}
              onExpire={() => setCfToken('')}
              onError={() => setCfToken('')}
            />
            <div className="text-[12px] text-ink-faint mt-2">Quick human check so the live chat doesn&rsquo;t get farmed.</div>
          </div>
        </div>

        <div className="bg-white border border-rule rounded-[20px] p-6 min-h-[560px] flex flex-col shadow-[0_20px_40px_-20px_rgba(26,24,20,0.1)]">
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 flex flex-col gap-[14px] min-h-[400px] max-h-[500px]">
            {convo.length === 0 && (
              <div className="text-ink-faint text-[14px] m-auto text-center max-w-[320px]">
                <div className="font-display italic text-[28px] text-ink mb-3">Start talking.</div>
                Say anything. &ldquo;Hey, we&rsquo;re drowning in X&rdquo; works fine.
              </div>
            )}
            {convo.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[78%] px-4 py-3 rounded-[14px] text-[14px] leading-[1.5] ${
                    m.role === 'user' ? 'bg-accent text-white' : 'bg-bg text-ink'
                  }`}
                >
                  <div className="text-[10px] tracking-[1.2px] uppercase opacity-60 mb-1">
                    {m.role === 'user' ? 'You' : 'Solomon (AI)'}
                  </div>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 px-4 py-2.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-ink-faint"
                    style={{ animation: `ddbounce 1.2s ease infinite ${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex gap-2.5 mt-[18px] pt-[18px] border-t border-rule"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Type your side of the conversation…"
              className="flex-1 bg-bg border border-rule rounded-[10px] px-[14px] py-3 font-[inherit] text-[14px] outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-ink text-bg border-none px-5 rounded-[10px] font-[inherit] text-[14px] font-medium cursor-pointer disabled:cursor-wait"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-[60px] p-10 bg-bg-deep rounded-2xl">
        <div className="font-display text-[36px] tracking-[-1px] m-0 mb-3 font-normal">
          Done practicing?{' '}
          <span className="italic text-accent">Let&rsquo;s do the real one.</span>
        </div>
        <Link
          href="/contact"
          className="inline-block no-underline bg-ink text-bg px-7 py-[14px] rounded-full text-[14px] font-medium mt-2"
        >
          Book a call →
        </Link>
      </div>
    </section>
  );
}
