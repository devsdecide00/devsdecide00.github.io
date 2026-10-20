'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';

const teamSizes = ['Just me', '2–5', '6–10', '11–20', '20+'];

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
    industry: '',
    teamSize: '2–5',
    bottleneck: searchParams.get('bottleneck') ?? '',
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

  const inputClass =
    'w-full bg-bg border border-rule rounded-lg px-4 py-3 font-[inherit] text-[18px] text-ink outline-none focus:border-ink focus:ring-2 focus:ring-ink/10';
  const labelClass = 'block text-[17px] text-ink mb-2';

  return (
    <form onSubmit={onSubmit}>
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
          <label htmlFor="name" className={labelClass}>Your name</label>
          <input id="name" required maxLength={120} value={form.name} onChange={(e) => upd('name', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Company <span className="text-ink-faint">(optional)</span></label>
          <input id="company" maxLength={120} value={form.company} onChange={(e) => upd('company', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" required type="email" maxLength={254} value={form.email} onChange={(e) => upd('email', e.target.value)} className={inputClass} />
      </div>

      <div className="mb-4">
        <label htmlFor="industry" className={labelClass}>What does your business do?</label>
        <input id="industry" required maxLength={80} value={form.industry} onChange={(e) => upd('industry', e.target.value)} placeholder="e.g. HVAC, bookkeeping" className={inputClass} />
      </div>

      <div className="mb-4">
        <div className={labelClass}>Team size</div>
        <div role="radiogroup" className="flex flex-wrap gap-1.5">
          {teamSizes.map((t) => (
            <button
              type="button"
              key={t}
              role="radio"
              aria-checked={form.teamSize === t}
              onClick={() => upd('teamSize', t)}
              className={`px-3 py-[11px] rounded-lg text-[16px] cursor-pointer font-[inherit] border ${
                form.teamSize === t ? 'bg-ink text-bg border-ink' : 'bg-transparent text-ink-soft border-rule'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <label htmlFor="bottleneck" className={labelClass}>What eats your week?</label>
        <textarea
          id="bottleneck"
          required
          maxLength={2000}
          value={form.bottleneck}
          onChange={(e) => upd('bottleneck', e.target.value)}
          placeholder="The tasks you or your team repeat every week…"
          className={`${inputClass} min-h-[120px] resize-y leading-[1.5]`}
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ action: 'contact_form' }}
        onSuccess={(token) => setCfToken(token)}
        onExpire={() => setCfToken('')}
        onError={() => setCfToken('')}
        className="mb-4"
      />

      {error && <div className="mb-4 text-[16px] text-accent">{error}</div>}

      <button
        type="submit"
        disabled={!cfToken || submitting}
        className="w-full sm:w-auto bg-accent text-white border-none px-7 py-4 rounded-lg font-[inherit] text-[18px] cursor-pointer hover:bg-accent-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Request a call'}
      </button>
    </form>
  );
}
