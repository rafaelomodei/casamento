import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center px-4  text-primary'>
      <Card className='max-w-xl text-center shadow-none border-none'>
        <CardContent className='space-y-4 py-10'>
          <div className='w-full flex items-center justify-center'>
            <Image
              src={'./logo.svg'}
              alt='Logo Casamento, Maria Eduarda e Rafael OModei'
              width={64}
              height={64}
            />
          </div>
          <p className='font-arapey text-2xl font-bold text-primary'>
            Site em Construção
          </p>
          <p className='text-primary'>
            Estamos preparando tudo com muito amor e carinho para compartilhar
            cada detalhe do nosso grande dia com você. Em breve, nosso cantinho
            especial estará no ar com todas as informações sobre a cerimônia,
            festa, lista de presentes, padrinhos e muito mais.
          </p>
          <div className='text-primary'>
            <p>Aguarde só mais um pouquinho!</p>
            <p>Com amor,</p>
          </div>
          <div>
            <p className='font-arapey  font-bold text-primary'>
              Maria Eduarda & Rafael Geovani
            </p>
            <p className='text-primary font-black'>27 | SET | 2025</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
