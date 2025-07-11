'use client'

import { ProductDTO } from '@/domain/products/entities/ProductDTO'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { formatCurrency } from '@/lib/utlils/currency'

interface Props {
  product: ProductDTO
}

export function ProductMobilePage({ product }: Props) {
  const images = product.images && product.images.length > 0 ? product.images : ['/png/defaultImage.png']

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>{product.title}</h1>
      <p className='text-sm text-muted-foreground'>Visualizações: {product.views ?? 0}</p>
      <div className='w-full aspect-square'>
        <ImageCarousel images={images} alt={product.title} hoverControls={false} showIndicators={true} showControls={false} rounded={false} className='h-full w-full' />
      </div>
      <p className='font-semibold'>{formatCurrency(product.price)}</p>
      {product.description && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl'>Descrição</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  )
}

export default ProductMobilePage
