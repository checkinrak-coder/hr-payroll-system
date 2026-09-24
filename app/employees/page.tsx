export const metadata = {
  title: 'Employees | Orbit HR',
};

const employees = [
  { name: 'Aisha Al Mansoori', role: 'Product Designer', dept: 'Design', status: 'Active', salary: 'AED 18,500', location: 'Dubai' },
  { name: 'Omar Khalid', role: 'Senior Engineer', dept: 'Engineering', status: 'Active', salary: 'AED 24,000', location: 'Sharjah' },
  { name: 'Maya Fernandes', role: 'HR Business Partner', dept: 'People', status: 'On leave', salary: 'AED 16,200', location: 'Abu Dhabi' },
  { name: 'Daniel Wong', role: 'Finance Analyst', dept: 'Finance', status: 'Active', salary: 'AED 14,800', location: 'Dubai' },
  { name: 'Sara Al Hashimi', role: 'Account Executive', dept: 'Sales', status: 'Active', salary: 'AED 12,500', location: 'Ajman' },
  { name: 'Ali Rahman', role: 'Operations Manager', dept: 'Operations', status: 'Active', salary: 'AED 21,100', location: 'Ras Al Khaimah' },
];

export default function EmployeesPage() {
  return (
    <main className="page-shell">
      <div className="content-panel wide-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">People directory</p>
            <h1>Employees</h1>
          </div>
          <a href="/" className="secondary-action">Back to dashboard</a>
        </div>

        <div className="toolbar-row">
          <div className="search-box">
            <span>⌕</span>
            <input value="" readOnly placeholder="Search employees" />
          </div>
          <button className="primary-button">+ Add employee</button>
        </div>

        <div className="table-wrap compact-table">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.name}>
                  <td>
                    <div className="person-cell">
                      <div className="mini-avatar">{employee.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
                      <div>
                        <strong>{employee.name}</strong>
                        <small>{employee.role}</small>
                      </div>
                    </div>
                  </td>
                  <td>{employee.dept}</td>
                  <td>{employee.location}</td>
                  <td><span className={employee.status === 'Active' ? 'status-pill active' : 'status-pill leave'}>{employee.status}</span></td>
                  <td><strong>{employee.salary}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
