import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LandBD — Bangladesh Land Intelligence',
  description: 'Bangladesh land, khatian, measurement, inheritance and GIS platform.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
