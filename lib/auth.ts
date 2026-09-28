import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'orbit_session';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export function encodeSession(user: SessionUser) {
  return Buffer.from(JSON.stringify(user)).toString('base64url');
}

export function decodeSession(value?: string | null): SessionUser | null {
  if (!value) return null;

  try {
    const decoded = Buffer.from(value, 'base64url').toString('utf8');
    return JSON.parse(decoded) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE)?.value;
  return decodeSession(cookieValue ?? null);
}
