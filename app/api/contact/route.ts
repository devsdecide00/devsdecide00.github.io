import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clampSingleLine, clampText, isValidEmail, verifyTurnstileToken } from '@/lib/abuse-prevention';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json', message: 'Invalid form payload.' }, { status: 400 });
  }

  const honeypot = clampText(body.honeypot, 200);
  const cfToken = clampText(body.cfToken, 2048);

  if (honeypot) return NextResponse.json({ ok: true });

  if (!cfToken) {
    return NextResponse.json(
      { error: 'verification_required', message: 'Please complete the anti-bot check before submitting.' },
      { status: 403 }
    );
  }

  const verification = await verifyTurnstileToken(req, cfToken, 'contact_form');
  if (!verification.ok) {
    return NextResponse.json({ error: 'verification_failed', message: verification.message }, { status: 403 });
  }

  const name = clampSingleLine(body.name, 120);
  const company = clampSingleLine(body.company, 120);
  const email = clampSingleLine(body.email, 254).toLowerCase();
  const industry = clampSingleLine(body.industry, 80);
  const budget = clampSingleLine(body.budget, 80);
  const bottleneck = clampText(body.bottleneck, 2000);

  if (!name || !company || !industry || !budget || !bottleneck) {
    return NextResponse.json({ error: 'invalid_input', message: 'Please complete every required field.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'invalid_email', message: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'misconfigured', message: 'Email delivery is not configured.' }, { status: 503 });
  }

  await resend.emails.send({
    from: 'Contact Form <website@devsdecide.com>',
    to: 'solomon@devsdecide.com',
    replyTo: email,
    subject: `New inquiry from ${name} — ${company}`,
    text: `Name: ${name}
Company: ${company}
Email: ${email}
Industry: ${industry}
Budget: ${budget}

What's grinding:
${bottleneck}`,
  });

  return NextResponse.json({ ok: true });
}
