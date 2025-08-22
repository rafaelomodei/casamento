'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Heart, Home, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

function PresenteContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function updateStatus() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/products?id=${id}`);
        if (!res.ok) throw new Error('Produto não encontrado');
        const product: ProductDTO = await res.json();
        await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, status: 'gifted' }),
        });
      } catch {
        setError('Não foi possível atualizar o presente.');
      } finally {
        setLoading(false);
      }
    }
    updateStatus();
  }, [id]);

  return (
    <div className='flex flex-col gap-4 py-8 px-4 max-w-6xl'>
      <PageBreadcrumb />
      {loading ? (
        <p>Processando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-3 mb-6'>
              <div className='w-20 h-[1px] bg-gradient-to-r from-transparent to-secondary/50'></div>
              <Gift className='w-6 lg:w-12 h-6 lg:h-12 text-secondary' />
              <div className='w-20 h-[1px] bg-gradient-to-l from-transparent to-secondary/50'></div>
            </div>

            <h1 className='text-4xl md:text-6xl mb-6'>Muito Obrigado!</h1>

            <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              Nossa gratidão transborda ao receber tanto carinho e generosidade
              de vocês
            </p>
          </div>

          <Card className='watercolor-texture border-none shadow-none mb-12 text-primary'>
            <CardContent className='p-0'>
              <div className='text-center mb-8'>
                <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 mb-6'>
                  <Heart className='w-10 h-10 text-secondary fill-secondary/20' />
                </div>

                <h2 className='text-3xl mb-6 text-primary'>
                  Cada presente é um abraço do coração
                </h2>
              </div>

              <div className='prose prose-lg text-muted-foreground  max-w-none text-justify md:text-center '>
                <p className='text-lg leading-relaxed mb-6'>
                  Sabemos que a presença de vocês em nosso casamento já seria o
                  maior presente que poderíamos receber. Mas a generosidade e o
                  carinho demonstrados através de cada lembrança, cada mimo,
                  cada gesto de amor, nos emocionam profundamente e nos fazem
                  sentir ainda mais abençoados.
                </p>

                <Separator className='my-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent' />

                <p className='text-lg leading-relaxed'>
                  Cada presente escolhido com tanto amor será guardado e usado
                  com imenso carinho, sempre nos lembrando de vocês e deste
                  momento tão especial que estamos vivendo. Vocês estão ajudando
                  a construir não apenas nosso lar, mas também nossas memórias
                  mais preciosas.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='watercolor-texture border-none shadow-none mb-12 text-primary'>
            <CardContent className='p-10'>
              <div className='text-center'>
                <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 mb-6'>
                  <Home className='w-10 h-10 text-secondary' />
                </div>

                <h2 className='text-3xl mb-6 text-primary'>
                  Construindo nosso lar com amor
                </h2>

                <p className='text-lg text-muted-foreground  leading-relaxed mb-8 max-w-2xl mx-auto'>
                  Cada presente recebido se tornará parte da nossa nova vida
                  juntos. Quando usarmos cada item, prepararmos cada refeição,
                  organizarmos cada cantinho da nossa casa, nos lembraremos do
                  amor que vocês colocaram em cada escolha.
                </p>

                <Separator className='my-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-xs mx-auto' />

                <div className='flex items-center justify-center gap-3'>
                  <span className='text-xl text-primary'>
                    Com todo nosso amor,
                  </span>
                </div>

                <div
                  className='flex items-center justify-center gap-2 mt-4 text-2xl'
                  style={{ fontFamily: 'var(--font-arapey)' }}
                >
                  <span className='text-primary'>Maria</span>
                  <Heart className='w-5 h-5 fill-primary/30 text-primary' />
                  <span className='text-primary'>Rafael</span>
                </div>
              </div>
              <div className='text-center mt-12'>
                <div className='inline-flex items-center gap-3'>
                  <div className='w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/30'></div>
                  <Sparkles className='w-4 h-4 text-primary/60' />
                  <Heart className='w-4 h-4 text-primary/60 fill-primary/20' />
                  <Sparkles className='w-4 h-4 text-primary/60' />
                  <div className='w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/30'></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default function PresenteadoPage() {
  return (
    <Suspense fallback={null}>
      <PresenteContent />
    </Suspense>
  );
}
