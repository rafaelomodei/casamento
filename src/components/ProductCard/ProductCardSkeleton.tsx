import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  classNameCard?: string;
}

export default function ProductCardSkeleton({ classNameCard }: ProductCardSkeletonProps) {
  return (
    <Card
      className={cn(
        'min-w-sm py-0 relative overflow-hidden rounded-md border border-border shadow-none',
        classNameCard,
      )}
    >
      <Skeleton className='h-64 w-full bg-primary/50' />
      <CardContent className='flex flex-col gap-2 pt-2'>
        <Skeleton className='h-5 w-3/4 bg-primary/50' />
        <Skeleton className='h-4 w-full bg-primary/50' />
        <Skeleton className='h-6 w-1/2 bg-primary/50' />
      </CardContent>
    </Card>
  );
}
