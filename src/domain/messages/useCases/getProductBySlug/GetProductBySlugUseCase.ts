import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string, tenant: string): Promise<ProductDTO | null> {
    return this.productRepository.findBySlug(slug, tenant);
  }
}
