'use client';

import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

const guestImages = Array.from({ length: 5 }, (_, i) =>
  `/png/example/convidado_${String(i + 1).toString().padStart(2, '0')}.png`
);

export default function GuestCarousel() {
  return (
    <ImageCarousel
      images={guestImages}
      alt='Looks inspiradores para o grande dia'
      autoPlayInterval={2000}
      showControls
      showIndicators
      hoverControls={false}
      stopOnInteraction
      className='h-64 rounded-2xl overflow-hidden elegant-shadow'
      rounded={false}
    />
  );
}

