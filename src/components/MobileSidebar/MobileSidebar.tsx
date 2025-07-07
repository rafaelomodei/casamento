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
} from '@/components/ui/sidebar';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  href: string;
  label: string;
}

interface MobileSidebarProps {
  items: NavItem[];
}

export default function MobileSidebar({ items }: MobileSidebarProps) {
  const isMobile = useIsMobile();

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
    </>
  );
}
