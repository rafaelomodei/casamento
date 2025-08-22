'use client';

import Image from 'next/image';
import React from 'react';

type OpenInMapsImageProps = {
  lat: number;
  lng: number;
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  overlay?: React.ReactNode;
};

export default function OpenInMapsImage({
  lat,
  lng,
  src,
  alt,
  containerClassName,
  imageClassName,
  overlay,
}: OpenInMapsImageProps) {
  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role='button'
      aria-label='Abrir no Google Maps'
      className={containerClassName}
      onClick={openMaps}
    >
      <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow group'>
        <Image
          src={src}
          alt={alt}
          className={
            imageClassName ??
            'object-cover transition-transform duration-500 group-hover:scale-105'
          }
          fill
        />
        {overlay && (
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <div className='bg-white/90 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
              {overlay}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
