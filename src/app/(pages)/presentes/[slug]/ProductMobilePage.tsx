'use client';

import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { formatCurrency } from '@/lib/utlils/currency';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Gift, { GiftHandle } from '@/components/IconsAnimated/Gift/Gift';
import { useRef, useEffect } from 'react';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { buildInfinityPayUrl } from '@/lib/utlils/infinityPay';
import { useAuth } from '@/Providers/auth-provider';
import ReactMarkdown from 'react-markdown';
import { event } from '@/lib/analytics';

interface Props {
  product: ProductDTO;
}

export function ProductMobilePage({ product }: Props) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['/png/defaultImage.png'];
  const giftRef = useRef<GiftHandle>(null);
  const { requireAuth, dialog } = useAuthRequired();
  const { user } = useAuth();

  const loginMessage =
    'Para dar este presente, você precisa estar logado.\nClique em Entrar ou crie sua conta em poucos segundos e volte aqui para concluir sua contribuição para Maria Eduarda & Rafael.';

  useEffect(() => {
    if (product.status === 'gifted') {
      giftRef.current?.click();
    }
  }, [product.status]);

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>{product.title}</h1>
      <div className='w-full aspect-square'>
        <ImageCarousel
          images={images}
          alt={product.title}
          hoverControls={false}
          showIndicators
          showControls={false}
          rounded={false}
          className='h-full w-full'
        />
      </div>
      <p className='text-sm text-muted-foreground'>
        +{product.views ?? 1} Visualizações
      </p>
      <p className='text-md text-muted-foreground'>
        Este é um dos itens escolhidos com carinho para o nosso novo lar. Seu
        gesto de carinho vai fazer parte da nossa história!
      </p>
      {product.status === 'gifted' ? (
        <p className='text-xl text-muted-foreground'>
          Alguém já presenteou o casal com este item.
        </p>
      ) : (
        <>
          <div>
            <p className='text-4xl'>{formatCurrency(product.price)}</p>
            <p className='text-xl text-secondary'>Pague em até 6x!</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Meios de pagamento</h2>
            <div className='flex gap-8'>
              <Image
                src='/png/paymentMethod/pix.png'
                alt='pix'
                width={71}
                height={32}
              />
              <Image
                src='/png/paymentMethod/elo.png'
                alt='elo'
                width={82}
                height={32}
              />
              <Image
                src='/png/paymentMethod/visa.png'
                alt='visa'
                width={42}
                height={32}
              />
              <Image
                src='/png/paymentMethod/mastercard.png'
                alt='mastercard'
                width={31}
                height={32}
              />
            </div>
          </div>
        </>
      )}
        <Button
          className='text-2xl py-8 text-white group mt-10'
          variant='secondary'
          onMouseEnter={() => giftRef.current?.hoverStart()}
          onMouseLeave={() => giftRef.current?.hoverEnd()}
          disabled={product.status === 'gifted'}
          onClick={() => {
            event({ action: 'gift_click', category: 'gift', label: product.slug });
            if (requireAuth(loginMessage)) {
              const base = process.env.NEXT_PUBLIC_INFINITYPAY_CHECKOUT_BASE_URL;
              if (!base) return;
              giftRef.current?.click();
              const url = buildInfinityPayUrl({
                baseUrl: base,
                name: product.title,
                price: product.price,
                userName: user?.name || '',
                userPhone: user?.phone || '',
                redirectUrl: `${window.location.origin}/presenteado?id=${product.id}`,
                orderNsu: crypto.randomUUID?.() ?? String(Date.now()),
              });
              window.location.href = url;
            }
          }}
        >
        <div className='mb-6'>
          <Gift ref={giftRef} />
        </div>
        {product.status === 'gifted'
          ? 'Presente já foi dado'
          : 'Dar este presente'}
      </Button>
      {product.status === 'gifted' && (
        <p className='text-destructive'>Este presente já foi comprado.</p>
      )}
      {product.description && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl'>Descrição</h2>
          <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
      )}
      {dialog}
    </div>
  );
}

export default ProductMobilePage;
