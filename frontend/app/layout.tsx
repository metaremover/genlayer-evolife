import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EvoLife — Autonomous Self-Evolving On-Chain Synthetic Organism',
  description: 'A living, self-mutating Intelligent Contract reacting autonomously to real-world environment telemetry on GenLayer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060913] text-slate-100 min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
