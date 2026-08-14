type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function hit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  },
  5 * 60 * 1000,
).unref?.();

/** 5 login attempts per IP per 10 minutes. */
export function loginRateLimit(ip: string): boolean {
  return hit(`login:${ip}`, 5, 10 * 60 * 1000);
}

/** 5 contact form submissions per IP per hour. */
export function contactRateLimit(ip: string): boolean {
  return hit(`contact:${ip}`, 5, 60 * 60 * 1000);
}

/** 30 write operations (project/blog/upload) per IP per 10 minutes. */
export function apiWriteRateLimit(ip: string): boolean {
  return hit(`write:${ip}`, 30, 10 * 60 * 1000);
}
