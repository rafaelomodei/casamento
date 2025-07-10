'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

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
          <h3 className='text-lg'>{title}</h3>
          <p className='text-muted-foreground'>{description}</p>
          <p className='text-xl'>R$ {Number(price).toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
