import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center px-4  text-primary'>
      <header className='flex h-screen'>
        <div className='flex flex-col w-full items-center justify-center'>
          <Image
            src={'/png/capa.png'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            height={540}
            width={725}
          />
          <div className='flex flex-col items-center'>
            <p className='font-arapey text-2xl sm:text-5xl lg:text-6xl text-primary'>
              Maria Eduarda & Rafael Geovani
            </p>
            <p className='text-primary text-xl --font-body'>27 | SET | 2025</p>
          </div>
        </div>
      </header>
    </main>
  );
}
