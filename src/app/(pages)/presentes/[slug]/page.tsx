'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utlils/currency';

export default function PresenteDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string);
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products?slug=${slug}`);
        if (!res.ok) throw new Error('Produto não encontrado');
        const data: ProductDTO = await res.json();

        await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, views: (data.views || 0) + 1 }),
        });

        setProduct({ ...data, views: (data.views || 0) + 1 });
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return <p className='py-8'>Carregando...</p>;
  }

  if (!product) {
    return <p className='py-8'>Presente não encontrado.</p>;
  }

  return (
    <div className='flex flex-col gap-4 py-8'>
      <h1 className='text-2xl'>{product.title}</h1>
      {product.images && product.images[0] && (
        <Image
          src={product.images[0]}
          alt={product.title}
          width={400}
          height={300}
          className='rounded'
        />
      )}
        <p className='font-semibold'>{formatCurrency(product.price)}</p>
      {product.description && <p>{product.description}</p>}
      <p className='text-sm text-muted-foreground'>Visualizações: {product.views ?? 0}</p>
    </div>
  );
}
