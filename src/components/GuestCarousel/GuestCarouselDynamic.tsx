'use client';

import dynamic from 'next/dynamic';

const GuestCarousel = dynamic(() => import('./GuestCarousel'), {
  ssr: false,
  loading: () => <div className='h-[420px]' />,
});

export default GuestCarousel;

