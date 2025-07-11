'use client';

import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDesktopPageSkeleton() {
  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2'>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className='h-20 w-20 rounded-md bg-primary/50' />
              ))}
            </div>
            <Skeleton className='h-96 w-96 rounded-md bg-primary/50' />
          </div>
          <div className='flex flex-col gap-2 mt-6 max-w-xl'>
            <Skeleton className='h-6 w-32 bg-primary/50' />
            <Skeleton className='h-4 w-full bg-primary/50' />
            <Skeleton className='h-4 w-1/2 bg-primary/50' />
          </div>
        </div>
        <div className='flex flex-col w-full gap-4'>
          <Skeleton className='h-4 w-32 bg-primary/50' />
          <Skeleton className='h-8 w-3/4 bg-primary/50' />
          <Skeleton className='h-4 w-full bg-primary/50' />
          <div>
            <Skeleton className='h-10 w-40 bg-primary/50' />
            <Skeleton className='h-6 w-24 bg-primary/50 mt-1' />
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-40 bg-primary/50' />
            <div className='flex gap-8'>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className='h-8 w-16 bg-primary/50' />
              ))}
            </div>
          </div>
          <Skeleton className='h-16 w-48 bg-primary/50 mt-10' />
        </div>
      </div>
    </div>
  );
}
