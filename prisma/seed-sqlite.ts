import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const departments = ['Engineering', 'Design', 'People', 'Finance', 'Sales', 'Operations'];

  for (const name of departments) {
    await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const users = [
    { email: 'admin@acme.example', name: 'Jordan Mitchell', role: Role.ADMIN },
    { email: 'hr@acme.example', name: 'Maya Fernandes', role: Role.HR_MANAGER },
    { email: 'payroll@acme.example', name: 'Daniel Wong', role: Role.PAYROLL_OFFICER },
    { email: 'manager@acme.example', name: 'Omar Khalid', role: Role.MANAGER },
    { email: 'employee@acme.example', name: 'Aisha Al Mansoori', role: Role.EMPLOYEE },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, role: user.role },
      create: { email: user.email, name: user.name, role: user.role },
    });
  }

  const design = await prisma.department.findUnique({ where: { name: 'Design' } });
  const engineering = await prisma.department.findUnique({ where: { name: 'Engineering' } });
  const people = await prisma.department.findUnique({ where: { name: 'People' } });
  const finance = await prisma.department.findUnique({ where: { name: 'Finance' } });
  const sales = await prisma.department.findUnique({ where: { name: 'Sales' } });
  const operations = await prisma.department.findUnique({ where: { name: 'Operations' } });

  const employeeSeed = [
    { employeeNumber: 'AC-0001', firstName: 'Aisha', lastName: 'Al Mansoori', email: 'aisha@acme.example', jobTitle: 'Product Designer', monthlySalary: 18500, housingAllowance: 3500, transportAllowance: 1000, departmentId: design!.id },
    { employeeNumber: 'AC-0002', firstName: 'Omar', lastName: 'Khalid', email: 'omar@acme.example', jobTitle: 'Senior Engineer', monthlySalary: 24000, housingAllowance: 4200, transportAllowance: 1200, departmentId: engineering!.id },
    { employeeNumber: 'AC-0003', firstName: 'Maya', lastName: 'Fernandes', email: 'maya@acme.example', jobTitle: 'HR Business Partner', monthlySalary: 16200, housingAllowance: 3000, transportAllowance: 900, departmentId: people!.id },
    { employeeNumber: 'AC-0004', firstName: 'Daniel', lastName: 'Wong', email: 'daniel@acme.example', jobTitle: 'Finance Analyst', monthlySalary: 14800, housingAllowance: 2800, transportAllowance: 800, departmentId: finance!.id },
    { employeeNumber: 'AC-0005', firstName: 'Sara', lastName: 'Al Hashimi', email: 'sara@acme.example', jobTitle: 'Account Executive', monthlySalary: 12500, housingAllowance: 2500, transportAllowance: 750, departmentId: sales!.id },
    { employeeNumber: 'AC-0006', firstName: 'Ali', lastName: 'Rahman', email: 'ali@acme.example', jobTitle: 'Operations Manager', monthlySalary: 21100, housingAllowance: 3900, transportAllowance: 1000, departmentId: operations!.id },
  ];

  for (const employee of employeeSeed) {
    await prisma.employee.upsert({
      where: { email: employee.email },
      update: employee,
      create: {
        ...employee,
        joinedAt: new Date('2022-01-15'),
      },
    });
  }

  const leaveTypes = [
    { name: 'Annual leave', annualDays: 30 },
    { name: 'Sick leave', annualDays: 15 },
    { name: 'Unpaid leave', annualDays: 10 },
  ];

  for (const type of leaveTypes) {
    await prisma.leaveType.upsert({
      where: { name: type.name },
      update: type,
      create: type,
    });
  }

  console.log('✓ Demo HR data seeded successfully.');
}

main().finally(async () => {
  await prisma.$disconnect();
});
