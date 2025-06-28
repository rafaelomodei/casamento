import type { Metadata } from 'next';
import { Arapey, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/Providers/theme-provider';

const arapey = Arapey({
  weight: '400',
  variable: '--font-arapey',
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
    <html lang='pt-br' suppressHydrationWarning>
      <body className={`${arapey.variable} antialiased`}>
        <main className='text-primary'>{children}</main>
      </body>
    </html>
  );
}
