'use client';

import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductMobilePageSkeleton() {
  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <Skeleton className='h-8 w-3/4 bg-primary/50' />
      <div className='w-full aspect-square rounded-md bg-primary/50' />
      <Skeleton className='h-4 w-32 bg-primary/50' />
      <Skeleton className='h-4 w-full bg-primary/50' />
      <Skeleton className='h-4 w-3/4 bg-primary/50' />
      <div>
        <Skeleton className='h-8 w-40 bg-primary/50' />
        <Skeleton className='h-6 w-24 bg-primary/50 mt-1' />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-32 bg-primary/50' />
        <div className='flex gap-8'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className='h-8 w-16 bg-primary/50' />
          ))}
        </div>
      </div>
      <Skeleton className='h-16 w-48 bg-primary/50 mt-10' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-32 bg-primary/50' />
        <Skeleton className='h-4 w-full bg-primary/50' />
        <Skeleton className='h-4 w-3/4 bg-primary/50' />
      </div>
    </div>
  );
}
