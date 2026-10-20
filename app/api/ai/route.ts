import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { clampText, hasValidAiVerification, markAiVerified, verifyTurnstileToken } from '@/lib/abuse-prevention';

const client = new Anthropic();

const SCENARIOS = [
  'HVAC dispatcher drowning in texts',
  'Cleaning company juggling shift swaps',
  'Bookkeeper chasing docs',
  'Property mgr triaging maintenance',
  'Staffing agency screening candidates',
  'Construction bid compilation',
] as const;

const PERSONAS = ['Owner-operator', 'Ops director', 'Office manager', 'Finance lead'] as const;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CONTENT = 1000;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { mode } = body;
  const cfToken = clampText(body.cfToken, 2048);

  if (mode !== 'chat') {
    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
  }

  if (!hasValidAiVerification(req)) {
    if (!cfToken) {
      return NextResponse.json(
        { error: 'verification_required', message: 'Please complete the anti-bot check before using the live demo.' },
        { status: 403 }
      );
    }

    const verification = await verifyTurnstileToken(req, cfToken, 'ai_chat');
    if (!verification.ok) {
      return NextResponse.json({ error: 'verification_failed', message: verification.message }, { status: 403 });
    }
  }

  const { scenario, persona, messages } = body;

  if (typeof scenario !== 'string' || !(SCENARIOS as readonly string[]).includes(scenario)) {
    return NextResponse.json({ error: 'Invalid scenario' }, { status: 400 });
  }
  if (typeof persona !== 'string' || !(PERSONAS as readonly string[]).includes(persona)) {
    return NextResponse.json({ error: 'Invalid persona' }, { status: 400 });
  }
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages must be an array' }, { status: 400 });
  }

  const safeMessages = messages
    .filter((m: unknown) => {
      if (typeof m !== 'object' || m === null) return false;
      const role = (m as Record<string, unknown>).role;
      return role === 'user' || role === 'assistant';
    })
    .slice(-MAX_MESSAGES)
    .map((m: unknown) => {
      const msg = m as Record<string, unknown>;
      return {
        role: msg.role as 'user' | 'assistant',
        content: clampText(msg.content, MAX_MESSAGE_CONTENT),
      };
    })
    .filter((m) => m.content.length > 0);

  if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1]?.role !== 'user') {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
  }

  const systemPrompt = [
    'You are Solomon, an AI automation consultant at Developers Decide LLC in Hoover Alabama.',
    `You are on a discovery call with a ${persona} at a business matching this scenario: "${scenario}".`,
    'Your style: warm, specific, ask one pointed question at a time, never pitch, never list bullets, no bold.',
    'Max 3 sentences per reply.',
    'Goal: surface the single most repetitive bottleneck in their week, then recommend one specific off-the-shelf AI tool they could start using this week, with a one-line reason and a rough hours-saved estimate. Never propose custom software.',
  ].join(' ');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    system: systemPrompt,
    messages: safeMessages,
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const res = NextResponse.json({ text });
  markAiVerified(res, req);
  return res;
}
