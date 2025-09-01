 'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { capitalizeFirst, truncateWithEllipsis } from '@/lib/utlils/text';
import { formatCurrency } from '@/lib/utlils/currency';
import removeMd from 'remove-markdown';

const ImageCarousel = dynamic(
  () => import('@/components/ImageCarousel/ImageCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className='h-64 w-full bg-primary/20 animate-pulse rounded-md' />
    ),
  },
);

interface ProductProps {
  key?: string;
  slug: string;
  images: string[];
  title: string;
  description?: string;
  price: number;
  status?: 'available' | 'gifted';
  classNameCard?: string;
}

export function ProductCard(props: ProductProps) {
  const {
    key,
    slug,
    images,
    title,
    price,
    description,
    status,
    classNameCard,
  } = props;
  const displayTitle = truncateWithEllipsis(capitalizeFirst(title), 40);
  const displayDescription = description
    ? truncateWithEllipsis(capitalizeFirst(description), 70)
    : undefined;
  return (
    <Link key={key} href={`/presentes/${slug}`} className='w-xs'>
      <Card
        className={cn(
          'min-w-[343px] md:min-h-[478px] justify-between text-primary pt-0 relative transition border border-border bg-white shadow-none overflow-hidden rounded-md',
          `hover:border-primary hover:ring-2 hover:ring-primary dark:hover:bg-muted/30 ${classNameCard}`
        )}
      >
        <ImageCarousel
          images={images}
          alt={title}
          hoverControls
          className={cn('h-64 w-full', status === 'gifted' && 'grayscale')}
        />

        <CardContent className='flex flex-col gap-2 pt-2'>
          <h3 className='text-lg'>{displayTitle}</h3>
          <p className='text-muted-foreground text-justify'>
            {removeMd(displayDescription ?? '')}
          </p>
        </CardContent>
        <CardFooter>
          <p className='text-xl'>
            {status === 'gifted'
              ? 'Presente já foi dado'
              : formatCurrency(price)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
