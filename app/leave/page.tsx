'use client';

import { useState } from 'react';

const requests = [
  { employee: 'Maya Fernandes', type: 'Annual leave', dates: '24 Sep – 26 Sep 2024', days: 3, status: 'Pending', reason: 'Family holiday' },
  { employee: 'Omar Khalid', type: 'Sick leave', dates: '18 Sep 2024', days: 1, status: 'Approved', reason: 'Medical appointment' },
  { employee: 'Sara Al Hashimi', type: 'Annual leave', dates: '02 Oct – 04 Oct 2024', days: 3, status: 'Pending', reason: 'Personal time' },
];

export default function LeavePage() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState(requests);
  const [notice, setNotice] = useState('');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setItems([{ employee: String(data.get('employee')), type: String(data.get('type')), dates: `${data.get('start')} – ${data.get('end')}`, days: 1, status: 'Pending', reason: String(data.get('reason') || '—') }, ...items]);
    setShowForm(false);
    setNotice('Leave request saved as pending approval.');
    event.currentTarget.reset();
  }

  return <main className="page-shell"><div className="content-panel wide-panel">
    <div className="panel-header"><div><p className="eyebrow">People operations</p><h1>Leave & attendance</h1></div><a href="/" className="secondary-action">Back to dashboard</a></div>
    {notice && <p className="notice">{notice}</p>}
    <div className="leave-summary"><div><span>Pending requests</span><strong>{items.filter((item) => item.status === 'Pending').length}</strong></div><div><span>Annual leave balance</span><strong>21 days</strong></div><div><span>Attendance today</span><strong>96.4%</strong></div></div>
    <div className="toolbar-row"><div><h2 className="section-title">Leave requests</h2><p className="muted">Review and track employee time off.</p></div><button className="primary-button" onClick={() => setShowForm(true)}>+ New request</button></div>
    <div className="table-wrap"><table><thead><tr><th>Employee</th><th>Leave type</th><th>Dates</th><th>Days</th><th>Status</th><th>Reason</th></tr></thead><tbody>{items.map((item, index) => <tr key={`${item.employee}-${index}`}><td><strong>{item.employee}</strong></td><td>{item.type}</td><td>{item.dates}</td><td>{item.days}</td><td><span className={`status-pill ${item.status === 'Approved' ? 'active' : 'leave'}`}>{item.status}</span></td><td>{item.reason}</td></tr>)}</tbody></table></div>
    {showForm && <div className="modal-backdrop"><form className="modal" onSubmit={submit}><button type="button" className="modal-close" onClick={() => setShowForm(false)}>×</button><h2>New leave request</h2><p className="muted">Create a request for manager or HR approval.</p><div className="form-grid"><label>Employee<input name="employee" required defaultValue="Aisha Al Mansoori" /></label><label>Leave type<select name="type" defaultValue="Annual leave"><option>Annual leave</option><option>Sick leave</option><option>Unpaid leave</option></select></label><label>Start date<input name="start" type="date" required /></label><label>End date<input name="end" type="date" required /></label></div><label>Reason<textarea name="reason" placeholder="Optional reason" /></label><div className="modal-actions"><button type="button" className="secondary-action" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button">Submit request</button></div></form></div>}
  </div></main>;
}
