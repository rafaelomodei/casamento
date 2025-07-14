import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductMobilePageSkeleton() {
  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <Skeleton className='h-8 w-3/4 bg-primary/50' />
      <Skeleton className='aspect-square w-full bg-primary/50' />
      <Skeleton className='h-4 w-32 bg-primary/50' />
      <Skeleton className='h-4 w-full bg-primary/50' />
      <Skeleton className='h-4 w-1/2 bg-primary/50' />
      <Skeleton className='h-8 w-1/3 bg-primary/50' />
      <div className='flex gap-8'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-8 w-20 bg-primary/50' />
        ))}
      </div>
      <Skeleton className='h-16 w-full bg-primary/50 mt-4' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-5 w-32 bg-primary/50' />
        <Skeleton className='h-4 w-full bg-primary/50' />
        <Skeleton className='h-4 w-1/2 bg-primary/50' />
      </div>
    </div>
  )
}
