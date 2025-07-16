import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class GetMostViewedProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(limit: number): Promise<ProductDTO[]> {
    return this.productRepository.findMostViewed(limit);
  }
}
