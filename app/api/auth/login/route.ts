import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { SESSION_COOKIE, encodeSession } from '../../../lib/auth';

const DEMO_USERS: Record<string, { name: string; role: string; password: string }> = {
  'admin@acme.example': { name: 'Jordan Mitchell', role: 'ADMIN', password: 'password123' },
  'hr@acme.example': { name: 'Maya Fernandes', role: 'HR_MANAGER', password: 'password123' },
  'payroll@acme.example': { name: 'Daniel Wong', role: 'PAYROLL_OFFICER', password: 'password123' },
  'manager@acme.example': { name: 'Omar Khalid', role: 'MANAGER', password: 'password123' },
  'employee@acme.example': { name: 'Aisha Al Mansoori', role: 'EMPLOYEE', password: 'password123' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const demoUser = DEMO_USERS[email];
    if (!demoUser || password !== demoUser.password) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name: demoUser.name, role: demoUser.role as any },
      create: {
        email,
        name: demoUser.name,
        role: demoUser.role as any,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE,
      value: encodeSession({ id: user.id, email: user.email, name: user.name, role: user.role }),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'Unable to login right now.' }, { status: 500 });
  }
}
