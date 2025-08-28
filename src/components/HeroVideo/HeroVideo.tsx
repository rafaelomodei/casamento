'use client';

import { useRef } from 'react';

export default function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleLoad() {
    const player = iframeRef.current?.contentWindow;
    if (!player) return;
    const origin = 'https://www.youtube-nocookie.com';
    player.postMessage(
      JSON.stringify({ event: 'command', func: 'mute', args: [] }),
      origin,
    );
    player.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      origin,
    );
  }

  return (
    <iframe
      ref={iframeRef}
      onLoad={handleLoad}
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto aspect-video pointer-events-none border-0 will-change-transform lg:scale-[1.06]'
      src='https://www.youtube-nocookie.com/embed/ltugLz6H7cs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=ltugLz6H7cs&disablekb=1&fs=0&enablejsapi=1'
      title='Vídeo de abertura'
      allow='autoplay; encrypted-media'
      referrerPolicy='strict-origin-when-cross-origin'
      tabIndex={-1}
      aria-hidden='true'
    />
  );
}

