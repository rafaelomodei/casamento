import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <main className='flex w-full  py-8 border-b justify-center'>
      <div className='flex w-full  max-w-6xl justify-between'>
        <Link href='/'>
          <Image
            src={'/svg/logoNavBar.svg'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            height={42}
            width={42}
          />
        </Link>

        <nav className='flex gap-4'>
          <Link href='nossas-historias/'>Nossas Histórias</Link>
          <Link href='mensagens/'>Mensagens</Link>
          <Link href='cerimonia/'>Cerimónia</Link>
          <Link href='festa/'>Festa</Link>
          <Link href='presentes/'>Presentes</Link>
        </nav>
      </div>
    </main>
  );
};

export default NavBar;
