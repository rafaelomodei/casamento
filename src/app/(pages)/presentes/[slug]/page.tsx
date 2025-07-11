'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProductDesktopPage } from './ProductDesktopPage';
import { ProductMobilePage } from './ProductMobilePage';

export default function PresenteDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug as string);
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return <ProductMobilePage product={product} />;
  }

  return (
    <ProductDesktopPage
      product={product}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
    />
  );
}
