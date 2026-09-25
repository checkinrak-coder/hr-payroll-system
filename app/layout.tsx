import './globals.css';
import './feature-pages.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Orbit HR | People operations, simplified', description: 'UAE HR and payroll management' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
