'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Turnstile } from '@marsidev/react-turnstile';

interface Plan {
  tool_name: string;
  one_liner: string;
  steps: string[];
  time_saved: string;
  monthly_value: string;
  first_week: string;
}

const industries = ['HVAC', 'Cleaning', 'Bookkeeping', 'Property Mgmt', 'Staffing', 'Construction'];

const presets: Record<string, string[]> = {
  HVAC: ['Customers texting the owner at all hours', 'Scheduling conflicts between techs', 'Quote generation takes 45min each'],
  Cleaning: ['Missed weekly client follow-ups', 'Staff shift swaps over text', 'Onboarding new accounts takes forever'],
  Bookkeeping: ['Client document chasing', 'Month-end report compilation', 'Answering same tax questions over and over'],
  'Property Mgmt': ['Maintenance request triage', 'Tenant screening back-and-forth', 'Rent collection reminders'],
  Staffing: ['Candidate screening volume', 'Client timesheet reconciliation', 'Placement follow-up lapses'],
  Construction: ['Bid compilation from specs', 'Subcontractor scheduling', 'Progress reporting to owners'],
};

export default function HeroDemo() {
  const [industry, setIndustry] = useState('HVAC');
  const [bottleneck, setBottleneck] = useState(presets['HVAC'][0]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [cfToken, setCfToken] = useState('');
  const [error, setError] = useState('');

  const runDemo = async () => {
    if (loading) return;

    setLoading(true);
    setPlan(null);
    setError('');
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'hero', industry, bottleneck, cfToken }),
      });
      if (res.status === 429) {
        setPlan({
          tool_name: 'SlowDown',
          one_liner: 'Too many requests — wait a moment and try again.',
          steps: [],
          time_saved: '',
          monthly_value: '',
          first_week: 'Hit generate again in about a minute.',
        });
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? 'Please complete the anti-bot check before trying the live demo.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      const match = data.text?.match(/\{[\s\S]*\}/);
      if (match) setPlan(JSON.parse(match[0]));
    } catch {
      setPlan({
        tool_name: 'DemoUnavailable',
        one_liner: 'Live demo offline right now — book a call and I\'ll sketch this for your business in 48 hours.',
        steps: [],
        time_saved: '',
        monthly_value: '',
        first_week: 'Scoped proposal within 48 hours.',
      });
    }
    setLoading(false);
  };

  return (
    <section className="max-w-[1240px] mx-auto py-[70px] px-10 pb-20">

      <h1 className="text-[13px] tracking-[1.5px] uppercase text-ink-faint m-0 mb-4 font-normal">
        AI automation for Alabama small businesses — built around your bottleneck.
      </h1>
      <h2 className="font-display text-[clamp(56px,7vw,104px)] leading-[1.1] tracking-[-2.5px] m-0 mb-9 font-normal max-w-[1100px] pb-[0.15em]">
        Don&rsquo;t take my word for it.<br />
        <span className="italic text-accent">Watch AI solve</span> your bottleneck in 10 seconds.
      </h2>

      <p className="text-[19px] text-ink-soft leading-[1.55] m-0 mb-12 max-w-[620px]">
        Pick your industry, tell me what&rsquo;s grinding, and an AI will sketch a custom automation right here.
        If it looks promising, we&rsquo;ll build the real one together.
      </p>

      <div className="bg-white border border-rule rounded-[20px] p-8 shadow-[0_30px_60px_-20px_rgba(26,24,20,0.12),0_8px_20px_-8px_rgba(26,24,20,0.06)]">
        <div className="grid grid-cols-2 gap-10">
          {/* Left: controls */}
          <div>
            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">01 · Industry</div>
            <div className="flex flex-wrap gap-1.5 mb-7">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => { setIndustry(ind); setBottleneck(presets[ind][0]); setPlan(null); }}
                  className={`px-[14px] py-2 rounded-full text-[13px] cursor-pointer font-[inherit] border transition-colors ${
                    industry === ind
                      ? 'bg-ink text-bg border-ink'
                      : 'bg-transparent text-ink-soft border-rule'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-3">02 · The bottleneck</div>
            <textarea
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              maxLength={500}
              className="w-full bg-bg border border-rule rounded-[10px] p-[14px] font-[inherit] text-[15px] text-ink resize-none outline-none min-h-[90px] leading-[1.5]"
            />
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {presets[industry].map((p) => (
                <button
                  key={p}
                  onClick={() => { setBottleneck(p); setPlan(null); }}
                  className="bg-transparent text-ink-faint border border-dashed border-rule px-2.5 py-[5px] rounded-md text-[11px] cursor-pointer font-[inherit]"
                >
                  {p.length > 40 ? p.slice(0, 40) + '…' : p}
                </button>
              ))}
            </div>

            <button
              onClick={runDemo}
              disabled={loading}
              className="mt-6 w-full bg-accent text-white border-none py-4 rounded-xl font-[inherit] text-[15px] font-semibold cursor-pointer tracking-[0.2px] disabled:cursor-wait"
            >
              {loading ? 'Analyzing bottleneck…' : 'Generate automation plan →'}
            </button>

            <div className="mt-4">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ action: 'ai_hero' }}
                onSuccess={(token) => setCfToken(token)}
                onExpire={() => setCfToken('')}
                onError={() => setCfToken('')}
              />
              <div className="text-[12px] text-ink-faint mt-2">Quick human check so bots can&rsquo;t burn the demo.</div>
              {error && <div className="text-[13px] text-accent mt-2">{error}</div>}
            </div>
          </div>

          {/* Right: result */}
          <div className="bg-bg rounded-[14px] p-7 border border-rule min-h-[380px] flex flex-col">
            {!plan && !loading && (
              <div className="text-ink-faint text-[14px] m-auto text-center max-w-[240px]">
                <div className="font-display italic text-[28px] text-ink mb-3">Waiting on you.</div>
                Pick an industry, describe what&rsquo;s eating the week, hit generate.
              </div>
            )}

            {loading && (
              <div className="m-auto text-center">
                <div className="flex gap-1.5 justify-center mb-[14px]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent"
                      style={{ animation: `ddbounce 1.2s ease infinite ${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <div className="text-[13px] text-ink-faint">Sketching your tool…</div>
              </div>
            )}

            {plan && plan.tool_name === 'DemoUnavailable' && (
              <div className="flex flex-col h-full">
                <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-4">Live demo offline</div>
                <div className="font-display text-[28px] tracking-[-0.5px] mb-2 italic leading-tight">
                  I&rsquo;ll sketch this<br />for your business.
                </div>
                <div className="text-[14px] text-ink-soft mb-6 leading-[1.55]">{plan.one_liner}</div>

                <div className="p-[14px] bg-accent-soft rounded-[10px] text-[12px] text-accent leading-[1.5] mb-5">
                  <strong>What happens next:</strong> {plan.first_week}
                </div>

                <Link
                  href={`/contact?industry=${encodeURIComponent(industry)}&bottleneck=${encodeURIComponent(bottleneck)}`}
                  className="block text-center no-underline mt-auto w-full bg-ink text-bg py-[13px] rounded-[10px] font-[inherit] text-[14px] font-medium"
                >
                  Book a call to get your custom plan →
                </Link>
              </div>
            )}

            {plan && plan.tool_name !== 'DemoUnavailable' && (
              <div>
                <div className="text-[11px] tracking-[1.5px] uppercase text-accent mb-2.5">Proposed tool</div>
                <div className="font-display text-[34px] tracking-[-1px] mb-1.5 italic">{plan.tool_name}</div>
                <div className="text-[14px] text-ink-soft mb-5 leading-[1.5]">{plan.one_liner}</div>

                <div className="text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2.5">What it does</div>
                {plan.steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 py-2 text-[13px] ${i < plan.steps.length - 1 ? 'border-b border-rule' : ''}`}
                  >
                    <span className="text-accent font-semibold">0{i + 1}</span>
                    <span className="text-ink leading-[1.5]">{s}</span>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-dashed border-rule">
                  <div className="bg-white p-[14px] rounded-[10px]">
                    <div className="text-[10px] tracking-[1.2px] text-ink-faint uppercase">Time saved</div>
                    <div className="font-display text-[22px] text-accent mt-1">{plan.time_saved}</div>
                  </div>
                  <div className="bg-white p-[14px] rounded-[10px]">
                    <div className="text-[10px] tracking-[1.2px] text-ink-faint uppercase">Monthly value</div>
                    <div className="font-display text-[22px] text-accent mt-1">{plan.monthly_value}</div>
                  </div>
                </div>

                <div className="mt-[18px] p-[14px] bg-accent-soft rounded-[10px] text-[12px] text-accent leading-[1.5]">
                  <strong>Week 1:</strong> {plan.first_week}
                </div>

                <Link
                  href={`/contact?industry=${encodeURIComponent(industry)}&bottleneck=${encodeURIComponent(bottleneck)}`}
                  className="block text-center no-underline mt-4 w-full bg-ink text-bg py-[13px] rounded-[10px] font-[inherit] text-[14px] font-medium"
                >
                  Book a call to build the real one →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-9 text-[13px] text-ink-faint flex-wrap">
        <div>◆ 47 tools deployed across Alabama</div>
        <div>◆ $180k median annual recovery</div>
        <div>◆ Month-to-month · cancel anytime</div>
      </div>
    </section>
  );
}
