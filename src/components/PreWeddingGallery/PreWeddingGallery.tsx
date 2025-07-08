'use client'

import Image, { StaticImageData } from 'next/image'
import Masonry from 'react-masonry-css'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

import img1 from '@/public/png/preWedding/DSC03183.jpg'
import img2 from '@/public/png/preWedding/DSC03184.jpg'
import img3 from '@/public/png/preWedding/DSC03190.jpg'
import img4 from '@/public/png/preWedding/DSC03198.jpg'
import img5 from '@/public/png/preWedding/DSC03208.jpg'
import img6 from '@/public/png/preWedding/DSC03225.jpg'
import img7 from '@/public/png/preWedding/DSC03238.jpg'
import img8 from '@/public/png/preWedding/DSC03273.jpg'
import img9 from '@/public/png/preWedding/DSC03286.jpg'
import img10 from '@/public/png/preWedding/DSC03384.jpg'
import img11 from '@/public/png/preWedding/DSC03399.jpg'
import img12 from '@/public/png/preWedding/DSC03420.jpg'
import img13 from '@/public/png/preWedding/DSC04263.jpg'
import img14 from '@/public/png/preWedding/DSC04279.jpg'
import img15 from '@/public/png/preWedding/DSC04890.jpg'
import img16 from '@/public/png/preWedding/DSC04993.jpg'

interface PreWeddingGalleryProps {
  className?: string
}

const IMAGES: StaticImageData[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
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
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
            className='w-full h-auto object-contain'
            placeholder='blur'
          />
        </div>
      ))}
    </Masonry>
  )
}
