# Orbit HR

A modern HR and payroll dashboard for UAE teams. Orbit HR is designed around a simple goal: make people operations feel clear, calm, and human.

## Current MVP

- Responsive HR dashboard with overview metrics
- People directory with search
- Payroll spend visualisation
- Approval queue for leave, expenses, and contracts
- Add employee modal
- AED/UAE-ready labels and payroll overview
- Responsive mobile navigation
- PostgreSQL/Prisma domain schema for users, employees, leave, payroll, documents, and audit logs
- Payroll preview API with configurable allowances, overtime, deductions, and unpaid leave

## Run locally

```bash
npm install
cp .env.example .env
# Set DATABASE_URL in .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Payroll preview example:

```bash
curl -X POST http://localhost:3000/api/payroll/preview \
  -H 'content-type: application/json' \
  -d '{"basicSalary":18500,"housingAllowance":3500,"transportAllowance":1000,"overtime":500,"deductions":250,"unpaidLeaveDays":1}'
```

## Important UAE payroll note

UAE payroll legislation, contracts, benefits, end-of-service calculations, and WPS requirements must be validated with a qualified UAE payroll/accounting professional before production use. The calculation layer is intentionally configurable and does not claim to implement every statutory rule.

## Roadmap

Next: authentication, employee CRUD screens backed by Prisma, leave balance workflows, payroll finalization and approval, secure PDF payslips/leave forms, storage integration, and audit-log middleware.
