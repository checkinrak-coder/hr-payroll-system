import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const employees = await prisma.employee.findMany({
    include: { department: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  });
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ['employeeNumber', 'firstName', 'lastName', 'email', 'jobTitle', 'departmentId', 'joinedAt'];
    const missing = required.filter((field) => !body[field]);
    if (missing.length) return NextResponse.json({ error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });

    const employee = await prisma.employee.create({
      data: {
        employeeNumber: String(body.employeeNumber),
        firstName: String(body.firstName),
        lastName: String(body.lastName),
        email: String(body.email),
        jobTitle: String(body.jobTitle),
        departmentId: String(body.departmentId),
        joinedAt: new Date(body.joinedAt),
        monthlySalary: Number(body.monthlySalary ?? 0),
        housingAllowance: Number(body.housingAllowance ?? 0),
        transportAllowance: Number(body.transportAllowance ?? 0),
      },
      include: { department: true },
    });
    return NextResponse.json(employee, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to create employee. Check the submitted values.' }, { status: 400 });
  }
}
