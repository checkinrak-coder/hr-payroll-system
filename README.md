# Orbit HR

A modern HR and payroll dashboard for UAE teams. Orbit HR is designed around a simple goal: make people operations feel clear, calm, and human.

## Delivered in this phase

- Prisma-backed employee and leave API routes (`/api/employees`, `/api/leave`)
- Leave and attendance workspace with request form and approval-ready statuses
- Documents library with print preview and browser PDF/print workflow
- Employee directory and payroll preview screens
- Corrected Prisma schema and TypeScript path configuration

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

Routes:

- `/` dashboard
- `/employees` employee directory
- `/payroll` payroll preview
- `/leave` leave and attendance
- `/documents` printable documents

The API requires a configured PostgreSQL database. The current UI uses representative data while the authentication and persistence wiring is completed.

## Important UAE payroll note

UAE payroll legislation, contracts, benefits, end-of-service calculations, and WPS requirements must be validated with a qualified UAE payroll/accounting professional before production use. The calculation layer is intentionally configurable and does not claim to implement every statutory rule.
