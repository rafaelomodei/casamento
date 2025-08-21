'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SidebarProvider } from '@/components/ui/sidebar';
import MobileSidebar from '@/components/MobileSidebar/MobileSidebar';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import { useAuth } from '@/Providers/auth-provider';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/entrar');

  if (isAuthPage) return null;

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
        <div className='flex w-full max-w-6xl items-center justify-between px-4 md:px-0'>
          <Link href='/'>
            <Image
              src={'/svg/logoNavBar.svg'}
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              height={42}
              width={42}
            />
          </Link>

          {!isAuthPage && (
            <nav className='hidden md:flex gap-4'>
              {items.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className='border-b border-transparent hover:border-primary'
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
          {!isAuthPage && (
            <div className='hidden md:block'>
              {user ? (
                <UserMenu />
              ) : (
                <Button asChild variant='secondary' className='text-white'>
                  <Link href='/entrar'>Entrar</Link>
                </Button>
              )}
            </div>
          )}
          <MobileSidebar items={items} />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default NavBar;
