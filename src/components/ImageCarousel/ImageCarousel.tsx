'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  hoverControls?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  rounded?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

export function ImageCarousel({
  images,
  alt,
  className,
  hoverControls = true,
  showControls = true,
  showIndicators = false,
  rounded = true,
  autoPlayInterval,
  pauseOnHover = true,
}: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [hovered, setHovered] = useState(false);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const totalImages = images.length;

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  useEffect(() => {
    if (!autoPlayInterval) return;
    if (pauseOnHover && hovered) return;
    const id = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlayInterval, hovered, pauseOnHover]);

  return (
    <div
      className={cn('relative w-full h-64', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={images[currentImage]}
        alt={alt}
        fill
        sizes='100vw'
        className={cn(
          'object-cover transition duration-300',
          rounded && 'rounded-md'
        )}
        priority={currentImage === 0}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.onerror = null
          target.src = '/png/defaultImage.png'
        }}
      />

      {showControls && ((hoverControls && hovered) || !hoverControls) && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePrev();
            }}
            className='absolute top-1/2 left-2 -translate-y-1/2 bg-background/70 p-1 rounded-full hover:bg-background transition z-10'
          >
            <ChevronLeft className='w-5 h-5 text-foreground' />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNext();
            }}
            className='absolute top-1/2 right-2 -translate-y-1/2 bg-background/70 p-1 rounded-full hover:bg-background transition z-10'
          >
            <ChevronRight className='w-5 h-5 text-foreground' />
          </button>
        </>
      )}

      {showIndicators && (
        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-2 h-2 rounded-full transition',
                currentImage === idx ? 'bg-primary' : 'bg-muted-foreground/30'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
