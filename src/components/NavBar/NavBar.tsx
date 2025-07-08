'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SidebarProvider } from '@/components/ui/sidebar';
import MobileSidebar from '@/components/MobileSidebar/MobileSidebar';

const NavBar = () => {

  const items = [
    { href: '/nossas-historias', label: 'Nossas Histórias' },
    { href: '/mensagens', label: 'Mensagens' },
    { href: '/#cerimonia', label: 'Cerimónia' },
    { href: '/#festa', label: 'Festa' },
    { href: '/presentes', label: 'Presentes' },
  ];

  return (
    <SidebarProvider
      className='contents'
      style={{ minHeight: 'auto', display: 'contents' }}
    >
      <main className='flex w-full py-8 border-b justify-center'>
        <div className='flex w-full max-w-6xl items-center justify-between'>
          <Link href='/'>
            <Image
              src={'/svg/logoNavBar.svg'}
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              height={42}
              width={42}
            />
          </Link>

          <nav className='hidden md:flex gap-4'>
            {items.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className='border-b border-transparent hover:border-primary hover:rounded-b'
              >
                {label}
              </Link>
            ))}
          </nav>
          <MobileSidebar items={items} />
        </div>
      </main>

    </SidebarProvider>
  );
};

export default NavBar;
