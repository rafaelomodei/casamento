'use client';

import { useEffect, useState } from 'react';
import { TimeLeft } from './interface';
import { calculateTimeLeft } from '@/lib/utlils/date';
import Image from 'next/image';

interface CountdownProps {
  targetDate: Date | string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className='flex gap-4 text-white '>
      <div className='relative flex h-16 w-16 items-center justify-center text-2xl'>
        <Image
          src={'/svg/calendar.svg'}
          alt='Calendário do casamento'
          fill
          className='object-contain'
        />
        <span className='absolute text-center mt-3'>{timeLeft.days}d</span>
      </div>

      <div className='relative flex h-16 w-16 items-center justify-center text-2xl'>
        <Image
          src={'/svg/calendar.svg'}
          alt='Calendário do casamento'
          fill
          className='object-contain'
        />
        <span className='absolute text-center mt-3'>{timeLeft.hours}h</span>
      </div>

      <div className='relative flex h-16 w-16 items-center justify-center text-2xl'>
        <Image
          src={'/svg/calendar.svg'}
          alt='Calendário do casamento'
          fill
          className='object-contain  '
        />
        <span className='absolute text-center mt-3'>{timeLeft.minutes}m</span>
      </div>

      <div className='relative flex h-16 w-16 items-center justify-center text-2xl'>
        <Image
          src={'/svg/calendar.svg'}
          alt='Calendário do casamento'
          fill
          className='object-contain'
        />
        <span className='absolute text-center mt-3'>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
}
