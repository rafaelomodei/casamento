'use client';

import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

type OpenInMapsButtonProps = {
  lat: number;
  lng: number;
  className?: string;
  children?: React.ReactNode;
};

export default function OpenInMapsButton({
  lat,
  lng,
  className,
  children,
}: OpenInMapsButtonProps) {
  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button className={className} onClick={openMaps}>
      <Navigation className='w-5 h-5 mr-2' />
      {children ?? 'Abrir no GPS / Google Maps'}
    </Button>
  );
}
