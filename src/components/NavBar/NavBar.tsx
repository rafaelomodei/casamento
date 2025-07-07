'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const isMobile = useIsMobile();

  const items = [
    { href: 'nossas-historias/', label: 'Nossas Histórias' },
    { href: 'mensagens/', label: 'Mensagens' },
    { href: 'cerimonia/', label: 'Cerimónia' },
    { href: 'festa/', label: 'Festa' },
    { href: 'presentes/', label: 'Presentes' },
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

          <SidebarTrigger className='md:hidden' />
        </div>
      </main>

      {isMobile && (
        <Sidebar side='right' className='md:hidden'>
          <SidebarContent>
            <div className='flex flex-col items-center gap-2 p-4'>
              <Link href='/'>
                <Image
                  src={'/svg/logoNavBar.svg'}
                  alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
                  height={42}
                  width={42}
                />
              </Link>
              <span className='text-primary font-arapey text-lg text-center'>
                {BRIDE_AND_GROOM}
              </span>
            </div>
            <SidebarMenu>
              {items.map(({ href, label }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link href={href} className='text-primary'>
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      )}
    </SidebarProvider>
  );
};

export default NavBar;
