import type { Metadata } from 'next';
import VerticalTemplate from '../components/vertical-template';

export const metadata: Metadata = {
  title: 'AI Automation for Staffing Agencies in Alabama | Developers Decide',
  description: 'Résumé screening, interview scheduling, and timesheet reconciliation automated for Alabama staffing firms. Flat-rate, month-to-month.',
  openGraph: {
    title: 'AI Automation for Staffing Agencies in Alabama | Developers Decide',
    description: 'Résumé screening, interview scheduling, and timesheet reconciliation automated for Alabama staffing firms.',
    url: 'https://devsdecide.com/staffing',
    siteName: 'Developers Decide',
    type: 'website',
  },
};

export default function StaffingPage() {
  return (
    <VerticalTemplate
      industry="Staffing"
      tag="Staffing · Alabama"
      headline="More placements."
      italicHook="Less résumé triage."
      lede="Screening, interview coordination, timesheet reconciliation, placement follow-up. The work that keeps your recruiters from recruiting. We automate the busywork so your team closes more."
      bottlenecks={[
        { title: 'Résumé volume', desc: 'Two hundred applicants for one role. Three seconds per résumé or eight hours of life.' },
        { title: 'Interview scheduling', desc: 'Candidate, hiring manager, two coordinators. Fifteen emails to settle one 30-minute slot.' },
        { title: 'Timesheet wrangling', desc: "End of week: candidates, clients, approvals, back-and-forth over hours that don't match." },
      ]}
      tools={[
        { name: 'FitCheck', desc: 'Candidates scored against the open role with reasoning — not keywords. Top 5 surface with pre-drafted interview questions specific to each résumé.', impact: '+31% placement rate' },
        { name: 'SlotBroker', desc: 'Books interview slots across candidate, hiring manager, and coordinator automatically. Reschedules itself when cancellations happen.', impact: '15 emails → 0' },
        { name: 'TimeReconcile', desc: "Pulls timesheets, flags mismatches between candidate and client submissions, drafts the clarifying email you'd write anyway.", impact: 'Friday night → Friday 3pm' },
        { name: 'PlacementPulse', desc: '30-60-90 check-ins with every placement. Surfaces flight risks, celebrates wins, gives you language for the next conversation.', impact: '2× retention at 90 days' },
      ]}
      testimonial={{ quote: "My recruiters spent half their time on résumé triage. Now they spend it on the phone with candidates. Our placement count doubled in a quarter.", attribution: '[PLACEHOLDER] Ops director · Staffing firm · Montgomery' }}
      faqs={[
        { q: 'Will this work with Bullhorn / JobDiva?', a: 'Yes. Automations read and write to your existing ATS. Recruiters stay in the tool they know.' },
        { q: 'How do you prevent bias in candidate scoring?', a: "Every score comes with explicit reasoning tied to the job description. Recruiters see the why and can override — AI surfaces candidates, it doesn't decide for you." },
        { q: 'What about compliance and data privacy?', a: "Candidate data stays in your systems. We don't train on your data, don't retain it, don't share it. Happy to sign DPAs." },
        { q: 'Can this handle specialty placement?', a: 'Nursing, trades, executive — the narrower the role, the better AI scoring does against bad keyword matches.' },
      ]}
    />
  );
}
