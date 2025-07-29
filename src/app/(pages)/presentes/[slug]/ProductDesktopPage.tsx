'use client';

import Image from 'next/image';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { formatCurrency } from '@/lib/utlils/currency';
import { Button } from '@/components/ui/button';
import Gift, { GiftHandle } from '@/components/IconsAnimated/Gift/Gift';
import { useRef } from 'react';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { buildInfinityPayUrl } from '@/lib/utlils/infinityPay';

interface Props {
  product: ProductDTO;
  selectedImage: string | null;
  setSelectedImage: (img: string) => void;
}

export function ProductDesktopPage({
  product,
  selectedImage,
  setSelectedImage,
}: Props) {
  const fallback = '/png/defaultImage.png';
  const images =
    product.images && product.images.length > 0 ? product.images : [fallback];
  const giftRef = useRef<GiftHandle>(null);
  const { requireAuth, dialog } = useAuthRequired();
  const loginMessage =
    'Para dar este presente, você precisa estar logado.\nClique em Entrar ou crie sua conta em poucos segundos e volte aqui para concluir sua contribuição para Maria Eduarda & Rafael.';

  return (
    <div className='flex flex-col w-full max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />

      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2'>
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Imagem ${idx + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== fallback) target.src = fallback;
                  }}
                  className={`h-20 w-20 cursor-pointer rounded-md object-cover border transition ${
                    selectedImage === img
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-2 hover:ring-primary'
                  }`}
                />
              ))}
            </div>
            <div className='aspect-square overflow-hidden rounded-md border w-xl'>
              <Image
                src={selectedImage ?? images[0]}
                alt={product.title}
                width={300}
                height={300}
                className='h-full w-full object-cover'
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== fallback) target.src = fallback;
                }}
              />
            </div>
          </div>
          {product.description && (
            <div className='flex flex-col gap-2 max-w-xl'>
              <h2 className='text-xl'>Descrição</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full gap-4'>
          <p className='text-sm text-muted-foreground'>
            +{product.views ?? 1} Visualizações
          </p>

          <h1 className='text-2xl'>{product.title}</h1>
          <p className='text-md text-muted-foreground'>
            Este é um dos itens escolhidos com carinho para o nosso novo lar.
            Seu gesto de carinho vai fazer parte da nossa história!
          </p>
          <div>
            <p className='text-4xl'>{formatCurrency(product.price)}</p>
            <p className='text-xl text-secondary'>Pague em até 6x!</p>
          </div>
          <div className='flex flex-col gap-2 '>
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

          <Button
            className='text-2xl py-8 text-white group mt-10'
            variant='secondary'
            onMouseEnter={() => giftRef.current?.hoverStart()}
            onMouseLeave={() => giftRef.current?.hoverEnd()}
            disabled={product.status === 'gifted'}
            onClick={() => {
              if (requireAuth(loginMessage)) {
                const base = process.env.NEXT_PUBLIC_INFINITYPAY_CHECKOUT_BASE_URL;
                if (!base) return;
                giftRef.current?.click();
                const redirectUrl = `${window.location.origin}/presenteado?id=${product.id}`;
                const url = buildInfinityPayUrl({
                  baseUrl: base,
                  name: product.title,
                  price: product.price,
                  redirectUrl,
                });
                window.location.href = url;
              }
            }}
          >
            <div className='mb-6'>
              <Gift ref={giftRef} />
            </div>
            {product.status === 'gifted' ? 'Presente já adquirido' : 'Dar este presente'}
          </Button>
          {product.status === 'gifted' && (
            <p className='text-destructive'>Este presente já foi comprado.</p>
          )}
        </div>
      </div>
      {dialog}
    </div>
  );
}

export default ProductDesktopPage;
