import type { Metadata } from 'next';
import { Arapey } from 'next/font/google';
import './globals.css';

const arapey = Arapey({
  weight: '400',
  variable: '--font-arapey',
  subsets: ['latin'],
});

const shareDescription =
  'Um dia inesquecível está por vir! Com carinho, preparamos cada detalhe para celebrar nosso amor ao lado de quem mais amamos. Acompanhe nossa história, confira as informações da cerimônia, festa e deixe sua mensagem especial para nós.';

export const metadata: Metadata = {
  title: 'Maria e Rafael',
  description: 'Este é o site do nosso casamento Maria e Rafael',
  openGraph: {
    title: 'Create Next App',
    description: shareDescription,
    images: ['/og-image.png'],
  },
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
