import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-white px-4  text-primary'>
      <Card className='max-w-xl text-center shadow-md border-none'>
        <CardContent className='space-y-4 py-10'>
          <p className='text-2xl font-bold text-primary'>
            💍 Site em Construção
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
            <p className='font-bold text-primary'>
              Maria Eduarda & Rafael Geovani
            </p>
            <p className='text-primary font-black'>27 | SET | 2025</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
