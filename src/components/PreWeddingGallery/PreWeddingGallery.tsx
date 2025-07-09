'use client'

import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PreWeddingGalleryProps {
  className?: string
}

const IMAGES: string[] = [
  '/png/preWedding/DSC03183.jpg',
  '/png/preWedding/DSC03184.jpg',
  '/png/preWedding/DSC03190.jpg',
  '/png/preWedding/DSC03198.jpg',
  '/png/preWedding/DSC03208.jpg',
  '/png/preWedding/DSC03225.jpg',
  '/png/preWedding/DSC03238.jpg',
  '/png/preWedding/DSC03273.jpg',
  '/png/preWedding/DSC03286.jpg',
  '/png/preWedding/DSC03384.jpg',
  '/png/preWedding/DSC03399.jpg',
  '/png/preWedding/DSC03420.jpg',
  '/png/preWedding/DSC04263.jpg',
  '/png/preWedding/DSC04279.jpg',
  '/png/preWedding/DSC04890.jpg',
  '/png/preWedding/DSC04993.jpg',
]

export default function PreWeddingGallery({ className }: PreWeddingGalleryProps) {
  const images = useMemo(() => [...IMAGES].sort(() => Math.random() - 0.5), [])

  const breakpointColumns = { default: 4, 1024: 3, 768: 2, 0: 1 }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={cn('w-full flex', className)}
      columnClassName='flex flex-col gap-4'
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className='overflow-hidden rounded-md transition-transform duration-300 hover:scale-105'
        >
          <Image
            src={src}
            alt={`Foto do casal ${idx + 1}`}
            width={1920}
            height={1280}
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
            quality={75}
            className='w-full h-auto object-contain'
            loading='lazy'
          />
        </div>
      ))}
    </Masonry>
  )
}
