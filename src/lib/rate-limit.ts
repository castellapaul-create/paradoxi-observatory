// Simple in-memory rate limiter — 5 requests per IP per window (default 60s).
// Works per serverless instance; sufficient to stop casual bot abuse.

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  opts: { max?: number; windowMs?: number } = {},
): { allowed: boolean; retryAfterSec: number } {
  const max = opts.max ?? 5;
  const windowMs = opts.windowMs ?? 60_000;
  const now = Date.now();

  let entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    store.set(ip, entry);
  }

  entry.count++;

  if (entry.count > max) {
    return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfterSec: 0 };
}
