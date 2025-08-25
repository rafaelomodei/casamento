'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const VIDEO_ID = 'ltugLz6H7cs';

interface YTPlayer {
  mute: () => void;
  playVideo: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: { onReady: (event: { target: YTPlayer }) => void };
    },
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function BackgroundVideo() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function createPlayer() {
      if (playerRef.current && window.YT) {
        new window.YT.Player(playerRef.current, {
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: VIDEO_ID,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            disablekb: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();
            },
          },
        });
      }
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div ref={playerRef} className="w-full h-full" />
      <Script src="https://www.youtube.com/iframe_api" strategy="afterInteractive" />
    </div>
  );
}

