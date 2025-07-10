'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { capitalizeFirst, truncateWithEllipsis } from '@/lib/utlils/text';
import { formatCurrency } from '@/lib/utlils/currency';


interface ProductProps {
  slug: string;
  images: string[];
  title: string;
  description?: string;
  price: number;
  classNameCard?: string;
}

export function ProductCard(props: ProductProps) {
  const { slug, images, title, price, description, classNameCard } = props;
  const displayTitle = truncateWithEllipsis(capitalizeFirst(title), 20);
  const displayDescription = description
    ? truncateWithEllipsis(capitalizeFirst(description), 50)
    : undefined;
  return (
    <Link href={`/presentes/${slug}`} className='w-xs'>
      <Card
        className={cn(
          'min-w-sm text-primary py-0 relative transition border border-border bg-white shadow-none overflow-hidden rounded-md',
          `hover:border-primary hover:border-2  dark:hover:bg-muted/30 ${classNameCard}`
        )}
      >
        <ImageCarousel
          images={images}
          alt={title}
          hoverControls
          className='h-64 w-full'
        />

        <CardContent className='flex flex-col gap-2 pt-2'>
          <h3 className='text-lg'>{displayTitle}</h3>
          <p className='text-muted-foreground'>{displayDescription}</p>
          <p className='text-xl'>{formatCurrency(price)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
