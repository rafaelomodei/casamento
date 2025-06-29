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
    <div className='relative flex h-16 w-16 items-center justify-center text-sm md:text-xl'>
      <Image
        src={'/svg/calendar.svg'}
        alt='Calendário do casamento'
        fill
        className='object-contain'
      />
      <span className='absolute text-center font-semibold'>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
}
