'use client'

import { MediaCarousel, MediaItem } from '@/components/MediaCarousel/MediaCarousel'
import Link from 'next/link'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import StoryText from '@/components/StoryText/StoryText'

export default function NossasHistoriasPage() {
  const media: MediaItem[] = [
    { type: 'image', src: '/png/preWedding/DSC03183.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03184.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03190.jpg' }
  ]

  return (
    <main className='flex flex-col gap-4 py-8 px-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Nossa História</h1>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='order-2 md:order-1 md:w-1/2 flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Maria Eduarda e Rafael Geovani</h2>
          <StoryText />
          <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
            <Link
              href='/mensagens?modal=1'
              className='text-primary border-primary border text-center rounded-sm text-lg py-2 px-4'
            >
              Deixar uma mensagem
            </Link>
            <Link
              href='mensagens/'
              className='bg-primary text-white text-center rounded-sm text-lg py-2 px-4'
            >
              Ver mensagens
            </Link>
          </div>
        </div>
        <div className='order-1 md:order-2 md:w-1/2'>
          <MediaCarousel
            items={media}
            alt='Fotos do casal'
            className='h-64 sm:h-80 w-full'
            showIndicators
          />
        </div>
      </div>
    </main>
  )
}
