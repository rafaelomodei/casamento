'use client';

import Image from 'next/image';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { formatCurrency } from '@/lib/utlils/currency';
import { Button } from '@/components/ui/button';
import Gift from '@/components/IconsAnimated/Gift/Gift';

interface Props {
  product: ProductDTO;
  selectedImage: string | null;
  setSelectedImage: (img: string) => void;
}

export function ProductDesktopPage({
  product,
  selectedImage,
  setSelectedImage,
}: Props) {
  const fallback = '/png/defaultImage.png';
  const images =
    product.images && product.images.length > 0 ? product.images : [fallback];

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />

      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2'>
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Imagem ${idx + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== fallback) target.src = fallback;
                  }}
                  className={`h-20 w-20 cursor-pointer rounded-md object-cover border transition ${
                    selectedImage === img
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-2 hover:ring-primary'
                  }`}
                />
              ))}
            </div>
            <div className='aspect-square overflow-hidden rounded-md border w-xl'>
              <Image
                src={selectedImage ?? images[0]}
                alt={product.title}
                width={300}
                height={300}
                className='h-full w-full object-cover'
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== fallback) target.src = fallback;
                }}
              />
            </div>
          </div>
          {product.description && (
            <div className='flex flex-col gap-2 max-w-xl'>
              <h2 className='text-xl'>Descrição</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full gap-4'>
          <p className='text-sm text-muted-foreground'>
            +{product.views ?? 1} Visualizações
          </p>

          <h1 className='text-2xl'>{product.title}</h1>
          <p className='text-md text-muted-foreground'>
            Este é um dos itens escolhidos com carinho para o nosso novo lar.
            Seu gesto de carinho vai fazer parte da nossa história!
          </p>
          <div>
            <p className='text-4xl'>{formatCurrency(product.price)}</p>
            <p className='text-xl'>Em até 6x</p>
          </div>

          <Button className='text-2xl py-8  text-white' variant='secondary'>
            <div className='mb-6'>
              <Gift />
            </div>
            Dar este presente
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDesktopPage;
