'use client';

import dynamic from 'next/dynamic';

const HeroVideo = dynamic(() => import('./HeroVideo'), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-black' />,
});

export default HeroVideo;

