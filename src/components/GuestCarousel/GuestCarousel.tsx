'use client';

import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

const guestImages = Array.from(
  { length: 5 },
  (_, i) =>
    `/png/example/convidado_${String(i + 1)
      .toString()
      .padStart(2, '0')}.png`
);

export default function GuestCarousel() {
  return (
    <ImageCarousel
      images={guestImages}
      alt='Looks inspiradores para o grande dia'
      autoPlayInterval={2300}
      showControls
      showIndicators
      hoverControls={false}
      stopOnInteraction
      objectStyle='object-contain'
      className='h-[420px] min-w-xs rounded-2xl overflow-hidden elegant-shadow'
      rounded={false}
    />
  );
}
