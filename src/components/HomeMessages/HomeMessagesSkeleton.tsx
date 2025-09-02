import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton';

export default function HomeMessagesSkeleton() {
  return (
    <div className='flex flex-wrap gap-8'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='flex w-full md:flex-1/3'>
          <CommentCardSkeleton />
        </div>
      ))}
    </div>
  );
}

