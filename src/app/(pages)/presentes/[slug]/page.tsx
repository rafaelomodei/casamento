'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProductDesktopPage } from './ProductDesktopPage';
import { ProductMobilePage } from './ProductMobilePage';
import ProductDesktopPageSkeleton from './ProductDesktopPageSkeleton';
import ProductMobilePageSkeleton from './ProductMobilePageSkeleton';

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

        const productData = { ...data, views: (data.views || 0) + 1 };
        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData.images[0]);
        } else {
          setSelectedImage('/png/defaultImage.png');
        }
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
    if (isMobile) {
      return <ProductMobilePageSkeleton />;
    }
    return <ProductDesktopPageSkeleton />;
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
