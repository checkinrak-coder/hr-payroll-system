export const metadata = {
  title: 'Payroll | Orbit HR',
};

const sample = {
  employee: 'Aisha Al Mansoori',
  role: 'Product Designer',
  basicSalary: 18500,
  housingAllowance: 3500,
  transportAllowance: 1000,
  overtime: 500,
  deductions: 250,
  unpaidLeaveDays: 1,
};

export default function PayrollPage() {
  const grossPay = sample.basicSalary + sample.housingAllowance + sample.transportAllowance + sample.overtime;
  const unpaidLeave = (sample.basicSalary / 30) * sample.unpaidLeaveDays;
  const netPay = grossPay - sample.deductions - unpaidLeave;

  return (
    <main className="page-shell">
      <div className="content-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Payroll center</p>
            <h1>Payroll</h1>
          </div>
          <a href="/" className="secondary-action">Back to dashboard</a>
        </div>

        <div className="payroll-grid">
          <section className="payroll-card">
            <h2>Payroll preview</h2>
            <div className="payroll-employee">
              <div className="mini-avatar large">AA</div>
              <div>
                <strong>{sample.employee}</strong>
                <small>{sample.role}</small>
              </div>
            </div>

            <div className="money-list">
              <div><span>Basic salary</span><strong>AED {sample.basicSalary.toLocaleString()}</strong></div>
              <div><span>Housing allowance</span><strong>AED {sample.housingAllowance.toLocaleString()}</strong></div>
              <div><span>Transport allowance</span><strong>AED {sample.transportAllowance.toLocaleString()}</strong></div>
              <div><span>Overtime</span><strong>AED {sample.overtime.toLocaleString()}</strong></div>
              <div><span>Unpaid leave</span><strong>-AED {unpaidLeave.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
              <div><span>Deductions</span><strong>-AED {sample.deductions.toLocaleString()}</strong></div>
              <div className="total-row"><span>Net pay</span><strong>AED {netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
            </div>
          </section>

          <section className="payroll-card accent-card">
            <h2>Payroll settings</h2>
            <div className="fields">
              <label>
                Salary period
                <input defaultValue="September 2024" />
              </label>
              <label>
                Currency
                <input defaultValue="AED" />
              </label>
              <label>
                Pay frequency
                <input defaultValue="Monthly" />
              </label>
              <label>
                Approval status
                <input defaultValue="Pending approval" />
              </label>
            </div>
            <button className="primary-button full-width">Approve payroll</button>
          </section>
        </div>
      </div>
    </main>
  );
}
