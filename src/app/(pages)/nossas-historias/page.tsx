'use client'

import { MediaCarousel, MediaItem } from '@/components/MediaCarousel/MediaCarousel'

export default function NossasHistoriasPage() {
  const media: MediaItem[] = [
    { type: 'image', src: '/png/preWedding/DSC03183.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03184.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03190.jpg' }
  ]

  return (
    <main className='flex flex-col gap-4 py-8 px-4 max-w-6xl'>
      <h1 className='text-2xl'>Nossa História</h1>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='order-2 md:order-1 md:w-1/2 flex flex-col gap-4'>
          <p>
            Nos conhecemos ainda jovens, nos corredores do colégio. Éramos apenas conhecidos de vista, com amigos em comum, mas nada que indicasse que, anos depois, estaríamos escrevendo nossa história juntos.
          </p>
          <p>
            Foi em uma noite comum — mas que se tornaria inesquecível — no dia 9 de maio de 2015, durante uma pizza com os amigos, que tudo começou de verdade...
          </p>
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

