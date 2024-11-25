import './globals.css';

export const metadata = {
  title: 'Focus Group Tool',
  description: 'Real-time focus group tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  );
}