'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

interface ProductProps {
  slug: string;
  images: string[];
  title: string;
  price: number;
}

export function ProductCard(props: ProductProps) {
  const { slug, images, title, price } = props;
  return (
    <Link href={`/presentes/${slug}`} className='w-xs'>
      <Card
        className={cn(
          'text-primary relative transition border border-border bg-white shadow-none overflow-hidden rounded-md',
          'hover:border-primary hover:border-2  dark:hover:bg-muted/30'
        )}
      >
        <ImageCarousel
          images={images}
          alt={title}
          hoverControls
          className='h-64 w-full'
        />

        <CardContent className='flex flex-col gap-2 pt-2'>
          <h3 className='text-md text-muted-foreground'>{title}</h3>
          <p className='text-lg font-semibold'>R$ {Number(price).toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
