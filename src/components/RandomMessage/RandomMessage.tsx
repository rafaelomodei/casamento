'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Estamos ansiosos pela sua presença.',
  'Cada momento é mais especial com você.',
  'Prepare-se para um dia inesquecível.',
  'Contamos os dias para celebrar juntos.',
  'Obrigado por fazer parte da nossa história.',
  'A alegria será completa com você ao lado.',
  'Bem-vindo ao nosso grande dia.',
  'Que bom compartilhar esse sonho com você.',
  'Vamos festejar muito esse amor.',
  'Sua presença tornará tudo mais mágico.',
];

interface RandomMessageProps {
  interval?: number;
}

export default function RandomMessage({ interval = 4000 }: RandomMessageProps) {
  const [message, setMessage] = useState(
    MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className='absolute bottom-0 left-0 w-full bg-black/50 text-white text-center p-2 text-sm'>
      {message}
    </div>
  );
}
