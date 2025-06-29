'use client';

import { useEffect, useState } from 'react';
import { TimeLeft } from './interface';
import { calculateTimeLeft } from '@/lib/utlils/date';
import Image from 'next/image';

interface CountdownProps {
  targetDate: Date | string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className='flex gap-2 text-2xl'>
      <div>
        <Image src={'/svg/calendar.svg'} alt='Dia' width={64} height={64} />
        <span>{timeLeft.days}d</span>
      </div>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}
