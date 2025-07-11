import type { Metadata } from 'next';
import { Arapey, Arbutus_Slab, Poppins } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { AuthProvider } from '@/Providers/auth-provider';

const arbutus = Arbutus_Slab({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-body',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-title',
});

const arapey = Arapey({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-arapey',
});

const shareDescription =
  'Um dia inesquecível está por vir! Com carinho, preparamos cada detalhe para celebrar nosso amor ao lado de quem mais amamos. Acompanhe nossa história, confira as informações da cerimônia, festa e deixe sua mensagem especial para nós.';

export const metadata: Metadata = {
  title: 'Maria e Rafael',
  description: 'Este é o site do nosso casamento Maria e Rafael',
  metadataBase: new URL('https://mariaerafael.com.br/'),
  openGraph: {
    title: 'Maria Eduarda & Rafael Geovani',
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
    <html
      lang='pt-br'
      suppressHydrationWarning
      className='flex flex-col items-center'
    >
      <body
        className={`${arapey.className}
          ${arbutus.variable}
          ${poppins.variable}
          ${arapey.variable}
      antialiased text-primary flex flex-col w-full justify-center items-center`}
      >
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
