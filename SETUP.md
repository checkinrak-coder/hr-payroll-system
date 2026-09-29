# Orbit HR – Local Setup & Testing Guide

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or later): https://nodejs.org/
- **PostgreSQL** (v12 or later): https://www.postgresql.org/download/
  - On macOS with Homebrew: `brew install postgresql`
  - On Windows: Use the PostgreSQL installer or Windows Subsystem for Linux (WSL)
  - On Linux: `sudo apt install postgresql` (Ubuntu/Debian)

## Step 1: Clone the Repository

```bash
git clone https://github.com/checkinrak-coder/hr-payroll-system.git
cd hr-payroll-system
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs Next.js, React, Prisma, and all required packages.

## Step 3: Set Up PostgreSQL Database

### Start PostgreSQL

**macOS (Homebrew):**
```bash
brew services start postgresql
```

**Linux (systemd):**
```bash
sudo systemctl start postgresql
```

**Windows (PostgreSQL installed via installer):**
PostgreSQL service should start automatically. If not, search for "Services" and start `postgresql-x64-XX`.

### Create a Database User and Database

Open the PostgreSQL command line:
```bash
psql -U postgres
```

Inside the PostgreSQL prompt, run:
```sql
CREATE USER orbit_user WITH PASSWORD 'orbit_password';
CREATE DATABASE orbit_hr OWNER orbit_user;
ALTER USER orbit_user CREATEDB;
\q
```

## Step 4: Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Open `.env` and set your database connection string:
```env
DATABASE_URL="postgresql://orbit_user:orbit_password@localhost:5432/orbit_hr?schema=public"
```

If you used different credentials, update them accordingly.

## Step 5: Initialize the Database

Generate the Prisma client:
```bash
npm run db:generate
```

Push the schema to PostgreSQL:
```bash
npm run db:push
```

Seed demo data (users, employees, departments, leave types):
```bash
npm run db:seed
```

You should see:
```
Demo HR data seeded.
```

## Step 6: Start the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Environments: .env

✓ Ready in 3.2s
```

## Step 7: Open in Your Browser

Navigate to:
```
http://localhost:3000
```

You will be redirected to the login page.

## Step 8: Log In with Demo Account

Use any of these demo credentials:

| Email | Password | Role |
|-------|----------|------|
| admin@acme.example | password123 | Administrator |
| hr@acme.example | password123 | HR Manager |
| payroll@acme.example | password123 | Payroll Officer |
| manager@acme.example | password123 | Manager |
| employee@acme.example | password123 | Employee |

Recommended: Start with **admin@acme.example / password123** to see all features.

## Available Routes

After logging in, you can navigate to:

- `/` – Dashboard with payroll overview and approvals
- `/employees` – Employee directory
- `/payroll` – Payroll center with calculations
- `/leave` – Leave and attendance requests
- `/documents` – Print-ready HR documents (payslips, leave forms)

## Testing Payroll Calculation

Test the payroll preview API:
```bash
curl -X POST http://localhost:3000/api/payroll/preview \
  -H 'content-type: application/json' \
  -d '{
    "basicSalary": 18500,
    "housingAllowance": 3500,
    "transportAllowance": 1000,
    "overtime": 500,
    "deductions": 250,
    "unpaidLeaveDays": 1
  }'
```

Expected response:
```json
{
  "currency": "AED",
  "grossPay": 23500,
  "unpaidLeave": 616.67,
  "totalDeductions": 866.67,
  "netPay": 22633.33
}
```

## Testing API Endpoints

### Get all employees:
```bash
curl http://localhost:3000/api/employees
```

### Get all leave requests:
```bash
curl http://localhost:3000/api/leave
```

### Create a new employee:
```bash
curl -X POST http://localhost:3000/api/employees \
  -H 'content-type: application/json' \
  -d '{
    "employeeNumber": "AC-0007",
    "firstName": "Test",
    "lastName": "Employee",
    "email": "test@acme.example",
    "jobTitle": "QA Engineer",
    "departmentId": "<department-id-from-db>",
    "joinedAt": "2024-01-15",
    "monthlySalary": 16000,
    "housingAllowance": 3000,
    "transportAllowance": 800
  }'
```

## Troubleshooting

### "connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL is not running. Start it:
  - macOS: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`
  - Windows: Check Services or restart the PostgreSQL service

### "password authentication failed for user 'orbit_user'"
- Verify the DATABASE_URL in .env matches your PostgreSQL credentials
- Run the CREATE USER step again in PostgreSQL

### "Prisma error: Database does not exist"
- Run `npm run db:push` to create tables
- Ensure the database name matches your DATABASE_URL

### Port 3000 already in use
- Kill the process or run on a different port:
  ```bash
  npm run dev -- -p 3001
  ```

## Stopping the Server

Press `Ctrl + C` in your terminal.

## Next Steps

- Explore the dashboard, employee directory, and payroll screens
- Test the leave request form
- Try the print preview for documents
- Review the database with: `psql -U orbit_user -d orbit_hr`
- Examine the Prisma schema: `cat prisma/schema.prisma`

## Production Notes

Before deploying to production:
- Use a strong password for the PostgreSQL user
- Set up proper authentication (OAuth, SAML, etc.)
- Implement audit logging for all payroll changes
- Validate all UAE payroll rules with a qualified professional
- Use environment variables for sensitive data
- Enable HTTPS
- Set up proper database backups
