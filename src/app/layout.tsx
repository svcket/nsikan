import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '@/components/global/CustomCursor';

export const metadata: Metadata = {
  title: 'Nsikan Etukudoh — Product Designer',
  description: 'Product designer crafting digital products, interfaces, and brand experiences.',
  metadataBase: new URL('https://nsikan.vercel.app'),
  openGraph: {
    title: 'Nsikan Etukudoh — Product Designer',
    description: 'Product designer crafting digital products, interfaces, and brand experiences.',
    url: 'https://nsikan.vercel.app',
    siteName: 'Nsikan Etukudoh',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1320,
        height: 800,
        alt: 'Nsikan Etukudoh — Product Designer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nsikan Etukudoh — Product Designer',
    description: 'Product designer crafting digital products, interfaces, and brand experiences.',
    images: ['/assets/og-image.png'],
  },
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
