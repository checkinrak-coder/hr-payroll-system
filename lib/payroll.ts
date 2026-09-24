export type PayrollInput = { basicSalary: number; housingAllowance?: number; transportAllowance?: number; overtime?: number; deductions?: number; unpaidLeaveDays?: number };
export type PayrollResult = { grossPay: number; unpaidLeave: number; totalDeductions: number; netPay: number };

/** UAE-ready baseline: company-specific deductions and tax rules must be configured before production use. */
export function calculatePayroll(input: PayrollInput): PayrollResult {
  const basic = Math.max(0, input.basicSalary);
  const allowances = Math.max(0, (input.housingAllowance ?? 0) + (input.transportAllowance ?? 0));
  const overtime = Math.max(0, input.overtime ?? 0);
  const unpaidLeave = Math.round((basic / 30) * Math.max(0, input.unpaidLeaveDays ?? 0) * 100) / 100;
  const totalDeductions = Math.round((Math.max(0, input.deductions ?? 0) + unpaidLeave) * 100) / 100;
  const grossPay = Math.round((basic + allowances + overtime) * 100) / 100;
  return { grossPay, unpaidLeave, totalDeductions, netPay: Math.round((grossPay - totalDeductions) * 100) / 100 };
}
