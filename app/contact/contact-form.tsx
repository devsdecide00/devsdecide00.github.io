'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';

const industries = ['HVAC', 'Cleaning', 'Bookkeeping', 'Property Mgmt', 'Staffing', 'Construction', 'Other'];
const budgets = ['Starter · $1,500/mo', 'Growth · $2,500/mo', "Custom · let's scope it", 'Just exploring'];

const planToBudget: Record<string, string> = {
  Starter: 'Starter · $1,500/mo',
  Growth: 'Growth · $2,500/mo',
  Custom: "Custom · let's scope it",
};

export default function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [honeypot, setHoneypot] = useState('');
  const [cfToken, setCfToken] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    industry: searchParams.get('industry') ?? 'HVAC',
    bottleneck: searchParams.get('bottleneck') ?? '',
    budget: planToBudget[searchParams.get('plan') ?? ''] ?? 'Starter · $1,500/mo',
  });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfToken || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot, cfToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? 'Something blocked the submission. Please try again.');
        setSubmitting(false);
        return;
      }

      try { localStorage.setItem('dd_last_inquiry', JSON.stringify(form)); } catch {}
      router.push('/thank-you');
    } catch {
      setError('Connection hiccup. Please try again.');
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-bg border border-rule rounded-[10px] px-[14px] py-3 font-[inherit] text-[15px] text-ink outline-none';
  const labelClass = 'block text-[11px] tracking-[1.5px] uppercase text-ink-faint mb-2';

  return (
    <form onSubmit={onSubmit} className="bg-white border border-rule rounded-[20px] p-6 sm:p-9">
      <input
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Your name</label>
          <input required maxLength={120} value={form.name} onChange={(e) => upd('name', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Company</label>
          <input required maxLength={120} value={form.company} onChange={(e) => upd('company', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Email</label>
        <input required type="email" maxLength={254} value={form.email} onChange={(e) => upd('email', e.target.value)} className={inputClass} />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Industry</label>
        <div className="flex flex-wrap gap-1.5">
          {industries.map((ind) => (
            <button
              type="button"
              key={ind}
              onClick={() => upd('industry', ind)}
              className={`px-[13px] py-[7px] rounded-full text-[12px] cursor-pointer font-[inherit] border ${
                form.industry === ind ? 'bg-ink text-bg border-ink' : 'bg-transparent text-ink-soft border-rule'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>What&rsquo;s grinding?</label>
        <textarea
          required
          maxLength={2000}
          value={form.bottleneck}
          onChange={(e) => upd('bottleneck', e.target.value)}
          placeholder="The most repetitive, soul-crushing part of your week…"
          className={`${inputClass} min-h-[120px] resize-y leading-[1.5]`}
        />
      </div>

      <div className="mb-7">
        <label className={labelClass}>Rough budget</label>
        <div className="flex flex-col gap-1.5">
          {budgets.map((b) => (
            <label
              key={b}
              className={`flex items-center gap-2.5 text-[13px] px-3 py-2 border rounded-lg cursor-pointer ${
                form.budget === b ? 'border-ink bg-bg' : 'border-rule bg-white'
              }`}
            >
              <input type="radio" checked={form.budget === b} onChange={() => upd('budget', b)} />
              {b}
            </label>
          ))}
        </div>
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ action: 'contact_form' }}
        onSuccess={(token) => setCfToken(token)}
        onExpire={() => setCfToken('')}
        onError={() => setCfToken('')}
        className="mb-4"
      />

      {error && <div className="mb-4 text-[13px] text-accent">{error}</div>}

      <button
        type="submit"
        disabled={!cfToken || submitting}
        className="w-full bg-accent text-white border-none py-4 rounded-xl font-[inherit] text-[15px] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Send it →'}
      </button>
    </form>
  );
}
