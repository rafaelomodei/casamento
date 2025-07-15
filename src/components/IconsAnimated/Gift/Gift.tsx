import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import reveal from '@/assets/lotties/Gift/wired-flat-412-gift-in-reveal.json';
import hover from '@/assets/lotties/Gift/wired-flat-412-gift-hover-roll.json';
import open from '@/assets/lotties/Gift/wired-flat-412-gift-morph-open.json';
import { cn } from '@/lib/utils';

export interface GiftHandle {
  hoverStart: () => void;
  hoverEnd: () => void;
  click: () => void;
}

interface GiftProps {
  className?: string;
  size?: number;
}

const Gift = forwardRef<GiftHandle, GiftProps>(
  ({ className, size = 100 }: GiftProps, forwardedRef) => {
    const ref = useRef<LottieRefCurrentProps>(null);
    const [animationData, setAnimationData] = useState(reveal);
    const [autoplay, setAutoplay] = useState(true);
    const [enlarge, setEnlarge] = useState(false);

    useEffect(() => {
      const anim = ref.current?.animationItem;
      if (!anim) return;
      const handleComplete = () => {
        ref.current?.stop();
        setAutoplay(false);
      };
      anim.addEventListener('complete', handleComplete);
      return () => {
        anim.removeEventListener('complete', handleComplete);
      };
    }, []);

    const handleMouseEnter = useCallback(() => {
      setAnimationData(hover);
      setAutoplay(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setAutoplay(false);
    }, []);

    const handleClick = useCallback(() => {
      setAnimationData(open);
      setAutoplay(true);
      setEnlarge(true);
      setTimeout(() => setEnlarge(false), 300);
    }, []);

    useImperativeHandle(forwardedRef, () => ({
      hoverStart: handleMouseEnter,
      hoverEnd: handleMouseLeave,
      click: handleClick,
    }));

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
);

Gift.displayName = 'Gift';

export default Gift;
