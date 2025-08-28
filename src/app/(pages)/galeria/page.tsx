import fs from 'fs';
import path from 'path';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import GalleryImage from '@/components/GalleryImage';

export default function GaleriaPage() {
  const imagesDir = path.join(process.cwd(), 'public/png/preWedding');
  const images = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file))
    .map((file) => `/png/preWedding/${file}`);

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Galeria</h1>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {images.map((image, idx) => (
          <GalleryImage key={image} src={image} alt={image} images={images} index={idx} />
        ))}
      </div>
    </main>
  );
}

