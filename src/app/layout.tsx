import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Arbutus_Slab, Poppins } from 'next/font/google';
import Analytics from '@/components/Analytics';
import './globals.css';

export const arbutus = Arbutus_Slab({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-body',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-title',
});

const arapey = localFont({
  src: [
    {
      path: '../assets/fonts/Arapey/Arapey-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Arapey/Arapey-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
});

const shareDescription = `Um dia inesquecível está por vir! Com carinho, preparamos cada detalhe para
celebrar nosso amor ao lado de quem mais amamos. Acompanhe nossa história, confira as informações da
cerimônia, festa e deixe sua mensagem especial para nós.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://mariaerafael.com.br'),
  title: 'Maria e Rafael',
  description: 'Este é o site do nosso casamento Maria e Rafael',

  openGraph: {
    title: 'Maria Eduarda & Rafael Geovani',
    description: shareDescription,
    type: 'website',
    url: 'https://mariaerafael.com.br/',
    images: [
      {
        url: 'https://mariaerafael.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Convite aquarela – Maria Eduarda & Rafael, 27-09-2025',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Maria Eduarda & Rafael Geovani',
    description: shareDescription,
    images: ['https://mariaerafael.com.br/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br' suppressHydrationWarning>
      <body
        className={`
          ${arbutus.className}
          ${arbutus.variable}
          ${poppins.variable}
          ${arapey.className}
          antialiased text-primary
        `}
      >
        <Analytics />
        <main className='text-primary'>{children}</main>
      </body>
    </html>
  );
}
