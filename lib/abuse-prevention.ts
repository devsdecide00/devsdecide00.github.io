import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type RateLimitName = 'ai' | 'contact';

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type MemoryBucket = {
  count: number;
  reset: number;
};

type TurnstileVerification = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const AI_VERIFICATION_COOKIE = 'dd_ai_verified';
const AI_VERIFICATION_TTL_MS = 10 * 60 * 1000;

type RateLimitWindow = '60 m';

const RATE_LIMIT_CONFIG: Record<RateLimitName, { limit: number; windowMs: number; windowLabel: RateLimitWindow; prefix: string }> = {
  ai: { limit: 10, windowMs: 60 * 60_000, windowLabel: '60 m', prefix: 'rl:ai' },
  contact: { limit: 5, windowMs: 60 * 60_000, windowLabel: '60 m', prefix: 'rl:contact' },
};

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const upstashLimiters = redis
  ? {
      ai: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.ai.limit, RATE_LIMIT_CONFIG.ai.windowLabel),
        analytics: true,
        prefix: RATE_LIMIT_CONFIG.ai.prefix,
      }),
      contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.contact.limit, RATE_LIMIT_CONFIG.contact.windowLabel),
        analytics: true,
        prefix: RATE_LIMIT_CONFIG.contact.prefix,
      }),
    }
  : null;

const memoryBuckets = new Map<string, MemoryBucket>();

function signCookiePayload(payload: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY ?? 'missing-turnstile-secret';
  return createHmac('sha256', secret).update(payload).digest('hex');
}

function makeCookiePayload(req: NextRequest, expiresAt: number) {
  const ip = extractClientIp(req);
  const userAgent = req.headers.get('user-agent') ?? '';
  return `${expiresAt}:${ip}:${userAgent}`;
}

export function extractClientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}

export async function limitRequest(req: NextRequest, name: RateLimitName): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIG[name];
  const ip = extractClientIp(req);

  if (upstashLimiters) {
    const result = await upstashLimiters[name].limit(ip);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  const now = Date.now();
  for (const [key, entry] of memoryBuckets) {
    if (entry.reset <= now) memoryBuckets.delete(key);
  }

  const bucketKey = `${config.prefix}:${ip}`;
  const bucket = memoryBuckets.get(bucketKey);

  if (!bucket || bucket.reset <= now) {
    memoryBuckets.set(bucketKey, { count: 1, reset: now + config.windowMs });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: now + config.windowMs,
    };
  }

  if (bucket.count >= config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: bucket.reset,
    };
  }

  bucket.count += 1;
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - bucket.count,
    reset: bucket.reset,
  };
}

export async function verifyTurnstileToken(req: NextRequest, token: string, expectedAction: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    return { ok: false, message: 'Turnstile is not configured on the server.' };
  }

  let response: Response;
  try {
    response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: extractClientIp(req),
      }),
      cache: 'no-store',
    });
  } catch {
    return { ok: false, message: 'Verification service is unavailable right now.' };
  }

  if (!response.ok) {
    return { ok: false, message: 'Verification service is unavailable right now.' };
  }

  const result = (await response.json()) as TurnstileVerification;
  const requestHostname = req.nextUrl.hostname.toLowerCase();
  const allowedHostnames = new Set(
    (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean)
  );
  allowedHostnames.add(requestHostname);

  if (!result.success) {
    return { ok: false, message: 'Please complete the anti-bot check and try again.' };
  }

  if (result.action !== expectedAction) {
    return { ok: false, message: 'Verification did not match this form.' };
  }

  if (result.hostname && !allowedHostnames.has(result.hostname.toLowerCase())) {
    return { ok: false, message: 'Verification hostname mismatch.' };
  }

  return { ok: true };
}

export function hasValidAiVerification(req: NextRequest) {
  const cookie = req.cookies.get(AI_VERIFICATION_COOKIE)?.value;
  if (!cookie) return false;

  const [expiresAtRaw, signature] = cookie.split('.');
  const expiresAt = Number(expiresAtRaw);
  if (!expiresAt || !signature || expiresAt <= Date.now()) return false;

  const payload = makeCookiePayload(req, expiresAt);
  const expectedSignature = signCookiePayload(payload);

  const actual = Buffer.from(signature, 'hex');
  const expected = Buffer.from(expectedSignature, 'hex');
  if (actual.length !== expected.length) return false;

  return timingSafeEqual(actual, expected);
}

export function markAiVerified(res: NextResponse, req: NextRequest) {
  const expiresAt = Date.now() + AI_VERIFICATION_TTL_MS;
  const payload = makeCookiePayload(req, expiresAt);
  const signature = signCookiePayload(payload);

  res.cookies.set(AI_VERIFICATION_COOKIE, `${expiresAt}.${signature}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expiresAt),
  });
}

export function clampText(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength);
}

export function clampSingleLine(value: unknown, maxLength: number) {
  return clampText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
