'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/Providers/auth-provider';
import { usePathname } from 'next/navigation';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeWords } from '@/lib/utlils/text';

interface NavItem {
  href: string;
  label: string;
}

interface MobileSidebarProps {
  items: NavItem[];
}

export default function MobileSidebar({ items }: MobileSidebarProps) {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/entrar');
  const displayName = user ? capitalizeWords(user.name) : '';

  return (
    <>
      <SidebarTrigger className='md:hidden' />
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
                  <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                    <Link href={href} className='text-primary'>
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {!isAuthPage && (
              <div className='mt-auto flex flex-col gap-2 p-4 pb-8'>
                {user ? (
                  <>
                    <Button variant='outline' onClick={signOut}>Sair</Button>
                    <div className='flex items-center gap-2'>
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className='size-8 rounded-full object-cover'
                      />
                      <span className='font-medium'>{displayName}</span>
                    </div>
                  </>
                ) : (
                  <Button asChild variant='secondary' className='text-white'>
                    <Link href='/entrar'>Entrar</Link>
                  </Button>
                )}
              </div>
            )}
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
