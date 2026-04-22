import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

function makeRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const redis = makeRedis();

const aiLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 m'), analytics: true, prefix: 'rl:ai' })
  : null;

const contactLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '60 m'), analytics: true, prefix: 'rl:contact' })
  : null;

export async function proxy(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1';

  const path = req.nextUrl.pathname;

  if (path === '/api/ai' && aiLimiter) {
    const { success, limit, remaining, reset } = await aiLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Too many requests — wait a moment before trying again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          },
        }
      );
    }
  }

  if (path === '/api/contact' && contactLimiter) {
    const { success } = await contactLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Please wait before submitting again.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/ai', '/api/contact'],
};
