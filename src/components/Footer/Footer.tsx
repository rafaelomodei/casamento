import Link from 'next/link';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center w-full gap-4 py-8 border-t'>
      <nav className='flex gap-4'>
        <Link href='nossas-historias/'>Nossas Histórias</Link>
        <Link href='mensagens/'>Mensagens</Link>
        <Link href='cerimonia/'>Cerimónia</Link>
        <Link href='festa/'>Festa</Link>
        <Link href='presentes/'>Presentes</Link>
      </nav>

      <div className='flex gap-4'>
        <Link
          href='https://www.instagram.com/maria.rissatti'
          className='flex items-center gap-1'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Instagram size={16} />@maria.rissatti
        </Link>
        <Link
          href='https://www.instagram.com/rafael.omodei'
          className='flex items-center gap-1'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Instagram size={16} />@rafael.omodei
        </Link>
      </div>
      <p className="text-center">Feito com amor para celebrar nossa união.</p>

      <p className='text-sm text-center'>
        &copy; {new Date().getFullYear()} OmodeiLabs. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
