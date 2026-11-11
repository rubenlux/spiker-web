// In-memory token bucket rate limiter for API route protection

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, record] of ipRequestMap.entries()) {
    if (now > record.resetTime) {
      ipRequestMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

if (typeof cleanupInterval.unref === "function") {
  cleanupInterval.unref();
}

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestMap.get(identifier);

  if (!record || now > record.resetTime) {
    ipRequestMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

export function sanitizeString(input: unknown, maxLength: number = 250): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // Strip null bytes and control chars
    .replace(/[<>]/g, "") // Strip HTML tags
    .slice(0, maxLength);
}
