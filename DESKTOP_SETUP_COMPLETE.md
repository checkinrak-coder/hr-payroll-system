# Orbit HR Desktop – Complete Setup

## Database Architecture

**Database Type**: SQLite 3 (local file-based)
**Location**: `~/.orbit-hr/orbit.db`

### Database Structure

```
users
├── id (String, CUID)
├── email (String, unique)
├── name (String)
├── role (Enum: ADMIN, HR_MANAGER, PAYROLL_OFFICER, MANAGER, EMPLOYEE)
├── createdAt (DateTime)
└── updatedAt (DateTime)

departments
├── id (String, CUID)
├── name (String, unique)
└── createdAt (DateTime)

employees
├── id (String, CUID)
├── employeeNumber (String, unique)
├── firstName (String)
├── lastName (String)
├── email (String, unique)
├── jobTitle (String)
├── status (Enum: ACTIVE, ON_LEAVE, SUSPENDED, TERMINATED)
├── monthlySalary (Float)
├── housingAllowance (Float)
├── transportAllowance (Float)
├── joinedAt (DateTime)
├── departmentId (FK → departments.id)
├── userId (FK → users.id)
├── createdAt (DateTime)
└── updatedAt (DateTime)

leave_types
├── id (String, CUID)
├── name (String, unique)
└── annualDays (Int)

leave_requests
├── id (String, CUID)
├── employeeId (FK → employees.id, CASCADE)
├── leaveTypeId (FK → leave_types.id, CASCADE)
├── startDate (DateTime)
├── endDate (DateTime)
├── days (Int)
├── reason (String, nullable)
├── status (Enum: PENDING, APPROVED, REJECTED, CANCELLED)
├── reviewedBy (String, nullable)
├── reviewedAt (DateTime, nullable)
└── createdAt (DateTime)

payroll_periods
├── id (String, CUID)
├── year (Int)
├── month (Int)
├── status (Enum: DRAFT, PENDING_APPROVAL, APPROVED, PAID)
├── createdAt (DateTime)
└── updatedAt (DateTime)
└── UNIQUE constraint: (year, month)

payroll_lines
├── id (String, CUID)
├── periodId (FK → payroll_periods.id, CASCADE)
├── employeeId (FK → employees.id, CASCADE)
├── basicSalary (Float)
├── allowances (Float)
├── overtime (Float)
├── deductions (Float)
├── unpaidLeave (Float)
├── netPay (Float)
├── createdAt (DateTime)
└── UNIQUE constraint: (periodId, employeeId)

documents
├── id (String, CUID)
├── employeeId (FK → employees.id, CASCADE)
├── type (String)
├── title (String)
├── storageKey (String)
└── createdAt (DateTime)

audit_logs
├── id (String, CUID)
├── actorId (String, nullable)
├── action (String)
├── entity (String)
├── entityId (String)
├── metadata (String, JSON as text)
├── createdAt (DateTime)
└── INDEX: (entity, entityId)
```

## Installation & Build Instructions

### Prerequisites

- **Node.js 18+**: https://nodejs.org/
- **Git**: https://git-scm.com/
- Windows users building for Windows 10+, 64-bit

### Step 1: Clone Repository

```bash
git clone https://github.com/checkinrak-coder/hr-payroll-system.git
cd hr-payroll-system
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Initialize Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

This creates SQLite database at `~/.orbit-hr/orbit.db` with seeded demo data.

### Step 4: Run in Development

```bash
npm run dev
```

This launches the Electron window with the Next.js frontend.

## Building Windows Installer

```bash
npm run build:win
```

Output: `dist/OrbitHR-Setup-1.0.0.exe`

Installer will create:
- Start menu shortcuts
- Desktop shortcut
- Uninstall entry in Windows Add/Remove Programs
- Application data directory at `%USERPROFILE%\.orbit-hr\orbit.db`

## Building macOS Installer

```bash
npm run build:mac
```

Output: `dist/OrbitHR-1.0.0.dmg`

## Building Linux AppImage

```bash
npm run build:linux
```

Output: `dist/OrbitHR-1.0.0.AppImage`

## Demo Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@acme.example | password123 | Administrator |
| hr@acme.example | password123 | HR Manager |
| payroll@acme.example | password123 | Payroll Officer |
| manager@acme.example | password123 | Manager |
| employee@acme.example | password123 | Employee |

## Application Flow

1. **App Launch**
   - Electron main process starts
   - Creates `~/.orbit-hr/` directory if missing
   - Loads Next.js server
   - Opens BrowserWindow pointing to localhost:3000 (dev) or built Next.js app (production)

2. **First Time Setup**
   - Prisma connects to SQLite at `~/.orbit-hr/orbit.db`
   - Database schema is auto-created (Prisma `db push`)
   - Seed script populates demo users, employees, departments, leave types

3. **Login**
   - User enters credentials
   - Prisma queries User table from SQLite
   - Session cookie stored (HttpOnly)
   - Redirects to dashboard

4. **Data Access**
   - All API routes (`/api/employees`, `/api/leave`, `/api/payroll/preview`) query SQLite via Prisma
   - No network calls required
   - All data persists locally

## File Changes Summary

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Changed datasource from `postgresql` to `sqlite`; changed Decimal to Float; added CASCADE deletes |
| `lib/prisma.ts` | Added auto-initialization of DATABASE_URL; creates ~/.orbit-hr directory if missing |
| `prisma/seed.ts` | Updated to use SQLite path; ensures directory exists |
| `package.json` | Removed `better-sqlite3` (not needed); added electron-builder config; added build scripts |
| `public/electron.js` | Updated to set DATABASE_URL; creates data directory on app ready |
| `public/preload.js` | Added IPC handlers for app data path |
| `.env.example` | Corrected to `file:./prisma/dev.db` |

## Remaining Limitations

1. **Single-Computer Deployment**: Desktop app runs on one computer per installation. For organization-wide access, use server deployment.
2. **SQLite Concurrent Write**: SQLite has lower concurrency than PostgreSQL. Not suitable for 100+ simultaneous users.
3. **Backup**: Users must manually back up `~/.orbit-hr/orbit.db`.
4. **Payroll Rules**: All UAE-specific payroll logic must be validated with a qualified professional.

## Verification Checklist

- [x] Prisma schema uses SQLite provider
- [x] Decimal fields converted to Float (SQLite-compatible)
- [x] DATABASE_URL auto-set to `file:~/.orbit-hr/orbit.db`
- [x] App data directory created on first run
- [x] Seed data populates automatically
- [x] No PostgreSQL dependency
- [x] No external database connection required
- [x] Electron launcher tested
- [x] Windows installer build configuration added
