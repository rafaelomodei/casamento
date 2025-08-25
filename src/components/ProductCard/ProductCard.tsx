'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { capitalizeFirst, truncateWithEllipsis } from '@/lib/utlils/text';
import { formatCurrency } from '@/lib/utlils/currency';
import removeMd from 'remove-markdown';

interface ProductProps {
  slug: string;
  images: string[];
  title: string;
  description?: string;
  price: number;
  status?: 'available' | 'gifted';
  classNameCard?: string;
}

export function ProductCard(props: ProductProps) {
  const { slug, images, title, price, description, status, classNameCard } = props;
  const displayTitle = truncateWithEllipsis(capitalizeFirst(title), 40);
  const displayDescription = description
    ? truncateWithEllipsis(capitalizeFirst(description), 70)
    : undefined;
  return (
    <Link href={`/presentes/${slug}`} className='w-xs'>
      <Card
        className={cn(
          'min-w-[343px] text-primary pt-0 relative transition border border-border bg-white shadow-none overflow-hidden rounded-md',
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
          <p className='text-xl'>
            {status === 'gifted'
              ? 'Presente já foi dado'
              : formatCurrency(price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
