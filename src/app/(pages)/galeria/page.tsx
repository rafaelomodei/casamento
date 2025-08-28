import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export default function GaleriaPage() {
  const imagesDir = path.join(process.cwd(), 'public/png/preWedding');
  const images = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file));

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Galeria</h1>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {images.map((image) => (
          <div key={image} className='relative aspect-square overflow-hidden rounded'>
            <Image
              src={`/png/preWedding/${image}`}
              alt={image}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw'
            />
          </div>
        ))}
      </div>
    </main>
  );
}

