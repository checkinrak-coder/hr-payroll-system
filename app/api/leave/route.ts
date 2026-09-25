import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const requests = await prisma.leaveRequest.findMany({
    include: { employee: true, leaveType: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    if (!body.employeeId || !body.leaveTypeId || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
      return NextResponse.json({ error: 'Valid employee, leave type, start date, and end date are required.' }, { status: 400 });
    }
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    const leave = await prisma.leaveRequest.create({
      data: { employeeId: body.employeeId, leaveTypeId: body.leaveTypeId, startDate, endDate, days, reason: body.reason ? String(body.reason) : undefined },
      include: { employee: true, leaveType: true },
    });
    return NextResponse.json(leave, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to submit leave request.' }, { status: 400 });
  }
}
