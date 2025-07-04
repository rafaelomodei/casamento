import { NextResponse } from 'next/server';
import { GetAllProductsUseCase } from '@/domain/products/useCases/getAllProducts/GetAllProductsUseCase';
import { CreateProductUseCase } from '@/domain/products/useCases/createProduct/CreateProductUseCase';
import { productRepository } from '@/infra/repositories/firebase/ProductServerFirebaseRepositories';
import { getCurrentTenant } from '@/lib/getTenant';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';

export async function GET() {
  const tenant = await getCurrentTenant();

  const getAllProducts = new GetAllProductsUseCase(productRepository);
  const products = await getAllProducts.execute(tenant);

  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const tenant = await getCurrentTenant();
    const data = (await req.json()) as ProductDTO;

    const createProduct = new CreateProductUseCase(productRepository);
    await createProduct.execute({ ...data, storeId: data.storeId || tenant });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 }
    );
  }
}
