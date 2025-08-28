'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { PRODUCTS_PAGE_SIZE } from '@/lib/constants';

interface ProductsResponse {
  products: ProductDTO[];
  hasMore: boolean;
}

export default function PresentesPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [prefetch, setPrefetch] = useState<ProductsResponse | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(
    async (p: number): Promise<ProductsResponse> => {
      const res = await fetch(`/api/products?page=${p}&limit=${PRODUCTS_PAGE_SIZE}`);
      return res.json();
    },
    []
  );

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const data = await fetchProducts(1);
        if (ignore) return;
        setProducts(data.products);
        setHasMore(data.hasMore);
        setLoading(false);

        if (data.hasMore) {
          fetchProducts(2).then((next) => !ignore && setPrefetch(next));
        }
      } catch (err) {
        console.error('Erro ao carregar presentes:', err);
        setLoading(false);
      }
    }

    init();
    return () => {
      ignore = true;
    };
  }, [fetchProducts]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    let data: ProductsResponse;
    if (prefetch) {
      data = prefetch;
      setPrefetch(null);
    } else {
      data = await fetchProducts(nextPage);
    }

    setProducts((prev) => [...prev, ...data.products]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setLoadingMore(false);

    if (data.hasMore) {
      const futurePage = nextPage + 1;
      fetchProducts(futurePage).then(setPrefetch);
    }
  }, [fetchProducts, hasMore, loadingMore, page, prefetch]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  if (loading) {
    return (
      <div className='flex flex-col w-col max-w-6xl gap-4 py-8 px-4'>
        <PageBreadcrumb />
        <h1 className='text-2xl'>Presentes</h1>
        <div className='flex flex-wrap gap-16'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]'
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-col max-w-6xl gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Presentes</h1>
      {products.length === 0 ? (
        <p className='py-4'>Nenhum presente cadastrado.</p>
      ) : (
        <>
          <div className='flex flex-wrap gap-4'>
            {products.map((product) => (
              <div
                key={product.id}
                className='flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]'
              >
                <ProductCard
                  slug={product.slug}
                  images={product.images}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  status={product.status}
                />
              </div>
            ))}
          </div>
          <div ref={loaderRef} className='flex justify-center items-center w-full py-4'>
            {loadingMore && <span>Carregando...</span>}
          </div>
        </>
      )}
    </div>
  );
}
