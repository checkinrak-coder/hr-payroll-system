import { PrismaClient, Role } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import os from 'os';

const APP_DATA_DIR = path.join(os.homedir(), '.orbit-hr');
const DB_PATH = path.join(APP_DATA_DIR, 'orbit.db');

// Ensure app data directory exists
if (!fs.existsSync(APP_DATA_DIR)) {
  fs.mkdirSync(APP_DATA_DIR, { recursive: true });
}

// Set DATABASE_URL for Prisma
process.env.DATABASE_URL = `file:${DB_PATH}`;

const prisma = new PrismaClient();

async function main() {
  try {
    console.log(`\n📦 Seeding database at: ${DB_PATH}`);

    // Create departments
    const departments = ['Engineering', 'Design', 'People', 'Finance', 'Sales', 'Operations'];
    for (const name of departments) {
      await prisma.department.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }
    console.log('✓ Departments created');

    // Create users
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
    console.log('✓ Demo users created');

    // Get department IDs
    const depts = await prisma.department.findMany();
    const deptMap = Object.fromEntries(depts.map(d => [d.name, d.id]));

    // Create employees
    const employees = [
      {
        employeeNumber: 'AC-0001',
        firstName: 'Aisha',
        lastName: 'Al Mansoori',
        email: 'aisha@acme.example',
        jobTitle: 'Product Designer',
        monthlySalary: 18500,
        housingAllowance: 3500,
        transportAllowance: 1000,
        departmentId: deptMap.Design,
      },
      {
        employeeNumber: 'AC-0002',
        firstName: 'Omar',
        lastName: 'Khalid',
        email: 'omar@acme.example',
        jobTitle: 'Senior Engineer',
        monthlySalary: 24000,
        housingAllowance: 4200,
        transportAllowance: 1200,
        departmentId: deptMap.Engineering,
      },
      {
        employeeNumber: 'AC-0003',
        firstName: 'Maya',
        lastName: 'Fernandes',
        email: 'maya@acme.example',
        jobTitle: 'HR Business Partner',
        monthlySalary: 16200,
        housingAllowance: 3000,
        transportAllowance: 900,
        departmentId: deptMap.People,
      },
      {
        employeeNumber: 'AC-0004',
        firstName: 'Daniel',
        lastName: 'Wong',
        email: 'daniel@acme.example',
        jobTitle: 'Finance Analyst',
        monthlySalary: 14800,
        housingAllowance: 2800,
        transportAllowance: 800,
        departmentId: deptMap.Finance,
      },
      {
        employeeNumber: 'AC-0005',
        firstName: 'Sara',
        lastName: 'Al Hashimi',
        email: 'sara@acme.example',
        jobTitle: 'Account Executive',
        monthlySalary: 12500,
        housingAllowance: 2500,
        transportAllowance: 750,
        departmentId: deptMap.Sales,
      },
      {
        employeeNumber: 'AC-0006',
        firstName: 'Ali',
        lastName: 'Rahman',
        email: 'ali@acme.example',
        jobTitle: 'Operations Manager',
        monthlySalary: 21100,
        housingAllowance: 3900,
        transportAllowance: 1000,
        departmentId: deptMap.Operations,
      },
    ];

    for (const employee of employees) {
      await prisma.employee.upsert({
        where: { email: employee.email },
        update: employee,
        create: {
          ...employee,
          joinedAt: new Date('2022-01-15'),
        },
      });
    }
    console.log('✓ Demo employees created');

    // Create leave types
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
    console.log('✓ Leave types created');

    console.log('\n✅ Database seeded successfully!\n');
  } catch (error) {
    console.error('❌ Seed error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
