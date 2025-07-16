'use client'

import { ProductDTO } from '@/domain/products/entities/ProductDTO'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { formatCurrency } from '@/lib/utlils/currency'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Gift, { GiftHandle } from '@/components/IconsAnimated/Gift/Gift'
import { useRef } from 'react'
import { useAuthRequired } from '@/hooks/use-auth-required'

interface Props {
  product: ProductDTO
}

export function ProductMobilePage({ product }: Props) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['/png/defaultImage.png']
  const giftRef = useRef<GiftHandle>(null)
  const { requireAuth, dialog } = useAuthRequired()
  const loginMessage =
    '✨ Quer garantir este presente para os noivos?\nFaça login rapidinho e conclua sua compra.\nAssim registramos sua contribuição com carinho!'

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>{product.title}</h1>
      <div className='w-full aspect-square'>
        <ImageCarousel
          images={images}
          alt={product.title}
          hoverControls={false}
          showIndicators
          showControls={false}
          rounded={false}
          className='h-full w-full'
        />
      </div>
      <p className='text-sm text-muted-foreground'>
        +{product.views ?? 1} Visualizações
      </p>
      <p className='text-md text-muted-foreground'>
        Este é um dos itens escolhidos com carinho para o nosso novo lar. Seu
        gesto de carinho vai fazer parte da nossa história!
      </p>
      <div>
        <p className='text-4xl'>{formatCurrency(product.price)}</p>
        <p className='text-xl text-secondary'>Pague em até 6x!</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl'>Meios de pagamento</h2>
        <div className='flex gap-8'>
          <Image src='/png/paymentMethod/pix.png' alt='pix' width={71} height={32} />
          <Image src='/png/paymentMethod/elo.png' alt='elo' width={82} height={32} />
          <Image src='/png/paymentMethod/visa.png' alt='visa' width={42} height={32} />
          <Image src='/png/paymentMethod/mastercard.png' alt='mastercard' width={31} height={32} />
        </div>
      </div>
      <Button
        className='text-2xl py-8 text-white group mt-10'
        variant='secondary'
        onMouseEnter={() => giftRef.current?.hoverStart()}
        onMouseLeave={() => giftRef.current?.hoverEnd()}
        onClick={() => {
          if (requireAuth(loginMessage)) {
            giftRef.current?.click()
          }
        }}
      >
        <div className='mb-6'>
          <Gift ref={giftRef} />
        </div>
        Dar este presente
      </Button>
      {product.description && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl'>Descrição</h2>
          <p>{product.description}</p>
        </div>
      )}
      {dialog}
    </div>
  )
}

export default ProductMobilePage
