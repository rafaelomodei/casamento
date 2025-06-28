import type { Metadata } from 'next';
import { Arapey, Geist_Mono } from 'next/font/google';
import './globals.css';

const arapey = Arapey({
  weight: '400',
  variable: '--font-arapey',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Maria e Rafael',
  description: 'Este é o site do nosso casamento Maria e Rafael',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body
        className={`${arapey.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
