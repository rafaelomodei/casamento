import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface GuideCardProps {
  imageSrc: string;
  title: string;
  children: React.ReactNode;
}

export default function GuideCard({ imageSrc, title, children }: GuideCardProps) {
  return (
    <Card className='w-full overflow-hidden text-primary'>
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={240}
        className='h-40 w-full object-cover'
      />
      <CardContent className='flex flex-col gap-2 pt-4'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
}
