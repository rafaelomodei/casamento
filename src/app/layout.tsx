import type { Metadata } from 'next';
import { Arapey, Arbutus_Slab, Poppins } from 'next/font/google';
import './globals.css';

export const arbutus = Arbutus_Slab({
  subsets: ['latin'],
  weight: ['400'], // único peso disponível
  display: 'swap',
  variable: '--font-body', // mapeamos p/ CSS var
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-title',
});

export const arapey = Arapey({
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
    <html lang='pt-br' suppressHydrationWarning>
      <body
        className={`${arbutus.className}  
       ${arbutus.variable}   /* --font-body     */
          ${poppins.variable}   /* --font-title    */
          ${arapey.variable}    /* --font-arapey   */
      antialiased text-primary`}
      >
        <main className='text-primary'>{children}</main>
      </body>
    </html>
  );
}
