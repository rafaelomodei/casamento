import { NextResponse } from 'next/server';
import { GetMostViewedProductsUseCase } from '@/domain/products/useCases/getMostViewedProducts/GetMostViewedProductsUseCase';
import { productRepository } from '@/infra/repositories/firebase/ProductServerFirebaseRepositories';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Number(limitParam) : 4;

  const getMostViewed = new GetMostViewedProductsUseCase(productRepository);
  const products = await getMostViewed.execute(limit);

  return NextResponse.json(products, { status: 200 });
}
