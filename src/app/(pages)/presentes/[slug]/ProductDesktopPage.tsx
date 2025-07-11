'use client'

import Image from 'next/image'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { ProductDTO } from '@/domain/products/entities/ProductDTO'
import { formatCurrency } from '@/lib/utlils/currency'

interface Props {
  product: ProductDTO
  selectedImage: string | null
  setSelectedImage: (img: string) => void
}

export function ProductDesktopPage({ product, selectedImage, setSelectedImage }: Props) {
  const fallback = '/png/defaultImage.png'
  const images = product.images && product.images.length > 0 ? product.images : [fallback]

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>{product.title}</h1>
      <p className='text-sm text-muted-foreground'>Visualizações: {product.views ?? 0}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                  const target = e.currentTarget as HTMLImageElement
                  if (target.src !== fallback) target.src = fallback
                }}
                className={`h-20 w-20 cursor-pointer rounded-md object-cover border transition ${selectedImage === img ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary'}`}
              />
            ))}
          </div>
          <div className='aspect-square overflow-hidden rounded-md border'>
            <Image
              src={selectedImage ?? images[0]}
              alt={product.title}
              width={400}
              height={400}
              className='h-full w-full object-cover'
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                if (target.src !== fallback) target.src = fallback
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>{formatCurrency(product.price)}</p>
          {product.description && (
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl'>Descrição</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDesktopPage
