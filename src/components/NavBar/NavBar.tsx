'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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

  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (navRef.current) {
      setOffset(navRef.current.offsetHeight);
    }

    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll = current;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAuthPage) return null;

  const items = [
    { href: '/nossas-historias', label: 'Nossas Histórias' },
    { href: '/mensagens', label: 'Mensagens' },
    { href: '/#cerimonia', label: 'Cerimónia' },
    { href: '/#festa', label: 'Festa' },
    { href: '/presentes', label: 'Presentes' },
    { href: '/presentes/dados', label: 'Presentes Recebidos' },
  ];

  return (
    <SidebarProvider
      className='contents'
      style={{ minHeight: 'auto', display: 'contents' }}
    >
      <div
        ref={navRef}
        className={`fixed top-0 z-50 w-full transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <main className='flex w-full py-8 border-b justify-center bg-background'>
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
      </div>
      <div style={{ height: offset }} />
    </SidebarProvider>
  );
};

export default NavBar;
