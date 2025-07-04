import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { CommentCardProps } from './interface';

export default function CommentCard({
  avatarUrl,
  name,
  date,
  message,
}: CommentCardProps) {
  return (
    <Card>
      <div className='flex items-start gap-4 px-6'>
        <Image
          src={avatarUrl}
          alt={name}
          width={48}
          height={48}
          className='h-12 w-12 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <p className='font-semibold'>{name}</p>
          <p className='text-sm text-muted-foreground'>{date}</p>
        </div>
      </div>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}
