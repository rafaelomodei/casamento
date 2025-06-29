import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='flex w-full justify-between py-8'>
      <Image
        src={'/svg/logoNavBar.svg'}
        alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
        height={42}
        width={42}
      />

      <div className='flex gap-4'>
        <Link href='nossas-historias/'>Nossas Histórias</Link>
        <Link href='mensagens/'>Mensagens</Link>
        <Link href='cerimonia/'>Cerimónia</Link>
        <Link href='festa/'>Festa</Link>
        <Link href='presentes/'>Presentes</Link>
      </div>
    </nav>
  );
};

export default NavBar;
