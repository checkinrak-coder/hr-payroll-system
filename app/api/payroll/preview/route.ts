import { NextResponse } from 'next/server';
import { calculatePayroll } from '@/lib/payroll';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.basicSalary !== 'number' || body.basicSalary < 0) return NextResponse.json({ error: 'basicSalary must be a non-negative number' }, { status: 400 });
    return NextResponse.json({ currency: 'AED', ...calculatePayroll(body) });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request' }, { status: 400 });
  }
}
