import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import reveal from '@/assets/lotties/Gift/wired-flat-412-gift-in-reveal.json';
import hover from '@/assets/lotties/Gift/wired-flat-412-gift-hover-roll.json';
import open from '@/assets/lotties/Gift/wired-flat-412-gift-morph-open.json';
import { cn } from '@/lib/utils';

interface GiftProps {
  className?: string;
  size?: number;
}

export default function Gift({ className, size = 100 }: GiftProps) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState(reveal);
  const [autoplay, setAutoplay] = useState(true);
  const [enlarge, setEnlarge] = useState(false);

  useEffect(() => {
    const anim = ref.current;
    if (!anim) return;
    const handleComplete = () => {
      anim.stop();
      setAutoplay(false);
    };
    anim.addEventListener('complete', handleComplete);
    return () => {
      anim.removeEventListener('complete', handleComplete);
    };
  }, []);

  const handleMouseEnter = () => {
    setAnimationData(hover);
    setAutoplay(true);
  };

  const handleMouseLeave = () => {
    setAutoplay(false);
  };

  const handleClick = () => {
    setAnimationData(open);
    setAutoplay(true);
    setEnlarge(true);
    setTimeout(() => setEnlarge(false), 300);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(className, enlarge && 'animate-giftgrow')}
    >
      <Lottie
        lottieRef={ref}
        animationData={animationData}
        loop={false}
        autoplay={autoplay}
        style={{ width: size }}
      />
    </div>
  );
}
