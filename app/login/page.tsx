'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(data?.error ?? 'Login failed.');
      return;
    }

    window.location.href = '/';
  }

  return (
    <main className="login-shell">
      <div className="login-card">
        <div className="brand-block">
          <div className="brand-mark">O</div>
          <span>orbit<span>.</span></span>
        </div>
        <h1>Welcome back</h1>
        <p>Sign in to manage your workforce, payroll, and employee documents.</p>

        <form onSubmit={onSubmit} className="login-form">
          <label>
            Email
            <input name="email" type="email" defaultValue="admin@acme.example" required />
          </label>
          <label>
            Password
            <input name="password" type="password" defaultValue="password123" required />
          </label>

          {status && <div className="login-status">{status}</div>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="demo-box">
          Demo accounts:
          <ul>
            <li>admin@acme.example / password123</li>
            <li>hr@acme.example / password123</li>
            <li>payroll@acme.example / password123</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
