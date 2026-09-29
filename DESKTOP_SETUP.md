# Orbit HR – Desktop Installer Guide

## Overview

Orbit HR is now available as a standalone desktop application that runs on Windows, macOS, and Linux. All data is stored locally on your computer using SQLite—no external database or internet connection required.

## System Requirements

- **Windows 10+** (64-bit) or **Windows 11**
- **macOS 10.13+** (64-bit)
- **Linux** (Ubuntu 18.04+, Fedora 32+, etc.)
- Minimum 2GB RAM
- 500MB free disk space

## Installation

### Option 1: Download Installer (Recommended)

1. Go to: https://github.com/checkinrak-coder/hr-payroll-system/releases
2. Download the latest installer for your OS:
   - **Windows**: `OrbitHR-Setup-1.0.0.exe`
   - **macOS**: `OrbitHR-1.0.0.dmg`
   - **Linux**: `OrbitHR-1.0.0.AppImage`
3. Run the installer and follow the on-screen instructions
4. The application will launch automatically

### Option 2: Build from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/checkinrak-coder/hr-payroll-system.git
   cd hr-payroll-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the desktop app:
   ```bash
   npm run build
   ```

4. The installer will be created in the `dist/` folder

5. Run the installer for your OS

## First Launch

When you launch Orbit HR for the first time:

1. The app will automatically create a local database at:
   - **Windows**: `C:\Users\YourUsername\.orbit-hr\orbit.db`
   - **macOS**: `/Users/YourUsername/.orbit-hr/orbit.db`
   - **Linux**: `/home/YourUsername/.orbit-hr/orbit.db`

2. Demo data will be seeded automatically (employees, departments, leave types)

3. You'll see the login screen

## Login with Demo Account

Use these credentials to sign in:

| Email | Password | Role |
|-------|----------|------|
| admin@acme.example | password123 | Administrator |
| hr@acme.example | password123 | HR Manager |
| payroll@acme.example | password123 | Payroll Officer |
| manager@acme.example | password123 | Manager |
| employee@acme.example | password123 | Employee |

Recommended: Start with **admin@acme.example / password123**

## Features

### Dashboard
- View total employees, payroll spend, pending approvals, and attendance summary
- Quick access to all key HR metrics

### Employees
- Complete employee directory
- Add, view, and manage employee profiles
- Track departments and job titles
- View salary and allowance information

### Payroll
- Calculate payroll with AED support
- Preview salary breakdown (basic, allowances, deductions, net pay)
- Handle unpaid leave and overtime
- Approval workflow for payroll periods

### Leave & Attendance
- Submit and track leave requests
- View leave balances (annual, sick, unpaid)
- Manager approval workflow
- Print leave request forms

### Documents
- Generate payslips (PDF-ready)
- Print leave forms
- View employment letters
- Browser print-to-PDF workflow

## Data Management

### Backup Your Data

Your data is stored in a local SQLite database. To back it up:

**Windows:**
```
Copy C:\Users\YourUsername\.orbit-hr\orbit.db to a safe location
```

**macOS/Linux:**
```bash
cp ~/.orbit-hr/orbit.db ~/Dropbox/orbit-backup.db
# or
cp ~/.orbit-hr/orbit.db /mnt/backup/orbit-backup.db
```

### Restore from Backup

1. Close Orbit HR
2. Replace the `orbit.db` file with your backup
3. Reopen Orbit HR

### Reset to Factory Settings

To erase all data and reset to defaults:

1. Close Orbit HR
2. Delete the `.orbit-hr` folder:
   - **Windows**: Delete `C:\Users\YourUsername\.orbit-hr`
   - **macOS/Linux**: `rm -rf ~/.orbit-hr`
3. Reopen Orbit HR (it will rebuild with demo data)

## Troubleshooting

### "App won't start"
- Try uninstalling and reinstalling
- Ensure your OS is up to date
- Check that you have 500MB free disk space

### "Database error"
- Close Orbit HR
- Delete `.orbit-hr` folder to reset
- Reopen Orbit HR

### "Login not working"
- Ensure you're using the exact email and password from the table above
- Try clearing browser cache (Ctrl+Shift+Delete on Windows, Cmd+Shift+Delete on macOS)

### "Print preview not working"
- Use your browser's print dialog (Ctrl+P on Windows, Cmd+P on macOS)
- Save as PDF if you don't have a physical printer

## Uninstallation

### Windows
1. Go to Settings → Apps → Installed apps
2. Find "Orbit HR" and click Uninstall
3. Follow the prompts

### macOS
1. Open Finder
2. Go to Applications
3. Drag "Orbit HR" to Trash

### Linux
1. Use your package manager, or
2. Right-click the AppImage and select Remove

## Important Notes

⚠️ **Before Production Use:**

1. **UAE Payroll Compliance**: Validate all payroll calculations with a qualified UAE payroll/accounting professional. This system is configurable but does not automatically implement all statutory rules.

2. **Data Security**: This is a desktop application. For sensitive HR data:
   - Use strong computer login passwords
   - Keep your computer updated with security patches
   - Regularly back up your data
   - Consider encrypting your hard drive

3. **Backups**: Always maintain regular backups of your database

4. **Multi-User Access**: This desktop version runs on a single computer. For multi-user access across an organization, consider the server deployment version.

## Support & Updates

- Check for updates when you open the app
- Visit: https://github.com/checkinrak-coder/hr-payroll-system
- Report issues: https://github.com/checkinrak-coder/hr-payroll-system/issues

## License

Orbit HR is provided as-is for your organization's use.
