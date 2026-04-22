import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, email, industry, bottleneck, budget, honeypot, cfToken } = body;

  if (honeypot) return NextResponse.json({ ok: true });

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: cfToken ?? '',
      remoteip: req.headers.get('x-forwarded-for') ?? '',
    }),
  });
  const { success } = await verifyRes.json();
  if (!success) return NextResponse.json({ error: 'verification failed' }, { status: 400 });

  await resend.emails.send({
    from: 'Contact Form <website@devsdecide.com>',
    to: 'solomon@devsdecide.com',
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
