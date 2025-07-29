import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const images = ['/png/capa.png', '/png/capa.png', '/png/capa.png']

export default function BackgroundCarousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className='absolute inset-0'>
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt='Foto do casal'
          fill
          className={cn(
            'object-cover transition-opacity duration-1000',
            index === i ? 'opacity-100' : 'opacity-0'
          )}
          priority={i === 0}
        />
      ))}
    </div>
  )
}
