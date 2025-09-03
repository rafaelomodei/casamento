import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';

export default function HomeProductsSkeleton() {
  return (
    <div className='flex flex-wrap gap-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='flex w-full md:flex-1/2'>
          <ProductCardSkeleton classNameCard='w-full' />
        </div>
      ))}
    </div>
  );
}

