import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentCardSkeleton() {
  return (
    <Card className='w-full min-w-full'>
      <div className='flex items-start gap-4 px-6 pb-2'>
        <Skeleton className='h-16 w-16 rounded-full bg-primary/50' />
        <div className='flex flex-col flex-1 gap-2'>
          <Skeleton className='h-4 w-32 bg-primary/50' />
          <Skeleton className='h-3 w-24 bg-primary/50' />
        </div>
      </div>
      <CardContent className='flex flex-col gap-2'>
        <Skeleton className='h-3 w-full bg-primary/50' />
        <Skeleton className='h-3 w-full bg-primary/50' />
        <Skeleton className='h-3 w-1/2 bg-primary/50' />
      </CardContent>
    </Card>
  );
}
