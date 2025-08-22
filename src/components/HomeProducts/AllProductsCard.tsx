'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function AllProductsCard() {
  return (
    <Link href='/presentes' className='w-xs'>
      <Card className='min-w-[343px] h-full bg-primary/5 items-center justify-center text-primary pt-0 relative transition border border-primary/50 shadow-none overflow-hidden rounded-md hover:border-primary hover:ring-2 hover:ring-primary dark:hover:bg-muted/30'>
        <CardContent className=' h-64 flex flex-col items-center justify-center text-center'>
          <h3 className='text-3xl mb-2'>Ver todos os presentes</h3>
          <p className='text-muted-foreground'>
            Clique aqui para ir para a página de produtos e ver todos os
            presentes.
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
