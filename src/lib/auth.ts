import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "peter-air-systems-jwt-secret-key-2026-production-ready";
const TOKEN_COOKIE_NAME = "peterair_admin_token";

export interface AdminPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

// ----------------- Password Hashing -----------------

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// ----------------- Token Management -----------------

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

// ----------------- Server-Side Auth Check -----------------

export async function getAuthenticatedAdmin(request?: Request): Promise<AdminPayload | null> {
  let token: string | undefined;

  // 1. Try Authorization header
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // 2. Try cookie header from request
  if (!token && request) {
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${TOKEN_COOKIE_NAME}=([^;]*)`));
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }
  }

  // 3. Fallback to Next.js cookies() store
  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
    } catch {
      // Outside of request context
    }
  }

  if (!token) return null;

  const payload = verifyAdminToken(token);
  if (!payload) return null;

  // Verify user still exists in database
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, role: true, name: true },
  });

  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}

export { TOKEN_COOKIE_NAME };

// ----------------- In-Memory Rate Limiting for Login -----------------

interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ipOrEmail: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ipOrEmail);

  if (!record) return { allowed: true };

  // Check lockout
  if (record.lockedUntil && record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // Reset window if expired
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(ipOrEmail);
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    const retryAfterSeconds = Math.ceil(LOCKOUT_MS / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

export function recordFailedLogin(ipOrEmail: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ipOrEmail);

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ipOrEmail, { count: 1, firstAttempt: now });
  } else {
    record.count += 1;
    if (record.count >= MAX_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_MS;
    }
  }
}

export function clearLoginAttempts(ipOrEmail: string): void {
  loginAttempts.delete(ipOrEmail);
}
