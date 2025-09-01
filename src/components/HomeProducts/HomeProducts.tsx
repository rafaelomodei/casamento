import { ProductCard } from '@/components/ProductCard/ProductCard';
import Link from 'next/link';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import AllProductsCard from './AllProductsCard';
import { GetMostViewedProductsUseCase } from '@/domain/products/useCases/getMostViewedProducts/GetMostViewedProductsUseCase';
import { productRepository } from '@/infra/repositories/firebase/ProductServerFirebaseRepositories';

export default async function HomeProducts() {
  const getMostViewed = new GetMostViewedProductsUseCase(productRepository);
  const products = await getMostViewed.execute(3);

  return (
    <section className='flex flex-col w-full py-8'>
      <div className='text-center mb-16'>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <h2 className='text-4xl md:text-5xl text-primary'>Presentes</h2>
        </div>

        <div className='max-w-2xl mx-auto'>
          <p
            className='text-xl text-primary/70 mb-6'
            style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
          >
            Queridos familiares e amigos, para nós, a presença de vocês neste
            dia tão especial é o maior presente que poderíamos receber. Mas, se
            vocês também quiserem nos presentear, ficaremos muito agradecidos.
            Com amor, {` ${BRIDE_AND_GROOM}`}.
          </p>

          <div className='flex items-center justify-center gap-8'>
            <Link
              href='/presentes'
              className='flex w-full md:max-w-fit mt-4 bg-primary text-white items-center justify-center rounded-sm text-lg py-2 px-4 self-start'
            >
              Ver todos os presentes
            </Link>
          </div>
        </div>
      </div>
      {products.length === 0 ? (
        <p className='text-lg py-4'>Nenhum presente encontrado.</p>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {products.map((product) => (
            <div key={product.id} className='flex-1 sm:max-w-[calc(50%-0.5rem)]'>
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
          <AllProductsCard />
        </div>
      )}
    </section>
  );
}
