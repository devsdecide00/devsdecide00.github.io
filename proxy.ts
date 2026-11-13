import { NextRequest, NextResponse } from 'next/server';
import { limitRequest } from './lib/abuse-prevention';
import { GEO_BLOCKED_HTML, isGeoBlocked } from './lib/geo-block';

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (
    isGeoBlocked(
      req.headers.get('x-vercel-ip-country'),
      req.headers.get('x-vercel-ip-country-region'),
      req.headers.get('user-agent')
    )
  ) {
    return new NextResponse(GEO_BLOCKED_HTML, {
      status: 451,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  if (path === '/api/ai') {
    const { success, limit, remaining, reset } = await limitRequest(req, 'ai');
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

  if (path === '/api/contact') {
    const { success, limit, remaining, reset } = await limitRequest(req, 'contact');
    if (!success) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Please wait before submitting again.' },
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
