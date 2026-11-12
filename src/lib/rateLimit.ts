// Distributed & in-memory rate limiting with IP privacy hashing and input sanitization
import crypto from "node:crypto";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory token bucket fallback (instance-scoped)
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

/**
 * Anonymizes client IP addresses for privacy compliance (GDPR/ePrivacy).
 * Hashes the raw IP with SHA-256 and an environment-configurable salt.
 */
export function hashClientIdentifier(rawIp: string): string {
  const salt = process.env.RATE_LIMIT_SALT || "spiker-privacy-salt-2026";
  return crypto.createHash("sha256").update(`${salt}:${rawIp.trim()}`).digest("hex");
}

/**
 * Masks IPv4 and IPv6 addresses for database storage without retaining raw personal data.
 */
export function maskIpAddress(ip: string): string {
  const trimmed = ip.trim();
  // IPv4 format
  if (trimmed.includes(".")) {
    const parts = trimmed.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
  }
  // IPv6 format
  if (trimmed.includes(":")) {
    const parts = trimmed.split(":");
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:****:****`;
    }
  }
  return "anonymized-ip";
}

/**
 * Synchronous in-memory rate limit check.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetTime?: number } {
  const now = Date.now();
  const record = ipRequestMap.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    ipRequestMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

/**
 * Distributed rate limiter with automatic in-memory fallback.
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, uses Upstash Redis REST API.
 * Otherwise, falls back gracefully to in-memory token bucket.
 * Never throws or blocks requests on Redis timeouts/errors.
 */
export async function checkRateLimitAsync(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): Promise<{ allowed: boolean; remaining: number; resetTime?: number }> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // If Upstash credentials are not configured, use local memory bucket
  if (!redisUrl || !redisToken || !redisUrl.startsWith("http")) {
    return checkRateLimit(identifier, limit, windowMs);
  }

  try {
    const redisKey = `spiker:ratelimit:${identifier}`;
    const pipelineBody = JSON.stringify([
      ["INCR", redisKey],
      ["PEXPIRE", redisKey, windowMs, "NX"],
      ["PTTL", redisKey],
    ]);

    const res = await fetch(`${redisUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: pipelineBody,
      signal: AbortSignal.timeout(1500), // 1.5s strict timeout to prevent slow dependencies from stalling API
    });

    if (!res.ok) {
      console.warn(`[RATE_LIMIT_WARNING]: Upstash HTTP ${res.status}. Falling back to memory.`);
      return checkRateLimit(identifier, limit, windowMs);
    }

    const json = (await res.json()) as Array<{ result?: any }>;
    if (!Array.isArray(json) || json.length < 3) {
      return checkRateLimit(identifier, limit, windowMs);
    }

    const currentCount = Number(json[0]?.result) || 1;
    const ttlRemaining = Number(json[2]?.result) || windowMs;
    const resetTime = Date.now() + (ttlRemaining > 0 ? ttlRemaining : windowMs);

    if (currentCount > limit) {
      return { allowed: false, remaining: 0, resetTime };
    }

    return {
      allowed: true,
      remaining: Math.max(0, limit - currentCount),
      resetTime,
    };
  } catch (err: any) {
    console.warn(`[RATE_LIMIT_FALLBACK]: Redis check failed (${err.message}). Using memory fallback.`);
    return checkRateLimit(identifier, limit, windowMs);
  }
}

/**
 * Robust string sanitization protecting against XSS, control-character injection,
 * zero-width character spoofing, and malicious protocol schemes.
 */
export function sanitizeInput(input: unknown, maxLength: number = 250): string {
  if (typeof input !== "string") return "";

  return input
    .normalize("NFC") // Canonical Unicode Normalization
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "") // ASCII/ANSI control characters
    .replace(/[\u200B-\u200D\uFEFF\u2060]/g, "") // Zero-width spaces & format markers
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, "") // Bidirectional overrides (prevents text spoofing)
    .replace(/(?:javascript|vbscript|data|file):/gi, "") // Dangerous URI pseudo-protocols
    .replace(/[<>]/g, "") // Strip HTML tag delimiters
    .trim()
    .slice(0, maxLength);
}

// Backward-compatible alias
export const sanitizeString = sanitizeInput;

/**
 * Escapes characters for safe HTML context insertion.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
