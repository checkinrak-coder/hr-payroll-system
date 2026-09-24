import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const departments = await Promise.all(['Engineering', 'Design', 'People', 'Finance', 'Sales'].map(name => prisma.department.upsert({ where: { name }, update: {}, create: { name } })));
  const annual = await prisma.leaveType.upsert({ where: { name: 'Annual leave' }, update: {}, create: { name: 'Annual leave', annualDays: 30 } });
  await prisma.leaveType.upsert({ where: { name: 'Sick leave' }, update: {}, create: { name: 'Sick leave', annualDays: 15 } });
  const admin = await prisma.user.upsert({ where: { email: 'admin@acme.example' }, update: {}, create: { email: 'admin@acme.example', name: 'Jordan Mitchell', role: Role.ADMIN } });
  const people = await prisma.employee.count();
  if (!people) {
    await prisma.employee.create({ data: { employeeNumber: 'AC-0001', firstName: 'Aisha', lastName: 'Al Mansoori', email: 'aisha@acme.example', jobTitle: 'Product Designer', monthlySalary: 18500, housingAllowance: 3500, transportAllowance: 1000, joinedAt: new Date('2022-04-11'), departmentId: departments.find(d => d.name === 'Design')!.id, userId: admin.id } });
  }
  console.log(`Seeded ${departments.length} departments and ${annual.name}.`);
}

main().finally(() => prisma.$disconnect());
