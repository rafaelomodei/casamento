import Lottie from 'lottie-react';
import animationData from '@/assets/lotties/Gift/wired-flat-412-gift-loop-roll.json';

export default function Gift() {
  return (
    <Lottie animationData={animationData} loop={true} style={{ width: 100 }} />
  );
}
