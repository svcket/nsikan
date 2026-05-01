import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '@/components/global/CustomCursor';

export const metadata: Metadata = {
  title: 'Portfolio Rebuild | Editorial Style',
  description: 'A premium portfolio recreation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className="font-sans antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
