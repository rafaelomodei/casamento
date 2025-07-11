'use client';

import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductMobilePageSkeleton() {
  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <Skeleton className='h-8 w-3/4 bg-primary/50' />
      <Skeleton className='h-4 w-32 bg-primary/50' />
      <Skeleton className='w-full aspect-square bg-primary/50' />
      <Skeleton className='h-6 w-1/2 bg-primary/50' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-32 bg-primary/50' />
        <Skeleton className='h-4 w-full bg-primary/50' />
        <Skeleton className='h-4 w-3/4 bg-primary/50' />
      </div>
    </div>
  );
}
